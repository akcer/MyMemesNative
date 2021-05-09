import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Button, Text, ListItem, Avatar, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../contexts/userContext';
import axios from 'axios';
import Error from './Error';
import Constants from 'expo-constants';

const Comments = ({ memeId }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [loading, isLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const navigation = useNavigation();
  const user = useContext(UserContext);

  const getComments = (memeId) => {
    isLoading(true);
    axios
      .get(`${Constants.manifest.extra.apiUrl}/comments/${memeId}`)
      .then((response) => {
        setShowComments(true);
        setIsError(false);
        setComments(response.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  const addNewComment = (memeId) => {
    axios
      .post(
        `${Constants.manifest.extra.apiUrl}/comments/add`,
        {
          text: commentText,
          meme: memeId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setCommentText('');
        setIsError(false);
        getComments(memeId);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`${Constants.manifest.extra.apiUrl}/comments/${commentId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsError(false);
        getComments(memeId);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  return (
    <View>
      {isError && <Error error={error} />}
      {!showComments && (
        <Button
          title="Show comments"
          onPress={() => {
            getComments(memeId);
          }}
          loading={loading}
        />
      )}
      {showComments && (
        <View>
          {!comments.length && <Text>'No comments yet'</Text>}
          {comments.map((comment) => {
            return (
              <ListItem
                bottomDivider
                key={comment._id}
                containerStyle={{ alignItems: 'flex-start' }}
              >
                <Avatar
                  containerStyle={{ marginTop: 8 }}
                  rounded
                  source={{
                    uri: `${Constants.manifest.extra.apiUrl}/avatars/${comment.author.avatar}`,
                  }}
                  onPress={() => {
                    navigation.navigate('Author', {
                      username: comment.author.username,
                    });
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text
                      onPress={() => {
                        navigation.navigate('Author', {
                          username: comment.author.username,
                        });
                      }}
                    >
                      {comment.author.username}
                    </Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text>{new Date(comment.createdAt).toDateString()}</Text>
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    <Text style={{ fontSize: 18 }}>{comment.text}</Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
                {(user.username === comment.author.username ||
                  user.role === 'admin') && (
                  <Button
                    title="Delete"
                    onPress={() => {
                      deleteComment(comment._id);
                    }}
                  />
                )}
              </ListItem>
            );
          })}
          <View>
            <Text style={{ fontSize: 16 }}>Add Comment:</Text>
            <Input
              leftIcon={<Icon name="comment" size={24} />}
              onChangeText={(text) => setCommentText(text)}
              value={commentText}
              multiline={true}
              numberOfLines={2}
            />
            <Button
              title="Add Comment"
              onPress={() => {
                addNewComment(memeId);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Comments;
