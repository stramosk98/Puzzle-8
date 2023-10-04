class Heuristic {
    constructor(value){
        this.value = value;
        this.out = 0;

        let comparator = 1
        const table = []
        
        for (let i = 0; i < value.length;) {
            table.push(value.slice(i, i += 3))
        }
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
            if (table[i][j] != comparator) {
                this.out++
            }
            comparator++
            }
        }
        if(type.value == 3){
            this.out += getDistance(table)
        }
        this.out = this.out < 10 ? `0${this.out}` : this.out
        
        return this.out
        
        function getDistance(tableuleiro){
            let distanceManhattan = 0
          
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                const val = (tableuleiro[i][j])
                if (val !== "") {
                  const correctRow = Math.floor((val - 1) / 3)
                  const correctCol = (val - 1) % 3
          
                  const distanceHorizontal = Math.abs(j - correctCol)
                  const distanceVertical = Math.abs(i - correctRow)
                  distanceManhattan += distanceHorizontal + distanceVertical
                }
              }
            }
          
            return distanceManhattan;
          }
    }
}