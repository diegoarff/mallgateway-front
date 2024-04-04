import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";

const StorePromoDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>StorePromoDetail {id}</Text>
    </View>
  );
};

export default StorePromoDetail;
