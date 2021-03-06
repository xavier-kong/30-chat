import { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const onSubmit = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    onSubmit,
  };
};

export default useField;
