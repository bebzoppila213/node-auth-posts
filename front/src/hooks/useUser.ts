import { useEffect, useState } from "react";
import { auth, register, authToken } from "../api/user";
import { AuthProps, IUser, RegisterProps } from "../types/user";
import { toast } from "react-toastify";
import useLocalStorages from "./useLocalstorage";

export default function useUser() {
  const [userState, setUserState] = useState<IUser>({
    id: 0,
    email: "",
    name: "",
    token: "",
  });
  useLocalStorages(userState, (data) => setUserState(data), 'user123awd') 

  const [isAuth, setIsAuth] = useState(false);

  const sucsessfulRequest = (data: IUser, messages: string) => {
    toast.success(messages);
    setUserState({ ...userState, ...data });
    setIsAuth(true);
  }

  const errorRequest = (messages: string) => {
    setIsAuth(false);
    toast.error(messages);
  }

  const userAuth = async (data: AuthProps) => {
    const authProps = await auth(data);
    
    if (authProps.data) {
      sucsessfulRequest(authProps.data, "Пользователь успешно авторизован")
    } else {
      errorRequest(authProps.messages);
    }
  };

  const userRegister = async (data: RegisterProps) => {
    const registerRes = await register(data);

    if (registerRes.data) {
      sucsessfulRequest(registerRes.data, "Пользователь успешно зарегистрирован")
    } else {
      errorRequest(registerRes.messages);
    }
  };

  const upserAuthToken = async () => {
    const dataRes = await authToken(userState.token)
    if(dataRes.ok){
      setIsAuth(true)
    }
  }

  useEffect(() => {
    if(userState.token){
      upserAuthToken()
    }
    
  },[userState])

  return {
    userState,
    userAuth,
    userRegister,
    isAuth
  };
}
