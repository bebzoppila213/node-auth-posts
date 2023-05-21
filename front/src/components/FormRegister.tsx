import useForm from "../hooks/useForm";
import { RegisterProps } from "../types/user";
import FormItem from "./ui/FormItem";

type FormRegisterProps = {
  onSumbitHandler: (authProps: RegisterProps) => void;
};

export default function FormRegister({ onSumbitHandler }: FormRegisterProps) {
  const { formState, updateFormState } = useForm({
    email: "",
    name: "",
    password: "",
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(formState).every((itm) => itm.length > 0)) {
      onSumbitHandler(formState);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FormItem
        onChange={(text) => updateFormState("email", text)}
        label="Email"
        type="email"
      ></FormItem>
      <FormItem
        onChange={(text) => updateFormState("name", text)}
        label="Имя"
        type="text"
      ></FormItem>
      <FormItem
        onChange={(text) => updateFormState("password", text)}
        label="пароль"
        type="password"
      ></FormItem>
      <button type="submit" className="mt-2 btn btn-primary">
        Регистрация
      </button>
    </form>
  );
}
