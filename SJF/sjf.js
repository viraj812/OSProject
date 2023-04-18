var n = null;
var jobs = null;
var burstTime = null; //Array(n).fill(0);
var arrivalTime = null; Array(n).fill(0);
var show = null;
var completionTime = null; //Array(n).fill(0);
var waitingTime = null; //Array(n).fill(0);
var turnaroundTime = null; //Array(n).fill(0);
var Response_Time = null; //Array(n).fill(0);
var num = 0;



function showProcessNumber(){
  let no_of_processes = document.getElementById("no_of_processes").value;
  no_of_processes = parseInt(no_of_processes);
  n = no_of_processes;
  var p = document.getElementById("processNumber");

  if(num+2 <= no_of_processes){
    p.innerHTML = "Process " + (num+2) + ": " ;
  }
}

function SJF(jobs, burstTime) {
  
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        if (burstTime[j] > burstTime[j + 1]) {

          var temp = burstTime[j];
          burstTime[j] = burstTime[j + 1];
          burstTime[j + 1] = temp;

          temp = jobs[j];
          jobs[j] = jobs[j + 1];
          jobs[j + 1] = temp;

          temp = arrivalTime[j];
          arrivalTime[j] = arrivalTime[j + 1];
          arrivalTime[j + 1] = temp;

        }
      }
    }
    
  
    for (var i = 0; i < n; i++) {
      if (i === 0) {
        completionTime[i] = burstTime[i];
      } else {
        completionTime[i] = completionTime[i - 1] + burstTime[i];
      }
    }
  
    for (var i = 0; i < n; i++) {
      turnaroundTime[i] = completionTime[i] - arrivalTime[i];
      Response_Time[i] = completionTime[i] - waitingTime[i];
    }
    
    for (var i = 0; i < n; i++) {
      waitingTime[i] = completionTime[i] - burstTime[i];
    }
}

function showTable(){
  SJF(jobs, burstTime);

  var h21 = document.getElementById("h21");
  var h22 = document.getElementById("h22");

  var table = document.getElementById("Result");
  var ganttChart = document.getElementById("gantt");
  var button = document.getElementById("show");
  ganttChart.style.columnSpan = 0;

if(show == null){
  
  for (var index = 0; index < jobs.length; index++) {
    
    var row = document.createElement("tr");
    table.appendChild(row);
    
    var column1 = document.createElement("td");
    var TextNode = document.createTextNode(jobs[index]);
    var column2 = document.createElement("td");
    var TextNode2 = document.createTextNode(arrivalTime[index]);

    var column3 = document.createElement("td");
    var TextNode3 = document.createTextNode(burstTime[index]);

    var column4 = document.createElement("td");
    var TextNode4 = document.createTextNode(completionTime[index]);
    
    var column5 = document.createElement("td");
    var TextNode5 = document.createTextNode(turnaroundTime[index]);

   var column6 = document.createElement("td");
   var TextNode6 = document.createTextNode(waitingTime[index]);   
   
   var column7= document.createElement("td");
   var TextNode7 = document.createTextNode(Response_Time[index]);

  
  row.appendChild(column1);
  row.appendChild(column2);
  row.appendChild(column3);
  row.appendChild(column4);
  row.appendChild(column5);
  row.appendChild(column6);
  row.appendChild(column7);
  
  column1.appendChild(TextNode);
  column2.appendChild(TextNode2);
  column3.appendChild(TextNode3);
  column4.appendChild(TextNode4);
  column5.appendChild(TextNode5);
  column6.appendChild(TextNode6);
  column7.appendChild(TextNode7);    

    
  }

  var attribute = document.createElement("tr");
  var attribute2 = document.createElement("tr");
  ganttChart.appendChild(attribute);
  ganttChart.appendChild(attribute2);

    var column = document.createElement("th");
    var process = document.createTextNode("Start Time");
    column.appendChild(process);
    attribute.appendChild(column);

  for (let index = 0; index < jobs.length; index++) {
    var column = document.createElement("th");
    var process = document.createTextNode(jobs[index]);
    column.appendChild(process);
    attribute.appendChild(column);
  }

  var column2 = document.createElement("td");
  var ct = document.createTextNode(0);
  column2.appendChild(ct);
  attribute2.appendChild(column2);
  
  for( let index=0; index < jobs.length; index++){
    var column2 = document.createElement("td");
    var ct = document.createTextNode(completionTime[index]);
    column2.appendChild(ct);
    attribute2.appendChild(column2);
  }


  h21.style.visibility = "visible";
  h22.style.visibility = "visible";

  table.style.visibility = "visible";
  ganttChart.style.visibility = "visible";

  button.textContent = "hide";
  show = false;

}

else if(show){
  h2.style.visibility = "visible";
  table.style.visibility = "visible";
  ganttChart.style.visibility = "visible";

  button.textContent = "hide";
  show = false;
}

else{
  h2.style.visibility = "hidden";
  table.style.visibility = "hidden";
  ganttChart.style.visibility = "hidden";

  button.textContent = "show";
  show = true;
}

}

function getBurstTime(){
  var burst_text = document.getElementById("burst_time");
  var burst_value = parseInt(burst_text.value);
  burst_text.value = "";
  burstTime[num] = burst_value;
  return burst_value;
}

function getArrivalTime(){
  var arrival_text = document.getElementById("arrival_time");
  var arrival_value = parseInt(arrival_text.value);
  arrival_text.value = "";
  arrivalTime[num] = arrival_value;
  return arrival_value;
}

function showInput(){
  num = 0;
  document.getElementById("input_menu").style.display = "initial";
  n = parseInt(document.getElementById("no_of_processes").value);
  jobs = Array(n).fill(0);
  arrivalTime = Array(n).fill(0);
  burstTime = Array(n).fill(0);
  completionTime = Array(n).fill(0);
  waitingTime = Array(n).fill(0);
  turnaroundTime = Array(n).fill(0);
  Response_Time = Array(n).fill(0);

  for (let index = 1; index <= n; index++) {
      jobs[index - 1] = index;    
  }


}

function getInput(){
  var showValues = document.getElementById("showValues");
  // let count = 0;
  showValues.innerHTML = "";
//   let no_of_processes = document.getElementById("no_of_processes").value;
// no_of_processes = parseInt(no_of_processes);
  if(num < n){
    showProcessNumber();
    getArrivalTime();
    getBurstTime(); 
    console.log(num);
    num++;
  }
  // document.getElementById("input_menu").style.display = "none";
  
  document.getElementById("show").style.display = "initial";
    if(num == no_of_processes){

      
      // alert("Input Entered\n Click Calculate Button");
      
    }

  let value1 = document.createTextNode("Arrival Time: " + arrivalTime);

  let value2 = document.createTextNode("Burst Time: " + burstTime);

  showValues.appendChild(value1);
  showValues.appendChild(document.createElement("br"));
  showValues.appendChild(value2);
  showValues.appendChild(document.createElement("p"));

}
