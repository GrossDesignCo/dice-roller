// export const useLocalStorage = (key: string) => {
//   // const 
// }

export const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(err);
  }
}

export const readFromLocalStorage = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '');
  } catch (err) {
    console.warn(err);
  }
}

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(err);
  }
}