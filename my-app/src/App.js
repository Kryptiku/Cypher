import logo from './logo.svg';
import './App.css';
import PathfindingCivilization from './PathfindingCivilization/PathfindingVisualizer';

function App() {
  return (
    <div class="container">
      <div id="header">
        <h1>Pathfinding Civilization</h1>
      </div>
      <div class="App">
        <PathfindingCivilization></PathfindingCivilization>
      </div>
    </div>
  );
}

export default App;
