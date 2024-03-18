import { Appbar } from 'react-native-paper';

const Header = ({ navigation, back, options, actions }) => {
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={options.headerTitle} />
      {actions &&
        actions.map((action, index) => (
          <Appbar.Action key={index} {...action} />
        ))}
    </Appbar.Header>
  );
};

export default Header;
