import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper'; 

const DISC = ({ selectedValues, handleRadioButtonChange }) => {

  const questions = [
    "1. I tend to dominate conversations and discussions when spending time with my friends.",
    "2. When making plans with friends, I prefer to take the lead and suggest activities.",
    "3. I am comfortable with asserting my opinions and ideas even in challenging situations.",
    "4. I enjoy challenges and strive to overcome obstacles in order to achieve my goals.",
    "5. I am comfortable making tough decisions, even if they may not be popular among others.",
    "6. I enjoy being the life of the party and often find myself in the center of social interactions.",
    "7. I find pleasure in building relationships with others.",
    "8. I enjoy bringing people together and often initiate group outings or gatherings.",
    "9. I am persuasive and can effectively communicate my ideas.", 
    "10. I enjoy entertaining others and making them laugh.",
    "11. I value stability and prefer a predictable routine in my daily life.",
    "12. I am known for my calm demeanor and ability to remain composed under stressful conditions.",
    "13. I am patient and tolerant of others' mistakes or shortcomings.",
    "14. I am a loyal and dependable friend, always there to offer support and stability in times of need.",
    "15. I prioritize building strong, long-lasting friendships with others.",
    "16. I tend to carefully consider the consequences of my actions and strive to make responsible decisions.",
    "17. I enjoy analyzing problems and finding innovative solutions.",
    "18. I enjoy analyzing problems and finding innovative solutions.",
    "19. I pay attention to the needs and preferences of my friends, striving to be considerate and thoughtful in my interactions.",
    "20. I am proactive in resolving conflicts or misunderstandings that may arise in my friendships.",
  ];

  return (

    <View style={styles.questionView}>

        <Text style={styles.testTitle}>DISC</Text>

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
                  <RadioButton.Android color="#000" value={-2} />
                  <Text style={styles.radioButtonText}>Strongly Disagree</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value={-1} />
                  <Text style={styles.radioButtonText}>Disagree</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value={0} />
                  <Text style={styles.radioButtonText}>Neutral</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value={1} />
                  <Text style={styles.radioButtonText}>Agree</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android color="#000" value={2} />
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

export default DISC;
