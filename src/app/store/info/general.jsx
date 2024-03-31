import { Stack } from "expo-router";
import { Appbar, Button, Chip, Text } from "react-native-paper";
import Header from "../../../components/Header";
import { useGlobalStore } from "../../../stores/global";
import {
  useGetStoreCategories,
  useUpdateStore,
} from "../../../services/hooks/stores";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import ImagePicker from "../../../components/store/ImagePicker";
import SectionHeader from "../../../components/store/SectionHeader";
import DialogWithScroll from "../../../components/DialogWithScroll";
import Loader from "../../../components/Loader";

const General = () => {
  const store = useGlobalStore((state) => state.store);
  const { mutate: updateStore, isPending } = useUpdateStore();

  // TODO: handle image upload
  const [logoImg, setLogoImg] = useState(store.logo);
  const [categories, setCategories] = useState([...store.categories]);
  const [categoriesDialogVisible, setCategoriesDialogVisible] = useState(false);

  const { control, handleSubmit, reset, watch } = useForm();

  const handleUpdateStore = (data) => {
    updateStore({ ...data, categories: categories.map((cat) => cat._id) });
  };

  const formValues = watch();
  const initialFormValues = useRef();

  const isFormEqual = useMemo(() => {
    return (
      JSON.stringify(formValues) ===
        JSON.stringify(initialFormValues.current) &&
      JSON.stringify(categories) === JSON.stringify(store.categories)
    );
  }, [formValues, categories, store]);

  const resetForm = () => {
    if (store) {
      const initialValues = {
        name: store.name,
        description: store.description,
      };
      reset(initialValues);
      initialFormValues.current = initialValues;

      setCategories([...store.categories]);
    }
  };

  useEffect(() => {
    resetForm();
  }, [store]);

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="restore"
          disabled={isFormEqual || isPending}
          onPress={resetForm}
          tooltip="Deshacer cambios"
        />
      ),
      tooltip: "Deshacer cambios",
    },
    {
      component: (
        <Appbar.Action
          icon="content-save-outline"
          disabled={isFormEqual || isPending}
          onPress={handleSubmit(handleUpdateStore)}
          tooltip="Guardar cambios"
        />
      ),
      tooltip: "Guardar cambios",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <Header {...props} actions={headerActions} />,
        }}
      />

      <ScreenWrapper
        withInsets={false}
        contentContainerStyle={{
          gap: 18,
        }}
      >
        {/* Logo */}
        <View>
          <SectionHeader title="Logo de la tienda" />
          <View style={{ height: 200 }}>
            <ImagePicker
              image={logoImg}
              setImage={setLogoImg}
              aspect={[1, 1]}
              buttonLabel="Editar logo"
            />
          </View>
        </View>

        <View>
          <SectionHeader
            title="Categorías"
            icon="filter-variant"
            onIconPress={() => setCategoriesDialogVisible(true)}
          />
          <View style={styles.categoriesContainer}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <Chip key={category._id} icon="tag">
                  {category.name}
                </Chip>
              ))
            ) : (
              <Text>No hay categorías seleccionadas</Text>
            )}
          </View>
        </View>

        <View>
          <SectionHeader title="Nombre y descripción" />
          <FormInput
            mode="outlined"
            name="name"
            label="Nombre de la tienda"
            placeholder="Nombre de la tienda"
            control={control}
            rules={{
              required: "Nombre de la tienda es requerido",
            }}
          />
          <FormInput
            mode="outlined"
            name="description"
            label="Descripción de la tienda"
            multiline
            placeholder="Descripción de la tienda"
            control={control}
            rules={{
              required: "Descripción de la tienda es requerida",
            }}
            style={{ height: 140 }}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit(handleUpdateStore)}
          loading={isPending}
          disabled={isPending || isFormEqual}
        >
          Actualizar
        </Button>
      </ScreenWrapper>

      <CategoriesDialog
        visible={categoriesDialogVisible}
        setVisible={setCategoriesDialogVisible}
        categories={categories}
        setCategories={setCategories}
      />
    </>
  );
};

export default General;

const CategoriesDialog = ({
  visible,
  setVisible,
  categories,
  setCategories,
}) => {
  const { data, isPending, isError } = useGetStoreCategories();

  const handleSelectCategory = (category) => {
    if (categories.some((cat) => cat._id === category._id)) {
      setCategories((prev) => prev.filter((cat) => cat._id !== category._id));
    } else {
      setCategories((prev) => [...prev, category]);
    }
  };

  return (
    <DialogWithScroll
      visible={visible}
      onDismiss={() => setVisible(false)}
      title="Categorías"
      actions={<Button onPress={() => setVisible(false)}>Aceptar</Button>}
    >
      {isError ? (
        <Text>Error al cargar las categorías</Text>
      ) : isPending ? (
        <Loader />
      ) : (
        <View style={styles.categoriesContainer}>
          {data.map((category) => (
            <Chip
              key={category._id}
              onPress={() => {
                handleSelectCategory(category);
              }}
              selected={categories.some((cat) => cat._id === category._id)}
              showSelectedOverlay
            >
              {category.name}
            </Chip>
          ))}
        </View>
      )}
    </DialogWithScroll>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dialogScrollArea: {
    paddingVertical: 16,
  },
});
