const checkFormSubmission = (objectValues: any) => {
  let isInvalid = false;
  Object.keys(objectValues).every((key) => {
    if (objectValues[key].isValid === undefined) {
      isInvalid = true;
      return false;
    } else if (objectValues[key].isValid === false) {
      isInvalid = true;
      return false;
    } else {
      isInvalid = false;
      return true;
    }
  });

  return isInvalid;
};

export default checkFormSubmission;
