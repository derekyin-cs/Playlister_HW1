import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * RemoveSong_Transaction
 * 
 * This class represents a transaction that works with removing a song. 
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Derek Yin
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initIndex) {
        super();
        this.model = initModel;
        this.index = initIndex;
    }

    doTransaction() {
        this.model.addSong();
    }

    
    
    undoTransaction() {
        this.model.deleteSong();
        // this.model.removeSong(index);
    }
}