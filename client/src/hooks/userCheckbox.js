import { useState } from 'react';

const useCheckbox = (type) => {
  const [value, setValue] = useState(false);

  const onChange = (event) => {
    setValue(!value);
  };

  const onSubmit = (event) => {
    setValue(false);
  };

  return {
    type,
    value,
    onChange,
    onSubmit,
  };
};

export default useCheckbox;
