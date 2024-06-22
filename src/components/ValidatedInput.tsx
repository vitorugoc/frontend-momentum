import React, { useState, ChangeEvent, FC } from 'react';

interface Validator {
  validate: (value: string) => boolean;
  errorMessage: string;
}

interface ValidatedInputProps {
  label: string;
  validators: Validator[];
  type?: string;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const ValidatedInput: FC<ValidatedInputProps> = ({
  label,
  validators,
  type = 'text',
  placeholder = '',
  containerClassName = '',
  inputClassName = '',
  errorClassName = '',
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

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <label htmlFor={`validated-input-${label}`} className="mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={`validated-input-${label}`}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={`border p-2 rounded ${errors.length > 0 ? 'border-red-500' : 'border-gray-300'} ${inputClassName}`}
      />
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

export default ValidatedInput;
