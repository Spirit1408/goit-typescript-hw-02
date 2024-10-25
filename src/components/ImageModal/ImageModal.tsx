import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	image: {
		urls: {
			regular: string;
		};
		description: string;
	};
}

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
