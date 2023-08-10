import axios from "axios";
import { useEffect, useState } from "react";

const ProductList = ({ productsList, setProductsList }) => {
	const [searchInput, setSearchInput] = useState("");
	const [sortValue, setSortValue] = useState("");
	const [toShowProducts, setToShowProducts] = useState([]);

	const handleDeleteProduct = async (productId) => {
		try {
			await axios.delete(`http://localhost:3004/products/${productId}`);
			const newProductList = productsList.filter(
				(product) => product.id !== productId
			);
			setProductsList(newProductList);
		} catch (error) {
			throw new Error(error.message);
		}
	};

	const handleSearch = ({ target }) => {
		setSearchInput(target.value);
	};

	const handleSort = ({ target }) => {
		setSortValue(target.value);
	};

	const filterSearchProducts = (arr) => {
		return arr.filter((product) => {
      const values = Object.values(product);
			return values.some((val) =>
				JSON.stringify(val).toLowerCase().includes(searchInput.trim().toLowerCase())
			);
		});
	};

	const filterSortProducts = (arr) => {
		let sortedProducts = [...arr];
		if (sortValue === "newest") {
			sortedProducts.sort((a, b) => b.quantity - a.quantity);
		} else if (sortValue === "oldest") {
			sortedProducts.sort((a, b) => a.quantity - b.quantity);
		}
		return sortedProducts;
	};

	useEffect(() => {
		let result = productsList;
		result = filterSearchProducts(result);
		result = filterSortProducts(result);
		setToShowProducts(result);
	}, [productsList, sortValue, searchInput]);

	return (
		<section className="overflow-x-auto">
			<div className="flex items-center justify-between mb-2">
				<input
					placeholder="search items"
					type="search"
					name="search-input"
					className="w-1/3 m-2 transition-all focus:w-1/2 input input-accent input-bordered input-sm"
					value={searchInput}
					onChange={handleSearch}
				/>
				<select
					value={sortValue}
					name="sort-products"
					onChange={handleSort}
					className="m-2 select select-accent select-sm"
				>
					<option value="">Sort by amount (Default)</option>
					<option value="newest">Highest</option>
					<option value="oldest">Lowest</option>
				</select>
			</div>
			<table className="table w-full table-compact">
				{/* head */}
				<thead>
					<tr>
						<th>#</th>
						<th>ID</th>
						<th>Product title</th>
						<th>Quantity</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{/* rows */}
					{toShowProducts &&
						toShowProducts.map((product, index) => (
							<tr
								className="overflow-x-auto hover"
								key={product.id}
							>
								<th>{index + 1}</th>
								<th>{product.id}</th>
								<td className="group">
									<div className="indicator">
										<span className="transition-all opacity-0 group-hover:opacity-100 indicator-item badge badge-sm badge-error -top-1 -right-2">
											<button
												onClick={() =>
													handleDeleteProduct(
														product.id
													)
												}
											>
												🞫
											</button>
										</span>
										<div className="peer">
											{product.title}
										</div>
									</div>
								</td>
								<td>
									<span
										className={`w-full badge ${
											product.quantity < 5 &&
											"badge-warning"
										}`}
									>
										{product.quantity}
									</span>
								</td>
								<td>{product.cat}</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	);
};

export default ProductList;
