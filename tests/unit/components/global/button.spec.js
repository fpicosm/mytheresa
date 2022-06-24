import { shallowMount } from "@vue/test-utils";
import MyButton from "@/components/global/Button.vue";

const Color = Object.freeze({
  Test: Object.freeze({
    RGB: "rgb(239, 68, 68)",
    NAME: "red-500",
  }),
  WHITE: "rgb(255, 255, 255)",
  BLACK: "rgb(0, 0, 0)",
});

describe("Button.vue", () => {
  it("renders props.label when passed", async () => {
    const wrapper = shallowMount(MyButton);
    expect(wrapper.find("span").exists()).toBeFalsy();

    const label = "Hello World";
    await wrapper.setProps({ label });

    expect(wrapper.find("span").exists()).toBeTruthy();
    expect(wrapper.text()).toBe(label);
  });

  it("renders props.color properly", () => {
    const wrapper = shallowMount(MyButton, {
      props: { color: Color.Test.NAME },
    });

    const bgColor = getComputedStyle(wrapper.element).backgroundColor;
    expect(bgColor).toMatch(Color.Test.RGB);
  });

  it("renders props.icon properly", async () => {
    const wrapper = shallowMount(MyButton);
    expect(wrapper.find("i").exists()).toBeFalsy();

    const iconName = "fa-solid fa-house";
    await wrapper.setProps({ icon: iconName });

    const icon = wrapper.find("i");
    expect(icon.exists()).toBeTruthy();
    expect(icon.classes().join(" ")).toBe(iconName);
  });

  it("renders props.round properly", async () => {
    const wrapper = shallowMount(MyButton);
    expect(wrapper.classes()).not.toContain("round");

    const size = "3em";
    await wrapper.setProps({ round: true, size });
    expect(wrapper.classes()).toContain("round");
  });

  it("renders props.light properly", async () => {
    const getColor = () => getComputedStyle(wrapper.element)?.color;

    const wrapper = shallowMount(MyButton);
    expect(getColor()).toBe(Color.WHITE);
    await wrapper.setProps({ light: true });
    expect(getColor()).toBe(Color.BLACK);
  });

  it("renders props.inverted properly", async () => {
    const getProp = (prop) => getComputedStyle(wrapper.element)?.[prop];

    const wrapper = shallowMount(MyButton, {
      props: { color: Color.Test.NAME },
    });

    expect(getProp("backgroundColor")).toBe(Color.Test.RGB);
    await wrapper.setProps({ inverted: true });

    expect(getProp("backgroundColor")).toBe("transparent");
    expect(getProp("color")).toBe(Color.Test.RGB);
  });

  it("renders props.caseSensitive properly", async () => {
    const wrapper = shallowMount(MyButton);
    expect(wrapper.classes()).toContain("uppercase");

    await wrapper.setProps({ caseSensitive: true });
    expect(wrapper.classes()).not.toContain("uppercase");
  });

  it("renders props.size properly", () => {
    const size = "3em";
    const wrapper = shallowMount(MyButton, {
      props: { round: true, size },
    });

    const styles = getComputedStyle(wrapper.element);
    const props = ["minWidth", "maxWidth", "minHeight", "maxHeight"];
    expect(props.every((p) => styles[p] === size)).toBeTruthy();
  });
});
