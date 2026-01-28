export default {
  'front-end/**/*.{js,jsx,ts,tsx}': () =>
    'npm run lint --prefix front-end',

  'back-end/**/*.{js,jsx,ts,tsx}': () =>
    'npm run lint --prefix back-end',
};
