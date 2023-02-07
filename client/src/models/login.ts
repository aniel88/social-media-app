export interface LoginType {
  email: string;
  password: string;
}

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
