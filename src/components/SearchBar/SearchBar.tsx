import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const query = form.elements.namedItem("query") as HTMLInputElement;

		if (query.value === "") {
			toast.error(`Field shouldn't be empty`, { position: "top-right" });
			return;
		}

		onSearch(query.value);

		form.reset();
	};

	return (
		<header className={css.searchBar}>
			<form className={css.searchForm} onSubmit={handleSubmit}>
				<div className={css.inputContainer}>
					<button className={css.submitBtn} type="submit">
						<IoSearchOutline size={20} />
					</button>
					<input
						className={css.searchInput}
						type="text"
						name="query"
						autoComplete="off"
						placeholder="Search images and photos"
					/>
				</div>
			</form>
		</header>
	);
}
