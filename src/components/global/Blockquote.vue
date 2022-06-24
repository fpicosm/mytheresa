<template>
  <blockquote class="my-blockquote">
    <slot></slot>
  </blockquote>
</template>

<script>
export default {
  name: "MyBlockquote",
};
</script>

<style lang="scss">
.my-blockquote {
  background-color: rgba(#f5f5f4, 0.1);
  padding: 0.25em 0.5em;
  border-left: 0.2em solid #57534e;
  color: #57534e;
  font-style: italic;
  font-size: 0.9em;
}
</style>
