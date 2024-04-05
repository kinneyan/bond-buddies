import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper'; 

const Personality = ({ selectedValues, handleRadioButtonChange }) => {

  const questions = [
    "1. It’s easy for you to make friends.",
    "2. You enjoy exploring the unknown.",
    "3. Seeing other people cry makes you want to cry as well.",
    "4. You always have multiple plans prepared in the event that one fails.",
    "5. You trust your instincts and gut feelings when making decisions.",
    "6. You wait for others to approach you first at public events.",
    "7. You find pleasure in setting reachable goals for yourself.",
    "8. You value helping others achieve their goals.",
    "9. You like to use organizing tools to manage your schedule.", 
    "10. You enjoy learning through hands-on experiences and experimentation.",
    "11. You enjoy approaching others first and striking up conversation.",
    "12. You prefer not to have invested conversations about abstract ideas.",
    "13. You view decision-making based on emotion as inefficient.",
    "14. You prefer to go through your days without a schedule.",
    "15. You enjoy participating in team-based activities.",
    "16. Your dreams tend to be vivid and creative.",
    "17. In a group, you prefer to listen than participate in the discussion.",
    "18. You often notice small changes in your environment that others might overlook.",
    "19. You believe it’s more important to rely on rationality than emotions.",
    "20. I'm open to new experiences and opportunities, even if they disrupt my existing plans.",
  ];

  return (

    <View style={styles.questionView}>

        <Text style={styles.testTitle}>Personality Type</Text>

        <ScrollView style={styles.questionsContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {questions.map((question, index) => (
          <View key={index} style={styles.questionItem}>
            <Text style={styles.questionText}>{question}</Text>
            <View style={styles.radioButtonContainer}>
              <RadioButton.Group
                value={selectedValues[index]} 
                onValueChange={(value) => handleRadioButtonChange(index, value)}
              >
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value="-2" />
                  <Text style={styles.radioButtonText}>Strongly Disagree</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value="-1" />
                  <Text style={styles.radioButtonText}>Disagree</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value="0" />
                  <Text style={styles.radioButtonText}>Neutral</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value="1" />
                  <Text style={styles.radioButtonText}>Agree</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value="2" />
                  <Text style={styles.radioButtonText}>Strongly Agree</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
        ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  questionView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testTitle: {
    fontFamily: 'Omnes Regular',
    fontSize: 30,
  },
  questionsContainer: {
    maxHeight: '70%',
    width: 350,
    flex: 1,
    marginTop: 40, 
  },
  questionItem: {
    marginBottom: 20,
  },
  questionText: {
    fontFamily: 'Roboto Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonText: {
    fontFamily: 'Roboto Regular',
  },
});

export default Personality;
