import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import {
  Text,
  Appbar,
  Button,
  SegmentedButtons,
  Switch,
  Chip,
  Searchbar,
  Checkbox,
  useTheme,
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
import { useGetProducts } from "../services/hooks/products";
import { useDebounce } from "../hooks/useDebounce";

const entityValues = [
  { label: "Productos", value: "Product" },
  { label: "Categorías", value: "ProductCategory" },
];

const initialPromo = {
  name: "",
  description: "",
  value: 0,
  active: true,
  image: null,
  entity_type: "Product",
  entities: [],
};

const PromoManageScreen = ({ editPromo, mutation }) => {
  const [promo, setPromo] = useState(() =>
    editPromo ? JSON.parse(JSON.stringify(editPromo)) : initialPromo
  );

  const [imageActive, setImageActive] = useState(!!promo.image);
  const [promoImg, setPromoImg] = useState(
    promo.image || "https://fakeimg.pl/600x338"
  );

  const [categoriesDialogVisible, setCategoriesDialogVisible] = useState(false);
  const [productsDialogVisible, setProductsDialogVisible] = useState(false);

  const initialState = useRef(JSON.parse(JSON.stringify(promo)));

  const { control, handleSubmit, reset, watch } = useForm();
  const formValues = watch();
  const initialFormValues = useRef(formValues);

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

  const noEntities = promo.entities.length === 0;

  const isPromoEqual = useMemo(() => {
    return (
      JSON.stringify(promo) === JSON.stringify(initialState.current) &&
      JSON.stringify(formValues) === JSON.stringify(initialFormValues.current)
    );
  }, [promo, initialState.current, formValues, initialFormValues.current]);

  const handleMutation = async (data) => {
    let urls = null;

    if (imageActive) urls = await uploadImages(promoImg);
    if (promo.image) await deleteImages(promo.image);

    mutation.mutate({
      ...data,
      value: parseInt(data.value, 10),
      active: promo.active,
      entity_type: promo.entity_type,
      entities: promo.entities.map((entity) => entity._id),
      image: urls ? urls[0] : "",
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
          disabled={
            mutation.isPending || isImageLoading || isPromoEqual || noEntities
          }
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

        {/* Entities */}
        <View style={styles.container}>
          {promo.entity_type === "Product" ? (
            <>
              <SectionHeader
                title="Productos afectados"
                icon="tune-variant"
                onIconPress={() => setProductsDialogVisible(true)}
              />

              {promo.entities.length > 0 ? (
                <View>
                  {promo.entities.map((product) => (
                    <RenderProduct key={product.name} product={product} />
                  ))}
                </View>
              ) : (
                <Text variant="bodyMedium" style={styles.centerText}>
                  No hay productos seleccionados
                </Text>
              )}
            </>
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
        </View>
      </ScreenWrapper>

      <BottomAction>
        <Button
          mode="contained"
          onPress={handleSubmit(handleMutation)}
          loading={mutation.isPending || isImageLoading}
          disabled={
            mutation.isPending || isImageLoading || isPromoEqual || noEntities
          }
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

      {/* Products dialog */}
      <ProductsDialog
        visible={productsDialogVisible}
        setVisible={setProductsDialogVisible}
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
      onDismiss={setVisible}
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

const ProductsDialog = ({ visible, setVisible, promo, setPromo }) => {
  const store = useGlobalStore((state) => state.store);
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProducts({ store: store.id, search: debouncedSearch });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const products = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  const onCheckboxChange = (product) => {
    if (comparison(product)) {
      setPromo((prevPromo) => ({
        ...prevPromo,
        entities: prevPromo.entities.filter(
          (entity) => entity._id !== product._id
        ),
      }));
    } else {
      setPromo((prevPromo) => ({
        ...prevPromo,
        entities: [...prevPromo.entities, product],
      }));
    }
  };

  const comparison = (product) => {
    return promo.entities.some((entity) => entity._id === product._id);
  };

  return (
    <DialogWithScroll
      visible={visible}
      onDismiss={setVisible}
      title="Productos"
      withScrollview={false}
      actions={<Button onPress={() => setVisible(false)}>Aceptar</Button>}
      maxHeight={Dimensions.get("window").height * 0.6}
    >
      <Searchbar
        placeholder="Buscar productos..."
        value={searchText}
        onChangeText={setSearchText}
      />
      {isPending && (
        <View style={{ height: 260 }}>
          <Loader
            containerStyle={{
              backgroundColor: theme.colors.elevation.level3,
            }}
          />
        </View>
      )}
      {isError && (
        <Text variant="bodyMedium" style={styles.textCenter}>
          {error.message}
        </Text>
      )}
      {data && (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <RenderProduct
              product={item}
              withCheckbox
              checkboxStatus={comparison(item) ? "checked" : "unchecked"}
              onCheckboxPress={() => onCheckboxChange(item)}
            />
          )}
          keyExtractor={(item) => item.name}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <Loader
                containerStyle={{
                  backgroundColor: theme.colors.elevation.level3,
                }}
              />
            ) : null
          }
          style={{ height: 260 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text variant="bodyMedium" style={styles.textCenter}>
              No hay productos
            </Text>
          }
        />
      )}
    </DialogWithScroll>
  );
};

const RenderProduct = ({
  product,
  withCheckbox,
  onCheckboxPress,
  checkboxStatus,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.renderProductContainer}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.renderProductImage}
      />
      <View style={{ flex: 1 }}>
        <Text variant="bodyLarge" numberOfLines={1}>
          {product.name}
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          ${product.price}
        </Text>
      </View>
      {withCheckbox && (
        <Checkbox status={checkboxStatus} onPress={onCheckboxPress} />
      )}
    </View>
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
  textCenter: {
    textAlign: "center",
  },
  renderProductContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 8,
  },
  renderProductImage: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 12,
  },
});
