import { useEffect, useState } from "react";
import FormItem from "./ui/FormItem";
import FormItemFile from "./ui/FormItemFile";
import CustromTextaria from "./ui/CustromTextaria"

type FormCreateEntryProps = {
    onFormSubmit: (photo: File | undefined, text: string) => void;
    defaultText?: string;
}

export default function FormEntry({ onFormSubmit, defaultText }: FormCreateEntryProps) {
  const [file, setFile] = useState<File>();
  const [text, setText] = useState(defaultText);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(text){
      onFormSubmit(file, text)
    }
  };

  useEffect(() => {
    setText(defaultText)
  }, [defaultText])
  

  return (
    <form onSubmit={onSubmit}>
      <FormItemFile onChange={(file) => setFile(file)}></FormItemFile>
      <CustromTextaria
        value={text}
        onChange={(text) => setText(text)}
        label="Текст"
      ></CustromTextaria>
      <button type="submit" className="mt-2 btn btn-primary">
        Редактировать элемент
      </button>
    </form>
  );
}
