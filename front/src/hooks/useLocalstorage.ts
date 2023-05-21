import { useEffect, useState } from "react";

export default function useLocalStorages<T>(
  data: T,
  setData: (newData: T) => void,
  key: string
) {

    const [isFirst, setIsFirst] = useState(true)

  useEffect(() => {
    if(!isFirst){
        localStorage.setItem(key, JSON.stringify(data));
    }
    setIsFirst(false)
  }, [data]);

  useEffect(() => {
    const storageData = localStorage.getItem(key);
    if (storageData) {
        console.log(123);
        
      setData(JSON.parse(storageData));
    }
  }, []);
}
