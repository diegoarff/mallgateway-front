import { Appbar, Tooltip } from "react-native-paper";

const Header = ({ navigation, back, options, title, left, actions, style }) => {
  return (
    <Appbar.Header style={style}>
      {!back && left}
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={title || options.headerTitle} />
      {actions &&
        actions.map((action, i) => (
          <Tooltip key={i} title={action.tooltip}>
            {action.component}
          </Tooltip>
        ))}
    </Appbar.Header>
  );
};

export default Header;
