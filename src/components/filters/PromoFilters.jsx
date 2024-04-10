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

const PromoFilters = ({
  visible,
  onDismiss,
  setFilters,
  withActive = false,
}) => {
  const theme = useTheme();

  const [tempFilters, setTempFilters] = useState({});
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
      {withActive && (
        <List.Section title="Estado">
          <RadioButton.Group
            value={tempFilters.active}
            onValueChange={(value) => handleFilterChange("active", value)}
          >
            <RadioButton.Item label="Todas" value="all" />
            <RadioButton.Item label="Activas" value="true" />
            <RadioButton.Item label="No activas" value="false" />
          </RadioButton.Group>
        </List.Section>
      )}

      <List.Section title="Valor (%)" style={{ gap: 12 }}>
        <TextInput
          mode="outlined"
          label="Mínimo"
          value={tempFilters.minValue}
          onChangeText={(text) => handleFilterChange("minValue", text)}
          style={{ backgroundColor: theme.colors.elevation.level3 }}
        />
        <TextInput
          mode="outlined"
          label="Máximo"
          value={tempFilters.maxValue}
          onChangeText={(text) => handleFilterChange("maxValue", text)}
          style={{ backgroundColor: theme.colors.elevation.level3 }}
        />
      </List.Section>
    </DialogWithScroll>
  );
};

export default PromoFilters;
