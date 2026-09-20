// Advance only once per visit, while the entire section is safely offscreen.
export function mountVisitSprite(image,variants,key,{exitAbove=false}={}) {
 const ready=variants.map(()=>false);
 const preloads=variants.map(([name,src],index)=>{
  const preload=new Image();preload.src=src;
  preload.decode().then(()=>{ready[index]=true;}).catch(()=>{});
  return preload;
 });
 let current=0,visited=false;
 image.src=variants[0][1];image.dataset[key]=variants[0][0];
 return (rect,viewportHeight)=>{
  if(rect.top<viewportHeight&&rect.bottom>0){visited=true;return;}
  if(!visited||!(rect.top>viewportHeight+120||(exitAbove&&rect.bottom < -120)))return;
  const next=(current+1)%variants.length;
  if(!ready[next])return;
  image.src=preloads[next].src;image.dataset[key]=variants[next][0];
  current=next;visited=false;
 };
}
