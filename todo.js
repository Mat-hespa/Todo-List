let todoItems = []
const todoInput = document.querySelector('.todo-input')
const compoletedTodosDiv = document.querySelector('.completed-todos')
const uncompoletedTodosDiv = document.querySelector('.uncompleted-todos')
const audio = new Audio('audio.mp3') 


// Get todo list on first boot
window.onload = () => {
    let storageTodoItems = localStorage.getItem('todoItems')
    if (storageTodoItems !== null){
        todoItems = JSON.parse(storageTodoItems)
    }

    render()
}

// Get the content typed into the input
todoInput.onkeyup = ((e) => {
    let value = e.target.value.replace(/^s+/, "")
    if (value && e.keyCode === 13){ // Enter
        addTodo(value)

        todoInput.value = ''
        todoInput.focus()
    }
})

// Add todo
function addTodo(text){
    todoItems.push({
        id: Date.now(),
        text,
        completed: false
    })

    saveAndRender()
}

// Remove todo
function removeTodo(id){
    todoItems = todoItems.filter(todo => todo.id !== Number(id))
    saveAndRender()
}

// Mark as completed
function markAsCompleted(id){
    todoItems = todoItems.filter(todo => {
        if (todo.id === Number(id)){
            todo.completed = true
        }

        return todo
    })

    audio.play()

    saveAndRender()
}

//Mark as uncompleted
function markAsUncompleted(id){
    todoItems = todoItems.filter(todo => {
        if (todo.id === Number(id)){
            todo.completed = false
        }

        return todo
    })

    saveAndRender()
}

// Save in localstorage
function save(){
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}

// Render
function render(){
    let uncompletedTodos = todoItems.filter(item => !item.completed)
    let completedTodos = todoItems.filter(item => item.completed)

    compoletedTodosDiv.innerHTML = ''
    uncompoletedTodosDiv.innerHTML = ''

    if (uncompletedTodos.length > 0){
        uncompletedTodos.forEach(todo => {
            uncompoletedTodosDiv.append(createTodoElement(todo))
        })
    } else {
        uncompoletedTodosDiv.innerHTML = `<div class='empty'>No uncompleted mission</div>`
    }

    if(completedTodos.length > 0){
        compoletedTodosDiv.innerHTML = `<div class='completed-title'>Completed (${completedTodos.length} / ${todoItems.length})</div>`
    }

    completedTodos.forEach(todo => {
        compoletedTodosDiv.append(createTodoElement(todo))
    })
}

// Save and render
function saveAndRender(){
    save()
    render()
}

function createTodoElement(todo){
    // Create todo list container
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id', todo.id)
    todoDiv.className = 'todo-item'

    // Create todo item text
    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text

    // Checkbox for list
    const todoInputCheckbox = document.createElement('input')
    todoInputCheckbox.type = 'checkbox'
    todoInputCheckbox.checked = todo.completed
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked ? markAsCompleted(id) : markAsUncompleted(id)
    }

    // Delete buttn for list
    const todoRemoveBtn = document.createElement('a')
    todoRemoveBtn.href = '#'
    todoRemoveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
 </svg>`
    todoRemoveBtn.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        removeTodo(id)
    }

    todoTextSpan.prepend(todoInputCheckbox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)

    return todoDiv
}

function correctLayoutOnChange(){
    document.getElementById('bg').style.fontFamily = '"Poppins", sans-serif';
    document.getElementById('bg').style.display = 'flex';
    document.getElementById('bg').style.alignItems = 'center';
    document.getElementById('bg').style.justifyContent = 'center';
    document.getElementById('bg').style.minHeight= '100vh';
    document.getElementById('bg').style.backgroundSize = 'cover';
}

function changeBackgroundBear() {
    document.getElementById('bg').style.background = 'url(bg2.jpeg) center';
    correctLayoutOnChange()
}

function changeBackgroundKitty() {
    document.getElementById('bg').style.background = 'url(bg.jpg) center';
    correctLayoutOnChange()
    
}