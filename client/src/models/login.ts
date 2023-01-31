export interface LoginInputFormType {
  password: {
    value: string;
    isValid: boolean | undefined;
    regex: RegExp;
    errorMessage: string;
  };
  email: {
    value: string;
    isValid: boolean | undefined;
    regex: RegExp;
    errorMessage: string;
  };
}
