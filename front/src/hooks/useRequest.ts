import { useEffect, useState } from "react";
import axios from "axios";

export default function useRequest<T, U extends object>(
  url: string,
  defaultState: T,
  defaultParams: U
) {
  const [state, setState] = useState(defaultState);
  const [params, setParams] = useState(defaultParams);

  const loadData = async () => {
    const response = await axios.get(url, { params: params });
    const data = await response.data;
    setState(data.data);
  };

  const updateParams = (key: keyof U, value: string) => {
    setParams({ ...params, [key]: value });
  };

  useEffect(() => {
    loadData();
  }, [params]);

  return {
    state,
    updateParams,
    params,
    setState
  };
}
