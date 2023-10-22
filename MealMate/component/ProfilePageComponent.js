import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const ProfilePageComponent = ({ user }) => {

  const { UserID, firstname, lastname, email, twitter, youtube, facebook} = user;

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.name}>{firstname} {lastname}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.links}>
        {user.twitter && (
          <Pressable style={styles.linkContainer}>
            <Image source={require('../assets/twitter.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Twitter</Text>
          </Pressable>
        )}
        {user.youtube && (
          <Pressable style={styles.linkContainer}>
            <Image source={require('../assets/youtube.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>YouTube</Text>
          </Pressable>
        )}
        {user.facebook && (
          <Pressable style={styles.linkContainer}>
            <Image source={require('../assets/facebook.png')} style={styles.linkIcon} />
            <Text style={styles.linkText}>Facebook</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   backgroundColor: "#fff",
   marginTop: 110,
   borderRadius: 20,
  },
  profile: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkContainer: {
    alignItems: 'center',
  },
  linkIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProfilePageComponent;