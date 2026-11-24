#!/usr/bin/env python3
"""Regenerate sitemap.xml from the HTML files that are meant to be indexed.
Run from the repo root: python3 _build/make_sitemap.py"""
import os, re, subprocess, datetime
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(root)
skip = {'google449f63fa54968e97.html'}
urls = []
def lastmod(path):
    try:
        t = subprocess.check_output(['git','log','-1','--format=%cs','--',path], text=True).strip()
        return t or datetime.date.today().isoformat()
    except Exception:
        return datetime.date.today().isoformat()
for f in sorted(os.listdir('.')):
    if not f.endswith('.html') or f in skip: continue
    head = open(f, encoding='utf-8').read(6000)
    if 'noindex' in head: continue
    urls.append((f, lastmod(f)))
extra = [('shop/', 'shop/index.html'), ('shop/sample-week.html','shop/sample-week.html'), ('shop/partners.html','shop/partners.html')]
pri = {'index.html':'1.0'}
out = ['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
out.append('  <url><loc>https://myhingecare.com/</loc><lastmod>%s</lastmod></url>' % lastmod('index.html'))
for f, d in urls:
    if f == 'index.html': continue
    out.append('  <url><loc>https://myhingecare.com/%s</loc><lastmod>%s</lastmod></url>' % (f, d))
for u, p in extra:
    if os.path.exists(p) and 'noindex' not in open(p, encoding='utf-8').read(6000):
        out.append('  <url><loc>https://myhingecare.com/%s</loc><lastmod>%s</lastmod></url>' % (u, lastmod(p)))
out.append('</urlset>')
open('sitemap.xml','w').write('\n'.join(out)+'\n')
print(len(out)-3, 'urls')
