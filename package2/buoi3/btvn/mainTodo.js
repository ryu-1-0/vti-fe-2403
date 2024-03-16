const apiTodos = 'https://jsonplaceholder.typicode.com/todos'
const getAllTodosList = async () => {
  const response = await fetch(apiTodos)
  const todosList = response.json()
  return todosList
}

const generateTodoCard = (todoInfo) => {
  return `
  
    <div class="post-card">
        <p><strong>userId:</strong> ${todoInfo.userId}</p>
        <p><strong>id:</strong> ${todoInfo.id}</p>
        <p><strong>title:</strong> ${todoInfo.title}</p>
        <p><strong>completed:</strong> ${todoInfo.completed}</p>
        <button onclick='showDetailTodo(${JSON.stringify(
    todoInfo
  )})'>Show Detail</button>
    </div>
`
}
const showDetailTodo = (todo) => {
  const todoInfoDiv = document.getElementById("meModal")
  const todoString = JSON.stringify(todo)

  modalContent = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()"></span>
        <div id="todoInfo">
        <h1>Todo Details Modal</h1>
        <p><strong>userId:</strong> ${todo.userId}</p>
        <p><strong>id:</strong> ${todo.id}</p>
        <p><strong>title:</strong> ${todo.title}</p>
        <p><strong>completed:</strong> ${todo.completed}</p>
        <div style="display:flex;gap:20px;">

          <button onclick='closeTodoInfo(${todoString})'>Close</button>
          <button onclick='saveTodoInfo(${todoString})'>Save</button>
        </div>

        </div>
      </div>
    </div>
  `
  todoInfoDiv.innerHTML = modalContent
  document.getElementById("myModal").style.display = "block";
}
const generateTodoCardList = (todosList) => {
  const content = `
  <div class="box-right">
    
  ${todosList.map((todo) =>
    generateTodoCard(todo)

  ).join("")
    }
  </div>
  `
  return content
}

// Function to save the modal
function saveTodoInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
// Function to close the modal
function closeTodoInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
function openTodo() {
  getAllTodosList()
    .then((data) => {
      contentDiv.innerHTML = generateTodoCardList(data)
    })
    .catch((error) => { console.log({ error }) })
}
