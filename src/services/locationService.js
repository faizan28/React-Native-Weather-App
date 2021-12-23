import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export async function getLocationPermission() {
  return new Promise(async function (resolve, reject) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

        {
          title: 'Weather App',
          message:
            'Hey! I am Faizan Naeem. Would you mind giving me GPS permissions',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // permission granted
        // do code get location here.
        return Geolocation.getCurrentPosition(
          position => {
            //   console.info(position);
            resolve(position);
          },
          error => {
            reject(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        // permission denied
        console.log('GPS permission denied');
        reject('GPS permission denied');
      }
    } catch (err) {
      console.warn(err);
      reject(err);
    }
  });
}
