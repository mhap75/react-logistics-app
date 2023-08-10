const Header = ({productsList}) => {
	return (
		<header className="flex items-center justify-center h-12 mb-6 gap-x-4 bg-neutral">
			<h1 className="text-sm font-bold md:text-xl">Current inventory</h1>
			<span className="flex items-center justify-center w-8 h-8 font-bold border-2 rounded-full bg-info border-base-content text-base-content">
				{productsList.length}
			</span>
		</header>
	);
};

export default Header;
