import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import players from './players.json';

  function Square(props){
      return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
      );
  }
  function Reset(props){
    return(
      <button onClick = {props.onClick}>Reset</button>
    )
  }
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i])
      {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    renderSquare(i) {
      return (<Square 
      value={this.state.squares[i]} onClick={() => 
      this.handleClick(i)}
      />
      );
    }
    reset()
    {
      const squares = this.state.squares.slice();
      for (let i = 0; i < squares.length; i++)
      {
        squares[i] = null;
      }
      this.setState({
        squares:squares,
        xIsNext: true,
      });
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner)
      {
        status = 'Winner: ' + winner;
      }
      else
      {
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <Reset onClick = {() => {this.reset()}}/>
        </div>
      );
    }
  }
  class Leaderboard extends React.Component {
    constructor(props){
      super(props);
      const listItems = players.map((player) => 
      <li>{player.firstName} {player.lastName} - Score: {player.score}</li>
      )
      this.state = {
        newPlayers: listItems 
      };
    }  
    render()
    {
      return(
        <div>
          <h2>Leaderboard</h2>
          <ul>{this.state.newPlayers}</ul>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div className="leaderboard"><Leaderboard/></div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      {
        return squares[a];
      }
    }
    return null;
  }
  
