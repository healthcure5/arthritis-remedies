import re
src=open('index.html').read()
fonts={1:'Newsreader:opsz,wght@6..72,500&family=Nunito+Sans:wght@400;600;700',
2:'Source+Serif+4:opsz,wght@8..60,600&family=Atkinson+Hyperlegible:wght@400;700',
3:'Nunito:wght@800&family=Nunito+Sans:wght@400;600;700',
4:'Outfit:wght@600;700&family=Figtree:wght@400;600;700',
5:'DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700'}
names={0:'Background only',1:'Soft gray-cream',2:'Clear and calm',3:'Warm and friendly',4:'Phone first',5:'Magazine'}
pages={0:'preview-bg.html',**{i:f'preview-look{i}.html' for i in range(1,6)}}
def bar(cur):
    return '<nav class="lookbar" aria-label="Compare looks">'+''.join(f'<a href="/{pages[i]}"{" aria-current=\"page\"" if i==cur else ""}>{i if i else "BG"}. {names[i]}</a>' for i in pages)+'<a href="/">Live site</a></nav>'
for i,p in pages.items():
    t=src.replace('<head>','<head><meta name="robots" content="noindex,nofollow">',1)
    css='<link rel="stylesheet" href="/tools/looks/base.css">'
    if i==0: css+='<link rel="stylesheet" href="/tools/looks/bg.css">'
    else:
        css+=f'<link href="https://fonts.googleapis.com/css2?family={fonts[i]}&display=swap" rel="stylesheet"><link rel="stylesheet" href="/tools/looks/look{i}.css">'
        t=re.sub(r'<img class="heroimg"[^>]*>','<img class="heroimg" src="/images/px-woman-823560.jpg" alt="A smiling woman with long gray hair" width="640" height="480" fetchpriority="high">',t,1)
    t=t.replace('</head>',css+'</head>',1)
    t=re.sub(r'(<body[^>]*>)',r'\1'+bar(i),t,1)
    open(p,'w').write(t)
print('built')
