import "./product.css";
import ProductsContainer from "./_components/productsCard";
import SideBar from "./_components/sideBar";
import SearchBar from "./_components/searchField";
export default function Product() {
  return (
    <div className="product-body">
      <aside className="aside">
        <SearchBar />
        <SideBar />
      </aside>
      <main className="main-product">
        <div className="products p-1.5">
          <ProductsContainer />
        </div>
      </main>
    </div>
  );
}
