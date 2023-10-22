import * as React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable, Button, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../component/Card';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import { useState, useEffect } from 'react';
import API from '../../api/apiRequest';
import ProfilePageComponent from '../../component/ProfilePageComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AuthorPageScreen({ navigation, route }) {

  const {Profile, User} = route.params;

  const isFollowingEndpoint = `follower/${User}/followee/${Profile.UserID}`
  const [isFollowing, setIsFollowing, loadingMessage4, loadIsFollowing] = useLoad(isFollowingEndpoint);


  //Changes the icon depending if the current user is following the author.
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons 
          size={30}
          color={'pink'}
          name={isFollowing ? 'bookmark' : 'bookmark-outline'}
          onPress={() => {
            if (isFollowing) {
              // Send a DELETE request to your server to remove the follow record
              handleRemoveFollow()
              
            } else {
              // Send a POST request to your server to add a follow record, null goes here
              handleAddFollow();
            }
          }}
        />
      )
    });
  }, [isFollowing]);

  //Removes the record of a user following the author
  const handleRemoveFollow = async () => {
  if (isFollowing) {
    console.log(isFollowing[0].FollowID)
    const outcome = await API.delete(`following/${isFollowing[0].FollowID}`);
    await loadIsFollowing(isFollowingEndpoint)
    setIsFollowing(false)
  }
  }


  //Creates the record
  const handleAddFollow = async () => {
    let object = {
      FolloweeID: Profile.UserID,
      FollowerID: User
    }
    const outcome = await API.post(`follow`, object );
    loadIsFollowing(isFollowingEndpoint)
  }
    

    return (
        <View style={styles.container}>
          <View style={styles.boxcontainer}>
            {
            !Profile
            ? <Text>Loading</Text>
            :<ProfilePageComponent user={Profile} /> 
            }
          </View>
            {
            !Profile
            ? <Text>Loading</Text>
            :<Pressable style={styles.button} onPress={() => navigation.navigate('publishedRecipe', {
                UserID: Profile.UserID
              })}>  
                <Text style={styles.buttonText}>View Published Recipes</Text>
            </Pressable>
            }

        </View>
    );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;

const styles = StyleSheet.create({

    container: {
      flex: 1, 
      backgroundColor: 'rgba(255, 204, 255, 0.5)'
    },

    boxcontainer: {
      width: deviceWidth - 50,
      marginLeft: 25
    },
   
    button: {
      marginTop: 15,
      backgroundColor: "white",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignSelf: 'center',
    
    },
    buttonText: {
    
      fontSize: 20,
      fontWeight: 'bold',
    },
  });