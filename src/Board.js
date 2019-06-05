import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn() {
      let litOrUnlit = Math.floor(Math.random() * 10);
      return litOrUnlit > 4 ? true : false;
    }
  };

  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard() };
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }

  createBoard() {
    let board = [];

    for (let i = 0; i < this.props.nrows; i++) {
      board[i] = new Array(this.props.chanceLightStartsOn());
      for (let j = 0; j < this.props.ncols; j++) {
        board[i][j] = this.props.chanceLightStartsOn();
      }
    }
    // console.log(board);
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("cuccess", coord);

    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y + 1, x);
    flipCell(y - 1, x);

    // win when every cell is turned off
    // determine is the game has been won

    let hasWon = board.every(row => {
      return row.every(cell => !cell);
    });

    this.setState({ board: board, hasWon: hasWon });
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    let tblBoard = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(
          <Cell
            key={`${i}-${j}`}
            coord={`${i}-${j}`}
            isLit={this.state.board[i][j]}
            flipCellsAround={this.flipCellsAround}
          />
        );
      }
      tblBoard.push(<tr key={`${i}`}>{row}</tr>);
    }
    // console.log(tblBoard);

    if (this.state.hasWon) {
      return (
        <div>
          <div className="neon-orange">YOU</div>
          <div className="neon-blue">WIN!!</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
          <table className="Board">
            <tbody>{tblBoard}</tbody>
          </table>
        </div>
      );
    }
  }
}

export default Board;
