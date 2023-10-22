import * as React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../component/Card';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import { useState, useEffect } from 'react';
import API from '../../api/apiRequest';
import ProfilePageComponent from '../../component/ProfilePageComponent';

export default function ProfileScreen({ navigation }) {

    const UserID = loggedInUser;

    const endpoint = `userprofile/${UserID}`
    const [profile, , loadingMessage, loadProfile] = useLoad(endpoint);

    

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          loadProfile(endpoint);
        });
        return unsubscribe;
      }, [navigation]);
  
      useEffect(() => { loadProfile(endpoint) }, []);

    return (

        
          <View style={styles.container}>
            <View style= {styles.boxcontainer}>
            {
            
              !profile
              ? <Text>Loading</Text>
              :<ProfilePageComponent user={profile[0]} /> 
              }
            </View>
              {
              !profile
              ? <Text>Loading</Text>
              :<Pressable style={styles.button} onPress={() => navigation.navigate('savedRecipe', {
                  UserID: profile[0].UserID
                })}>  
                  <Text style={styles.buttonText}>View Saved Recipes</Text>
              </Pressable>
            }
            
            {
            !profile
            ? <Text>Loading</Text>
            :<Pressable style={styles.button} onPress={() => navigation.navigate('publishedRecipe', {
                UserID: profile[0].UserID
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
      width: 300
    
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });