import { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearField = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    clearField,
  };
};

export default useField;
