type CustomTextariaProps = {
    label: string;
    onChange: (text: string) => void;
    value?: string
  };

export default function CustomTextaria({label, onChange, value = ''}: CustomTextariaProps) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <textarea
        rows={10}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="form-control"
        id="exampleFormControlTextarea1"
      ></textarea>
    </div>
  );
}
