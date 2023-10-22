import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, Pressable } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component-2';
import EditIngredientModal from './Modal/EditIngredientModal';
//import modal component

const EditIngredientsTable = ({info, loadIngredients, RecipeID}) => {

  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);

  const handleIngredientModalOpen = () => {
    setIngredientModalVisible(true);
  };

  const handleIngredientModalClose = () => {
    setIngredientModalVisible(false);
  };

  const { IngredientID, IngredientName, IngredientCost} = info;
  
  let tableData = [[`${IngredientName}`, `£${IngredientCost}`]]

  return (
          <View style = {styles.container}>
              
                <Pressable onPress={handleIngredientModalOpen}>
                <Table style={styles.borderStyling}>
                  <View style={styles.itemContainer}>
                    <Rows  
                      data={tableData} textStyle={styles.text} />
                  </View>
                </Table>
                </Pressable>
                <EditIngredientModal
                visible={ingredientModalVisible} 
                onClose={handleIngredientModalClose}
                ingredientID = {IngredientID}
                ingredientName = {IngredientName}
                ingredientCost = {IngredientCost}
                RecipeID = {RecipeID}
                loadIngredients = {loadIngredients}
                
                />
              
          </View>

  )
 
}

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 5,
    padding: 5,
    
   
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  titleText: {
    fontSize: 16,
    paddingLeft: 15,
    flex: 1,
    //alignSelf: 'flex-start'
  },
  container: {  },
  //head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center' },
  //borderStyling : { borderWidth: 2, borderColor: '#000000' }
});

export default EditIngredientsTable;