class Move {
    constructor(table_original){
        this.table_original = table_original;
        this.moves = []

        const table = []
        
        for (let i = 0; i < table_original.length;) {
          table.push(table_original.slice(i, i += 3))
        }
        
        let i = 0
        let j = 0
        
        while (!table[i].includes("")) i++
        
        j = table[i].indexOf("")
        
        if (i < 2) {
            // mover o * para baixo
            const newtable = table.map(row => [...row]);
            [newtable[i][j], newtable[i + 1][j]] = [newtable[i + 1][j], newtable[i][j]]
            this.moves.push(JSON.stringify(newtable.flat()))
        }
        
        if (i > 0) {
            // mover o * para cima
            const newtable = table.map(row => [...row]);
            [newtable[i][j], newtable[i - 1][j]] = [newtable[i - 1][j], newtable[i][j]]
            this.moves.push(JSON.stringify(newtable.flat()))
        }
        
        if (j < 2) {
            // mover o * para a direita
            const newtable = table.map(row => [...row]);
            [newtable[i][j], newtable[i][j + 1]] = [newtable[i][j + 1], newtable[i][j]]
            this.moves.push(JSON.stringify(newtable.flat()))
        }
        
        if (j > 0) {
            // mover o * para a esquerda
            const newtable = table.map(row => [...row]);
            [newtable[i][j], newtable[i][j - 1]] = [newtable[i][j - 1], newtable[i][j]]
            this.moves.push(JSON.stringify(newtable.flat()))
        }
        
        return this.moves 
    }
}