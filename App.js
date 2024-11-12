import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Button, StyleSheet} from 'react-native';
import {Provider as PaperProvider, Appbar} from 'react-native-paper';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // Function to handle clicks on the squares
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Function to restart the game
  restartGame() {
    this.setState({
      // Set default values to reset the game
      squares: Array(9).fill(null),
      xIsNext: true,
    });
  }

  // Function to render the squares while playing
  renderSquare(i) {
    return (
      // render individual squares
      <TouchableOpacity
        style={styles.square}
        onPress={() => this.handleClick(i)}>
        <Text style={styles.squareText}>{this.state.squares[i]}</Text>
      </TouchableOpacity>
    );
  }

  // Function to render everything inside the component
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    // if someone won the game, change the status to winner
    // if all the squares are filled and no one has won, display as draw!
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (this.state.squares.every(square => square !== null)) {
      status = 'Draw!';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    // return entire game screen
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
        <Text style={styles.status}>{status}</Text>
        <Button
          title="Restart Game"
          onPress={() => this.restartGame()}
          style={styles.restartButton}
        />
      </View>
    );
  }
}

// Stylings
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFE0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 40,
  },
  status: {
    marginVertical: 20,
    fontSize: 20,
  },
  restartButton: {
    marginTop: 10,
  },
});

// Function to determine the winner
function calculateWinner(squares) {
  const lines = [
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
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Tic Tac Toe" />
      </Appbar.Header>
      <TicTacToe />
    </PaperProvider>
  );
}
