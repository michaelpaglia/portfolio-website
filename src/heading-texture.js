// Static alpha masks let the painting show through small breaks in the ink.
// Text remains real, selectable HTML; no duplicated text or image replacements.
export function mountHeadingTexture() {
  const makeInk = (strength) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512;
    const context = canvas.getContext('2d');
    if (!context) return null;
    let seed = 198;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    context.fillStyle = '#fff';
    context.fillRect(0, 0, 512, 512);
    context.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 2400; i++) {
      const x = random() * 512, y = random() * 512;
      const radius = .45 + random() * 1.25;
      context.fillStyle = `rgba(0,0,0,${strength * (.35 + random() * .65)})`;
      context.beginPath();
      context.ellipse(x, y, radius, radius * (.45 + random() * .55), random() * Math.PI, 0, Math.PI * 2);
      context.fill();
    }
    return `url("${canvas.toDataURL()}")`;
  };
  const nameInk = makeInk(.9), headingInk = makeInk(.45);
  if (nameInk) document.documentElement.style.setProperty('--name-ink', nameInk);
  if (headingInk) document.documentElement.style.setProperty('--heading-ink', headingInk);
}
