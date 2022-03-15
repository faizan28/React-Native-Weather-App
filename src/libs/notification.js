import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
class Notifications {
  constructor() {
    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: function (token) {
    //     // console.log('TOKEN:', token);
    //   },
    //   onNotification: function (notification) {
    //     console.log('NOTIFICATION:', notification);
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   permissions: {
    //     alert: true,
    //     badge: false,
    //     sound: false,
    //   },
    // });

    PushNotification.createChannel(
      {
        channelId: 'weather', // (required)
        channelName: 'weather reminder notifications', // (required)
        channelDescription: 'weather reminder',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

  schduleNotification(date, data) {
    console.log('NOTIFICATION:', data);
    PushNotification.localNotificationSchedule({
      channelId: 'weather',
      title: 'Weather Update',
      message: `Temp:${data?.temp_c}c, Wind:${data?.wind_kph}kph, Humidity:${data?.humidity}%`,
      importance: 'high',
      ongoing: true,
      actions: '["Yes", "No"]',
      date,
    });
  }
}

export default new Notifications();
