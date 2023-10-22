-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2023 at 11:53 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mealmate`
--

-- --------------------------------------------------------

--
-- Table structure for table `allergies`
--

CREATE TABLE `allergies` (
  `AllergyID` int(5) NOT NULL,
  `AllergyName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `allergyinfo`
--

CREATE TABLE `allergyinfo` (
  `AllergyInfoID` int(5) NOT NULL,
  `AllergyID` int(5) NOT NULL,
  `RecipeID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `eatingtype`
--

CREATE TABLE `eatingtype` (
  `EatingTypeID` int(5) NOT NULL,
  `EatingTypeName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `eatingtypeinfo`
--

CREATE TABLE `eatingtypeinfo` (
  `EatingTypeInfoID` int(5) NOT NULL,
  `EatingTypeID` int(5) NOT NULL,
  `RecipeID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `FeedbackID` int(5) NOT NULL,
  `UserID` int(5) NOT NULL,
  `RecipeID` int(5) NOT NULL,
  `FeedbackTitle` varchar(50) NOT NULL,
  `Rating` int(1) NOT NULL,
  `Review` varchar(300) NOT NULL,
  `DatePosted` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`FeedbackID`, `UserID`, `RecipeID`, `FeedbackTitle`, `Rating`, `Review`, `DatePosted`) VALUES
(1, 1, 1, 'Bland', 2, 'Terrible bland cookies', '2023-03-15'),
(2, 1, 1, 'Tried it again', 3, 'Still bland :(', '2023-03-22'),
(18, 4, 7, 'It was quite salty?', 2, 'Not sure why you dumped in 500grams of MSG but sure?', '2023-03-23');

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `FollowID` int(5) NOT NULL,
  `FollowerID` int(5) NOT NULL,
  `FolloweeID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`FollowID`, `FollowerID`, `FolloweeID`) VALUES
(26, 2, 1),
(50, 1, 4),
(51, 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `follower_id` int(5) NOT NULL,
  `followed_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `IngredientID` int(5) NOT NULL,
  `IngredientName` varchar(50) NOT NULL,
  `IngredientCost` decimal(6,2) NOT NULL,
  `RecipeID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`IngredientID`, `IngredientName`, `IngredientCost`, `RecipeID`) VALUES
(2, 'brown sugar', '3.00', 1),
(3, 'sugar', '5.00', 1),
(6, 'Tomato Sauce', '3.33', 2),
(17, 'Chicken', '1.56', 44),
(19, 'Dough', '1.54', 2),
(20, 'Pepperoni', '3.44', 2),
(21, 'MSG', '34.99', 7);

-- --------------------------------------------------------

--
-- Table structure for table `mealplan`
--

CREATE TABLE `mealplan` (
  `MealPlanID` int(5) NOT NULL,
  `MealID` int(5) NOT NULL,
  `PlanID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `MealID` int(5) NOT NULL,
  `MealCost` decimal(20,2) NOT NULL,
  `RecipeID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `PlanID` int(5) NOT NULL,
  `Budget` decimal(20,2) NOT NULL,
  `UserID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `RecipeID` int(5) NOT NULL,
  `RecipeName` varchar(50) DEFAULT NULL,
  `RecipeDescription` varchar(300) DEFAULT NULL,
  `RecipeURL` varchar(5000) DEFAULT NULL,
  `datePosted` datetime DEFAULT NULL,
  `isPublished` varchar(11) DEFAULT NULL CHECK (`isPublished` in ('published','draft')),
  `UserID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`RecipeID`, `RecipeName`, `RecipeDescription`, `RecipeURL`, `datePosted`, `isPublished`, `UserID`) VALUES
(1, 'Cookies', 'Homemade cookies', 'https://bakerjo.co.uk/wp-content/uploads/2020/08/IMG_4518.jpg', '2023-03-30 09:26:58', 'published', 3),
(2, 'Pizza', 'Fresh Pizza', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/800px-Eq_it-na_pizza-margherita_sep2005_sml.jpg', '2023-03-28 18:52:31', 'published', 1),
(7, 'Chow mein', 'Delectable Chow mein', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chow-mein-c48a006.jpg', '2023-03-30 08:26:58', 'published', 4),
(42, 'test', 'testing', 'https://png.pngtree.com/png-clipart/20220628/ourmid/pngtree-grass-realistic-green-nature-png-image_5377723.png', '2023-03-01 18:41:14', 'draft', 3),
(43, 'test2', 'test2', 'https://png.pngtree.com/png-clipart/20220628/ourmid/pngtree-grass-realistic-green-nature-png-image_5377723.png', '2023-03-21 18:41:14', 'draft', 2),
(44, 'Chicken', 'Roast chicken stuffed with herbs', 'http://res.cloudinary.com/dcpxszs6j/image/upload/v1680165292/qrhuqbhrixqhiglnuosg.jpg', '2023-03-30 08:34:55', 'draft', 1);

-- --------------------------------------------------------

--
-- Table structure for table `recipeinstructions`
--

CREATE TABLE `recipeinstructions` (
  `InstructionID` int(5) NOT NULL,
  `Instruction` varchar(1300) DEFAULT NULL,
  `RecipeID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recipeinstructions`
--

INSERT INTO `recipeinstructions` (`InstructionID`, `Instruction`, `RecipeID`) VALUES
(1, 'Step 1: Knead the dough', 1),
(2, 'Step 2: Add sugar', 1),
(3, 'Step 3: Place in oven for 30 minutes', 1),
(4, 'Step 4: Take out of oven and enjoy', 1),
(12, 'Step 1 - Make the base: Put the flour into a large bowl, then stir in the yeast and salt. Make a well, pour in 200ml warm water and the olive oil and bring together with a wooden spoon until you have a soft, fairly wet dough. Turn onto a lightly floured surface and knead for 5 mins until smooth. Cover with a tea towel and set aside. You can leave the dough to rise if you like, but it’s not essential for a thin crust.', 2),
(13, 'Step 2 - Make the sauce: Mix the passata, basil and crushed garlic together, then season to taste. Leave to stand at room temperature while you get on with shaping the base.', 2),
(14, 'Step 3 - Roll out the dough: if you’ve let the dough rise, give it a quick knead, then split into two balls. On a floured surface, roll out the dough into large rounds, about 25cm across, using a rolling pin. The dough needs to be very thin as it will rise in the oven. Lift the rounds onto two floured baking sheets.', 2),
(15, 'Step 4 - Top and bake: heat the oven to 240C/220C fan/gas 8. Put another baking sheet or an upturned baking tray in the oven on the top shelf. Smooth sauce over bases with the back of a spoon. Scatter with cheese and tomatoes, drizzle with olive oil and season. Put one pizza, still on its baking sheet, on top of the preheated sheet or tray. Bake for 8-10 mins until crisp. Serve with a little more olive oil, and basil leaves if using. Repeat step for remaining pizza.\r\n\r\n', 2),
(17, 'Buy pot chowmein from lidl and add all MSG.', 7);

-- --------------------------------------------------------

--
-- Table structure for table `saved`
--

CREATE TABLE `saved` (
  `SavedRecipeID` int(5) NOT NULL,
  `RecipeID` int(5) NOT NULL,
  `UserID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `saved`
--

INSERT INTO `saved` (`SavedRecipeID`, `RecipeID`, `UserID`) VALUES
(23, 7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(5) NOT NULL,
  `firstname` varchar(22) NOT NULL,
  `lastname` varchar(22) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `firstname`, `lastname`, `email`) VALUES
(1, 'Henri', 'Roquain', 'muammeroq@hotmail.com'),
(2, 'Owen', 'Wilson', 'henriroquain@gmail.com'),
(3, 'Jack', 'Dempsy', 'something@gmail.com'),
(4, 'Jones', 'Smith', 'hello@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `userprofile`
--

CREATE TABLE `userprofile` (
  `UserProfileID` int(5) NOT NULL,
  `UserID` int(5) NOT NULL,
  `biography` varchar(100) NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `youtube` varchar(100) NOT NULL,
  `twitter` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userprofile`
--

INSERT INTO `userprofile` (`UserProfileID`, `UserID`, `biography`, `facebook`, `youtube`, `twitter`) VALUES
(1, 1, 'An expert of baking', 'https://en-gb.facebook.com/', 'https://www.youtube.com/', 'https://twitter.com/?lang=en'),
(2, 3, 'Hello there', 'https://en-gb.facebook.com/', 'https://www.youtube.com/', 'https://twitter.com/?lang=en'),
(3, 3, 'fiwqfiwqjfiwq', 'https://en-gb.facebook.com/', 'https://www.youtube.com/', 'https://twitter.com/?lang=en'),
(4, 4, 'awfowqkfowqkf', 'https://en-gb.facebook.com/', 'https://www.youtube.com/', 'https://twitter.com/?lang=en');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allergies`
--
ALTER TABLE `allergies`
  ADD PRIMARY KEY (`AllergyID`);

--
-- Indexes for table `allergyinfo`
--
ALTER TABLE `allergyinfo`
  ADD PRIMARY KEY (`AllergyInfoID`),
  ADD KEY `AllergyID` (`AllergyID`),
  ADD KEY `RecipeID` (`RecipeID`);

--
-- Indexes for table `eatingtype`
--
ALTER TABLE `eatingtype`
  ADD PRIMARY KEY (`EatingTypeID`);

--
-- Indexes for table `eatingtypeinfo`
--
ALTER TABLE `eatingtypeinfo`
  ADD PRIMARY KEY (`EatingTypeInfoID`),
  ADD KEY `EatingTypeID` (`EatingTypeID`),
  ADD KEY `RecipeID` (`RecipeID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`FeedbackID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `RecipeID` (`RecipeID`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`FollowID`),
  ADD KEY `FollowerID` (`FollowerID`),
  ADD KEY `FolloweeID` (`FolloweeID`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`follower_id`,`followed_id`),
  ADD KEY `followed_ibfk_2` (`followed_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`IngredientID`),
  ADD KEY `RecipeID` (`RecipeID`);

--
-- Indexes for table `mealplan`
--
ALTER TABLE `mealplan`
  ADD PRIMARY KEY (`MealPlanID`),
  ADD KEY `MealID` (`MealID`),
  ADD KEY `PlanID` (`PlanID`);

--
-- Indexes for table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`MealID`),
  ADD KEY `RecipeID` (`RecipeID`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`PlanID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`RecipeID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `recipeinstructions`
--
ALTER TABLE `recipeinstructions`
  ADD PRIMARY KEY (`InstructionID`),
  ADD KEY `RecipeID` (`RecipeID`);

--
-- Indexes for table `saved`
--
ALTER TABLE `saved`
  ADD PRIMARY KEY (`SavedRecipeID`),
  ADD KEY `RecipeID` (`RecipeID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD PRIMARY KEY (`UserProfileID`),
  ADD KEY `UserID` (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allergies`
--
ALTER TABLE `allergies`
  MODIFY `AllergyID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `allergyinfo`
--
ALTER TABLE `allergyinfo`
  MODIFY `AllergyInfoID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eatingtype`
--
ALTER TABLE `eatingtype`
  MODIFY `EatingTypeID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eatingtypeinfo`
--
ALTER TABLE `eatingtypeinfo`
  MODIFY `EatingTypeInfoID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `FeedbackID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `FollowID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `IngredientID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `mealplan`
--
ALTER TABLE `mealplan`
  MODIFY `MealPlanID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `MealID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `PlanID` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `RecipeID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `recipeinstructions`
--
ALTER TABLE `recipeinstructions`
  MODIFY `InstructionID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `saved`
--
ALTER TABLE `saved`
  MODIFY `SavedRecipeID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userprofile`
--
ALTER TABLE `userprofile`
  MODIFY `UserProfileID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `allergyinfo`
--
ALTER TABLE `allergyinfo`
  ADD CONSTRAINT `allergyinfo_ibfk_1` FOREIGN KEY (`AllergyInfoID`) REFERENCES `allergies` (`AllergyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `allergyinfo_ibfk_2` FOREIGN KEY (`RecipeID`) REFERENCES `recipe` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `eatingtypeinfo`
--
ALTER TABLE `eatingtypeinfo`
  ADD CONSTRAINT `eatingtypeinfo_ibfk_1` FOREIGN KEY (`EatingTypeID`) REFERENCES `eatingtype` (`EatingTypeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eatingtypeinfo_ibfk_2` FOREIGN KEY (`RecipeID`) REFERENCES `recipe` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`RecipeID`) REFERENCES `recipe` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`FollowerID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`FolloweeID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `recipe` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mealplan`
--
ALTER TABLE `mealplan`
  ADD CONSTRAINT `mealplan_ibfk_1` FOREIGN KEY (`MealID`) REFERENCES `meals` (`MealID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mealplan_ibfk_2` FOREIGN KEY (`PlanID`) REFERENCES `plan` (`PlanID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meals`
--
ALTER TABLE `meals`
  ADD CONSTRAINT `meals_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `recipe` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipeinstructions`
--
ALTER TABLE `recipeinstructions`
  ADD CONSTRAINT `recipeinstructions_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `recipe` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `saved`
--
ALTER TABLE `saved`
  ADD CONSTRAINT `saved_ibfk_1` FOREIGN KEY (`RecipeID`) REFERENCES `recipe` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `saved_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
