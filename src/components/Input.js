import "./Input.css";
export default function Input({ labelText, ...propsRest }) {
  return (
    <div className="form-field">
      <input
        id="input-element"
        spellCheck="false"
        autoComplete="off"
        placeholder=" "
        {...propsRest}
      />
      <label htmlFor="input-element">
        <div className="label__text">{labelText}</div>
      </label>
    </div>
  );
}
