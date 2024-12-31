/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useGetFetch = (link) => {
  const [data, setData] = useState([]); // Estado para almacenar las clases
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await globalThis.fetch(link);
      const json = await response.json();
      setData(json);
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return { data, isLoading, refetch };
};

export default useGetFetch;
