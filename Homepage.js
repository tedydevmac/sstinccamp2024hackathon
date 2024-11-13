import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const Homepage = ({navigation}) => {
  const [selectedPlayers, setSelectedPlayers] = useState(2);

  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcome}>
        <Text style={styles.title}>Welcome</Text>
        <Image
          style={{
            ...styles.image,
            width: 20,
            height: 30,
            right: 10,
            bottom: 7,
          }}
          source={require('./assets/Startup.png')}
        />
        <Image
          style={{...styles.image}}
          source={require('./assets/tictactoe.png')}
        />
      </View>

      {/* Rules Section */}
      <View style={styles.rules}>
        <Text style={{...styles.title, marginBottom: 10}}>Rules</Text>
        <View style={{maxWidth: 250}}>
          <Text style={styles.body}>- Each player gets 1 pieces</Text>
          <Text style={styles.body}>
            - You are only able to move one piece at a time
          </Text>
          <Text style={styles.body}>- Light orange means wait your turn</Text>
          <Text style={styles.body}>- Dark orange means it’s your turn</Text>
          <Text style={styles.body}>- Lastly, have fun!</Text>
        </View>
      </View>

      {/* Player Selection */}
      <View style={styles.playerSelection}>
        {[2, 3, 4].map(num => (
          <TouchableOpacity
            key={num}
            onPress={() => setSelectedPlayers(num)}
            style={[
              styles.playerOption,
              num === 2
                ? styles.leftRound
                : num === 4
                ? styles.rightRound
                : null,
              selectedPlayers === num && styles.selectedPlayer,
            ]}>
            <Text style={styles.pickerText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Main')}>
        <Text style={styles.title}>Start Game!</Text>
      </TouchableOpacity>
    </View>
  );
};

// Stylings
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 30,
    color: '#000',
  },
  body: {
    fontSize: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
  },
  welcome: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: windowWidth,
    paddingHorizontal: 24,
    gap: 20,
    marginBottom: 20,
  },
  image: {
    height: 85,
    width: 72,
  },
  rules: {
    alignItems: 'flex-start',
    padding: 20,
    width: 280,
    backgroundColor: '#FF5733',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000', // Dark shadow for the icon and text shadow
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 5,
    borderColor: '#723227',
  },
  playerSelection: {
    marginBottom: 20,
    flexDirection: 'row',
    gap: 5,
  },
  playerOption: {
    backgroundColor: '#D9D9D9',
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftRound: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightRound: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  selectedPlayer: {
    backgroundColor: '#BF3E22',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FF5733',
    shadowColor: '#723227', // Color from the screenshot
    shadowOffset: {width: 0, height: 4}, // X: 0, Y: 4
    shadowOpacity: 0.5, // Adjust as desired; 0.5 is a good starting point
    shadowRadius: 4, // Blur radius
    elevation: 4, // Required for shadow on Android
  },
});
export default Homepage;
