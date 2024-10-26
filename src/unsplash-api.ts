import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export type Image = {
	id: string;
	urls: {
		small: string;
		regular: string;
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
	links: {
		download: string;
	};
};

type Response = {
	results: Image[];
	total: number;
};

export const fetchImages = async (
	query: string,
	page = 1,
): Promise<{ images: Image[]; totalPages: number }> => {
	const response = await axios.get<Response>("/search/photos", {
		params: {
			query,
			per_page: 12,
			page,
			orientation: "landscape",
		},
		headers: {
			Authorization: `Client-ID 1qBuXkzbud4-K2PGZcYpqifewpMk7eQ4mHbh1BT2Wxg`,
		},
	});

	return {
		images: response.data.results,
		totalPages: Math.ceil(response.data.total / 12),
	};
};
