import { useGetStore } from "../../../services/hooks/stores";
import Loader from "../../../components/Loader";
import ErrorScreen from "../../../components/ErrorScreen";
import StoreInfoScreen from "../../../screens/StoreInfoScreen";
import { useLocalSearchParams } from "expo-router";

const StoreInfo = () => {
  const { id } = useLocalSearchParams();
  const { data, status, error } = useGetStore(id);

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return <StoreInfoScreen store={data} />;
};

export default StoreInfo;
