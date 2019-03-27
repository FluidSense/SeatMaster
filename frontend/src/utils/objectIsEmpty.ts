const isEmpty = (object?: any) => {
  if (!object) return true;
  return !(Object.entries(object).length > 0);
};

export default isEmpty;
