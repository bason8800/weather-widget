<template>
  <div class="weather-widget-list">
    <div v-if="!list.length" class="weather-widget-list__empty">
      List is empty
    </div>

    <template v-else>
      <Widget
        v-for="item in list"
        :key="item.id"
        class="weather-widget-list__item"
        :data="item"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TWeather } from '@/types/api/weather';
import Widget from './Widget.vue';

export default defineComponent({
  name: 'WeatherWidgetList',
  props: {
    list: {
      type: Array as PropType<Array<TWeather>>,
      required: true,
    },
  },
  components: {
    Widget,
  },
});
</script>

<style lang="scss">
.weather-widget-list {
  &__item:not(:last-child) {
    margin-bottom: 20px;
  }

  &__empty {
    font-weight: bold;
  }
}
</style>
