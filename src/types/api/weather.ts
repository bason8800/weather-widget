type TWeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

type TMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

type TSys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

type TCoord = {
  lon: number;
  lat: number;
}

type TClouds = {
  all: number;
}

type TWind = {
  speed: number;
  deg: number;
}

export type TWeather = {
  main: TMain;
  weather: Array<TWeatherItem>;
  sys: TSys;
  coord: TCoord;
  clouds: TClouds;
  wind: TWind;
  base: string;
  visibility: number;
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
