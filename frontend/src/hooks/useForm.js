import { useCallback, useState } from 'react';

export function useForm(initialState) {
  const [formState, setFormState] = useState(initialState);

  const handleChange = ({ target }) => {
    let { value, name: field, type } = target;
    if (type === 'number') {
      value = +value;
    } else if (type === 'checkbox') {
      value = target.checked;
    }
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  /* Returns an object with all the input attributes needed for two way data binding. */
  const register = useCallback(
    (fieldname) => {
      return {
        name: fieldname,
        value: formState[fieldname] ?? '',
        onChange: handleChange,
      };
    },
    [formState]
  );

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, []);

  return {
    formState,
    setFormState,
    register,
    resetForm,
  };
}
