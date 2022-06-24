<template>
  <button
    class="my-button"
    v-bind="{ style }"
    :class="[{ round, light }, { uppercase: !caseSensitive }]"
    @mouseup.left="$el.blur"
  >
    <slot>
      <template v-if="icon">
        <i :class="icon"></i>
      </template>

      <span v-if="label" v-text="label"></span>
    </slot>
  </button>
</template>

<script>
import { computed } from "vue";
import { getColor } from "@/utils/tailwind";

export default {
  name: "MyButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "primary",
    },
    icon: {
      type: String,
      default: "",
    },
    round: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
    caseSensitive: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "2.5em",
    },
    type: {
      type: String,
      default: "search",
      validator: (type) => ["search", "submit", "reset"].includes(type),
    },
  },
  setup(props) {
    const style = computed(() => {
      const backgroundColor = (() => {
        const name = props.inverted ? "transparent" : props.color;
        return getColor(name);
      })();

      const color = (() => {
        if (props.inverted) return getColor(props.color);
        return getColor(props.light ? "black" : "white");
      })();

      const size = props.round && {
        minWidth: props.size,
        maxWidth: props.size,
        minHeight: props.size,
        maxHeight: props.size,
      };

      return { backgroundColor, color, ...size };
    });

    return { style };
  },
};
</script>

<style lang="scss">
.my-button {
  position: relative;
  outline: 0;
  padding: 0.5em 1em;
  overflow: hidden;
  color: white;
  font-weight: 400;

  &.uppercase {
    text-transform: uppercase;
  }

  &.light {
    color: black;
  }

  &.round {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:not(:disabled) {
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: currentColor;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:hover::before {
      opacity: 0.1;
    }

    &:focus::before {
      opacity: 0.15;
    }

    &:active::before {
      opacity: 0.25;
    }
  }
}
</style>
