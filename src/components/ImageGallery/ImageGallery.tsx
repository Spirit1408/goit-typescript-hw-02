import ImageCard from "./ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
	items: {
		id: string;
		urls: {
			small: string;
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
	}[];
	query: string;
	handleClick: (image: unknown) => void;
}

export default function ImageGallery({
	items,
	query,
	handleClick,
}: ImageGalleryProps) {
	return (
		<>
			<h1 className={css.title}>Search results by "{query}" request</h1>
			<ul className={css.gallery}>
				{items.length !== 0 &&
					items.map((item) => (
						<li key={item.id}>
							<ImageCard item={item} clickOnImage={handleClick} />
						</li>
					))}
			</ul>
		</>
	);
}
