import ErrorScreen from "../../../../components/ErrorScreen";
import Loader from "../../../../components/Loader";
import PromoManageScreen from "../../../../screens/PromoManageScreen";
import { useGetPromo, useUpdatePromo } from "../../../../services/hooks/promos";
import { useLocalSearchParams } from "expo-router";

const StoreEditPromo = () => {
  const { id } = useLocalSearchParams();
  const { data: promo, status, error } = useGetPromo(id);
  const updatePromo = useUpdatePromo(id);

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return <PromoManageScreen editPromo={promo} mutation={updatePromo} />;
};

export default StoreEditPromo;
