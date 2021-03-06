<template>
  <div class="weather-widget">
    <div class="weather-widget__top">
      <div>{{ data.name }}, {{ data.sys.country }}</div>
    </div>

    <div class="weather-widget__main">
      <img :src="imagePath" alt="" />
      {{ data.main.temp }}&#8451;
    </div>

    <div class="weather-widget__info">
      <div class="weather-widget__info-description">
        Feels like {{ data.main.feels_like }}&#8451;.
        {{ weatherInfo.main }}, {{ weatherInfo.description }}
      </div>

      <div class="weather-widget__info-list">
        <div class="weather-widget__info-item has-icon is-wind">
          {{ data.wind.speed }}m/s SSE
        </div>
        <div class="weather-widget__info-item has-icon is-pressure">
          {{ data.main.pressure }}hPa
        </div>
        <div class="weather-widget__info-item">
          Humidity: {{ data.main.humidity }}%
        </div>
        <div class="weather-widget__info-item">
          Visibility: {{ visibility }}km
        </div>
        <div class="weather-widget__info-item"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { TWeather } from '@/types/api/weather';
import { WEATHER_ICON_URL } from '@/constants';

type TWidgetProps = {
  data: TWeather;
}

export default defineComponent({
  name: 'WeatherWidget',
  props: {
    data: {
      type: Object as PropType<TWeather>,
      required: true,
    },
  },
  setup(props: TWidgetProps) {
    const weatherInfo = computed(() => props.data?.weather[0]);

    const imagePath = computed(() => {
      if (weatherInfo.value) {
        return `${WEATHER_ICON_URL}/${weatherInfo.value.icon}@2x.png`;
      }

      return '';
    });

    const visibility = computed(() => props.data.visibility / 1000);

    return {
      imagePath,
      weatherInfo,
      visibility,
    };
  },
});
</script>

<style lang="scss">
.weather-widget {
  &__main {
    display: flex;
    align-items: center;
    height: 100px;
    font-size: 30px;
    font-weight: bold;
  }

  &__info-description {
    margin-bottom: 15px;
  }

  &__info-list {
    display: flex;
    flex-wrap: wrap;
  }

  &__info-item {
    width: 50%;
    margin-bottom: 15px;

    &.has-icon {
      display: flex;
      align-self: center;

      &::before {
        position: relative;
        top: -2px;
        display: inline-block;
        margin-right: 4px;
        content: "";
        background-size: contain;
      }
    }

    &.is-wind {
      &::before {
        width: 20px;
        height: 20px;
        background-image: url("~@/assets/svg/wind.svg");
      }
    }

    &.is-pressure {
      &::before {
        width: 20px;
        height: 20px;
        background-image: url("~@/assets/svg/pressure.svg");
      }
    }
  }
}
</style>
