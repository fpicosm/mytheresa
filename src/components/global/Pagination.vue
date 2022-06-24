<template>
  <div class="my-pagination">
    <my-button
      class="my-button--first"
      :disabled="modelValue === min"
      icon="fa-solid fa-angles-left"
      inverted
      round
      @click="goFirst"
    />

    <my-button
      class="my-button--prev"
      :disabled="modelValue === min"
      icon="fa-solid fa-angle-left"
      inverted
      round
      @click="goPrev"
    />

    <slot>
      <span v-text="`${modelValue} / ${max}`"></span>
    </slot>

    <my-button
      class="my-button--next"
      :disabled="modelValue === max"
      icon="fa-solid fa-angle-right"
      inverted
      round
      @click="goNext"
    />

    <my-button
      class="my-button--last"
      :disabled="modelValue === max"
      icon="fa-solid fa-angles-right"
      inverted
      round
      @click="goLast"
    />
  </div>
</template>

<script>
import MyButton from "./Button.vue";

export default {
  name: "MyPagination",
  components: {
    MyButton,
  },
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  emits: ["update:modelValue", "input"],
  setup(props, ctx) {
    const update = (value) => {
      ctx.emit("update:modelValue", value);
      ctx.emit("input", value);
    };

    return {
      goFirst: () => update(props.min),
      goPrev: () => {
        const value = Math.max(props.min, props.modelValue - 1);
        update(value);
      },
      goNext: () => {
        const value = Math.min(props.max, props.modelValue + 1);
        update(value);
      },
      goLast: () => update(props.max),
    };
  },
};
</script>

<style lang="scss">
.my-pagination {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  span {
    padding: 0 0.5rem;
  }
}
</style>
