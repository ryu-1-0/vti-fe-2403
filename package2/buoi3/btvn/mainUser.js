const apiUsers = 'https://jsonplaceholder.typicode.com/users'
const getAllUsersList = async () => {
  const response = await fetch(apiUsers)
  const usersList = response.json()
  return usersList
}


const generateUserCard = (userInfo) => {
  return `
  
    <div class="post-card">
      <p><strong>id:</strong> ${userInfo.id}</p> 
      <p><strong>name:</strong> ${userInfo.name}</p>
      <p><strong>username:</strong> ${userInfo.username}</p>
      <p><strong>phone:</strong> ${userInfo.phone}</p>
      <button onclick='showDetailUser(${JSON.stringify(
    userInfo
  )})'>Show Detail</button>
    </div>
`
}
const showDetailUser = (user) => {
  const userInfoDiv = document.getElementById("meModal")
  const userString = JSON.stringify(user)

  modalContent = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()"></span>
        <div id="userInfo">
        <h1>User Details Modal</h1>
        <p><strong>id:</strong> ${user.id}</p>
        <p><strong>name:</strong> ${user.name}</p>
        <p><strong>username:</strong> ${user.username}</p>
        <p><strong>phone:</strong> ${user.phone}</p>
        <div style="display:flex;gap:20px;">

          <button onclick='closeUserInfo(${userString})'>Close</button>
          <button onclick='saveUserInfo(${userString})'>Save</button>
        </div>

        </div>
      </div>
    </div>
  `
  userInfoDiv.innerHTML = modalContent
  document.getElementById("myModal").style.display = "block";
}
const generateUserCardList = (usersList) => {
  const content = `
  <div class="box-right">
    
  ${usersList.map((user) =>
    generateUserCard(user)

  ).join("")
    }
  </div>
  `
  return content
}

// Function to save the modal
function saveUserInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
// Function to close the modal
function closeUserInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
function openUser() {
  getAllUsersList()
    .then((data) => {
      contentDiv.innerHTML = generateUserCardList(data)
    })
    .catch((error) => { console.log({ error }) })
}
