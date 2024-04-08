import { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import {
  Appbar,
  Button,
  Chip,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useGlobalStore } from "../../../stores/global";
import { useGetSocials, useUpdateStore } from "../../../services/hooks/stores";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import FormInput from "../../../components/FormInput";
import SectionHeader from "../../../components/store/SectionHeader";
import Loader from "../../../components/Loader";
import { Stack } from "expo-router";
import Header from "../../../components/Header";
import BottomAction from "../../../components/store/BottomAction";

const Contacts = () => {
  const theme = useTheme();
  const store = useGlobalStore((state) => state.store);
  const { mutate: updateStore, isPending } = useUpdateStore();

  const [addDialogVisible, setAddDialogVisible] = useState(false);

  const [socials, setSocials] = useState(
    JSON.parse(JSON.stringify(store.socials))
  );

  const { control, handleSubmit, reset, watch } = useForm();

  const watchAllFields = watch();

  const areContactsEqual = useMemo(() => {
    return (
      store.phone === watchAllFields.phone &&
      store.website === watchAllFields.website &&
      JSON.stringify(store.socials) === JSON.stringify(socials)
    );
  }, [watchAllFields, socials]);

  const resetForm = () => {
    if (store) {
      const initialValues = {
        phone: store.phone,
        website: store.website,
        socials: store.socials,
      };

      reset(initialValues);
      setSocials(JSON.parse(JSON.stringify(store.socials)));
    }
  };

  const handleUpdate = (data) => {
    const socialsData = [];

    for (let i = 0; i < socials.length; i++) {
      if (socials[i].deleted) continue;

      socialsData.push({
        social: socials[i].social._id,
        url: data.socials[i].url,
      });
    }

    const contactsData = {
      ...data,
      socials: socialsData,
    };

    updateStore(contactsData);
  };

  useEffect(() => {
    resetForm();
  }, [store]);

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="restore"
          disabled={areContactsEqual || isPending}
          onPress={resetForm}
        />
      ),
      tooltip: "Deshacer cambios",
    },
    {
      component: (
        <Appbar.Action
          icon="content-save-outline"
          disabled={areContactsEqual || isPending}
          onPress={handleSubmit(handleUpdate)}
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
        <View>
          <SectionHeader title="General" />
          <FormInput
            mode="outlined"
            name="phone"
            label="Teléfono"
            control={control}
            rules={{ required: "Teléfono es requerido" }}
            left={<TextInput.Icon icon="phone" size={20} />}
          />

          <FormInput
            mode="outlined"
            name="website"
            label="Sitio web"
            control={control}
            rules={{ required: "Sitio web es requerido" }}
            left={<TextInput.Icon icon="web" size={20} />}
          />
        </View>

        <View>
          <SectionHeader
            title="Redes sociales"
            icon="plus"
            onIconPress={() => setAddDialogVisible(true)}
          />

          {socials.length > 0 ? (
            socials.map((social, index) => {
              if (social.deleted) return null;

              return (
                <FormInput
                  key={index}
                  mode="outlined"
                  name={`socials[${index}].url`}
                  label={social.social.name}
                  control={control}
                  rules={{ required: "Este campo es requerido" }}
                  left={<TextInput.Icon icon={social.social.icon} size={20} />}
                  right={
                    <TextInput.Icon
                      icon="trash-can-outline"
                      onPress={() => {
                        setSocials((prev) => {
                          prev[index] = { ...prev[index], deleted: true };
                          return [...prev];
                        });
                      }}
                    />
                  }
                />
              );
            })
          ) : (
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: "center",
              }}
            >
              No existen redes sociales
            </Text>
          )}
        </View>

        <AddSocialDialog
          visible={addDialogVisible}
          onDismiss={() => setAddDialogVisible(false)}
          setSocials={setSocials}
        />
      </ScreenWrapper>

      <BottomAction>
        <Button
          mode="contained"
          onPress={handleSubmit(handleUpdate)}
          loading={isPending}
          disabled={isPending || areContactsEqual}
        >
          Actualizar
        </Button>
      </BottomAction>
    </>
  );
};

export default Contacts;

const AddSocialDialog = ({ visible, onDismiss, setSocials }) => {
  const { data, isPending, isError, error } = useGetSocials();

  const [selectedSocial, setSelectedSocial] = useState(null);

  const handleAddSocial = () => {
    setSocials((prev) => [...prev, { social: selectedSocial, url: "" }]);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Agregar red social</Dialog.Title>
        <Dialog.Content>
          {isPending && <Loader />}
          {isError && <Text>Error: {error}</Text>}
          {data && (
            <View style={styles.chipSocialsContainer}>
              {data.map((social) => (
                <Chip
                  key={social._id}
                  showSelectedOverlay
                  onPress={() => setSelectedSocial(social)}
                  selected={selectedSocial?._id === social._id}
                  icon={selectedSocial?._id !== social._id && social.icon}
                >
                  {social.name}
                </Chip>
              ))}
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={handleAddSocial} disabled={!selectedSocial}>
            Agregar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  chipSocialsContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  noSocialsText: {
    textAlign: "center",
  },
});
