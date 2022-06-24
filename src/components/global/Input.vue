<template>
  <label class="my-input" :class="classList">
    <slot name="before">
      <template v-if="icon">
        <i :class="icon"></i>
      </template>
    </slot>

    <input
      ref="input"
      :value="modelValue"
      v-bind="attrs"
      @input="($ev) => onInput($ev.target.value)"
    />

    <slot name="after">
      <template v-if="clearable">
        <i
          class="fa-lg cursor-pointer"
          :class="[clearIcon, { invisible: !modelValue }]"
          @click="$emit('update:modelValue', '')"
        ></i>
      </template>
    </slot>
  </label>
</template>

<script>
import { omit } from "lodash";
import { computed, ref } from "vue";

const VALID_TYPES = [
  "email",
  "number",
  "password",
  "search",
  "tel",
  "text",
  "url",
];

let INPUT_TIMEOUT;

export default {
  name: "MyInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: "text",
      validator: (type) => VALID_TYPES.includes(type),
    },
    icon: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: (ctx) => ctx.type === "search",
    },
    clearIcon: {
      type: String,
      default: "fa-solid fa-xmark",
    },
    debounce: {
      type: [String, Number],
      default: (ctx) => (ctx.type === "search" ? 500 : 0),
    },
  },
  emits: ["update:modelValue", "input"],
  setup(props, ctx) {
    const attrs = computed(() => {
      const { type } = props;
      return { ...omit(ctx.attrs, ["class"]), type };
    });

    const classList = computed(() => {
      const { class: classNames } = ctx.attrs;
      return classNames;
    });

    const onInput = (value) => {
      clearTimeout(INPUT_TIMEOUT);
      INPUT_TIMEOUT = setTimeout(() => {
        ctx.emit("update:modelValue", value);
        ctx.emit("input", value);
      }, props.debounce);
    };

    const input = ref();
    const focus = () => input.value.focus();

    return { attrs, classList, onInput, input, focus };
  },
};
</script>

<style lang="scss">
$padding: 0.5rem;

.my-input {
  display: flex;
  align-items: center;
  background: white;
  color: initial;
  position: relative;
  width: 100%;

  i {
    margin-right: $padding;
  }

  input {
    background: transparent;
    outline: 0;
    width: 100%;
    padding: $padding;

    &[type="search"] {
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
    }
  }
}
</style>
