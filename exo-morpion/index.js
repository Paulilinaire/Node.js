import { Morpion } from "./classes/morpion.js"
import figlet from "figlet";

figlet('Morpion', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

let game = new Morpion()

game.startGame()