import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native';
import CameraComponent from '../../component/CameraComponent';
import AccessImage from '../../component/AccessImage';
import { loggedInUser } from '../../api/currentUser';
import API from '../../api/apiRequest';

export default function EditRecipeScreen({ navigation, route }) {

  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeURL, setRecipeURL] = useState(null);
  const [newRecipeURL, setNewRecipeURL] = useState();
  
  const handlePictureTaken = (data) => {
    setRecipeURL(data)
  };

  const handleRecipePost = async (recipe) => {
    const outcome = await API.post('recipe', recipe);
    navigation.navigate('Tab')
    //fetchGroupTasks(); will be passed in as a handler throug props to redisplay groupTasks.
  }

const handleSubmit = () => {

  // define the onImageUploaded callback function
  const onImageUploaded = (url) => {
    setNewRecipeURL(url); // update the recipeURL state with the image URL
  };

  // call AccessImage to upload the image to Cloudinary
  AccessImage( recipeURL, {onImageUploaded: onImageUploaded });

};

useEffect(() => {
  if (newRecipeURL) {
    const recipe = {
      RecipeName: recipeName,
      RecipeDescription: recipeDescription,
      RecipeURL: newRecipeURL,
      datePosted: new Date().toISOString(),
      isPublished: 'draft',
      UserID: loggedInUser
    };
    handleRecipePost(recipe);
  }
}, [newRecipeURL]);

  return (
    
    <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Create Recipe</Text>
        </View>
        <View style={styles.modalBody}>
          
          <TextInput
            style={styles.input}
            onChangeText={setRecipeName}
            value={recipeName}
            placeholder="Recipe Title"
          />
          <TextInput
            style={styles.input}
            value={recipeDescription}
            onChangeText={setRecipeDescription}
            placeholder="Enter recipe description"
          />
          <CameraComponent onPictureTaken={handlePictureTaken} />
        </View>
        <View style={styles.modalFooter}>
          <Pressable style={styles.modalButton} onPress={handleSubmit}>
            <Text style={styles.modalButtonText}>Create Recipe</Text>
          </Pressable>
        </View>
      </View>
    

    
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 204, 255, 0.5)'
  },
  modalHeader: {
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalBody: {
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  modalFooter: {
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: 'rgba(255, 204, 255, 0.5)',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});