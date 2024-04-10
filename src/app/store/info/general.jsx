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
import BottomAction from "../../../components/store/BottomAction";
import useFirebaseImages from "../../../hooks/useFirebaseImages";
import ChipList from "../../../components/ChipList";

const General = () => {
  const store = useGlobalStore((state) => state.store);
  const { mutate: updateStore, isPending } = useUpdateStore();

  const [logoImg, setLogoImg] = useState(store.logo);
  const [categories, setCategories] = useState([...store.categories]);
  const [categoriesDialogVisible, setCategoriesDialogVisible] = useState(false);

  const {
    loading: isImageLoading,
    uploadImages,
    deleteImages,
  } = useFirebaseImages();

  const { control, handleSubmit, reset, watch } = useForm();

  const handleUpdateStore = async (data) => {
    const urls = await uploadImages(logoImg);
    await deleteImages(store.logo);
    updateStore({
      ...data,
      categories: categories.map((cat) => cat._id),
      logo: urls[0],
    });
  };

  const formValues = watch();
  const initialFormValues = useRef();

  const isFormEqual = useMemo(() => {
    return (
      JSON.stringify(formValues) ===
        JSON.stringify(initialFormValues.current) &&
      JSON.stringify(categories) === JSON.stringify(store.categories) &&
      logoImg === store.logo
    );
  }, [formValues, categories, store, logoImg]);

  const resetForm = () => {
    if (store) {
      const initialValues = {
        name: store.name,
        description: store.description,
      };
      reset(initialValues);
      initialFormValues.current = initialValues;

      setCategories([...store.categories]);
      setLogoImg(store.logo);
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
          disabled={isFormEqual || isPending || isImageLoading}
          onPress={resetForm}
        />
      ),
      tooltip: "Deshacer cambios",
    },
    {
      component: (
        <Appbar.Action
          icon="content-save-outline"
          disabled={isFormEqual || isPending || isImageLoading}
          onPress={handleSubmit(handleUpdateStore)}
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
        withBottomAction
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
            icon="tune-variant"
            onIconPress={() => setCategoriesDialogVisible(true)}
          />
          {categories.length > 0 ? (
            <ChipList items={categories} icon="tag" titleKey="name" centered />
          ) : (
            <Text style={{ textAlign: "center" }}>
              No hay categorías seleccionadas
            </Text>
          )}
        </View>

        <View>
          <SectionHeader title="Nombre y descripción" />
          <FormInput
            mode="outlined"
            name="name"
            label="Nombre de la tienda"
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
            control={control}
            rules={{
              required: "Descripción de la tienda es requerida",
            }}
            style={{ height: 140 }}
          />
        </View>

        <CategoriesDialog
          visible={categoriesDialogVisible}
          setVisible={setCategoriesDialogVisible}
          categories={categories}
          setCategories={setCategories}
        />
      </ScreenWrapper>

      <BottomAction>
        <Button
          mode="contained"
          onPress={handleSubmit(handleUpdateStore)}
          loading={isPending || isImageLoading}
          disabled={isFormEqual || isPending || isImageLoading}
        >
          Actualizar
        </Button>
      </BottomAction>
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
});
