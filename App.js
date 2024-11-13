import React, {Component, useState} from 'react';
import {View, Text, TouchableOpacity, Button, StyleSheet} from 'react-native';
import {Provider as PaperProvider, Appbar} from 'react-native-paper';
import Timer from './Timer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './Homepage';
const Stack = createNativeStackNavigator();
class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      xTurns: 0,
      oTurns: 0,
      moveCount: 0,
      playerCount: 4,
      currentPlayer: 1,
    };
  }

  handleClick(i) {
    let squares = this.state.squares;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(prevState => ({
      squares: squares,
      xIsNext: !prevState.xIsNext,
      moveCount: prevState.moveCount + 1,
      xTurns: prevState.xIsNext ? prevState.xTurns + 1 : prevState.xTurns,
      oTurns: !prevState.xIsNext ? prevState.oTurns + 1 : prevState.oTurns,
    }));
  }

  handleMoveOpponentSquare(i) {
    let squares = this.state.squares;
    if (
      calculateWinner(squares) ||
      (this.state.xIsNext && squares[i] === 'X') ||
      (!this.state.xIsNext && squares[i] === 'O')
    ) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(prevState => ({
      squares: squares,
      xIsNext: !prevState.xIsNext,
      moveCount: prevState.moveCount + 1,
      xTurns: prevState.xIsNext ? prevState.xTurns + 1 : prevState.xTurns,
      oTurns: !prevState.xIsNext ? prevState.oTurns + 1 : prevState.oTurns,
    }));
  }

  restartGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      xTurns: 0,
      oTurns: 0,
      moveCount: 0,
    });
  }
  move(i) {
    if (this.state.moveCount >= 3) {
      this.handleMoveOpponentSquare(i);
    } else {
      this.handleClick(i);
    }
    currentPlayer = this.state.currentPlayer;
    currentPlayer += 1;
    if (currentPlayer === this.state.playerCount) {
      currentPlayer = 1;
    }
    this.setState(prevState => ({
      currentPlayer: currentPlayer,
    }));
  }

  renderSquare(i) {
    return (
      <TouchableOpacity onPress={() => this.move(i)} style={styles.square}>
        <Text style={styles.squareText}>{this.state.squares[i]}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      if (this.state.moveCount >= 3) {
        status = 'Move phase: ' + (this.state.xIsNext ? 'X' : 'O');
      } else {
        status = 'Turn: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }

    return (
      <PaperProvider>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              height: '6%',
              marginBottom: 10,
            }}>
            <Text style={styles.title}>Player {this.state.currentPlayer}</Text>
            <Timer />
          </View>
          <Text style={styles.news}>{status}</Text>
          <View style={styles.turnBox}>
            <Text style={[styles.status, {transform: [{rotate: '180deg'}]}]}>
              {this.state.xIsNext ? 'Wait...' : 'Your turn'}
            </Text>
            <Text style={styles.count}>({this.state.oTurns})</Text>
          </View>
          <View style={styles.board}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </View>
          <View style={[styles.turnBox, [{marginBottom: 30}]]}>
            <Text style={styles.status}>
              {this.state.xIsNext ? 'Your turn' : 'Wait...'}
            </Text>
            <Text style={styles.count}>({this.state.xTurns})</Text>
          </View>
          <Button title="Restart Game" onPress={() => this.restartGame()} />
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight: 50,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FF5733',
    borderRadius: 10,
    padding: 5,
    marginVertical: 15,
  },
  square: {
    width: '30%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: '1.5%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  squareText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    marginVertical: 20,
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 20,
  },
  news: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: '600',
  },
  turnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#FF5733',
  },
  count: {
    marginVertical: 20,
    fontSize: 30,
    fontWeight: '600',
    marginRight: 20,
  },
});

// Function to determine the winner
function calculateWinner(squares) {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Return the entire component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Main" component={TicTacToe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
