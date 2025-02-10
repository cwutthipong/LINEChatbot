exports.v1 = (packageId, stickerId) => {
  return {
    type: "sticker",
    packageId,
    stickerId,
  };
};
