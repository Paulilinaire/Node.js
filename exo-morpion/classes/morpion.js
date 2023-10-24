import readline from "readline"

export class Morpion {
    constructor(){
    this.morpion = [];
    this.morpion[8] = undefined;
    this.morpionLayout = '';
    this.currentPlayer = false; 
    // joueur 1 = false (O), joueur 2 = true (X)
    this.gameEnded = false;
    this.moveRegister = [];
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    }

    // mise en page
    updateLayout(){
    this.morpionLayout = 
    `${this.displayItem(this.morpion[0])} | ${this.displayItem(this.morpion[1])} | ${this.displayItem(this.morpion[3])}
    ---------
    ${this.displayItem(this.morpion[3])} | ${this.displayItem(this.morpion[4])} | ${this.displayItem(this.morpion[5])}
    ---------
    ${this.displayItem(this.morpion[6])} | ${this.displayItem(this.morpion[7])} | ${this.displayItem(this.morpion[8])}`;
    }

    // début du jeu
    startGame(){
    this.displayLayout();
        this.rl.on("line", (input) => {
        if(this.morpion.length <= 9){
        this.readMove(parseInt(input))
      } else {
        console.log("Fin du jeu !");
        this.processGame();
            }
        })
    }

    endGame(){
        this.rl.close();
        this.gameEnded = true;
        console.log("Historique des coups --- ")
        console.log(this.moveRegister)
        process.exit();
        return false; 
    }

    continuePlay(){
        this.displayLayout();
        this.processGame();
        if(!this.gameEnded){
        // échange de joueur
        this.currentPlayer = arguments[0] ? this.currentPlayer : !this.currentPlayer;
        console.log(` Joueur ${this.displayPlayer(this.currentPlayer)}, à vous de jouer ! Choisissez un numéro entre 1 et 9: `)
        }
    }

    processGame(){
        // les combinaisons gagnantes
        if(this.moveRegister.length >= 5){
          let checkSet = new Set()
          // alignement vertical possible
          if(this.morpion[0] && this.morpion[3] && this.morpion[6] && (Array.from(checkSet.add(this.morpion[0]).add(this.morpion[3]).add(this.morpion[6])).length === 1)){
            console.log(`Joueur ${this.getPlayerFromChar(this.morpion[0])} Gagné !!`);
            this.endGame();
          }
          checkSet.clear();
          if(this.morpion[1] && this.morpion[4] && this.morpion[7] && (Array.from(checkSet.add(this.morpion[1]).add(this.morpion[4]).add(this.morpion[7])).length === 1)){
            console.log(`Joueur ${this.getPlayerFromChar(this.morpion[1])} Gagné !!`);
            this.endGame();
          }
          checkSet.clear();
          if(this.morpion[2] && this.morpion[5] && this.morpion[8] && (Array.from(checkSet.add(this.morpion[2]).add(this.morpion[5]).add(this.morpion[8])).length === 1)){
            console.log(`Joueur ${this.getPlayerFromChar(this.morpion[2])} Gagné !!`);
            this.endGame();
          }
          checkSet.clear();
          // alignement horizontal possible
          if(this.morpion[0] && this.morpion[1] && this.morpion[2] && (Array.from(checkSet.add(this.morpion[0]).add(this.morpion[1]).add(this.morpion[2])).length === 1)){
            console.log(`Joueur ${this.getPlayerFromChar(this.morpion[0])} Gagné !!`);
            this.endGame();
          }
          checkSet.clear();
          if(this.morpion[3] && this.morpion[4] && this.morpion[5] && (Array.from(checkSet.add(this.morpion[3]).add(this.morpion[4]).add(this.morpion[5])).length === 1)){
            console.log(`Joueur ${this.getPlayerFromChar(this.morpion[3])} Gagné !!`);
            this.endGame();
          }
          checkSet.clear();
          if(this.morpion[6] && this.morpion[7] && this.morpion[8] && (Array.from(checkSet.add(this.morpion[6]).add(this.morpion[7]).add(this.morpion[8])).length === 1)){
            console.log(`Joueur ${this.getPlayerFromChar(this.morpion[6])} Gagné !!`);
            this.endGame();
          }
          checkSet.clear();
          // alignement diagonal possible
          if((this.morpion[0] && this.morpion[4] && this.morpion[8] && (Array.from(checkSet.add(this.morpion[0]).add(this.morpion[4]).add(this.morpion[8])).length === 1)) || (this.morpion[2] && this.morpion[4] && this.morpion[6] && (Array.from(checkSet.add(this.morpion[2]).add(this.morpion[4]).add(this.morpion[6])).length === 1))){
            console.log(`Joueur ${this.getPlayerFromChar(this.morpion[4])} Gagné !!`);
            this.endGame();
          }
          checkSet.clear();
        }
        }

    
        displayItem(item){
        return item === undefined ? ' ' : item
        }

        displayPlayer(player){
            return player ? 1 : 2
        }

        getPlayerFromChar(char){
            return this.displayPlayer(char === 'X')
        }

        getCharacter(player){
            return player ? 'X' : 'O'
        }
  
        displayLayout(){
            this.updateLayout()
            console.log(this.morpionLayout);
        }

        readMove(position){
            // verif si position ok
            if ((position > 9) || position < 1){
                this.errorMove("Oups, mauvaise position !!");
                console.log(this.morpion);
            }
            // verif si position est dispo
            if(this.morpion[(position - 1)] !== undefined){
                console.log(this.morpion[(position - 1)]);
                this.errorMove("Attention, case déjà occupée !!");
            } else {
                // enregistrer le coup
                this.morpion[(position - 1)] = this.getCharacter(this.currentPlayer);
                this.recordMove((position - 1), this.currentPlayer);
                this.continuePlay();
            }

        }

        // afficher les mauvais coups
        errorMove(message){
            console.log(`${arguments[0] ? arguments[0]:''} Joueur ${this.displayPlayer(this.currentPlayer)}, c'est encore à vous ! Choisissez un numéro entre 1 et 9:`)
        }

        recordMove(position, player){
            this.moveRegister.push({
              position: position,
              char: this.getCharacter(this.currentPlayer),
              player: this.displayPlayer(this.currentPlayer)
            });
        }
        
        processInput(moveContents){
        let mC = new Set(moveContents);
        this.recordMove(mC[0], mC[1], currentPlayer);
        }

}