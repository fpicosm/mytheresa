import { shallowMount } from "@vue/test-utils";
import MyTag from "@/components/global/Tag.vue";

const Color = Object.freeze({
  Test: Object.freeze({
    RGB: "rgb(239, 68, 68)",
    NAME: "red-500",
  }),
  WHITE: "rgb(255, 255, 255)",
  BLACK: "rgb(0, 0, 0)",
});

describe("Tag.vue", () => {
  it("renders default slot", async () => {
    const label = "hello-world";
    const wrapper = shallowMount(MyTag, { props: { label } });

    expect(wrapper.text()).toBe(label);
  });

  it("renders custom default slot", async () => {
    const label = "hello-world";
    const text = "custom-text";

    const wrapper = shallowMount(MyTag, {
      slots: { default: text },
      props: { label },
    });

    expect(wrapper.text()).toBe(text);
  });

  it("renders props.color properly", async () => {
    const wrapper = shallowMount(MyTag, { props: { color: Color.Test.NAME } });

    const { backgroundColor } = getComputedStyle(wrapper.element);
    expect(backgroundColor).toBe(Color.Test.RGB);
  });

  it("renders props.textColor properly", async () => {
    const wrapper = shallowMount(MyTag, {
      props: { textColor: Color.Test.NAME },
    });

    const { color } = getComputedStyle(wrapper.element);
    expect(color).toBe(Color.Test.RGB);
  });
});
