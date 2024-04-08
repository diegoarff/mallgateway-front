import { useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, Searchbar, Tooltip, useTheme, Text } from "react-native-paper";

const Header = ({
  navigation,
  back,
  options,
  title,
  left,
  actions,
  withSearchbar,
  searchValue,
  searchbarPlaceholder,
  onSearchChange,
  style,
}) => {
  const theme = useTheme();
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    return () => {
      setSearchVisible(false);
    };
  }, []);

  return (
    <Appbar.Header style={style}>
      {!searchVisible &&
        (back ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <View style={{ marginHorizontal: 16 }}>{left}</View>
        ))}

      <Appbar.Content
        title={
          searchVisible ? (
            <Searchbar
              placeholder={searchbarPlaceholder}
              value={searchValue}
              onChangeText={onSearchChange}
              icon="arrow-left"
              style={{
                backgroundColor: theme.colors.background,
                marginLeft: -12,
              }}
              autoFocus
              placeholderTextColor={theme.colors.outline}
              onIconPress={() => setSearchVisible(false)}
            />
          ) : (
            <Text
              variant="titleLarge"
              numberOfLines={1}
              style={{
                paddingRight: 16,
              }}
            >
              {title || options.headerTitle}
            </Text>
          )
        }
      />

      {withSearchbar && !searchVisible && (
        <Tooltip title="Buscar">
          <Appbar.Action
            icon="magnify"
            onPress={() => setSearchVisible(true)}
          />
        </Tooltip>
      )}
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
