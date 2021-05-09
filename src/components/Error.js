import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, ListItem, Button, Overlay } from 'react-native-elements';

const Error = ({ error }) => {
  if (!error) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Text h3>Something Goes Wrong!!! </Text>
        {error.response ? (
          <Text h4>{error.response.data.message}</Text>
        ) : error.request ? (
          <Text h4>
            'Network Error! The request was made but no response was received.'
          </Text>
        ) : (
          <Text h4>{error.message}</Text>
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
});
export default Error;
