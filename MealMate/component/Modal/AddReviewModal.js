import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import API from '../../api/apiRequest';

const AddReviewModal = ({visible, onClose, recipeID, UserID, loadFeedback}) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const feedbackEndpoint = `recipe/${recipeID}/feedback`;
  

  //Posts user review then reloads object with endpoint
  const handleReviewPost = async (review) => {
    const outcome = await API.post('recipe/feedback', review);
    setTitle(''); 
    setRating(1);
    setDescription('');
    onClose();
    loadFeedback(feedbackEndpoint)
    
  }
  
  const handleSubmit = () => {
    //If rating exists outside the bounds below then throw an alert
    if (rating < 1 || rating > 5) {
      alert("Please enter a rating between 1 and 5");
      return;
    }

    if (!title || !rating || !description) {
      alert("Please fill out all fields");
      return;
    }
    
    const review = {
      UserID: UserID,
      RecipeID: recipeID,
      FeedbackTitle: title,
      Rating: rating,
      Review: description,
      DatePosted: new Date().toISOString()
    }
    handleReviewPost(review)
  };

  const handleCancel = () => {
    setTitle(''); 
    setRating(1);
    setDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Enter Review</Text>
        </View>
        <View style={styles.modalBody}>
          
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Enter Title"
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setRating}
            value={rating}
            placeholder="Enter Rating 1-5"
          />
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder="Enter Description"
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

export default AddReviewModal;
