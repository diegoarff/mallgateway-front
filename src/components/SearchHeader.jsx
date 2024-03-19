import { useTheme, Appbar, Searchbar } from "react-native-paper";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { useGlobalStore } from "../stores/global";

const SearchHeader = ({ onFilterButtonPress, placeholder }) => {
  const theme = useTheme();

  const isSearchVisible = useGlobalStore((state) => state.isSearchVisible);
  const setIsSearchVisible = useGlobalStore(
    (state) => state.setIsSearchVisible
  );
  const searchQuery = useGlobalStore((state) => state.searchQuery);
  const setSearchQuery = useGlobalStore((state) => state.setSearchQuery);

  useEffect(() => {
    return () => {
      setIsSearchVisible(false);
    };
  }, []);

  return (
    <Stack.Screen
      options={{
        header: ({ navigation, options }) => {
          return (
            <Appbar.Header>
              {!isSearchVisible && (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              )}
              <Appbar.Content
                title={
                  isSearchVisible ? (
                    <Searchbar
                      placeholder={placeholder}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      icon="arrow-left"
                      style={{
                        backgroundColor: theme.colors.background,
                        marginLeft: -12,
                      }}
                      autoCorrect={false}
                      autoComplete="off"
                      autoFocus
                      placeholderTextColor={theme.colors.outline}
                      onIconPress={() => setIsSearchVisible(false)}
                    />
                  ) : (
                    options.headerTitle
                  )
                }
              />
              {!isSearchVisible && (
                <Appbar.Action
                  icon="magnify"
                  onPress={() => setIsSearchVisible(true)}
                />
              )}
              <Appbar.Action
                icon="filter-variant"
                size={28}
                onPress={onFilterButtonPress}
              />
            </Appbar.Header>
          );
        },
      }}
    />
  );
};

export default SearchHeader;
