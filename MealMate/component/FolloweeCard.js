import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import useLoad from '../api/useLoad';


const iconColor = '#6c5ce7';
const FolloweeCard = ({ info, navigation, UserID }) => {
  const { FollowID, FolloweeID, firstname, lastname} = info;
  
  const endpoint = `userprofile/${FolloweeID}`
  const [profile, , loadingMessage, loadProfile] = useLoad(endpoint);  

  

  return (

    <View style={styles.container}>
          
          {
          !profile
            ? <Text>No profile</Text>
            : <Pressable onPress={() => navigation.navigate('AuthorPage', {Profile: profile[0], User: UserID })}>  
                  <View style={styles.cardContainer}>
                    <View style={styles.infoStyle}>
                     <Text style={styles.titleStyle}>{firstname + " " + lastname}</Text>
                     </View>
                  </View>
              </Pressable>
          }
    </View>

  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    height: 50,
    alignItems: 'center',
    verticalAlign: 'middle',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  cardContainer: {
    width: deviceWidth - offset,
    alignItems: 'center',
  },
 
  titleStyle: {
    fontSize: 16,
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
});

export default FolloweeCard;
