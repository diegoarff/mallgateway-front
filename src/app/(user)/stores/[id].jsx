import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Loader from "../../../components/Loader";
import ErrorScreen from "../../../components/ErrorScreen";
import { Text } from "react-native-paper";
import { useGetStore } from "../../../services/hooks/stores";

const StoreDetail = () => {
  const { id } = useLocalSearchParams();
  const { data, status, error } = useGetStore(id);

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return (
    <ScreenWrapper withInsets={false}>
      <Text>StoreDetail {JSON.stringify(data)}</Text>
    </ScreenWrapper>
  );
};

export default StoreDetail;
