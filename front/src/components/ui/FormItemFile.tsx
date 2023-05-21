import { ChangeEvent, FormEvent } from "react";


type FormItemFileProps = {
  onChange: (file: File) => void
}

export default function FormItemFile({onChange}: FormItemFileProps) {

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.currentTarget.files?.length){
      onChange(event.currentTarget.files[0])
    }
  }

  return (
    <div className="form-group">
      <label>Картинка</label>
      <input
        onChange={(event) => onInputChange(event)}
        accept="image/png, image/gif, image/jpeg"
        name="photo"
        type="file"
        className="form-control"
      />
    </div>
  );
}
