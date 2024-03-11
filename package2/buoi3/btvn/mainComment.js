const apiComments = 'https://jsonplaceholder.typicode.com/comments'
const getAllCommentsList = async () => {
  const response = await fetch(apiComments)
  const commentsList = response.json()
  return commentsList
}


const generateCommentCard = (commentInfo) => {
  return `
  
    <div class="post-card">
        <p><strong>postId:</strong> ${commentInfo.postId}</p>
        <p><strong>id:</strong> ${commentInfo.id}</p>
        <p><strong>name:</strong> ${commentInfo.name}</p>
        <p><strong>email:</strong> ${commentInfo.email}</p>
        <p><strong>body:</strong> ${commentInfo.body}</p>
        <button onclick='showDetailComment(${JSON.stringify(
    commentInfo
  )})'>Show Detail</button>
    </div>
`
}
const showDetailComment = (comment) => {
  const commentInfoDiv = document.getElementById("meModal")
  const commentString = JSON.stringify(comment)

  modalContent = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()"></span>
        <div id="commentInfo">
          <h1>Comment Details Modal</h1>
          <p><strong>postId:</strong> ${comment.postId}</p>
          <p><strong>id:</strong> ${comment.id}</p>
          <p><strong>name:</strong> ${comment.name}</p>
          <p><strong>email:</strong> ${comment.email}</p>
          <p><strong>body:</strong> ${comment.body}</p>
          <div style="display:flex;gap:20px;">

            <button onclick='closeCommentInfo(${commentString})'>Close</button>
            <button onclick='saveCommentInfo(${commentString})'>Save</button>
          </div>

        </div>
      </div>
    </div>
  `
  commentInfoDiv.innerHTML = modalContent
  document.getElementById("myModal").style.display = "block";
}
const generateCommentCardList = (commentsList) => {
  const content = `
  <div class="box-right">
    
  ${commentsList.map((comment) =>
    generateCommentCard(comment)

  ).join("")
    }
  </div>
  `
  return content
}
// Function to save the modal
function saveCommentInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}

// Function to close the modal
function closeCommentInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
function openComment() {
  getAllCommentsList()
    .then((data) => {
      contentDiv.innerHTML = generateCommentCardList(data)
    })
    .catch((error) => { console.log({ error }) })
}