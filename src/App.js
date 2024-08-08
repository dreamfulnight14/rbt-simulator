import { useState } from 'react'
import './App.css'

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST']

const rotationDegrees = {
  NORTH: '180deg',
  EAST: '90deg',
  SOUTH: '0deg',
  WEST: '270deg',
}

const initialState = {
  x: 0,
  y: 0,
  direction: 'SOUTH',
}

function App() {
  const [robot, setRobot] = useState(initialState)

  const rotateRight = () => {
    const currentIndex = directions.indexOf(robot.direction)
    const newDirection = directions[(currentIndex + 1) % 4]
    setRobot({
      ...robot,
      direction: newDirection,
      rotation: rotationDegrees[newDirection],
    })
  }

  const moveForward = () => {
    const { x, y, direction } = robot
    let newX = x,
      newY = y
    if (direction === 'NORTH' && y < 4) newY++
    if (direction === 'EAST' && x < 4) newX++
    if (direction === 'SOUTH' && y > 0) newY--
    if (direction === 'WEST' && x > 0) newX--
    setRobot({ ...robot, x: newX, y: newY })
  }

  return (
    <div className="App">
      <h1>Robot Simulator</h1>
      <div className="grid">
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {[...Array(5)].map((_, colIndex) =>
              robot.x === colIndex && robot.y === rowIndex ? (
                <div
                  key={colIndex}
                  className="robot"
                  style={{ transform: `rotate(${robot.rotation})` }}
                ></div>
              ) : (
                <div key={colIndex} className="cell"></div>
              )
            )}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={moveForward}>Move Forward</button>
        <button onClick={rotateRight}>Rotate Right</button>
      </div>
    </div>
  )
}

export default App
