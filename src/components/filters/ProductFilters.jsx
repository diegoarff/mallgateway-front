import { useState } from "react";
import {
  Button,
  RadioButton,
  List,
  TextInput,
  useTheme,
} from "react-native-paper";
import DialogWithScroll from "../DialogWithScroll";
import { Dimensions } from "react-native";

const ProductFilters = ({ visible, onDismiss, setFilters }) => {
  const theme = useTheme();

  const [tempFilters, setTempFilters] = useState({
    promo: "all",
    availability: "all",
  });
  const handleFilterChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = () => {
    setFilters(tempFilters);
    onDismiss();
  };

  return (
    <DialogWithScroll
      visible={visible}
      onDismiss={onDismiss}
      title="Filtros"
      maxHeight={Dimensions.get("window").height * 0.6}
      actions={
        <>
          <Button onPress={onDismiss}>Cerrar</Button>
          <Button onPress={handleConfirm}>Aplicar</Button>
        </>
      }
    >
      <List.Section title="Promoción">
        <RadioButton.Group
          value={tempFilters.promo}
          onValueChange={(value) => handleFilterChange("promo", value)}
        >
          <RadioButton.Item label="Todos" value="all" />
          <RadioButton.Item label="Con promoción" value="true" />
          <RadioButton.Item label="Sin promoción" value="false" />
        </RadioButton.Group>
      </List.Section>

      <List.Section title="Disponibilidad">
        <RadioButton.Group
          value={tempFilters.availability}
          onValueChange={(value) => handleFilterChange("availability", value)}
        >
          <RadioButton.Item label="Todos" value="all" />
          <RadioButton.Item label="Disponible" value="available" />
          <RadioButton.Item label="Bajo stock" value="lowstock" />
          <RadioButton.Item label="No disponible" value="unavailable" />
        </RadioButton.Group>
      </List.Section>

      <List.Section title="Precio" style={{ gap: 12 }}>
        <TextInput
          mode="outlined"
          label="Mínimo"
          value={tempFilters.minPrice}
          onChangeText={(text) => handleFilterChange("minPrice", text)}
          inputMode="numeric"
          style={{ backgroundColor: theme.colors.elevation.level3 }}
        />
        <TextInput
          mode="outlined"
          label="Máximo"
          value={tempFilters.maxPrice}
          onChangeText={(text) => handleFilterChange("maxPrice", text)}
          inputMode="numeric"
          style={{ backgroundColor: theme.colors.elevation.level3 }}
        />
      </List.Section>
    </DialogWithScroll>
  );
};

export default ProductFilters;
