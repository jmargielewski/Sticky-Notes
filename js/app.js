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
        console.log(draggedEl);
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

    createElement = function (){

        let sticker = document.createElement('div');
        let bar = document.createElement('div');
        let textarea = document.createElement('textarea');

        let positionNewSticker = `translateX(${Math.random() * 300}px) translateY(${Math.random() * 300}px)`;

        sticker.style.transform = positionNewSticker;

        sticker.classList.add('sticker');
        bar.classList.add('sticker_bar');
        textarea.classList.add('sticker_textarea');

        sticker.appendChild(bar);
        sticker.appendChild(textarea);

        sticker.addEventListener('mousedown', onDragStart, false);

        document.body.appendChild(sticker);
    };

    createElement();

    addNewStickerBtn = document.querySelector('.sticker_add');
    addNewStickerBtn.addEventListener('click', createElement, false);
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);

})();
