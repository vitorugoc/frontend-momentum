import React, { useState, ChangeEvent, FC } from 'react';

interface DateValidator {
  validate: (value: string) => boolean;
  errorMessage: string;
}

interface ValidatedDateInputProps {
  label: string;
  validators: DateValidator[];
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const ValidatedDateInput: FC<ValidatedDateInputProps> = ({
  label,
  validators,
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
      <label htmlFor={`validated-date-input-${label}`} className="mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        id={`validated-date-input-${label}`}
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

export default ValidatedDateInput;
