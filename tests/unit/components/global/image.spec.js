import MyImage from "@/components/global/Image.vue";
import { shallowMount } from "@vue/test-utils";

const TEST_URL = "https://www.google.com";

const VALID_SIZES = [
  0,
  "0rem",
  "0em",
  "0px",
  "0%",
  100,
  "100rem",
  "100em",
  "100px",
  "100%",
  "auto",
];

const INVALID_SIZES = [
  -1,
  "-1rem",
  "-1em",
  "-1px",
  "-1%",
  "101%",
  "0auto",
  "100pt",
  "100cm",
  "100in",
  "100vw",
  "100vh",
  "100vmin",
  "100vmax",
  "100ch",
  "100ex",
];

describe("Image.vue", () => {
  it("renders img when props.src is passed", async () => {
    const wrapper = shallowMount(MyImage);

    expect(wrapper.find("img").exists()).toBeFalsy();
    await wrapper.setProps({ src: TEST_URL });
    expect(wrapper.find("img").exists()).toBeTruthy();
  });

  it("validates props.width and props.height", () => {
    const { validator } = MyImage.props.width;

    expect(VALID_SIZES.every(validator)).toBeTruthy();
    expect(INVALID_SIZES.every(validator)).toBeFalsy();
  });

  it("renders props.width properly", async () => {
    const getValue = (prop) => getComputedStyle(wrapper.element)[prop];

    const wrapper = shallowMount(MyImage);

    expect(getValue("width")).toBe("0px");
    expect(getValue("minWidth")).toBe("0px");

    await wrapper.setProps({ width: 500 });
    expect(getValue("width")).toBe("500px");
    expect(getValue("minWidth")).toBe("500px");

    await wrapper.setProps({ width: "2rem" });
    expect(getValue("width")).toBe("2rem");
    expect(getValue("minWidth")).toBe("2rem");
  });

  it("renders props.height properly", async () => {
    const getHeight = () => getComputedStyle(wrapper.element).height;

    const wrapper = shallowMount(MyImage);
    expect(getHeight()).toBe("auto");

    await wrapper.setProps({ height: 500 });
    expect(getHeight()).toBe("500px");

    await wrapper.setProps({ height: "2rem" });
    expect(getHeight()).toBe("2rem");
  });
});
