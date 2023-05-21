import axios from "axios";
import { CommonResponseData, SERVER_URL } from "./config";

export const deleteEntry = async (token: string, entryId: number) => {
  const response = await axios(SERVER_URL + "entry", {
    method: "delete",
    data: { id: entryId },
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

type UpdateEntryData = {
  text: string
  img: string
}

export const updateEntry = async (data: FormData, token: string) => {
  const response = await axios(SERVER_URL + "entry", {
    method: "put",
    data: data,
    headers: { Authorization: `Token ${token}` },
  });

  return response.data as CommonResponseData<true, UpdateEntryData>
}

