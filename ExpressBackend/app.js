// Imports -----------------------------
import express from 'express';
import database from './database.js'
import cors from 'cors';

// Configure express app ---------------
const app = new express();

// Configure middleware ----------------
app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});



app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Controllers

const buildSetFields = (fields) => fields.reduce((setSQL, field, index) =>
  setSQL + `${field}=:${field}` + ((index === fields.length - 1) ? '' : ', '), 'SET ');

const read = async (selectSql) => {
  try {
    const [result] = await database.query(selectSql);
    return (result.length === 0)
      ? { isSuccess: false, result: null, message: "No record(s) found" }
      : { isSuccess: true, result: result, message: "Records successfully recovered" }
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute message ${error.message}` };
    }
}

const create = async (sql,record) => {
  try {
    const status = await database.query(sql,record);

    let isSuccess = false;
    let message = "";
    let result = null;
    try {
    [result] = await database.query(sql);
    if (result.length === 0) message ="No records found";
    else {
      isSuccess = true;
      message = 'Records successfully recovered';
    }
    }
    catch (error) {
      message = `-Failed to execute message ${error.message}`
    }

    return isSuccess
      ? { isSuccess: true, result: result, message: 'Record successfully recovered' }
      : { isSuccess: false, result: null, message: `Failed to recover the inserted record: ${message}` };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
  }
};

const update = async (sql, id, record, primaryKey) => {
  try {
    const status = await database.query(sql, { ...record, [primaryKey]: id } );

    let isSuccess = false;
    let message = "";
    let result = null;
    try {
    [result] = await database.query(sql);
    if (result.length === 0) message ="No records found";
    else {
      isSuccess = true;
      message = 'Records successfully recovered';
    }
    }
    catch (error) {
      message = `-Failed to execute message ${error.message}`
    }

    return isSuccess
      ? { isSuccess: true, result: result, message: 'Record successfully recovered' }
      : { isSuccess: false, result: null, message: `Failed to recover the inserted record: ${message}` };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
  }
};

const remove = async (sql) => {
  try {
    const status = await database.query(sql);
    return status[0].affectedRows === 0
      ? { isSuccess: false, result: null, message: "Failed to delete record" }
      : { isSuccess: true, result: null, message: "Record successfully deleted" }
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute message ${error.message}` };
    }
  
};

const buildRecipeDetailsSelectSQL = (id1, id2, variant) => {
  let sql = '';
  let fields = '';
  let table = '';
  let order = '';
  

  switch(variant) {
    case 'ingredients':
      table = 'ingredients'
      fields = ['IngredientID, IngredientName, IngredientCost']
      sql = `SELECT ${fields} FROM ${table} WHERE RecipeID=${id1}`;
      break;
    case 'instructions':
      table = 'recipeinstructions'
      fields = ['InstructionID, Instruction, RecipeID'];
      sql = `SELECT ${fields} FROM ${table} WHERE RecipeID=${id1}`;
      break;
    case 'feedback':
      table = 'feedback'
      fields = ['FeedbackID, RecipeID, UserID, FeedbackTitle, Rating, Review, DatePosted'];
      order = 'DatePosted DESC'
      sql = `SELECT ${fields} FROM ${table} WHERE RecipeID=${id1} ORDER BY ${order}`;
      break;
  }

  return sql;
}

const buildRecipesSelectSQL = (id1, id2, variant) => {
  let sql = '';
  let fields = ['RecipeID, RecipeName, RecipeDescription, RecipeURL, datePosted, isPublished, UserID'];
  let table = 'recipe';
  let extendedTable = '';

  switch(variant) {
    default:
      sql = `SELECT ${fields} FROM ${table} WHERE isPublished=\'published\'`;
      break;
    case 'draft':
      sql = `SELECT ${fields} FROM ${table} WHERE isPublished=\'draft\' AND UserID=${id1}`;
      break;
    case 'userpublish':
      sql = `SELECT ${fields} FROM ${table} WHERE isPublished=\'published\' AND UserID=${id1}`;
      
  }

  return sql;

}

const getPublishedRecipesController = async (req, res) => {
  
  //Validate Request

  const sql = buildRecipesSelectSQL(null, null, null)
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getDraftRecipesController = async (req, res) => {
  
  const id1 = req.params.id1
  //Validate Request

  const sql = buildRecipesSelectSQL(id1, null, 'draft')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const getUsersPublishedRecipesController = async (req, res) => {
  
  const id1 = req.params.id1
  //Validate Request

  const sql = buildRecipesSelectSQL(id1, null, 'userpublish')
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
};

const postRecipeController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createRecipe();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createRecipe = () => {
  let table = 'Recipe';
  let mutableFields = ['RecipeID', 'RecipeName', 'RecipeDescription', 'RecipeURL', 'datePosted', 'isPublished', 'UserID'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};

const putRecipeController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  const record = req.body;
  const primaryKey = 'RecipeID';
  //add here

  // Access data
  const sql = buildRecipeUpdateSql();
  const { isSuccess, result, message: accessorMessage } = await update(sql, id, record, primaryKey);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const buildRecipeUpdateSql = () => {
  let table = 'Recipe';
  let mutableFields = ['RecipeID', 'RecipeName', 'RecipeDescription', 'RecipeURL', 'datePosted', 'isPublished', 'UserID'];
  return `UPDATE ${table} ` + buildSetFields(mutableFields) + ` WHERE RecipeID=:RecipeID`;
};

const deleteDraftRecipeController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  
  // Access data
  const sql = removeDraftRecipe(id);
  const { isSuccess, result, message: accessorMessage } = await remove(sql);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const removeDraftRecipe = (id) => {
  let table = 'recipe';
  return `DELETE from ${table} WHERE RecipeID=${id}`;
};

const buildFollowSelectSQL = (id1, id2, variant) => {
  let sql = '';
  let fields = '';
  let table = 'user';
  let join = '';
  

  switch(variant) {
    case 'followee':
      fields = ['follow.FollowID, User.UserID, User.firstname, User.lastname']
      join = ['User.UserID=follow.FolloweeID']
      sql = `SELECT User.UserID, User.firstname, User.lastname, follow.FollowID, follow.FolloweeID
              FROM user
              LEFT JOIN follow
              ON User.UserID=follow.FolloweeID
              WHERE follow.FollowerID=${id1}`;
      break;
    case 'isFollowing':
      fields = ['FollowID']
      table = "follow"
      sql = `SELECT ${fields} FROM ${table} WHERE FollowerID=${id1} AND FolloweeID=${id2}`;
      break;


  }

  return sql;
}

const getRecipeIngredientsController = async (req, res) => {
  const id1 = req.params.id;

  const sql = buildRecipeDetailsSelectSQL(id1, null, "ingredients")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

const postRecipeIngredientsController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createIngredient();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createIngredient = () => {
  let table = 'ingredients';
  let mutableFields = ['IngredientID','IngredientName','IngredientCost','RecipeID'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};

const putRecipeIngredientsController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  const record = req.body;
  const primaryKey = 'IngredientID';
  //add here

  // Access data
  const sql = buildIngredientsUpdateSql();
  const { isSuccess, result, message: accessorMessage } = await update(sql, id, record, primaryKey);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const buildIngredientsUpdateSql = () => {
  let table = 'ingredients';
  let mutableFields = ['IngredientID','IngredientName','IngredientCost','RecipeID'];
  return `UPDATE ${table} ` + buildSetFields(mutableFields) + ` WHERE IngredientID=:IngredientID`;
};

const deleteIngredientController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  
  // Access data
  const sql = removeIngredient(id);
  const { isSuccess, result, message: accessorMessage } = await remove(sql);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const removeIngredient = (id) => {
  let table = 'ingredients';
  return `DELETE from ${table} WHERE IngredientID=${id}`;
};

const getRecipeInstructionsController = async (req, res) => {
  const id1 = req.params.id;

  const sql = buildRecipeDetailsSelectSQL(id1, null, "instructions")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

const postRecipeInstructionsController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createInstruction();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createInstruction = () => {
  let table = 'recipeinstructions';
  let mutableFields = ['InstructionID','Instruction','RecipeID'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};

const putRecipeInstructionsController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  const record = req.body;
  const primaryKey = 'InstructionID';
  //add here

  // Access data
  const sql = buildInstructionUpdateSql();
  const { isSuccess, result, message: accessorMessage } = await update(sql, id, record, primaryKey);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const buildInstructionUpdateSql = () => {
  let table = 'recipeinstructions';
  let mutableFields = ['InstructionID','Instruction','RecipeID'];
  return `UPDATE ${table} ` + buildSetFields(mutableFields) + ` WHERE InstructionID=:InstructionID`;
};

const deleteInstructionController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  
  // Access data
  const sql = removeInstruction(id);
  const { isSuccess, result, message: accessorMessage } = await remove(sql);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}


const removeInstruction = (id) => {
  let table = 'recipeinstructions';
  return `DELETE from ${table} WHERE InstructionID=${id}`;
};



const getRecipeFeedbackController = async (req, res) => {
  const id1 = req.params.id;

  const sql = buildRecipeDetailsSelectSQL(id1, null, "feedback")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

const postRecipeFeedbackController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createFeedback();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createFeedback = () => {
  let table = 'feedback';
  let mutableFields = ['UserID','RecipeID','FeedbackTitle','Rating','Review','DatePosted'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};

const getFolloweeController = async (req, res) => {
  const id1 = req.params.id1;

  const sql = buildFollowSelectSQL(id1, null, "followee")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

const getIsFollowingController = async (req, res) => {
  const id1 = req.params.id1;
  const id2 = req.params.id2;

  const sql = buildFollowSelectSQL(id1, id2, "isFollowing")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

const postFollowController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createFollow();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createFollow = () => {
  let table = 'follow';
  let mutableFields = ['FolloweeID','FollowerID'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};

const removeFollowController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  
  // Access data
  const sql = removeFollow(id);
  const { isSuccess, result, message: accessorMessage } = await remove(sql);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const removeFollow = (id) => {
  let table = 'follow';
  return `DELETE from ${table} WHERE FollowID=${id}`;
};

const buildSavedSelectSQL = (id1, id2, variant) => {
  let sql = '';
  let fields = '';
  let table = 'saved';
  let join = '';
  

  switch(variant) {
    case 'isSaved':
   
      sql = `SELECT SavedRecipeID, recipe.RecipeID ,recipe.RecipeName
              FROM saved
              LEFT JOIN recipe 
              ON recipe.RecipeID = saved.RecipeID
              WHERE saved.RecipeID = ${id1} AND saved.UserID = ${id2}`;
      break;
    case 'saved':
      sql = `SELECT SavedRecipeID, recipe.RecipeID ,recipe.RecipeName, recipe.RecipeDescription, recipe.RecipeURL, recipe.datePosted, recipe.UserID
              FROM saved
              LEFT JOIN recipe 
              ON recipe.RecipeID = saved.RecipeID
              WHERE saved.UserID = ${id1}`;
      break;


  }

  return sql;
}

const getIsRecipeSavedController = async (req, res) => {
  const id1 = req.params.id1;
  const id2 = req.params.id2;

  const sql = buildSavedSelectSQL(id1, id2, "isSaved")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

const getSavedRecipesController = async (req, res) => {
  const id1 = req.params.id1;

  const sql = buildSavedSelectSQL(id1, null, "saved")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

const postSaveRecipeController = async (req, res) => {
  // Validate request

  // Access data
  const sql = createSaved();
  const { isSuccess, result, message: accessorMessage } = await create(sql,req.body);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(201).json(result);
};

const createSaved = () => {
  let table = 'saved';
  let mutableFields = ['RecipeID','UserID'];
  return `INSERT INTO ${table} ` + buildSetFields(mutableFields);
};



const removeSavedRecipeController = async (req, res) => {
  // Validate request
  const id = req.params.id;
  
  // Access data
  const sql = removeSave(id);
  const { isSuccess, result, message: accessorMessage } = await remove(sql);
  if (!isSuccess) return res.status(400).json({ message: accessorMessage });
  
  // Response to request
  res.status(200).json(result);
  
}

const removeSave = (id) => {
  let table = 'saved';
  return `DELETE from ${table} WHERE SavedRecipeID=${id}`;
};

const buildUserSelectSQL = (id1, id2, variant) => {
  let sql = '';
  let fields = '';
  let table = 'user';
  let join = '';
  

  switch(variant) {
    case 'user':
      sql = `SELECT user.UserID, user.firstname, user.lastname, user.email, userprofile.biography, userprofile.facebook, userprofile.youtube, userprofile.twitter 
              FROM userprofile 
              LEFT JOIN User
              ON User.UserID=userprofile.UserProfileID
              WHERE User.UserID = ${id1}`
      break;
   


  }

  return sql;
}

const getUserProfileController = async (req, res) => {
  const id1 = req.params.id1;

  const sql = buildUserSelectSQL(id1, null, "user")
  const { isSuccess, result, message } = await read(sql);
  if(!isSuccess) return res.status(404).json({message});

  //Response to request
  res.status(200).json(result);
}

//Endpoints

//User
app.get('/api/userprofile/:id1', getUserProfileController)

//Main Recipe List Screen
app.get('/api/recipe', getPublishedRecipesController);
app.get('/api/recipe/draft/user/:id1', getDraftRecipesController);
app.get('/api/recipe/published/:id1', getUsersPublishedRecipesController)
app.post('/api/recipe', postRecipeController);
app.put('/api/recipe/draft/:id', putRecipeController) //pass recipe
app.delete('/api/recipe/:id', deleteDraftRecipeController)

//Ingredients
app.get('/api/recipe/:id/ingredients', getRecipeIngredientsController)
app.post('/api/recipe/ingredients', postRecipeIngredientsController)
app.put('/api/recipe/ingredients/:id', putRecipeIngredientsController)
app.delete('/api/recipe/ingredient/:id', deleteIngredientController)

//Instructions
app.get('/api/recipe/:id/instructions', getRecipeInstructionsController)
app.post('/api/recipe/instructions', postRecipeInstructionsController)
app.put('/api/recipe/instructions/:id', putRecipeInstructionsController)
app.delete('/api/recipe/instruction/:id', deleteInstructionController)

//Feedback
app.get('/api/recipe/:id/feedback', getRecipeFeedbackController)
app.post('/api/recipe/feedback', postRecipeFeedbackController)

//Follow
app.get('/api/followees/:id1', getFolloweeController) // Get followees by current user id
app.delete('/api/following/:id', removeFollowController) //Unfollow
app.get('/api/follower/:id1/followee/:id2', getIsFollowingController); //id1 = recipe author / id2 = loggedInUser 
app.post('/api/follow', postFollowController) // Post Followee id and the followerID

//Save
app.get('/api/saved/recipe/:id1/user/:id2', getIsRecipeSavedController) // is RecipeSaved? Returns current savedRecipeID, pass in RecipeID and UserID
app.get('/api/saved/recipe/user/:id1', getSavedRecipesController) // Get all recipes saved by loggedInUser
app.post('/api/saved', postSaveRecipeController) // Save a recipe
app.delete('/api/saved/:id', removeSavedRecipeController) //Unsave a recipe




//Connection
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));