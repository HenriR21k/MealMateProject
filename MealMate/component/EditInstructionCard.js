import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import EditInstructionModal from './Modal/EditInstructionModal';
import { useState } from 'react';

const iconColor = '#6c5ce7';
const EditInstructionCard = ({ info, loadInstruction, RecipeID }) => {
  const { InstructionID, Instruction } = info;

  const [InstructionModalVisible, setInstructionModalVisible] = useState(false);

  const handleInstructionModalOpen = () => {
    setInstructionModalVisible(true);
  };

  const handleInstructionModalClose = () => {
    setInstructionModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleInstructionModalOpen}>
      <View style={styles.cardContainer}>
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{Instruction}</Text>
        </View>
      </View>
      </Pressable>
      <EditInstructionModal
        visible={InstructionModalVisible} 
        onClose={handleInstructionModalClose}
        instructionID = {InstructionID}
        instructionName = {Instruction}
        RecipeID = {RecipeID}
        loadInstructions = {loadInstruction}
      />
                
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
    marginTop: 5,
    marginBottom: 5
  },
  cardContainer: {
    width: deviceWidth - offset,
  },
 
  titleStyle: {
    fontSize: 14,
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 1,
  },
});

export default EditInstructionCard;
