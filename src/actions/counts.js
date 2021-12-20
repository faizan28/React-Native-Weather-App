import * as actionTypes from '../constants';
import {getData, getHistoryDataService} from '../services/mainPageService';
export function changeCount(count) {
  return {
    type: actionTypes.COUNTER_CHANGE,
    payload: count,
  };
}
export const getWeatherDataAction = (params, uuid) => async dispatch => {
  dispatch(getWeatherDataInProgress());
  try {
    const {data} = await getData(params);
    console.info('WEATHERDATA=>', data);

    dispatch(getWeatherDataSuccess(data));
  } catch (error) {
    // handle error
    dispatch(getWeatherDataFailed(error));
  }
};

export const getWeatherHistoryDataAction = (params, uuid) => async dispatch => {
  dispatch(getWeatherHistoryDataInProgress());
  try {
    const {data} = await getHistoryDataService(params);
    console.info('history=>', data);
    dispatch(getWeatherHistoryDataSuccess(data));
  } catch (error) {
    // handle error
    dispatch(getWeatherHistoryDataFailed(error));
  }
};
export const updateLoading = value => async dispatch => {
  dispatch(updateLoadingProgress(value));
};
export const updateLoadingProgress = data => ({
  type: actionTypes.UPDATE_LOADING,
  data,
});
export const getWeatherDataInProgress = () => ({
  type: actionTypes.GET_WEATHER_DATA_IN_PROGRESS,
});
export const getWeatherDataSuccess = data => ({
  type: actionTypes.GET_WEATHER_DATA_SUCCESS,
  data,
});
export const getWeatherDataFailed = error => ({
  type: actionTypes.GET_WEATHER_DATA_FAILED,
  error,
});
export const getWeatherHistoryDataInProgress = () => ({
  type: actionTypes.GET_WEATHER_HISTORY_DATA_IN_PROGRESS,
});
export const getWeatherHistoryDataSuccess = data => ({
  type: actionTypes.GET_WEATHER_HISTORY_DATA_SUCCESS,
  data,
});
export const getWeatherHistoryDataFailed = error => ({
  type: actionTypes.GET_WEATHER_HISTORY_DATA_FAILED,
  error,
});
