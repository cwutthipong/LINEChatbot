exports.v1 = (text, quoteToken) => {
  return {
    type: "text",
    text,
    ...(quoteToken && { quoteToken }),
  };
};
