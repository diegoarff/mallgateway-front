import ProductManageScreen from "../../../screens/ProductManageScreen";
import { useCreateProduct } from "../../../services/hooks/products";

const StoreNewProduct = () => {
  const createProduct = useCreateProduct();

  return <ProductManageScreen mutation={createProduct} />;
};

export default StoreNewProduct;
