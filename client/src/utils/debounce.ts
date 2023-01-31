import { debounce } from "lodash";

export const debounceHandler = (handleFunction: any, waitTime: number) => {
  return debounce(handleFunction, waitTime);
};

export const debounceWaitTime = 500;
