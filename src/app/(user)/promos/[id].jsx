import { useLocalSearchParams, Stack } from "expo-router";
import PromoDetailScreen from "../../../screens/PromoDetailScreen";
import Header from "../../../components/Header";

const PromoDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <Header {...props} />,
        }}
      />
      <PromoDetailScreen id={id} />
    </>
  );
};

export default PromoDetail;
