import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Appbar,
  Button,
  SegmentedButtons,
  Switch,
  Chip,
} from "react-native-paper";
import { useRouter, Stack } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/Header";
import BottomAction from "../components/store/BottomAction";
import FormInput from "../components/FormInput";
import SectionHeader from "../components/store/SectionHeader";
import ChipList from "../components/ChipList";
import ImagePicker from "../components/store/ImagePicker";
import DialogWithScroll from "../components/DialogWithScroll";
import { useGlobalStore } from "../stores/global";
import { useGetProductCategories } from "../services/hooks/stores";
import Loader from "../components/Loader";
import useFirebaseImages from "../hooks/useFirebaseImages";

const entityValues = [
  { label: "Productos", value: "Product" },
  { label: "Categorías", value: "ProductCategory" },
];

const initialPromo = {
  name: "",
  description: "",
  value: 0,
  active: true,
  image: "",
  entity_type: "Product",
  entities: [],
};

// TODO: Handle products in promo
const PromoManageScreen = ({ editPromo, mutation }) => {
  const [promo, setPromo] = useState(() =>
    editPromo ? JSON.parse(JSON.stringify(editPromo)) : initialPromo
  );

  const [imageActive, setImageActive] = useState(!!promo.image);
  const [promoImg, setPromoImg] = useState(
    promo.image ?? "https://fakeimg.pl/600x338"
  );

  const [categoriesDialogVisible, setCategoriesDialogVisible] = useState(false);

  const initialState = useRef(JSON.parse(JSON.stringify(promo)));

  const { control, handleSubmit, reset, watch } = useForm();
  const formValues = watch();
  const initialFormValues = useRef();

  const router = useRouter();

  const {
    uploadImages,
    deleteImages,
    loading: isImageLoading,
  } = useFirebaseImages();

  useEffect(() => {
    if (editPromo) {
      const initialValues = {
        name: editPromo.name,
        description: editPromo.description,
        value: editPromo.value.toString(),
      };
      reset(initialValues);
      initialFormValues.current = initialValues;
    }
  }, []);

  const isPromoEqual = useMemo(() => {
    return (
      JSON.stringify(promo) === JSON.stringify(initialState.current) &&
      JSON.stringify(formValues) === JSON.stringify(initialFormValues.current)
    );
  }, [promo, initialState.current, formValues, initialFormValues.current]);

  const handleMutation = async (data) => {
    const urls = await uploadImages(promoImg);
    if (promo.image) await deleteImages(promo.image);

    mutation.mutate({
      ...data,
      value: parseInt(promo.value, 10),
      active: promo.active,
      entity_type: promo.entity_type,
      entities: promo.entities.map((entity) => entity._id),
      image: urls[0],
    });
    router.back();
  };

  const resetValues = () => {
    reset(initialFormValues.current);
    setPromo(JSON.parse(JSON.stringify(initialState.current)));
    setPromoImg(promo.image ?? "https://fakeimg.pl/600x338");
    setImageActive(!!promo.image);
  };

  const handleEntityTypeChange = (value) => {
    setPromo((prevPromo) => ({
      ...prevPromo,
      entity_type: value,
      entities: [],
    }));
  };

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="restore"
          disabled={mutation.isPending || isImageLoading || isPromoEqual}
          onPress={resetValues}
        />
      ),
      tooltip: "Deshacer cambios",
    },
    {
      component: (
        <Appbar.Action
          icon="content-save-outline"
          disabled={mutation.isPending || isImageLoading || isPromoEqual}
          onPress={handleSubmit(handleMutation)}
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
        withBottomAction
        contentContainerStyle={{
          gap: 12,
        }}
      >
        <View style={styles.container}>
          <Text variant="titleMedium">Información básica</Text>
          <View>
            {/* Name */}
            <FormInput
              mode="outlined"
              name="name"
              label="Nombre"
              control={control}
              rules={{ required: "El nombre es requerido" }}
            />

            {/* Description */}
            <FormInput
              mode="outlined"
              name="description"
              label="Descripción"
              multiline
              control={control}
              rules={{ required: "La descripción es requerida" }}
              style={{ height: 100 }}
            />

            {/* Value */}
            <FormInput
              mode="outlined"
              name="value"
              label="Valor (%)"
              keyboardType="numeric"
              control={control}
              rules={{ required: "El valor es requerido" }}
            />
          </View>
        </View>

        {/* Stock */}
        <View style={styles.container}>
          <Text variant="titleMedium">Aplica sobre</Text>
          <SegmentedButtons
            buttons={entityValues}
            value={promo.entity_type}
            onValueChange={handleEntityTypeChange}
          />
        </View>

        {/* Entities */}
        <View style={styles.container}>
          {promo.entity_type === "Product" ? (
            <SectionHeader
              title="Productos afectados"
              icon="tune-variant"
              onIconPress={() => {}}
            />
          ) : (
            <>
              <SectionHeader
                title="Categorías afectadas"
                icon="tune-variant"
                onIconPress={() => setCategoriesDialogVisible(true)}
              />

              {promo.entities.length > 0 ? (
                <ChipList items={promo.entities} titleKey="name" icon="tag" />
              ) : (
                <Text variant="bodyMedium" style={styles.centerText}>
                  No hay categorías seleccionadas
                </Text>
              )}
            </>
          )}

          {/* Image */}
          <View style={styles.container}>
            <View style={styles.switchContainer}>
              <Text variant="titleMedium">Imagen</Text>
              <Switch
                value={imageActive}
                onValueChange={() => setImageActive((prev) => !prev)}
              />
            </View>

            {imageActive && (
              <View style={{ height: 250 }}>
                <ImagePicker
                  image={promoImg}
                  setImage={setPromoImg}
                  aspect={[16, 9]}
                  buttonLabel="Editar imagen"
                />
              </View>
            )}
          </View>
        </View>
      </ScreenWrapper>

      <BottomAction>
        <Button
          mode="contained"
          onPress={handleSubmit(handleMutation)}
          loading={mutation.isPending || isImageLoading}
          disabled={mutation.isPending || isImageLoading || isPromoEqual}
        >
          {editPromo ? "Guardar cambios" : "Añadir promoción"}
        </Button>
      </BottomAction>

      {/* Categories dialog */}
      <CategoriesDialog
        visible={categoriesDialogVisible}
        setVisible={setCategoriesDialogVisible}
        promo={promo}
        setPromo={setPromo}
      />
    </>
  );
};

export default PromoManageScreen;

const CategoriesDialog = ({ visible, setVisible, promo, setPromo }) => {
  const store = useGlobalStore((state) => state.store);
  const { data, isPending, isError } = useGetProductCategories(store.id);

  const comparison = (category) =>
    promo.entities.some((entity) => entity._id === category._id);

  const handleSelectCategory = (category) => {
    if (comparison(category)) {
      setPromo((prevPromo) => ({
        ...prevPromo,
        entities: prevPromo.entities.filter(
          (entity) => entity._id !== category._id
        ),
      }));
    } else {
      setPromo((prevPromo) => ({
        ...prevPromo,
        entities: [...prevPromo.entities, category],
      }));
    }
  };

  return (
    <DialogWithScroll
      visible={visible}
      setVisible={setVisible}
      title="Categorías"
      actions={<Button onPress={() => setVisible(false)}>Aceptar</Button>}
    >
      {isError ? (
        <Text>Error al obtener las categorías</Text>
      ) : isPending ? (
        <Loader />
      ) : (
        <View style={styles.categoriesContainer}>
          {data.map((item) => (
            <Chip
              key={item._id}
              onPress={() => handleSelectCategory(item)}
              selected={comparison(item)}
              showSelectedOverlay
            >
              {item.name}
            </Chip>
          ))}
        </View>
      )}
    </DialogWithScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  centerText: {
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoriesContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
