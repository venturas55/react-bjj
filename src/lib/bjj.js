export async function getClases() {
  try {
    const clases = "http://adriandeharo.es:7001/api/clases";
    const rawData = await fetch(clases);
    const json = await rawData.json();
    return json;
  } catch (error) {
    console.error("Error fetching classes:", error);
    return error;
  }
}

export async function getUsuario(id) {
  try {
    const usuario = "http://adriandeharo.es:7001/api/usuario/" + id;
    const rawData = await fetch(usuario);
    const json = await rawData.json();
    return json;
  } catch (error) {
    console.error("Error fetching classes:", error);
    return error;
  }
}

export async function getUsuarioPicture(id) {
  try {
    const foto = "http://adriandeharo.es:7001/api/usuario/foto/" + id;
    return foto;
  } catch (error) {
    console.error("Error fetching classes:", error);
    return error;
  }
}
