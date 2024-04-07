import { useLocalSearchParams } from "expo-router";
import {
  useGetProduct,
  useUpdateProduct,
} from "../../../../services/hooks/products";
import Loader from "../../../../components/Loader";
import ErrorScreen from "../../../../components/ErrorScreen";
import ProductManageScreen from "../../../../screens/ProductManageScreen";

const StoreEditProduct = () => {
  const { id } = useLocalSearchParams();
  const { data: product, status, error } = useGetProduct(id);
  const updateProduct = useUpdateProduct(id);

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return <ProductManageScreen editProduct={product} mutation={updateProduct} />;
};

export default StoreEditProduct;
