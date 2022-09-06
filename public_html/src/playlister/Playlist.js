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

    setIndexToEdit(index){
        this.indexToEdit = index;
    }

    getIndexToEdit(index){
        return this.indexToEdit;
    }

    addSong(){
        let newSong = {
            "title": "Untitled",
            "artist": "Unknown",
            "youTubeId": "dQw4w9WgXcQ"
        };
        this.songs.push(newSong);
    }

    addSongBack(index, title, artist, id){
        let newSong = {
            "title": title,
            "artist": artist,
            "youTubeId": id
        };
        this.songs.splice(index, 0, newSong);
    }

    editSong(index, title, artist, id){
        let thisSong = this.songs[index];
        thisSong.title = title;
        thisSong.artist = artist;
        thisSong.youTubeId = id;
    }

    size(){
        return this.songs.length;
    }




    // addSong(song){
    //     this.songs[this.songs.length] = song;
    // }
}