import {
  Text,
  Button,
  SegmentedButtons,
  Chip,
  IconButton,
  TextInput,
  Appbar,
} from "react-native-paper";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import ScreenWrapper from "../components/ScreenWrapper";
import FormInput from "../components/FormInput";
import BottomAction from "../components/store/BottomAction";
import { useGlobalStore } from "../stores/global";
import {
  useGetProductCategories,
  useGetProductVariants,
} from "../services/hooks/stores";
import Loader from "../components/Loader";
import DialogWithScroll from "../components/DialogWithScroll";
import SectionHeader from "../components/store/SectionHeader";
import useImagePicker from "../hooks/useImagePicker";
import useFirebaseImages from "../hooks/useFirebaseImages";
import { useRouter, Stack } from "expo-router";
import Header from "../components/Header";

const stockValues = [
  { value: "available", label: "Disponible" },
  { value: "lowstock", label: "Bajo stock" },
  { value: "unavailable", label: "No disponible" },
];

const initialProduct = {
  name: "",
  description: "",
  price: "",
  availability: "",
  categories: [],
  images: [],
  variants: [],
};

const MAX_IMAGES = 10;

const getUriFromImages = (images) => images.map((image) => image.uri);

const ProductManageScreen = ({ editProduct, mutation }) => {
  const [product, setProduct] = useState(() =>
    editProduct ? JSON.parse(JSON.stringify(editProduct)) : initialProduct
  );
  const [categoriesDialogVisible, setCategoriesDialogVisible] = useState(false);
  const [variantsDialogVisible, setVariantsDialogVisible] = useState(false);

  const initialState = useRef(JSON.parse(JSON.stringify(product)));
  const imagesToDelete = useRef([]);

  const { control, handleSubmit, reset, watch } = useForm();
  const router = useRouter();

  const { images, pickImage } = useImagePicker({
    aspect: [1, 1],
    allowsEditing: true,
  });

  const {
    uploadImages,
    deleteImages,
    loading: areImagesLoading,
  } = useFirebaseImages();

  useEffect(() => {
    if (editProduct) {
      reset({
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price.toString(),
      });
    }
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...getUriFromImages(images)],
      }));
    }
  }, [images]);

  const handleMutation = async (data) => {
    const urls = await uploadImages(product.images);
    mutation.mutate({
      ...data,
      price: parseFloat(data.price),
      images: urls,
      availability: product.availability,
      categories: product.categories.map((cat) => cat._id),
      variants: product.variants.map((v) => ({
        variant: v.variant._id,
        values: v.values,
      })),
    });
    await deleteImages(imagesToDelete.current);
    router.back();
  };

  const watchAllFields = watch();

  const basicInfoEqual = useMemo(() => {
    return (
      watchAllFields.name === product.name &&
      watchAllFields.description === product.description &&
      watchAllFields.price === product.price.toString()
    );
  }, [watchAllFields, product]);

  const isProductInvalid = useMemo(() => {
    return (
      JSON.stringify(product) === JSON.stringify(initialState.current) ||
      Object.values(watchAllFields).some((value) => value === "")
    );
  }, [product, initialState.current, watchAllFields]);

  const resetValues = () => {
    setProduct(JSON.parse(JSON.stringify(initialState.current)));
    reset({
      name: initialState.current.name,
      description: initialState.current.description,
      price: initialState.current.price.toString(),
    });
  };

  const handleStockChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      availability: value,
    }));
  };

  const handleImageDelete = (image) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((img) => img !== image),
    }));
    imagesToDelete.current.push(image);
  };

  const handleVariantSelect = (variant) => {
    if (product.variants.some((v) => v.variant._id === variant._id)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        variants: prevProduct.variants.filter(
          (v) => v.variant._id !== variant._id
        ),
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        variants: [...prevProduct.variants, { variant, values: [] }],
      }));
    }
    setVariantsDialogVisible(false);
  };

  const handleVariantAdd = (variant, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: prevProduct.variants.map((v) =>
        v.variant._id === variant._id
          ? { ...v, values: [...v.values, value] }
          : v
      ),
    }));
  };

  const handleVariantRemove = (variant, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: prevProduct.variants.map((v) =>
        v.variant._id === variant._id
          ? { ...v, values: v.values.filter((val) => val !== value) }
          : v
      ),
    }));
  };

  const handleCategorySelect = (category) => {
    if (product.categories.some((cat) => cat._id === category._id)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        categories: prevProduct.categories.filter(
          (cat) => cat._id !== category._id
        ),
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        categories: [...prevProduct.categories, category],
      }));
    }
  };

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="restore"
          disabled={isProductInvalid || mutation.isPending || areImagesLoading}
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
            (isProductInvalid || mutation.isPending || areImagesLoading) &&
            basicInfoEqual
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

      <ScreenWrapper withInsets={false} withBottomAction>
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

            {/* Price */}
            <FormInput
              mode="outlined"
              name="price"
              label="Precio"
              keyboardType="numeric"
              control={control}
              rules={{ required: "El precio es requerido" }}
            />
          </View>
        </View>

        {/* Stock */}
        <View style={styles.container}>
          <Text variant="titleMedium">Disponibilidad</Text>
          <SegmentedButtons
            buttons={stockValues}
            value={product.availability}
            onValueChange={handleStockChange}
          />
        </View>

        {/* Variants */}
        <View style={styles.container}>
          <SectionHeader
            title="Variantes"
            icon="tune-variant"
            onIconPress={() => setVariantsDialogVisible(true)}
          />
          {product.variants.length > 0 ? (
            product.variants.map((variant) => (
              <VariantHandler
                key={variant.variant._id}
                variant={variant}
                onAdd={handleVariantAdd}
                onRemove={handleVariantRemove}
              />
            ))
          ) : (
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              No hay variantes seleccionadas
            </Text>
          )}
        </View>

        {/* Categories */}
        <View style={styles.container}>
          <SectionHeader
            title="Categorías"
            icon="tune-variant"
            onIconPress={() => setCategoriesDialogVisible(true)}
          />
          {product.categories.length > 0 ? (
            <View style={styles.chipContainer}>
              {product.categories.map((category) => (
                <Chip key={category._id} icon="tag">
                  {category.name}
                </Chip>
              ))}
            </View>
          ) : (
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              No hay categorías seleccionadas
            </Text>
          )}
        </View>

        {/* Images */}
        <View style={styles.container}>
          <SectionHeader
            title="Imágenes"
            icon="plus"
            onIconPress={pickImage}
            iconDisabled={product.images.length >= MAX_IMAGES}
          />
          {product.images.length > 0 ? (
            <View style={styles.imageList}>
              {product.images.map((image, idx) => (
                <ImageItem
                  key={idx}
                  image={image}
                  onDelete={() => handleImageDelete(image)}
                />
              ))}
            </View>
          ) : (
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              No hay imágenes seleccionadas
            </Text>
          )}
        </View>

        <SelectorDialog
          visible={categoriesDialogVisible}
          setVisible={setCategoriesDialogVisible}
          product={product}
          handler={handleCategorySelect}
          query={useGetProductCategories}
          entity="categories"
          title="Categorías"
        />

        <SelectorDialog
          visible={variantsDialogVisible}
          setVisible={setVariantsDialogVisible}
          product={product}
          handler={handleVariantSelect}
          query={useGetProductVariants}
          entity="variants"
          title="Variantes"
        />
      </ScreenWrapper>
      <BottomAction>
        <Button
          mode="contained"
          onPress={handleSubmit(handleMutation)}
          loading={mutation.isPending || areImagesLoading}
          disabled={
            (isProductInvalid || mutation.isPending || areImagesLoading) &&
            basicInfoEqual
          }
        >
          {editProduct ? "Guardar cambios" : "Añadir producto"}
        </Button>
      </BottomAction>
    </>
  );
};

export default ProductManageScreen;

const VariantHandler = ({ variant, onAdd, onRemove }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    onAdd(variant.variant, value);
    setValue("");
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">{variant.variant.name}</Text>

      <View style={styles.chipContainer}>
        {variant.values.map((value) => (
          <Chip key={value} onClose={() => onRemove(variant.variant, value)}>
            {value}
          </Chip>
        ))}
      </View>
      <TextInput
        mode="outlined"
        label="Nuevo valor"
        value={value}
        onChangeText={setValue}
        autoCapitalize="none"
        right={<TextInput.Icon icon="plus" onPress={handleAdd} />}
      />
    </View>
  );
};

const ImageItem = ({ image, onDelete }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <IconButton
        onPress={onDelete}
        icon="trash-can-outline"
        mode="contained"
        style={styles.imageDeleteButton}
      >
        Eliminar
      </IconButton>
    </View>
  );
};

const SelectorDialog = ({
  visible,
  setVisible,
  query,
  handler,
  product,
  entity,
  title,
}) => {
  const store = useGlobalStore((state) => state.store);
  const { data, isPending, isError } = query(store.id);

  const comparison = (item) => {
    if (entity === "categories") {
      return product.categories.some((cat) => cat._id === item._id);
    } else if (entity === "variants") {
      return product.variants.some((v) => v.variant._id === item._id);
    }
  };

  return (
    <DialogWithScroll
      visible={visible}
      onDismiss={() => setVisible(false)}
      title={title || "Seleccionar"}
      actions={<Button onPress={() => setVisible(false)}>Aceptar</Button>}
    >
      {isError ? (
        <Text>Error al obtener los datos</Text>
      ) : isPending ? (
        <Loader />
      ) : (
        <View style={styles.categoriesContainer}>
          {data.map((item) => (
            <Chip
              key={item._id}
              onPress={() => handler(item)}
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
  categoriesContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chipContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  container: {
    gap: 8,
    marginBottom: 12,
  },
  imageContainer: {
    width: Dimensions.get("window").width / 2 - 20,
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
  imageDeleteButton: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  imageList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});
