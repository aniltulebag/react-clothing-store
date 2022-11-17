const FormInput = ({ label, id, type, onChange, name, value, required }) => {
  return (
    <div className="input-group">
      <label className={`form-input-label`} htmlFor={id}>
        {label}
      </label>
      <input
        className="form-input"
        id={id}
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        required={required}
      />
    </div>
  );
};

export default FormInput;
