import './style.css';
import './reading.css';
import './storefront.css';
import './vertical.css';
import './connected.css';
import './editorial.css';
import {entries,rlChapter} from './entries.js';
import {mountReadingShelf} from './reading-shelf.js';
import {readingList} from './reading-list.js';
import {mountFooterCats} from './footer-cats.js';
import {mountVisitSprite} from './visit-sprite.js';
import {mountPaintingTexture} from './painting-texture.js';
import {mountPaperTexture} from './paper-texture.js';
import {mountSpriteTexture} from './sprite-texture.js';

const $=s=>document.querySelector(s),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const chapter=(e)=>`<article class="chapter-paper" data-entry="${e.name}"><div class="chapter-meta"><span>${e.name}${e.name==='Meta'?' · New York':e.name==='Mercor'?' · San Francisco':''}</span><span>${e.dates}</span></div><h2>${e.heading}</h2><p class="chapter-lead">${e.body}</p><img class="chapter-sprite" src="${e.painting}" alt="" width="80" height="88" loading="lazy" decoding="async">${e.facts.length>1?`<details class="career-details"><summary>Work at ${e.name}</summary><p>${e.detail}</p><dl class="chapter-facts">${e.facts.map(([date,text],i)=>`<div><dt>${date}</dt><dd>${text}${e.relatedProjects?.[i]?`<a class="fact-project" href="${e.relatedProjects[i][1]}">Background: ${e.relatedProjects[i][0]} ↗</a>`:''}</dd></div>`).join('')}</dl></details>`:''}</article>`;
// Read the present first, then move backward through the same places.
document.body.classList.add('vertical-journey','connected-journey','editorial-journey');
const opening=$('.opening'),early=$('#early-work'),work=$('#work');
mountPaperTexture(work);
mountSpriteTexture();
const group=(city)=>{const el=document.createElement('div');el.className='place-group';el.dataset.city=city;return el;};
const sf=group('San Francisco',100),ny=group('New York',44),troy=group('Capital District',0);
sf.append(opening);sf.insertAdjacentHTML('beforeend',`<section id="san-francisco" class="chapter"><article class="chapter-paper" data-entry="RL"><div class="chapter-meta"><span>Mercor · San Francisco</span><span>2026–present</span></div><h2>${rlChapter.heading}</h2><p class="chapter-lead">${rlChapter.body}</p><img class="chapter-sprite" src="/art/cards/rl-globe-v1.png" alt="" width="80" height="88" loading="lazy" decoding="async"><div class="rl-roles"><p>${rlChapter.role}</p><ul>${rlChapter.roles.map(e=>`<li id="${e.name==='Fleet AI'?'fleet':'mercor'}"><span>${e.name}</span><time>${e.dates}</time></li>`).join('')}</ul></div></article></section>`);
ny.innerHTML+=`<section id="new-york" class="chapter">${chapter(entries[1])}</section>`;
troy.append(early);
$('#top').replaceChildren(sf,ny,troy,work);
// Keep each miniature attached to the information it illustrates.
document.querySelectorAll('.chapter-paper').forEach(article=>{
 const sprite=article.querySelector('.chapter-sprite'),summary=article.querySelector('summary');
 const miniature=document.createElement('span');miniature.className='story-miniature';miniature.setAttribute('aria-hidden','true');
 sprite.replaceWith(miniature);miniature.append(sprite);
 if(summary)summary.prepend(miniature);else {miniature.classList.add('decorative-miniature');article.querySelector('.chapter-lead').prepend(miniature);}
});
const miniatureObserver=new IntersectionObserver(items=>{
 items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('is-seen');miniatureObserver.unobserve(item.target);}});
},{threshold:.8});
document.querySelectorAll('.career-details .story-miniature').forEach(el=>miniatureObserver.observe(el));
// Preserve ordinary fragment history while retaining explicit focus and
// predictable scroll positioning for dynamically inserted chapter sections.
history.scrollRestoration='manual';
function visitFragment(hash,behavior){
 const target=document.getElementById(decodeURIComponent(hash.replace(/^#/,''))||'top');if(!target)return;
 if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({behavior,block:'start'});
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{
 if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 const hash=a.getAttribute('href');if(!document.getElementById(hash.slice(1)))return;
 event.preventDefault();if(location.hash!==hash)history.pushState(null,'',hash);visitFragment(hash,reduced?'instant':'smooth');
}));
window.addEventListener('popstate',()=>visitFragment(location.hash,'instant'));
if(location.hash)requestAnimationFrame(()=>visitFragment(location.hash,'instant'));
mountReadingShelf(document.querySelector('.work-inner'),readingList);
$('.work-inner').insertAdjacentHTML('beforeend',`<details class="community-details"><summary>Community</summary><p>I advise final-year undergraduates at <a href="https://www.albany.edu/">UAlbany</a>, my alma mater.</p><p>In the Capital District, I volunteered at the <a href="https://mohawkhumane.org/">Mohawk Hudson Humane Society</a> and <a href="https://www.albanymed.org/albany/volunteering-albany-medical-center/">Albany Medical Center</a>.</p><p>I founded <a href="https://www.518cares.org/">518 Cares</a> to help people in New York’s Capital Region find free and low-cost healthcare. <span class="community-status">The project is currently paused.</span></p></details>`);

// A paired footer row keeps personal interests and community equally discoverable.
const personal=document.createElement('div');personal.className='personal-disclosures';
const community=$('.community-details');
community.querySelector('summary').innerHTML='<svg aria-hidden="true" viewBox="0 0 40 40" fill="none"><path d="M20 33S6 24 6 15a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 9-14 18-14 18Z" stroke="currentColor" stroke-width="1.4"/></svg><span>Community</span>';
$('.work-inner').append(personal);personal.append($('.reading-shelf'),community);
// One shared endpaper illustration gives the personal sections a common setting.
personal.querySelectorAll('summary > svg').forEach(icon=>icon.remove());
$('.work-title').insertAdjacentHTML('beforeend','<img class="endpaper-still-life" src="/art/endpaper-cat-black-v2.png" alt="" width="1536" height="1024" decoding="async">');

const updateFooterCat=mountFooterCats($('.endpaper-still-life'));
const planetSection=$('#san-francisco');
const updatePlanet=mountVisitSprite(planetSection.querySelector('.chapter-sprite'),[
 ['earth','/art/cards/rl-globe-v1.png'],
 ...['mars','jupiter','neptune'].map(name=>[name,`/art/cards/planet-${name}-v1.png`])
],'planet',{exitAbove:true});
const robotSection=$('#new-york'),shoeSection=$('#early-work');
const updateRobot=mountVisitSprite(robotSection.querySelector('.chapter-sprite'),[
 ['sage','/art/cards/meta-object-v1.png'],['copper','/art/cards/robot-copper-v1.png'],['navy','/art/cards/robot-blue-v1.png']
],'robot',{exitAbove:true});
const updateShoe=mountVisitSprite(shoeSection.querySelector('.chapter-sprite'),[
 ['cream','/art/cards/early-object-v1.png'],['red','/art/cards/shoe-red-v1.png'],['indigo','/art/cards/shoe-blue-v1.png']
],'shoe',{exitAbove:true});

// One uninterrupted painting stays at a fixed scale. Scroll moves only its
// horizontal position; crossings overlap the departing and arriving cards.
const groups=[sf,ny,troy],positions=[0,50,100];
const panorama=document.createElement('img');panorama.className='connected-painting';panorama.src='/art/grand-journey-v1.png';panorama.alt='';panorama.decoding='async';$('#world').append(panorama);
mountPaintingTexture($('#world'));
let current=0,lastScroll=scrollY,lastTime=performance.now(),paintedWidth=0;
function sizePainting(){paintedWidth=Math.max(innerWidth,innerHeight*3);panorama.style.width=`${paintedWidth}px`;panorama.style.height=`${Math.max(innerHeight,innerWidth/3)}px`;}
sizePainting();addEventListener('resize',sizePainting);
const clamp=x=>Math.min(1,Math.max(0,x));
function targetPosition(){
 let target=0;
 for(let i=1;i<groups.length;i++){
 const top=groups[i].getBoundingClientRect().top;
 const t=clamp((innerHeight*.9-top)/(innerHeight*.68));
 const mix=reduced?(t>=.5?1:0):t*t*(3-2*t);
 if(t>0)target=positions[i-1]+(positions[i]-positions[i-1])*mix;
 }
 return target;
}
current=targetPosition();
function frame(now){
 const dt=Math.min(.05,(now-lastTime)/1000);lastTime=now;
 const target=targetPosition(),jump=Math.abs(scrollY-lastScroll)>innerHeight*2;lastScroll=scrollY;
 if(reduced||jump||document.hidden)current=target;
 else {current+=(target-current)*(1-Math.exp(-dt*8));if(Math.abs(current-target)<.01)current=target;}
 // Mobile centers each destination on its skyline instead of the panorama edges.
 // Keep progress and interpolation shared, so scrolling still travels continuously.
 const travel=paintedWidth-innerWidth;
 let offset=travel*current/100;
 if(innerWidth<=700){
  const stops=[.275,.645,.90].map(focal=>Math.max(0,Math.min(travel,paintedWidth*focal-innerWidth/2)));
  const segment=current<=50?0:1,t=(current-segment*50)/50;
  offset=stops[segment]+(stops[segment+1]-stops[segment])*t;
 }
 panorama.style.transform=`translate3d(${-offset}px,0,0)`;
 const active=current<25?0:current<75?1:2;
 document.body.dataset.city=groups[active].dataset.city;document.body.dataset.panPosition=current.toFixed(3);
 document.body.dataset.transition=Math.abs(current-positions[active])>.1?'continuous':'settled';
 const footerRect=work.getBoundingClientRect();
 updateFooterCat(footerRect,innerHeight);
 updatePlanet(planetSection.getBoundingClientRect(),innerHeight);
 updateRobot(robotSection.getBoundingClientRect(),innerHeight);
 updateShoe(shoeSection.getBoundingClientRect(),innerHeight);
 document.body.classList.toggle('scrolled',scrollY>32);document.body.classList.toggle('at-work',footerRect.top<76);
 requestAnimationFrame(frame);
}
try{await panorama.decode();}catch{document.body.dataset.renderError='true';}
document.body.dataset.ready='true';requestAnimationFrame(frame);
