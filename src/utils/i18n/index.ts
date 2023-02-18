import { derived, writable, get } from 'svelte/store';
import translations from './translations';

export const userLocale = writable('en');
export const availableLocales = Object.keys(translations);

function translate(
	locale: string,
	key: string,
	vars: {
		[key: string]: string;
	}
) {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	// Grab the translation from the translations object.
	let text = translations[locale][key];

	if (!text) {
		console.error(`no translation found for ${locale}.${key}`);
		// throw new Error(`no translation found for ${locale}.${key}`);
		return `${locale}.${key}`;
	}

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	userLocale,
	($locale) =>
		(key: string, vars = {}) =>
			translate($locale, key, vars)
);

export const setUserLocale = (l: string) => {
	if (!availableLocales.includes(l)) {
		console.error('Unknown locale : ' + l);
		l = 'en';
	}
	userLocale.set(l);
};

export interface Language {
	name: string;
	key: string;
	locale: string;
}

const languageMap: { [key: string]: Language } = {
	en: {
		name: 'English',
		key: 'en',
		locale: 'en_GB'
	},
	fr: {
		name: 'French',
		key: 'fr',
		locale: 'fr_FR'
	}
};

export let getAvailableLanguages: () => Language[] = () => {
	return availableLocales.map((l) => languageMap[l] || { name: l, key: l });
};

export let getCurrentLanguage = () => {
	return languageMap[get(userLocale)] || languageMap['en'];
};

export const fallbackLanguage = languageMap['en'];
