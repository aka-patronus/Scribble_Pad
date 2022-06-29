let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mousedown = false;

let pencilColor= document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
// api 



let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let downloaded = document.querySelector(".download");


let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let undoredoArray=[];   // data




let track =0;       // which action from tracker array
addclearScreen();

let tool = canvas.getContext("2d");
tool.strokeStyle=penColor;     // color of graphic
tool.lineWidth = penWidth;   // width of graphic


canvas.addEventListener("mousedown" ,(e)=>{
    mousedown = true;
    tool.beginPath();
    tool.moveTo(e.clientX , e.clientY);
})

canvas.addEventListener("mousemove" , (e)=>{
    if(mousedown == true){
        tool.lineTo(e.clientX, e.clientY);
        tool.stroke();
    }
})
canvas.addEventListener("mouseup",(e)=>{
    mousedown = false;

    let url = canvas.toDataURL();
    undoredoArray.push(url);
    track =undoredoArray.length-1;


})

pencilColor.forEach((colorElem) =>{
    colorElem.addEventListener("click" , (e)=>{
        let color = colorElem.classList[0];
        console.log(" color changed");
        penColor=color;
        tool.strokeStyle = penColor;
    })
})



pencilWidthElem.addEventListener("change" , (e)=>{
    console.log("changed");
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
})
eraserWidthElem.addEventListener("change" , (e)=>{
    console.log("changed");
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click" , (e)=>{

    if(eraserFlag){
        tool.strokeStyle=eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else{
        tool.strokeStyle = penColor;
        tool.lineWidth= penWidth;
        // tol

    }


})

downloaded.addEventListener("click" , (e)=>{
    
    let url = canvas.toDataURL();
    
    let a = document.createElement("a");
    a.href= url;
    a.download = "board.jpg";
    a.click();
})

undo.addEventListener("click" , (e)=>{
    console.log("clicked undo ");
    if(track>0)track--;

    let trackObj = {trackValue:track , undoredoArray}
    undoRedoCanvas(trackObj);

})
redo.addEventListener("click" , (e)=>{
    console.log("clicked redo ");
    if(track<undoredoArray.length-1)track++;
    
    let trackObj = {trackValue:track , undoredoArray}
    undoRedoCanvas(trackObj);

})

function undoRedoCanvas(trackObj){

    track = trackObj.trackValue;
    undoredoArray = trackObj.undoredoArray

    let img = new Image();      // new refrence image elemente  
    let url = undoredoArray[track];
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
    img.src=url;
    img.onload = (e) =>{
        tool.drawImage(img,0,0,canvas.width , canvas.height);
    }

}

function addclearScreen(){

    let url = canvas.toDataURL();
    undoredoArray.push(url);
    track =undoredoArray.length-1;
}