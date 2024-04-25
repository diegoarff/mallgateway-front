import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import ReviewList from "../../components/ReviewList";
import {
  useGetStoreFeedback,
  useGetStoreProductsFeedback,
} from "../../services/hooks/stores";

const Reviews = () => {
  const storeReviewsQuery = useGetStoreFeedback;
  const productsReviewsQuery = useGetStoreProductsFeedback;

  return (
    <TabsProvider defaultIndex={0}>
      <Tabs>
        <TabScreen label="Tienda">
          <ReviewList query={storeReviewsQuery} />
        </TabScreen>
        <TabScreen label="Productos">
          <ReviewList query={productsReviewsQuery} />
        </TabScreen>
      </Tabs>
    </TabsProvider>
  );
};

export default Reviews;
