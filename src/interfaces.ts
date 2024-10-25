export interface Image {
	id: string;
	urls: {
		small: string;
		regular?: string;
	};
	description: string;
	likes: number;
	user: {
		first_name: string;
		last_name: string;
		links: {
			html: string;
		};
	};
}

