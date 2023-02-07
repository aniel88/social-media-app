/* Loading status on create account */
export const selectLoadingStatusCreateAccount = (state: any) =>
  state.register.isLoading;

/* Loading status on login */
export const selectLoadingStatusLogin = (state: any) => state.login.isLoading;

/* Error messge on login */
export const errorMessageLogin = (state: any) => state.login.errorMessage;
