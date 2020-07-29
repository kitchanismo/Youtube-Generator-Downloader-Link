import React, {useState, useEffect} from 'react';
import {Layout, Input, Spinner, Text, Button} from '@ui-kitten/components';
import {Image, StyleSheet, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {showMessage} from 'react-native-flash-message';
import ytdl from 'react-native-ytdl';
import {isConnected} from '../services/net';

export interface HomeProps {
  setUrl: Function;
  url: string;
  setLinks: Function;
  setInfo: Function;
  navigation: any;
}

const Home: React.SFC<HomeProps> = ({
  setUrl,
  url,
  setLinks,
  setInfo,
  navigation,
}) => {
  const [disabled, setDisabled] = useState(false);
  const options = {
    quality: 'highest',
  };

  useEffect(() => {
    Clipboard.getString().then(async (text) => {
      const isValid = await ytdl.validateURL(text);
      if (!isValid) {
        return;
      }
      setUrl(text);
    });
  }, []);

  const getVideo = async () => {
    const isValid = await ytdl.validateURL(url);

    if (!isValid || url === '') {
      setDisabled(false);
      showMessage({
        message: 'Youtube url not valid!',
        type: 'danger',
      });
      return;
    }

    try {
      await !isConnected();
      setDisabled(true);
      setLinks([]);

      const {videoDetails, formats} = await ytdl.getInfo(url, {
        filter: (format) => format.container === 'mp4',
      });

      const info = {
        title: videoDetails.title,
        channel: videoDetails.author.name,
        thumbnail: videoDetails.thumbnail.thumbnails[3].url,
      };

      const links = formats.map((link) => {
        return {
          url: link.url,
          quality: link.qualityLabel || '',
          format: link.container,
        };
      });

      setLinks(links);
      setInfo(info);
      setDisabled(false);
      navigation.navigate('Details');
    } catch (error) {
      setDisabled(false);
      showMessage({
        message: 'No internet connection!',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/yt.png')} />
      <Input
        disabled={disabled}
        textStyle={styles.inputStyle}
        style={styles.input}
        placeholder="youtube video url"
        value={url}
        onChangeText={(url) => setUrl(url)}
      />

      <Button
        disabled={disabled}
        appearance="outline"
        status="danger"
        size="large"
        style={styles.btn}
        accessoryLeft={() => {
          return disabled ? (
            <Spinner size="medium" status="basic" />
          ) : (
            <Text></Text>
          );
        }}
        onPress={getVideo}>
        {disabled ? '' : 'Generate Download Link'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'stretch',
  },

  container: {
    paddingHorizontal: '5%',
    alignItems: 'center',
    paddingTop: 30,
  },

  input: {
    marginBottom: 20,
    borderRadius: 10,
  },
  inputStyle: {
    fontSize: 20,
    paddingVertical: 10,
  },

  logo: {
    height: 200,
    marginVertical: 20,
    resizeMode: 'contain',
  },
});

export default Home;
