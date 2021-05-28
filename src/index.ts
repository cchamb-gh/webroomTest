const axios = require('axios').default;
const urlParse = require('url-parse');

const original = async (url: string) => {
  return await axios
    .get(url)
    .then((response: any) => {
      logDebug('----URL', url);
      logDebug('--- RESPONSE: ', response);
      const finalRedirectedUrl: string = response.request.responseURL;
      logDebug('--- finalRedirectedUrl: ', finalRedirectedUrl);
      const parsedRedirectUrl = urlParse(finalRedirectedUrl, true);
      const webroom = parsedRedirectUrl.query['room'];
      logDebug('--- Webroom: ' + webroom);
      return webroom ? webroom : '';
    })
    .catch((error: any) => {
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
