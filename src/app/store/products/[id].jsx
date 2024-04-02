import { Text } from "react-native-paper";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";

const StoreProductDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScreenWrapper withInsets={false}>
      <Text>Product: {id}</Text>
    </ScreenWrapper>
  );
};

export default StoreProductDetail;
