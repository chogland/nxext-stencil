import { locales } from '../../../utils/locale';
import {
  ar,
  bs,
  ca,
  cs,
  da,
  de,
  deCH,
  el,
  en,
  enAU,
  enCA,
  enGB,
  es,
  esMX,
  et,
  fi,
  fr,
  frCH,
  he,
  hi,
  hr,
  hu,
  id,
  it,
  itCH,
  ja,
  ko,
  lt,
  lv,
  mk,
  nb,
  nl,
  pl,
  pt,
  ptPT,
  ro,
  ru,
  sk,
  sl,
  sr,
  sv,
  th,
  tr,
  uk,
  vi,
  zhCN,
  zhHK,
  zhTW,
  DateLocaleData,
} from './interfaces';

/**
 * Get supported locale code from raw user input
 * Exported for testing purposes.
 * @private
 */
function getSupportedLocale(lang = '') {
  if (locales.indexOf(lang) > -1) {
    return lang;
  } else {
    const base = lang.split('-')[0];
    if (locales.indexOf(base) > -1) {
      return base;
    } else {
      return 'en';
    }
  }
}

/**
 * Fetch calendar data for a given locale from list of supported languages
 * @public
 */
export async function getLocaleData(lang: string): Promise<DateLocaleData> {
  const locale = getSupportedLocale(lang);
  let formattedLocale: string;
  if (locale.includes('-')) {
    formattedLocale = locale.replace('-', '');
  }
  switch (formattedLocale) {
    case 'ar':
      return ar;
    case 'bs':
      return bs;
    case 'ca':
      return ca;
    case 'cs':
      return cs;
    case 'da':
      return da;
    case 'deCH':
      return deCH;
    case 'de':
      return de;
    case 'el':
      return el;
    case 'enAU':
      return enAU;
    case 'enCA':
      return enCA;
    case 'enGB':
      return enGB;
    case 'en':
      return en;
    case 'esMX':
      return esMX;
    case 'es':
      return es;
    case 'et':
      return et;
    case 'fi':
      return fi;
    case 'frCH':
      return frCH;
    case 'fr':
      return fr;
    case 'he':
      return he;
    case 'hi':
      return hi;
    case 'hr':
      return hr;
    case 'hu':
      return hu;
    case 'id':
      return id;
    case 'itCH':
      return itCH;
    case 'it':
      return it;
    case 'ja':
      return ja;
    case 'ko':
      return ko;
    case 'lt':
      return lt;
    case 'lv':
      return lv;
    case 'mk':
      return mk;
    case 'nb':
      return nb;
    case 'nl':
      return nl;
    case 'pl':
      return pl;
    case 'ptPT':
      return ptPT;
    case 'pt':
      return pt;
    case 'ro':
      return ro;
    case 'ru':
      return ru;
    case 'sk':
      return sk;
    case 'sl':
      return sl;
    case 'sr':
      return sr;
    case 'sv':
      return sv;
    case 'th':
      return th;
    case 'tr':
      return tr;
    case 'uk':
      return uk;
    case 'vi':
      return vi;
    case 'zhCN':
      return zhCN;
    case 'zhHK':
      return zhHK;
    case 'zhTW':
      return zhTW;
    default:
      console.error(`Translations for "${locale}" not found or invalid, falling back to english`);
      return en;
  }
}
