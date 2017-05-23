'use strict';

import 'es6-promise/auto';  // Promise polyfill - ge IE9
import 'whatwg-fetch';      // fetch polyfill

import './main.css'; // global styles

import sourcesReducer from './stores/Sources/SourcesReducer';
import { loadSourcesListSuccess } from './stores/Sources/SourcesActions';
import keywordsReducer from './stores/Keywords/KeywordsReducer';
import optionsOfKeywordReducer from './stores/OptionsOfKeyword/OptionsOfKeywordReducer';
import chaptersReducer from './stores/Chapters/ChaptersReducer';
import lexemesReducer from './stores/Lexemes/LexemesReducer';
import optionsOfLexemeReducer from './stores/OptionsOfLexeme/OptionsOfLexemeReducer';
import formsReducer from './stores/Forms/FormsReducer';
import syntagmasReducer from './stores/Syntagmas/SyntagmasReducer';
import contentOfChapterReducer from './stores/ContentOfChapter/ContentOfChapterReducer';

import BptBox from './components/BptBox/BptBox';

import i18n from './i18n/i18n';
i18n.setupLanguage();

import { I18nextProvider } from 'react-i18next';

// import React from 'react'; // imports implicitly by webpack.ProvidePlugin
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
// let loggerMiddleware = createLogger();

// import { Router, hashHistory, Route} from 'react-router';
import { Router, browserHistory, Route} from 'react-router';

import { routerReducer, routerMiddleware as makeRouterMiddleware, syncHistoryWithStore } from 'react-router-redux';
// let routerMiddleware = makeRouterMiddleware(hashHistory);
let routerMiddleware = makeRouterMiddleware(browserHistory);

// Add the reducer to your store on the 'routing' key
// { bptData: Object, routing: Object }
let storeRedux = createStore(
  combineReducers({
    sources: sourcesReducer,
    keywords: keywordsReducer,
    optionsOfKeyword: optionsOfKeywordReducer,
    chapters: chaptersReducer,
    lexemes: lexemesReducer,
    optionsOfLexeme: optionsOfLexemeReducer,
    forms: formsReducer,
    syntagmas: syntagmasReducer,
    contentOfChapter: contentOfChapterReducer,
    routing: routerReducer
  }),
  applyMiddleware(
    // loggerMiddleware,
    thunkMiddleware,
    routerMiddleware
  )
);

// Create an enhanced history that syncs navigation events with the store
// let history = syncHistoryWithStore(hashHistory, storeRedux);
let history = syncHistoryWithStore(browserHistory, storeRedux);

// Load bootup data (sources list) from html-element 'script' and pass it to redux store
let bootupData = document.getElementById('bootupData');
if (bootupData) {
  let bootupDataContent = bootupData.textContent;
  if (bootupDataContent !== undefined) {
    storeRedux.dispatch(loadSourcesListSuccess(JSON.parse(bootupDataContent)));
  }
  bootupData.parentNode.removeChild(bootupData);
}

// Not optimal! Try to load i18n resource file at server and save/load it like bootupData
let onceLoaded = function(loaded) {
  // console.log(loaded);
  i18n.i18next.off('loaded', onceLoaded); // only once

  ReactDOM.render(
    <I18nextProvider i18n={i18n.i18next}>
      <Provider store={storeRedux}>
        <Router history={history}>
          <Route path="/(:language)" component={BptBox} />
        </Router>
      </Provider>
    </I18nextProvider>,
    document.getElementById('mainBox')
  );
};

i18n.i18next.on('loaded', onceLoaded);