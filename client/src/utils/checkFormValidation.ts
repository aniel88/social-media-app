const checkFormValidation = (
  formInput: string,
  formId: string,
  stringRegex: string,
  setFormValues: () => void
) => {
  const regex = new RegExp(stringRegex);
  if (regex.test(formInput)) {
    return setFormValues();
  }
  return false;
};

export default checkFormValidation;
