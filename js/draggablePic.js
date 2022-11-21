const container = document.querySelector(".cards-container");
const cards = document.querySelector(".cards");


/* Keeps track of users mouse down and up */

let isPressedDown = false;

/* Horizontal space of cursour from inner container*/
let cursorXSpace;

container.addEventListener("mousedown", (e) =>{

/* offsetX read-only property of MouseEvent provides the offset in the X coordinate of the mouse pointer between that event and the padding edge of the target node */
 /* offsetLeft returns the number of pixels that the upper left corner of the current elemnt is offset to th left within the HTMLELEMENT.offsetParent node. */
 isPressedDown = true;  
  cursorXSpace = e.offsetX - cards.offsetLeft;
  console.log(e.offsetX);
} )

window.addEventListener("mouseup", () =>{
    isPressedDown = false;
})
container.addEventListener("mousemove", (e) =>{
 if(isPressedDown) return;
 e.preventDefault();
 cards.style.left = '${e.offsetX - cursorXSpace}px';
 
    } )