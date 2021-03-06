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

    let getNoteObject;
    let onAddNoteBtnClick;

    onDragStart = function ( event ) {
        let boundingClientRect;
        if ( event.target.className.indexOf( 'sticker_bar' ) === -1 ){
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

    getNoteObject = function (el) {
        let textarea = el.querySelector('textarea');
        return {
            content : textarea.value,
            id : el.id,
            transformCSSValue : el.style.transform,
            textarea : {
                width : textarea.style.width,
                height : textarea.style.height,
            },
        };
    };

    createElement = function (options) {

        let sticker = document.createElement('div');
        let bar = document.createElement('div');
        let textarea = document.createElement('textarea');
        let saveBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        let onSave;
        let onDelete;
        let BOUNDARIES = 300;
        let noteConfig = options || {
            content : '',
            id : 'sticker_' + new Date().getTime(),
            transformCSSValue : `translateX(${Math.random() * 300}px) translateY(${Math.random() * 300}px)`,
        };

        onDelete = function () {
            deleteNote(
                getNoteObject(sticker)
            );
            document.body.removeChild(sticker);
        };

        onSave = function () {
            saveNote(
                getNoteObject(sticker)
            );
        };

        if ( noteConfig.textarea ){
            textarea.style.width = noteConfig.textarea.width;
            textarea.style.height = noteConfig.textarea.height;
            textarea.style.resize = 'none';
        }

        sticker.id = noteConfig.id;
        textarea.value = noteConfig.content;

        saveBtn.addEventListener('click', onSave);
        deleteBtn.addEventListener('click', onDelete);

        saveBtn.classList.add('saveButton');
        deleteBtn.classList.add('deleteButton');

        sticker.style.transform = noteConfig.transformCSSValue;

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

    onAddNoteBtnClick = function () {
        createElement()
    };

    init = function () {

        if ( !testLocalStorage() ) {
            let message = 'Cannot use localStorage';
            saveNote = function () {
                console.warn(message);
            };
            deleteNote = function () {
                console.warn(message);
            };
        } else {
            saveNote = function (note) {
                localStorage.setItem(note.id, JSON.stringify(note));
            };

            deleteNote = function (note) {
                localStorage.removeItem(note.id);
            };

            loadNotes = function () {
                for (let i = 0; i < localStorage.length; i++) {
                    let noteObject = JSON.parse(
                        localStorage.getItem(
                            localStorage.key(i)
                        )
                    );
                    createElement(noteObject);
                }
            };

            loadNotes();
        }
        addNewStickerBtn = document.querySelector('.sticker_add');
        addNewStickerBtn.addEventListener('click', onAddNoteBtnClick, false);
        document.addEventListener('mousemove', onDrag, false);
        document.addEventListener('mouseup', onDragEnd, false);
    };

    init();

})();
