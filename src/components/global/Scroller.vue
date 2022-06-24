<template>
  <section class="my-scroller">
    <h3 v-if="title" v-text="title"></h3>

    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "MyScroller",
  props: {
    title: { type: String, default: "" },
  },
};
</script>

<style lang="scss">
.my-scroller {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;

  .content {
    display: flex;
    flex-wrap: nowrap;
    column-gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
}
</style>
