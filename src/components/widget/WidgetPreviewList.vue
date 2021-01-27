<template>
  <draggable
    tag="div"
    class="widget-preview-list"
    handle=".widget-preview__drag"
    item-key="name"
    :list="list"
    @end="$emit('dragend')"
  >
    <template #item="{ element }">
      <WidgetPreview
        class="widget-preview-list__item"
        :name="element.name"
        :id="element.id"
        @delete="id => $emit('delete', id)"
      />
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import draggable from 'vuedraggable';

import { TWeather } from '@/types/api/weather';
import WidgetPreview from './WidgetPreview.vue';

export default defineComponent({
  name: 'WidgetPreviewList',
  components: {
    draggable,
    WidgetPreview,
  },
  props: {
    list: {
      type: Array as PropType<Array<TWeather>>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss">
.widget-preview-list {
  &__item:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
