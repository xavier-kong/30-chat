import { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearfield = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    clearfield,
  };
};

export default useField;
