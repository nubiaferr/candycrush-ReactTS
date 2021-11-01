import React, { DragEvent, useEffect, useState } from 'react';
import blank from './images/blank.png'
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/blue-candy.png'
import * as C from './App.styles';
import ScoreBoard from './components/ScoreBoard';

const width: number = 8;
const candyColors: string[] = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
]

const App = () => {

  const [currentColorArrangment, setCurrentColorArrangment] = useState<string[]>([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState<any>(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<any>(null);
  const [score, setScore] = useState<number>(0);

  const checkForColumnOfFour= () => {
    for (let i = 0; i <= 39; i++){
      const columnOfFour = [i, (i+width), (i+width*2), (i+width*3)];
      const decidedColor = currentColorArrangment[i];
      const isBlank = (currentColorArrangment[i] === blank)

      if (columnOfFour.every(square => currentColorArrangment[square] === decidedColor && !isBlank)){
        columnOfFour.forEach(square => currentColorArrangment[square] = blank)
        setScore((score) => score+4);
        return true
      }
    }
  }

  const checkForColumnOfThree = () => {
      for (let i = 0; i <= 47; i++){
        const columnOfThree = [i, (i+width), (i+width*2)];
        const decidedColor = currentColorArrangment[i];
        const isBlank = (currentColorArrangment[i] === blank)

        if (columnOfThree.every(square => currentColorArrangment[square] === decidedColor && !isBlank)){
          columnOfThree.forEach(square => currentColorArrangment[square] = blank)
          setScore((score) => score+3);
          return true
        }
      }
  }

  const checkForRowOfThree = () => {
    
    for (let i = 0; i < 64; i++){
      const rowOfThree = [i, (i+1), (i+2)];
      const decidedColor = currentColorArrangment[i];
      const isBlank = (currentColorArrangment[i] === blank)
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      if (notValid.includes(i)) continue;

      if (rowOfThree.every(square => currentColorArrangment[square] === decidedColor && !isBlank)){
        rowOfThree.forEach(square => currentColorArrangment[square] = blank)
        setScore((score) => score+3);
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    
    for (let i = 0; i < 64; i++){
      const rowOfFour = [i, (i+1), (i+2), (i+3)];
      const decidedColor = currentColorArrangment[i];
      const isBlank = (currentColorArrangment[i] === blank)
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,  54, 55,62, 63, 64]

      if (notValid.includes(i)) continue;

      if (rowOfFour.every(square => currentColorArrangment[square] === decidedColor && !isBlank)){
        rowOfFour.forEach(square => currentColorArrangment[square] = blank)
        setScore((score) =>score+4);
        return true
      }
    }
  }


  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55 ; i++){
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangment[i] === blank){
       const randomNumber = Math.floor(Math.random()*candyColors.length);
        currentColorArrangment[i] = candyColors[randomNumber]
      }

      if (currentColorArrangment[i + width] === blank){
        currentColorArrangment[i+width] = currentColorArrangment[i]
        currentColorArrangment[i] = blank
      }
    }
  }

  const dragStart = (e: DragEvent<HTMLImageElement>) => {
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e: DragEvent<HTMLImageElement>) => {
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = (e: DragEvent<HTMLImageElement>) => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangment[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangment[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

     const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()
      
        if (squareBeingReplacedId &&
            validMove &&
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        }  else {
            currentColorArrangment[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangment[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangment([...currentColorArrangment])
        }
  }

  const createBoard = () => {
    const randomColorArrangment: string[] = [];

    for (let i = 0; i < (width * width); i++){
      const randomNumberBoard = Math.floor(Math.random()*candyColors.length);
      const randomColor = candyColors[randomNumberBoard];
      randomColorArrangment.push(randomColor);
    }

    setCurrentColorArrangment(randomColorArrangment);
  }

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForRowOfFour();
      checkForRowOfThree();
      checkForColumnOfFour();
      checkForColumnOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangment([...currentColorArrangment])
    }, 150)

    return () => clearInterval(timer);
    
  }, [checkForRowOfFour, checkForRowOfThree ,checkForColumnOfFour, checkForColumnOfThree, moveIntoSquareBelow, currentColorArrangment])

 

  return (
    <C.Container>
      <ScoreBoard score={score}/>
      <C.GameContainer>
        {currentColorArrangment.map((candyColor: string, index: number) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragEnter={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragLeave={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </C.GameContainer>
    </C.Container>
  );
}

export default App;
