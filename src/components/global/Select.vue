<template>
  <label class="my-select" :class="[classList, { focused }]">
    <template v-if="placeholder">
      <span
        v-show="!modelValue"
        class="my-select__placeholder"
        v-text="placeholder"
      ></span>
    </template>

    <select ref="select" :value="modelValue" v-bind="$attrs" @input="onInput">
      <option v-if="clearable" value=""></option>
      <template v-for="(option, index) in options" :key="index">
        <option :value="getValue(option)" v-text="getLabel(option)"></option>
      </template>
    </select>

    <div class="my-select__icons">
      <template v-if="clearable">
        <i
          v-show="modelValue"
          :class="clearIcon"
          @click="$emit('update:modelValue', null)"
        ></i>
      </template>

      <i class="arrow-icon" :class="arrowIcon"></i>
    </div>
  </label>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

export default {
  name: "MySelect",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object, null],
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    optionValue: {
      type: [Function, String],
      default: "id",
    },
    optionLabel: {
      type: [Function, String],
      default: "label",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    clearIcon: {
      type: String,
      default: "fa-solid fa-xmark",
    },
    arrowIcon: {
      type: String,
      default: "fa-solid fa-chevron-down",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "input"],
  setup(props, ctx) {
    const focused = ref(false);
    const select = ref();
    const classList = computed(() => {
      const { class: classNames } = ctx.attrs;
      return classNames;
    });

    const onInput = (e) => {
      const { value } = e.target;
      ctx.emit("update:modelValue", value);
      ctx.emit("input", value);
    };

    const onClick = (ev) => {
      if (!select.value.contains(ev.target)) focused.value = false;
      else focused.value = !focused.value;
    };

    onMounted(() => {
      window.addEventListener("click", onClick);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("click", onClick);
    });

    const getProp = (prop) => (option) => {
      return typeof prop === "string" ? option[prop] : prop(option);
    };

    return {
      select,
      focused,
      classList,
      onInput,
      getValue: getProp(props.optionValue),
      getLabel: getProp(props.optionLabel),
    };
  },
};
</script>

<style lang="scss">
$padding: 0.5rem;

.my-select {
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  color: initial;
  position: relative;
  border-width: 1px;
  transition: border-color 0.3s;

  &:hover {
    border-color: initial;
  }

  &__placeholder {
    margin-left: $padding;
    position: absolute;
    opacity: 0.3;
    left: 0.25rem;
  }

  select {
    z-index: 1;
    padding: $padding (1.5 * $padding);
    background: transparent;
    width: 100%;
    outline: 3px solid transparent;
    outline-offset: -2px;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:focus {
      outline-color: initial;
    }
  }

  &__icons {
    position: absolute;
    right: 0;
    z-index: 1;

    i {
      margin-right: $padding;
    }
  }
}
</style>
