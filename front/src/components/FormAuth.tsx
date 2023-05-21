import useForm from "../hooks/useForm";
import { AuthProps } from "../types/user";
import FormItem from "./ui/FormItem";

type FormAuthProps = {
  onSumbitHandler: (authProps: AuthProps) => void
}

export default function FormAuth({ onSumbitHandler }: FormAuthProps) {
  const { formState, updateFormState } = useForm<AuthProps>({
    email: "",
    password: "",
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if(Object.values(formState).every(itm => itm.length > 0)){
      onSumbitHandler(formState)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormItem
        onChange={(text) => updateFormState("email", text)}
        label="Email"
        type="email"
      ></FormItem>
      <FormItem
        onChange={(text) => updateFormState("password", text)}
        label="пароль"
        type="password"
      ></FormItem>
      <button type="submit" className="mt-2 btn btn-primary">
        Авторизация
      </button>
    </form>
  );
}
