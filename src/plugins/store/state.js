export const State = Object.freeze({
  LOADING: "loading",
  CONFIG: "config",
});

export default () => ({
  [State.LOADING]: false,
  [State.CONFIG]: null,
});
