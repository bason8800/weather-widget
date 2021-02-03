<template>
  <div class="widget-preview">
    <img
      class="widget-preview__drag"
      src="@/assets/svg/humburger.svg"
    />

    {{ name }}

    <img
      class="widget-preview__delete"
      src="@/assets/svg/delete.svg"
      @click="$emit('delete', id)"
    />
  </div>
</template>

<script>
export default {
  name: 'WidgetPreview',
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.widget-preview {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 5px 10px;
  background: $color-lavender;

  &__drag {
    width: 20px;
    margin-right: 15px;
    cursor: pointer;
  }

  &__delete {
    width: 20px;
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
