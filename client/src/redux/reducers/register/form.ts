import { LoginInputFormType } from "../../../models/login";
import { RegisterInputFormType } from "../../../models/register";

interface Action {
  type: string;
  value: string;
  valid?: boolean;
  customErrorMessage?: string;
}

const inputFormReducer = (
  state: RegisterInputFormType | LoginInputFormType,
  action: Action
) => {
  const { value, type, valid, customErrorMessage } = action;
  let { regex, errorMessage } = state[type as keyof typeof state];
  const valueIsMatching = valid === undefined ? regex.test(value) : valid;
  errorMessage = customErrorMessage ? customErrorMessage : errorMessage;

  return {
    ...state,
    [type]: {
      value: value,
      isValid: valueIsMatching,
      regex: regex,
      errorMessage: errorMessage,
    },
  };
};

export { inputFormReducer, Action };
