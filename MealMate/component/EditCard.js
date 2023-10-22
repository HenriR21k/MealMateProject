import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditRecipeModal from './Modal/EditRecipeModal';

const iconColor = 'pink';
const EditCard = ({ info, loadRecipes}) => {
  const {RecipeID, RecipeName, RecipeURL} = info;

  const [recipeModalVisible, setRecipeModalVisible] = useState(false);

  const handleRecipeModalOpen = () => {
    setRecipeModalVisible(true);
  };

  const handleRecipeModalClose = () => {
    setRecipeModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.imageStyle} source={{uri: RecipeURL}} />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{RecipeName}</Text>
          <View style={styles.iconContainer}>
            <Pressable onPress={handleRecipeModalOpen}>
              <Ionicons name="pencil" size={24} color={iconColor} style={styles.iconStyle} />
            </Pressable>
            <EditRecipeModal
              visible={recipeModalVisible} 
              onClose={handleRecipeModalClose}
              RecipeID={RecipeID}
              loadRecipes={loadRecipes}
            />
          </View>
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
    marginTop: 25,
    marginBottom: 10
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#fff',
    height: 200,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 130,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  iconStyle: {
    marginHorizontal: 5,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default EditCard;
