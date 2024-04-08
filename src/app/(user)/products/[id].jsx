import { useLocalSearchParams, Stack } from "expo-router";
import Header from "../../../components/Header";
import ProductDetailScreen from "../../../screens/ProductDetailScreen";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <Header {...props} />,
        }}
      />
      <ProductDetailScreen id={id} />
    </>
  );
};

export default ProductDetail;
