console.log("Scrypt running...");
const draggable = document.getElementById('draggable');
const itemList = document.getElementById('item_list');

function onDragStart(e) {
    console.log("Drag Start");
    e.dataTransfer.setData("text", e.target.id);
    
    itemList.classList.add("droppable");
    e.target.style.opacity = "0.2";
    e.target.style["border-style"] =  "dotted";
}

function onDragEnd(e) {
    console.log("Drag End");
    itemList.classList.remove("droppable");
    e.target.style.opacity = "1";
    e.target.style["border-style"] =  "solid";
}

function onDragOver(e) {
    //console.log(e);
    e.preventDefault();
}

function onDrop(e) {
    const ul = e.target.closest("ul");
    const data = e.dataTransfer.getData("text");
    const item = document.getElementById(data);
    item.style.opacity = "1";
    item.style["border-style"] =  "solid";
    ul.appendChild(item.cloneNode(true));
}

draggable.addEventListener('dragstart', onDragStart, false);
draggable.addEventListener('dragend', onDragEnd, false);
itemList.addEventListener('drop', onDrop, false)
itemList.addEventListener('dragover', onDragOver, false);