import { Surface } from "react-native-paper";

const CustomSurface = ({ children, style, ...props }) => {
  return (
    <Surface
      style={[{ borderRadius: 12 }, style]}
      mode="flat"
      elevation={2}
      {...props}
    >
      {children}
    </Surface>
  );
};

export default CustomSurface;
