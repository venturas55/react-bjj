import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "../lib/funciones";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY, ERROR_MESSAGES, API_URL } from "../config/constants";
import axios from "axios";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    //console.log('LOGOUT: Starting logout process');
    try {
      await AsyncStorage.multiRemove([TOKEN_STORAGE_KEY, USER_STORAGE_KEY]);
      setIsLogged(false);
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
      //console.log('LOGOUT: Completed successfully');
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  };

  const checkToken = async () => {
    try {
      //console.log('GP1. Starting checkToken');
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      //console.log('GP2. Retrieved token:', token ? 'exists' : 'null');
      
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //console.log('GP3. Set Authorization header, getting user data');
        const userData = await getCurrentUser();
        //console.log('GP4. Got user data:', userData);
        
        if (userData) {
          //console.log('GP5. Setting user and logged state');
          setUser(userData);
          setIsLogged(true);
          //console.log('GP6. User state updated');
        } else {
          //console.log('GP7. No user data, logging out');
          await logout();
        }
      } else {
        //console.log('GP8. No token found, logging out');
        await logout();
      }
    } catch (error) {
      console.error('GP ERROR in checkToken:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        logout,
        checkToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
