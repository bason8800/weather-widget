<template>
  <div class="widget-settings">
    <div class="widget-settings__top">
      Settings

      <img
        class="widget-settings__close"
        src="@/assets/svg/close.svg"
        @click="$emit('close')"
      />
    </div>

    <WidgetPreviewList
      class="widget-settings__list"
      :list="list"
      @delete="id => $emit('delete', id)"
      @dragend="$emit('dragend')"
    />

    <BaseLoader
      v-if="showLoader"
      class="widget-settings__loader"
    />

    <BaseInput
      v-else
      v-model="city"
      label="Add Location:"
      :error-message="errorMessage"
      @keyup.enter="onAddCity"
    >
      <template #postfix>
        <img
          class="widget-settings__enter"
          src="@/assets/svg/enter.svg"
          @click="onAddCity"
        />
      </template>
    </BaseInput>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, PropType, watch,
} from 'vue';

import { TWeather } from '@/types/api/weather';

import WidgetPreviewList from '@/components/widget/WidgetPreviewList.vue';

export default defineComponent({
  name: 'WidgetSettings',
  inheritAttrs: false,
  props: {
    showLoader: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array as PropType<Array<TWeather>>,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  components: {
    WidgetPreviewList,
  },
  setup(props, ctx) {
    const city = ref('');

    const onAddCity = () => {
      if (city.value) {
        ctx.emit('add-city', city.value);
      }
    };

    watch(() => props.list.length, (length, prevLength) => {
      if (length > prevLength) {
        city.value = '';
      }
    });

    return {
      city,
      onAddCity,
    };
  },
});
</script>

<style lang="scss">
.widget-settings {
  &__top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__close {
    width: 15px;
    margin-left: auto;
    cursor: pointer;
  }

  &__list {
    margin-bottom: 20px;
  }

  &__enter {
    width: 40px;
    cursor: pointer;
  }

  &__loader {
    margin: 0 auto;
  }
}
</style>
