import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/*
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 3,
    chanceLightStartsOn() {
      let litOrUnlit = Math.floor(Math.random() * 10);
      return litOrUnlit > 4 ? true : false;
    }
  };

  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: [], testVar: "" };
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    this.setState(() => ({
      board: []
    }));
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround() {
    console.log("cuccess");
    //// let { ncols, nrows } = this.props;
    ////let board = this.state.board;
    //// let [y, x] = coord.split("-").map(Number);

    ////   function flipCell(y, x) {
    // if this coord is actually on board, flip it

    ////   if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
    ////    board[y][x] = !board[y][x];
    //// }
    ////}

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    let mainTable = [];

    for (let i = 0; i < this.props.nrows; i++) {
      mainTable[i] = Array.from({ length: this.props.ncols }).map(
        (value, index) => {
          // console.log(index);
          return (
            <Cell
              key={`${i}-${index}`}
              isLit={this.props.chanceLightStartsOn()}
              flipCellsAround={this.flipCellsAround}
            />
          );
        }
      );
    }

    console.log(mainTable);

    return (
      <table className="Board">
        <tbody>
          <tr>{mainTable[0]}</tr>
          <tr>{mainTable[1]}</tr>
          <tr>{mainTable[2]}</tr>
          <tr>{mainTable[3]}</tr>
          <tr>{mainTable[4]}</tr>
          <tr>{mainTable[5]}</tr>
          <tr>{mainTable[6]}</tr>
          <tr>{mainTable[7]}</tr>
          <tr>{mainTable[8]}</tr>
          <tr>{mainTable[9]}</tr>
          <tr>{mainTable[10]}</tr>
          <tr>{mainTable[11]}</tr>
          <tr>{mainTable[12]}</tr>
          <tr>{mainTable[13]}</tr>
        </tbody>
      </table>
    );
  }
}

export default Board;
