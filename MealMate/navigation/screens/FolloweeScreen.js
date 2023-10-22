import * as React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../component/Card';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import { useState, useEffect } from 'react';
import API from '../../api/apiRequest';
import FolloweeCard from '../../component/FolloweeCard';


export default function FolloweeScreen({ navigation }) {

    const User = loggedInUser
    
    const endpoint = `followees/${User}`
    const [followees, , loadingMessage, loadFollowees] = useLoad(endpoint);
      
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        loadFollowees(endpoint);
      });
      return unsubscribe;
    }, [navigation]);

    useEffect(() => { loadFollowees(endpoint) }, []);


      return (

     
        <View style={styles.container}>
         

          {<FlatList
            data={followees}
            renderItem={({ item }) => {
              return (
              
              <FolloweeCard 
              info={item}
              navigation={navigation}
              UserID = {User}  
              />
             
              );
            }}
            keyExtractor={(follow) => follow.FollowID.toString()}
            showsVerticalScrollIndicator={false}
            extraData={followees}
          />}
          </View>
      )
       
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: 'rgba(255, 204, 255, 0.5)'
    },
  });