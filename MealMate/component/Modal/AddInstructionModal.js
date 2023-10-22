import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import API from '../../api/apiRequest';

const AddInstructionModal = ({visible, onClose, recipeID, loadInstructions}) => {
  const [title, setTitle] = useState('');
  
  const instructionEndpoint = `recipe/${recipeID}/instructions`;
  
  const handleInstructionPost = async (instruction) => {
    const outcome = await API.post('recipe/instructions', instruction);
    setTitle('');
    onClose();
    loadInstructions(instructionEndpoint)
    
  }
  
  const handleSubmit = () => {
    // Checks if title is null
    if (!title) {
      alert("Please fill out all fields");
      return;
    }

    const instruction = {
      Instruction: title,
      RecipeID: recipeID
    }
    handleInstructionPost(instruction)
  };

  const handleCancel = () => {
    setTitle(''); 
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Add a Step</Text>
        </View>
        <View style={styles.modalBody}>
          
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder=""
          />
        </View>
        <View style={styles.modalFooter}>
          <Pressable style={styles.modalButton} onPress={handleSubmit}>
            <Text style={styles.modalButtonText}>Submit</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={handleCancel}>
            <Text style={styles.modalButtonText}>Cancel</Text>
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

export default AddInstructionModal;
