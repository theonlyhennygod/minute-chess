// utils/chessAI.js



export function evaluateBoard(chess) {
    const board = chess.board();
    let score = 0;

    for (let row of board) {
        for (let piece of row) {
            if (piece) {
                const pieceValue = getPieceValue(piece);
                score += piece.color === 'w' ? pieceValue : -pieceValue;
            }
        }
    }

    return score;
}

function getPieceValue(piece) {
    const pieceType = piece.type;
    switch (pieceType) {
        case 'p':
            return 10;
        case 'r':
            return 50;
        case 'n':
            return 30;
        case 'b':
            return 30;
        case 'q':
            return 90;
        case 'k':
            return 900;
        default:
            return 0;
    }
}

export function minimax(chess, depth, isMaximizingPlayer) {
    if (depth === 0) {
        return evaluateBoard(chess);
    }

    const possibleMoves = chess.moves();
    let bestMove = isMaximizingPlayer ? -Infinity : Infinity;

    for (let move of possibleMoves) {
        chess.move(move);
        const boardValue = minimax(chess, depth - 1, !isMaximizingPlayer);
        chess.undo();

        bestMove = isMaximizingPlayer
            ? Math.max(bestMove, boardValue)
            : Math.min(bestMove, boardValue);
    }

    return bestMove;
}

export function getBestMove(chess, depth) {
    const possibleMoves = chess.moves();
    let bestMove = null;
    let bestMoveValue = -Infinity;

    for (let move of possibleMoves) {
        chess.move(move);
        const moveValue = minimax(chess, depth - 1, false);
        chess.undo();

        if (moveValue > bestMoveValue) {
            bestMoveValue = moveValue;
            bestMove = move;
        }
    }

    return bestMove;
}
