// Filter the rendered illustrations, preserving the source files and transparency.
// User-space frequency keeps the grain fine at each illustration's display size.
export function mountSpriteTexture() {
  const definitions = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  definitions.setAttribute('width', '0');
  definitions.setAttribute('height', '0');
  definitions.setAttribute('aria-hidden', 'true');
  definitions.style.position = 'absolute';
  definitions.innerHTML = `<defs>
    <filter id="sprite-paper-grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="23" stitchTiles="stitch" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0" result="mono"/>
      <feComponentTransfer in="mono" result="faint-grain">
        <feFuncA type="linear" slope=".55"/>
      </feComponentTransfer>
      <feBlend in="SourceGraphic" in2="faint-grain" mode="soft-light" result="printed"/>
      <feComposite in="printed" in2="SourceAlpha" operator="in"/>
    </filter>
  </defs>`;
  document.body.prepend(definitions);
}
