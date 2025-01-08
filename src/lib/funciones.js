import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.sora",
  projectId: "660d0e00da0472f3ad52",
  storageId: "660d0e59e293896f1eaf",
  databaseId: "660d14b2b809e838959a",
  userCollectionId: "660d14c0e8ae0ea842b8",
  videoCollectionId: "660d157fcb8675efe308",
};

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
    const response = await fetch("http://adriandeharo.es:7001/signup", {
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
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      return null;
    }

    // eslint-disable-next-line prettier/prettier
    const response = await axios.post("http://adriandeharo.es:7001/api/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);

    return response.data; // Devuelve los datos del usuario
  } catch (error) {
    console.log(error);
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
