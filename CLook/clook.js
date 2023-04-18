function addText(text){
    var box = document.getElementById("SimulationBox");
    var para = document.createElement("p");
    var content = document.createTextNode(text);
    box.appendChild(para);
    para.appendChild(content);

    box.scrollTop = box.scrollHeight;
}

async function clook(currentPosition, requests) {
	// Sort the requests in ascending order
	requests = requests.filter(e => { return e !== null});
	requests.sort((a, b) => a - b);
  
	// Find the index of the request that is closest to the current position
	let closestIndex = 0;
	for (let i = 0; i <= requests.length; i++) {
	  if (requests[i] > currentPosition) {
		closestIndex = i;
		break;
	  }
	}
  
	// Create two arrays: one for the requests that are in the direction of movement
	// and one for the requests that are in the opposite direction
	const direction = requests.slice(closestIndex);
	const opposite = requests.slice(0, closestIndex).reverse();
  
	// Combine the two arrays and add the current position to the beginning
	const orderedRequests = [currentPosition, ...direction, ...opposite];
  
	// Process the requests in the order they appear in the orderedRequests array
	for (let i = 0; i < orderedRequests.length; i++) {
	  const request = orderedRequests[i];
	  processedRequests[i] = orderedRequests[i];
	  console.log(`Processing request ${request}`);
	  addText(`Processing request ${request}`);
	//   await sleep(1000); // Simulate the time it takes to process a request
	}
  }
  
  function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  var max = 10;
  var requests = Array(max).fill(null);
  var processedRequests = Array(max).fill(null);
  var requestNumber = Array(max).fill(null);
  var head = null;
  var index = 0;

function showRequests(){
	let text = document.getElementById("Requests");
	text.innerHTML = "";

	let values = requests.filter(e => { return e !== null;});

	let p = document.createTextNode("Requests: " + values);
	
	
	text.appendChild(p);

	if(head != null){
		let x = document.createTextNode(" Head: " + head);
		text.appendChild(x);
	}
}

function addRequest(){
	var requestValue = document.getElementById("requestValue").value;
    requestValue = parseInt(requestValue);
	requests[index] = requestValue;
	index++;
	showRequests();
}

function setHead(){
	var headValue = document.getElementById("headValue").value;
	head = parseInt(headValue);
	showRequests();
}


function callClook(){
	clook(head, requests);
	processedRequests = processedRequests.filter(f => { return f !== null});
	requests = requests.filter( e => { return e !== null});
	let count = 0;

	for(let n = 0; n <= index; n++){
		for (let i = 0; i <= index+1; i++) {
			
			if((requests[n] != processedRequests[i])){

				processedRequests = processedRequests.filter(e => {return e !== head});
			}
		}
	}
	
	for (let l = 0; l <= index; l++) {
		
		for (let j = 0; j <= index; j++) {
			if (requests[l] == processedRequests[j]) {
					count = j+1;
					console.log(count);
				}		
		}

		requestNumber[l] = count;
	}

	requestNumber = requestNumber.filter( e => {return e !== null});


	console.log(requestNumber);

	document.getElementById("showGraph").style.display = "inline";
}

