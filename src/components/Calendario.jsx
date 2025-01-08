import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import ClaseCard from "./ClaseCard"; // Import the AnimatedClaseCard component
import theme from "./theme";
import getFetch from "../hooks/getFetch.js";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarClasses, setCalendarClasses] = useState([]); // Clases filtradas para la fecha seleccionada
  const clases = getFetch("http://adriandeharo.es:7001/api/clases");

  // Obtener el nombre de los días de la semana
  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

  // Generar los días del mes
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Calcular el inicio de la cuadrícula del calendario
    const startOfCalendar = new Date(firstDayOfMonth);
    startOfCalendar.setDate(
      firstDayOfMonth.getDate() - (firstDayOfMonth.getDay() || 7) + 1,
    );

    // Calcular el fin de la cuadrícula del calendario
    const endOfCalendar = new Date(lastDayOfMonth);
    endOfCalendar.setDate(
      lastDayOfMonth.getDate() + (7 - lastDayOfMonth.getDay() || 7),
    );

    // Generar un array de días
    let days = [];
    let currentDay = new Date(startOfCalendar);

    while (currentDay <= endOfCalendar) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays(currentDate);

  // Navegar entre meses
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null); // Limpiar la selección al cambiar de mes
    setCalendarClasses([]); // Limpiar las clases mostradas al cambiar de mes
  };

  // Manejar la selección de días
  const handleDayPress = (date) => {
    setSelectedDate(date);

    // Filtrar clases para la fecha seleccionada
    const selectedClasses = clases.filter((clase) => {
      const claseDate = new Date(clase.fecha_hora);
      return (
        claseDate.getFullYear() === date.getFullYear() &&
        claseDate.getMonth() === date.getMonth() &&
        claseDate.getDate() === date.getDate()
      );
    });

    setCalendarClasses(selectedClasses);
  };

  // Renderizar un día individual
  const renderDay = ({ item }) => {
    const isCurrentMonth = item.getMonth() === currentDate.getMonth();
    const isSelected =
      selectedDate && item.toDateString() === selectedDate.toDateString();

    return (
      <TouchableOpacity
        className="flex-1 py-2"
        style={[
          !isCurrentMonth && styles.inactiveDay,
          isSelected && styles.selectedDay,
        ]}
        onPress={() => handleDayPress(item)}
      >
        <Text className="py-2 text-center ">{item.getDate()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View className="bg-grey-200 p-4">
        {/* Encabezado del calendario */}
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => navigateMonth(-1)}>
            <Text className="text-5xl text-blue-900">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-2xl text-blue-900 font-bold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth(1)}>
            <Text className="text-5xl text-blue-900">{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Días de la semana */}
        <View className="flex-row">
          {daysOfWeek.map((day, index) => (
            <Text key={index} className="flex-1 text-center">
              {day}
            </Text>
          ))}
        </View>

        {/* Días del calendario */}
        <FlatList
          data={calendarDays}
          keyExtractor={(item) => item.toISOString()}
          renderItem={renderDay}
          numColumns={7}
          scrollEnabled={false}
          className="mb-1"
        />
      </View>

      <View className="mx-6">
        {/* Mostrar las clases para el día seleccionado */}
        <FlatList
          data={calendarClasses}
          keyExtractor={(item) => item.clase_id.toString()}
          renderItem={({ item, index }) => (
            <ClaseCard clase={item} index={index} />
          )}
          ListEmptyComponent={
            <Text className="text-center font-bold">
              {selectedDate
                ? "No hay clases para este día."
                : "Selecciona un día."}
            </Text>
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inactiveDay: {
    backgroundColor: "#f0f0f0",
  },
  selectedDay: {
    backgroundColor: theme.selected.primary,
    borderRadius: 25,
  },
  dayText: {
    color: "#333",
  },
});

export default Calendar;
