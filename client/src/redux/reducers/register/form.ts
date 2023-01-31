import { LoginInputFormType } from "../../../models/login";
import { RegisterInputFormType } from "../../../models/register";

interface Action {
  type: string;
  value: string;
}

const inputFormReducer = (
  state: RegisterInputFormType | LoginInputFormType,
  action: Action
) => {
  const { value, type } = action;
  const { regex, errorMessage } = state[type as keyof typeof state];
  const valueIsMatching = regex.test(value);

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
