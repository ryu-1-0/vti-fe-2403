const apiPhotos = 'https://jsonplaceholder.typicode.com/photos'
const getAllPhotosList = async () => {
  const response = await fetch(apiPhotos)
  const photosList = response.json()
  return photosList
}


const generatePhotoCard = (photoInfo) => {
  return `
  
    <div class="post-card">
        <p><strong>albumId:</strong> ${photoInfo.albumId}</p>
        <p><strong>id:</strong> ${photoInfo.id}</p>
        <p><strong>title:</strong> ${photoInfo.title}</p>

        <button onclick='showDetailPhoto(${JSON.stringify(
    photoInfo
  )})'>Show Detail</button>
    </div>
`
}
const showDetailPhoto = (photo) => {
  const photoInfoDiv = document.getElementById("meModal")
  const photoString = JSON.stringify(photo)

  modalContent = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()"></span>
        <h1>Photo Details Modal</h1>
        <div id="photoInfo">
          <div>
          <p><strong>url:</strong></p>
          <img src=" ${photo.url}" alt="url" height="100px"/>
          <p><strong>thumbnailUrl:</strong></p>
          <img src=" ${photo.thumbnailUrl}" alt="thumbnailUrl" height="100px"/>
          </div>
          
          <div>
          <p><strong>albumId:</strong> ${photo.albumId}</p>
          <p><strong>id:</strong> ${photo.id}</p>
          <p><strong>title:</strong> ${photo.title}</p>
         
          </div>

        </div>
        <div style="display:flex;gap:20px;">
          <button onclick='closePhotoInfo(${photoString})'>Close</button>
          <button onclick='savePhotoInfo(${photoString})'>Save</button>
        </div>
      </div>
    </div>
  `
  photoInfoDiv.innerHTML = modalContent
  document.getElementById("myModal").style.display = "block";
}
const generatePhotoCardList = (photosList) => {
  const content = `
  <div class="box-right">
    
  ${photosList.map((photo) =>
    generatePhotoCard(photo)

  ).join("")
    }
  </div>
  `
  return content
}
// Function to save the modal
function savePhotoInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
// Function to log user info
function closePhotoInfo(photo) {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}

function openPhoto() {
  getAllPhotosList()
    .then((data) => {
      contentDiv.innerHTML = generatePhotoCardList(data)
    })
    .catch((error) => { console.log({ error }) })
}