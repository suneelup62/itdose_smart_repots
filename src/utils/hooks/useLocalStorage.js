import Cookies from "js-cookie"

export const useLocalStorage = (key, type, valueToStore) => {
  
  if (type === 'set') {
    window?.localStorage?.setItem(key, JSON.stringify(valueToStore));
  } else if (type === 'get') {
    const storedValue = window?.localStorage?.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null; // Safely parse only if value exists
  }
};


export const useCookiesStorage=(key)=>{
 let userDetails = Cookies.get(key)
 return userDetails;
}

