export default {
  'front-end/**/*.{js,jsx,ts,tsx}': [
    'npx prettier --write',
    'npm run lint --prefix front-end',
  ],
  'back-end/**/*.{ts,js}': [
    'npx prettier --write',
    'npm run lint --prefix back-end',
  ],
  '*.{json,md,html,css}': ['npx prettier --write'],
};
