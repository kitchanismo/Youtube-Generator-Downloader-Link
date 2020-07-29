import NetInfo from '@react-native-community/netinfo';

export const isConnected = async () => {
  return NetInfo.fetch().then(({isInternetReachable}) => {
    return isInternetReachable ? true : false;
  });
};
