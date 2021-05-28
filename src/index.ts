'use strict';

import {ResponseType} from 'axios';

const axios = require('axios').default;
const urlParse = require('url-parse');

const getWebroomFromShortlink = async (url: string) => {
  return await axios
    .get(url)
    .then((response: any) => {
      logDebug('----URL', url);
      // logDebug('--- RESPONSE: ', response);

      /*
      CURRENT:
      Doesn't work when run from node.
      Current MMX code looks for response.request.responseURL. Note capitalization
      of 'responseURL'. Causes finalRedirectedUrl to be undefined.
      Why doesn't this work from node?
      */
      const finalRedirectedUrl: string = response.request.responseURL;
      logDebug('--- finalRedirectedUrl: ', finalRedirectedUrl);
      const parsedRedirectUrl = urlParse(finalRedirectedUrl, true);
      const webroom = parsedRedirectUrl.query['room'];
      logDebug('--- Webroom: ' + webroom);

      /*
      WORKS from node.
      Gets redirect URL from response.request.res.responseUrl. Note capitalization.
      */
      const nodeRedirectUrl: string = response.request.res.responseUrl;
      logDebug('--- adjusted redirect URL: ', nodeRedirectUrl);
      const parsedNodeRedirectUrl = urlParse(nodeRedirectUrl, true);
      const nodeWebroom = parsedNodeRedirectUrl.query['room'];
      logDebug('--- adjusted webroom: ', nodeWebroom);

      return webroom ? webroom : '';
    })
    .catch((error: Error) => {
      logDebug('--- getWebroomFromShortlink error: ' + error);
      throw error;
    });
};

const logDebug = (message?: any, ...optionalParams: any[]) => {
  if (optionalParams.length > 0) {
    console.debug(message, ...optionalParams);
  } else {
    console.debug(message);
  }
};

// Paul's URL uses Mongo
const url1 = 'https://start.qa.hootmeeting.com/paulattisano2';
getWebroomFromShortlink(url1);

// Existing short URLs don't use Mongo
const url2 = 'https://start.qa.hootmeeting.com/TMMX1';
getWebroomFromShortlink(url2);
