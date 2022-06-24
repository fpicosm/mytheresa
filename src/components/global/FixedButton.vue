<template>
  <my-button
    v-bind="attrs"
    class="my-button--fixed"
    :class="`my-button--fixed-${x} my-button--fixed-${y}`"
    round
  ></my-button>
</template>

<script>
import { omit } from "lodash";
import { computed } from "vue";
import MyButton from "./Button";

const AllowedPosition = Object.freeze({
  X: ["left", "right"],
  Y: ["top", "bottom"],
});

export default {
  extends: MyButton,
  props: {
    size: {
      type: String,
      default: "3.5em",
    },
    position: {
      type: Array,
      default: () => ["bottom", "right"],
      validator: ([y, x]) => {
        return AllowedPosition.X.includes(x) && AllowedPosition.Y.includes(y);
      },
    },
  },
  setup(props, ctx) {
    const attrs = computed(() => {
      const $props = omit(props, ["position"]);
      return { ...$props, ...ctx.attrs };
    });

    const pos = computed(() => props.position);
    const [x, y] = pos.value;
    return { attrs, x, y };
  },
};
</script>

<style lang="scss">
.my-button--fixed {
  position: fixed;
  z-index: 999999;
  margin: 1.5rem;

  &-top {
    top: 0;
  }

  &-bottom {
    bottom: 0;
  }

  &-left {
    left: 0;
  }

  &-right {
    right: 0;
  }

  box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024, 0 3px 1px -2px #0000001f;
}
</style>
