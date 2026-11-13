// Site Bot: walks through YOUR website by itself.
// 1) opens every page and link, 2) fills and submits sign-up forms,
// 3) answers quiz questions (answers.json first, then Gemini),
// 4) goes through checkout with a TEST card only.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const SITE = (process.env.SITE_URL || 'https://healthcure5.github.io/arthritis-remedies/').replace(/\/?$/, '/');
const EMAIL = process.env.TEST_EMAIL || 'test@example.com';
const SUBMIT = (process.env.SUBMIT_FORMS || 'yes').toLowerCase().startsWith('y');
const CHECKOUT = (process.env.TEST_CHECKOUT || 'yes').toLowerCase().startsWith('y');
const GEMINI = process.env.GEMINI_API_KEY || '';
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), 'out');
fs.mkdirSync(OUT, { recursive: true });

let answers = {};
try { answers = JSON.parse(fs.readFileSync(new URL('./answers.json', import.meta.url))); } catch {}

const report = [];
const log = (ok, what, detail = '') => { report.push({ ok, what, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}${detail ? ' — ' + detail : ''}`); };
let shotNo = 0;
const shot = async (page, name) => { const f = `${String(++shotNo).padStart(2, '0')}-${name.replace(/[^\w-]+/g, '_')}.png`; await page.screenshot({ path: path.join(OUT, f), fullPage: true }).catch(() => {}); return f; };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });

// ---------- 1. Visit every page and check every link ----------
async function crawl() {
  const seen = new Set(), queue = [SITE], pages = [];
  while (queue.length && seen.size < 60) {
    const url = queue.shift().split('#')[0];
    if (seen.has(url)) continue; seen.add(url);
    const page = await ctx.newPage(); const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    try {
      const res = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      const status = res ? res.status() : 0;
      log(status < 400, `Page opens: ${url}`, `status ${status}`);
      if (errors.length) log(false, `JavaScript errors on ${url}`, errors.slice(0, 3).join(' | '));
      if (status < 400 && url.startsWith(SITE)) {
        pages.push(url);
        const { links, missingAnchors } = await page.evaluate(() => {
          const links = [...document.querySelectorAll('a[href]')].map(a => a.href);
          const missingAnchors = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href'))
            .filter(h => h.length > 1 && !document.getElementById(h.slice(1)));
          return { links, missingAnchors };
        });
        for (const a of new Set(missingAnchors)) log(false, `Link goes nowhere on ${url}`, a);
        for (const l of links) {
          if (l.startsWith(SITE)) queue.push(l);
          else if (/^https?:/.test(l) && !seen.has(l)) {
            seen.add(l);
            const r = await ctx.request.head(l, { timeout: 15000 }).catch(() => null);
            const s = r ? r.status() : 0;
            if (!(s && s < 400) && !(s === 405 || s === 403)) log(false, `Outside link may be broken`, `${l} (status ${s || 'no reply'})`);
          }
        }
        // open the menu if there is one
        const menuBtn = page.locator('button:has-text("Programs"), button[aria-label*="menu" i], .menu-toggle').first();
        if (await menuBtn.count()) { await menuBtn.click({ timeout: 3000 }).catch(() => {}); }
      }
    } catch (e) { log(false, `Page opens: ${url}`, e.message.split('\n')[0]); }
    await page.close();
  }
  return pages;
}

// ---------- helpers for filling forms ----------
async function tick(page, sel) {
  const box = page.locator(sel).first();
  if (!(await box.count())) return false;
  try { await box.check({ timeout: 3000 }); }
  catch {
    const id = await box.getAttribute('id');
    if (id) await page.locator(`label[for="${id}"]`).first().click({ timeout: 3000 }).catch(() => {});
    else await box.check({ force: true }).catch(() => {});
  }
  return await box.isChecked().catch(() => false);
}
async function fill(page, sel, value) { const f = page.locator(sel).first(); if (await f.count()) await f.fill(value, { timeout: 3000 }).catch(() => {}); }
async function pickFirst(page, sel) {
  const s = page.locator(sel).first(); if (!(await s.count())) return;
  const v = await s.evaluate(el => [...el.options].find(o => o.value && !o.disabled)?.value).catch(() => null);
  if (v) await s.selectOption(v).catch(() => {});
}

// ---------- 2. Sign-up forms ----------
async function signupForms(pages) {
  for (const url of pages) {
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    const forms = await page.locator('form:not(#co-form)').count();
    if (!forms || !(await page.locator('form:not(#co-form) input[type=email]').count())) { await page.close(); continue; }
    const form = page.locator('form:not(#co-form):has(input[type=email])').first();
    const id = (await form.getAttribute('id')) || 'signup';
    await form.locator('input[name*="first" i], input[id*="first" i]').first().fill('Test', { timeout: 3000 }).catch(() => {});
    await form.locator('input[name*="last" i], input[id*="last" i]').first().fill('Bot', { timeout: 3000 }).catch(() => {});
    await form.locator('input[type=email]').first().fill(EMAIL);
    const boxes = await form.locator('input[type=checkbox]').all();
    for (const b of boxes) { const bid = await b.getAttribute('id'); await tick(page, bid ? `#${bid}` : 'input[type=checkbox]'); }
    log(true, `Filled sign-up form "${id}" on ${url}`, `${boxes.length} tick boxes ticked`);
    await shot(page, `signup-filled-${id}`);
    if (SUBMIT) {
      const before = page.url();
      await form.locator('button[type=submit], input[type=submit], button:not([type])').first().click({ timeout: 5000 }).catch(e => log(false, `Submit button on "${id}"`, e.message.split('\n')[0]));
      await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(3000);
      const after = page.url(); const text = (await page.locator('body').innerText().catch(() => '')).slice(0, 300);
      const thanked = after !== before || /thank|sent|check your (e-?mail|inbox)/i.test(text);
      log(thanked, `Submitted sign-up form "${id}"`, `now on ${after}`);
      await shot(page, `signup-after-${id}`);
    } else log(true, `Did not submit "${id}"`, 'submit_forms was set to no');
    await page.close();
  }
}

// ---------- 3. Quiz questions ----------
async function askGemini(question, options) {
  if (!GEMINI) return null;
  const prompt = `Question: ${question}\nOptions:\n${options.map((o, i) => `${i + 1}. ${o}`).join('\n')}\nReply with only the number of the correct option.`;
  const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0 } })
  }).then(r => r.json()).catch(() => null);
  const n = parseInt(r?.candidates?.[0]?.content?.parts?.[0]?.text || '', 10);
  return n >= 1 && n <= options.length ? n - 1 : null;
}
function fromAnswerSheet(question, options) {
  for (const [k, v] of Object.entries(answers)) {
    if (k.startsWith('_')) continue;
    if (question.toLowerCase().includes(k.toLowerCase())) {
      const i = options.findIndex(o => o.trim().toLowerCase() === String(v).trim().toLowerCase());
      if (i >= 0) return i;
    }
  }
  return null;
}
async function quizzes(pages) {
  let found = 0;
  for (const url of pages) {
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    const groups = await page.evaluate(() => {
      const skip = el => el.closest('#co-form') || el.closest('form:has(input[type=email])');
      const qText = el => {
        const fs = el.closest('fieldset'); if (fs?.querySelector('legend')) return fs.querySelector('legend').innerText;
        let n = el.closest('.question, .quiz-question, li, div');
        for (let p = n; p; p = p.parentElement) { const h = p.querySelector('h1,h2,h3,h4,p,legend,.question-text'); if (h && h.innerText.trim()) return h.innerText; }
        return '';
      };
      const out = []; const names = new Set();
      document.querySelectorAll('input[type=radio]').forEach(r => {
        if (skip(r) || !r.name || names.has(r.name)) return; names.add(r.name);
        const opts = [...document.querySelectorAll(`input[type=radio][name="${CSS.escape(r.name)}"]`)].map(o =>
          (o.labels?.[0]?.innerText || o.closest('label')?.innerText || o.value || '').trim());
        out.push({ kind: 'radio', key: r.name, question: qText(r).trim(), options: opts });
      });
      document.querySelectorAll('select').forEach((s, i) => {
        if (skip(s)) return; if (!s.id) s.id = 'sitebot-sel-' + i;
        out.push({ kind: 'select', key: s.id, question: (s.labels?.[0]?.innerText || qText(s)).trim(), options: [...s.options].map(o => o.text.trim()) });
      });
      return out;
    });
    for (const g of groups) {
      found++;
      let i = fromAnswerSheet(g.question, g.options), how = 'answer sheet';
      if (i === null) { i = await askGemini(g.question, g.options); how = 'Gemini'; }
      if (i === null) { log(false, `Quiz question on ${url}`, `could not choose an answer for "${g.question.slice(0, 80)}"`); continue; }
      if (g.kind === 'radio') await page.locator(`input[type=radio][name="${g.key}"]`).nth(i).check({ force: true }).catch(() => {});
      else await page.locator(`#${g.key}`).selectOption({ index: i }).catch(() => {});
      log(true, `Answered quiz question on ${url}`, `"${g.question.slice(0, 80)}" → "${g.options[i]}" (by ${how})`);
    }
    if (groups.length) {
      await shot(page, 'quiz-answered');
      if (SUBMIT) {
        const btn = page.locator('form:not(#co-form) button[type=submit], button:has-text("Submit"), button:has-text("Check"), button:has-text("Finish")').first();
        if (await btn.count()) { await btn.click().catch(() => {}); await page.waitForTimeout(2500); await shot(page, 'quiz-submitted'); log(true, `Submitted quiz on ${url}`); }
      }
    }
    await page.close();
  }
  if (!found) log(true, 'Quiz check', 'no quiz questions found on the site');
}

// ---------- 4. Checkout with a TEST card ----------
async function checkout(pages) {
  if (!CHECKOUT) { log(true, 'Checkout skipped', 'test_checkout was set to no'); return; }
  for (const url of pages) {
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    const opener = page.locator('button:has-text("Yes, I want"), a:has-text("Yes, I want")').first();
    if (!(await opener.count()) || !(await page.locator('#co-form').count())) { await page.close(); continue; }
    await opener.click().catch(() => {});
    await page.waitForTimeout(800);
    await fill(page, '#co-first', 'Test'); await fill(page, '#co-last', 'Bot');
    await fill(page, '#co-email', EMAIL); await fill(page, '#co-addr', '123 Test Street');
    await fill(page, '#co-city', 'Springfield');
    await pickFirst(page, '#co-country'); await pickFirst(page, '#co-state');
    await fill(page, '#co-zip', '12345'); await fill(page, '#co-ccname', 'Test Bot');
    await fill(page, '#co-card', '4242 4242 4242 4242');  // standard TEST card number, never a real card
    await fill(page, '#co-exp', '12 / 34'); await fill(page, '#co-cvc', '123');
    log(true, `Filled checkout on ${url}`, 'using test card 4242…');
    await shot(page, 'checkout-filled');
    const pay = page.locator('#co-form button[type=submit], button[form="co-form"], #co-form button:not([type=button])').first();
    if (await pay.count()) {
      await pay.click().catch(e => log(false, `Checkout button on ${url}`, e.message.split('\n')[0]));
      await page.waitForTimeout(3000);
      const msg = (await page.locator('body').innerText().catch(() => '')).match(/(thank[^.\n]*|success[^.\n]*|error[^.\n]*|declin[^.\n]*|invalid[^.\n]*)/i);
      log(true, `Submitted checkout on ${url}`, msg ? `page says: "${msg[0].slice(0, 100)}"` : `now on ${page.url()}`);
      await shot(page, 'checkout-after');
    } else log(false, `Checkout on ${url}`, 'could not find the pay button');
    await page.close();
  }
}

// ---------- run everything ----------
console.log(`Site Bot starting on ${SITE}\n`);
const pages = await crawl();
await signupForms(pages);
await quizzes(pages);
await checkout(pages);
await browser.close();

const fails = report.filter(r => !r.ok);
const md = [`# Site Bot report`, ``, `Site: ${SITE}`, `Checks: ${report.length} · Problems: ${fails.length}`, ``,
  ...(fails.length ? ['## Problems', ...fails.map(r => `- ❌ ${r.what} — ${r.detail}`), ''] : ['No problems found.', '']),
  '## Everything the bot did', ...report.map(r => `- ${r.ok ? '✅' : '❌'} ${r.what}${r.detail ? ' — ' + r.detail : ''}`)].join('\n');
fs.writeFileSync(path.join(OUT, 'report.md'), md);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
console.log(`\nDone. ${fails.length} problem(s). Report saved to site-bot/out/report.md`);
process.exit(fails.length ? 1 : 0);
