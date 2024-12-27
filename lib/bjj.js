export async function getClases() {
  const clases = "http://adriandeharo.es:7001/api/clases";

  const rawData = await fetch(clases);
  const json = await rawData.json();

  return json;
}
