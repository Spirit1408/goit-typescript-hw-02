import ImageCard from "./ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../interfaces";

interface ImageGalleryProps {
	items: Image[];
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
