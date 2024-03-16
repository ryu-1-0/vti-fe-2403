//============================================================================
//Khai báo biến
const BASE_API_USER = 'https://65f199d0034bdbecc7632262.mockapi.io/api/users'
const boxUserDiv = document.querySelector('.box-user')
const contentUserDiv = document.querySelector('.content-user')
const formCreateUserDiv = document.querySelector('.form-create-user')
const formEditUserDiv = document.querySelector('.form-edit-user')
const modalViewDetailsUserDiv = document.querySelector('.modal-view-details-user')
const boxProductDiv1 = document.querySelector('.box-product')

//================================================================================================
// get api Users
const getAllUsers = async () => {
  const data = await fetch(`${BASE_API_USER}`)
  return data.json()
}
const getUserById = async (userId) => {
  const data = await fetch(`${BASE_API_USER}/${userId}`)
  return data.json()
}
const createUser = async (newUser) => {
  const res = await fetch(`${BASE_API_USER}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
  return res.ok
}
const editUser = async (updatedUser) => {
  const res = await fetch(`${BASE_API_USER}/${updatedUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  })
  return res.ok
}
const deleteUser = async (userId) => {
  const res = await fetch(`${BASE_API_USER}/${userId}`, {
    method: 'DELETE',
  })
  return res.ok
}
//================================================================================================
// Functions Users
const showCreateUserForm = () => {
  // contentDiv.innerHTML = ''
  formCreateUserDiv.style.display = 'block'

}
// add a new User
const handleAddUser = async () => {
  const userName = document.getElementById("user-name").value
  const email = document.getElementById("user-email").value
  const password = document.getElementById("user-password").value
  const isAdmin = document.getElementById("user-is-admin").check
  const phone = document.getElementById("user-phone").value
  const address = document.getElementById("user-address").value
  const avatar = document.getElementById("user-avatar").value
  const newUser = {
    userName,
    email,
    password,
    isAdmin,
    phone,
    address,
    avatar,
  }

  // gọi API create
  const isCreated = await createUser(newUser)
  console.log({ isCreated })
  if (!isCreated) {
    const errorStatus = document.createElement("h2")
    errorStatus.innerText = "Create Failed"
    errorStatus.style.color = "red"
    createFormDiv.appendChild(errorStatus)
  } else {
    // reload the page when creating succefully
    location.reload()
  }

}

//cancel add User
const handleCancelAddUser = () => {
  // clear current form values
  formCreateUserDiv.style.display = 'none'
  // location.reload()

}
//=================================================
// deleteUser
const handleDeleteUser = async (userId) => {
  const isDeletedOk = deleteUser(userId)
  if (!isDeletedOk) {
    const userListDiv = document.querySelector(".user-list")
    const errorStatus = document.createElement("h2")
    errorStatus.innerText = "Delete Failed"
    errorStatus.style.color = "red"
    userListDiv.appendChild(errorStatus)
  } else {
    // reload the page when creating succefully
    location.reload()
  }
}
//=================================================
// view details the user
const closeUserDetailModal = () => {
  modalViewDetailsUserDiv.style.display = "none"
}

const openUserDetailModal = async (selectedUserId) => {
  modalViewDetailsUserDiv.style.display = "block"
  modalViewDetailsUserDiv.innerHTML = "<h2>Loading Detail...</h2>"

  const userDetail = await getUserById(selectedUserId)

  console.log({ userDetail })

  modalViewDetailsUserDiv.innerHTML = `
  <div class="form-content">
      <div class='user-detail'>
          <img class='user-image' src='${userDetail.userImage}' />
          <p>User Name: ${userDetail.userName}</p>
          <p>Email: ${userDetail.email}</p>
          <pPassword: ${userDetail.password}</p>
          <p>Is Admin: ${userDetail.isAdmin}</p>
          <p>Phone: ${userDetail.phone}</p>
          <p>Address: ${userDetail.address}</p>
          <p>Avatar: ${userDetail.avatar}</p>
          <button onclick='closeUserDetailModal()'>close</button>
      </div>
      </div>
  `
}
//=================================================
// edit User detail
const handleCancelEditUser = (event) => {
  console.log(event)
  event.preventDefault()
  formEditUserDiv.style.display = 'none'

}
const handleEditUser = async () => {
  const userName = document.getElementById("edit-user-name").value
  const email = document.getElementById("edit-user-email").value
  const password = document.getElementById("edit-user-password").value
  const isAdmin = document.getElementById("edit-user-is-admin").check
  const phone = document.getElementById("edit-user-phone").value
  const address = document.getElementById("edit-user-address").value
  const avatar = document.getElementById("edit-user-avatar").value
  const editedUser = {
    id: localStorage.getItem("selected-user-id"),
    userName,
    email,
    password,
    isAdmin,
    phone,
    address,
    avatar,
  }

  const isEdited = await editUser(editedUser)
  if (isEdited) {
    location.reload()
  } else {
    const formEditUserDiv = document.querySelector(".form-edit-user")
    const errorStatus = document.createElement("h2")
    errorStatus.innerText = "Create Failed"
    errorStatus.style.color = "red"
    formEditUserDiv.appendChild(errorStatus)
  }
}
const openEditUserForm = async (selectedUser) => {
  const formEditUserDiv = document.querySelector('.form-edit-user')
  // set User value into the edit-form
  document.getElementById("edit-user-name").value = selectedUser.userName
  document.getElementById("edit-user-email").value = selectedUser.email
  document.getElementById("edit-user-password").value = selectedUser.password
  document.getElementById("edit-user-is-admin").check = selectedUser.isAdmin
  document.getElementById("edit-user-phone").value = selectedUser.phone
  document.getElementById("edit-user-address").value = selectedUser.address
  document.getElementById("edit-user-avatar").value = selectedUser.avatar

  // store the selected user
  localStorage.setItem("selected-user-id", selectedUser.id)

  //session store
  // sessionStorage.setItem('selected-user-id', selecteduser.id)

  formEditUserDiv.style.display = 'block'

}
//=================================================
// card User
const gennerUserCard = (user) => {
  return `
  <div class="user-card">
    <img class='user-image' src='${user.avatar}'/>
    <p><strong>${user.userName}</strong></p>
    <p>${user.email}</p>
    <p>${user.isAdmin}</p>
    <p>${user.phone}</p>
    <div class='actions-user'>
      <button onclick='openUserDetailModal(${JSON.stringify(user.id)})'>
      View Detail
      </button>

      <button onclick='handleDeleteUser(${JSON.stringify(user.id)})'>
      Delete user
      </button>

      <button onclick='openEditUserForm(${JSON.stringify(user)})'>
      Edit
      </button>
    </div>
  </div>
  `
}

const handleOpenUser = async () => {
  loadingDiv.style.display = 'none'
  boxUserDiv.style.display = 'block'
  boxProductDiv1.style.display = 'none'

  const userList = await getAllUsers()
  // console.log(userList)

  if (userList.length) {
    contentUserDiv.innerHTML = `
    <div class="user-list">
      ${userList.map((user) =>
      gennerUserCard(user)).join('')
      }
    </div>
    `
  } else {
    contentUserDiv.innerHTML = '<h1>No users</h1>'
  }
}
//=================================================
// search products

//=================================================
// sort price products

//=================================================
// sort fill products