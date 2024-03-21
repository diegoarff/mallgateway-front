import DashboardList from "../../components/DashboardList";
import MallHeader from "../../components/MallHeader";
import ScreenWrapper from "../../components/ScreenWrapper";

const Index = () => {
  const items = [
    {
      icon: "store-outline",
      title: "Tienda",
      route: "store",
    },
    {
      icon: "shopping-outline",
      title: "Productos",
      route: "products",
    },
    {
      icon: "label-percent-outline",
      title: "Promociones",
      route: "promos",
    },
    {
      icon: "note-text-outline",
      title: "Reseñas",
      route: "reviews",
    },
  ];

  return (
    <ScreenWrapper>
      <MallHeader from="store" />
      <DashboardList items={items} />
    </ScreenWrapper>
  );
};

export default Index;
