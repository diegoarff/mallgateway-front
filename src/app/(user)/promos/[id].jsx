import { Text } from "react-native-paper";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";

const PromoDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScreenWrapper>
      <Text>PromoDetail {id}</Text>
    </ScreenWrapper>
  );
};

export default PromoDetail;
