import PromoManageScreen from "../../../screens/PromoManageScreen";
import { useCreatePromo } from "../../../services/hooks/promos";

const StoreNewPromo = () => {
  const createPromo = useCreatePromo();

  return <PromoManageScreen mutation={createPromo} />;
};

export default StoreNewPromo;
