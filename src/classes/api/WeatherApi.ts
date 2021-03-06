import { AxiosRequestConfig } from 'axios';
import { TWeather } from '@/types/api/weather';
import { WEATHER_API_URL } from '@/constants';
import { merge } from 'lodash';
import HttpClient from './HttpClient';

export default class WeatherApi extends HttpClient {
  constructor() {
    super(WEATHER_API_URL);
  }

  public getWeather(config: AxiosRequestConfig = {}) {
    return this.request<TWeather>(merge(config, {
      params: { units: 'metric' },
    }));
  }

  public request<T>(config: AxiosRequestConfig = {}): Promise<T> {
    return this.instance.request(merge(config, {
      params: { APPID: process.env.VUE_APP_WEATHER_API_APPID },
    }));
  }
}
