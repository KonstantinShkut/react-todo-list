import React, { useState } from 'react';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
type Returns = [
  string,
  {
    value: string;
    onChange: React.ChangeEventHandler<FormControlElement>
  },
  () => void
];

export const useInput = (initialValue = ''): Returns => {
  const [value, setValue] = useState(initialValue);

  const props = {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
  };

  const reset = () => setValue('');

  return [value, props, reset];
};
