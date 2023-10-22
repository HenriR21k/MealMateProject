import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import API from '../../api/apiRequest';
import CameraComponent from '../CameraComponent';
import AccessImage from '../AccessImage';
import { loggedInUser } from '../../api/currentUser'; 

const EditRecipeModal = ({visible, onClose, RecipeID, loadRecipes}) => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeURL, setRecipeURL] = useState(null);
  const [newRecipeURL, setNewRecipeURL] = useState();

  const UserID = loggedInUser
  
  const endpoint = `recipe/draft/user/${UserID}`;

  const handlePictureTaken = (data) => {
    setRecipeURL(data)
  };

  const handleRecipePut = async (recipe) => {
    const outcome = await API.put(`recipe/draft/${RecipeID}`, recipe);
    onClose()
    loadRecipes(endpoint)
  }

  const handleRecipeDelete = async (id) => {
    const outcome = await API.delete(`recipe/${id}`)
    onClose()
    loadRecipes(endpoint)
  }

  const handleSubmit = () => {

    if (!recipeName || !recipeDescription || !recipeURL) {
      alert("Please fill out all fields");
      return;
    }

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
      handleRecipePut(recipe);
    }
  }, [newRecipeURL]);

  const handleRemove = () => {
    const id = RecipeID
    handleRecipeDelete(id)
  }

  const handleCancel = () => {
    
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Modify Recipe Detail</Text>
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
            <Text style={styles.modalButtonText}>Submit</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={handleCancel}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={handleRemove}>
            <Text style={styles.modalButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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
    justifyContent: 'flex-end',
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

export default EditRecipeModal;
