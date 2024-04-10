import Loader from "./Loader";
import ErrorScreen from "./ErrorScreen";
import ScreenWrapper from "./ScreenWrapper";
import { List } from "react-native-paper";
import ReviewItem from "./ReviewItem";
import { FlashList } from "@shopify/flash-list";

const ReviewList = ({ query }) => {
  const { data, status, error } = query();

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return (
    <ScreenWrapper>
      <FlashList
        data={data}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item._id}
        estimatedItemSize={50}
        ListHeaderComponent={
          <List.Subheader>{`${data.length} ${data.length > 1 ? "reseñas" : "reseña"}`}</List.Subheader>
        }
      />
    </ScreenWrapper>
  );
};

export default ReviewList;
