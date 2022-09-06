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
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initIndex, initTitle, initArtist, initId, newTitle, newArtist, newId) {
        super();
        this.model = initModel;
        this.index = initIndex;
        this.title = initTitle;
        this.artist = initArtist;
        this.id = initId;
        this.newTitle = newTitle;
        this.newArtist = newArtist;
        this.newId = newId;
    }

    doTransaction() {
        this.model.editSong(this.index, this.newTitle, this.newArtist, this.newId);
    }

    
    
    undoTransaction() {
        this.model.editSong(this.index, this.title, this.artist, this.id);
        // this.model.removeSong(index);
    }
}