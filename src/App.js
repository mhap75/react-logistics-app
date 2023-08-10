import { useEffect, useState } from "react";
import CategoryForm from "./components/CategoryForm";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import axios from "axios";
import ProductList from "./components/ProductList";

const initialCatState = { catTitle: "", catDesc: "" };
const initialProductState = { title: "", quantity: Number(0), cat: "" };

function App() {
	const [category, setCategory] = useState(initialCatState);
	const [asyncCategory, setAsyncCategory] = useState([]);
	const [product, setProduct] = useState(initialProductState);
	const [productsList, setProductsList] = useState([])

	
	useEffect(() => {
		(async function () {
			try {
				const { data } = await axios.get(
					"http://localhost:3004/categories"
				);
				setAsyncCategory(data);
			} catch (error) {
				throw new Error(error.message);
			}
		})();
		(async function () {
			try {
				const { data } = await axios.get(
					"http://localhost:3004/products"
				);
				setProductsList(data);
			} catch (error) {
				throw new Error(error.message);
			}
		})();
	}, [])

	return (
		<>
			<Header productsList={productsList} />
			<main className="container mx-auto">
				<CategoryForm
					setCategory={setCategory}
					category={category}
					initialCatState={initialCatState}
					setAsyncCategory={setAsyncCategory}
				/>
				<ProductForm category={asyncCategory} product={product} setProduct={setProduct} initialProductState={initialProductState} setProductsList={setProductsList} />
				<ProductList productsList={productsList} setProductsList={setProductsList} />
			</main>
		</>
	);
}

export default App;
