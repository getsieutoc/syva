import { ReactNode, createContext, useContext, useState } from 'react';
import deepmerge from 'deepmerge';

const FormContext = createContext({});

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData: typeof formData) => {
    setFormData((prevData) => {
      const updatedData = deepmerge(prevData, newData);
      return updatedData;
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
