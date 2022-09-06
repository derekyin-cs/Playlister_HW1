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
    constructor(initModel, initIndex, initTitle, initArtist, initId) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.title = initTitle;
        this.artist = initArtist;
        this.id = initId;

    }

    doTransaction() {
        this.model.deleteSong(this.index);
    }

    
    
    undoTransaction() {
        // TODO: add song back
        this.model.addSongBack(this.index, this.title, this.artist, this.id);
    }
}