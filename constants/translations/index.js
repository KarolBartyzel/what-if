const en = require('./en.json');
const pl = require('./pl.json');

const LANGUAGES = [{ code: 'US', label: 'english (US)' }, { code: 'PL', label: 'polish' }];
const translations = {
  en,
  pl,
};

export {
  LANGUAGES,
  translations,
};
