import React, { useState, ChangeEvent, FC, InputHTMLAttributes } from 'react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validators: PasswordValidator[];
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  iconClassName?: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

interface PasswordValidator {
  validate: (value: string) => boolean;
  errorMessage: string;
}

const ValidatedPasswordInput: FC<PasswordInputProps> = ({
  label,
  validators,
  type = '',
  placeholder = '',
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  iconClassName = '',
  isVisible,
  setIsVisible,
  ...rest
}) => {
  const [value, setValue] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    const newErrors = validators
      .map(validator => (!validator.validate(newValue) ? validator.errorMessage : ''))
      .filter(errorMessage => errorMessage !== '');

    setErrors(newErrors);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <label htmlFor={`password-input-${label}`} className={`block mb-2 text-sm font-medium ${labelClassName}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={`password-input-${label}`}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`w-full p-2 pr-10 border rounded ${errors.length > 0 ? 'border-red-500' : 'border-gray-300'} ${inputClassName}`}
          {...rest}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className={`absolute inset-y-0 right-2 flex items-center text-gray-600 focus:outline-none ${iconClassName}`}
          aria-label={isVisible ? 'Esconder senha' : 'Mostrar senha'}
        >
          {isVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.344a11.954 11.954 0 011.97-2.148 11.979 11.979 0 0116.108 16.108 11.954 11.954 0 01-2.148 1.97M21 21l-4.55-4.55M15.54 15.54A7.455 7.455 0 016.46 6.46" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 12S4.5 4.5 12 4.5s10.5 7.5 10.5 7.5-3 7.5-10.5 7.5S1.5 12 1.5 12z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
            </svg>
          )}
        </button>
      </div>
      {errors.length > 0 && (
        <div className={`mt-1 text-red-500 text-sm ${errorClassName}`}>
          {errors.map((error, index) => (
            <span key={index} className="block">{error}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValidatedPasswordInput;
