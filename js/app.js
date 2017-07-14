(function () {
    'use sticker';

    let draggedEl;

    let onDragStart;
    let onDrag;
    let onDragEnd;

    let coordinateX;
    let coordinateY;


    onDragStart = function (event) {
        let boundingClientRect;
        if ( event.target.className.indexOf('sticker_bar' ) === -1){
            return;
        }
        draggedEl = this;
        boundingClientRect = draggedEl.getBoundingClientRect();
        // console.log("boundingClientRect",boundingClientRect);

        coordinateX = boundingClientRect.top - event.clientX;
        // console.log("coordinateX", coordinateX);
        coordinateY = boundingClientRect.left - event.clientY;
        // console.log("coordinateY", coordinateY);
    };

    onDrag = (event) => {
        if ( !draggedEl ) {
            return;
        }
        console.log(draggedEl);
        let posX = event.clientX + coordinateX;
        let posY = event.clientY + coordinateY;

        draggedEl.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    };

    document.addEventListener('mousemove', onDrag, false);
    document.querySelector(".sticker").addEventListener('mousedown', onDragStart, false);
})();
