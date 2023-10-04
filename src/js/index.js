const puzzleContainer = document.getElementById("puzzle-container")
const searchButton    = document.getElementById("search")
const type            = document.getElementById("type")
const random          = document.getElementById("random")
const initialState    = [1, 2, 3, 4, 5, 6, 7, 8, ""]
const finalState      = JSON.stringify(initialState)
let currentState      = [...initialState];

random.addEventListener('click', function(){
  randomize()
})

function randomize() {
  do {
      currentState = initialState.slice(); 
      for (let i = currentState.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [currentState[i], currentState[j]] = [currentState[j], currentState[i]];
      }
  } while (!isSolvable(currentState));
  createPuzzleBoard()
}

function isSolvable(state) {
  let inversionCount = 0;
  for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 9; j++) {
          if (state[i] > state[j] && state[i] != "" && state[j] != "") {
              inversionCount++;
          }
      }
  }
  return inversionCount % 2 == 0;
}

function createPuzzleBoard() {
  puzzleContainer.innerHTML = "";
  for (let i = 0; i < 9; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      const img = document.createElement("img");
      img.src = currentState[i] !== "" ? `images/${currentState[i]}.jpg` : "";
      tile.appendChild(img);
      const number = document.createElement("span");
      number.className = "tile-number";
      number.textContent = currentState[i] !== "" ? currentState[i] : "";
      tile.appendChild(number);
      puzzleContainer.appendChild(tile);
  }
}

searchButton.addEventListener('click', function(){
  let tStart = new Date().getTime();
    if(type.value == 1){
      breadthFirstSearch(JSON.stringify(currentState))
      function breadthFirstSearch(currentState){
        let closedList = []
        let openedList = []
        openedList.push(currentState)
        let visitedNodes = {}
        let x = 0

        while(x < openedList.length && x < 40000) {
          if(!(closedList[openedList[x]]) && !(typeof openedList[x] === "undefined")) {
            new Move(JSON.parse(openedList[x])).forEach((item, index) => {
              if(!(visitedNodes[item])){
                openedList.push((item))
                visitedNodes[item] = true
              }
            }) 
            if(visitedNodes[finalState]){
              let tEnd = (new Date().getTime()) - tStart
              showCustomAlert(openedList, tEnd, 5)
            return;
            }
            closedList.push(openedList[x])
        }
          x++
      }
        alert(`Limit exceeded: ${x}`)
      }
    } else {
      aStarSearch(JSON.stringify(currentState))
      function aStarSearch(currentState) {
        let x = 0
        let closedList = []
        let openedList = []
        openedList.push(currentState)
        const lista = []
        let visitedNodes = {}
      
        while(openedList.length > 0 && x < 2000) {
          if(!(openedList[0] === undefined)) {
            new Move(JSON.parse(openedList[0])).forEach((item, index) => {
              let heuristc = new Heuristic(JSON.parse(item)) 
              let val = [heuristc.out, item]
              if(!visitedNodes[val[1]]){
                lista.push(val)
                visitedNodes[val[1]] = true
              }
            })
            closedList.push(openedList[0])

            lista.sort()

            for(estado of lista){
              if (estado[1] === finalState) {
                let tEnd = (new Date().getTime()) - tStart
                closedList.push(estado[1])
                showCustomAlert(closedList, tEnd, 80)
                return
              } else if(!closedList.includes(estado[1])){
                openedList.push(estado[1])
                break
              }
            }
            openedList.shift()
            x++
          }

        }
        alert(`Limit exceeded: ${x}`)
      }
    }

    function showCustomAlert(path, time, tAnimate) {
      Swal.fire({
          title: "Sucess!",
          text: `Nodes: ${path.indexOf(finalState)} | Time: ${time} ms`,
          icon: 'success',
          timer: 100000, 
          showConfirmButton: true,
          customClass: {
              popup: 'custom-sweetalert' 
          }
      }).then((result) => {
        if(result.isConfirmed){
          animateSolution(path, tAnimate)
        }
      });
  }
  })

  function animateSolution(path, timer) {
    let i = 0;
    const interval = setInterval(() => {
        if (i <= path.indexOf(finalState)) {
            currentState = JSON.parse(path[i]);
            createPuzzleBoard();
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                location.reload();
            }, 300);
        }
    }, timer);
}