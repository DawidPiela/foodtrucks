export function saveDataToLocalStorage(key: string, data: {locationid: string; rating: number}[]) {
  if (Array.isArray(data)) {
      localStorage.setItem(key, JSON.stringify(data));
  } else {
      console.error("Data should be an array of objects.");
  }
}

export function getDataFromLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
