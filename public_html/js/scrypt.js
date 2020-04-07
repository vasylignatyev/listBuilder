"use strict";

const app = {
    placeHoleder: null,
    
    itemList: document.getElementById("item_list"),
    
    insertAfter: function (newNode, existingNode) {
        existingNode.parentNode && existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    },
    
    createPlaceholder: function () {
        const placeholder = document.createElement("li");
        placeholder.className = "placeholder droppable drop_zone";
        placeholder.addEventListener("drop", (e) => this.onDrop(e));
        placeholder.addEventListener("dragover", (e) => this.onDragOver(e));
        return placeholder;
    },
                                                                                                                                            
    onDragStart: function (e) {
        e.target.style.opacity = 0.2;
        e.target.style.backgroundColor = "#FFFFFF";

        e.dataTransfer.setData("text/html", e.target.innerHTML);

        this.placeHoleder = this.createPlaceholder();
        this.itemList.style.border = "2px dashed gray";
        if(this.itemList.childElementCount > 0) {
            this.itemList.childNodes.forEach( item => {
                if(item && item.classList) {
                    item.firstChild.setAttribute("contenteditable", false);
                }
            });
            this.itemList.insertBefore(this.placeHoleder, this.itemList.firstChild);
        } else {
            this.itemList.append(this.placeHoleder);
        }
        return false;
    },
    
    onDrop: function (e) {
        e.preventDefault();
        e.stopPropagation();
        const dragged = e.dataTransfer.getData("text/html");
        
        const li = document.createElement("li");
        li.innerHTML = dragged.trim();
        li.classList.add("item");
        li.firstChild.setAttribute("contenteditable", true);
        li.addEventListener("drop", (e) => this.onDrop(e));
        li.addEventListener("dragover", (e) => this.onDragOver(e));
        li.addEventListener("dragenter", (e) => this.onDragEnter(e));
        this.placeHoleder.replaceWith(li);

        if(this.placeHoleder) {
            this.placeHoleder.remove();
            this.placeHoleder = null;
        }
        return false;
    },
    
    onDragEnd: function (e) {
        e.target.style.opacity = 1;
        e.target.style["background-color"] = null;
        if(this.placeHoleder) {
            this.placeHoleder.remove();
            this.placeHoleder = null;
        }
        this.itemList.style.border = null;
        this.itemList.childNodes.forEach( function(item) {
            if(item && item.firstChild){
                item.firstChild.setAttribute("contenteditable", true);
            }
        });
        return false;
    },
    
    onDragOver: function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const YY= 2 * e.target.getBoundingClientRect().top;
        const y = e.clientY - YY;  //y position within the element.
        
        if(e.target === this.placeHoleder) {
            return false;
        }
        if (this.placeHoleder && y > 0) {
            //e.target.insertAfter(this.placeHoleder. this.target);
        } else {
            //e.target.parentNode && e.target.parentNode.insertBefore(this.placeHoleder, e.target);
        }

        return false;
    },
    
    onDragEnter: function(e) {
        e.preventDefault();

        if(this.placeHoleder) {
            this.placeHoleder.remove();
            this.placeHoleder = null;
        }
        const li = e.target.closest("li");
        this.placeHoleder = this.createPlaceholder();
        this.insertAfter(this.placeHoleder, li);
        return false;
    },

    onDragLeave: function(e) {
        e.preventDefault();
        e.target.style["padding-bottom"] = null;
        return false;
    }
};