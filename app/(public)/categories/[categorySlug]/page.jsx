import CategoryProductsModule from "./components";

const CategoryProductsPage = ({ params }) => {
  const { categorySlug } = params;
  return <CategoryProductsModule categorySlug={categorySlug} />;
};

export default CategoryProductsPage;
