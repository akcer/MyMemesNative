import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Comments from './Comments';
import Likes from './Likes';
import Constants from 'expo-constants';

const MemeCard = ({ meme }) => {
  const navigation = useNavigation();

  return (
    <Card>
      <Text h3 style={{ textAlign: 'center' }}>
        {meme.topTitle}
      </Text>
      {
        <Card.Image
          style={{ resizeMode: 'contain' }}
          source={{
            uri: `${Constants.manifest.extra.apiUrl}/memes/${
              meme.image || 'default-image.png'
            }`,
          }}
          PlaceholderContent={<ActivityIndicator />}
          onPress={() => {
            navigation.navigate('Meme', { id: meme._id });
          }}
        />
      }
      <Text h4 style={{ textAlign: 'center' }}>
        {meme.bottomTitle}
      </Text>
      <Text style={{ textAlign: 'center' }}>{meme.text}</Text>
      <Card.Divider />
      <View style={{ alignItems: 'center' }}>
        <Text>
          Author:{' '}
          <Text
            style={{ fontWeight: '600' }}
            onPress={() => {
              navigation.navigate('Author', { username: meme.author });
            }}
          >
            {meme.author}{' '}
          </Text>
        </Text>
        <Text>
          Created At:{' '}
          <Text style={{ fontWeight: '600' }}>
            {new Date(meme.createdAt).toDateString()}
          </Text>
        </Text>
      </View>
      <Likes
        likes={meme.likes?.likesCount}
        dislikes={meme.dislikes?.dislikesCount}
        id={meme._id}
      />
      <Comments memeId={meme._id} />
    </Card>
  );
};

export default MemeCard;
