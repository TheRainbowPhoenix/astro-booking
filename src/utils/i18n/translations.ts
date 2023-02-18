export interface TranslationsTable {
	[locale: string]: {
		[key: string]: string;
	};
}

const _t: TranslationsTable = {
	en: {
		'BookingSummary.rooms_section_title_sronly': 'Selected rooms and rates',
		'ReservationPage.BookingSummaryFooter.book_now_button_label': 'Book'
	},
	fr: {
		loading: 'Chargement en cours…',
		'ReservationPage.BookingSummaryFooter.book_now_button_label': 'Réserver'
	}
};

export default _t;
