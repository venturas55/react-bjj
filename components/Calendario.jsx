import React, { useState, useEffect } from "react";
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
import { getClases, getUsuario, getUsuarioPicture } from "../lib/bjj"; // Import the getClases function

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [classes, setClasses] = useState([]); // Estado para almacenar las clases
  const [calendarClasses, setCalendarClasses] = useState([]); // Clases filtradas para la fecha seleccionada

  // Obtener el nombre de los días de la semana
  const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

  useEffect(() => {
    // Fetch inicial para obtener todas las clases
    const fetchClasses = async () => {
      const response = await getClases();
      setClasses(response);
    };

    fetchClasses();
  }, []);

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
    const selectedClasses = classes.filter((clase) => {
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
        style={[
          styles.dayCell,
          !isCurrentMonth && styles.inactiveDay,
          isSelected && styles.selectedDay,
        ]}
        onPress={() => handleDayPress(item)}
      >
        <Text style={styles.dayText}>{item.getDate()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Encabezado del calendario */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateMonth(-1)}>
            <Text style={styles.navButton}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth(1)}>
            <Text style={styles.navButton}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Días de la semana */}
        <View style={styles.weekRow}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.weekDay}>
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
          style={styles.calendarGrid}
        />

        {/* Mostrar las clases para el día seleccionado */}
        <FlatList
          data={calendarClasses}
          keyExtractor={(item) => item.clase_id.toString()}
          renderItem={({ item, index }) => (
            <ClaseCard clase={item} index={index} />
          )}
          ListEmptyComponent={
            <Text style={styles.noClassesText}>
              {selectedDate
                ? "No hay clases para este día."
                : "Selecciona un día."}
            </Text>
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#555",
  },
  calendarGrid: {
    marginBottom: 16,
  },
  dayCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 50,
  },
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
  asistente: {
    fontSize: 12,
    color: "#666",
    marginRight: 4,
  },
  noClassesText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 16,
  },
});

export default Calendar;
