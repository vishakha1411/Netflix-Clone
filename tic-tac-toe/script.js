let opt1=document.getElementById("opt1");
let opt2=document.getElementById("opt2");
let bot=false;
opt1.addEventListener("click",()=>{
    document.body.children[1].children[1].style.display='';
    document.body.children[1].children[0].style.display='none';
    bot=true;
})
opt2.addEventListener("click",()=>{
    document.body.children[1].children[1].style.display='';
    document.body.children[1].children[0].style.display='none';
})
let chosen = {
    0: 'X',
    1: 'O'
};
let colors=["darkmagenta","maroon"];
let i = 0, count = 0, draw = false, winner = null;
let grid = {
    1: '', 2: '', 3: '',
    4: '', 5: '', 6: '',
    7: '', 8: '', 9: ''
};

function resetGame() {
    grid = {
        1: '', 2: '', 3: '',
        4: '', 5: '', 6: '',
        7: '', 8: '', 9: ''
    };
    count = 0;
    i = 0;
    draw = false;
    winner = null;
    document.getElementById("result").innerText = '';
    document.getElementById("xo").innerText = "Turn for " + chosen[i];
    
    Array.from(boxes).forEach(e => {
        e.innerHTML = '';
        e.style.color = ''; // Reset the color as well
    });
    document.getElementById("line").style.transform = '';
}


let button = document.getElementById("btn");
button.addEventListener('click', resetGame);

function check(xo) {
    const win = [
        [1, 2, 3, 0, 5, 0],
        [4, 5, 6, 0, 15, 0],
        [7, 8, 9,0,25,0],
        [1, 5, 9,0,15,45],
        [1, 4, 7,-10,15.5,90],
        [2, 5, 8,0.5,15.5,90],
        [3, 6, 9,11,15.5,90],
        [3, 5, 7,1,15.5,-45]
    ];
    
    for (let e of win) {
        let count = 0;
        for (let i=0;i<=2;i++) {
            if (grid[e[i]] === xo) count++;
        }
        if (count === 3){
            if(!bot) document.getElementById("line").style.transform=`translate(${e[3]}rem,${e[4]}rem) rotate(${e[5]}deg)`;
            return true;
        }
    }
    return false;
}

function minimax(grid, isMaximizing, player, count) {
    if (check(chosen[player])) {
        return player === 0 ? -count : count; // Minimax returns -1 for loss, 1 for win
    }
    if (count >= 9) {
        return 0; // Draw condition
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 1; i <= 9; i++) {
            if (grid[i] === '') {
                grid[i] = chosen[player];
                let score = minimax(grid, false, 1 - player, count + 1);
                grid[i] = '';
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 1; i <= 9; i++) {
            if (grid[i] === '') {
                grid[i] = chosen[player];
                let score = minimax(grid, true, 1 - player, count + 1);
                grid[i] = '';
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}

function findBestMove(grid, player, count) {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 1; i <= 9; i++) {
        if (grid[i] === '') {
            grid[i] = chosen[player];
            let score = minimax(grid, false, 1 - player, count + 1);
            grid[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    console.log(move);
    return move;
}
document.getElementById("xo").innerText = "Turn for " + chosen[i];
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(e => {
    e.addEventListener("click", () => {
        if (winner || draw) {
            return;
        }
        let boxNumber = parseInt(e.classList[1]);
        if (grid[boxNumber] === '') {
            grid[boxNumber] = chosen[i];
            e.innerHTML = chosen[i];
            e.style.color = colors[i];
            if (check(chosen[i])) {
                document.getElementById("xo").innerText = "Player " + chosen[i] + " wins!";
                document.getElementById("result").innerText = chosen[i] + " WINS!";
                document.getElementById("result").style.color = colors[i];
                winner = chosen[i];
                return;
            }
            count++;
            if (count === 9) {
                document.getElementById("xo").innerText = "It's a draw!";
                document.getElementById("result").innerText = "DRAW!";
                draw = true;
                return;
            }
            i ^= 1;
            document.getElementById("xo").innerText = "Turn for " + chosen[i];

            if (bot && !winner && !draw) {
                let bestMove = findBestMove(grid, i, count);
                if (bestMove !== -1) {
                    grid[bestMove] = chosen[i];
                    document.getElementsByClassName("box")[bestMove - 1].innerHTML = chosen[i];
                    document.getElementsByClassName("box")[bestMove - 1].style.color = colors[i];
                    if (check(chosen[i])) {
                        document.getElementById("xo").innerText = "Player " + chosen[i] + " wins!";
                        document.getElementById("result").innerText ="BOT WINS!";
                        document.getElementById("result").style.color = colors[i];
                        winner = chosen[i];
                        return;
                    }
                    count++;
                    if (count === 9) {
                        document.getElementById("xo").innerText = "It's a draw!";
                        document.getElementById("result").innerText = "DRAW!";
                        draw = true;
                        return;
                    }
                    i ^= 1;
                    document.getElementById("xo").innerText = "Turn for " + chosen[i];
                }
            }
        } else {
            alert("Box occupied! Choose another");
        }
    });
});
    





