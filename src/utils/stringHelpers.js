export const randomStringGenerator = (length = 6) => {
  return (Math.random() + 1).toString(36).substr(2, length);
};

export default {
  randomStringGenerator,
};
