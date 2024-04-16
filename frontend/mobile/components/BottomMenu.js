import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const HomeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-house-fill" viewBox="0 0 16 16">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
    </svg>
`;

const AsIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-ui-radios" viewBox="0 0 16 16">
        <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM0 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0m7-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M3 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6m0 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
    </svg>
`;

const FriendIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
    </svg>
`;

const CustomIconComponent = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.widget} onPress={onPress}>
      <SvgXml xml={icon} />
    </TouchableOpacity>
  );
};

const BottomMenu = ({ handleWidgetPress }) => {
  return (
    <View style={styles.widgetContainer}>
      <CustomIconComponent icon={HomeIcon} onPress={() => handleWidgetPress('UserHome')} />
      <CustomIconComponent icon={AsIcon} onPress={() => handleWidgetPress('Assessment')} />
      {/*<CustomIconComponent icon={FriendIcon} onPress={() => handleWidgetPress('Friends')} />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 30,
  },
  widget: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomMenu;
