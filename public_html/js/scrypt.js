"use strict";

let placeHoleder = null;

const itemList = document.getElementById("item_list");

const insertAfter = function (newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
};

const createPlaceholder= function () {
    const placeholder = document.createElement("li");
    placeholder.className = "placeholder droppable drop_zone";
    placeholder.addEventListener("drop", onDrop);
    placeholder.addEventListener("dragover", onDragOver);
    return placeholder;
};

const onDragStart = function (e) {
    e.target.style.opacity = 0.2;
    e.target.style.backgroundColor = "#FFFFFF";

    e.dataTransfer.setData("text/html", e.target.innerHTML);
    itemList.style.border = "2px dashed gray";
    if(itemList.childElementCount > 0) {
        itemList.childNodes.forEach( item => {
            if(item && item.classList) {
                item.classList.add("event_blind");
            }
        });
    }
    placeHoleder = createPlaceholder();
    itemList.append(placeHoleder);
    return false;
};

const onDrop = function (e) {
    e.preventDefault();
    const dragged = e.dataTransfer.getData("text/html");
    const li = document.createElement("li");
    li.innerHTML = dragged.trim();
    li.classList.add("item");
    li.firstChild.setAttribute("contenteditable", true);
    e.target.replaceWith(li);
    if(placeHoleder) {
        placeHoleder.remove();
    }
    placeHoleder = null;
    li.addEventListener("dragenter", onDragEnter);
    return false;
};

const onDragEnd = function (e) {
    e.target.style.opacity = 1;
    e.target.style["background-color"] = null;
    if(placeHoleder) {
        placeHoleder.remove();
        placeHoleder = null;
    }
    itemList.style.border = null;
    itemList.childNodes.forEach( item => {
        if(item && item.style && item.style.classList) {
            item.style.classList.remove("event_blind");
        }
    });
    return false;
};

const onDragOver = function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
};

const onDragEnter = function(e) {
    if(placeHoleder) {
        placeHoleder.remove();
        placeHoleder = null;
    }
    e.preventDefault();
    const li = e.target.closest("li");
    placeHoleder = createPlaceholder();
    insertAfter(placeHoleder, li);
    return false;
};

const onDragLeave = function(e) {
    e.preventDefault();
    e.target.style["padding-bottom"] = null;
    return false;
};