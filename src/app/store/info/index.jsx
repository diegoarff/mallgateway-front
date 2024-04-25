import { useGlobalStore } from "../../../stores/global";

import StoreInfoScreen from "../../../screens/StoreInfoScreen";

const Index = () => {
  const store = useGlobalStore((state) => state.store);

  return <StoreInfoScreen store={store} />;
};

export default Index;
