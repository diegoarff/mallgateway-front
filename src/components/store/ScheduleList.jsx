import { StyleSheet, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { DAYS } from "../../utils/constants";

const currentDay = new Date().getDay();

const ScheduleList = ({ store }) => {
  const theme = useTheme();

  return (
    <>
      {store.schedule.map((schedule) => (
        <View
          key={schedule._id}
          style={[
            currentDay === schedule.day && {
              backgroundColor: theme.colors.elevation.level3,
            },
            styles.scheduleContainer,
          ]}
        >
          <Text>{DAYS[schedule.day]}</Text>

          {schedule.active ? (
            <View style={styles.scheduleTimeContainer}>
              <Text>{schedule.open}</Text>
              <Text>-</Text>
              <Text>{schedule.close}</Text>
            </View>
          ) : (
            <Text style={{ color: theme.colors.secondary }}>Cerrado</Text>
          )}
        </View>
      ))}
    </>
  );
};

export default ScheduleList;

const styles = StyleSheet.create({
  scheduleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  scheduleTimeContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
