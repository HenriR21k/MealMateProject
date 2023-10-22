import * as React from 'react';
import { Button, View, Text, ScrollView, FlatList, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { loggedInUser } from '../../api/currentUser';
import useLoad from '../../api/useLoad';
import { LogBox } from 'react-native';
import { useState, useEffect } from 'react';
import FeedbackCard from '../../component/FeedbackCard';
import IngredientsTable from '../../component/IngredientsTable';
import InstructionCard from '../../component/InstructionCard';
import API from '../../api/apiRequest';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component-2';
import AddReviewModal from '../../component/Modal/AddReviewModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ViewRecipeScreen({ navigation, route }) {


    const {recipeID, recipeName, recipeDescription, recipeURL, recipeDate, UserID} = route.params;
    
    const ingredientEndpoint = `recipe/${recipeID}/ingredients`;
    const [ingredients , ,loadingMessage1, loadIngredients] = useLoad(ingredientEndpoint);

    const instructionEndpoint = `recipe/${recipeID}/instructions`;
    const [instructions , ,loadingMessage2, loadInstructions] = useLoad(instructionEndpoint);

    const feedbackEndpoint = `recipe/${recipeID}/feedback`;    
    const [feedback, ,loadingMessage3, loadFeedback] = useLoad(feedbackEndpoint);
    

    const isFollowingEndpoint = `follower/${loggedInUser}/followee/${UserID}`
    const [isFollowing, ,loadingMessage4, loadIsFollowing] = useLoad(isFollowingEndpoint);

    const isSavedEndpoint = `saved/recipe/${recipeID}/user/${loggedInUser}`
    const [isSaved, setIsSaved, loadingMessage5, loadIsSaved] = useLoad(isSavedEndpoint)

    const endpoint = `userprofile/${UserID}`
    const [profile, , loadingMessage, loadProfile] = useLoad(endpoint);
 

    const [modalVisible, setModalVisible] = useState(false);

  

    
    //Every time this page is navigated to, it recalls the records.
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

          loadIngredients(ingredientEndpoint);
          loadInstructions(instructionEndpoint);
          loadFeedback(feedbackEndpoint);
          loadIsFollowing(isFollowingEndpoint);
          loadIsSaved(isSavedEndpoint)
          loadProfile(endpoint);

          console.log(recipeID);

          console.log(isFollowing);

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

      //Listens to each object, if it the object changes then reload the data
      React.useEffect(() => { loadFeedback(feedbackEndpoint) }, []);

      React.useEffect(() => {loadIsFollowing(isFollowingEndpoint)}, []); 

      React.useEffect(() => {loadIsSaved(isSavedEndpoint)}, []);

      //Changes icon depending on if the user saved a recipe or hasnt
      React.useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Ionicons 
              name={isSaved ? 'heart' : 'heart-outline'}
              color={'pink'}
              size={30}
              onPress={() => {
                if (isSaved) {
                  // Send a DELETE request to your server to remove the follow record
                  handleRemoveSave()
                  
                } else {
                  // Send a POST request to your server to add a follow record, null goes here
                  handleAddSave();
                }
              }}
            />
          )
        });
      }, [isSaved]);

      //Removes saved recipe
      const handleRemoveSave = async () => {
        if (isSaved) {
          console.log(isSaved[0].SavedRecipeID)
          const outcome = await API.delete(`saved/${isSaved[0].SavedRecipeID}`);
          await loadIsSaved(isSavedEndpoint);
          setIsSaved(false);
        }
      }

      //Creates saved recipe
      const handleAddSave = async () => {
        let object = {
          RecipeID: recipeID,
          UserID: loggedInUser
        }
        const outcome = await API.post(`saved`, object );
        loadIsSaved(isSavedEndpoint)
      }

      //The two functions below change the modal state to open and close.

      const handleModalOpen = () => {
        setModalVisible(true);
      };
    
      const handleModalClose = () => {
        setModalVisible(false);
      };

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
                    {
                       !profile
                       ? <Text>Loading</Text>
                       :<Pressable style={styles.button} onPress={() => navigation.navigate('AuthorPage', {
                         
                          Profile: profile[0],
                          User: loggedInUser
                           
                         })}>  
                           <Text style={styles.button}>{profile[0].firstname + " " + profile[0].lastname}</Text>
                       </Pressable>
                    }
                </View>
            </View>

            
                <View style={styles.boxcontainer}>
                  <Text style={styles.IngredientsTitleStyle}>What you'll need</Text>
                  <FlatList
                        data={ingredients}
                        renderItem={({ item }) => {
                        return (
                            <IngredientsTable info={item} />
                        );
                        }}
                        keyExtractor={(ingredient) => ingredient.IngredientID.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                </View>
                <View style={styles.boxcontainer}>
                <Text style={styles.RecipeTitleStyle}>Recipe:</Text>
                    <FlatList
                        data={instructions}
                        renderItem={({ item }) => {
                        return (
                            <InstructionCard info={item} />
                        );
                        }}
                        keyExtractor={(instruction) => instruction.InstructionID.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                </View>
                <View style={styles.boxcontainer}>
                <Text style={styles.ReviewTitleStyle}>Reviews:</Text>
                  <View>
                      <Pressable onPress={handleModalOpen} style={styles.button}>
                          <Text style={styles.button}>Leave a review</Text>
                      </Pressable>
                      <AddReviewModal 
                      visible={modalVisible} 
                      onClose={handleModalClose} 
                      recipeID={recipeID} 
                      UserID={loggedInUser}
                      loadFeedback={loadFeedback}
                      />
                  </View>
                  


                    <FlatList
                        data={feedback}
                        renderItem={({ item }) => {
                        return (
                            <FeedbackCard info={item} />
                        );
                        }}
                        keyExtractor={(review) => review.FeedbackID.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>

       

        </View>
    );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  boxcontainer: {
    backgroundColor: '#fff',
    marginTop: 25,
    marginBottom: 15,
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
    marginLeft: 20,
    
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
    alignSelf: 'flex-start',
    backgroundColor: 'pink',
    color: 'pink'
  },
  button: {
    color: 'pink',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: { flex: 1, padding: 16, paddingTop: 30},
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  borderStyling : { borderWidth: 2, borderColor: '#000000' }
});
 