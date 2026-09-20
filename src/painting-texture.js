// Static, locally generated print texture. The original painting stays intact;
// no image sampling, downloads, animated noise, or per-frame canvas work.
export function mountPaintingTexture(world) {
  let seed = 1729;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const tile = (size, pixel) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const context = canvas.getContext('2d');
    if (!context) return null;
    const data = context.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const value = pixel(x, y);
        data.data.set([value, value, value, 255], (y * size + x) * 4);
      }
    }
    context.putImageData(data, 0, 0);
    return canvas.toDataURL();
  };
  // A Bayer matrix supplies the regular ink screen; finer grain breaks up its
  // mechanical regularity. Neutral-centered values avoid another dark veil.
  const bayer = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  const textures = [
    ['screen', 4, tile(4, (x, y) => Math.round((bayer[y][x] + .5) * 16))],
    ['grain', 128, tile(256, () => Math.round(random() * 255))],
  ];
  for (const [name, size, source] of textures) {
    if (!source) continue;
    const layer = document.createElement('div');
    layer.className = `painting-texture painting-texture--${name}`;
    layer.setAttribute('aria-hidden', 'true');
    layer.style.backgroundImage = `url("${source}")`;
    layer.style.backgroundSize = `${size}px ${size}px`;
    world.append(layer);
  }
}
