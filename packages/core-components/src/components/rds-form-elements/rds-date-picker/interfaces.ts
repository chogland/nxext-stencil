/**
 * Translation resource data structure
 * @private
 */
export interface DateLocaleData {
  'default-calendar': 'gregorian';
  'separator': string;
  'unitOrder': string;
  'weekStart': number;
  'placeholder': string;
  'days': {
    abbreviated?: string[];
    narrow?: string[];
    short?: string[];
    wide?: string[];
  };
  'numerals': string;
  'months': {
    abbreviated: string[];
    narrow: string[];
    wide: string[];
  };
  'year'?: {
    suffix: string;
  };
}

export const ar: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '‏/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    short: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    wide: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  },
  'numerals': '٠١٢٣٤٥٦٧٨٩',
  'months': {
    abbreviated: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    narrow: ['ي', 'ف', 'م', 'أ', 'و', 'ن', 'ل', 'غ', 'س', 'ك', 'ب', 'د'],
    wide: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  },
};

export const bs: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD. MM. YYYY.',
  'weekStart': 7,
  'placeholder': 'DD. MM. YYYY.',
  'days': {
    abbreviated: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    narrow: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
    short: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    wide: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
    narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    wide: ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar'],
  },
};

export const ca: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.'],
    narrow: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
    short: ['dg.', 'dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.'],
    wide: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.', 'des.'],
    narrow: ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],
    wide: ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'],
  },
};

export const cs: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
    narrow: ['N', 'P', 'Ú', 'S', 'Č', 'P', 'S'],
    short: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
    wide: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
    narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    wide: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
  },
};

export const da: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
    narrow: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
    short: ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
    wide: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'],
  },
};

export const deCH: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 1,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    short: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  },
};

export const de: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
    short: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
    wide: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  },
};

export const el: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['Κυρ', 'Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ'],
    narrow: ['Κ', 'Δ', 'Τ', 'Τ', 'Π', 'Π', 'Σ'],
    short: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πέ', 'Πα', 'Σά'],
    wide: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['Ιαν', 'Φεβ', 'Μάρ', 'Απρ', 'Μάι', 'Ιούν', 'Ιούλ', 'Αύγ', 'Σεπ', 'Οκτ', 'Νοέ', 'Δεκ'],
    narrow: ['Ι', 'Φ', 'Μ', 'Α', 'Μ', 'Ι', 'Ι', 'Α', 'Σ', 'Ο', 'Ν', 'Δ'],
    wide: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
  },
};

export const enAU: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    narrow: ['Su.', 'M.', 'Tu.', 'W.', 'Th.', 'F.', 'Sa.'],
    short: ['Su', 'Mon', 'Tu', 'Wed', 'Th', 'Fri', 'Sat'],
  },
  'numerals': '0123456789',
  'months': {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },
};

export const enCA: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '-',
  'unitOrder': 'YYYY-MM-DD',
  'weekStart': 7,
  'placeholder': 'YYYY-MM-DD',
  'days': {
    abbreviated: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  },
  'numerals': '0123456789',
  'months': {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },
};

export const enGB: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 1,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
  'numerals': '0123456789',
  'months': {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },
};

export const en: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'dd/mmm/yyyy',
  'weekStart': 7,
  'placeholder': 'Select Date',
  'days': {
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  },
};

export const enMX: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.'],
    narrow: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  },
};

export const es: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    narrow: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    short: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
    wide: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.'],
    narrow: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  },
};

export const esMX: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.'],
    narrow: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  },
};

export const et: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
    narrow: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
    short: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
    wide: ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jaan', 'veebr', 'märts', 'apr', 'mai', 'juuni', 'juuli', 'aug', 'sept', 'okt', 'nov', 'dets'],
    narrow: ['J', 'V', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'],
  },
};

export const fi: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
    narrow: ['S', 'M', 'T', 'K', 'T', 'P', 'L'],
    short: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
    wide: ['sunnuntaina', 'maanantaina', 'tiistaina', 'keskiviikkona', 'torstaina', 'perjantaina', 'lauantaina'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä', 'heinä', 'elo', 'syys', 'loka', 'marras', 'joulu'],
    narrow: ['T', 'H', 'M', 'H', 'T', 'K', 'H', 'E', 'S', 'L', 'M', 'J'],
    wide: ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'],
  },
};

export const frCH: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 1,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    short: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
    wide: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  },
};

export const fr: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    short: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
    wide: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  },
};

export const he: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['יום א׳', 'יום ב׳', 'יום ג׳', 'יום ד׳', 'יום ה׳', 'יום ו׳', 'שבת'],
    narrow: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
    short: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
    wide: ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'יום שבת'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['ינו׳', 'פבר׳', 'מרץ', 'אפר׳', 'מאי', 'יוני', 'יולי', 'אוג׳', 'ספט׳', 'אוק׳', 'נוב׳', 'דצמ׳'],
    narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    wide: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
  },
};

export const hi: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    narrow: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
    short: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
    wide: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['जन॰', 'फ़र॰', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुल॰', 'अग॰', 'सित॰', 'अक्तू॰', 'नव॰', 'दिस॰'],
    narrow: ['ज', 'फ़', 'मा', 'अ', 'म', 'जू', 'जु', 'अ', 'सि', 'अ', 'न', 'दि'],
    wide: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्तूबर', 'नवंबर', 'दिसंबर'],
  },
};

export const hr: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD. MM. YYYY.',
  'weekStart': 7,
  'placeholder': 'DD. MM. YYYY.',
  'days': {
    abbreviated: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    narrow: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
    short: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    wide: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['sij', 'velj', 'ožu', 'tra', 'svi', 'lip', 'srp', 'kol', 'ruj', 'lis', 'stu', 'pro'],
    narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
    wide: ['siječanj', 'veljača', 'ožujak', 'travanj', 'svibanj', 'lipanj', 'srpanj', 'kolovoz', 'rujan', 'listopad', 'studeni', 'prosinac'],
  },
};

export const hu: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'YYYY. MM. DD.',
  'weekStart': 7,
  'placeholder': 'YYYY. MM. DD.',
  'days': {
    abbreviated: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
    narrow: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
    short: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
    wide: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'],
    narrow: ['J', 'F', 'M', 'Á', 'M', 'J', 'J', 'A', 'Sz', 'O', 'N', 'D'],
    wide: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
  },
};

export const id: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    narrow: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],
    short: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    wide: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  },
};

export const itCH: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 1,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
    narrow: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
    short: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
    wide: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
    narrow: ['G', 'F', 'M', 'A', 'M', 'G', 'L', 'A', 'S', 'O', 'N', 'D'],
    wide: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
  },
};

export const it: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
    narrow: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
    short: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
    wide: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
    narrow: ['G', 'F', 'M', 'A', 'M', 'G', 'L', 'A', 'S', 'O', 'N', 'D'],
    wide: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
  },
};

export const ja: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'YYYY/MM/DD',
  'weekStart': 7,
  'placeholder': 'YYYY/MM/DD',
  'days': {
    abbreviated: ['日', '月', '火', '水', '木', '金', '土'],
    narrow: ['日', '月', '火', '水', '木', '金', '土'],
    short: ['日', '月', '火', '水', '木', '金', '土'],
    wide: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    wide: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  'year': {
    suffix: '年',
  },
};

export const ko: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'YYYY. MM. DD.',
  'weekStart': 7,
  'placeholder': 'YYYY. MM. DD.',
  'days': {
    abbreviated: ['일', '월', '화', '수', '목', '금', '토'],
    narrow: ['일', '월', '화', '수', '목', '금', '토'],
    short: ['일', '월', '화', '수', '목', '금', '토'],
    wide: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    narrow: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    wide: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  },
  'year': {
    suffix: '년',
  },
};

export const lt: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '-',
  'unitOrder': 'YYYY-MM-DD',
  'weekStart': 7,
  'placeholder': 'YYYY-MM-DD',
  'days': {
    abbreviated: ['sk', 'pr', 'an', 'tr', 'kt', 'pn', 'št'],
    narrow: ['S', 'P', 'A', 'T', 'K', 'P', 'Š'],
    short: ['Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št'],
    wide: ['sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis', 'ketvirtadienis', 'penktadienis', 'šeštadienis'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['saus.', 'vas.', 'kov.', 'bal.', 'geg.', 'birž.', 'liep.', 'rugp.', 'rugs.', 'spal.', 'lapkr.', 'gruod.'],
    narrow: ['S', 'V', 'K', 'B', 'G', 'B', 'L', 'R', 'R', 'S', 'L', 'G'],
    wide: ['sausis', 'vasaris', 'kovas', 'balandis', 'gegužė', 'birželis', 'liepa', 'rugpjūtis', 'rugsėjis', 'spalis', 'lapkritis', 'gruodis'],
  },
};

export const lv: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['svētd.', 'pirmd.', 'otrd.', 'trešd.', 'ceturtd.', 'piektd.', 'sestd.'],
    narrow: ['S', 'P', 'O', 'T', 'C', 'P', 'S'],
    short: ['Sv', 'Pr', 'Ot', 'Tr', 'Ce', 'Pk', 'Se'],
    wide: ['svētdiena', 'pirmdiena', 'otrdiena', 'trešdiena', 'ceturtdiena', 'piektdiena', 'sestdiena'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['janv.', 'febr.', 'marts', 'apr.', 'maijs', 'jūn.', 'jūl.', 'aug.', 'sept.', 'okt.', 'nov.', 'dec.'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['janvāris', 'februāris', 'marts', 'aprīlis', 'maijs', 'jūnijs', 'jūlijs', 'augusts', 'septembris', 'oktobris', 'novembris', 'decembris'],
  },
};

export const mk: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['нед.', 'пон.', 'вт.', 'сре.', 'чет.', 'пет.', 'саб.'],
    narrow: ['н', 'п', 'в', 'с', 'ч', 'п', 'с'],
    short: ['нед.', 'пон.', 'вто.', 'сре.', 'чет.', 'пет.', 'саб.'],
    wide: ['недела', 'понеделник', 'вторник', 'среда', 'четврток', 'петок', 'сабота'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['јан.', 'фев.', 'мар.', 'апр.', 'мај', 'јун.', 'јул.', 'авг.', 'септ.', 'окт.', 'ноем.', 'дек.'],
    narrow: ['ј', 'ф', 'м', 'а', 'м', 'ј', 'ј', 'а', 'с', 'о', 'н', 'д'],
    wide: ['јануари', 'февруари', 'март', 'април', 'мај', 'јуни', 'јули', 'август', 'септември', 'октомври', 'ноември', 'декември'],
  },
};

export const nb: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
    narrow: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
    short: ['sø.', 'ma.', 'ti.', 'on.', 'to.', 'fr.', 'lø.'],
    wide: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
  },
};

export const nl: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '-',
  'unitOrder': 'DD-MM-YYYY',
  'weekStart': 7,
  'placeholder': 'DD-MM-YYYY',
  'days': {
    abbreviated: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    narrow: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],
    short: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    wide: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  },
};

export const pl: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
    narrow: ['n', 'p', 'w', 'ś', 'c', 'p', 's'],
    short: ['nie', 'pon', 'wto', 'śro', 'czw', 'pią', 'sob'],
    wide: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
    narrow: ['S', 'L', 'M', 'K', 'M', 'C', 'L', 'S', 'W', 'P', 'L', 'G'],
    wide: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'],
  },
};

export const ptPT: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'],
    wide: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
    narrow: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  },
};

export const pt: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'],
    narrow: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    wide: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  },
};

export const ro: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['dum.', 'lun.', 'mar.', 'mie.', 'joi', 'vin.', 'sâm.'],
    narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    short: ['du.', 'lu.', 'ma.', 'mi.', 'joi', 'vi.', 'sâ.'],
    wide: ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.'],
    narrow: ['I', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
    wide: ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'],
  },
};

export const ru: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    narrow: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    short: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    wide: ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
    narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
    wide: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
  },
};

export const sk: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD. MM. YYYY',
  'weekStart': 1,
  'placeholder': 'DD. MM. YYYY',
  'days': {
    abbreviated: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
    narrow: ['n', 'p', 'u', 's', 'š', 'p', 's'],
    short: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
    wide: ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'],
    narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    wide: ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'],
  },
};

export const sl: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD. MM. YYYY',
  'weekStart': 7,
  'placeholder': 'DD. MM. YYYY',
  'days': {
    abbreviated: ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.'],
    narrow: ['n', 'p', 't', 's', 'č', 'p', 's'],
    short: ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.'],
    wide: ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
    narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
    wide: ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december'],
  },
};

export const sr: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY.',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY.',
  'days': {
    abbreviated: ['нед', 'пон', 'уто', 'сре', 'чет', 'пет', 'суб'],
    narrow: ['н', 'п', 'у', 'с', 'ч', 'п', 'с'],
    short: ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су'],
    wide: ['недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['јан', 'феб', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'нов', 'дец'],
    narrow: ['ј', 'ф', 'м', 'а', 'м', 'ј', 'ј', 'а', 'с', 'о', 'н', 'д'],
    wide: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'],
  },
};

export const sv: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '-',
  'unitOrder': 'YYYY-MM-DD',
  'weekStart': 7,
  'placeholder': 'YYYY-MM-DD',
  'days': {
    abbreviated: ['sön', 'mån', 'tis', 'ons', 'tors', 'fre', 'lör'],
    narrow: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
    short: ['sö', 'må', 'ti', 'on', 'to', 'fr', 'lö'],
    wide: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['jan.', 'feb.', 'mars', 'apr.', 'maj', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    wide: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
  },
};

export const th: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
    narrow: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    short: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
    wide: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
    narrow: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
    wide: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
  },
};

export const tr: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    narrow: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
    short: ['Pa', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
    wide: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    narrow: ['O', 'Ş', 'M', 'N', 'M', 'H', 'T', 'A', 'E', 'E', 'K', 'A'],
    wide: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  },
};

export const uk: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '.',
  'unitOrder': 'DD.MM.YYYY',
  'weekStart': 7,
  'placeholder': 'DD.MM.YYYY',
  'days': {
    abbreviated: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    narrow: ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'],
    short: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    wide: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'пʼятниця', 'субота'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'],
    narrow: ['С', 'Л', 'Б', 'К', 'Т', 'Ч', 'Л', 'С', 'В', 'Ж', 'Л', 'Г'],
    wide: ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'],
  },
};

export const vi: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'],
    narrow: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    short: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    wide: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
    narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    wide: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  },
};

export const zhCN: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'YYYY/MM/DD',
  'weekStart': 7,
  'placeholder': 'YYYY/MM/DD',
  'days': {
    abbreviated: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    narrow: ['日', '一', '二', '三', '四', '五', '六'],
    short: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    wide: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    wide: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  },
  'year': {
    suffix: '年',
  },
};

export const zhHK: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'DD/MM/YYYY',
  'weekStart': 7,
  'placeholder': 'DD/MM/YYYY',
  'days': {
    abbreviated: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    narrow: ['日', '一', '二', '三', '四', '五', '六'],
    short: ['日', '一', '二', '三', '四', '五', '六'],
    wide: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    wide: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  'year': {
    suffix: '年',
  },
};

export const zhTW: DateLocaleData = {
  'default-calendar': 'gregorian',
  'separator': '/',
  'unitOrder': 'YYYY/MM/DD',
  'weekStart': 7,
  'placeholder': 'YYYY/MM/DD',
  'days': {
    abbreviated: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    narrow: ['日', '一', '二', '三', '四', '五', '六'],
    short: ['日', '一', '二', '三', '四', '五', '六'],
    wide: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  },
  'numerals': '0123456789',
  'months': {
    abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    wide: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  'year': {
    suffix: '年',
  },
};
