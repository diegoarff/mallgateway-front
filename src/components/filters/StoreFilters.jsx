import { useState } from "react";
import { Button, RadioButton, List, Checkbox } from "react-native-paper";
import DialogWithScroll from "../DialogWithScroll";
import { Dimensions } from "react-native";
import { useGetStoreCategories } from "../../services/hooks/stores";

const StoreFilters = ({ visible, onDismiss, setFilters }) => {
  const { data, isLoading, isError } = useGetStoreCategories();

  const [tempFilters, setTempFilters] = useState({
    categories: [],
    open: "all",
  });

  const handleFilterChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = () => {
    setFilters({
      ...tempFilters,
      categories: tempFilters.categories.join(","),
    });
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
      <List.Section title="Estado">
        <RadioButton.Group
          value={tempFilters.open}
          onValueChange={(value) => handleFilterChange("open", value)}
        >
          <RadioButton.Item label="Todas" value="all" />
          <RadioButton.Item label="Abiertas" value="true" />
        </RadioButton.Group>
      </List.Section>

      <List.Section title="Categorías">
        {isLoading ? (
          <List.Item title="Cargando categorías..." />
        ) : isError ? (
          <List.Item title="Error al cargar categorías" />
        ) : (
          data.map((category) => (
            <Checkbox.Item
              key={category._id}
              label={category.name}
              status={
                tempFilters.categories?.includes(category._id)
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => {
                if (tempFilters.categories?.includes(category._id)) {
                  handleFilterChange(
                    "categories",
                    tempFilters.categories?.filter((id) => id !== category._id)
                  );
                } else {
                  handleFilterChange("categories", [
                    ...tempFilters.categories,
                    category._id,
                  ]);
                }
              }}
            />
          ))
        )}
      </List.Section>
    </DialogWithScroll>
  );
};

export default StoreFilters;
