<template>
  <picture class="my-image" v-bind="{ style }">
    <img v-if="src" v-bind="{ src }" />
  </picture>
</template>

<script>
import { computed } from "vue";
const VALID_UNITS = ["px", "rem", "em", "%"];

const isValid = (value) => {
  if (!isNaN(value)) return value >= 0;
  const number = Number.parseFloat(value);
  const units = value.replace(number, "");
  if (units === "%") return number >= 0 && number <= 100;
  if (units === "auto") return isNaN(number);
  return number >= 0 && VALID_UNITS.includes(units);
};

export default {
  name: "MyImage",
  props: {
    src: {
      type: String,
      default: "",
    },
    width: {
      type: [Number, String],
      default: 0,
      validator: isValid,
    },
    height: {
      type: [Number, String],
      default: "auto",
      validator: isValid,
    },
  },
  setup(props) {
    const getValue = (val) => (isNaN(val) ? val : `${val}px`);

    const style = computed(() => ({
      width: getValue(props.width),
      minWidth: getValue(props.width),
      height: getValue(props.height),
    }));

    return { style };
  },
};
</script>

<style lang="scss" scoped>
picture {
  display: flex;
  background-image: url("../../assets/no-photo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fafafa;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
