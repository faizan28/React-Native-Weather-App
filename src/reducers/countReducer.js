import {
  COUNTER_CHANGE,
  GET_WEATHER_DATA_FAILED,
  GET_WEATHER_DATA_IN_PROGRESS,
  GET_WEATHER_DATA_SUCCESS,
  GET_WEATHER_HISTORY_DATA_FAILED,
  GET_WEATHER_HISTORY_DATA_IN_PROGRESS,
  GET_WEATHER_HISTORY_DATA_SUCCESS,
  UPDATE_LOADING,
} from '../constants';
const initialState = {
  datalist: [],
  currentWeatherData: {},
  historyWeatherData: {},
  isLoading: false,
  isGPSGranted: false,
};
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_DATA_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_WEATHER_DATA_SUCCESS:
      return {
        ...state,
        currentWeatherData: action.data,
        isLoading: false,
      };
    case GET_WEATHER_DATA_FAILED:
      return {
        ...state,
        currentWeatherData: action.data,
        isLoading: false,
      };
    case GET_WEATHER_HISTORY_DATA_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_WEATHER_HISTORY_DATA_SUCCESS:
      return {
        ...state,
        historyWeatherData: action.data,
        isLoading: false,
      };
    case GET_WEATHER_HISTORY_DATA_FAILED:
      return {
        ...state,
        historyWeatherData: action.data,
        isLoading: false,
      };
    case UPDATE_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      return state;
  }
};
export default countReducer;
