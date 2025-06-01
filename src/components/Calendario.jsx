import React, { useEffect, useState } from "react";
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
import { API_URL } from "../config/constants";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [allClasses, setAllClasses] = useState([]); // Clases filtradas para la fecha seleccionada
  const [calendarClasses, setCalendarClasses] = useState([]); // Clases filtradas para la fecha seleccionada

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const clases = await getFetch(`${API_URL}/api/clases`);
        console.log("CLASES: ", clases);
        setAllClasses(clases);
        
        // Automatically select and show classes for the current day
        handleDayPress(new Date());
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []); // Empty dependency array means this effect runs once on mount

  // Obtener el nombre de los días de la semana
  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

  // Generar los días de la semana
  const generateWeekDays = (date) => {
    // Obtener el primer día de la semana (lunes)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7));

    // Obtener el último día de la semana (domingo)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Generar array de días de la semana
    let days = [];
    let currentDay = new Date(startOfWeek);

    while (currentDay <= endOfWeek) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateWeekDays(currentDate);

  // Navegar entre semanas
  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
    setSelectedDate(null); // Limpiar la selección al cambiar de semana
    setCalendarClasses([]); // Limpiar las clases mostradas al cambiar de semana
  };

  // Manejar la selección de días
  const handleDayPress = (date) => {
    setSelectedDate(date);

    // Filtrar clases para la fecha seleccionada
    const selectedClasses = allClasses.filter((clase) => {
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
          <TouchableOpacity onPress={() => navigateWeek(-1)}>
            <Text className="text-5xl text-blue-900">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-2xl text-blue-900 font-bold">
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getDate()} 
          </Text>
          <TouchableOpacity onPress={() => navigateWeek(1)}>
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
              <View className="mb-2">
                <ClaseCard clase={item} index={index} />
              </View>
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
