// A small, deterministic paper tile, generated once beneath the footer content.
export function mountPaperTexture(footer) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 768;
  const context = canvas.getContext('2d');
  if (!context) return;
  let seed = 518;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const pixels = context.createImageData(768, 768);
  for (let i = 0; i < pixels.data.length; i += 4) {
    const grain = Math.round((random() + random() - 1) * 15);
    pixels.data.set([234 + grain, 230 + grain, 218 + grain, 255], i);
  }
  context.putImageData(pixels, 0, 0);
  // Sparse, short fibers suggest paper stock without an obvious repeating grid.
  context.lineWidth = .7;
  for (let i = 0; i < 650; i++) {
    const x = random() * 768, y = random() * 768;
    const angle = random() * Math.PI * 2, length = 2 + random() * 6;
    context.strokeStyle = i % 2 ? 'rgba(108,92,65,.12)' : 'rgba(255,253,242,.3)';
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    context.stroke();
  }
  footer.style.backgroundImage = `url("${canvas.toDataURL()}")`;
  footer.style.backgroundSize = '384px 384px';
}
