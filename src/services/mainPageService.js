import {API_KEY} from '../config';
import {request} from './../libs/axios';
export const OpengetData = params => {
  const options = {
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=d71ef680e3220aba1f295c8cede72ea3',
    params: {
      q: '',
      lat: params.latitude,
      lon: params.longitude,
      callback: 'test',
      id: '2172797',
      lang: 'null',
      units: 'imperial',
      mode: 'JSON',
    },
    headers: {
      'x-rapidapi-key': 'SIGN-UP-FOR-KEY',
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    },
  };
  return request(options);
};
export const getData = params => {
  const options = {
    method: 'GET',
    url: `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${params.latitude},${params.longitude}`,
  };
  return request(options);
};

export const getHistoryDataService = params => {
  const options = {
    method: 'GET',
    url: `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.latitude},${params.longitude}&days=7&aqi=no&alerts=no`,
  };
  return request(options);
};
