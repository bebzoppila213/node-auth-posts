import axios from "axios";
import { AuthProps, IUser, RegisterProps } from "../types/user";
import { CommonResponseData, SERVER_URL } from "./config";



export const auth = async (dataAuth: AuthProps) => {
  const response = await fetch(SERVER_URL + "auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataAuth),
  });
  return (await response.json()) as
    | CommonResponseData<true, IUser>
    | CommonResponseData<true, undefined>;
};

export const register = async (dataRegister: RegisterProps) => {
  const response = await fetch(SERVER_URL + "register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataRegister),
  });
  return (await response.json()) as
    | CommonResponseData<true, IUser>
    | CommonResponseData<true, undefined>;
};


export const createEntry = async (
  data: FormData,
  token: string
) => {
  const response = await axios.post(SERVER_URL + "add-entry", data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response;
};

type SuccessAuthRoken = {
  "id": number,
	"email": string,
}

export const authToken = async(token: string) => {
  const response = await axios.post<CommonResponseData<true, SuccessAuthRoken> | CommonResponseData<false, undefined>>(SERVER_URL + "auth-token", {}, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response.data
}