import { Appbar, Tooltip } from 'react-native-paper';

const Header = ({ navigation, back, options, actions }) => {
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={options.headerTitle} />
      {actions &&
        actions.map((action, index) => (
          <Tooltip key={index} title={action.tooltip}>
            <Appbar.Action {...action} />
          </Tooltip>
        ))}
    </Appbar.Header>
  );
};

export default Header;
