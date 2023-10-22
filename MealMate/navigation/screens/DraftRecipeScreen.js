import * as React from 'react';
import { Button, View, Text, ScrollView, FlatList, Image, StyleSheet, Dimensions, Pressable, LogBox } from 'react-native';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import { useState, useEffect } from 'react';
import FeedbackCard from '../../component/FeedbackCard';
import IngredientsTable from '../../component/IngredientsTable';
import EditIngredientsTable from '../../component/EditIngredientsTable';
import InstructionCard from '../../component/InstructionCard';
import EditInstructionCard from '../../component/EditInstructionCard';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component-2';
import AddReviewModal from '../../component/Modal/AddReviewModal';
import AddIngredientModal from '../../component/Modal/AddIngredientModal';
import AddInstructionModal from '../../component/Modal/AddInstructionModal';
import API from '../../api/apiRequest';

export default function DraftRecipeScreen({ navigation, route }) {


    const {recipeID, recipeName, recipeDescription, recipeURL, recipeDate} = route.params;

    const User = loggedInUser
    
    const ingredientEndpoint = `recipe/${recipeID}/ingredients`;
    const [ingredients , ,loadingMessage1, loadIngredients] = useLoad(ingredientEndpoint);
    const instructionEndpoint = `recipe/${recipeID}/instructions`;
    const [instructions , ,loadingMessage2, loadInstructions] = useLoad(instructionEndpoint);
    const feedbackEndpoint = `recipe/${recipeID}/feedback`;    
    const [feedback, ,loadingMessage3, loadFeedback] = useLoad(feedbackEndpoint);

    const [modalVisible, setModalVisible] = useState(false);
    const [ingredientModalVisible, setIngredientModalVisible] = useState(false);

    const handleModalOpen = () => {
      setModalVisible(true);
    };
  
    const handleModalClose = () => {
      setModalVisible(false);
    };

    const handleIngredientModalOpen = () => {
      setIngredientModalVisible(true);
    };
  
    const handleIngredientModalClose = () => {
      setIngredientModalVisible(false);
    };

    const handleRecipePut = async (recipe) => {
      console.log(recipe)
      const outcome = await API.put(`recipe/draft/${recipeID}`, recipe);
      navigation.navigate('Tab')
      
      
    }

    const handlePublishRecipe = () => {
      const publishedRecipe = {
        RecipeID: recipeID,
        RecipeName: recipeName,
        RecipeDescription: recipeDescription,
        RecipeURL: recipeURL,
        datePosted: recipeDate,
        isPublished: 'published',
        UserID: User
      }

      handleRecipePut(publishedRecipe)

    }
   
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
         
          loadIngredients(ingredientEndpoint);
          loadInstructions(instructionEndpoint);
          loadFeedback(feedbackEndpoint);

          console.log(recipeID);

          !ingredients
          ? console.log("No ingredients")
          : console.log(ingredients);

          !instructions
          ? console.log("No instructions")
          : console.log(instructions);

          !feedback
          ? console.log("No feedback")
          : console.log(feedback);
          
       });
  
       // Return the function to unsubscribe from the event so it gets removed on unmount
       return unsubscribe;
       }, [navigation]);

       React.useEffect(() => { loadIngredients(ingredientEndpoint) }, []);
       React.useEffect(() => { loadInstructions(instructionEndpoint) }, []);

       useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 204, 255, 0.5)'}} screenOptions={{ headerShown:true }}>

        <ScrollView>
            <Image style={styles.imageStyle} source={{uri: recipeURL}} />
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Text style={styles.titleStyle}>{recipeName}</Text>
                    <Text style={styles.categoryStyle}>{recipeDescription}</Text>
                    <Text style={styles.categoryStyle}>{new Date(recipeDate).toLocaleDateString()}</Text>
                </View>
            </View>

            
                <View style={styles.boxcontainer}>
                  <Text style={styles.IngredientsTitleStyle}>What you'll need</Text>
                  <FlatList
                        data={ingredients}
                        renderItem={({ item }) => {
                        return (
                            <EditIngredientsTable 
                            info={item} 
                            loadIngredients={loadIngredients} 
                            RecipeID = {recipeID}
                            />
                        );
                        }}
                        keyExtractor={(ingredient) => ingredient.IngredientID.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                  <View>
                      <Pressable onPress={handleIngredientModalOpen} style={styles.button}>
                          <Text style={styles.text}>Add an Ingredient</Text>
                      </Pressable>
                      <AddIngredientModal 
                      visible={ingredientModalVisible} 
                      onClose={handleIngredientModalClose} 
                      recipeID={recipeID} 
                      loadIngredients={loadIngredients}
                      />
                  </View>
                </View>
                <View style={styles.boxcontainer}>
                <Text style={styles.RecipeTitleStyle}>Recipe:</Text>
                    <FlatList
                        data={instructions}
                        renderItem={({ item }) => {
                        return (
                            <EditInstructionCard 
                            info={item} 
                            loadInstruction={loadInstructions} 
                            RecipeID = {recipeID}
                            />
                        );
                        }}
                        keyExtractor={(instruction) => instruction.InstructionID.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                    <View>
                      <Pressable onPress={handleModalOpen} style={styles.button}>
                          <Text style={styles.text}>Add a Step</Text>
                      </Pressable>
                      <AddInstructionModal 
                      visible={modalVisible} 
                      onClose={handleModalClose} 
                      recipeID={recipeID} 
                      loadInstructions={loadInstructions}
                      />
                  </View>
                      
                </View>
                      <Pressable onPress={handlePublishRecipe}  style={styles.button}>
                          <Text >Publish Recipe</Text>
                      </Pressable>
            </ScrollView>

       

        </View>
    );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 30,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
    
  },
  boxcontainer: {
    backgroundColor: '#fff',
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 15,
    width: deviceWidth - 30,
    borderRadius: 20,
    
   
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  imageStyle: {
    height: 180,
    width: deviceWidth - 0,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
    alignContent: 'center',
    alignSelf: 'center',
  },
  IngredientsTitleStyle: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 20
  },
  RecipeTitleStyle: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 20
  },
  ReviewTitleStyle: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 20
  },
  categoryStyle: {
    alignContent: 'center',
    alignSelf: 'center',
    
  },
  itemContainer: {
    marginTop: 5,
    padding: 5,
    borderBottomWidth: 1,
   
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
    alignSelf: 'flex-start'
  },
  button: {

    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 6
  },
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30
  },

  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' },

  borderStyling : { 
    borderWidth: 2, 
    borderColor: '#000000' }
});
 