/* Gentle Stretch app */
/* ================= pictures ================= */
const PIC={
 seat:'<svg viewBox="0 0 64 64" fill="none" stroke="#15281F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v34M14 40h26M16 40v16M38 40v16" stroke="#7FA08D"/><circle cx="24" cy="13" r="5"/><path d="M24 19v19h15v15h6M24 25l9 7"/></svg>',
 stand:'<svg viewBox="0 0 64 64" fill="none" stroke="#15281F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M40 27h20M56 27v29" stroke="#7FA08D"/><circle cx="22" cy="11" r="5"/><path d="M22 17v19M22 36l-4 20M22 36l4 20M22 22l18 5"/></svg>',
 wall:'<svg viewBox="0 0 64 64" fill="none" stroke="#15281F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M52 6v52" stroke="#7FA08D"/><circle cx="30" cy="13" r="5"/><path d="M30 19l-4 18M26 37l-4 19M26 37l4 19M29 24h23"/></svg>',
 calm:'<svg viewBox="0 0 64 64" fill="none" stroke="#15281F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v34M14 40h26M16 40v16M38 40v16" stroke="#7FA08D"/><circle cx="24" cy="13" r="5"/><path d="M24 19v19h15v15h6M24 26l6 6"/><path d="M42 16c3 2 3 6 0 8M48 12c5 4 5 12 0 16" stroke="#1D6B4F"/></svg>',
 hand:'<svg viewBox="0 0 64 64" fill="none" stroke="#15281F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 54h48" stroke="#7FA08D"/><path d="M20 54V30c0-3 5-3 5 0V18c0-3 5-3 5 0v10V14c0-3 5-3 5 0v14V18c0-3 5-3 5 0v16c3-4 8-2 6 2l-6 12v6"/></svg>'
};
const FACE=[
 '<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#FCE8E1" stroke="#9B2C12" stroke-width="2"/><path d="M11 14l4 2M25 14l-4 2M12 26c3-3 9-3 12 0" stroke="#9B2C12" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
 '<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#FCF0D2" stroke="#8A5A00" stroke-width="2"/><circle cx="13" cy="15" r="2" fill="#8A5A00"/><circle cx="23" cy="15" r="2" fill="#8A5A00"/><path d="M12 25c4-2 8-2 12 0" stroke="#8A5A00" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
 '<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#F1F3EF" stroke="#45574D" stroke-width="2"/><circle cx="13" cy="15" r="2" fill="#45574D"/><circle cx="23" cy="15" r="2" fill="#45574D"/><path d="M12 24h12" stroke="#45574D" stroke-width="2.4" stroke-linecap="round"/></svg>',
 '<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#E2EEE6" stroke="#1D6B4F" stroke-width="2"/><circle cx="13" cy="15" r="2" fill="#1D6B4F"/><circle cx="23" cy="15" r="2" fill="#1D6B4F"/><path d="M12 22c3 3 9 3 12 0" stroke="#1D6B4F" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
 '<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#D4EBDC" stroke="#14513B" stroke-width="2"/><path d="M10 15c1.5-2 4.5-2 6 0M20 15c1.5-2 4.5-2 6 0" stroke="#14513B" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M11 21h14c-1 5-4 7-7 7s-6-2-7-7z" fill="#14513B"/></svg>'
];
const SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9c1.5 1.5 1.5 4.5 0 6M19 6c3 3 3 9 0 12"/></svg>';
const TICK='<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
/* ================= moves ================= */
const AREAS={hands:'Hands & wrists',upper:'Neck & shoulders',back:'Back & core',legs:'Hips & knees',feet:'Ankles & feet',strength:'Strength',balance:'Balance',calm:'Breathing & calm'};
const M=[
{id:'thumb-touch',n:'Thumb touches',a:'hands',pic:'hand',sides:1,h:30,steps:['Rest your forearms on a table or your lap.','Touch your thumb to the tip of each finger in turn, making a soft "O" each time.','Go back and forth along your fingers, slowly.'],tip:'Light touches. There is no need to press.'},
{id:'finger-walk',n:'Finger walks',a:'hands',pic:'hand',sides:1,h:30,steps:['Lay your hand flat on a table.','Slowly walk your fingers sideways toward your thumb, one at a time.','Then walk them back to the start.'],tip:'Keep your palm resting on the table.'},
{id:'wrist-lift',n:'Wrist lifts at the table',a:'hands',pic:'hand',sides:2,h:25,steps:['Rest your forearm on a table with your hand just past the edge, palm down.','Slowly lift your hand up, then lower it down.','Keep your forearm still on the table.'],tip:'Move only as far as is comfortable.'},
{id:'towel-squeeze',n:'Soft towel squeeze',a:'hands',pic:'hand',sides:1,h:25,steps:['Roll a small hand towel into a tube.','Hold it in your hand and squeeze gently for a slow count of three.','Relax your grip fully, then squeeze again.'],tip:'A gentle squeeze is plenty. Never squeeze hard.'},
{id:'palm-turns',n:'Palm turns',a:'hands',pic:'seat',sides:1,h:25,steps:['Sit with your elbows bent at your sides.','Slowly turn your palms up to face the ceiling.','Then slowly turn them down to face the floor.'],tip:'Keep your elbows tucked in at your sides.'},
{id:'yes-nods',n:'Small "yes" nods',a:'upper',pic:'seat',sides:1,h:20,steps:['Sit tall and look straight ahead.','Slowly lower your chin a little, as if nodding yes.','Lift it back to level. Keep the movement small.'],tip:'Do not tip your head far back.'},
{id:'shrug-drop',n:'Shrug and let go',a:'upper',pic:'seat',sides:1,h:25,steps:['Let your arms rest by your sides.','Slowly lift your shoulders up toward your ears.','Pause, then let them gently drop and relax.'],tip:'Breathe out as your shoulders drop.'},
{id:'elbow-circles',n:'Elbow circles',a:'upper',pic:'seat',sides:1,h:30,steps:['Rest your fingertips lightly on your shoulders.','Slowly draw circles with your elbows.','Halfway through, change direction.'],tip:'If your fingertips will not reach, let your hands rest on your chest.'},
{id:'front-raise',n:'Arm raises to the front',a:'upper',pic:'seat',sides:1,h:25,steps:['Sit tall with your arms by your sides, thumbs pointing forward.','Slowly raise both arms in front of you, no higher than your shoulders.','Lower them slowly.'],tip:'One arm at a time is fine too.'},
{id:'finger-climb',n:'Wall finger climb',a:'upper',pic:'wall',sides:2,h:25,steps:['Sit or stand side-on to a wall, close enough to touch it.','Walk your fingers slowly up the wall as far as is comfortable.','Walk them back down.'],tip:'Stop before you feel any pinching in your shoulder.'},
{id:'side-reach',n:'Seated side reach',a:'back',pic:'seat',sides:2,h:20,steps:['Sit tall with both feet flat on the floor.','Rest one hand on the chair seat.','Raise your other arm and lean gently away from it, reaching up and over.'],tip:'Keep both hips on the chair.'},
{id:'pelvic-rock',n:'Pelvic rocks',a:'back',pic:'seat',sides:1,h:30,steps:['Sit near the front of your chair with your hands on your thighs.','Slowly tilt your hips back so your lower back rounds a little.','Then tilt them forward so your lower back arches a little. Keep rocking gently.'],tip:'This is a small, slow movement.'},
{id:'tummy-brace',n:'Gentle tummy tighten',a:'back',pic:'seat',sides:1,h:20,steps:['Sit tall and breathe normally.','Gently draw your belly button in toward your spine.','Hold lightly for a count of five, then relax.'],tip:'Keep breathing the whole time.'},
{id:'heel-slide',n:'Seated heel slides',a:'legs',pic:'seat',sides:2,h:25,steps:['Sit tall with your feet flat on the floor.','Slowly slide one foot forward along the floor, straightening the knee a little.','Slide it back under your chair as far as is comfortable.'],tip:'A sock on a smooth floor makes it easier.'},
{id:'knees-open',n:'Knees open and close',a:'legs',pic:'seat',sides:1,h:25,steps:['Sit with your feet and knees together.','Slowly let your knees fall apart, keeping your feet on the floor.','Bring them gently back together.'],tip:'Go only as wide as feels comfortable for your hips.'},
{id:'knee-hug',n:'Seated knee lift and hold',a:'legs',pic:'seat',sides:2,h:20,steps:['Sit tall and hold the sides of your chair.','Slowly lift one knee a few inches.','Hold for a moment, then lower it slowly.'],tip:'Keep your back tall, not leaning back.'},
{id:'toe-taps',n:'Toe lifts and taps',a:'feet',pic:'seat',sides:1,h:25,steps:['Sit with your heels on the floor.','Lift the front of your feet, then tap them down.','Keep a slow, steady rhythm.'],tip:'Good to do any time you have been sitting.'},
{id:'ankle-alphabet',n:'Ankle alphabet',a:'feet',pic:'seat',sides:2,h:30,steps:['Lift one foot slightly off the floor, or rest your heel down.','Slowly draw the letters A, B, C in the air with your big toe.','Go as far through the alphabet as feels easy.'],tip:'Small letters are fine.'},
{id:'towel-scrunch',n:'Towel toe scrunch',a:'feet',pic:'seat',sides:1,h:25,steps:['Place a small towel flat on the floor under your bare feet.','Slowly scrunch the towel toward you with your toes.','Relax and spread your toes, then scrunch again.'],tip:'If your toes cramp, stop and wiggle them.'},
{id:'sit-stand',n:'Sit to stand',a:'strength',pic:'seat',stand:1,alt:'knee-hug',sides:1,h:30,steps:['Sit near the front of a sturdy chair that will not slide, feet flat and hip-width apart.','Lean forward a little and press through your feet to stand up slowly. Use the armrests if you need to.','Pause, then sit back down slowly and with control.','Repeat at an easy pace, resting whenever you like.'],tip:'Using your hands is completely fine. Stop if your knees or hips hurt sharply.'},
{id:'heel-raise',n:'Heel raises at the counter',a:'strength',pic:'stand',stand:1,alt:'seated-heel',sides:1,h:25,steps:['Stand facing a kitchen counter or the back of a sturdy chair and hold on with both hands.','Slowly rise up onto your toes.','Pause, then lower your heels slowly.','Repeat at an easy pace.'],tip:'Keep holding on the whole time.'},
{id:'seated-heel',n:'Seated heel raises',a:'strength',pic:'seat',sides:1,h:25,steps:['Sit tall with your feet flat on the floor.','Lift both heels, keeping your toes on the floor.','Lower slowly and repeat.'],tip:'Press gently through the balls of your feet.'},
{id:'wall-push',n:'Wall push-ups',a:'strength',pic:'wall',stand:1,alt:'palm-press',sides:1,h:25,steps:['Stand an arm\'s length from a wall with your feet hip-width apart.','Place your palms flat on the wall at shoulder height.','Slowly bend your elbows to bring your chest toward the wall.','Push gently back to the start. Repeat at an easy pace.'],tip:'Stand closer to the wall to make it easier.'},
{id:'palm-press',n:'Seated palm press',a:'strength',pic:'seat',sides:1,h:20,steps:['Sit tall and press your palms together in front of your chest.','Press gently for a slow count of five, then relax.','Repeat until the timer ends.'],tip:'Keep breathing. Do not hold your breath.'},
{id:'weight-shift',n:'Side-to-side weight shifts',a:'balance',pic:'stand',stand:1,alt:'pelvic-rock',sides:1,h:25,steps:['Stand at a counter and hold on with both hands, feet hip-width apart.','Slowly shift your weight onto one foot, then over to the other.','Keep both feet on the floor.'],tip:'Hold on the whole time.'},
{id:'side-leg',n:'Side leg lifts at the counter',a:'balance',pic:'stand',stand:1,alt:'knees-open',sides:2,h:20,steps:['Stand at a counter and hold on with both hands.','Slowly lift one leg out to the side a few inches, keeping your toes pointing forward.','Lower it slowly.'],tip:'Stand tall. Do not lean over to lift higher.'},
{id:'heel-curl',n:'Standing heel curls',a:'balance',pic:'stand',stand:1,alt:'heel-slide',sides:2,h:20,steps:['Stand at a counter and hold on with both hands.','Slowly bend one knee to bring your heel up behind you.','Lower it slowly.'],tip:'Keep your knees side by side.'},
{id:'belly-breath',n:'Slow belly breathing',a:'calm',pic:'calm',calm:1,sides:1,h:60,steps:['Get comfortable and rest one hand on your belly.','Breathe in slowly through your nose and feel your belly rise.','Breathe out slowly, as if through a straw.'],tip:'There is no right way. Just slow down a little.'},
{id:'long-out',n:'Longer breath out',a:'calm',pic:'calm',calm:1,sides:1,h:60,steps:['Breathe in gently for a count of four.','Breathe out slowly for a count of six.','Let your shoulders drop each time you breathe out.'],tip:'If counting feels like work, just make the breath out a little longer.'},
{id:'soften',n:'Soften and let go',a:'calm',pic:'calm',calm:1,sides:1,h:60,steps:['Close your eyes if you like.','Notice your jaw, your shoulders and your hands.','Each time you breathe out, let one of them soften a little.'],tip:'Rest is part of looking after your joints.'}
];
const MB={};M.forEach(m=>MB[m.id]=m);
const R=[
{id:'wake',n:'Wake up gently',d:'Loosen up from head to toe, all seated.',ids:['yes-nods','shrug-drop','elbow-circles','pelvic-rock','heel-slide','toe-taps']},
{id:'hands',n:'Hands that work',d:'For stiff fingers, thumbs and wrists.',ids:['thumb-touch','finger-walk','wrist-lift','palm-turns','towel-squeeze']},
{id:'upper',n:'Neck & shoulders',d:'Ease tension in your upper body.',ids:['yes-nods','shrug-drop','elbow-circles','front-raise','finger-climb','side-reach']},
{id:'legs',n:'Hips & knees',d:'Gentle movement for your lower body.',ids:['heel-slide','knees-open','knee-hug','pelvic-rock','ankle-alphabet','toe-taps']},
{id:'strength',n:'Gentle strength',d:'Simple moves that help with everyday things, like getting up from a chair.',ids:['toe-taps','sit-stand','heel-raise','wall-push','palm-press','tummy-brace']},
{id:'balance',n:'Steady on your feet',d:'Supported balance moves at the kitchen counter.',ids:['weight-shift','heel-raise','side-leg','heel-curl']},
{id:'evening',n:'Evening ease',d:'Slow and calming before bed.',ids:['pelvic-rock','side-reach','shrug-drop','ankle-alphabet','long-out','soften']},
{id:'easy',n:'Easy day',d:'Very gentle and fully seated, with short holds. For sore days and flare days.',ids:['long-out','thumb-touch','yes-nods','shrug-drop','toe-taps','soften'],easy:1},
{id:'breathe',n:'Breathing break',d:'Three calm minutes. No movement needed.',ids:['belly-breath','long-out','soften']}
];
const RB={};R.forEach(r=>RB[r.id]=r);
const RPIC={wake:'seat',hands:'hand',upper:'seat',legs:'seat',strength:'wall',balance:'stand',evening:'calm',easy:'seat',breathe:'calm'};
const JOINTS={hands:['Hands & wrists','hands'],neck:['Neck','upper'],shoulders:['Shoulders','upper'],back:['Back','evening'],hips:['Hips','legs'],knees:['Knees','legs'],feet:['Ankles & feet','legs']};
const MOODS=['Sore','Stiff','Okay','Good','Great'];
const ACTS=['Getting up from a chair','Walking','Climbing stairs','Opening jars and bottles','Getting dressed','Gardening','Reaching up high','Picking things up from the floor'];
const DAYS=[['MO','Mon'],['TU','Tue'],['WE','Wed'],['TH','Thu'],['FR','Fri'],['SA','Sat'],['SU','Sun']];
const LEVELS=[[0.7,'Shorter'],[1,'Standard'],[1.3,'A little longer'],[1.6,'Longer']];
const LEARN=[
{t:'Why gentle movement helps',b:'Joints are made to move. Regular, gentle movement keeps the muscles around them working and can make everyday tasks feel a little easier. Little and often tends to suit stiff joints better than a lot all at once.'},
{t:'A little soreness can be normal',b:'When you start moving more, you may feel some mild soreness. That is common, and it usually settles as your body gets used to it. Sharp, severe or worsening pain is different. That is a sign to stop and ease off.'},
{t:'The two-hour check',b:'Notice how your joints feel about two hours after you move. If they feel worse than before you started, do a little less next time: shorter holds, fewer moves, or the Easy day routine. You do not need to stop moving altogether.'},
{t:'How much should a move feel?',b:'Aim for a gentle pull or light effort, never pain. Think of a scale from 0 (nothing) to 10 (the worst pain you can imagine). From 0 to 3 is fine. At 4 or 5, go gentler or shorter. Above 5, or if pain is sharp or getting worse as you move, stop that move.'},
{t:'Flare days happen',b:'Flares are not your fault, and one bad day does not undo your progress. On those days, smaller movements, seated moves, warmth and rest breaks can help you get through. The Easy day routine and the Breathing break are there for exactly this.'},
{t:'Warm up first',b:'Stiff joints often loosen after a few minutes of easy movement. A warm shower, or a warm (not hot) pack for a few minutes before you start, may also help you feel looser.'},
{t:'Missing a day is fine',b:'This app counts your week, not unbroken days. Missing a day, or a few, is part of real life. Whenever you come back, start gently and pick up where you are.'},
{t:'Breathe while you move',b:'It is easy to hold your breath while you concentrate. Try breathing slowly in through your nose and out through your mouth. A relaxed breath helps your muscles relax too.'},
{t:'Strength matters too',b:'Stretching helps you move, and gentle strength work helps your muscles support your joints. Simple moves like standing up from a chair or heel raises at a counter count. You will find them in the Gentle strength routine.'},
{t:'Pacing your day',b:'Spread bigger jobs across the day and the week. Break a large task into smaller pieces, with rests in between. Stopping before you are worn out often lets you do more overall.'},
{t:'Sleep and stiff joints',b:'Poor sleep can make pain feel louder, and pain can make sleep harder. A regular bedtime, a calm wind-down and the Evening ease routine may help you settle.'},
{t:'Walking counts',b:'Short, easy walks are good for your whole body. Start with what feels comfortable, even a few minutes, and build slowly. Supportive shoes and level paths make it easier.'},
{t:'Be kind to your hands',b:'Tools with bigger handles, jar openers and lifting with two hands can take strain off sore fingers and wrists. Small changes to how you do everyday jobs add up.'},
{t:'Notice what helps',b:'The Progress page shows the days you moved and how your joints felt. Over a few weeks, you may start to notice patterns, like which routines or times of day suit you best.'},
{t:'Mood and pain are linked',b:'Living with pain can wear you down, and feeling low can make pain harder to cope with. Gentle activity, time outdoors and talking with people you trust can all help. If low mood lasts, please talk to your doctor.'},
{t:'Talking with your doctor',b:'The Progress page has a one-page summary of your sessions and how your joints have felt. You can print it or show it on your phone at your next appointment.'},
{t:'Medicines and movement',b:'Keep taking anything you have been prescribed. Only change or reduce a medicine after speaking with your doctor. Gentle movement works alongside your care, not instead of it.'},
{t:'Cold weather and stiffness',b:'Many people feel stiffer when it is cold or damp. Warm layers, gloves and a few extra minutes of warm-up can make those days easier.'},
{t:'Celebrate small wins',b:'Opening a jar more easily or getting up from a chair with less effort is real progress. Take a moment to notice it. Small steps really do add up.'},
{t:'Steady on your feet',b:'For any standing move, hold a sturdy counter or chair back. Clear the floor around you, wear non-slip shoes and make sure the room is well lit. You can switch on "Seated only" at any time.'},
{t:'When to get help',b:'Most aches settle with rest and gentle movement. Some signs need a doctor quickly, like a joint that is suddenly hot, red and swollen, or not being able to put weight on a leg. The full list is on the "When to stop" page.'}
];
/* ================= storage ================= */
const KEY='gjc_stretch_v1';
function load(){let d={};try{d=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}return norm(d)}
function norm(d){
 if(d.v!==2){d.swaps={};d.hidden=[];d.favs=[];d.v=2}
 d.sessions=Array.isArray(d.sessions)?d.sessions:[];d.checkins=Array.isArray(d.checkins)?d.checkins:[];
 d.favs=d.favs||[];d.hidden=d.hidden||[];d.swaps=d.swaps||{};d.focus=(d.focus||[]).filter(k=>JOINTS[k]);d.acts=d.acts||[];
 d.voice=d.voice===undefined?true:!!d.voice;d.level=d.level===undefined?1:+d.level;
 d.goal=+d.goal||3;d.seated=!!d.seated;d.activity=d.activity||'';d.text=+d.text||1;d.hc=!!d.hc;d.slow=!!d.slow;
 d.rem=d.rem||{days:['MO','WE','FR'],time:'09:00'};d.seen=+d.seen||0;d.lighten=d.lighten||'';d.readOn=d.readOn||'';
 d.onboarded=!!d.onboarded;d.safety=!!d.safety;return d}
let st=load();save();
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
/* ================= helpers ================= */
function ymd(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function pd(s){const p=s.split('-');return new Date(+p[0],p[1]-1,+p[2])}
function gap(a,b){return Math.round((pd(b)-pd(a))/864e5)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function fmt(s,o){return pd(s).toLocaleDateString(undefined,o||{month:'short',day:'numeric'})}
function daysSet(){const o={};st.sessions.forEach(s=>o[s.date]=1);return o}
function weekStart(d){d=new Date(d.getFullYear(),d.getMonth(),d.getDate());d.setDate(d.getDate()-((d.getDay()+6)%7));return d}
function weekCount(ws){const o=daysSet();let n=0;const d=new Date(ws);for(let i=0;i<7;i++){if(o[ymd(d)])n++;d.setDate(d.getDate()+1)}return n}
function thisWeek(){return weekCount(weekStart(new Date()))}
function weekStreak(){let ws=weekStart(new Date()),n=0;if(weekCount(ws)>=st.goal)n++;ws.setDate(ws.getDate()-7);while(weekCount(ws)>=st.goal&&n<520){n++;ws.setDate(ws.getDate()-7)}return n}
function monthDays(){const p=ymd().slice(0,7);return Object.keys(daysSet()).filter(k=>k.slice(0,7)===p).length}
function todayMood(){const t=st.checkins.filter(c=>c.date===ymd()).slice(-1)[0];return t?t.m:0}
function last(){return st.sessions[st.sessions.length-1]}
function plural(n,w){return n+' '+w+(n===1?'':'s')}
function hold(m,r){if(m.calm)return m.h;const lv=r&&r.easy?0:st.level;return Math.max(10,Math.round(m.h*LEVELS[lv][0]/5)*5)}
function resolve(r){
 const used=[],out=[],sw=st.swaps[r.id]||{},seat=st.seated||r.easy;
 r.ids.forEach((id0,i)=>{let id=sw[i]||id0;if(!MB[id])return;
  if(seat&&MB[id].stand&&MB[id].alt){id=MB[id].alt;if(used.includes(id)||r.ids.includes(id))return}
  const bad=x=>!x||st.hidden.includes(x)||used.includes(x)||(seat&&MB[x].stand);
  if(bad(id)){const a=M.find(x=>x.a===MB[id].a&&!bad(x.id))||(MB[id].calm?null:M.find(x=>!x.calm&&!bad(x.id)));if(!a)return;id=a.id}
  used.push(id);out.push(id)});
 return out}
function secs(r){return resolve(r).reduce((t,i)=>t+hold(MB[i],r)*MB[i].sides,0)}
function mins(s){return Math.max(1,Math.round(s/60))}
function need(r){const ids=resolve(r);if(ids.every(i=>MB[i].calm))return'a comfortable seat';const t=[];if(ids.some(i=>MB[i].pic!=='stand'))t.push('a sturdy chair without wheels');if(ids.some(i=>MB[i].pic==='stand'))t.push('a counter to hold');if(ids.some(i=>MB[i].pic==='wall'))t.push('a clear wall');if(ids.some(i=>/towel/.test(i)))t.push('a small towel');if(ids.some(i=>i==='wrist-lift'||i==='finger-walk'))t.push('a table');return t.join(', ')}
function followUp(){const s=last();if(!s||s.asked||s.date>=ymd())return null;return gap(s.date,ymd())<=3?s:null}
function soreRun(){const c=st.checkins.slice(-3);if(c.length===3&&c.every(x=>x.m===1)&&gap(c[0].date,c[2].date)<=2&&gap(c[2].date,ymd())<=2)return true;const w=st.sessions.filter(s=>s.asked).slice(-2);return w.length===2&&w.every(s=>s.worse)&&gap(w[1].date,ymd())<=7}
function greet(){const h=new Date().getHours();return h<12?'Good morning':h<18?'Good afternoon':'Good evening'}
function plan(){
 const m=todayMood(),h=new Date().getHours();
 if(st.lighten===ymd())return{r:'easy',why:'Your last session left your joints sore for a while, so today is a lighter one.'};
 if(m===1)return{r:'easy',why:'Thanks for telling us. Let\'s keep it very gentle today. Rest is fine too.'};
 if(m===2)return{r:'wake',why:'Let\'s loosen up slowly, from head to toe.'};
 let r=h<11?'wake':h<18?'strength':'evening';
 if(st.focus.length&&h>=11&&h<18&&new Date().getDate()%2){r=JOINTS[st.focus[new Date().getDate()%st.focus.length]][1]}
 return{r,why:'About '+mins(secs(RB[r]))+' minutes, at your own pace.'}}
let voices=[];function pv(){try{voices=speechSynthesis.getVoices()}catch(e){}}
if('speechSynthesis' in window){pv();try{speechSynthesis.onvoiceschanged=pv}catch(e){}}
function say(t){if(!('speechSynthesis' in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=st.slow?.8:.9;const v=voices.find(v=>/^en/i.test(v.lang)&&/natural|samantha|karen|daniel|google/i.test(v.name));if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){}}
function speak(t){if(st.voice)say(t)}
function hush(){try{speechSynthesis.cancel()}catch(e){}}
function chime(){try{const c=new(window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=523;g.gain.setValueAtTime(.07,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.5);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.5);setTimeout(()=>c.close(),700)}catch(e){}}
function prefs(){document.body.classList.remove('t1','t2','t3');document.body.classList.add('t'+st.text);document.body.classList.toggle('hc',st.hc)}
function dl(name,type,text){const b=new Blob([text],{type}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(u);a.remove()},600)}
function pic(k,big){return`<div class="pict${big?' big':''}" aria-hidden="true">${PIC[k]||PIC.seat}</div>`}
function todaysCard(){return LEARN[st.seen%LEARN.length]}
/* ================= shell ================= */
const app=document.getElementById('app'),backBtn=document.getElementById('back'),nav=document.querySelector('.nav');
function shell(tab,back){nav.hidden=false;backBtn.hidden=!back;document.querySelectorAll('.nav a').forEach(a=>{const on=a.dataset.tab===tab;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')})}
backBtn.onclick=()=>{history.length>1?history.back():go('#/home')};
function on(sel,fn){document.querySelectorAll(sel).forEach(el=>el.addEventListener('click',()=>fn(el)))}
function $(id){return document.getElementById(id)}
/* ================= onboarding ================= */
function onboard(step){
 step=+step||0;nav.hidden=true;backBtn.hidden=true;
 const pr='<div class="prog" aria-hidden="true">'+[1,2,3,4].map(i=>`<i class="${i<=step?'on':''}"></i>`).join('')+'</div>';
 const skip='<button class="textbtn" id="skip">Skip this question</button>';
 let h='';
 if(step===0)h=`<div class="stack"><div class="label">Welcome</div><h1>Gentle movement for stiff joints</h1>
 <p>Short, guided routines you can do in a chair. A calm voice talks you through each move, and you can stop or slow down any time.</p>
 <div class="box warm"><h3 style="margin-bottom:8px">Before you begin</h3><ul style="margin:0;padding-left:22px">
 <li>Gentle Stretch offers general movement ideas for wellbeing. It does not diagnose or treat any condition and is not a substitute for advice from your doctor or physical therapist.</li>
 <li style="margin-top:6px">If you have a new or unexplained joint problem, recent surgery or injury, or a doctor has told you to limit activity, check with them first.</li>
 <li style="margin-top:6px">Move slowly. A gentle pull is fine. Sharp, severe or worsening pain is a sign to stop.</li></ul>
 <p style="margin-top:12px"><a href="#/safety">When to stop and get help</a></p></div>
 <button class="btn sun wide" id="ok">I understand. Let's begin</button></div>`;
 if(step===1)h=pr+`<div class="stack"><h1>Which joints bother you most?</h1><p class="muted">Pick up to three. You can change this later.</p>`
 +Object.keys(JOINTS).map(k=>`<button class="choice ${st.focus.includes(k)?'on':''}" data-k="${k}" aria-pressed="${st.focus.includes(k)}">${JOINTS[k][0]}</button>`).join('')
 +`<button class="btn wide" id="next">Next</button>${skip}</div>`;
 if(step===2)h=pr+`<div class="stack"><h1>How do you feel about standing for five minutes?</h1>`
 +[['yes','I can stand comfortably'],['hold','I can stand if I hold on to something'],['sit','I\'d rather stay seated','You\'ll get seated versions of every move']].map(o=>`<button class="choice" data-v="${o[0]}">${o[1]}${o[2]?'<small>'+o[2]+'</small>':''}</button>`).join('')+skip+`</div>`;
 if(step===3)h=pr+`<div class="stack"><h1>What would you most like to find easier?</h1><p class="muted">Every couple of weeks we'll ask how this is going, so you can see your progress.</p>`
 +ACTS.map(a=>`<button class="choice ${st.activity===a?'on':''}" data-v="${esc(a)}">${esc(a)}</button>`).join('')+skip+`</div>`;
 if(step===4)h=pr+`<div class="stack"><h1>How many days a week would you like to move?</h1><p class="muted">Any session counts, even one minute. Most experts suggest at least three days a week.</p>`
 +[2,3,4,5].map(n=>`<button class="choice ${st.goal===n?'on':''}" data-v="${n}">${n} days a week${n===3?'<small>Suggested</small>':''}</button>`).join('')+`</div>`;
 if(step===5)h=`<div class="stack" style="text-align:center;padding-top:16px"><div class="endtick" aria-hidden="true">${TICK}</div><h1>You're all set</h1>
 <p>Your goal is <b>${st.goal} days a week</b>. Each day, tell us how your joints feel and we'll suggest a routine to match.</p>
 <p class="muted">Want a reminder? You can add one to your phone's calendar from the Progress page.</p><button class="btn sun wide" id="ok">Go to today</button></div>`;
 app.innerHTML=h;window.scrollTo(0,0);
 const nx=()=>go('#/start/'+(step+1));
 if($('ok'))$('ok').onclick=()=>{if(step===0){st.safety=true;save();nx()}else{st.onboarded=true;save();go('#/home')}};
 if($('skip'))$('skip').onclick=nx;if($('next'))$('next').onclick=nx;
 if(step===1)on('.choice',b=>{const k=b.dataset.k,i=st.focus.indexOf(k);if(i>-1)st.focus.splice(i,1);else{if(st.focus.length>=3)st.focus.shift();st.focus.push(k)}save();onboard(1)});
 if(step===2)on('.choice',b=>{st.seated=b.dataset.v==='sit';save();nx()});
 if(step===3)on('.choice',b=>{st.activity=b.dataset.v;save();nx()});
 if(step===4)on('.choice',b=>{st.goal=+b.dataset.v;save();nx()});
}
/* ================= today ================= */
function dotsHTML(wc){return`<div class="dots" aria-hidden="true">${Array.from({length:Math.max(st.goal,wc)},(_,i)=>`<i class="${i<wc?'on':''}"></i>`).join('')}</div>`}
function home(){
 shell('home');const p=plan(),r=RB[p.r],m=todayMood(),ls=last(),wc=thisWeek(),moved=daysSet()[ymd()],readToday=st.readOn===ymd(),card=todaysCard();
 const away=ls&&gap(ls.date,ymd())>3;
 let h='<div class="stack">';
 h+=`<div><p class="muted">${away?'Welcome back':greet()}</p><h1>Today's session</h1></div>`;
 h+=`<div class="box week"><div style="flex:1;min-width:0"><b>This week:</b> ${Math.min(wc,st.goal)} of ${st.goal} days${wc>=st.goal?'. Goal reached.':''}</div>${dotsHTML(wc)}</div>`;
 const fu=followUp();
 if(fu)h+=`<div class="box tint" id="fu"><h3 style="margin-bottom:6px">A quick question</h3><p>After your last session (${esc(fu.name)}), did your joints feel worse for more than two hours afterwards?</p><div class="btns" style="margin-top:12px"><button class="btn line sm" data-a="yes">Yes</button><button class="btn line sm" data-a="no">No</button><button class="btn line sm" data-a="unsure">Not sure</button></div></div>`;
 if(soreRun())h+=`<div class="box warm"><h3 style="margin-bottom:6px">Your joints have been sore for a few days</h3><p>It may be worth checking in with your doctor or a physical therapist. In the meantime, Easy day and the Breathing break are here for you.</p><p style="margin-top:8px"><a href="#/safety">When to stop and get help</a></p></div>`;
 h+=`<ol class="session">
 <li><div class="num ${m?'done':''}">${m?'✓':'1'}</div><div><h3>How are your joints today?</h3><div class="faces" role="group" aria-label="How are your joints today">${MOODS.map((x,i)=>`<button data-m="${i+1}" class="${m===i+1?'on':''}" aria-pressed="${m===i+1}">${FACE[i]}<span>${x}</span></button>`).join('')}</div><p class="note" style="margin-top:8px">${m?'Saved. Tap another face to change it.':'Your answer shapes the routine below.'}</p></div></li>
 <li><div class="num ${moved?'done':''}">${moved?'✓':'2'}</div><div><h3>Move</h3><div class="box"><div class="move">${pic(RPIC[r.id])}<div><b style="font:700 21px var(--head)">${r.n}</b><p class="muted small">${moved?'You moved today. This one is ready if you\'d like more.':p.why}</p></div></div><p class="small" style="margin-top:10px"><b>You'll need:</b> ${need(r)}.</p><div class="btns" style="margin-top:14px"><button class="btn sun" id="go">Start &middot; ${mins(secs(r))} min</button><a class="textbtn" href="#/moves">Choose another</a></div></div>
 ${m>=4&&p.r!=='strength'?`<p class="small" style="margin-top:10px">Feeling good? <a href="#/r/strength">Gentle strength</a> is ready if you'd like a little more.</p>`:''}</div></li>
 <li><div class="num ${readToday?'done':''}">${readToday?'✓':'3'}</div><div><h3>Learn something small</h3><details class="read" id="rd"><summary>${card.t}</summary><div class="in"><p>${card.b}</p><button class="say" id="say">${SPK} Read this to me</button></div></details></div></li></ol>`;
 h+=`<div class="box warm"><h3 style="margin-bottom:6px">Sore day or flare?</h3><p>Rest is part of looking after your joints. If you'd like to move, these are very gentle.</p><div class="btns" style="margin-top:12px"><a class="btn line sm" href="#/r/easy">Easy day</a><a class="btn line sm" href="#/r/breathe">Breathing break</a></div><p style="margin-top:10px"><a href="#/flare">What helps on flare days</a></p></div>`;
 if(st.focus.length){const ids=[...new Set(st.focus.map(f=>JOINTS[f][1]))];h+=`<h2 style="margin-top:6px">For your ${st.focus.map(f=>JOINTS[f][0].toLowerCase()).join(', ').replace(/, ([^,]*)$/,' and $1')}</h2><div class="list">${ids.map(rowR).join('')}</div>`}
 h+=`<p class="note">Gentle Stretch offers general wellness information, not medical advice. Move slowly, never push into sharp pain, and check with your doctor or physical therapist if you are unsure. <a href="#/safety">When to stop</a></p></div>`;
 app.innerHTML=h;
 on('.faces button',b=>{const v=+b.dataset.m;st.checkins=st.checkins.filter(c=>c.date!==ymd());st.checkins.push({date:ymd(),m:v});save();home()});
 on('#fu button',b=>{const s=last();s.asked=true;s.worse=b.dataset.a==='yes';if(s.worse)st.lighten=ymd();save();home()});
 $('go').onclick=()=>startPlay(r);
 $('rd').addEventListener('toggle',()=>{if($('rd').open&&st.readOn!==ymd()){st.readOn=ymd();save();const n=document.querySelectorAll('.num')[2];n.classList.add('done');n.textContent='✓'}});
 $('say').onclick=()=>say(card.t+'. '+card.b);
}
function rowR(id){const r=RB[id];return`<a class="row" href="#/r/${r.id}">${pic(RPIC[r.id])}<div><b>${r.n}</b><span class="muted">${mins(secs(r))} min &middot; ${esc(r.d)}</span></div><span aria-hidden="true" style="font-size:26px;color:var(--green)">&rsaquo;</span></a>`}
/* ================= flare & safety ================= */
function flare(){shell('home',true);app.innerHTML=`<div class="stack"><h1>Flare days</h1><div class="box"><p><b>Flares happen, and they are not your fault.</b> One hard day does not undo your progress.</p><ul style="padding-left:22px;margin:12px 0 0">
<li>Try smaller movements, fewer repeats and seated positions.</li><li>Warmth before moving, like a warm shower or a warm (not hot) pack, may help.</li><li>Take rest breaks. Gentle movement is usually better than complete rest, but listen to your body.</li><li>Keep taking anything you have been prescribed.</li></ul></div>
<div class="box alert"><b>Call your doctor</b> if a joint is suddenly hot, red and very swollen, or if you have a fever or feel unwell.</div>
<div class="btns"><a class="btn sun" href="#/play/easy">Start Easy day</a><a class="btn line" href="#/play/breathe">Breathing break</a></div><p><a href="#/safety">When to stop and get help</a></p></div>`}
function flags(){return`<div class="flags"><p>Most aches settle with rest and gentle movement. These signs need attention.</p>
<h3>Call 911 (or your local emergency number) for:</h3><ul><li>Chest pain or pressure</li><li>Severe shortness of breath</li><li>Fainting</li><li>Sudden weakness or numbness of the face, arm or leg, or slurred speech</li></ul>
<h3>Stop and contact a doctor the same day if you have:</h3><ul><li>A joint that is suddenly hot, red and swollen, especially with a fever or feeling unwell</li><li>Not being able to put weight on a leg, or a joint that looks out of shape after a fall or twist</li><li>New numbness or tingling in both legs, numbness around the groin or buttocks, or new bladder or bowel problems</li><li>A painful, swollen, warm calf</li><li>A joint that keeps giving way or locking</li></ul>
<h3>See your doctor soon if you have:</h3><ul><li>Pain that wakes you at night or keeps getting worse over weeks</li><li>Unexplained weight loss or fever</li><li>Several swollen joints with morning stiffness that lasts more than about half an hour</li><li>Pain that is still worse a day or two after gentle movement</li></ul>
<h3>While you move</h3><div class="zones"><div class="z1">0 to 3 out of 10: a gentle pull or light effort. Fine to continue.</div><div class="z2">4 to 5 out of 10: go gentler or shorter.</div><div class="z3">Above 5, sharp, or getting worse: stop that move.</div></div>
<p style="margin-top:12px">If your joints hurt more two hours after moving than before, do less next time. You do not need to stop moving altogether.</p></div>`}
function safety(){if(!st.safety){nav.hidden=true;backBtn.hidden=false}else shell('',true);app.innerHTML=`<div class="stack"><h1>When to stop and get help</h1><div class="box">${flags()}</div><p class="note">General information only. If you are ever unsure, contact your doctor.</p></div>`}
/* ================= moves ================= */
let mv='routines',mvArea='all';
function moves(){
 shell('moves');
 let h=`<div class="stack"><h1>Moves</h1><div class="seg" role="tablist"><button role="tab" aria-selected="${mv==='routines'}" class="${mv==='routines'?'on':''}" data-v="routines">Routines</button><button role="tab" aria-selected="${mv==='all'}" class="${mv==='all'?'on':''}" data-v="all">Single moves</button></div>`;
 if(mv==='routines')h+=`<div class="list">${R.map(r=>rowR(r.id)).join('')}</div>`;
 else{const list=M.filter(x=>(mvArea==='all'||(mvArea==='fav'?st.favs.includes(x.id):x.a===mvArea))&&!(st.seated&&x.stand));
  h+=`<label class="check box" style="padding:10px 16px"><input type="checkbox" id="seat" ${st.seated?'checked':''}><span><b>Seated only</b><br><span class="muted small">Hide standing moves, and use seated versions in routines</span></span></label>
  <div class="pills"><button data-a="all" class="${mvArea==='all'?'on':''}">All</button>${Object.keys(AREAS).map(k=>`<button data-a="${k}" class="${mvArea===k?'on':''}">${AREAS[k]}</button>`).join('')}<button data-a="fav" class="${mvArea==='fav'?'on':''}">Saved</button></div>
  <div class="list">${list.length?list.map(x=>`<a class="row" href="#/m/${x.id}">${pic(x.pic)}<div><b>${x.n}</b><span class="muted">${AREAS[x.a]} &middot; ${hold(x)} sec${x.sides>1?' each side':''}${st.hidden.includes(x.id)?' &middot; not suggested':''}</span></div><span aria-hidden="true" style="font-size:26px;color:var(--green)">&rsaquo;</span></a>`).join(''):'<div class="box">Nothing saved yet. Open a move and tap Save.</div>'}</div>`}
 app.innerHTML=h+'</div>';
 on('.seg button',b=>{mv=b.dataset.v;moves()});on('.pills button',b=>{mvArea=b.dataset.a;moves()});
 if($('seat'))$('seat').onchange=e=>{st.seated=e.target.checked;save();moves()};
}
function move(id){
 const x=MB[id];if(!x)return go('#/moves');shell('moves',true);const fav=st.favs.includes(id),hid=st.hidden.includes(id);
 app.innerHTML=`<div class="stack"><div style="display:flex;gap:16px;align-items:center">${pic(x.pic,true)}<div style="min-width:0"><h1>${x.n}</h1><div style="margin-top:6px"><span class="tag">${AREAS[x.a]}</span>${x.stand?'<span class="tag stand">Standing, with support</span>':''}</div></div></div>
 <div class="box"><h3>How to do it</h3><ol class="steps">${x.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><p style="margin-top:6px"><b>${x.calm?'Time':'Hold or repeat'}:</b> about ${hold(x)} seconds${x.sides>1?' on each side':''}.</p>
 <div class="box warm" style="margin-top:12px;padding:14px 16px"><b>Go gently:</b> ${esc(x.tip)}</div>
 ${x.alt?`<p style="margin-top:12px">Prefer to sit? Try <a href="#/m/${x.alt}">${MB[x.alt].n}</a> instead.</p>`:''}
 <button class="say" id="say">${SPK} Read this to me</button></div>
 <div class="btns"><button class="btn sun" id="try">Try it now</button><button class="btn line sm" id="fav" aria-pressed="${fav}">${fav?'Saved':'Save'}</button></div>
 <label class="check"><input type="checkbox" id="hid" ${hid?'checked':''}><span>Don't suggest this move in routines</span></label>
 <p class="note">Stop if anything causes sharp pain. <a href="#/safety">When to stop</a></p></div>`;
 $('fav').onclick=()=>{const i=st.favs.indexOf(id);i>-1?st.favs.splice(i,1):st.favs.push(id);save();move(id)};
 $('hid').onchange=e=>{if(e.target.checked){if(!st.hidden.includes(id))st.hidden.push(id)}else st.hidden=st.hidden.filter(v=>v!==id);save()};
 $('say').onclick=()=>say(x.n+'. '+x.steps.join(' ')+' '+x.tip);
 $('try').onclick=()=>startPlay({id:'single',n:x.n,ids:[id]});
}
function routine(id){
 const r=RB[id];if(!r)return go('#/home');shell('moves',true);const ids=resolve(r),sw=st.swaps[id]||{};
 app.innerHTML=`<div class="stack"><div><div class="label">Routine</div><h1 style="margin-top:4px">${r.n}</h1><p class="muted" style="margin-top:6px">${esc(r.d)}</p></div>
 <div class="box tint"><p><b>About ${mins(secs(r))} minutes</b> &middot; ${plural(ids.length,'move')}</p><p class="small" style="margin-top:4px"><b>You'll need:</b> ${need(r)}.</p></div>
 <button class="btn sun wide" id="go">Start</button>
 <div class="list">${ids.map((i,n)=>{const x=MB[i];return`<div class="row">${pic(x.pic)}<div><a href="#/m/${i}" style="text-decoration:none;color:inherit"><b>${n+1}. ${x.n}</b></a><span class="muted">${hold(x,r)} sec${x.sides>1?' each side':''}${x.stand?' &middot; standing, with support':''}</span></div>${x.calm?'<span></span>':`<button class="btn line sm" data-n="${n}" data-id="${i}" aria-label="Swap ${esc(x.n)} for a similar move">Swap</button>`}</div>`}).join('')}</div>
 ${Object.keys(sw).length?'<button class="textbtn" id="reset">Put back the original moves</button>':''}
 ${r.easy||r.id==='breathe'?'':`<div class="box"><h3>Your pace</h3><p class="muted small" style="margin:4px 0 12px">How long to hold or repeat each move</p><div class="pills" id="lv">${LEVELS.map((v,i)=>`<button data-l="${i}" class="${st.level===i?'on':''}">${v[1]}</button>`).join('')}</div></div>`}</div>`;
 $('go').onclick=()=>startPlay(r);
 if($('reset'))$('reset').onclick=()=>{delete st.swaps[id];save();routine(id)};
 on('[data-n]',b=>{const cur=b.dataset.id,n=+b.dataset.n,x=MB[cur],seat=st.seated||r.easy,ok=y=>!y.calm&&!ids.includes(y.id)&&!st.hidden.includes(y.id)&&!(seat&&y.stand);
  const alt=M.find(y=>y.a===x.a&&ok(y))||M.find(ok);if(!alt)return;st.swaps[id]=st.swaps[id]||{};st.swaps[id][n]=alt.id;save();routine(id)});
 on('#lv button',b=>{st.level=+b.dataset.l;save();routine(id)});
}
/* ================= learn ================= */
function learn(){shell('learn');app.innerHTML=`<div class="stack"><h1>Learn</h1><p class="muted">Short, plain-language reads. Tap one to open it.</p>`
 +LEARN.map((c,i)=>`<details class="read"><summary>${c.t}</summary><div class="in"><p>${c.b}</p>${i===LEARN.length-1?'<p style="margin-top:8px"><a href="#/safety">See the full list</a></p>':''}<button class="say" data-i="${i}">${SPK} Read this to me</button></div></details>`).join('')
 +`<p class="note">General information only, not medical advice.</p></div>`;on('.say',b=>{const c=LEARN[+b.dataset.i];say(c.t+'. '+c.b)})}
/* ================= progress ================= */
function me(){
 shell('me');const total=st.sessions.reduce((a,s)=>a+(s.sec||0),0),wc=thisWeek(),t=ymd(),o=daysSet();
 let d=new Date();d.setDate(d.getDate()-27);let cal=['M','T','W','T','F','S','S'].map(x=>`<span>${x}</span>`).join('');for(let i=0;i<(d.getDay()+6)%7;i++)cal+='<div></div>';
 for(let j=0;j<28;j++){const k=ymd(d);cal+=`<div><i class="${o[k]?'on':''}${j===27?' today':''}" aria-label="${fmt(k)}${o[k]?', moved':''}">${d.getDate()}</i></div>`;d.setDate(d.getDate()+1)}
 const ck=st.checkins.slice(-7),good=a=>a.length?a.filter(c=>c.m>=4).length/a.length:0;
 const r2=st.checkins.filter(c=>gap(c.date,t)<14),p2=st.checkins.filter(c=>{const x=gap(c.date,t);return x>=14&&x<28});
 let trend='';if(r2.length>=3&&p2.length>=3){const a=good(r2),b=good(p2);trend=a>b+.1?'Your joints felt "Good" or "Great" more often in the last two weeks.':a<b-.1?'Your joints have felt sore more often lately. Go gently, and try Easy day on harder days.':'How your joints feel has been fairly steady this month.'}
 const la=st.acts[st.acts.length-1],fa=st.acts[0],due=st.activity&&(!la||gap(la.date,t)>=14);
 let h=`<div class="stack"><h1>Your progress</h1><div class="stats"><div><b>${monthDays()}</b><span>days moved this month</span></div><div><b>${weekStreak()}</b><span>weeks in a row at your goal</span></div><div><b>${mins(total)}</b><span>minutes in total</span></div></div>
 <div class="box week"><div style="flex:1;min-width:0"><b>This week:</b> ${Math.min(wc,st.goal)} of ${st.goal} days</div>${dotsHTML(wc)}</div>`;
 if(st.activity){h+=`<div class="box"><h3>${esc(st.activity)}</h3>`;
  h+=due?`<p style="margin-top:6px">How easy is this for you right now?</p><div class="nums" role="group" aria-label="0 means very hard, 10 means very easy">${Array.from({length:11},(_,i)=>`<button data-v="${i}">${i}</button>`).join('')}</div><div class="scale"><span>0 = very hard</span><span>10 = very easy</span></div>`
  :`<p style="margin-top:6px;font-size:22px"><b>${la.v} out of 10</b> <span class="muted small">(10 = very easy)</span></p>${st.acts.length>1?`<p class="muted">When you started: ${fa.v} out of 10.${la.v>fa.v?' That\'s real progress.':''}</p>`:''}<p class="note" style="margin-top:6px">We'll ask again in about two weeks.</p>`;h+='</div>'}
 h+=`<div class="box"><h3 style="margin-bottom:12px">Last 4 weeks</h3><div class="cal">${cal}</div></div>
 <div class="box"><h3>How your joints felt</h3>${ck.length?`<div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap">${ck.map(c=>`<div style="text-align:center;width:46px"><div style="width:36px;height:36px;margin:0 auto">${FACE[c.m-1]}</div><span class="note" style="font-size:13px">${fmt(c.date)}</span></div>`).join('')}</div>${trend?`<p style="margin-top:12px">${trend}</p>`:''}`:'<p class="muted" style="margin-top:6px">Tap a face on the Today page to start tracking how you feel.</p>'}</div>
 <div class="box"><h3>Recent sessions</h3>${st.sessions.length?`<div class="list" style="margin-top:10px">${st.sessions.slice(-5).reverse().map(s=>`<div><b>${esc(s.name)}</b><br><span class="muted small">${fmt(s.date,{weekday:'short',month:'short',day:'numeric'})} &middot; ${mins(s.sec)} min${s.feel?' &middot; felt '+({easy:'too easy',right:'just right',hard:'too hard'})[s.feel]:''}</span></div>`).join('')}</div>`:'<p class="muted" style="margin-top:6px">Your finished routines will show up here.</p>'}</div>
 <div class="btns"><a class="btn line sm" href="#/summary">Summary for your doctor</a><a class="btn line sm" href="#/settings">Settings and reminders</a></div>
 <p class="note">Your progress is saved on this device only. We don't collect it.</p></div>`;
 app.innerHTML=h;on('.nums button',b=>{st.acts.push({date:ymd(),v:+b.dataset.v});save();me()});
}
function summary(){
 shell('me',true);const t=ymd(),ss=st.sessions.filter(s=>gap(s.date,t)<28),cc=st.checkins.filter(c=>gap(c.date,t)<28);
 app.innerHTML=`<div class="stack"><div class="noprint"><button class="btn sun sm" id="pr">Print this page</button></div>
 <div class="box"><h1 style="font-size:26px">Gentle Stretch summary</h1><p class="muted">Last 4 weeks, up to ${fmt(t,{year:'numeric',month:'long',day:'numeric'})}</p>
 <h3 style="margin-top:18px">Activity</h3><p>${plural(new Set(ss.map(s=>s.date)).size,'day')} with a session, ${mins(ss.reduce((a,s)=>a+(s.sec||0),0))} minutes in total. Weekly goal: ${st.goal} days.</p>
 <h3 style="margin-top:16px">How joints felt (daily check-ins)</h3><p>${cc.length?MOODS.map((x,i)=>x+': '+cc.filter(c=>c.m===i+1).length).join(' &middot; '):'No check-ins recorded.'}</p>
 <h3 style="margin-top:16px">Harder sessions</h3><p>${ss.filter(s=>s.feel==='hard').length} felt too hard &middot; ${ss.filter(s=>s.worse).length} left joints worse for over two hours &middot; ${ss.filter(s=>s.hurt).length} included a "This hurts" stop</p>
 ${st.activity&&st.acts.length?`<h3 style="margin-top:16px">${esc(st.activity)} (0 = very hard, 10 = very easy)</h3><p>${st.acts.slice(-4).map(a=>fmt(a.date)+': '+a.v).join(' &middot; ')}</p>`:''}
 ${st.focus.length?`<h3 style="margin-top:16px">Joints of most concern</h3><p>${st.focus.map(f=>JOINTS[f][0]).join(', ')}</p>`:''}
 <p class="note" style="margin-top:18px">Self-reported by the person using the Gentle Stretch app, for discussion with a health professional.</p></div></div>`;
 $('pr').onclick=()=>window.print();
}
/* ================= settings ================= */
function settings(msg){
 shell('me',true);
 app.innerHTML=`<div class="stack"><h1>Settings</h1>${msg?`<div class="msg" role="status">${msg}</div>`:''}
 <div class="box"><h3 style="margin-bottom:10px">Text size</h3><div class="pills">${[[1,'Large'],[2,'Larger'],[3,'Largest']].map(x=>`<button data-t="${x[0]}" class="${st.text===x[0]?'on':''}">${x[1]}</button>`).join('')}</div>
 <label class="check" style="margin-top:8px"><input type="checkbox" id="hc" ${st.hc?'checked':''}><span>Higher contrast</span></label></div>
 <div class="box"><h3>During routines</h3>
 <label class="check"><input type="checkbox" id="voice" ${st.voice?'checked':''}><span>Talk me through each move out loud</span></label>
 <label class="check"><input type="checkbox" id="slow" ${st.slow?'checked':''}><span>Slower pace: more time to get into position, and a slower voice</span></label>
 <label class="check"><input type="checkbox" id="seat" ${st.seated?'checked':''}><span>Seated only: use seated versions of standing moves</span></label></div>
 <div class="box"><h3 style="margin-bottom:10px">Weekly goal</h3><div class="pills">${[2,3,4,5].map(n=>`<button data-g="${n}" class="${st.goal===n?'on':''}">${n} days</button>`).join('')}</div><p class="note" style="margin-top:8px">Any session counts, even one minute.</p></div>
 <div class="box"><h3>Reminder</h3><p class="muted small" style="margin:4px 0 12px">Pick days and a time. We'll make a repeating event for your phone's calendar, which will remind you.</p>
 <div class="pills" id="rd">${DAYS.map(d=>`<button data-d="${d[0]}" class="${st.rem.days.includes(d[0])?'on':''}" aria-pressed="${st.rem.days.includes(d[0])}">${d[1]}</button>`).join('')}</div>
 <p style="margin-top:14px"><label for="rt"><b>Time</b></label></p><input type="time" id="rt" value="${st.rem.time}" style="font:inherit;font-size:20px;padding:10px 14px;border-radius:12px;border:1.5px solid var(--line);min-height:52px;margin:6px 0 14px;background:var(--surface);color:var(--ink)">
 <br><button class="btn sm" id="ics">Add to my calendar</button></div>
 <div class="box"><h3>Your joints and goals</h3><p class="muted small" style="margin:4px 0 12px">${st.focus.length?'Joints: '+st.focus.map(f=>JOINTS[f][0]).join(', ')+'. ':''}${st.activity?'Activity: '+esc(st.activity)+'.':'Not set yet.'}</p><a class="btn line sm" href="#/start/1">Update my answers</a></div>
 ${st.hidden.filter(i=>MB[i]).length?`<div class="box"><h3>Moves you asked us not to suggest</h3>${st.hidden.filter(i=>MB[i]).map(i=>`<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 0"><span>${MB[i].n}</span><button class="btn line sm" data-un="${i}">Show again</button></div>`).join('')}</div>`:''}
 <div class="box"><h3>Your data</h3><p class="muted small" style="margin:4px 0 12px">Everything stays on this device. Clearing your browser can erase it, so save a backup now and then.</p>
 <div class="btns"><button class="btn line sm" id="bk">Save a backup file</button><label class="btn line sm" for="rs" style="cursor:pointer">Restore a backup</label><input type="file" id="rs" accept=".json,application/json" hidden></div>
 <div id="clr" style="margin-top:12px"><button class="textbtn" id="clr1" style="color:var(--alert)">Clear all my data</button></div></div>
 <div class="box"><h3>Safety</h3><p style="margin-top:6px"><a href="#/safety">When to stop and get help</a></p><p class="note" style="margin-top:10px">Gentle Stretch offers general wellness information. It does not diagnose or treat any condition and is not a substitute for advice from your doctor or physical therapist.</p></div></div>`;
 on('[data-t]',b=>{st.text=+b.dataset.t;save();prefs();settings()});
 $('hc').onchange=e=>{st.hc=e.target.checked;save();prefs()};$('voice').onchange=e=>{st.voice=e.target.checked;save()};
 $('slow').onchange=e=>{st.slow=e.target.checked;save()};$('seat').onchange=e=>{st.seated=e.target.checked;save()};
 on('[data-g]',b=>{st.goal=+b.dataset.g;save();settings()});
 on('#rd button',b=>{const d=b.dataset.d,i=st.rem.days.indexOf(d);i>-1?st.rem.days.splice(i,1):st.rem.days.push(d);save();b.classList.toggle('on');b.setAttribute('aria-pressed',i<0)});
 $('rt').onchange=e=>{st.rem.time=e.target.value||'09:00';save()};
 $('ics').onclick=()=>{if(!st.rem.days.length)return settings('Pick at least one day first.');ics();settings('Your calendar file is ready. Open it to add the reminder.')};
 on('[data-un]',b=>{st.hidden=st.hidden.filter(v=>v!==b.dataset.un);save();settings()});
 $('bk').onclick=()=>{dl('gentle-stretch-backup-'+ymd()+'.json','application/json',JSON.stringify(st,null,1));settings('Backup saved. Keep the file somewhere safe.')};
 $('rs').onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const d=JSON.parse(rd.result);if(!d||!Array.isArray(d.sessions))throw 0;st=norm(d);save();prefs();settings('Your backup has been restored.')}catch(x){settings('That file could not be read. Please choose a Gentle Stretch backup file.')}};rd.readAsText(f)};
 $('clr1').onclick=()=>{$('clr').innerHTML=`<p><b>Clear everything?</b> This removes your sessions, check-ins and settings from this device. It cannot be undone.</p><div class="btns" style="margin-top:10px"><button class="btn line sm" id="no">Keep my data</button><button class="btn sm" id="yes" style="background:var(--alert)">Yes, clear it</button></div>`;
  $('no').onclick=()=>settings();$('yes').onclick=()=>{try{localStorage.removeItem(KEY)}catch(e){}st=norm({});prefs();go('#/start/0')}};
}
function ics(){
 const [hh,mm]=st.rem.time.split(':').map(Number),order=['SU','MO','TU','WE','TH','FR','SA'];let d=new Date();d.setHours(hh,mm,0,0);
 for(let i=0;i<8;i++){if(st.rem.days.includes(order[d.getDay()])&&d>new Date())break;d.setDate(d.getDate()+1);d.setHours(hh,mm,0,0)}
 const f=x=>ymd(x).replace(/-/g,'')+'T'+String(x.getHours()).padStart(2,'0')+String(x.getMinutes()).padStart(2,'0')+'00',e=new Date(d.getTime()+6e5),now=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,''),url=location.href.split('#')[0];
 dl('gentle-stretch-reminder.ics','text/calendar',['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Gentle Stretch//EN','BEGIN:VEVENT','UID:gs-'+Date.now()+'@gentlestretch','DTSTAMP:'+now,'DTSTART:'+f(d),'DTEND:'+f(e),'RRULE:FREQ=WEEKLY;BYDAY='+st.rem.days.join(','),'SUMMARY:A gentle stretch','DESCRIPTION:A gentle stretch is ready when you are. '+url,'URL:'+url,'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:A gentle stretch is ready when you are','TRIGGER:PT0M','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n'))}
/* ================= player ================= */
let P=null,tick=null,F=null;const pl=$('player');
const prep1=()=>st.slow?12:8,prepN=()=>st.slow?9:6;
function startPlay(r){
 const seg=[];resolve(r).forEach(i=>{const x=MB[i];for(let k=0;k<x.sides;k++)seg.push({x,side:x.sides>1?(k?'Other side':'First side'):'',sec:hold(x,r)})});
 if(!seg.length)return;
 P={r,seg,i:0,ph:'prep',left:prep1(),paused:false,spent:0,hurt:0,sheet:''};pl.hidden=false;document.body.style.overflow='hidden';
 draw();speak('Get comfortable. First, '+seg[0].x.n+'. '+seg[0].x.steps.join(' '));clearInterval(tick);tick=setInterval(step,1000);
}
function total(){return P.seg.reduce((a,s)=>a+s.sec,0)}
function toHold(){P.ph='hold';P.left=P.seg[P.i].sec;chime();speak(P.seg[P.i].x.calm?'Begin.':'Begin. Move gently, and breathe.')}
function toNext(){if(P.i>=P.seg.length-1){finish(false);return}P.i++;P.ph='prep';P.left=prepN();const n=P.seg[P.i],pv=P.seg[P.i-1];speak(pv.x===n.x&&n.side?'Switch to the other side.':'Next, '+n.x.n+'. '+n.x.steps.join(' '))}
function step(){if(!P||P.paused||P.sheet)return;P.left--;if(P.ph==='hold')P.spent++;if(P.left<=0){if(P.ph==='prep')toHold();else{toNext();if(!P)return}}draw()}
function draw(){
 const s=P.seg[P.i],prep=P.ph==='prep',dur=prep?(P.i===0?prep1():prepN()):s.sec,frac=Math.max(0,P.left/dur),C=2*Math.PI*52;
 let sh='';
 if(P.sheet==='hurt')sh=`<div class="sheetwrap"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh"><h2 id="sh" style="font-size:24px">Let's ease off</h2><p style="margin:6px 0 14px">Sharp or worsening pain is a sign to stop. What would you like to do?</p>
 <button class="choice" data-o="gentle">Try a gentler version<small>${s.x.alt?'Switch to '+MB[s.x.alt].n:'Shorter time, and only move half as far'}</small></button><button class="choice" data-o="skip">Skip this move</button><button class="choice" data-o="stop">Stop for today<small>What you've done still counts</small></button><button class="textbtn" data-o="back">It's okay now, keep going</button></div></div>`;
 if(P.sheet==='safe')sh=`<div class="sheetwrap"><div class="sheet" role="dialog" aria-modal="true" aria-label="When to stop"><h2 style="font-size:24px">When to stop</h2>${flags()}<button class="btn wide" data-o="back" style="margin-top:14px">Back to my routine</button></div></div>`;
 pl.innerHTML=`<div class="pbar"><button id="end">End</button><div class="t">${esc(P.r.n)}</div><button id="when">When to stop</button></div>
 <div class="segs" aria-hidden="true">${P.seg.map((_,i)=>`<i class="${i<P.i?'on':i===P.i?'now':''}"></i>`).join('')}</div>
 <div class="stage"><div class="phase">${prep?(P.i===0?'Get comfortable':'Next up'):'Move '+(P.i+1)+' of '+P.seg.length}${s.side?' &middot; '+s.side:''}</div><h2>${esc(s.x.n)}</h2>
 <div class="timer">${pic(s.x.pic,true)}<div class="ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke="#E2EEE6" stroke-width="10"/><circle cx="60" cy="60" r="52" fill="none" stroke="${prep?'#F4B740':'#1D6B4F'}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*(1-frac)).toFixed(1)}"/></svg><b>${P.left}</b></div></div>
 <p class="muted" style="font-weight:700">${prep?'Get into position':s.x.calm?'Breathe slowly':'Move gently'}</p>
 <ol class="steps how" style="text-align:left">${s.x.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><p class="tip">${esc(s.x.tip)}</p></div>
 <div class="ctl"><button id="prev">Back</button><button class="go" id="pp">${P.paused?'Resume':'Pause'}</button><button id="skip">Skip</button></div>
 <button class="hurt" id="hurt">This hurts</button>${sh}`;
 $('end').onclick=()=>{P.spent>=30?finish(true):closePlay()};
 $('when').onclick=()=>{P.sheet='safe';hush();draw()};
 $('pp').onclick=()=>{P.paused=!P.paused;if(P.paused)hush();draw()};
 $('skip').onclick=()=>{toNext();if(P)draw()};
 $('prev').onclick=()=>{if(P.i>0)P.i--;P.ph='prep';P.left=prepN();speak(P.seg[P.i].x.n);draw()};
 $('hurt').onclick=()=>{P.sheet='hurt';P.hurt++;hush();draw();const f=pl.querySelector('.sheet .choice');if(f)f.focus()};
 pl.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const o=b.dataset.o;P.sheet='';
  if(o==='gentle'){const x=P.seg[P.i].x;if(x.alt&&MB[x.alt]){const a=MB[x.alt],rest=P.seg.slice(P.i).filter(z=>z.x!==x),add=[];for(let k=0;k<a.sides;k++)add.push({x:a,side:a.sides>1?(k?'Other side':'First side'):'',sec:Math.max(10,Math.round(hold(a,P.r)*.7))});P.seg=P.seg.slice(0,P.i).concat(add,rest);P.ph='prep';P.left=prepN();speak('Let\'s try '+a.n+' instead. '+a.steps.join(' '))}
   else{P.seg.forEach(z=>{if(z.x===x)z.sec=Math.max(10,Math.round(z.sec/2))});if(P.ph==='hold')P.left=Math.min(P.left,P.seg[P.i].sec);speak('A shorter time now. Only move half as far.')}}
  if(o==='skip'){toNext();if(!P)return}
  if(o==='stop'){finish(true);return}
  draw()});
}
function closePlay(){clearInterval(tick);P=null;F=null;hush();pl.hidden=true;pl.innerHTML='';document.body.style.overflow='';render()}
function finish(early){
 clearInterval(tick);const r=P.r,sec=Math.max(early?P.spent:total(),30),hurt=P.hurt;P=null;
 const sess={date:ymd(),name:r.n,rid:r.id,sec};if(hurt)sess.hurt=hurt;if(early)sess.partial=true;st.sessions.push(sess);
 if(hurt){const t=new Date();t.setDate(t.getDate()+1);st.lighten=ymd(t)}
 const card=todaysCard();st.readOn=ymd();st.seen++;save();
 F={sess,card,feel:'',offer:'',early,hurt};speak(early?'You can stop here. What you did still counts.':'Well done. You moved today.');drawEnd();
}
function drawEnd(){
 const wc=thisWeek();let resp='';
 if(F.feel==='hard')resp=st.level>0&&!F.offer?`<h3>Thanks for telling us</h3><p>Would you like shorter holds next time?</p><div class="btns" style="margin-top:10px"><button class="btn sm" data-off="down">Yes, shorter</button><button class="btn line sm" data-off="keep">Keep it as it is</button></div>`:`<h3>Thanks for telling us</h3><p>Next time, try Easy day, or switch on "Seated only" in Settings. If a move hurts, it's fine to skip it.</p>`;
 if(F.feel==='easy'){const pv=st.sessions.filter(s=>s!==F.sess&&s.feel).slice(-1)[0];resp=pv&&pv.feel==='easy'&&st.level<3&&!F.offer?`<h3>Nicely done</h3><p>That's felt easy twice now. Hold each move a little longer next time?</p><div class="btns" style="margin-top:10px"><button class="btn sm" data-off="up">Yes, a little longer</button><button class="btn line sm" data-off="keep">Keep it as it is</button></div>`:`<h3>Nicely done</h3><p>If it still feels easy next time, we'll offer you a little longer on each move.</p>`}
 if(F.feel==='right')resp=`<h3>Just right is perfect</h3><p>We'll keep your routines at this pace.</p>`;
 if(F.offer==='changed')resp=`<h3>Done</h3><p>Your pace is now "${LEVELS[st.level][1]}". You can change it on any routine page.</p>`;
 if(F.offer==='keep')resp=`<h3>No problem</h3><p>We'll keep your pace as it is.</p>`;
 pl.innerHTML=`<div class="stage" style="padding-top:12px"><div class="endtick" aria-hidden="true">${TICK}</div><h2>${F.early?'You can stop here':'Well done. You moved today.'}</h2>
 <p>${F.early?'What you did still counts. ':''}That's ${Math.min(wc,st.goal)} of ${st.goal} days this week.${F.hurt?' You told us something hurt, so tomorrow\'s suggestion will be lighter.':''}</p>
 <div class="box" style="width:100%;text-align:left;margin-top:10px"><h3>How did that feel?</h3><div class="pills" style="margin-top:12px">${[['easy','Too easy'],['right','Just right'],['hard','Too hard']].map(x=>`<button data-f="${x[0]}" class="${F.feel===x[0]?'on':''}" aria-pressed="${F.feel===x[0]}">${x[1]}</button>`).join('')}</div>${resp?`<div style="margin-top:14px">${resp}</div>`:''}</div>
 <div class="box tint" style="width:100%;text-align:left"><div class="label">Did you know?</div><h3 style="margin:4px 0 6px">${F.card.t}</h3><p>${F.card.b}</p><button class="say" id="sayc">${SPK} Read this to me</button></div>
 <button class="btn sun wide" id="fin" style="margin-top:6px">Done</button></div>`;
 pl.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{F.feel=b.dataset.f;F.sess.feel=F.feel;F.offer='';save();drawEnd()});
 pl.querySelectorAll('[data-off]').forEach(b=>b.onclick=()=>{const o=b.dataset.off;if(o==='down')st.level=Math.max(0,st.level-1);if(o==='up')st.level=Math.min(3,st.level+1);F.offer=o==='keep'?'keep':'changed';save();drawEnd()});
 $('sayc').onclick=()=>say(F.card.t+'. '+F.card.b);
 $('fin').onclick=()=>{F=null;hush();pl.hidden=true;pl.innerHTML='';document.body.style.overflow='';go('#/home')};
}
/* ================= router ================= */
function go(h){if(location.hash===h)render();else location.hash=h}
function render(){
 const h=location.hash.replace(/^#\/?/,'').split('/');window.scrollTo(0,0);
 if(!st.safety&&h[0]!=='safety'&&h[0]!=='start')return go('#/start/0');
 if(!st.onboarded&&st.safety&&(!h[0]||h[0]==='home'))return go('#/start/1');
 switch(h[0]){
  case'start':return onboard(h[1]);case'moves':return moves();case'm':return move(h[1]);case'r':return routine(h[1]);
  case'learn':return learn();case'me':return me();case'summary':return summary();case'settings':return settings();
  case'safety':return safety();case'flare':return flare();
  case'play':{const r=RB[h[1]];if(r){history.replaceState(null,'','#/r/'+r.id);routine(r.id);startPlay(r)}else home();return}
  default:return home();
 }
}
window.addEventListener('hashchange',()=>{if(!P&&!F)render()});
prefs();render();
if('serviceWorker' in navigator&&location.protocol.indexOf('http')===0){navigator.serviceWorker.register('sw.js').catch(()=>{})}
