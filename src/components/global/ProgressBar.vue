<template>
  <div class="my-progress-bar">
    <span class="my-progress-bar__label">
      <slot name="label">
        <template v-if="label">
          {{ label }}
        </template>
      </slot>
    </span>

    <div
      class="my-progress-bar__track"
      :style="{ width, height, color: backgroundColor }"
    >
      <div class="my-progress-bar__value" :style="{ width: `${value}%` }"></div>
    </div>
  </div>
</template>

<script>
import { getColor } from "@/utils/tailwind";
import { ref } from "vue";

export default {
  name: "MyProgressBar",
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    label: {
      type: [String, Number],
      default: "",
    },
    height: {
      type: String,
      default: "10px",
    },
    width: {
      type: String,
      default: "200px",
    },
    color: {
      type: String,
      default: "primary",
    },
  },
  setup(props) {
    const backgroundColor = ref(getColor(props.color));
    return { backgroundColor };
  },
};
</script>

<style lang="scss">
.my-progress-bar {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__track {
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: currentColor;
      opacity: 0.3;
      z-index: -1;
    }
  }

  &__value {
    height: 100%;
    background-color: currentColor;
  }
}
</style>
