let addTask = document.querySelector('#new_task');
let btnadd = document.getElementById("addbtn");
let list = document.querySelector('#listing');
let addForm = document.querySelector('#task_form');
let filter = document.querySelector('#filter');
let clearbtn = document.querySelector('#clear-btn');

console.log(btnadd);
btnadd.addEventListener("click",addTASK);
list.addEventListener("click",removeElement);
clearbtn.addEventListener("click",clearAll);
filter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTask);

function removeElement(e){
    if(e.target.hasAttribute('href')){
        let ele = e.target.parentElement;
        if(confirm("Are You Sure?")){
            ele.remove();
            deleteFromLocalSt(ele);
        }
    }
}
function addTASK(e){
    if(addTask.value === ''){
        alert("Empty Task");
    }
    else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(addTask.value+" "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML ='x';
        li.appendChild(link);
        list.appendChild(li);
        storeInLocalStorage(addTask.value);
        addTask.value ='';
    }
    e.preventDefault();
}
function clearAll(e){
    list.innerHTML ="";
    localStorage.clear();
    e.preventDefault();
}

function filterTask(e){
    let searchValue = e.target.value.toLowerCase();
    if(searchValue != ""){
        document.querySelectorAll('li').forEach(task => {
            let item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(searchValue) != -1){
                task.style.display = 'block';
            }
            else{
                task.style.display = 'none';
            }
        });
    }
}

function storeInLocalStorage(item){
    let data;
    if(localStorage.getItem('data')===null){
        data = [];
    }
    else{
        data = JSON.parse(localStorage.getItem('data'));
    }
    data.push(item);
    console.log(data);
    localStorage.setItem('data',JSON.stringify(data));
}

function getTask(){
    let data;
    if(localStorage.getItem('data')===null){
        data = [];
    }
    else{
        data = JSON.parse(localStorage.getItem('data'));
    }
    data.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task+" "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML ='x';
        li.appendChild(link);
        list.appendChild(li);
    });
}

function deleteFromLocalSt(item){
    let data;
    if(localStorage.getItem('data')===null){
        data = [];
    }
    else{
        data = JSON.parse(localStorage.getItem('data'));
    }
    let itm = item.removeChild(item.lastChild);
    data.forEach((task,index) => {
        if(item.textContent.trim() === task){
            data.splice(index,1);
        }
    });
    localStorage.setItem('data',JSON.stringify(data));
}