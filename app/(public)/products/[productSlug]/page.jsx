import ProductDetailsModule from "./components";

const ProductDetailsPage = ({ params }) => {
  const { productSlug } = params;

  return <ProductDetailsModule productSlug={productSlug} />;
};

export default ProductDetailsPage;
