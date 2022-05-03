import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";

export default function App() {
  const sampleGoals = [
    { task: "Faire les courses", id: Math.random().toString() },
    {
      task: "Aller à la salle de sport 3 fois par semaine",
      id: Math.random().toString(),
    },
    { task: "Monter à plus de 5000m d altitude", id: Math.random().toString() },
    { task: "Acheter mon premier appartement", id: Math.random().toString() },
    { task: "Perdre 5 kgs", id: Math.random().toString() },
    { task: "Gagner en productivité", id: Math.random().toString() },
    { task: "Apprendre un nouveau langage", id: Math.random().toString() },
    { task: "Faire une mission en freelance", id: Math.random().toString() },
    {
      task: "Organiser un meetup autour de la tech",
      id: Math.random().toString(),
    },
    { task: "Faire un triathlon", id: Math.random().toString() },
  ];

  const [goal, setGoal] = useState({});
  const [goalsList, setGoalsList] = useState(sampleGoals);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const handleChangeText = (e) => {
    setGoal({ task: e, id: Math.random().toString() });
  };

  const handleUpdateText = (e, goal) => {
    setGoal({ task: e, id: goal.id });
  };

  const handleOnPress = () => {
    setGoalsList([...goalsList, goal]);
    setGoal("");
  };

  const deleteItem = (id) => {
    setGoalsList((currentGoalsList) => {
      return currentGoalsList.filter((goal) => goal.id !== id);
    });
  };

  const handleUpdateGoal = (goal) => {
    console.log("update goal content");
    setUpdateModalVisible(true);
    setGoal({ task: goal.task, id: goal.id });
  };

  const handleUpdateGoalText = (item) => {
    //bad method
    goalsList.map((goal) => {
      goal.id == item.id && (goal.task = item.task);
    });
  };
  useEffect(() => {
    console.log("goalList :", goalsList);
  }, [goalsList]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setUpdateModalVisible(!updateModalVisible);
        }}
      >
        <View style={styles.modaleContainer}>
          <Image
            source={require("./assets/target4.png")}
            style={{ width: 120, height: 120, alignSelf: "center" }}
          />

          <TextInput
            style={styles.input}
            value={goal.task}
            clearTextOnFocus={false}
            onChangeText={(e) => handleUpdateText(e, goal)}
            placeholder={"Je veux être plus riche qu'Elon"}
          />
          <View style={styles.pressable}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                handleUpdateGoalText(goal);
                setUpdateModalVisible(false);
              }}
            >
              <Text style={[styles.textStyle, styles.button]}>
                Update content
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setUpdateModalVisible(false)}
            >
              <Text style={[styles.textStyle, styles.button]}>Cancel </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modaleContainer}>
          <Image
            source={require("./assets/target4.png")}
            style={{ width: 120, height: 120, alignSelf: "center" }}
          />

          <TextInput
            style={styles.input}
            value={goal.task}
            clearTextOnFocus={true}
            onChangeText={(e) => handleChangeText(e)}
            placeholder={"Je veux être plus riche qu'Elon"}
          />
          <View style={styles.pressable}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={(e) => {
                handleOnPress(e);
                setModalVisible(false);
              }}
            >
              <Text style={[styles.textStyle, styles.button]}>Add Goal </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.textStyle, styles.button]}>Cancel </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        {!modalVisible && !updateModalVisible && (
          <>
            <View style={styles.formFields}>
              <Image
                source={require("./assets/target4.png")}
                style={{
                  width: 120,
                  height: 120,
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              />
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.button}>Add a new goal </Text>
              </Pressable>
            </View>
            <View style={styles.goalListStyle}>
              {goalsList &&
                goalsList.map((goal, index) => (
                  <View style={styles.goalItem}>
                    <View style={styles.goalItemBackground}>
                      <Text
                        key={index}
                        style={styles.goalItemText}
                        onPress={() => handleUpdateGoal(goal)}
                      >
                        {"\u2022"} {goal.task}
                      </Text>
                    </View>
                    <Text
                      key={index}
                      style={styles.deleteCross}
                      onPress={() => deleteItem(goal.id)}
                    >
                      x
                    </Text>
                  </View>
                ))}
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#4C068D",
    flex: 1,
  },
  input: {
    height: 50,
    width: 250,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#9370DB",
    color: "#4C068D",
    fontSize: 20,
  },
  button: {
    //backgroundColor: "#DDDDDD",
    color: "#9370DB",
    fontWeight: "bold",
    height: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    fontSize: 20,
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
    backgroundColor: "#9370DB",
    marginVertical: 5,
    minWidth: "85%",
    maxWidth: "90%",
  },
  deleteCross: {
    fontSize: 35,
    marginLeft: 10,
    alignSelf: "center",
    color: "#C71FE5",
    borderRadius: 5,
    //backgroundColor: "#5B0C83",
  },
  goalItem: {
    flexDirection: "row",
  },
  pressable: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  modaleContainer: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    backgroundColor: "#4C068D",
  },
  buttonText: {},
});
