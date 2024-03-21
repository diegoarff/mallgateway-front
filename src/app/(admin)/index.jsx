import DashboardList from "../../components/DashboardList";
import MallHeader from "../../components/MallHeader";
import ScreenWrapper from "../../components/ScreenWrapper";

const Index = () => {
  const items = [
    {
      icon: "store-outline",
      title: "Tiendas",
      route: "stores",
    },
    {
      icon: "label-outline",
      title: "Categorías de tiendas",
      route: "categories",
    },
    {
      icon: "office-building-outline",
      title: "Centro comercial",
      route: "mall",
    },
  ];

  return (
    <ScreenWrapper>
      <MallHeader from="admin" />
      <DashboardList items={items} />
    </ScreenWrapper>
  );
};

export default Index;
