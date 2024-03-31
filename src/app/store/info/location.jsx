import { View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import ImagePicker from "../../../components/store/ImagePicker";
import { useState } from "react";
import { useGlobalStore } from "../../../stores/global";

const Location = () => {
  const store = useGlobalStore((state) => state.store);
  const [facadeImg, setFacadeImg] = useState(store.facade);
  return (
    <ScreenWrapper withInsets={false}>
      <View style={{ height: 250 }}>
        <ImagePicker
          image={facadeImg}
          setImage={setFacadeImg}
          aspect={[16, 9]}
          buttonLabel="Editar fachada"
        />
      </View>
    </ScreenWrapper>
  );
};

export default Location;
