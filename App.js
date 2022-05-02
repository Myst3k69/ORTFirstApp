import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const sampleGoals = [
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon",
  ];

  const [goal, setGoal] = useState("Je veux être plus riche qu'Elon");
  const [goalsList, setGoalsList] = useState([]);

  const handleChangeText = (e) => {
    setGoal(e);
  };

  const handleOnPress = () => {
    setGoalsList([...goalsList, goal]);
    setGoal("");
  };

  const deleteItem = (index) => {
    const newGoalList = goalsList.splice(index + 1, 1);
    setGoalsList(newGoalList);
  };

  useEffect(() => {
    console.log("goalList :", goalsList);
  }, [goalsList]);

  return (
    <View style={styles.container}>
      <View style={styles.formFields}>
        <TextInput
          style={styles.input}
          value={goal}
          clearTextOnFocus={true}
          onChangeText={(e) => handleChangeText(e)}
          placeholder={"Je veux être plus riche qu'Elon"}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={(e) => handleOnPress(e)}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.goalListStyle}>
        {goalsList &&
          goalsList.map((goal, index) => (
            <View style={styles.goalItem}>
              <View style={styles.goalItemBackground}>
                <Text key={index} style={styles.goalItemText}>
                  {"\u2022"}
                  {goal}
                </Text>
              </View>
              <Text
                style={styles.deleteCross}
                onPress={() => deleteItem(index)}
              >
                x
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  input: {
    height: 50,
    width: 250,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#DDDDDD",
    width: 100,
    height: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  formFields: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalListStyle: {
    marginTop: 25,
    flexDirection: "column",
  },
  goalItemText: {
    fontSize: 20,
    padding: 5,
    marginTop: 10,

    color: "#FFFfFF",
  },
  goalItemBackground: {
    borderRadius: 5,
    backgroundColor: "#5B0C83",
    marginVertical: 5,
  },
  deleteCross: {
    fontSize: 35,
    marginHorizontal: 5,
    alignSelf: "center",
    color: "#C71FE5",
    borderRadius: 5,
    //backgroundColor: "#5B0C83",
  },
  goalItem: {
    flexDirection: "row",
  },
});
