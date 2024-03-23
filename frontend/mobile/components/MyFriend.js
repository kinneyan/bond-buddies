import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { SvgXml } from 'react-native-svg';

const RemoveIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
    </svg>
`;

const BlockIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-ban" viewBox="0 0 16 16">
    <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
  </svg>
`;

const MyFriend = () => {
  return (
    <Grid style={styles.person}>
        <TouchableOpacity style={styles.personContainer}>
            <Row style={styles.personRow}>
                <Col style={styles.profileCol}>
                    <Image source={require('../assets/images/aqua.png')} style={styles.image} />
                </Col>
                <Col style={styles.textCol}>
                <View style={styles.textDes}>
                    <Text style={styles.personName}>Test Name</Text>
                    <Text style={styles.personBT}>Buddy Type</Text>
                </View>
                </Col>
            </Row>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.RemovebuttonIcons}>
                <SvgXml xml={RemoveIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.BlockbuttonIcons}>
                <SvgXml xml={BlockIcon} />
            </TouchableOpacity>
        </View> 
    </Grid>
  );
};

const styles = StyleSheet.create({

      image: {
        width: 45,
        height: 45,
        borderRadius: 30,
      },
      person: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        height: 70,
        marginTop: 50,
        maxWidth: '90%',
      },
      profileCol: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
      },
      textCol: {
        justifyContent: 'center',
        height: 70,
        width: 200,
      },
      personName: {
        fontFamily: 'Roboto Medium',
        fontSize: 16,
      },
      personBT: {
        fontFamily: 'Roboto Regular',
        fontSize: 14,
      },
      buttonsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
      },
      RemovebuttonIcons: {
        backgroundColor: 'black',
        padding: 15,
        marginLeft: 5,
        borderRadius: 10,
      },
      BlockbuttonIcons: {
        backgroundColor: 'red',
        padding: 15,
        marginLeft: 5,
        borderRadius: 10,
      },
  });

export default MyFriend;

