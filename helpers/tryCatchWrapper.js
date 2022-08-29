const tryCatchWrapper = (fn) => {
  return async function(...args) {
    try {
      return await fn(...args);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = tryCatchWrapper;
