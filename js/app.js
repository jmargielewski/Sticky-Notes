(function () {
    'use sticker';

    let draggedEl;

    let onDragStart;
    let onDrag;
    let onDragEnd;

    let coordinateX;
    let coordinateY;

    let createElement;
    let addNewStickerBtn;

    let init;
    let testLocalStorage;

    let saveNote;
    let deleteNote;
    let loadNotes;


    onDragStart = function ( event ) {
        let boundingClientRect;
        if ( event.target.className.indexOf('sticker_bar' ) === -1){
            return;
        }
        draggedEl = this;

        boundingClientRect = draggedEl.getBoundingClientRect();
        // console.log("boundingClientRect",boundingClientRect);

        coordinateX = boundingClientRect.left - event.clientX;
        // console.log("coordinateX", coordinateX);
        coordinateY = boundingClientRect.top - event.clientY;
        // console.log("coordinateY", coordinateY);
    };

    onDrag = function ( event ) {
        if ( !draggedEl ) {
            return;
        }

        let posX = event.clientX + coordinateX;
        let posY = event.clientY + coordinateY;

        posX < 0 ? posX = 0 : posX;
        posY < 0 ? posY = 0 : posY;

        draggedEl.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    };

    onDragEnd = function ( event ) {
        draggedEl = null;
        coordinateX = null;
        coordinateY = null;
    };

    createElement = function () {

        let sticker = document.createElement('div');
        let bar = document.createElement('div');
        let textarea = document.createElement('textarea');
        let saveBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        let onSave;
        let onDelete;

        onDelete = function () {
            let obj = {};
            deleteNote(obj);
        };

        onSave = function () {
            let obj = {};
            saveNote(obj);
        };

        saveBtn.addEventListener('click', onSave);
        deleteBtn.addEventListener('click', onDelete);

        saveBtn.classList.add('saveButton');
        deleteBtn.classList.add('deleteButton');

        let positionNewSticker = `translateX(${Math.random() * 300}px) translateY(${Math.random() * 300}px)`;

        sticker.style.transform = positionNewSticker;

        sticker.classList.add('sticker');
        bar.classList.add('sticker_bar');
        textarea.classList.add('sticker_textarea');

        bar.appendChild(saveBtn);
        bar.appendChild(deleteBtn);

        sticker.appendChild(bar);
        sticker.appendChild(textarea);

        sticker.addEventListener('mousedown', onDragStart, false);

        document.body.appendChild(sticker);
    };

    testLocalStorage = function () {
        let foo = 'foo';
        try {
            localStorage.setItem(foo, foo);
            localStorage.removeItem(foo);
            return true;
        } catch (e) {
            return false;
        }
    };

    init = function () {

        if ( !testLocalStorage() ) {
            var message = "Cannot use localStorage";
        } else {
            saveNote = function (note) {
                // notatka
            };

            deleteNote = function (note) {
                // usuniemy notatkę
            };

            loadNotes = function () {
                // ładowanie notatek
            };

            loadNotes();
        }
        addNewStickerBtn = document.querySelector('.sticker_add');
        addNewStickerBtn.addEventListener('click', createElement, false);
        document.addEventListener('mousemove', onDrag, false);
        document.addEventListener('mouseup', onDragEnd, false);
    };

    init();



})();
