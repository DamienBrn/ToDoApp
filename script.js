const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}


//--------------------------------------------------

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

var toDoId = 1
var taskDescriptionInput = document.getElementById('task-description-input')

setGetterSetterTaskDescription()

//--------------------------------------------------


function addTodo() {
  let item = createToDoItem()
  let checkbox = createCheckBox()
  let deleteButton = createDeleteButton(item.id, checkbox.id)
  let taskDescription = createTaskDescription()

  item.appendChild(checkbox)

  item.append('|Task : ')

  item.appendChild(taskDescription)
  item.appendChild(deleteButton)
  list.appendChild(item)

  itemCountSpan.innerHTML++
  uncheckedCountSpan.innerHTML++
  toDoId++
}


function createToDoItem(){
  let item = document.createElement('li')
  item.id = 'toDo-' + toDoId
  item.classList.add(classNames.TODO_ITEM)

  return item
}

function createCheckBox(){
  let checkbox = document.createElement('input')
  checkbox.classList.add(classNames.TODO_CHECKBOX)
  checkbox.type = 'checkbox'
  checkbox.id = 'checkbox-' + toDoId
  checkbox.onclick = ()=>{
    isBoxChecked(checkbox.id)
  }

  return checkbox
}

function createDeleteButton(idItem, idCheckBox){
  let deleteButton = document.createElement('div')
  deleteButton.classList.add(classNames.TODO_DELETE, 'align-right')
  deleteButton.append('X')
  deleteButton.onclick = function(){
    deleteToDo(idItem, idCheckBox)
  }

  return deleteButton
}


function createTaskDescription(){
  let taskDescriptionContainer = document.createElement('div')

  taskDescriptionContainer.append(taskDescriptionInput.get())
  taskDescriptionInput.set('')

  return taskDescriptionContainer
}


function setGetterSetterTaskDescription(){
  taskDescriptionInput.get = function(){
    return taskDescriptionInput.value
  }

  taskDescriptionInput.set = function(contentValue){
    taskDescriptionInput.value = contentValue
  }
}


function deleteToDo(idItem, idCheckBox){
  let targetItem = document.getElementById(idItem)

  isBoxChecked(idCheckBox, 'DELETE')
  targetItem.remove()
  itemCountSpan.innerHTML--
}


function isBoxChecked(idCheckBox, action = 'ADD'){
  let checkbox = document.getElementById(idCheckBox)
  
  switch(action){
    
    case 'ADD' :  
      if(checkbox.checked){
        uncheckedCountSpan.innerHTML--
      }else{
        uncheckedCountSpan.innerHTML++
      }
    break;

    case 'DELETE' : 
      if(!checkbox.checked){
        uncheckedCountSpan.innerHTML--
      }
    break;
  }
}


function clearAllTasks(){
  let tasks = document.getElementsByTagName('li')
  while(tasks[0]){
    tasks[0].remove()
  }
  itemCountSpan.innerHTML = 0
  uncheckedCountSpan.innerHTML = 0
  toDoId = 1
}





