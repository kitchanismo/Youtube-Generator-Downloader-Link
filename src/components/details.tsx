import React from 'react';
import {
  Layout,
  Input,
  Spinner,
  Card,
  Text,
  Button,
  ListItem,
  List,
  Divider,
} from '@ui-kitten/components';
import Clipboard from '@react-native-community/clipboard';
import {StyleSheet, Image, View, FlatList} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Link, Info} from 'src/models/models';
import {ScrollView} from 'react-native-gesture-handler';

export interface DetailsProps {
  links: Link[];
  info: Info;
}

const Details: React.SFC<DetailsProps> = ({links, info}) => {
  return (
    <Layout style={styles.container}>
      {links.length > 0 && (
        <>
          <Image
            style={{height: 182, width: '100%'}}
            source={{uri: info.thumbnail}}></Image>

          <Card style={styles.card}>
            <Text numberOfLines={2} category="h6">
              {info.title}
            </Text>
            <Text appearance="hint" category="h6">
              {info.channel}
            </Text>
          </Card>

          <List
            style={styles.list}
            ItemSeparatorComponent={Divider}
            data={links}
            renderItem={({item, index}: any) => (
              <View style={styles.listItem}>
                <Text
                  appearance="hint"
                  style={{
                    paddingVertical: 7,
                  }}>
                  {`Quality: ${item.quality} , Format: ${item.format}`}
                </Text>

                <Button
                  status="success"
                  appearance="outline"
                  size="small"
                  onPress={() => {
                    Clipboard.setString(item.url);
                    showMessage({
                      message: 'Copied to Clipboard!',
                      type: 'success',
                    });
                  }}>
                  Copy Link
                </Button>
              </View>
            )}
          />
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {width: '100%', marginTop: -5},
  container: {
    paddingHorizontal: '5%',
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
  },

  input: {
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  inputStyle: {
    fontSize: 20,
    paddingVertical: 10,
  },
  list: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listItem: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Details;
