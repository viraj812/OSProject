var pageFrames = []; // an array representing the page frames
var pageReferences = []; 

var num_of_frames = 3;    // Number of Frames
var length = 0;   

var result = [];

var numPageFaults = null; 
var hits = 0;

function fifoPageReplacement(no_of_frames, pageFrames, pageReferences, length) {
  let pageFaults = 0; // initialize the number of page faults to 
  let row1 = document.createElement("tr");

  for (let index = 1; index <= no_of_frames; index++) {
    addText(row1, "th", `Frame ${index}`);
  }
  addText(row1, "th", "Result");

  for (let i = 0; i < length; i++) {
    let pageFault = true; // assume there is a page fault for each reference
    // Check if the current page reference is already in the page frames

    for (let j = 0; j < pageFrames.length; j++) {
      if (pageReferences[i] === pageFrames[j]) {
        pageFault = false; // there is no page fault
        result.push("Hit");
        hits++;
        break;
      }else{
        result.push("Fault");
      }
    }
    
    // If there is a page fault, replace the oldest page in the page frames
    if (pageFault) {
      if (pageFrames.length < no_of_frames) {
        pageFrames.push(pageReferences[i]); // add the new page to the page frames
      } else {
        pageFrames.shift(); // remove the oldest page from the page frames
        pageFrames.push(pageReferences[i]); // add the new page to the page frames
      }
      pageFaults++; // increment the number of page faults
      flag = true;
    }

 
    var rows = document.createElement("tr");

    for (let l = 0; l < no_of_frames; l++) {
      if (pageFrames[l] != null) {
        addText(rows, "td", pageFrames[l]);
      }else{
        addText(rows, "td", "--");
      }
    }
    
    // var cell = rows.insertCell(-1);
    // cell.innerHTML = result[i];
  }
    
  for (let y = 1; y <= length; y++) {
    let r = document.getElementById("data").rows[y];
    let c = r.insertCell(-1);
    c.innerHTML = result[y-1];
  }

  return pageFaults; // return the number of page faults
}

function addText(row, element, text){
  var dataTable = document.getElementById("data");
  var content = document.createTextNode(text);

  var th = document.createElement(element);
  th.appendChild(content);
  row.appendChild(th);
  dataTable.appendChild(row);
}

function getData(){

  document.getElementById("data").innerHTML = "";
  document.getElementById("values").innerHTML = "";

  num_of_frames = parseInt(document.getElementById("Num_of_frames").value);
  pageReferences = (document.getElementById("reference_string").value).split(",");
  pageReferences = pageReferences.map(function (x) { return parseInt(x, 10); });
  length = parseInt(document.getElementById("string_length").value);

  numPageFaults = fifoPageReplacement(num_of_frames, pageFrames, pageReferences, pageReferences.length);

  let stats = document.getElementById("values");
  stats.appendChild(document.createElement("br"));
  stats.appendChild(document.createTextNode(`Page Faults: ${numPageFaults}`));
  stats.appendChild(document.createElement("br"));
  stats.appendChild(document.createTextNode(`Hit Ratio: ${hits/length}`));

}

// Call the FIFO page replacement function
console.log(`Number of page faults: ${numPageFaults}`);
console.log(`Page frames: ${pageFrames}`);
