import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eprgyheskouunjqscric.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwcmd5aGVza291dW5qcXNjcmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNTkzNDMsImV4cCI6MjAzMDczNTM0M30.rZeO08UGo4x1vOT2BPx1Trn_VjR--MZtMAtt1NqoPiA'
const supabase = createClient(supabaseUrl, supabaseKey)

// console.log(supabase)

function addResetButton() {
    var button = document.createElement('button');
    button.style.position = "absolute";
    button.setAttribute("id", "resetButton");
    button.style.left = "10px";
    button.style.top = "10px";
    button.textContent = "Reset";
    button.style.padding = "10px 20px"; // size
    button.style.color = "white";
    
    document.body.appendChild(button);

    button.addEventListener('click', function() {
        localStorage.clear();
        console.log("Local Storage cleared.");
    });
}

window.openPostIt = function(x, y, content) {
    var notee;
    var uniq = 'postIT_' + x + "_" + y;

    var square = document.createElement('div');
    square.style.width = '85px';
    square.style.height = '90px';
    square.setAttribute("id", "postIT");
    // square.style.backgroundColor = getRandomColor();
    square.style.border = '1px grey solid';
    square.style.position = 'absolute';
    square.style.left = 4 + x + 'px';
    square.style.top = y + 'px';

    var textBox = document.createElement("textarea");
    textBox.setAttribute("rows", "5");
    textBox.setAttribute("cols", "7");
    textBox.setAttribute("id", uniq);
    textBox.classList.add("post-it");
    textBox.value = content || "Write your idea here";
    textBox.style.left = 4 + x + "px";
    textBox.style.top = 4 + y + "px";
    textBox.style.position = "absolute";
    textBox.style.left = x + "px";
    textBox.style.top = y + "px";

    var button = document.createElement("button");
    button.style.position = "absolute";
    button.setAttribute("id", "post");
    button.style.left = 25 + x + "px";
    button.style.top = 80 + y + "px";
    button.textContent = "post";
    button.style.marginTop = "10px";

    var pin = document.createElement("div");
    pin.style.position = "absolute";
    pin.setAttribute("id", "pin");

    pin.style.left = 45 + x + "px";
    pin.style.top = y + "px";
    pin.style.width = "5px";
    pin.style.height = "5px";
    pin.style.backgroundColor = "white";
    pin.style.border = "1px solid grey";

    var container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "6px";
    container.style.top =  "4px";
    container.appendChild(textBox);
    // container.appendChild(button);

    // document.body.appendChild(square);
    document.body.appendChild(container);
    document.body.appendChild(pin);
    document.body.appendChild(button);
    // document.body.appendChild(textline);

    textBox.addEventListener("change", function() {
        var inputValue = textBox.value.toLowerCase();
        notee = textBox.value;
        if (inputValue === "clear all notes") {
            localStorage.clear();
            console.log("Local Storage cleared.");
            textBox.value = ""; // Clear the textbox after clearing localStorage
        } else {
            localStorage.setItem(uniq, textBox.value);
        }
    });

    button.addEventListener("click", function() {
        // currentNote = localStorage.getItem(uniq);
        // console.log("Submitted text:", text);
        // localStorage.setItem('textinput', text);
        var textline = document.createElement("div");
        textline.style.position = "absolute";
        textline.style.left = 8 + x + "px";
        textline.style.top = 5 + y + "px";
        textline.style.width = "75px";
        textline.style.height = "80px";
        textline.style.overflow = "auto";
        textline.style.whiteSpace = "nowrap";
        // textline.textContent = localStorage.getItem(uniq);
        saveNote();

        document.body.removeChild(container);
        document.body.removeChild(button);
        document.body.appendChild(square);
        document.body.appendChild(textline);
        document.body.appendChild(pin);
    });

    const saveNote = async () => {
        const { data, error } = await supabase
        .from('postits')
        .insert({
            x: x,
            y: y,
            content: notee
        })
    }
}

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

function savedPostIt(x, y, content) {
    var uniq = 'postIT_' + x + "_" + y;

    var square = document.createElement('div');
    square.style.width = '85px';
    square.style.height = '90px';
    square.setAttribute("id", "postIT");
    // square.style.backgroundColor = getRandomColor();
    square.style.border = '1px grey solid';
    square.style.position = 'absolute';
    square.style.left = 4 + x + 'px';
    square.style.top = y + 'px';

    var pin = document.createElement("div");
    pin.style.position = "absolute";
    pin.setAttribute("id", "pin");

    pin.style.left = 45 + x + "px";
    pin.style.top = y + "px";
    pin.style.width = "5px";
    pin.style.height = "5px";
    pin.style.backgroundColor = "white";
    pin.style.border = "1px solid grey";

    var textline = document.createElement("div");
    textline.style.position = "absolute";
    textline.style.left = 8 + x + "px";
    textline.style.top = 5 + y + "px";
    textline.style.width = "75px";
    textline.style.height = "80px";
    textline.style.overflowX = "auto";
    textline.style.overflowY = "auto";
    // textline.style.whiteSpace = "nowrap";
    // textline.textContent = localStorage.getItem(uniq);
    textline.textContent = content;

    document.body.appendChild(square);
    document.body.appendChild(textline);
    document.body.appendChild(pin);
}

function displaySavedNotes() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        // if (key.startsWith("postIT_")) {
        //     var noteContent = localStorage.getItem(key);
        //     var notePosition = key.split("_"); 
        //     savedPostIt(parseInt(notePosition[1]), parseInt(notePosition[2]), noteContent);
        // }
    }

    const fetchPost = async () => {
        try {
            let { data: postits, error } = await supabase
            .from('postits')
            .select('*')

            if (postits) {
                console.log(postits)
                for (i=0; postits.length; i++) {
                    savedPostIt(postits[i].x, postits[i].y, postits[i].content);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    fetchPost();
}

displaySavedNotes();
