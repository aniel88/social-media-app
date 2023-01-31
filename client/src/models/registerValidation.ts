export interface RegisterValidation {
  firstName: {
    regex: string;
    isValid: boolean;
  };
  lastName: {
    regex: string;
    isValid: boolean;
  };
  userName: {
    regex: string;
    isValid: boolean;
  };
  email: {
    regex: string;
    isValid: boolean;
  };
  password: {
    regex: string;
    isValid: boolean;
  };
}
