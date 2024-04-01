import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import ImagePicker from "../../../components/store/ImagePicker";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../../../stores/global";
import SectionHeader from "../../../components/store/SectionHeader";
import {
  Appbar,
  Button,
  Dialog,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import BottomAction from "../../../components/store/BottomAction";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import ReferencePoint from "../../../components/store/ReferencePoint";
import { useUpdateStore } from "../../../services/hooks/stores";
import { Stack } from "expo-router";
import Header from "../../../components/Header";

const Location = () => {
  const theme = useTheme();
  const store = useGlobalStore((state) => state.store);
  const { mutate: updateStore, isPending } = useUpdateStore();

  const [facadeImg, setFacadeImg] = useState(store.facade);
  const [addresses, setAddresses] = useState(
    JSON.parse(JSON.stringify(store.addresses))
  );
  const [editAddress, setEditAddress] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const reset = () => {
    setFacadeImg(store.facade);
    setAddresses(JSON.parse(JSON.stringify(store.addresses)));
  };

  const isEqual =
    JSON.stringify(store.addresses) === JSON.stringify(addresses) &&
    store.facade === facadeImg;

  const toggleDialog = (address = null, index = null) => {
    setShowDialog((prev) => !prev);
    setEditAddress({ ...address, index });
  };

  const handleAddressDelete = (index) => {
    setAddresses((prevAddresses) => {
      const newAddresses = [...prevAddresses];
      newAddresses.splice(index, 1);
      return newAddresses;
    });
  };

  const handleUpdate = () => {
    updateStore({ facade: facadeImg, addresses });
  };

  useEffect(() => {
    reset();
  }, [store]);

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="restore"
          disabled={isPending || isEqual}
          onPress={reset}
          tooltip="Deshacer cambios"
        />
      ),
      tooltip: "Deshacer cambios",
    },
    {
      component: (
        <Appbar.Action
          icon="content-save-outline"
          disabled={isPending || isEqual}
          onPress={handleUpdate}
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
        withBottomAction
        contentContainerStyle={{
          gap: 16,
        }}
      >
        <View>
          <SectionHeader title="Fachada" />
          <View style={{ height: 250 }}>
            <ImagePicker
              image={facadeImg}
              setImage={setFacadeImg}
              aspect={[16, 9]}
              buttonLabel="Editar fachada"
            />
          </View>
        </View>

        <View>
          <SectionHeader
            title="Puntos de referencia"
            icon="plus"
            onIconPress={() => toggleDialog()}
          />
          {addresses.length > 0 ? (
            <View style={styles.addressContainer}>
              {addresses.map((address, index) => (
                <ReferencePoint
                  key={index}
                  reference={address}
                  onPress={() => toggleDialog(address, index)}
                  deleteIcon
                  onDeleteIconPress={() => handleAddressDelete(index)}
                />
              ))}
            </View>
          ) : (
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: "center",
              }}
            >
              No existen puntos de referencia
            </Text>
          )}
        </View>

        <AddressDialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
          setAddresses={setAddresses}
          editAddress={editAddress}
        />
      </ScreenWrapper>

      <BottomAction>
        <Button
          mode="contained"
          loading={isPending}
          disabled={isPending || isEqual}
          onPress={handleUpdate}
        >
          Actualizar
        </Button>
      </BottomAction>
    </>
  );
};

export default Location;

const AddressDialog = ({ visible, onDismiss, setAddresses, editAddress }) => {
  const theme = useTheme();
  const { control, handleSubmit, reset, watch } = useForm();

  const handleConfirm = (data) => {
    const newAddress = { ...editAddress, ...data };

    if (editAddress?.index !== null) {
      setAddresses((prevAddresses) => {
        const newAddresses = [...prevAddresses];
        newAddresses[editAddress.index] = newAddress;
        return newAddresses;
      });
    } else {
      setAddresses((prevAddresses) => [data, ...prevAddresses]);
    }
    onDismiss();
  };

  const watchAllFields = watch();

  const isSomeValueEmpty = Object.values(watchAllFields).some(
    (value) => value === ""
  );

  useEffect(() => {
    if (editAddress) {
      reset(editAddress);
    }
  }, [editAddress]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>
          {editAddress?.index !== null
            ? "Editar referencia"
            : "Añadir referencia"}
        </Dialog.Title>
        <Dialog.Content>
          <View>
            <FormInput
              mode="outlined"
              name="title"
              label="Título"
              control={control}
              autoFocus={editAddress?.index === null}
              rules={{ required: "Título es requerido" }}
              style={{ backgroundColor: theme.colors.elevation.level3 }}
            />
            <FormInput
              mode="outlined"
              name="description"
              label="Descripción"
              control={control}
              multiline
              rules={{ required: "Descripción es requerida" }}
              style={{ backgroundColor: theme.colors.elevation.level3 }}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button
            disabled={isSomeValueEmpty}
            onPress={handleSubmit(handleConfirm)}
          >
            Confirmar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    gap: 12,
  },
});
