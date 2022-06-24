import MyFixedButton from "@/components/global/FixedButton.vue";

const VALID_POSITIONS = [
  ["top", "left"],
  ["top", "right"],
  ["bottom", "left"],
  ["bottom", "right"],
];

const INVALID_POSITIONS = [
  ["left", "top"],
  ["right", "top"],
  ["left", "bottom"],
  ["right", "bottom"],
  ["top", "center"],
  ["center", "top"],
  ["middle", "center"],
  ["center", "middle"],
  ["middle", "left"],
  ["middle", "right"],
  ["middle", "center"],
  ["left", "middle"],
  ["right", "middle"],
  ["center", "middle"],
];

describe("FixedButton.vue", () => {
  it("validates props.position", () => {
    const { validator } = MyFixedButton.props.position;

    expect(VALID_POSITIONS.every(validator)).toBeTruthy();
    expect(INVALID_POSITIONS.every(validator)).toBeFalsy();
  });
});
