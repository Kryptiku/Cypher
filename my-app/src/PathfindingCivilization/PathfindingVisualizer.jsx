import React, { Component } from "react";
import Howler from "react-howler";
import { Howl } from "howler";
import DropdownList from "react-widgets/DropdownList";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { aStar } from "../algorithms/aStar";
import "./PathfindingVisualizer.css";
import "react-widgets/styles.css";
import "./DropdownList.scss";
import DijkstraImage from '../assets/ChickenDijkstra.png';
import AStarImage from '../assets/BeefAStar.png';
import BgMusic from "../assets/sounds/Sweden.mp3";
import MusicOnIcon from "../assets/musicon.png";
import MusicOffIcon from "../assets/musicoff.png";
import PlaceWallSound1 from "../assets/sounds/Stone_dig1.ogg";
import PlaceWallSound2 from "../assets/sounds/Stone_dig2.ogg";
import PlaceWallSound3 from "../assets/sounds/Stone_dig2shifted.ogg";
import PlaceWallSound4 from "../assets/sounds/Stone_dig3.ogg";
import PlaceWallSound5 from "../assets/sounds/Stone_dig4.ogg";
import BreakSound from "../assets/sounds/Random_break.ogg";
import DenySound from "../assets/sounds/Villager_deny1.oga";
import RunningSound from "../assets/sounds/Beacon_ambient.ogg";
import StartSound1 from "../assets/sounds/Beacon_power1.ogg";
import StartSound2 from "../assets/sounds/Beacon_power2.ogg";
import ClickSound from "../assets/sounds/Click.ogg";
import CloseDropdownSound from "../assets/sounds/Chest_close2.ogg";
import ShortestFoundSound1 from "../assets/sounds/Successful_hit.oga";
import FinishSound from "../assets/sounds/XP_Old.oga";

// when adding algos, just search 'algos' for requirements

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const algorithms = ["Dijkstra", "A*"]; // add options if adding algos

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      buttonDisabled: false,
      selectedAlgorithm: null,
      isDropdownOpen: false,
      algorithmTimer: null,
      animationTimer: null,
      isMusicPlaying: false, // dont forget to turn on, was just annoying replaying over and over
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  clearGrid(alsoWall, selectedAlgorithm) {
    const { grid } = this.state;
  
    const newGrid = grid.map((row) =>
      row.map((node) => {
        const baseNode = {
          ...node,
          isVisited: false,
          isWall: false,
          distance: Infinity,
          previousNode: null,
          heuristic: 0,
          fCost: Infinity,
        };
  
        if (!alsoWall && node.isWall) {
          baseNode.isWall = true;
        }
  
        return node.isStart || node.isFinish ? baseNode : baseNode;
      })
    );
  
    this.setState({ grid: newGrid, selectedAlgorithm }); // Ensure selectedAlgorithm persists
  
    newGrid.forEach((row, rowIndex) => {
      row.forEach((node, colIndex) => {
        const nodeElement = document.getElementById(
          `node-${rowIndex}-${colIndex}`
        );
        if (nodeElement) {
          // Logic to determine the extra class names for each node
          const extraClassName = node.isFinish
            ? `node-finish ${
                selectedAlgorithm === "Dijkstra"
                  ? "node-dijkstra-finish"
                  : selectedAlgorithm === "A*"
                  ? "node-astar-finish"
                  : ""
              }`
            : node.isStart
            ? "node-start"
            : node.isWall
            ? "node-wall"
            : "";
  
          // Apply the class names based on node type and selected algorithm
          if (alsoWall) {
            nodeElement.className = `node ${
              node.isStart ? "node-start" : node.isFinish ? `node-finish ${
                selectedAlgorithm === "Dijkstra"
                  ? "node-dijkstra-finish"
                  : selectedAlgorithm === "A*"
                  ? "node-astar-finish"
                  : ""
              }` : ""
            }`.trim();
          } else {
            nodeElement.className = `node ${extraClassName}`.trim();
          }
        }
      });
    });
  }

  playClearSound = () => {
    const clearSound = new Howl({
      src: [BreakSound],
      volume: 0.3,
    });
    clearSound.play();
  };

  playWallSound = () => {
    const wallSound1 = new Howl({ src: [PlaceWallSound1] });
    const wallSound2 = new Howl({ src: [PlaceWallSound2] });
    const wallSound3 = new Howl({ src: [PlaceWallSound3] });
    const wallSound4 = new Howl({ src: [PlaceWallSound4] });
    const wallSound5 = new Howl({ src: [PlaceWallSound5] });

    let num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

    switch (
      num // random wall sounds
    ) {
      case 1:
        wallSound1.play();
        break;
      case 2:
        wallSound2.play();
        break;
      case 3:
        wallSound3.play();
        break;
      case 4:
        wallSound4.play();
        break;
      case 5:
        wallSound5.play();
        break;
    }
  };

  playDenySound = () => {
    const denysound = new Howl({ src: [DenySound] });
    denysound.play();
  };

  playStartSound = () => {
    const startsound1 = new Howl({ src: [StartSound1] });
    const startsound2 = new Howl({ src: [StartSound2] });

    let num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

    switch (num) {
      case 1:
        startsound1.play();
        break;
      case 2:
        startsound2.play();
        break;
    }
  };

  playClickSound = () => {
    const clicksound = new Howl({ src: [ClickSound] });
    clicksound.play();
  };

  playCloseDropdownSound = () => {
    const closedropdownsound = new Howl({ src: [CloseDropdownSound] });
    closedropdownsound.play();
  };

  playShortestFoundSound1 = () => {
    const shortestfoundsound = new Howl({
      src: [ShortestFoundSound1],
      volume: 0.2,
    });
    shortestfoundsound.play();
  };

  playFinishSound = () => {
    const finishsound = new Howl({ src: [FinishSound], volume: 0.2 });
    finishsound.play();
  };

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
    this.playWallSound();
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
    this.playWallSound();
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
      this.setState({ isAlgoRunning: false });
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        this.playShortestFoundSound1();
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 100 * i);
    }
  }

  visualize(algorithm) {
    const { selectedAlgorithm } = this.state;

    if (!selectedAlgorithm) {
      const descriptionElement = document.getElementById("algo-description");
      if (descriptionElement) {
        descriptionElement.classList.add("shake");
        setTimeout(() => {
          descriptionElement.classList.remove("shake");
        }, 300);
      }
      this.playDenySound();
      return;
    }

    // Start the algorithm timer
    const algorithmStartTime = Date.now();

    this.setState({ buttonDisabled: true, algorithmTimer: null, animationTimer: null });
    this.clearGrid(false, this.state.selectedAlgorithm);
    this.playStartSound();
    this.playClickSound();

    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;

    // Run the selected algorithm
    switch (algorithm) {
      case "A*":
        visitedNodesInOrder = aStar(grid, startNode, finishNode);
        break;
      case "Dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      default:
        return;
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    // Calculate and store the algorithm timer
    const algorithmEndTime = Date.now();
    const algorithmDuration = algorithmEndTime - algorithmStartTime;
    this.setState({ algorithmTimer: algorithmDuration });

    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

    // Start the animation timer
    const animationStartTime = Date.now();

    setTimeout(() => {
      this.playFinishSound();
      this.setState({ buttonDisabled: false });

      // Calculate and store the animation timer
      const animationEndTime = Date.now();
      const animationDuration = animationEndTime - animationStartTime;
      this.setState({ animationTimer: animationDuration });
    }, 10 * visitedNodesInOrder.length + 100 * nodesInShortestPathOrder.length);
  }

  getAlgorithmDescription = (algorithm) => {
    // add the brief descriptions here for new algos
    switch (algorithm) {
      case "A*":
        return (
          <div>
            
            <h1 class="sign">A* Algorithm</h1>
            <p class="sign">
              A* uses heuristics to find the shortest path efficiently.
            </p>
          </div>
        );
      case "Dijkstra":
        return (
          <div>
            <h1 class="sign">Dijkstra's Algorithm</h1>
            <p class="sign">
              Dijkstra's algorithm finds the shortest paths between nodes in a weighted graph.
            </p>
          </div>
        );
      default:
        return <h1 class="sign">Pick an Algorithm:</h1>;
    }
  };

  handleChange = (value) => {
    this.setState({ selectedAlgorithm: value, isDropdownOpen: false });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  handleClickOutside = (event) => {
    const dropdownList = document.getElementById("dropdown-list");
    if (dropdownList && !dropdownList.contains(event.target)) {
      this.setState({ isDropdownOpen: false }); // close dropdownlist if clicking outside
    }
  };

  componentDidUpdate(_, prevState) {
    if (prevState.isDropdownOpen !== this.state.isDropdownOpen) {
      // detect outside click
      if (this.state.isDropdownOpen) {
        document.addEventListener("click", this.handleClickOutside);
        this.playClickSound();
      } else {
        document.removeEventListener("click", this.handleClickOutside);
        this.playCloseDropdownSound();
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  toggleMusic = () => {
    this.setState((prevState) => ({
      isMusicPlaying: !prevState.isMusicPlaying,
    }));
  };

  generateRandomMaze = () => {
    const { grid } = this.state;
    const newGrid = grid.map((row) =>
      row.map((node) => {
        // Ensure the start and finish nodes are not walls
        if (node.isStart || node.isFinish) {
          return node;
        }
        // Randomly decide if this node should be a wall
        const isWall = Math.random() < 0.2; // 20% chance for each node to be a wall
        return {
          ...node,
          isWall: isWall,
        };
      })
    );

    this.setState({ grid: newGrid });
  };

  render() {
    const {
      grid,
      mouseIsPressed,
      selectedAlgorithm,
      isDropdownOpen,
      isMusicPlaying,
    } = this.state;

    return (
      <>
        <Howler src={BgMusic} playing={isMusicPlaying} volume={1} loop />
        <Howler src={RunningSound} playing={this.state.buttonDisabled} loop />

        <div id="controls">
          <div id="dropdown-container">
            <DropdownList
              id="dropdown-list"
              data={algorithms}
              value={selectedAlgorithm || "Algorithms:"}
              onChange={this.handleChange}
              open={isDropdownOpen}
              onToggle={this.toggleDropdown}
              disabled={this.state.buttonDisabled}
            />
          </div>

          {/* visualize algorithm */}
          <button
            onClick={() => {
              this.visualize(selectedAlgorithm);
            }}
            style={{
              backgroundColor: this.state.buttonDisabled ? "red" : "#87A330",
              cursor: this.state.buttonDisabled ? "not-allowed" : "pointer",
            }}
            disabled={this.state.buttonDisabled}
          >
            Visualize {selectedAlgorithm}
          </button>

          {/* clear the grid including walls and path */}
          <button
            onClick={() => {
              this.playClearSound();
              this.playClickSound();
              this.clearGrid(true, this.state.selectedAlgorithm);
            }}
            style={{
              cursor: this.state.buttonDisabled ? "not-allowed" : "pointer",
            }}
            disabled={this.state.buttonDisabled}
          >
            Clear Grid
          </button>

          {/* clear the path but keep walls */}
          <button
            onClick={() => {
              this.playClearSound();
              this.playClickSound();
              this.clearGrid(false, this.state.selectedAlgorithm);
            }}
            style={{
              cursor: this.state.buttonDisabled ? "not-allowed" : "pointer",
            }}
            disabled={this.state.buttonDisabled}
          >
            Clear Path
          </button>
          <button
            onClick={() => {
              this.generateRandomMaze();
              this.playClickSound();
            }}
            style={{
              cursor: this.state.buttonDisabled ? "not-allowed" : "pointer",
            }}
            disabled={this.state.buttonDisabled}
          >
            Random Walls
          </button>
          {/* toggle music on/off */}
          <button
            onClick={() => {
              this.toggleMusic(!this.state.isMusicPlaying);
              this.playClickSound();
            }}
          >
            <img
              src={isMusicPlaying ? MusicOnIcon : MusicOffIcon}
              alt={isMusicPlaying ? "Music On" : "Music Off"}
              style={{ width: "24px", height: "24px" }}
            />
          </button>
        </div>
        <div id="algo-description-container">
          <div id="algo-description">
            {this.getAlgorithmDescription(selectedAlgorithm)}
          </div>
        </div>
        <div id="grid-container">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {
                      isStart,
                      isFinish,
                      row,
                      col,
                      isWall,
                      heuristic,
                      fCost,
                    } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        fCost={fCost}
                        heuristic={heuristic}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => {
                          if (!isStart && !isFinish) {
                            this.handleMouseDown(row, col);
                          }
                        }}
                        onMouseEnter={(row, col) => {
                          if (!isStart && !isFinish) {
                            this.handleMouseEnter(row, col);
                          }
                        }}
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}
                        selectedAlgorithm={this.state.selectedAlgorithm}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div id="timer-container">
          <div id="algorithm-timer">
              <strong>Algorithm Time: </strong>
              <p class="timer">
              {this.state.algorithmTimer
              ? `${this.state.algorithmTimer} ms`
                : "Not started"}
              </p>
            </div>
            <div id="animation-timer">
              <strong>Animation Time: </strong>
              <p class="timer">
                {this.state.animationTimer
                ? `${this.state.animationTimer / 1000} s`
                : "Not started"}
              </p>
            </div>
        </div>
        <div id="info-container">

        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    heuristic: 0,
    fCost: Infinity,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
