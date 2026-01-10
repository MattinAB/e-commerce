import "./product.css";
import ProductsContainer from "./productsCard";
import SideBar from "./sideBar";
import SearchBar from "./searchField";
export default function ProductPage() {
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
