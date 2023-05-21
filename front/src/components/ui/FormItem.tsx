type FormItemProps = {
  label: string;
  onChange: (text: string) => void;
  type: "email" | "text" | "password";
};

export default function FormItem({ label, onChange, type }: FormItemProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        name="email"
        type={type}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="form-control"
        aria-describedby="emailHelp"
      />
    </div>
  );
}
