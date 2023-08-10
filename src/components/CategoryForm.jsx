import axios from "axios";
import { memo, useCallback, useId, useState } from "react";


const CategoryForm = ({
	setCategory,
	category,
	initialCatState,
	setAsyncCategory,
}) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const id = useId();

	const handleCollapse = () => {
		setIsOpenForm((prevState) => !prevState);
	};

	const handleFormInput = useCallback(
		({ target }) => {
			setCategory((prev) => ({ ...prev, [target.name]: target.value }));
		},
		[setCategory]
	);

	const handleSubmitNewCategory = async (e) => {
		e.preventDefault();
		try {
			const data = {
				...category,
				id: new Date().getTime(),
			};
			await axios.post("http://localhost:3004/categories", data);
			setCategory(initialCatState);
			setAsyncCategory((prev) => [...prev, data]);
		} catch (error) {
			throw new Error(error.message);
		}
	};

	return (
		<section className="px-5">
			{!isOpenForm && (
				<button
					id="toggle-add-category"
					className="mb-4 link link-primary"
					onClick={handleCollapse}
				>
					Add new Category?
				</button>
			)}
			<div
				className={`mb-6 ${!isOpenForm && "hidden"}`}
				id="category-wrapper"
			>
				<h2 className="mb-2 text-xl font-bold">Add New category</h2>
				<form
					className="flex flex-col p-4 bg-base-300 rounded-xl gap-y-4"
					onSubmit={handleSubmitNewCategory}
				>
					<div>
						<label
							htmlFor={id + "-title"}
							className="block mb-2 text-slate-400"
						>
							Title
						</label>
						<input
							required
							onChange={handleFormInput}
							type="text"
							name="catTitle"
							id={id + "-title"}
							value={category.catTitle}
							className="w-full input input-bordered input-primary bg-neutral-focus"
						/>
					</div>
					<div>
						<label
							htmlFor={id + "-description"}
							className="block mb-2 text-slate-400"
						>
							Description
						</label>
						<textarea
							required
							onChange={handleFormInput}
							className="w-full textarea textarea-primary bg-neutral-focus"
							type="text"
							name="catDesc"
							id={id + "-description"}
							value={category.catDesc}
						></textarea>
					</div>
					<div className="flex items-center justify-between gap-x-4">
						<button
							className="flex-1 btn btn-error btn-outline"
							onClick={handleCollapse}
							type="button"
						>
							Cancel
						</button>
						<button id="add-new-category" className="flex-1 btn">
							Add Category
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default memo(CategoryForm);
