import PropTypes from "prop-types";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    <div className="flex items-center gap-5 mb-5">
      <label htmlFor={name} className="block text-lg">
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-bold text-xs bg-blue-200 text-black py-2 px-5 rounded-[10px]"
        >
          Default Prompts
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="border bg-white border-teal-900 text-gray-700 text-md rounded-lg focus: outline-none block w-full p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

FormField.propTypes = {
  labelName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  isSurpriseMe: PropTypes.bool,
  handleSurpriseMe: PropTypes.func,
};

export default FormField;
