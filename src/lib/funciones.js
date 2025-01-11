import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL, TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../config/constants";

// Register user
export async function createUser(email, password, usuario, nombre, apellidos) {
  try {
    const newAccount = {
      usuario,
      nombre,
      apellidos,
      email,
      contrasena: password,
    };
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = "asf";
    //await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = "await account.get()";

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    console.log('GCU1. Getting current user');
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    console.log('GCU2. Token from storage:', token);
    
    if (!token) {
      console.log('GCU3. No token found');
      return null;
    }

    // Get stored user data to get the ID
    const storedUserData = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (!storedUserData) {
      console.log('GCU4. No stored user data found');
      return null;
    }

    const userData = JSON.parse(storedUserData);
    console.log('GCU5. Stored user data:', userData);
    console.log('GCU5.1. User ID:', userData.id);

    // Make sure the token has the Bearer prefix
    const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    console.log('GCU6. Using Authorization header:', bearerToken);
    
    const url = `${API_URL}/api/usuarios/${userData.id}`;
    console.log('GCU7. Making request to:', url);
    
    // Set up axios config with Bearer token
    const config = {
      headers: {
        'Authorization': bearerToken,
        'Content-Type': 'application/json'
      }
    };
    console.log('GCU7.1. Request config:', JSON.stringify(config, null, 2));
    
    // Set the default header for all future requests
    axios.defaults.headers.common['Authorization'] = bearerToken;
    
    const response = await axios.get(url, config);
    console.log('GCU8. Response received:', response.data);
    
    if (response.data) {
      console.log('GCU9. User data found in response');
      const userWithAsistencias = response.data;
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithAsistencias));
      return userWithAsistencias;
    } else {
      console.log('GCU10. No user data in response');
      return null;
    }
  } catch (error) {
    console.error('GCU ERROR:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = 'await account.deleteSession("current");';

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile =
      "await storage.createFile(      appwriteConfig.storageId,      ID.unique(),      asset    )";

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = "storage.getFileView(appwriteConfig.storageId, fileId)";
    } else if (type === "image") {
      fileUrl =
        'storage.getFilePreview(        appwriteConfig.storageId,        fileId,        2000,        2000,        "top",        100      )';
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}
