import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import API from '../../api/apiRequest';

const EditIngredientModal = ({visible, onClose, ingredientID, ingredientName, ingredientCost, RecipeID, loadIngredients}) => {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const ingredientEndpoint = `recipe/${RecipeID}/ingredients`;
  

  const handleIngredientPut = async (ingredient) => {
    console.log(ingredientID)
    console.log(RecipeID)
    const outcome = await API.put(`recipe/ingredients/${ingredientID}`, ingredient);
    setTitle(''); 
    setCost('');
    onClose();
    loadIngredients(ingredientEndpoint)
    
  }

  const handleIngredientDelete = async (id) => {
    const outcome = await API.delete(`recipe/ingredient/${id}`);
    onClose();
    loadIngredients(ingredientEndpoint)
  }
  
  const handleSubmit = () => {
    //Checks if values are null
    if (!title || !cost) {
      alert("Please fill out all fields");
      return;
    }

    //Applies regex to cost to ensure the cost is correct.
    if (/^\d*\.?\d{0,2}$/.test(cost)) {
      setCost(cost);
      }
      else {
      alert("Please enter a valid cost, e.g: 00.00");
      return;
      }

    const ingredient = 
      {
        ingredientID: ingredientID,
        IngredientName: title,
        IngredientCost: cost,
        RecipeID: RecipeID
      }
    
    handleIngredientPut(ingredient)
    
  };

  const handleRemove = () => {
    const id = ingredientID
    handleIngredientDelete(id)
  }

  const handleCancel = () => {
    setTitle(''); 
    setCost('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Modify Ingredient</Text>
        </View>
        <View style={styles.modalBody}>
          
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            placeholder={ingredientName}
          />
          <TextInput
            style={styles.input}
            onChangeText={setCost}
            value={cost}
            placeholder={ingredientCost}
          />
          
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

export default EditIngredientModal;
