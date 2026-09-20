# Michael Paglia

Source for [mpaglia.com](https://mpaglia.com): a painted journey through San Francisco, New York, and the Capital District.

## Development

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
```

Serve the generated `dist/` directory with Nginx. All artwork and fonts needed by the current site are bundled locally. Do not serve the repository root.

The cat, planet, sneaker, and robot illustrations cycle independently between section visits. They remain unchanged while their section is visible. Reading notes and career details use accessible disclosure controls.

## Assets

Illustrations were generated for this website. Font licenses accompany the fonts in `public/fonts/`.

## License

All rights reserved.
