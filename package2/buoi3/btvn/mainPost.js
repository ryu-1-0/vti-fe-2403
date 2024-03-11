
const apiPosts = 'https://jsonplaceholder.typicode.com/posts'
const getAllPostsList = async () => {
  const response = await fetch(apiPosts)
  const postsList = response.json()
  return postsList
}

const contentDiv = document.querySelector(".box-right")
contentDiv.innerHTML = `
    <div class="box-right-2">
      <h1>Loading...</h1>
    </div>
  
`

const cardComponent = (item) => {
  let count = Object.keys(item).length
  let stringCard = ''
  console.log('count:', count)
  for (let key in item) {
    stringCard += `<p><strong>${key}</strong>: ${item[key]}</p>`
  }
  // console.log(stringCard)
  return stringCard
}

const generatePostCard = (postInfo) => {
  let card = cardComponent(postInfo)
  return `
  
  <div class="post-card">
      ${card}
      <button onclick='showDetailPost(${JSON.stringify(
    postInfo
  )})'>Show Detail</button>
  </div>
`
  //   return `

  //     <div class="post-card">
  //         <p>userId: ${postInfo.userId}</p>
  //         <p>id: ${postInfo.id}</p>
  //         <p>title: ${postInfo.title}</p>
  //         <p>body: ${postInfo.body}</p>
  //         <button onclick='showDetailPost(${JSON.stringify(
  //     postInfo
  //   )})'>Show Detail</button>
  //     </div>
  // `
}
const showDetailPost = (post) => {
  const postInfoDiv = document.getElementById("meModal")
  const postString = JSON.stringify(post)

  // postInfoDiv.innerHTML = `
  //     <h1>Post Details Modal</h1>
  //     <p><strong>userId:</strong> ${post.userId}</p>
  //     <p><strong>id:</strong> ${post.id}</p>
  //     <p><strong>title:</strong> ${post.title}</p>
  //     <p><strong>body:</strong> ${post.body}</p>

  //     <button onclick='closePostInfo(${postString})'>Close</button>
  //     <button onclick='savePostInfo(${postString})'>Save</button>

  //   `

  // modalContent = `
  //   <div id="myModal" class="modal">
  //     <div class="modal-content">
  //       <span class="close" onclick="closeModal()"></span>
  //       <div id="postInfo">
  //         <h1>Post Details Modal</h1>
  //         <p><strong>userId:</strong> ${post.userId}</p>
  //         <p><strong>id:</strong> ${post.id}</p>
  //         <p><strong>title:</strong> ${post.title}</p>
  //         <p><strong>body:</strong> ${post.body}</p>
  //         <div style="display:flex;gap:20px;">
  //           <button onclick='closePostInfo()'>Close</button>
  //           <button onclick='savePostInfo()'>Save</button>
  //         </div>

  //       </div>
  //     </div>
  //   </div>
  // `
  let card = cardComponent(post)
  modalContent = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()"></span>
        <div id="postInfo">
          <h1>Post Details Modal</h1>
          ${card}
          <div style="display:flex;gap:20px;">
            <button onclick='closePostInfo()'>Close</button>
            <button onclick='savePostInfo()'>Save</button>
          </div>

        </div>
      </div>
    </div>
  `
  postInfoDiv.innerHTML = modalContent
  document.getElementById("myModal").style.display = "block";
}
const generatePostCardList = (postsList) => {
  const content = `
  <div class="box-right">
    
  ${postsList.map((post) =>
    generatePostCard(post)

  ).join("")
    }
  </div>
  `
  return content
}
// Function to save the modal
function savePostInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
// Function to close the modal
function closePostInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}

function openPost() {
  getAllPostsList()
    .then((data) => {
      contentDiv.innerHTML = generatePostCardList(data)
    })
    .catch((error) => { console.log({ error }) })
}
