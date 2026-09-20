import {mountVisitSprite} from './visit-sprite.js';
export function mountFooterCats(image) {
 return mountVisitSprite(image,['black','orange','bicolor'].map(cat=>[cat,`/art/endpaper-cat-${cat}-v1.png`]),'cat');
}
