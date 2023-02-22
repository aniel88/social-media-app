export const convertMySqlBoolean = (booleanVariable: string) => {
  if (booleanVariable === "yes") return true;
  return false;
};
