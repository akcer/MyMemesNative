import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import MemeCard from '../components/MemeCard';
import Error from '../components/Error';
import Constants from 'expo-constants';

const Random = () => {
  const [meme, setMeme] = useState({});
  const [loading, isLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getRandomMeme();
  }, []);
  const getRandomMeme = () => {
    isLoading(true);
    axios
      .get(`${Constants.manifest.extra.apiUrl}/memes/random`)
      .then((response) => {
        setMeme(response.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  return (
    <ScrollView>
      {isError ? <Error error={error} /> : <MemeCard meme={meme} />}
      <Button
        title="Get Random Meme"
        containerStyle={{ paddingTop: 20 }}
        onPress={getRandomMeme}
        loading={loading}
      />
    </ScrollView>
  );
};

export default Random;
