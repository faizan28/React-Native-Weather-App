import axios from 'axios';
export const onGetHeaders = type => {
  const ALL_TYPES = ['authorization', 'public'];
  if (!type) {
    throw new Error(
      'request func internal onGetHeaders arg @param type is missing',
    );
  }
  if (!ALL_TYPES.includes(type)) {
    throw new Error(`
      request func internal onGetHeaders arg @param type can only be
      ${ALL_TYPES.join(',')}
    `);
  }
  if (type === 'authorization') {
    // const authorizationToken = UserService.getToken();
    return {
      // Authorization: `bearer ${authorizationToken}`,
      // time_zone: onGetTimeZone(),
    };
  }
  if (type === 'public') {
    return {
      'Content-Type': 'application/json',
    };
  }
  return {};
};
/**
 * @description Call an asynchronous XHR request
 * @param {String} url* required
 * @param {String} method* required
 * @param {Object} data optional
 * @param {Signal} cancelToken optional
 * @param {Object} customHeader optional
 * @param {String} headerVariant* required, by default 'authorization'
 * @return {Object} XHR response
 */
export const request = async ({
  url,
  method,
  data,
  params,
  cancelToken,
  customHeaders,
  headerVariant = 'authorization',
  ...rest
}) => {
  if (!url) {
    throw new Error('request func arg @param url is missing');
  }
  if (!method) {
    throw new Error(
      'request func arg @param method is missing. Valid options "GET"|"POST"|"PUT" etc',
    );
  }

  // Overrides headers object based on variant if "customHeaders" object provided
  const authHeaders = onGetHeaders(headerVariant);
  const headers = {...customHeaders, ...authHeaders};
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await axios(url, {
      method,
      headers,
      ...(data && {data}),
      ...(params && {params}),
      ...(cancelToken && {cancelToken}),
      ...rest,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const setupInterceptors = ({debug = false}) => {
  /**
   * @description echo() prints a message if allowed, of a certain type of console variant
   * @param {*} show {Boolean}
   * @param {*} type {String} Can be log, warn, debug
   * @param {*} message {String}
   */
  const echo = ({show, type, message}) => {
    if (!show) {
      return;
    }
    /* eslint-disable no-console */
    console.group('🤯🤯 @@@AXIOS INTERCEPTOR@@@ 🤯🤯');
    console[type](message);
    console.groupEnd('@@@AXIOS INTERCEPTOR@@@');
    /* eslint-enable */
  };

  /*
   * Our intention to implement refresh token is to make sure user is never logged out
   * Implemented refresh token mechanism in both request and response interceptors. Because:
   * 1. Request interceptor will check if token is already expired or less than 60
   *    minutes are remaining in its expiry. If yes, it will call refreshtoken
   * 2. Response interceptor will see if an API throws 401, then it call refreshtoken
   *    and resends the actual API call with the new token
   * However if 1 is in place, there is very less chance that 2 will occur, but there is
   * a possibility that backend throws 401 before token is actually expired due to some bug
   * then in that case this response interceptor will make sure that user is never logged out
   *
   * TODO: There is a problem, if a page has multiple API calls going in parallel
   *       like on dashboard, then refreshtoken will be called multiple times (as per condition)
   */
  /* eslint-disable */
  // Request interceptor for API calls
  axios.interceptors.request.use(
    async config => {
      const token = getFromLocal(TOKEN_KEY, false) || '';
      const updatedConfig = {
        ...config,
      };
      // avoid getting into loop bcox this interceptor will also run for refresh token call
      if (token && config.url.indexOf('oauth/token') === -1) {
        const parsedData = JSON.parse(token);
        const expiryTime = parsedData.expiry_time;

        const expiryTimeObj = moment.unix(expiryTime);
        const currentObj = moment();

        const differenceInMinutes = expiryTimeObj.diff(currentObj, 'minutes');

        // this condition will work for both cases
        // 1. token expiry time is passed
        // 2. it is not passed but less than 60 minutes remaining
        if (differenceInMinutes < 60) {
          await store.dispatch(UserService.updateToken());
          const authHeaders = onGetHeaders('authorization');
          updatedConfig.headers = {
            ...updatedConfig.headers,
            ...authHeaders,
          };
        }
      }
      return updatedConfig;
    },
    error => {
      Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    response => {
      echo({show: debug, type: 'dir', message: response});
      //
      return response;
    },
    async error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const {status} = error.response;
        if (status === 401) {
          // after getting new token, we will have to resend the request with new token
          const originalRequest = error.config;
          await store.dispatch(UserService.updateToken());

          const authHeaders = onGetHeaders('authorization');
          originalRequest.headers = {
            ...originalRequest.headers,
            ...authHeaders,
          };
          return axios(originalRequest);
        }
        if (status === 404) {
          // 404 status means not found
          // Add code to handle a request whin API is not available
        }
        if (status === 500) {
          // 500 status means server error
          // Add code to handle when error happens on tne server
        }
      } else if (error.request) {
        // Request made, but no response was received
        echo({show: debug, type: 'dir', message: error.request});
      } else {
        echo({
          show: debug,
          type: 'warn',
          message: `Something occurred setting the request that set off an error ${error.message}`,
        });
      }
      return Promise.reject(error);
    },
  );
};
