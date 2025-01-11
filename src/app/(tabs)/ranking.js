import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import getFetch from "./../../hooks/getFetch";
import Avatar from "./../../components/Avatar";
import { format } from "date-fns";
import BeltComponent from "./../../components/BeltComponent";

const Ranking = () => {
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getFetch("http://adriandeharo.es:7001/api/asistencias");
        if (response) {
          setRankingData(response);
        }
      } catch (err) {
        console.error("Error fetching ranking data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  const ranking = rankingData?.ranking || [];

  return (
    <View style={styles.container}>
      <View style={styles.rankingContainer}>
        <Text style={styles.rankingTitle}>Ranking de Asistencias</Text>
        <FlatList
          data={ranking}
          keyExtractor={(item, index) => item.usuario_id?.toString() || index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.rankingItem}>
              <View style={styles.avatarContainer}>
                <Avatar id={item.usuario_id} />
                <Text style={styles.position}>#{index + 1}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nombre_usuario}</Text>
                <Text style={styles.asistencias}>
                  {item.total_asistencias} {item.total_asistencias === 1 ? 'clase' : 'clases'}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noData}>No hay datos de asistencia disponibles</Text>
          }
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  rankingContainer: {
    flex: 1,
    padding: 16,
  },
  rankingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  position: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  asistencias: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  noData: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontSize: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  }
});

export default Ranking;
