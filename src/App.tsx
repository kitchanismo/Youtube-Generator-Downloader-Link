import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, Image, SafeAreaView, StatusBar} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Input,
  Button,
  Layout,
  Text,
  ListItem,
  List,
  Card,
  Spinner,
  TopNavigation,
  ThemeType,
  StyleType,
  Interaction,
} from '@ui-kitten/components';

import Home from './components/home';
import Details from './components/details';
import {isConnected} from './services/net';

const App = () => {
  const [url, setUrl] = useState('');
  const [info, setInfo] = useState({title: '', channel: '', thumbnail: ''});
  const [links, setLinks] = useState<any>([]);

  const Stack = createStackNavigator();

  useEffect(() => {
    isConnected().then((is) => {
      if (!is) {
        showMessage({
          message: 'No internet connection!',
          type: 'danger',
        });
      }
    });
  }, []);

  const homeOptions = {
    cardStyle: styles.headerStyle,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    title: 'Youtube Downloader Link',
    headerTitleAlign: 'center',
  };

  return (
    <>
      <StatusBar
        backgroundColor={styles.headerStyle.backgroundColor}
        barStyle="light-content"
      />

      <ApplicationProvider {...eva} theme={eva.dark}>
        <Layout style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                options={{
                  cardStyle: styles.headerStyle,
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  title: 'Youtube Downloader Link',
                  headerTitleAlign: 'center',
                }}>
                {(props) => (
                  <Home
                    {...props}
                    url={url}
                    setUrl={setUrl}
                    setInfo={setInfo}
                    setLinks={setLinks}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Details"
                options={{
                  headerTintColor: 'white',
                  cardStyle: styles.headerStyle,
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  title: 'Video Details',
                  headerTitleAlign: 'left',
                }}>
                {(props) => <Details {...props} links={links} info={info} />}
              </Stack.Screen>
            </Stack.Navigator>

            <Layout style={styles.footer}>
              <Text appearance="hint">kitchanismo</Text>
            </Layout>
          </NavigationContainer>
        </Layout>
        <FlashMessage position="top" />
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerStyle: {
    backgroundColor: '#222b45',
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
});

export default App;
