import { useState } from "react";
import { useController } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";

const FormInput = ({
  control,
  name,
  helperText,
  rules = {},
  secureTextEntry = false,
  defaultValue = "",
  right = null,
  ...rest
}) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    defaultValue,
  });

  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        error={!!error}
        secureTextEntry={secure}
        autoCapitalize="none"
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={secure ? "eye" : "eye-off"}
              onPress={() => setSecure((prev) => !prev)}
            />
          ) : (
            right
          )
        }
        {...rest}
      />
      <HelperText type={error ? "error" : "info"} visible={error || helperText}>
        {error?.message || helperText}
      </HelperText>
    </>
  );
};

export default FormInput;
