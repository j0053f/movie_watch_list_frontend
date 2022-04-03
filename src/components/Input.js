import "./Input.css";
export default function Input({ labelText, ...propsRest }) {
  const name = propsRest.name;
  return (
    <div className="form-field">
      <input
        id={name}
        spellCheck="false"
        autoComplete="off"
        placeholder=" "
        {...propsRest}
      />
      <label htmlFor={name}>
        <div className="label__text">{labelText}</div>
      </label>
    </div>
  );
}
