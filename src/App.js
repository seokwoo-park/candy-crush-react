import { useEffect, useState } from 'react'

const width = 8
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]


function App() {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([])

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i ++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]

      if (columnOfThree.every(currentColor => currentColorArrangement[currentColor] === decidedColor)){
        columnOfThree.forEach(currentColor => currentColorArrangement[currentColor] = '')
      }
    }
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i ++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]

      if (columnOfFour.every(currentColor => currentColorArrangement[currentColor] === decidedColor)){
        columnOfFour.forEach(currentColor => currentColorArrangement[currentColor] = '')
      }
    }
  }

  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i< width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)

    console.log('create board')
  }

  useEffect(()=> {
    createBoard()
  },[])

  useEffect(()=> {
    const timer = setInterval(()=> {
      checkForColumnOfFour()
      checkForColumnOfThree()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    console.log(' CHECKING ')


    return () => clearInterval(timer)
  },[checkForColumnOfFour,checkForColumnOfThree,currentColorArrangement])


  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            alt={candyColor}
            style={{backgroundColor: candyColor}}/>
        ))}
      </div>
    </div>
  );
}

export default App
