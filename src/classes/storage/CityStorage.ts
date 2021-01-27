import Storage from '@/classes/storage/Storage';
import { TWeather } from '@/types/api/weather';

enum Fields {
  CITIES = 'cities'
}

const parseCities = (jsonCities: string | null) => {
  if (!jsonCities) {
    return [];
  }

  try {
    return JSON.parse(jsonCities);
  } catch (e) {
    return [];
  }
};

export default class CityStorage extends Storage<Fields> {
  public setCities(cities: Array<TWeather>): void {
    const preparedCities = cities.map(({ name }) => name);
    this.set(Fields.CITIES, JSON.stringify(preparedCities));
  }

  public getCities(): Array<string> {
    return parseCities(this.get(Fields.CITIES));
  }
}
