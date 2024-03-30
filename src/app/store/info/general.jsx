import { Stack } from "expo-router";
import { Appbar, Button } from "react-native-paper";
import Header from "../../../components/Header";
import { useGlobalStore } from "../../../stores/global";
import { useUpdateStore } from "../../../services/hooks/stores";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import { useEffect, useMemo, useRef } from "react";

const General = () => {
  const store = useGlobalStore((state) => state.store);
  const { mutate: updateStore, isPending } = useUpdateStore();

  const { control, handleSubmit, reset, watch } = useForm();

  const handleUpdateStore = (data) => {
    updateStore(data);
  };

  const formValues = watch();
  const initialFormValues = useRef();

  const isFormEqual = useMemo(() => {
    return (
      JSON.stringify(formValues) === JSON.stringify(initialFormValues.current)
    );
  }, [formValues]);

  const resetForm = () => {
    if (store) {
      const initialValues = {
        name: store.name,
        description: store.description,
      };
      reset(initialValues);
      initialFormValues.current = initialValues;
    }
  };

  useEffect(() => {
    resetForm();
  }, [store]);

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            // Defined below
            <GeneralHeader
              undo={resetForm}
              undoDisabled={isPending || isFormEqual}
              {...props}
            />
          ),
        }}
      />

      <ScreenWrapper withInsets={false}>
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
          placeholder="Descripción de la tienda"
          control={control}
          rules={{
            required: "Descripción de la tienda es requerida",
          }}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(handleUpdateStore)}
          loading={isPending}
          disabled={isPending || isFormEqual}
        >
          Actualizar
        </Button>
      </ScreenWrapper>
    </>
  );
};

const GeneralHeader = ({ undoDisabled, undo, ...props }) => {
  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="restore"
          disabled={undoDisabled}
          onPress={undo}
          tooltip="Deshacer cambios"
        />
      ),
      tooltip: "Deshacer cambios",
    },
  ];

  return <Header {...props} actions={headerActions} />;
};

export default General;
