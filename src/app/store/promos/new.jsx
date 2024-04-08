import PromoManageScreen from "../../../screens/PromoManageScreen";
import { useCreateProduct } from "../../../services/hooks/products";

const StoreNewPromo = () => {
  const createPromo = useCreateProduct();

  return <PromoManageScreen mutation={createPromo} />;
};

export default StoreNewPromo;
