import { useState } from "react";

export const useInput = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange };
};
