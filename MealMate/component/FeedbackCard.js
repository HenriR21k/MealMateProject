import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const iconColor = '#6c5ce7';
const FeedbackCard = ({ info }) => {
  const { FeedbackTitle, Review, Rating, DatePosted } = info;

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{FeedbackTitle} - {Rating} Stars</Text>
          <Text style={styles.categoryStyle}>{Review}</Text>
          <Text style={styles.categoryStyle}>{new Date(DatePosted).toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginBottom: 20
  },
  cardContainer: {
    width: deviceWidth - offset,
    
  },
  
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  categoryStyle: {
    
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default FeedbackCard;
