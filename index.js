let taskList = [];
const taskDisplayList = document.getElementById('list');
const inputTask = document.getElementById('add');
const taskCounter = document.getElementById('taskCount');
let count = 10;


function fetchCode(){
    //get request
    //fetch the api
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function(response){
        console.log(response)
        return response.json()
    })
    .then(function(data){
        // console.log(data);
        taskList = data.slice(0,10);
        displayList();
    })
}


function addTask(task){

    if(task){
        taskList.push(task);
        count+=1;
        displayList();
        notify("Task is added");
        return;
    }
    notify("Something went wrong");
}
function deleteTask(taskID) {
    //using filer to seperate not needed task
    let newTask = taskList.filter(function(task){
        return task.id != taskID;
    });
    taskList = newTask;
    count--;
    displayList();
    notify('Task is deleted');

}
function Checked(taskID) {
    let f = 0;
    let newTask = taskList.filter(function(task){
            return task.id == taskID;
    })
    if(newTask.length > 0){
        const currTask = newTask[0];
        currTask.completed = !currTask.completed;
        displayList();
        notify('Checked');
        return;
    }
}
function notify(task){
    alert(task);
}

function addTaskElement(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" class="checkbox" data-id="${task.id}" ${task.completed ? 'checked' :''}></input>
        <label for="${task.id}">${task.title}</label>
        <img style="height:20px" src="https://cdn-icons.flaticon.com/png/512/484/premium/484611.png?token=exp=1644862143~hmac=3f9efa15963c904bd3a1870cf9361a12" class="delete" data-id="${task.id}">
    `;
    // console.log(li);
    // taskList.appendChild(element);
    taskDisplayList.appendChild(li);
}

function displayList() {
    taskDisplayList.innerHTML = "";
    // console.log(taskList);
    taskCounter.innerHTML = count;
    for(it of taskList){
        addTaskElement(it);
    }
}

function handleInput(event){
    // console.log(event.key);
    if(event.key != 'Enter'){
        return;
    }
    const title = event.target.value;
    if(!title){
        alert('Task can not be empty!!');
        return;
    }
    const inputobj = {
        title,
        id:Date.now(),
        completed:false
    }
    event.target.value = '';
    // taskList.push(inputobj);
    // console.log('Hello');
    addTask(inputobj);
}



function handleClick(e){
    // console.log(e.target);
    const target = e.target;
    if(target.className == "delete"){
        // console.log(target.className);
        const taskID = target.dataset.id;
        deleteTask(taskID);
    }else if(target.className == "checkbox"){
        // console.log("check");
         const taskID = target.dataset.id;
        Checked(taskID);
    }
}

function handleOpening(){
    fetchCode();
    inputTask.addEventListener('keyup',handleInput);
    document.addEventListener('click',handleClick);
}
handleOpening();
