import MyPagination from "@/components/global/Pagination.vue";
import { shallowMount, mount } from "@vue/test-utils";

describe("Pagination.vue", () => {
  let wrapper;
  const min = 1;
  const max = 100;
  const modelValue = 1;

  beforeEach(() => {
    wrapper = mount(MyPagination, { props: { min, max, modelValue } });
  });

  it("renders default slot", () => {
    expect(wrapper.text()).toBe(`${modelValue} / ${max}`);
  });

  it("renders custom default slot", () => {
    const text = "Hello World!";
    wrapper = shallowMount(MyPagination, {
      slots: { default: text },
      props: { modelValue },
    });

    expect(wrapper.text()).toBe(text);
  });

  it("disable buttons properly", async () => {
    const firstButton = wrapper.find(".my-button--first");
    const prevButton = wrapper.find(".my-button--prev");
    const nextButton = wrapper.find(".my-button--next");
    const lastButton = wrapper.find(".my-button--last");

    expect(firstButton.attributes("disabled")).not.toBeUndefined();
    expect(prevButton.attributes("disabled")).not.toBeUndefined();
    expect(nextButton.attributes("disabled")).toBeUndefined();
    expect(lastButton.attributes("disabled")).toBeUndefined();

    await wrapper.setProps({ modelValue: modelValue + 1 });

    expect(firstButton.attributes("disabled")).toBeUndefined();
    expect(prevButton.attributes("disabled")).toBeUndefined();
    expect(nextButton.attributes("disabled")).toBeUndefined();
    expect(lastButton.attributes("disabled")).toBeUndefined();

    await wrapper.setProps({ modelValue: max });

    expect(firstButton.attributes("disabled")).toBeUndefined();
    expect(prevButton.attributes("disabled")).toBeUndefined();
    expect(nextButton.attributes("disabled")).not.toBeUndefined();
    expect(lastButton.attributes("disabled")).not.toBeUndefined();
  });

  it("triggers first click", async () => {
    const button = wrapper.find(".my-button--first");

    await button.trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();

    await wrapper.setProps({ modelValue: 50 });

    await button.trigger("click");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    const [[value]] = wrapper.emitted("update:modelValue");
    expect(value).toBe(min);
  });

  it("triggers previous click", async () => {
    const button = wrapper.find(".my-button--prev");

    await button.trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();

    await wrapper.setProps({ modelValue: max });

    await button.trigger("click");
    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    const [[value]] = wrapper.emitted("update:modelValue");
    expect(value).toBe(max - 1);
  });

  it("triggers next click", async () => {
    const button = wrapper.find(".my-button--next");

    await button.trigger("click");

    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    const [[value]] = wrapper.emitted("update:modelValue");
    expect(value).toBe(modelValue + 1);

    await wrapper.setProps({ modelValue: max });

    expect(wrapper.emitted("update:modelValue").length).toBe(1);
  });

  it("triggers last click", async () => {
    const button = wrapper.find(".my-button--last");

    await button.trigger("click");

    expect(wrapper.emitted("update:modelValue").length).toBe(1);
    const [[value]] = wrapper.emitted("update:modelValue");
    expect(value).toBe(max);

    await wrapper.setProps({ modelValue: max });

    expect(wrapper.emitted("update:modelValue").length).toBe(1);
  });
});
