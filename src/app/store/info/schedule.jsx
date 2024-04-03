import { Pressable, StyleSheet, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { Appbar, Button, Switch, Text, useTheme } from "react-native-paper";
import { useMemo, useState } from "react";
import { useGlobalStore } from "../../../stores/global";
import { DAYS } from "../../../utils/constants";
import { TimePickerModal } from "react-native-paper-dates";
import { Stack } from "expo-router";
import Header from "../../../components/Header";
import InfoText from "../../../components/InfoText";
import { useUpdateStore } from "../../../services/hooks/stores";
import BottomAction from "../../../components/store/BottomAction";

const OPEN = "open";
const CLOSE = "close";

const Schedule = () => {
  const theme = useTheme();
  const store = useGlobalStore((state) => state.store);
  const { mutate: updateStore, isPending } = useUpdateStore();

  const [schedule, setSchedule] = useState(
    JSON.parse(JSON.stringify(store.schedule))
  );

  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeType, setSelectedTimeType] = useState(null); // 'open' or 'close'

  const isScheduleEqual = useMemo(() => {
    return JSON.stringify(schedule) === JSON.stringify(store.schedule);
  }, [schedule, store]);

  const undoChanges = () => {
    setSchedule(JSON.parse(JSON.stringify(store.schedule)));
  };

  const handleSwitchChange = (day, value) => {
    setSchedule((prevSchedule) => {
      const newSchedule = [...prevSchedule];
      newSchedule[day].active = value;
      return newSchedule;
    });
  };

  const handleTimePress = (day, timeType) => {
    setSelectedDay(day);
    setSelectedTimeType(timeType);
    setPickerVisible(true);
  };

  const handleTimeConfirm = ({ hours, minutes }) => {
    const formatHour = hours.toString().padStart(2, "0");
    const formatMinutes = minutes.toString().padStart(2, "0");
    const formattedTime = `${formatHour}:${formatMinutes}`;

    setSchedule((prevSchedule) => {
      const newSchedule = [...prevSchedule];

      newSchedule[selectedDay][selectedTimeType] = formattedTime;
      return newSchedule;
    });
    setPickerVisible(false);
  };

  const handleUpdate = () => {
    updateStore({ schedule });
  };

  const getTimeStyle = (isSelectedDay, timeType) => {
    return isSelectedDay && selectedTimeType === timeType
      ? styles.timeSelected(theme)
      : styles.timeDefault(theme);
  };

  const renderDay = (day) => {
    const isSelectedDay = selectedDay === day.day;

    return (
      <View key={day._id} style={styles.dayContainer}>
        <View style={styles.dayTextContainer}>
          <Text variant="bodyLarge" style={styles.textStyle}>
            {DAYS[day.day]}
          </Text>
          <View style={styles.timeContainer}>
            <Pressable
              onPress={() => handleTimePress(day.day, OPEN)}
              style={getTimeStyle(isSelectedDay, OPEN)}
            >
              <Text variant="titleMedium">{day.open}</Text>
            </Pressable>
            <Text>-</Text>
            <Pressable
              onPress={() => handleTimePress(day.day, CLOSE)}
              style={getTimeStyle(isSelectedDay, CLOSE)}
            >
              <Text variant="titleMedium">{day.close}</Text>
            </Pressable>
          </View>
        </View>
        <Switch
          value={day.active}
          onValueChange={(value) => handleSwitchChange(day.day, value)}
        />
      </View>
    );
  };

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="restore"
          disabled={isScheduleEqual || isPending}
          onPress={undoChanges}
        />
      ),
      tooltip: "Deshacer cambios",
    },
    {
      component: (
        <Appbar.Action
          icon="content-save-outline"
          disabled={isScheduleEqual || isPending}
          onPress={handleUpdate}
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
        contentContainerStyle={styles.screenWrapper}
      >
        <View style={styles.scheduleContainer}>
          {schedule.map((day) => renderDay(day))}
        </View>

        <InfoText info="El formato utilizado es de 24 horas" />

        <TimePickerModal
          visible={pickerVisible}
          onDismiss={() => setPickerVisible(false)}
          onConfirm={handleTimeConfirm}
          label="Selecciona la hora de apertura"
          cancelLabel="Cancelar"
          confirmLabel="Aceptar"
          animationType="fade"
          use24HourClock
          locale="es"
        />
      </ScreenWrapper>

      <BottomAction>
        <Button
          mode="contained"
          onPress={handleUpdate}
          loading={isPending}
          disabled={isPending || isScheduleEqual}
        >
          Actualizar
        </Button>
      </BottomAction>
    </>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  dayContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  dayTextContainer: {
    gap: 6,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeDefault: (theme) => ({
    borderBottomWidth: 1,
    borderColor: theme.colors.onSurfaceVariant,
  }),
  timeSelected: (theme) => ({
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
  }),
  screenWrapper: {
    gap: 30,
  },
  scheduleContainer: {
    gap: 30,
  },
});
