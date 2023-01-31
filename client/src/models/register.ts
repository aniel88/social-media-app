export interface RegisterType {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface RegisterInputFormType {
  firstName: {
    value: string;
    isValid: boolean | undefined;
    regex: RegExp;
    errorMessage: string;
  };
  lastName: {
    value: string;
    isValid: boolean | undefined;
    regex: RegExp;
    errorMessage: string;
  };
  userName: {
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
  password: {
    value: string;
    isValid: boolean | undefined;
    regex: RegExp;
    errorMessage: string;
  };
}
