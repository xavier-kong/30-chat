import { useState } from 'react';

const useCheckbox = (type) => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(!checked);
  };

  const onSubmit = (e) => {
    setChecked(false);
  };

  return {
    type,
    checked,
    onChange,
    onSubmit,
  };
};

export default useCheckbox;
