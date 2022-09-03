import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding a song. 
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Derek Yin
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initOldIndex, initNewIndex) {
        super();
        this.model = initModel;
        this.oldIndex = initOldIndex;
        this.newIndex = initNewIndex;
        // this.index = initIndex;
    }

    doTransaction() {
        this.model.moveSong(this.oldIndex, this.newIndex);
        // this.model.addSong();
    }
    
    undoTransaction() {
        this.model.moveSong(this.newIndex, this.oldIndex);
        // this.model.removeSong(index);
    }
}