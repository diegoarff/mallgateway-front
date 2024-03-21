import { Surface } from "react-native-paper";

const CustomSurface = ({ children, style, ...props }) => {
  return (
    <Surface
      style={[{ paddingHorizontal: 4, borderRadius: 12 }, style]}
      mode="flat"
      elevation={5}
      {...props}
    >
      {children}
    </Surface>
  );
};

export default CustomSurface;
