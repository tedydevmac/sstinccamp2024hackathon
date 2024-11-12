import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Button, StyleSheet} from 'react-native';
import {Provider as PaperProvider, Appbar} from 'react-native-paper';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      xTurns: 0,
      oTurns: 0,
      movePhase: false,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    if (this.state.movePhase) {
      // Logic for moving pieces
      if (this.state.xIsNext && squares[i] === 'O') {
        squares[i] = 'X';
      } else if (!this.state.xIsNext && squares[i] === 'X') {
        squares[i] = 'O';
      } else {
        return;
      }
    } else {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      if (this.state.xIsNext) {
        this.setState({xTurns: this.state.xTurns + 1});
      } else {
        this.setState({oTurns: this.state.oTurns + 1});
      }
    }

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      movePhase: this.state.xTurns >= 3 && this.state.oTurns >= 3,
    });
  }

  restartGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      xTurns: 0,
      oTurns: 0,
      movePhase: false,
    });
  }

  renderSquare(i) {
    return (
      <TouchableOpacity
        onPress={() => this.handleClick(i)}
        style={styles.square}>
        <Text style={styles.squareText}>{this.state.squares[i]}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.movePhase) {
      status =
        'Move Phase: ' +
        (this.state.xIsNext ? 'X' : 'O') +
        " to move opponent's piece";
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>
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
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  squareText: {
    fontSize: 24,
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
