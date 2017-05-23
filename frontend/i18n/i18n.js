import i18next from 'i18next';
import i18nXHR from 'i18next-xhr-backend';

// List of allowed languages
const languages = ['en', 'ru'];

// Config for i18next.init()
let config = {
  lng: 'en', // initial language

  fallbackLng: null, // fallback is not needed for me

  ns: ['common'], // have a common namespace used around the full app
  defaultNS: 'common',

  debug: true, // in production mode webpack drops console logs

  interpolation: {
    escapeValue: false // not needed for react!!
  },

  backend: {
    loadPath: './../locales/{{lng}}/{{ns}}.json',
  }
};

i18next.on('languageChanged', function (newLang) {
  let lng = document.documentElement.lang;
  console.log('i18n: languageChanged ' + lng + ' -> ' + newLang);
  if (lng !== newLang) {
    let t = i18next.getFixedT(newLang, 'common');
    document.title = t('Thesaurus');
    document.documentElement.lang = newLang;
  }
});

const setupLanguage = function () {
  let lng = document.documentElement.lang;
  console.log('i18n: setupLanguage ' + lng);
  if ((lng) && (languages.includes(lng))) {
    config.lng = lng;
  }

  // Init i18next
  i18next.use(i18nXHR).init(config);
}

export default { 
  languages: languages,
  i18next: i18next,
  setupLanguage: setupLanguage
};