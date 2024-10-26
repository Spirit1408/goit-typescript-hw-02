import Modal from "react-modal";
import css from "./ImageModal.module.css";
import type { Image } from "../../unsplash-api";

Modal.setAppElement("#root");

type ImageModalImage = Pick<Image, "description"> & {
	urls: Pick<Image["urls"], "regular">;
};

type ImageModalProps = {
	isOpen: boolean;
	onClose: () => void;
	image: ImageModalImage;
};

export default function ImageModal({
	isOpen,
	onClose,
	image,
}: ImageModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Image Modal"
			className={css.modal}
			overlayClassName={css.overlay}
		>
			<div className={css.imageContainer}>
				<img
					src={image.urls.regular}
					alt={image.description}
					className={css.image}
				/>
			</div>
		</Modal>
	);
}
