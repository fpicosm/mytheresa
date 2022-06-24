<template>
  <span class="my-tag" v-bind="{ style }">
    <slot>
      {{ label }}
    </slot>
  </span>
</template>

<script>
import { getColor } from "@/utils/tailwind";

export default {
  name: "MyTag",
  props: {
    label: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "primary",
    },
    textColor: {
      type: String,
      default: "white",
    },
  },
  setup(props) {
    const style = {
      backgroundColor: getColor(props.color),
      color: getColor(props.textColor),
    };

    return { style };
  },
};
</script>

<style lang="scss">
.my-tag {
  padding: 0.3rem 0.6rem;
  font-size: 0.8em;
  white-space: nowrap;
  border-radius: 0.5em;
}
</style>
