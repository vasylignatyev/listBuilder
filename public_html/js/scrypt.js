"use strict";

let placeHoleder = null;

const itemList = document.getElementById('item_list');

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
    
const createPlaceholder= function () {
    const placeholder = document.createElement("li");
    placeholder.className = "placeholder droppable drop_zone";
    placeholder.addEventListener("drop", onDrop);
    placeholder.addEventListener("dragover", onDragOver);
    return placeholder;
}
    
function onDragStart(e) {
    console.log("onDragStart");
    e.target.style.opacity = 0.2;
    e.target.style.backgroundColor = "#FFFFFF";

    e.dataTransfer.setData("text/html", e.target.innerHTML);
    const itemList = document.getElementById("item_list");
    itemList.style.border = "2px dashed gray";
    if(itemList.childElementCount > 0) {
        itemList.childNodes.forEach((item) => {
            if(item && item.classList) {
                item.classList.add("event_blind");
            }
        });
//        return false;
    }
    placeHoleder = createPlaceholder();
    itemList.append(placeHoleder);
}

 function onDrop(e) {
    e.preventDefault();
    
    const dragged = e.dataTransfer.getData("text/html");
    console.log(dragged);
    const li = document.createElement('li');
    li.innerHTML = dragged.trim();
    li.classList.add("item");
    li.firstChild.setAttribute("contenteditable", true);
    e.target.replaceWith(li);
    if(placeHoleder) {
        placeHoleder.remove();
        
    }
    placeHoleder = null;
    li.addEventListener("dragenter", onDragEnter);
}
    
function onDragEnd(e) {
    console.log("onDragEnd");
    e.target.style.opacity = 1;
    e.target.style["background-color"] = null;
    if(placeHoleder) {
        placeHoleder.remove();
        placeHoleder = null;
    }
    const itemList = document.getElementById("item_list");
    itemList.style.border = null;
    itemList.childNodes.forEach((item) => {
        if(item && item.style && item.style.classList) {
            item.style.classList.remove("event_blind");
        }
    });
}

const onDragOver = function(e) {
    //Allow Drtop Event
    e.preventDefault(); // Necessary. Allows us to drop.
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return true;
};
    
const onDragEnter = function(e) {
    if(placeHoleder) {
        placeHoleder.remove();
        placeHoleder = null;
    }
    e.preventDefault();
    console.log("onDragEnter");
    const li = e.target.closest("li");
    
    placeHoleder = createPlaceholder();
    insertAfter(placeHoleder, li);
    

    return false;
}

const onDragLeave = function(e) {
    e.preventDefault();
    console.log("onDragLeave");
    e.target.style["padding-bottom"] = null;
}