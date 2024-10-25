import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { fetchImages } from "../../unsplash-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "../../interfaces";

export default function App() {
	const [images, setImages] = useState<Image[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [query, setQuery] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [selectedImage, setSelectedImage] = useState<null | Image>(null);

	const handleSearch = async (query: string) => {
		try {
			setImages([]);
			setLoading(true);
			setError(false);
			setQuery(query);
			setPage(1);

			const { images, totalPages } = await fetchImages(query);

			setImages(images);
			setTotalPages(totalPages);
		} catch (error) {
			setError(true);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const loadMore = async () => {
		try {
			setLoading(true);
			const nextPage: number = page + 1;
			const { images } = await fetchImages(query, nextPage);

			setImages((prevImages) => [...prevImages, ...images]);
			setPage(nextPage);

			if (nextPage >= totalPages) {
				toast.success("No more images to show!");
			}
		} catch (error) {
			setError(true);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleClickOnImage = (image: Image) => {
		setSelectedImage(image);
	};

	const closeModal = () => {
		setSelectedImage(null);
	};

	return (
		<>
			<Toaster />

			<SearchBar onSearch={handleSearch} />

			{error && <ErrorMessage />}

			{images.length > 0 && (
				<ImageGallery
					items={images}
					query={query}
					handleClick={handleClickOnImage}
				/>
			)}

			{loading && <Loader />}

			{images.length > 0 && page < totalPages && !loading && (
				<LoadMoreBtn onClick={loadMore} />
			)}

			{selectedImage && (
				<ImageModal
					isOpen={!!selectedImage}
					onClose={closeModal}
					image={selectedImage}
				/>
			)}
		</>
	);
}
