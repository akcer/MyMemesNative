import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import axios from 'axios';
import Error from './Error';
import Constants from 'expo-constants';

const Likes = ({ likes, dislikes, id }) => {
  const [votes, setVotes] = useState({ likes, dislikes });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setVotes({ likes, dislikes });
  }, [likes, dislikes]);

  const like = (id) => {
    axios
      .patch(
        `${Constants.manifest.extra.apiUrl}/memes/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setVotes(response.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  const dislike = (id) => {
    axios
      .patch(
        `${Constants.manifest.extra.apiUrl}/memes/dislike/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setVotes(response.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };
  return (
    <View >
      {isError && <Error error={error} />}
      <View style={style.body}>
        <Text h4 style={{ color: 'green', fontWeight: 'bold' }}>
          {votes.likes}
        </Text>
        <Button
          type="clear"
          title="&#x1F44D;"
          onPress={() => {
            like(id);
          }}
        />
        <Text h4 style={{ color: 'red', fontWeight: 'bold' }}>
          {votes.dislikes}
        </Text>
        <Button
          type="clear"
          title="&#x1F44E;"
          onPress={() => {
            dislike(id);
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Likes;
