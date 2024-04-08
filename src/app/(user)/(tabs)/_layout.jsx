import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { useAuthStore } from "../../../stores/auth";
import { ROLES } from "../../../utils/constants";
import Header from "../../../components/Header";
import { View } from "react-native";

const UserTabLayout = () => {
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);

  const renderIcon = (props, name) => {
    return (
      <View
        style={
          props.focused
            ? {
                backgroundColor: theme.colors.elevation.level5,
                paddingHorizontal: 12,
                borderRadius: 50,
              }
            : null
        }
      >
        <MaterialCommunityIcons
          name={props.focused ? name : `${name}-outline`}
          color={props.color}
          size={24}
        />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.elevation.level2,
          height: 72,
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelPosition: "below-icon",
        tabBarItemStyle: {
          paddingVertical: 12,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        header: (props) => <Header {...props} />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: (props) => renderIcon(props, "home"),

          href: user?.role === ROLES.USER ? "home" : null,
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          headerTitle: "Explora",
          tabBarLabel: "Explora",
          tabBarIcon: (props) => renderIcon(props, "compass"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Perfil",
          tabBarLabel: "Perfil",
          tabBarIcon: (props) => renderIcon(props, "account"),
        }}
      />
    </Tabs>
  );
};

export default UserTabLayout;
