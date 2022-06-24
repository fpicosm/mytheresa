export const ImageType = Object.freeze({
  VERTICAL: "profile",
});

export const ApiSize = Object.freeze({
  [ImageType.VERTICAL]: "w185",
});

export const WebSizes = Object.freeze({
  [ImageType.VERTICAL]: Object.freeze({
    width: 116,
    height: 175,
  }),
});
