import { ReactNode, createContext, useContext, useState } from 'react';
import deepmerge from 'deepmerge';

const FormContext = createContext({});

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState({});

  const update = (newData: typeof formData) => {
    setFormData((prevData) => deepmerge(prevData, newData));
  };

  const reset = () => {
    setFormData({});
  };

  return (
    <FormContext.Provider value={{ formData, update, reset }}>
      {children}
    </FormContext.Provider>
  );
};
