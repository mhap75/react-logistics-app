import axios from "axios";
import { memo, useCallback, useId } from "react";

const baseUrl = "http://localhost:3004";

const ProductForm = ({
	category,
	product,
	setProduct,
	initialProductState,
	setProductsList,
}) => {
	const id = useId();
	
	const handleFormInput = useCallback(
		({ target }) => {
			setProduct((prev) => ({ ...prev, [target.name]: target.value }));
		},
		[setProduct]
	);

	const handleSubmitNewProduct = async (e) => {
		e.preventDefault();
		if (product.quantity !== 0) {
			try {
				const data = {
					...product,
					id: new Date().getTime(),
				};
				await axios.post(`${baseUrl}/products`, data);
				setProduct(initialProductState);
				setProductsList((prev) => [...prev, data]);
			} catch (error) {
				throw new Error(error.message);
			}
		}
	};

	return (
		<section className="px-5 mb-6">
			<h2 className="mb-2 text-xl font-bold text-slate-300">
				Add New Product
			</h2>
			<form
				className="flex flex-col p-4 bg-base-300 rounded-xl gap-y-4"
				onSubmit={handleSubmitNewProduct}
			>
				<div>
					<label htmlFor={id + "-title"} className="block mb-2 text-slate-400">
						Title
					</label>
					<input
						required
						onChange={handleFormInput}
						type="text"
						name="title"
						value={product.title}
						id={id + "-title"}
						className="w-full input input-bordered input-primary bg-neutral-focus"
					/>
				</div>
				<div>
					<label htmlFor={id + "-quantity"} className="block mb-2 text-slate-400">
						Quantity
					</label>
					<input
						required
						onChange={handleFormInput}
						className="w-full input input-bordered input-primary bg-neutral-focus"
						type="number"
						name="quantity"
						id={id + "-quantity"}
						value={product.quantity}
					/>
				</div>
				<div>
					<label
						htmlFor={id + "-category"}
						className="block mb-2 text-slate-400"
					>
						Category
					</label>
					<select
						required
						onChange={handleFormInput}
						name="cat"
						value={product.cat}
						id={id + "-category"}
						className="w-full select select-primary input-bordered bg-neutral-focus"
					>
						<option value="">Select category</option>
						{category.map((cat) => (
							<option key={cat.id} value={cat.catTitle}>
								{cat.catTitle}
							</option>
						))}
					</select>
				</div>
				<div className="flex items-center justify-between gap-x-4">
					<button id="add-new-product" className="btn btn-block">
						Add new Product
					</button>
				</div>
			</form>
		</section>
	);
};

export default memo(ProductForm);
