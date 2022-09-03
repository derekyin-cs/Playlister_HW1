/**
 * Playlist.js
 * 
 * This class represents our playlist.
 * 
 * @author McKilla Gorilla
 * @author Derek Yin
 */
export default class Playlist {
    constructor(initId) {
        this.id = initId;
    }

    getName() {
        return this.name;
    }

    setName(initName) {
        this.name = initName;
    }

    getSongAt(index) {
        return this.songs[index];
    }

    setSongAt(index, song) {
        this.songs[index] = song;
    }

    setSongs(initSongs) {
        this.songs = initSongs;
    }

    removeSongAt(index){
        this.songs.splice(index, 1);
    }

    moveSong(oldIndex, newIndex) {
        this.songs.splice(newIndex, 0, this.songs.splice(oldIndex, 1)[0]);
    }

    // addSong(song){
    //     this.songs[this.songs.length] = song;
    // }
}