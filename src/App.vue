<template>
  <div class="weather-main">
    <BaseLoader v-if="!isAppLoaded" key="loader" />

    <transition v-else appear mode="out-in" name="transition-fade">
      <WidgetSettings
        v-if="showSettings"
        class="weather-main__block-settings"
        :list="weatherList"
        :show-loader="loading"
        :error-message="errorMessage"
        @add-city="onAddCity"
        @close="onToggleSettings"
        @delete="onDelete"
        @dragend="onDragend"
      />

      <div v-else class="weather-main__content">
        <img
          class="weather-main__btn-settings"
          src="@/assets/svg/settings.svg"
          @click="onToggleSettings"
        >

        <WidgetList :list="weatherList" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  defineAsyncComponent,
} from 'vue';

import { TWeather } from '@/types/api/weather';
import { weatherApi } from '@/api';
import { cityStorage } from '@/storage';
import { getGeolocationCoords } from '@/modules/geolocation';

import WidgetList from '@/components/widget/WidgetList.vue';

const WidgetSettings = defineAsyncComponent(
  () => import('@/components/widget/WidgetSettings.vue'),
);

export default defineComponent({
  name: 'App',
  components: {
    WidgetList,
    WidgetSettings,
  },
  setup() {
    const isAppLoaded = ref(false);
    const weatherList = ref([] as Array<TWeather>);
    const showSettings = ref(false);
    const loading = ref(false);
    const errorMessage = ref('');

    const showEmptyList = computed(
      () => !weatherList.value.length && isAppLoaded.value && !showSettings.value,
    );

    const onToggleSettings = () => {
      showSettings.value = !showSettings.value;
    };

    const saveCitiesToStorage = () => {
      cityStorage.setCities(weatherList.value);
    };

    const onDelete = (id: number) => {
      weatherList.value = weatherList.value.filter((item: TWeather) => item.id !== id);
      saveCitiesToStorage();
    };

    const addCityHandler = async (q: string) => {
      const newCityWeather = await weatherApi.getWeather({
        params: { q },
      });

      const isCityAdded = weatherList.value.find((city) => city.id === newCityWeather.id);

      if (isCityAdded) {
        errorMessage.value = `${newCityWeather.name} is already added`;
        return;
      }

      weatherList.value.push(newCityWeather);

      saveCitiesToStorage();
    };

    const onAddCity = async (q: string) => {
      errorMessage.value = '';

      loading.value = true;

      try {
        await addCityHandler(q);
      } catch (e) {
        errorMessage.value = e.response?.data?.message;
      }

      loading.value = false;
    };

    const onDragend = () => {
      saveCitiesToStorage();
    };

    const getRequestsParams = async (): Promise<Array<unknown>> => {
      const requestsParams = [];

      const cities = cityStorage.getCities();

      if (!cities.length) {
        const { latitude, longitude } = await getGeolocationCoords();
        requestsParams.push({ lat: latitude, lon: longitude });
      }

      if (cities.length) {
        cities.forEach((q) => {
          requestsParams.push({ q });
        });
      }

      return requestsParams;
    };

    const fetchData = async () => {
      const requestsParams = await getRequestsParams();
      const promises = requestsParams.map(
        (params: unknown) => weatherApi.getWeather({ params }),
      );

      weatherList.value = await Promise.all(promises);

      isAppLoaded.value = true;
    };

    onMounted(async () => {
      await fetchData();
      saveCitiesToStorage();
    });

    return {
      weatherList,
      isAppLoaded,
      loading,
      errorMessage,
      showSettings,
      showEmptyList,

      onToggleSettings,
      onAddCity,
      onDelete,
      onDragend,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-main;
  margin-top: 60px;
}

.weather-main {
  width: 250px;
  position: relative;

  &__btn-settings {
    width: 25px;
    position: absolute;
    right: 0;
    top: -4px;
    cursor: pointer;
  }

  &__block-settings {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    background: $color-white;
    z-index: 2;
    height: 100%;
  }
}
</style>
