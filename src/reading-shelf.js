// Optional discovery, independent of the journey and its navigation.
export function mountReadingShelf(host,{substack=null,books=[]}={}){
 if(!host||(!substack&&!books.length))return null;
 const shelf=document.createElement('details');shelf.className='reading-shelf';
 const summary=document.createElement('summary');summary.setAttribute('aria-label','On my desk: writing and books');
 summary.innerHTML='<svg aria-hidden="true" viewBox="0 0 40 40" fill="none"><path d="M7 9c6-2 10-1 13 2 3-3 7-4 13-2v23c-6-2-10-1-13 2-3-3-7-4-13-2V9Z" stroke="currentColor" stroke-width="1.4"/><path d="M20 11v23M13 14l3 1m-3 5 3 1m8-7 3-1m-3 7 3-1" stroke="currentColor" stroke-width="1.2"/></svg><span>On my desk</span>';
 const inside=document.createElement('div');inside.className='shelf-content';
 function safeLink(label,url){const a=document.createElement('a');const parsed=new URL(url);if(!['https:','http:'].includes(parsed.protocol))throw new Error('Reading links must use HTTP or HTTPS');a.textContent=label;a.href=parsed.href;a.target='_blank';a.rel='noopener noreferrer';return a;}
 if(substack){const p=document.createElement('p');p.className='shelf-writing';p.append(safeLink(substack.title||'My Substack',substack.url));inside.append(p);}
 if(books.length){const h=document.createElement('h3');h.textContent='Reading lately';inside.append(h);const list=document.createElement('ul');const notes=document.createElement('div');notes.className='shelf-notes';
 for(const [index,book] of books.entries()){const row=document.createElement('li');const title=book.url?safeLink(book.title,book.url):document.createElement('span');title.textContent=book.title;const heading=document.createElement('div');heading.className='book-title';heading.append(title);row.append(heading);if(book.author){const author=document.createElement('small');author.textContent=book.author;row.append(author);}if(book.note){
 const bookmark=document.createElement('button');bookmark.type='button';bookmark.className='book-bookmark';bookmark.setAttribute('aria-expanded','false');bookmark.setAttribute('aria-controls',`book-note-${index}`);bookmark.setAttribute('aria-label',`My note on ${book.title}`);
 bookmark.innerHTML='<svg aria-hidden="true" viewBox="0 0 16 22" fill="none"><path d="M3 2h10v18l-5-4-5 4V2Z" stroke="currentColor" stroke-width="1.3"/></svg>';
 const note=document.createElement('section');note.id=`book-note-${index}`;note.className='book-note';note.hidden=true;note.setAttribute('aria-label',`My note on ${book.title}`);const label=document.createElement('h4');label.textContent=book.title;const body=document.createElement('p');body.textContent=book.note;note.append(label,body);
 bookmark.addEventListener('click',()=>{const expanded=bookmark.getAttribute('aria-expanded')==='true';inside.querySelectorAll('.book-bookmark').forEach(button=>button.setAttribute('aria-expanded','false'));notes.querySelectorAll('.book-note').forEach(panel=>panel.hidden=true);bookmark.setAttribute('aria-expanded',String(!expanded));note.hidden=expanded;
 if(!expanded)requestAnimationFrame(()=>{
  if(note.hidden||!shelf.open)return;
  const rect=note.getBoundingClientRect(),headerBottom=document.querySelector('header')?.getBoundingClientRect().bottom??0;
  if(rect.top<headerBottom+16||rect.bottom>innerHeight-16)note.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 });
 });heading.append(bookmark);notes.append(note);
 }list.append(row);}inside.append(list,notes);}
 shelf.append(summary,inside);host.append(shelf);return shelf;
}
