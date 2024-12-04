<h1 align="center">🍗Pathfinding Civilization🥩</h1>
<h2 align="center">Beef (A*) or Chicken (Dijkstra)?</h2>

## I. Project Overview
**Pathfinding Civilization** is a web-based Pathfinding algorithm visualizer. That utilizes **A*** and **Dijkstra** as the choice of algorithms to be visualized. The algorithm visualized will be displayed in a grid that can be modified by the user to include non-travelable walls and be able to compare these two algorithms by path and search method, displayed by animation. The main theme of this project is helping Steve, the Minecraft character, be able get to the chicken (A*), or beef (Dijkstra), and feed his hungry self. Will he go for the chicken, where the path is efficient, and be able to arrive at it much faster? Or will he go for the beef, where it’s the safest, and most thorough approach? The user decides that option.

## 🏗️ System Architecture
Provide a high-level overview of the system architecture, including
key components and their interactions.

## 🤓 Applied Computer Science Concept
* **Graph Theory**
  * Being a branch of mathematics and computer science that deals with nodes (vertices) and edges (connections between nodes). The principle of Graph Theory is directly applied on Pathfinding.
    
* **Time Complexity**
  * Showing the time complexity gives the user a tangible visualization of the difference in computation time between the 2 algorithms.
    
## 😵‍💫 Algorithms Used
* **A***
  * An informed search algorithm that finds the shortest path by combining the actual cost from the start to a node and a heuristic estimate of the cost to the goal. It prioritizes nodes likely to lead to the goal quickly and efficiently.
    
* **Dijkstra**
  * An uninformed algorithm that finds the shortest path from a starting node to all other nodes by exploring all possible paths in order of increasing cost, ensuring the shortest path is found.
    
## 🔐 Security Mechanisms
* The implementation of a human verification system API known as **Captcha** to differentiate between real users and automated users, such as bots.
  
* By limiting the options for the user to only placing blocks and button presses, this significantly reduces the risk close 0% of having invalid inputs that could potentially be used as an exploit on the web application.

## 🤔 Development Process and Design Decisions
Explain how computer science theory influenced your development
decisions.

## ✅ Correctness and Efficiency
Explain how you ensured the project’s correctness and efficiency

## 🏃🏿‍♂️‍➡️ How to Run the Project
* Prerequisites:
  * [Node.js](https://nodejs.org/en)
  * You will also need to provide your own API key for the captcha to work.
    * It should be in a `.env` file at the root directory of the `my-app` folder
    * Format for the `.env` file is:
      * `REACT_APP_SITE_KEY= '6LfyVXIqAAAAAOlwRkh5uZrJ4tVxG6PyA1V00rTW'`
`SITE_SECRET='6LfyVXIqAAAAABIjg1Gcjr3FQw5KgFQGOkRpTxHd'`

1. Clone the repository
   ```bash
   git clone https://github.com/Kryptiku/Pathfinding_Civilization.git
   ```
   
2. Open project in IDE of choice and open the `git bash` terminal and run the following commands:
   ```bash
   cd my-app
   ```

   ```bash
   npm i
   ```

   ```bash
   node server.js
   ```

3. On a new `git bash` terminal run the following commands:
   ```bash
   cd my-app
   ```

   ```bash
   npm start
   ```

4. Now that the app is running you can start by placing blocks on the grid using your mouse or select `Random Walls` option to generate a random set of walls.

5. Select your algorithm on the top-left drop-down.

6. Hit `Visualize` and watch the magic.

## 🧑‍💻 Contributors
**Front End:** [Mirabel, Kevin Hans Aurick S.](https://github.com/kebinmirabel)

**Back End:** [Capistrano, Vency Gyro R.](https://github.com/KazuMoment)

**Project Manager/Fullstack:** [Antony, Aldrich Ryan V.](https://github.com/Kryptiku)

## 💖 Acknowledgment
**Beautiful Instructor:** [Agdon, Fatima Marie P.](https://github.com/marieemoiselle)
