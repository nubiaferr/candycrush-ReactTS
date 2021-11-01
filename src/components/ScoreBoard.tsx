import React from 'react'
import * as C from './ScoreBoard.styles'

type Props = {
    score: number
}

const ScoreBoard = ({score}: Props) => {
    return (
        <C.Container>
            <h2>{score}</h2>
        </C.Container>
    )
}

export default ScoreBoard
