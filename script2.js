const squares = document.querySelectorAll('.square');

let clicks = [];
let newsquare = [];
let newsquarerook = [];
let newsquarebishop = [];
let knightattacksquares = [];
let pawnattack = [];
let pawnapproach = [];

let counterplay = 1;
let knightTurnId = 0;
let rookTurnId = 0;
let bishopTurnId = 0;
let kingTurnId = 0;
let gameOver = false;

let pieceverifier = [];

function isKingInCheck(kingColor) {
    let kingSquare = null;
    squares.forEach(sq => {
        if (sq.dataset.piece === 'king' && sq.dataset.color === kingColor) {
            kingSquare = sq;
        }
    });

    if (!kingSquare) return false;

    const kingRow = parseInt(kingSquare.dataset.row);
    const kingCol = parseInt(kingSquare.dataset.col);
    const enemyColor = kingColor === 'white' ? 'black' : 'white';

    const pawnDir = kingColor === 'white' ? -1 : 1;
    const pawnL = getSquare(kingRow + pawnDir, kingCol - 1);
    const pawnR = getSquare(kingRow + pawnDir, kingCol + 1);
    if ((pawnL && pawnL.dataset.piece === 'pawn' && pawnL.dataset.color === enemyColor) ||
        (pawnR && pawnR.dataset.piece === 'pawn' && pawnR.dataset.color === enemyColor)) {
        return true;
    }

    const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (let [dr, dc] of knightMoves) {
        const sq = getSquare(kingRow + dr, kingCol + dc);
        if (sq && sq.dataset.piece === 'knight' && sq.dataset.color === enemyColor) {
            return true;
        }
    }

    const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (let [dr, dc] of diagDirs) {
        let r = kingRow + dr;
        let c = kingCol + dc;
        while (true) {
            const sq = getSquare(r, c);
            if (!sq) break;
            if (sq.dataset.piece !== 'none') {
                if (sq.dataset.color === enemyColor &&
                    (sq.dataset.piece === 'bishop' || sq.dataset.piece === 'queen')) {
                    return true;
                }
                break;
            }
            r += dr;
            c += dc;
        }
    }

    const straightDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let [dr, dc] of straightDirs) {
        let r = kingRow + dr;
        let c = kingCol + dc;
        while (true) {
            const sq = getSquare(r, c);
            if (!sq) break;
            if (sq.dataset.piece !== 'none') {
                if (sq.dataset.color === enemyColor &&
                    (sq.dataset.piece === 'rook' || sq.dataset.piece === 'queen')) {
                    return true;
                }
                break;
            }
            r += dr;
            c += dc;
        }
    }

    const kingAdj = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    for (let [dr, dc] of kingAdj) {
        const sq = getSquare(kingRow + dr, kingCol + dc);
        if (sq && sq.dataset.piece === 'king' && sq.dataset.color === enemyColor) {
            return true;
        }
    }

    return false;
}

function hasLegalKingMoves(kingColor) {
    let kingSquare = null;
    squares.forEach(sq => {
        if (sq.dataset.piece === 'king' && sq.dataset.color === kingColor) {
            kingSquare = sq;
        }
    });

    if (!kingSquare) return false;

    const row = parseInt(kingSquare.dataset.row);
    const col = parseInt(kingSquare.dataset.col);
    const enemyColor = kingColor === 'white' ? 'black' : 'white';

    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, -1], [-1, 1]
    ];

    for (let [dr, dc] of directions) {
        const target = getSquare(row + dr, col + dc);
        if (!target) continue;
        if (target.dataset.color === kingColor) continue;

        const tr = parseInt(target.dataset.row);
        const tc = parseInt(target.dataset.col);
        let isAttacked = false;

        const pawnDir = kingColor === 'white' ? -1 : 1;
        const pawnL = getSquare(tr + pawnDir, tc - 1);
        const pawnR = getSquare(tr + pawnDir, tc + 1);
        if ((pawnL && pawnL.dataset.piece === 'pawn' && pawnL.dataset.color === enemyColor) ||
            (pawnR && pawnR.dataset.piece === 'pawn' && pawnR.dataset.color === enemyColor)) {
            isAttacked = true;
        }

        const knightMoves = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        for (let [dr2, dc2] of knightMoves) {
            const sq = getSquare(tr + dr2, tc + dc2);
            if (sq && sq.dataset.piece === 'knight' && sq.dataset.color === enemyColor) {
                isAttacked = true;
                break;
            }
        }

        const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (let [dr2, dc2] of diagDirs) {
            let r = tr + dr2;
            let c = tc + dc2;
            while (true) {
                const sq = getSquare(r, c);
                if (!sq) break;
                if (sq.dataset.piece !== 'none') {
                    if (sq.dataset.color === enemyColor &&
                        (sq.dataset.piece === 'bishop' || sq.dataset.piece === 'queen')) {
                        isAttacked = true;
                    }
                    break;
                }
                r += dr2;
                c += dc2;
            }
            if (isAttacked) break;
        }

        const straightDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (let [dr2, dc2] of straightDirs) {
            let r = tr + dr2;
            let c = tc + dc2;
            while (true) {
                const sq = getSquare(r, c);
                if (!sq) break;
                if (sq.dataset.piece !== 'none') {
                    if (sq.dataset.color === enemyColor &&
                        (sq.dataset.piece === 'rook' || sq.dataset.piece === 'queen')) {
                        isAttacked = true;
                    }
                    break;
                }
                r += dr2;
                c += dc2;
            }
            if (isAttacked) break;
        }

        const kingAdj = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        for (let [dr2, dc2] of kingAdj) {
            const sq = getSquare(tr + dr2, tc + dc2);
            if (sq && sq.dataset.piece === 'king' && sq.dataset.color === enemyColor) {
                isAttacked = true;
                break;
            }
        }

        if (!isAttacked) {
            return true;
        }
    }

    return false;
}

function isCheckmate(kingColor) {
    return isKingInCheck(kingColor) && !hasLegalKingMoves(kingColor);
}

function highlightCheck() {
    squares.forEach(sq => {
        if (sq.dataset.piece === 'king') {
            if (isKingInCheck(sq.dataset.color)) {
                sq.style.backgroundColor = 'blue';
            }
        }
    });
}

function checkGameOver() {
    const whiteInCheckmate = isCheckmate('white');
    const blackInCheckmate = isCheckmate('black');

    if (whiteInCheckmate) {
        gameOver = true;
        alert('Checkmate! Black wins!');
        return true;
    }

    if (blackInCheckmate) {
        gameOver = true;
        alert('Checkmate! White wins!');
        return true;
    }

    return false;
}

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (gameOver) return;

        if (square.dataset.color === 'black') {
            if (counterplay % 2 === 0) {
                resetsquarecol();

if (square.dataset.piece === 'pawn' && square.dataset.color === 'black') {

    pieceverifier.length = 0;
    pieceverifier.push('pawn');
    square.style.backgroundColor = 'red';

    let row = parseInt(square.dataset.row) + 1;
    let col = parseInt(square.dataset.col);

    resetsquare();
    clicks.length = 0;
    clicks.push(col);

    const newsquare = getSquare(row, col);
    const newsquare2 = getSquare(row + 1, col);
    const lefttakesquare = getSquare(row, col - 1);
    const righttakesquare = getSquare(row, col + 1);

    if (newsquare && newsquare.dataset.piece === 'none') {
        newsquare.style.backgroundColor = 'green';

        newsquare.addEventListener('click', () => {
            if (pieceverifier.at(-1) !== 'pawn') return;
            if (square.style.backgroundColor !== 'red') return;

            square.innerHTML = '';
            square.dataset.piece = 'none';
            square.dataset.color = 'none';
            square.style.backgroundColor = '';

            newsquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
            newsquare.dataset.piece = 'pawn';
            newsquare.dataset.color = 'black';
            newsquare.style.color = 'black';
            newsquare.style.backgroundColor = '';
            newsquare2.style.backgroundColor = '';

            pieceverifier.length = 0;
            clicks.length = 0;
            counterplay++;
            highlightCheck();
            checkGameOver();
        }, { once: true });

        if (square.dataset.row === '2' && newsquare2 && newsquare2.dataset.piece === 'none') {

            newsquare2.style.backgroundColor = 'green';

            newsquare2.addEventListener('click', () => {
                if (pieceverifier.at(-1) !== 'pawn') return;
                if (square.style.backgroundColor !== 'red') return;

                square.innerHTML = '';
                square.dataset.piece = 'none';
                square.dataset.color = 'none';
                square.style.backgroundColor = '';

                newsquare2.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                newsquare2.dataset.piece = 'pawn';
                newsquare2.dataset.color = 'black';
                newsquare2.style.color = 'black';
                newsquare2.style.backgroundColor = '';
                newsquare.style.backgroundColor = '';

                pieceverifier.length = 0;
                clicks.length = 0;
                counterplay++;
                highlightCheck();
                checkGameOver();
            }, { once: true });
        }
    }

    if (lefttakesquare && lefttakesquare.dataset.piece !== 'none' && lefttakesquare.dataset.color === 'white') {

        lefttakesquare.style.backgroundColor = 'orange';

        lefttakesquare.addEventListener('click', () => {
            if (pieceverifier.at(-1) !== 'pawn') return;
            if (square.style.backgroundColor !== 'red') return;

            square.innerHTML = '';
            square.dataset.piece = 'none';
            square.dataset.color = 'none';
            square.style.backgroundColor = '';

            lefttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
            lefttakesquare.dataset.piece = 'pawn';
            lefttakesquare.dataset.color = 'black';
            lefttakesquare.style.color = 'black';
            lefttakesquare.style.backgroundColor = '';

            pieceverifier.length = 0;
            clicks.length = 0;
            counterplay++;
            highlightCheck();
            checkGameOver();
        }, { once: true });
    }

    if (righttakesquare && righttakesquare.dataset.piece !== 'none' && righttakesquare.dataset.color === 'white') {

        righttakesquare.style.backgroundColor = 'orange';

        righttakesquare.addEventListener('click', () => {
            if (pieceverifier.at(-1) !== 'pawn') return;
            if (square.style.backgroundColor !== 'red') return;

            square.innerHTML = '';
            square.dataset.piece = 'none';
            square.dataset.color = 'none';
            square.style.backgroundColor = '';

            righttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
            righttakesquare.dataset.piece = 'pawn';
            righttakesquare.dataset.color = 'black';
            righttakesquare.style.color = 'black';
            righttakesquare.style.backgroundColor = '';

            pieceverifier.length = 0;
            clicks.length = 0;
            counterplay++;
            highlightCheck();
            checkGameOver();
        }, { once: true });
    }
}else if (square.dataset.piece === 'knight' && square.dataset.color === 'black') {
                    pieceverifier.length = 0;
                    pieceverifier.push('knight');
                    square.style.backgroundColor = 'red';

                    knightTurnId++;
                    const thisKnightTurn = knightTurnId;

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarekn();
                    let newsquare = [];

                    newsquare.push(
                        getSquare(row + 2, col + 1), getSquare(row + 2, col - 1),
                        getSquare(row - 2, col - 1), getSquare(row - 2, col + 1),
                        getSquare(row - 1, col + 2), getSquare(row - 1, col - 2),
                        getSquare(row + 1, col + 2), getSquare(row + 1, col - 2)
                    );

                    newsquare = newsquare.filter(Boolean);

                    newsquare.forEach(knightsquare => {
                        if (knightsquare.dataset.piece === 'none' || knightsquare.dataset.color === 'white') {
                            knightsquare.style.backgroundColor = knightsquare.dataset.color === 'white' ? 'orange' : 'green';
                            knightsquare.addEventListener('click', () => {
                                if (thisKnightTurn !== knightTurnId) return;
                                if (pieceverifier.at(-1) !== 'knight') return;

                                square.innerHTML = '';
                                square.dataset.piece = 'none';
                                square.dataset.color = 'none';
                                square.style.backgroundColor = '';

                                knightsquare.innerHTML = '<i class="fa-solid fa-chess-knight"></i>';
                                knightsquare.dataset.piece = 'knight';
                                knightsquare.dataset.color = 'black';
                                knightsquare.style.color = 'black';

                                pieceverifier.length = 0;
                                knightTurnId++;
                                counterplay++;

                                newsquare.forEach(sq => sq.style.backgroundColor = '');
                                highlightCheck();
                                checkGameOver();
                            }, { once: true });
                        }
                    });
                } else if (square.dataset.piece === 'rook' && square.dataset.color === 'black') {
                    pieceverifier.length = 0;
                    pieceverifier.push('rook');

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarekn();
                    newsquarerook = [];
                    square.style.backgroundColor = 'red';

                    rookTurnId++;
                    const thisRookTurn = rookTurnId;

                    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

                    directions.forEach(([dr, dc]) => {
                        for (let i = 1; i <= 7; i++) {
                            const target = getSquare(row + dr * i, col + dc * i);
                            if (!target) break;
                            newsquarerook.push(target);
                            if (target.dataset.piece !== 'none') break;
                        }
                    });

                    newsquarerook.forEach(rooksquare => {
                        if (rooksquare.dataset.color === 'black') return;
                        rooksquare.style.backgroundColor = rooksquare.dataset.piece === 'none' ? 'green' : 'orange';
                        rooksquare.addEventListener('click', () => {
                            if (thisRookTurn !== rookTurnId) return;
                            if (pieceverifier.at(-1) !== 'rook') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            rooksquare.innerHTML = '<i class="fa-solid fa-chess-rook"></i>';
                            rooksquare.dataset.piece = 'rook';
                            rooksquare.dataset.color = 'black';
                            rooksquare.style.color = 'black';
                            rooksquare.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            rookTurnId++;
                            counterplay++;

                            newsquarerook.forEach(sq => sq.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });
                } else if (square.dataset.piece === 'bishop' && square.dataset.color === 'black') {
                    pieceverifier.length = 0;
                    pieceverifier.push('bishop');
                    square.style.backgroundColor = 'red';

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarebishop();
                    newsquarebishop = [];

                    bishopTurnId++;
                    const thisBishopTurn = bishopTurnId;

                    const diagonals = [[1, 1], [-1, -1], [1, -1], [-1, 1]];

                    diagonals.forEach(([dr, dc]) => {
                        for (let i = 1; i <= 7; i++) {
                            const target = getSquare(row + dr * i, col + dc * i);
                            if (!target) break;
                            newsquarebishop.push(target);
                            if (target.dataset.piece !== 'none') break;
                        }
                    });

                    newsquarebishop.forEach(bishopsquare => {
                        if (bishopsquare.dataset.color === 'black') return;
                        bishopsquare.style.backgroundColor = bishopsquare.dataset.piece === 'none' ? 'green' : 'orange';
                        bishopsquare.addEventListener('click', () => {
                            if (thisBishopTurn !== bishopTurnId) return;
                            if (pieceverifier.at(-1) !== 'bishop') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            bishopsquare.innerHTML = '<i class="fa-solid fa-chess-bishop"></i>';
                            bishopsquare.dataset.piece = 'bishop';
                            bishopsquare.dataset.color = 'black';
                            bishopsquare.style.color = 'black';
                            bishopsquare.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            bishopTurnId++;
                            counterplay++;

                            newsquarebishop.forEach(sq => sq.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });
                } else if (square.dataset.piece === 'queen' && square.dataset.color === 'black') {
                    pieceverifier.length = 0;
                    pieceverifier.push('queen');

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarekn();
                    resetsquarebishop();
                    newsquarerook = [];
                    newsquarebishop = [];
                    square.style.backgroundColor = 'red';

                    rookTurnId++;
                    bishopTurnId++;
                    const thisRookTurn = rookTurnId;
                    const thisBishopTurn = bishopTurnId;

                    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
                        for (let i = 1; i <= 7; i++) {
                            const target = getSquare(row + dr * i, col + dc * i);
                            if (!target) break;
                            newsquarerook.push(target);
                            if (target.dataset.piece !== 'none') break;
                        }
                    });

                    newsquarerook.forEach(sq => {
                        if (sq.dataset.color === 'black') return;
                        sq.style.backgroundColor = sq.dataset.piece === 'none' ? 'green' : 'orange';
                        sq.addEventListener('click', () => {
                            if (thisRookTurn !== rookTurnId) return;
                            if (pieceverifier.at(-1) !== 'queen') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            sq.innerHTML = '<i class="fa-solid fa-chess-queen"></i>';
                            sq.dataset.piece = 'queen';
                            sq.dataset.color = 'black';
                            sq.style.color = 'black';
                            sq.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            rookTurnId++;
                            bishopTurnId++;
                            counterplay++;

                            newsquarerook.forEach(s => s.style.backgroundColor = '');
                            newsquarebishop.forEach(s => s.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });

                    [[1, 1], [1, -1], [-1, -1], [-1, 1]].forEach(([dr, dc]) => {
                        for (let i = 1; i <= 7; i++) {
                            const target = getSquare(row + dr * i, col + dc * i);
                            if (!target) break;
                            newsquarebishop.push(target);
                            if (target.dataset.piece !== 'none') break;
                        }
                    });

                    newsquarebishop.forEach(sq => {
                        if (sq.dataset.color === 'black') return;
                        sq.style.backgroundColor = sq.dataset.piece === 'none' ? 'green' : 'orange';
                        sq.addEventListener('click', () => {
                            if (thisBishopTurn !== bishopTurnId) return;
                            if (pieceverifier.at(-1) !== 'queen') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            sq.innerHTML = '<i class="fa-solid fa-chess-queen"></i>';
                            sq.dataset.piece = 'queen';
                            sq.dataset.color = 'black';
                            sq.style.color = 'black';
                            sq.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            bishopTurnId++;
                            rookTurnId++;
                            counterplay++;

                            newsquarerook.forEach(s => s.style.backgroundColor = '');
                            newsquarebishop.forEach(s => s.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });
                } else if (square.dataset.piece === 'king' && square.dataset.color === 'black') {
                    pieceverifier.length = 0;
                    pieceverifier.push('king');

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarekn();
                    resetsquarebishop();
                    newsquarerook = [];
                    newsquarebishop = [];
                    square.style.backgroundColor = 'red';

                    kingTurnId++;
                    const thisKingTurn = kingTurnId;

                    const directions = [
                        [1, 0], [-1, 0], [0, 1], [0, -1],
                        [1, 1], [1, -1], [-1, -1], [-1, 1]
                    ];

                    directions.forEach(([dr, dc]) => {
                        const target = getSquare(row + dr, col + dc);
                        if (!target) return;

                        const tr = parseInt(target.dataset.row);
                        const tc = parseInt(target.dataset.col);

                        const pawnL = getSquare(tr + 1, tc - 1);
                        const pawnR = getSquare(tr + 1, tc + 1);

                        const knightSquares = [
                            getSquare(tr - 2, tc - 1), getSquare(tr - 2, tc + 1),
                            getSquare(tr - 1, tc - 2), getSquare(tr - 1, tc + 2),
                            getSquare(tr + 1, tc - 2), getSquare(tr + 1, tc + 2),
                            getSquare(tr + 2, tc - 1), getSquare(tr + 2, tc + 1)
                        ];

                        if ((pawnL && pawnL.dataset.piece === 'pawn' && pawnL.dataset.color === 'white') ||
                            (pawnR && pawnR.dataset.piece === 'pawn' && pawnR.dataset.color === 'white') ||
                            knightSquares.some(sq => sq && sq.dataset.piece === 'knight' && sq.dataset.color === 'white')) return;

                        const bishopDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
                        for (let [dr2, dc2] of bishopDirs) {
                            let r = tr + dr2;
                            let c = tc + dc2;
                            while (true) {
                                const sq = getSquare(r, c);
                                if (!sq) break;
                                if (sq.dataset.piece !== 'none') {
                                    if (sq.dataset.color === 'white' && (sq.dataset.piece === 'bishop' || sq.dataset.piece === 'queen')) return;
                                    break;
                                }
                                r += dr2;
                                c += dc2;
                            }
                        }

                        const rookDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                        for (let [dr2, dc2] of rookDirs) {
                            let r = tr + dr2;
                            let c = tc + dc2;
                            while (true) {
                                const sq = getSquare(r, c);
                                if (!sq) break;
                                if (sq.dataset.piece !== 'none') {
                                    if (sq.dataset.color === 'white' && (sq.dataset.piece === 'rook' || sq.dataset.piece === 'queen')) return;
                                    break;
                                }
                                r += dr2;
                                c += dc2;
                            }
                        }

                        const kingAdj = [
                            getSquare(tr - 1, tc - 1), getSquare(tr - 1, tc), getSquare(tr - 1, tc + 1),
                            getSquare(tr, tc - 1), getSquare(tr, tc + 1),
                            getSquare(tr + 1, tc - 1), getSquare(tr + 1, tc), getSquare(tr + 1, tc + 1)
                        ];

                        if (kingAdj.some(sq => sq && sq.dataset.piece === 'king' && sq.dataset.color === 'white')) return;
                        if (target.dataset.color === 'black') return;

                        target.style.backgroundColor = target.dataset.piece === 'none' ? 'green' : 'orange';
                        newsquarerook.push(target);

                        target.addEventListener('click', () => {
                            if (thisKingTurn !== kingTurnId) return;
                            if (pieceverifier.at(-1) !== 'king') return;
                            if (target.style.backgroundColor !== 'green' && target.style.backgroundColor !== 'orange') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            target.innerHTML = '<i class="fa-solid fa-chess-king"></i>';
                            target.dataset.piece = 'king';
                            target.dataset.color = 'black';
                            target.style.color = 'black';
                            target.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            kingTurnId++;
                            counterplay++;

                            newsquarerook.forEach(sq => sq.style.backgroundColor = '');
                            newsquarebishop.forEach(sq => sq.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });
                }
            }
        } else if (square.dataset.color === 'white') {
            if (counterplay % 2 !== 0) {
                resetsquarecol();

if (square.dataset.piece === 'pawn' && square.dataset.color === 'white') {

    pieceverifier.length = 0;
    pieceverifier.push('pawn');
    square.style.backgroundColor = 'red';

    let row = parseInt(square.dataset.row) - 1;
    let col = parseInt(square.dataset.col);

    resetsquare();
    clicks.length = 0;
    clicks.push(col);

    const newsquare = getSquare(row, col);
    const newsquare2 = getSquare(row - 1, col);
    const lefttakesquare = getSquare(row, col - 1);
    const righttakesquare = getSquare(row, col + 1);

    if (newsquare && newsquare.dataset.piece === 'none') {
        newsquare.style.backgroundColor = 'green';

        newsquare.addEventListener('click', () => {
            if (pieceverifier.at(-1) !== 'pawn') return;
            if (square.style.backgroundColor !== 'red') return;

            square.innerHTML = '';
            square.dataset.piece = 'none';
            square.dataset.color = 'none';
            square.style.backgroundColor = '';

            newsquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
            newsquare.dataset.piece = 'pawn';
            newsquare.dataset.color = 'white';
            newsquare.style.color = 'white';
            newsquare.style.backgroundColor = '';
            newsquare2.style.backgroundColor = '';

            pieceverifier.length = 0;
            clicks.length = 0;
            counterplay++;
            highlightCheck();
            checkGameOver();
        }, { once: true });

        if (square.dataset.row === '7' && newsquare2 && newsquare2.dataset.piece === 'none') {

            newsquare2.style.backgroundColor = 'green';

            newsquare2.addEventListener('click', () => {
                if (pieceverifier.at(-1) !== 'pawn') return;
                if (square.style.backgroundColor !== 'red') return;

                square.innerHTML = '';
                square.dataset.piece = 'none';
                square.dataset.color = 'none';
                square.style.backgroundColor = '';

                newsquare2.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                newsquare2.dataset.piece = 'pawn';
                newsquare2.dataset.color = 'white';
                newsquare2.style.color = 'white';
                newsquare2.style.backgroundColor = '';
                newsquare.style.backgroundColor = '';

                pieceverifier.length = 0;
                clicks.length = 0;
                counterplay++;
                highlightCheck();
                checkGameOver();
            }, { once: true });
        }
    }

    if (lefttakesquare && lefttakesquare.dataset.piece !== 'none' && lefttakesquare.dataset.color === 'black') {

        lefttakesquare.style.backgroundColor = 'orange';

        lefttakesquare.addEventListener('click', () => {
            if (pieceverifier.at(-1) !== 'pawn') return;
            if (square.style.backgroundColor !== 'red') return;

            square.innerHTML = '';
            square.dataset.piece = 'none';
            square.dataset.color = 'none';
            square.style.backgroundColor = '';

            lefttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
            lefttakesquare.dataset.piece = 'pawn';
            lefttakesquare.dataset.color = 'white';
            lefttakesquare.style.color = 'white';
            lefttakesquare.style.backgroundColor = '';

            pieceverifier.length = 0;
            clicks.length = 0;
            counterplay++;
            highlightCheck();
            checkGameOver();
        }, { once: true });
    }

    if (righttakesquare && righttakesquare.dataset.piece !== 'none' && righttakesquare.dataset.color === 'black') {

        righttakesquare.style.backgroundColor = 'orange';

        righttakesquare.addEventListener('click', () => {
            if (pieceverifier.at(-1) !== 'pawn') return;
            if (square.style.backgroundColor !== 'red') return;

            square.innerHTML = '';
            square.dataset.piece = 'none';
            square.dataset.color = 'none';
            square.style.backgroundColor = '';

            righttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
            righttakesquare.dataset.piece = 'pawn';
            righttakesquare.dataset.color = 'white';
            righttakesquare.style.color = 'white';
            righttakesquare.style.backgroundColor = '';

            pieceverifier.length = 0;
            clicks.length = 0;
            counterplay++;
            highlightCheck();
            checkGameOver();
        }, { once: true });
    }
}else if (square.dataset.piece === 'knight' && square.dataset.color === 'white') {
                    pieceverifier.length = 0;
                    pieceverifier.push('knight');
                    square.style.backgroundColor = 'red';

                    knightTurnId++;
                    const thisKnightTurn = knightTurnId;

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarekn();
                    let newsquare = [];

                    newsquare.push(
                        getSquare(row + 2, col + 1), getSquare(row + 2, col - 1),
                        getSquare(row - 2, col - 1), getSquare(row - 2, col + 1),
                        getSquare(row - 1, col + 2), getSquare(row - 1, col - 2),
                        getSquare(row + 1, col + 2), getSquare(row + 1, col - 2)
                    );

                    newsquare = newsquare.filter(Boolean);

                    newsquare.forEach(knightsquare => {
                        if (knightsquare.dataset.piece === 'none' || knightsquare.dataset.color === 'black') {
                            knightsquare.style.backgroundColor = knightsquare.dataset.color === 'black' ? 'orange' : 'green';
                            knightsquare.addEventListener('click', () => {
                                if (thisKnightTurn !== knightTurnId) return;
                                if (pieceverifier.at(-1) !== 'knight') return;

                                square.innerHTML = '';
                                square.dataset.piece = 'none';
                                square.dataset.color = 'none';
                                square.style.backgroundColor = '';

                                knightsquare.innerHTML = '<i class="fa-solid fa-chess-knight"></i>';
                                knightsquare.dataset.piece = 'knight';
                                knightsquare.dataset.color = 'white';
                                knightsquare.style.color = 'white';

                                pieceverifier.length = 0;
                                knightTurnId++;
                                counterplay++;

                                newsquare.forEach(sq => sq.style.backgroundColor = '');
                                highlightCheck();
                                checkGameOver();
                            }, { once: true });
                        }
                    });
                } else if (square.dataset.piece === 'rook' && square.dataset.color === 'white') {
                    pieceverifier.length = 0;
                    pieceverifier.push('rook');

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarekn();
                    newsquarerook = [];
                    square.style.backgroundColor = 'red';

                    rookTurnId++;
                    const thisRookTurn = rookTurnId;

                    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
                        for (let i = 1; i <= 7; i++) {
                            const target = getSquare(row + dr * i, col + dc * i);
                            if (!target) break;
                            newsquarerook.push(target);
                            if (target.dataset.piece !== 'none') break;
                        }
                    });

                    newsquarerook.forEach(rooksquare => {
                        if (rooksquare.dataset.color === 'white') return;
                        rooksquare.style.backgroundColor = rooksquare.dataset.piece === 'none' ? 'green' : 'orange';
                        rooksquare.addEventListener('click', () => {
                            if (thisRookTurn !== rookTurnId) return;
                            if (pieceverifier.at(-1) !== 'rook') return;
                            if (rooksquare.style.backgroundColor !== 'green' && rooksquare.style.backgroundColor !== 'orange') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            rooksquare.innerHTML = '<i class="fa-solid fa-chess-rook"></i>';
                            rooksquare.dataset.piece = 'rook';
                            rooksquare.dataset.color = 'white';
                            rooksquare.style.color = 'white';
                            rooksquare.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            rookTurnId++;
                            counterplay++;

                            newsquarerook.forEach(sq => sq.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });
                } else if (square.dataset.piece === 'bishop' && square.dataset.color === 'white') {
                    pieceverifier.length = 0;
                    pieceverifier.push('bishop');
                    square.style.backgroundColor = 'red';

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarebishop();
                    newsquarebishop = [];

                    bishopTurnId++;
                    const thisBishopTurn = bishopTurnId;

                    [[1, 1], [-1, -1], [1, -1], [-1, 1]].forEach(([dr, dc]) => {
                        for (let i = 1; i <= 7; i++) {
                            const target = getSquare(row + dr * i, col + dc * i);
                            if (!target) break;
                            newsquarebishop.push(target);
                            if (target.dataset.piece !== 'none') break;
                        }
                    });

                    newsquarebishop.forEach(bishopsquare => {
                        if (bishopsquare.dataset.color === 'white') return;
                        bishopsquare.style.backgroundColor = bishopsquare.dataset.piece === 'none' ? 'green' : 'orange';
                        bishopsquare.addEventListener('click', () => {
                            if (thisBishopTurn !== bishopTurnId) return;
                            if (pieceverifier.at(-1) !== 'bishop') return;
                            if (bishopsquare.style.backgroundColor !== 'green' && bishopsquare.style.backgroundColor !== 'orange') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            bishopsquare.innerHTML = '<i class="fa-solid fa-chess-bishop"></i>';
                            bishopsquare.dataset.piece = 'bishop';
                            bishopsquare.dataset.color = 'white';
                            bishopsquare.style.color = 'white';
                            bishopsquare.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            bishopTurnId++;
                            counterplay++;

                            newsquarebishop.forEach(sq => sq.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });
                } else if (square.dataset.piece === 'queen' && square.dataset.color === 'white') {
                    pieceverifier.length = 0;
                    pieceverifier.push('queen');

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarekn();
                    resetsquarebishop();
                    newsquarerook = [];
                    newsquarebishop = [];
                    square.style.backgroundColor = 'red';

                    rookTurnId++;
                    bishopTurnId++;
                    const thisRookTurn = rookTurnId;
                    const thisBishopTurn = bishopTurnId;

                    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
                        for (let i = 1; i <= 7; i++) {
                            const target = getSquare(row + dr * i, col + dc * i);
                            if (!target) break;
                            newsquarerook.push(target);
                            if (target.dataset.piece !== 'none') break;
                        }
                    });

                    newsquarerook.forEach(sq => {
                        if (sq.dataset.color === 'white') return;
                        sq.style.backgroundColor = sq.dataset.piece === 'none' ? 'green' : 'orange';
                        sq.addEventListener('click', () => {
                            if (thisRookTurn !== rookTurnId) return;
                            if (pieceverifier.at(-1) !== 'queen') return;
                            if (sq.style.backgroundColor !== 'green' && sq.style.backgroundColor !== 'orange') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            sq.innerHTML = '<i class="fa-solid fa-chess-queen"></i>';
                            sq.dataset.piece = 'queen';
                            sq.dataset.color = 'white';
                            sq.style.color = 'white';
                            sq.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            rookTurnId++;
                            bishopTurnId++;
                            counterplay++;

                            newsquarerook.forEach(s => s.style.backgroundColor = '');
                            newsquarebishop.forEach(s => s.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });

                    [[1, 1], [1, -1], [-1, -1], [-1, 1]].forEach(([dr, dc]) => {
                        for (let i = 1; i <= 7; i++) {
                            const target = getSquare(row + dr * i, col + dc * i);
                            if (!target) break;
                            newsquarebishop.push(target);
                            if (target.dataset.piece !== 'none') break;
                        }
                    });

                    newsquarebishop.forEach(sq => {
                        if (sq.dataset.color === 'white') return;
                        sq.style.backgroundColor = sq.dataset.piece === 'none' ? 'green' : 'orange';
                        sq.addEventListener('click', () => {
                            if (thisBishopTurn !== bishopTurnId) return;
                            if (pieceverifier.at(-1) !== 'queen') return;
                            if (sq.style.backgroundColor !== 'green' && sq.style.backgroundColor !== 'orange') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            sq.innerHTML = '<i class="fa-solid fa-chess-queen"></i>';
                            sq.dataset.piece = 'queen';
                            sq.dataset.color = 'white';
                            sq.style.color = 'white';
                            sq.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            bishopTurnId++;
                            rookTurnId++;
                            counterplay++;

                            newsquarerook.forEach(s => s.style.backgroundColor = '');
                            newsquarebishop.forEach(s => s.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });
                } else if (square.dataset.piece === 'king' && square.dataset.color === 'white') {
                    pieceverifier.length = 0;
                    pieceverifier.push('king');

                    let row = parseInt(square.dataset.row);
                    let col = parseInt(square.dataset.col);

                    resetsquarekn();
                    resetsquarebishop();
                    newsquarerook = [];
                    newsquarebishop = [];
                    square.style.backgroundColor = 'red';

                    kingTurnId++;
                    const thisKingTurn = kingTurnId;

                    const directions = [
                        [1, 0], [-1, 0], [0, 1], [0, -1],
                        [1, 1], [1, -1], [-1, -1], [-1, 1]
                    ];

                    directions.forEach(([dr, dc]) => {
                        const target = getSquare(row + dr, col + dc);
                        if (!target) return;

                        const tr = parseInt(target.dataset.row);
                        const tc = parseInt(target.dataset.col);

                        const pawnL = getSquare(tr - 1, tc - 1);
                        const pawnR = getSquare(tr - 1, tc + 1);

                        const knightSquares = [
                            getSquare(tr - 2, tc - 1), getSquare(tr - 2, tc + 1),
                            getSquare(tr - 1, tc - 2), getSquare(tr - 1, tc + 2),
                            getSquare(tr + 1, tc - 2), getSquare(tr + 1, tc + 2),
                            getSquare(tr + 2, tc - 1), getSquare(tr + 2, tc + 1)
                        ];

                        if ((pawnL && pawnL.dataset.piece === 'pawn' && pawnL.dataset.color === 'black') ||
                            (pawnR && pawnR.dataset.piece === 'pawn' && pawnR.dataset.color === 'black') ||
                            knightSquares.some(sq => sq && sq.dataset.piece === 'knight' && sq.dataset.color === 'black')) return;

                        const bishopDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
                        for (let [dr2, dc2] of bishopDirs) {
                            let r = tr + dr2;
                            let c = tc + dc2;
                            while (true) {
                                const sq = getSquare(r, c);
                                if (!sq) break;
                                if (sq.dataset.piece !== 'none') {
                                    if (sq.dataset.color === 'black' && (sq.dataset.piece === 'bishop' || sq.dataset.piece === 'queen')) return;
                                    break;
                                }
                                r += dr2;
                                c += dc2;
                            }
                        }

                        const rookDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                        for (let [dr2, dc2] of rookDirs) {
                            let r = tr + dr2;
                            let c = tc + dc2;
                            while (true) {
                                const sq = getSquare(r, c);
                                if (!sq) break;
                                if (sq.dataset.piece !== 'none') {
                                    if (sq.dataset.color === 'black' && (sq.dataset.piece === 'rook' || sq.dataset.piece === 'queen')) return;
                                    break;
                                }
                                r += dr2;
                                c += dc2;
                            }
                        }

                        const kingAdj = [
                            getSquare(tr - 1, tc - 1), getSquare(tr - 1, tc), getSquare(tr - 1, tc + 1),
                            getSquare(tr, tc - 1), getSquare(tr, tc + 1),
                            getSquare(tr + 1, tc - 1), getSquare(tr + 1, tc), getSquare(tr + 1, tc + 1)
                        ];

                        if (kingAdj.some(sq => sq && sq.dataset.piece === 'king' && sq.dataset.color === 'black')) return;
                        if (target.dataset.color === 'white') return;

                        target.style.backgroundColor = target.dataset.piece === 'none' ? 'green' : 'orange';
                        newsquarerook.push(target);

                        target.addEventListener('click', () => {
                            if (thisKingTurn !== kingTurnId) return;
                            if (pieceverifier.at(-1) !== 'king') return;
                            if (target.style.backgroundColor !== 'green' && target.style.backgroundColor !== 'orange') return;

                            square.innerHTML = '';
                            square.dataset.piece = 'none';
                            square.dataset.color = 'none';
                            square.style.backgroundColor = '';

                            target.innerHTML = '<i class="fa-solid fa-chess-king"></i>';
                            target.dataset.piece = 'king';
                            target.dataset.color = 'white';
                            target.style.color = 'white';
                            target.style.backgroundColor = '';

                            pieceverifier.length = 0;
                            kingTurnId++;
                            counterplay++;

                            newsquarerook.forEach(sq => sq.style.backgroundColor = '');
                            newsquarebishop.forEach(sq => sq.style.backgroundColor = '');
                            highlightCheck();
                            checkGameOver();
                        }, { once: true });
                    });
                }
            }
        }
    });
});

function resetsquare() {
    squares.forEach(() => {
        clicks.pop();
    });
}

function resetsquarekn() {
    newsquare.length = 0;
}

function resetsquarerook() {
    newsquarerook.length = 0;
}

function resetsquarebishop() {
    newsquarebishop.length = 0;
}

function resetsquarecol() {
    squares.forEach(square => {
        square.style.backgroundColor = '';
    });
}

function getSquare(row, col) {
    return document.querySelector(`.square[data-row='${row}'][data-col='${col}']`);
}