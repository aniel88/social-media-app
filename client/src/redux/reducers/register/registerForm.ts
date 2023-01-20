import { RegisterType } from "../../../models/register";

interface Action {
  type: string;
  value: string;
}

const inputFormReducer = (state: RegisterType, action: Action) => {
  return { ...state, [action.type]: action.value };
};

export { inputFormReducer, Action };
