import { loadSourcesListSuccess } from '../frontend/stores/Sources/SourcesActions';
import sourcesReducer from '../frontend/stores/Sources/SourcesReducer';
import keywordsReducer from '../frontend/stores/Keywords/KeywordsReducer';
import optionsOfKeywordReducer from '../frontend/stores/OptionsOfKeyword/OptionsOfKeywordReducer';
import chaptersReducer from '../frontend/stores/Chapters/ChaptersReducer';
import lexemesReducer from '../frontend/stores/Lexemes/LexemesReducer';
import meaningsReducer from '../frontend/stores/Meanings/MeaningsReducer';
import optionsOfLexemeReducer from '../frontend/stores/OptionsOfLexeme/OptionsOfLexemeReducer';
import formsReducer from '../frontend/stores/Forms/FormsReducer';
import syntagmasReducer from '../frontend/stores/Syntagmas/SyntagmasReducer';
import examplesReducer from '../frontend/stores/Examples/ExamplesReducer';
import contentOfChapterReducer from '../frontend/stores/ContentOfChapter/ContentOfChapterReducer';

import BptBox from '../frontend/components/BptBox/BptBox';

import React from 'react';
import ReactDOMServer from 'react-dom/server'

import { I18nextProvider } from 'react-i18next';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// and these to match the url to routes and then render
import { Route, match, RouterContext } from 'react-router';

const clientRoutes = ( // can be moved into separate module - common for client & server
  <Route path="/(:language)" component={BptBox} />
); 

const wireUp = function (records, req, res, next) {
  // console.log('/' + req.language + req.url);
  match({ routes: clientRoutes, location: '/' + req.language + req.url }, (err, redirect, props) => {
    if (err) {
      // there was an error somewhere during route matching
      return next(err);
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // if we got props then we matched a route and can render

      let storeRedux = createStore(
        combineReducers({
          sources: sourcesReducer,
          keywords: keywordsReducer,
          optionsOfKeyword: optionsOfKeywordReducer,
          chapters: chaptersReducer,
          lexemes: lexemesReducer,
          meanings: meaningsReducer,
          optionsOfLexeme: optionsOfLexemeReducer,
          forms: formsReducer,
          syntagmas: syntagmasReducer,
          examples: examplesReducer,
          contentOfChapter: contentOfChapterReducer,
        })
      );

      storeRedux.dispatch(loadSourcesListSuccess(records)); // set initial state

      let i18n = req.i18n;

      let content = ReactDOMServer.renderToString(
        <I18nextProvider i18n={i18n}>
          <Provider store={storeRedux}>
            <RouterContext {...props} />
          </Provider>
        </I18nextProvider>
      );

      return res.render('index', {
        title: req.t('Thesaurus'),
        language: req.language,
        content: content,
        i18nResource: JSON.stringify(i18n.getResourceBundle(req.language, i18n.options.defaultNS)),
        bootupData: JSON.stringify(records)
      });

    } else {
      // no errors, no redirect, we just didn't match anything
      next();
    }
  });
};

module.exports = wireUp;