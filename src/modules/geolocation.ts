import { MOSCOW_COORDS } from '@/constants';

type Coords = {
  latitude: number;
  longitude: number;
}

type Position = {
  coords: Coords;
}

export const getGeolocationCoords: () => Promise<Coords> = () => new Promise((resolve) => {
  if (!navigator.geolocation) {
    resolve(MOSCOW_COORDS);
    return;
  }

  const onSuccess = ({ coords }: Position) => {
    resolve({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = () => {
    resolve(MOSCOW_COORDS);
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
