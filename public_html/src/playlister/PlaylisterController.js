/**
 * PlaylistController.js
 * 
 * This class provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author Derek Yin
 */
export default class PlaylisterController {
    constructor() { }

    /*
        setModel 

        We are using an MVC-type approach, so this controller class
        will respond by updating the application data, which is managed
        by the model class. So, this function registers the model 
        object with this controller.
    */
    setModel(initModel) {
        this.model = initModel;
        this.initHandlers();
    }

    /*
        initHandlers

        This function defines the event handlers that will respond to interactions
        with all the static user interface controls, meaning the controls that
        exist in the original Web page. Note that additional handlers will need
        to be initialized for the dynamically loaded content, like for controls
        that are built as the user interface is interacted with.
    */
    initHandlers() {
        // SETUP THE TOOLBAR BUTTON HANDLERS
        this.initEditToolbarHandlers();

        // SETUP THE MODAL HANDLERS
        this.initModalHandlers();
    }

    /*
        initEditToolbarHandlers

        Specifies event handlers for buttons in the toolbar.
    */
    initEditToolbarHandlers() {
        // HANDLER FOR ADDING A NEW LIST BUTTON
        document.getElementById("add-list-button").onmousedown = (event) => {
            let newList = this.model.addNewList("Untitled", []);
            this.model.loadList(newList.id);
            this.model.saveLists();
        }
        // HANDLER FOR UNDO BUTTON
        document.getElementById("undo-button").onmousedown = (event) => {
            this.model.undo();
        }
        // HANDLER FOR REDO BUTTON
        document.getElementById("redo-button").onmousedown = (event) => {
            this.model.redo();
        }
        // HANDLER FOR CLOSE LIST BUTTON
        document.getElementById("close-button").onmousedown = (event) => {
            this.model.unselectAll();
            this.model.unselectCurrentList();
        }

        document.getElementById("add-button").onmousedown = (event) => {

            // fetch index to be added to
            // then add to transaction stack
            let index = this.model.currentList.size()-1;
            this.model.addAddSongTransaction(index);

        }
    }

    /*
        initModalHandlers

        Specifies  event handlers for when confirm and cancel buttons
        are pressed in the three modals.
    */
    initModalHandlers() {
        // RESPOND TO THE USER CONFIRMING TO DELETE A PLAYLIST
        let deleteListConfirmButton = document.getElementById("delete-list-confirm-button");
        deleteListConfirmButton.onclick = (event) => {
            // NOTE THAT WE SET THE ID OF THE LIST TO REMOVE
            // IN THE MODEL OBJECT AT THE TIME THE ORIGINAL
            // BUTTON PRESS EVENT HAPPENED
            let deleteListId = this.model.getDeleteListId();

            // DELETE THE LIST, THIS IS NOT UNDOABLE
            this.model.deleteList(deleteListId);

            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();

            // CLOSE THE MODAL
            let deleteListModal = document.getElementById("delete-list-modal");
            deleteListModal.classList.remove("is-visible");
        }

        // RESPOND TO THE USER CLOSING THE DELETE PLAYLIST MODAL
        let deleteListCancelButton = document.getElementById("delete-list-cancel-button");
        deleteListCancelButton.onclick = (event) => {
            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();
            
            // CLOSE THE MODAL
            let deleteListModal = document.getElementById("delete-list-modal");
            deleteListModal.classList.remove("is-visible");
        }
        
        // RESPOND TO THE USER CONFIRMING TO DELETE A SONG
        let deleteSongConfirmButton = document.getElementById("delete-song-confirm-button");
        deleteSongConfirmButton.onclick = (event) => {
            let deleteSongIndex = this.model.getDeleteSongIndex();

            // DELETE THE SONG, THIS IS UNDOABLE

            // instead of directly calling this.model.deleteSong(deleteSongIndex);
            // we should add the transaction and let the transaction handle it
            let song = this.model.currentList.getSongAt(deleteSongIndex);
            this.model.addRemoveSongTransaction(deleteSongIndex, song.title, song.artist, song.id);

            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();

            // CLOSE THE MODAL
            let deleteSongModal = document.getElementById("delete-song-modal");
            deleteSongModal.classList.remove("is-visible");
        }

        // RESPOND TO THE USER CLOSING THE DELETE SONG MODAL
        let deleteSongCancelButton = document.getElementById("delete-song-cancel-button");
        deleteSongCancelButton.onclick = (event) => {
            // ALLOW OTHER INTERACTIONS
            this.model.toggleConfirmDialogOpen();

            // CLOSE THE MODAL
            let deleteSongModal = document.getElementById("delete-song-modal");
            deleteSongModal.classList.remove("is-visible");
        }

        let editSongConfirmButton = document.getElementById("edit-song-confirm-button");
        editSongConfirmButton.onclick = (event) => {
            let index = this.model.currentList.indexToEdit;
            // let song = this.model.currentList.getSongAt(index);
            let titleInput = document.getElementById("song-title-text-input-" + index);
            let newTitle= titleInput.value;

            let artistInput = document.getElementById("song-artist-text-input-" + index);
            let newArtist = artistInput.value;

            let idInput = document.getElementById("song-id-text-input-" + index);
            let newId = idInput.value;

            // let artistInput = document.getElementById("song-artist-text-input" + index);
            // song.artist = artistInput.getAttribute("value");

            // // SET NEW ID
            // let idInput = document.getElementById("song-id-text-input" + index);
            // song.youTubeId = idInput.getAttribute("value");

            let song = this.model.currentList.getSongAt(index);
            // TODO: finish this function
            this.model.addEditSongTransaction(index, song.title, song.artist, song.youTubeId, newTitle, newArtist, newId);
            this.model.toggleConfirmDialogOpen();

            // CLOSE MODAL
            let editSongModal = document.getElementById("edit-song-modal");
            editSongModal.classList.remove("is-visible");

        }

        let editSongCancelButton = document.getElementById("edit-song-cancel-button");
        editSongCancelButton.onclick = (event) => {
            this.model.toggleConfirmDialogOpen();

            // CLOSE MODAL
            let editSongModal = document.getElementById("edit-song-modal");
            editSongModal.classList.remove("is-visible");
        }
    }

    /*
        registerListSelectHandlers

        This function specifies event handling for interactions with a
        list selection controls in the left toolbar. Note that we say these
        are for dynamic controls because the items in the playlists list is
        not known, it can be any number of items. It's as many items as there
        are playlists, and users can add new playlists and delete playlists.
        Note that the id provided must be the id of the playlist for which
        to register event handling.
    */
    registerListSelectHandlers(id) {
        // HANDLES SELECTING A PLAYLIST
        document.getElementById("playlist-" + id).onmousedown = (event) => {
            // MAKE SURE NOTHING OLD IS SELECTED
            this.model.unselectAll();

            // GET THE SELECTED LIST
            this.model.loadList(id);
        }
        // HANDLES DELETING A PLAYLIST
        document.getElementById("delete-list-" + id).onmousedown = (event) => {
            // DON'T PROPOGATE THIS INTERACTION TO LOWER-LEVEL CONTROLS
            this.ignoreParentClick(event);

            // RECORD THE ID OF THE LIST THE USER WISHES TO DELETE
            // SO THAT THE MODAL KNOWS WHICH ONE IT IS
            this.model.setDeleteListId(id);

            // VERIFY THAT THE USER REALLY WANTS TO DELETE THE PLAYLIST
            // THE CODE BELOW OPENS UP THE LIST DELETE VERIFICATION DIALOG
            this.listToDeleteIndex = this.model.getListIndex(id);
            let listName = this.model.getList(this.listToDeleteIndex).getName();
            let deleteSpan = document.getElementById("delete-list-span");
            deleteSpan.innerHTML = "";
            deleteSpan.appendChild(document.createTextNode(listName));
            let deleteListModal = document.getElementById("delete-list-modal");

            // OPEN UP THE DIALOG
            deleteListModal.classList.add("is-visible");
            this.model.toggleConfirmDialogOpen();
        }
        // FOR RENAMING THE LIST NAME
        document.getElementById("list-card-text-" + id).ondblclick = (event) => {
            let text = document.getElementById("list-card-text-" + id)
            // CLEAR THE TEXT
            text.innerHTML = "";

            // ADD A TEXT FIELD
            let textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("id", "list-card-text-input-" + id);
            textInput.setAttribute("value", this.model.currentList.getName());
            textInput.style.width = "100%"

            // CHANGE THE CONTROL TO AN EDITABLE TEXT FIELD
            text.appendChild(textInput);
            this.model.refreshToolbar();

            // SPECIFY HANDLERS FOR THE TEXT FIELD
            textInput.ondblclick = (event) => {
                this.ignoreParentClick(event);
            }
            textInput.onkeydown = (event) => {
                if (event.key === 'Enter') {
                    this.model.renameCurrentList(event.target.value, id);
                    this.model.refreshToolbar();
                }
            }
            textInput.onblur = (event) => {
                this.model.renameCurrentList(event.target.value, id);
                this.model.refreshToolbar();
            }
            textInput.focus();
            let temp = textInput.value;
            textInput.value = "";
            textInput.value = temp;
        }
    }

    /*
        registerItemHandlers

        This function specifies event handling for interactions with the
        playlist song items, i.e. cards. Note that we say these
        are for dynamic controls because the cards in the playlist are
        not known, it can be any number of songs. It's as many cards as there
        are songs in the playlist, and users can add and remove songs.
    */

    // Add Logic for deleting song in the following function. Refactor code for Deleting playlist. 
    registerItemHandlers() {
        // SETUP THE HANDLERS FOR ALL SONG CARDS, WHICH ALL GET DONE
        // AT ONCE EVERY TIME DATA CHANGES, SINCE IT GETS REBUILT EACH TIME
        for (let i = 0; i < this.model.getPlaylistSize(); i++) {
            // GET THE CARD
            let card = document.getElementById("playlist-card-" + (i + 1));
            
            // NOW SETUP ALL CARD DRAGGING HANDLERS AS THE USER MAY WISH TO CHANGE
            // THE ORDER OF SONGS IN THE PLAYLIST

            // MAKE EACH CARD DRAGGABLE
            card.setAttribute('draggable', 'true')

            // WHEN DRAGGING STARTS RECORD THE INDEX
            card.ondragstart = (event) => {
                card.classList.add("is-dragging");
                event.dataTransfer.setData("from-id", i);
            }

            // WE ONLY WANT OUR CODE, NO DEFAULT BEHAVIOR FOR DRAGGING
            card.ondragover = (event) => {
                event.preventDefault();
            }

            // STOP THE DRAGGING LOOK WHEN IT'S NOT DRAGGING
            card.ondragend = (event) => {
                card.classList.remove("is-dragging");
            }

            // WHEN AN ITEM IS RELEASED WE NEED TO MOVE THE CARD
            card.ondrop = (event) => {
                event.preventDefault();
                // GET THE INDICES OF WHERE THE CARD IS BRING DRAGGED FROM AND TO
                let fromIndex = Number.parseInt(event.dataTransfer.getData("from-id"));
                let toIndex = Number.parseInt(event.target.id.split("-")[2]) - 1;

                // ONLY ADD A TRANSACTION IF THEY ARE NOT THE SAME
                // AND BOTH INDICES ARE VALID
                if ((fromIndex !== toIndex)
                    && !isNaN(fromIndex) 
                    && !isNaN(toIndex)) {
                    this.model.addMoveSongTransaction(fromIndex, toIndex);
                }
            }

            card.ondblclick = (event) => {

                this.ignoreParentClick(event);
                let song = this.model.currentList.getSongAt(i);
                let songTitle = song.title;
                let songArtist = song.artist;
                let songId = song.youTubeId;

                // ADD TEXT INPUT FOR TITLE
                let titleTextInput = document.createElement("input");
                titleTextInput.setAttribute("type", "text");
                titleTextInput.setAttribute("id", "song-title-text-input-" + i);
                titleTextInput.setAttribute("value", songTitle);
                titleTextInput.style.width = "250px";

                // UPDATE THE TITLE WHEN TEXT FIELD IS BLURRED
                titleTextInput.onblur = (event) => {
                    titleTextInput.value = event.target.value;
                }
                
                // APPEND TEXT INPUT TO SPAN
                let editTitleSpan = document.getElementById("edit-title-span");
                editTitleSpan.innerHTML = "";
                editTitleSpan.appendChild(titleTextInput);

                // ADD TEXT INPUT FOR ARTIST
                let artistTextInput = document.createElement("input");
                artistTextInput.setAttribute("type", "text");
                artistTextInput.setAttribute("id", "song-artist-text-input-" + i);
                artistTextInput.setAttribute("value", songArtist);
                artistTextInput.style.width = "250px"
                
                // UPDATE THE ARTIST WHEN TEXT FIELD IS BLURRED
                artistTextInput.onblur = (event) => {
                    artistTextInput.value = event.target.value;
                }

                // APPEND TEXT INPUT TO SPAN
                let editArtistSpan = document.getElementById("edit-artist-span");
                editArtistSpan.innerHTML = "";
                editArtistSpan.appendChild(artistTextInput);


                // ADD TEXT INPUT FOR YOUTUBE ID
                let idTextInput = document.createElement("input");
                idTextInput.setAttribute("type", "text");
                idTextInput.setAttribute("id", "song-id-text-input-" + i);
                idTextInput.setAttribute("value", songId);
                idTextInput.style.width = "250px"
                
                // UPDATE THE ID WHEN TEXT FIELD IS BLURRED
                idTextInput.onblur = (event) => {
                    idTextInput.value = event.target.value;
                }

                // APPEND TEXT INPUT TO SPAN
                let editIdSpan = document.getElementById("edit-id-span");
                editIdSpan.innerHTML = "";
                editIdSpan.appendChild(idTextInput);

                // STORE INDEX OF SONG SO MODAL KNOWS WHICH ONE TO UPDATE
                this.model.currentList.setIndexToEdit(i);
                let editListModal = document.getElementById("edit-song-modal");
                editListModal.classList.add("is-visible");
                this.model.toggleConfirmDialogOpen();

            }

            document.getElementById("delete-song-" + i).onmousedown = (event) => {
                // prevent this event from propagating to lower-level controls
                this.ignoreParentClick(event);

                this.model.setDeleteSongIndex(i);

                //this.listToDeleteIndex = this.model.getListIndex(id);
                // get name of song
                let song = this.model.currentList.getSongAt(i);
                let songName = song.title;
                let deleteSpan = document.getElementById("delete-song-span");
                deleteSpan.innerHTML = "";
                deleteSpan.appendChild(document.createTextNode(songName));
                // deleteSpan.appendChild(document.createTextNode("TEST"));
                let deleteSongModal = document.getElementById("delete-song-modal");

                // OPEN UP THE DIALOG
                deleteSongModal.classList.add("is-visible");
                this.model.toggleConfirmDialogOpen();

            }

            
        }
    }

    /*
        ignoreParentClick

        This function makes sure the event doesn't get propogated
        to other controls.
    */
    ignoreParentClick(event) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
    }
}