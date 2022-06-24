export const ImageType = Object.freeze({
  HORIZONTAL: "backdrop",
  VERTICAL: "poster",
});

export const ApiSize = Object.freeze({
  [ImageType.HORIZONTAL]: "w780",
  [ImageType.VERTICAL]: "w342",
});

export const WebSizes = Object.freeze({
  [ImageType.HORIZONTAL]: Object.freeze({
    width: 245,
    height: 138,
  }),
  [ImageType.VERTICAL]: Object.freeze({
    width: 90,
    height: 137,
  }),
});

export const CAST_LIMIT = 10;

export const RECOMMENDATIONS_LIMIT = 10;
