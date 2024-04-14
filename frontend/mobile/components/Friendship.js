import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper'; 

const Friendship = ({ selectedValues, handleRadioButtonChange }) => {

  const questions = [
    "1. I enjoy spending one on one uninterrupted time with friends.",
    "2. Positive and uplifting words have a lasting impact on my self-esteem and happiness.",
    "3. I enjoy giving gifts to friends that are close to me.",
    "4. I do acts of gestures for my friends even if they dont ask for them.",
    "5. I appreciate it when friends surprise me with thoughtful gifts.",
    "6. I feel appreciated and loved when friends go out of their way to do something kind for me.",
    "7. Hearing sincere compliments from friends boosts my confidence and makes my day.",
    "8. I often find myself going out of my way to plan surprises for my friends and loved ones.",
    "9. Constructive feedback, delivered with kindness, helps me grow and improve.",
    "10. I enjoy when my friends show active participation in my personal interests.", 
    "11. I believe that gifts are an accurate representation of love and thoughtfulness.",
    "12. I find joy in taking on tasks to make the lives of my friends easier.",
    "13. I often find myself expressing appreciation and admiration for the people I care about.",
    "14. I prefer to spend time with friends in person rather than interact with them virtually.",
    "15. I love receiving personalized gifts from friends.",
    "16. I enjoy it when my friends offer help during tough situations.",
    "17. Receiving an honest supportive response from a friend in a conversation makes me feel good.",
    "18. I enjoy working towards a common goal with my friends.",
    "19. I often like to give friends tokens of appreciation.",
    "20. I appreciate it when my friends initiate plans to spend time with me.",
  ];

  return (

    <View style={styles.questionView}>

        <Text style={styles.testTitle}>Friendship Language</Text>

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

export default Friendship;
