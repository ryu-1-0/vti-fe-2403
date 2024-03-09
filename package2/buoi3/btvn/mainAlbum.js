const apiAlbums = 'https://jsonplaceholder.typicode.com/albums'
const getAllAlbumsList = async () => {
  const response = await fetch(apiAlbums)
  const albumsList = response.json()
  return albumsList
}


const generateAlbumCard = (albumInfo) => {
  return `
  
    <div class="post-card">
        <p>userId: ${albumInfo.userId}</p>
        <p>id: ${albumInfo.id}</p>
        <p>title: ${albumInfo.title}</p>
        <button onclick='showDetailAlbum(${JSON.stringify(
    albumInfo
  )})'>Show Detail</button>
    </div>
`
}
const showDetailAlbum = (album) => {
  const albumInfoDiv = document.getElementById("meModal")
  const albumString = JSON.stringify(album)

  modalContent = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()"></span>
          <div id="albumInfo">
          
          <h1>Album Details Modal</h1>
          <p><strong>userId:</strong> ${album.userId}</p>
          <p><strong>id:</strong> ${album.id}</p>
          <p><strong>title:</strong> ${album.title}</p>
          <div style="display:flex;gap:20px;">
          <button onclick='closeAlbumInfo(${albumString})'>Close</button>
          <button onclick='saveAlbumInfo(${albumString})'>Save</button>
          </div>
        </div>
      </div>
    </div>
  `
  albumInfoDiv.innerHTML = modalContent
  document.getElementById("myModal").style.display = "block";
}
const generateAlbumCardList = (albumsList) => {
  const content = `
  <div class="box-right">
    
  ${albumsList.map((album) =>
    generateAlbumCard(album)

  ).join("")
    }
  </div>
  `
  return content
}

// Function to save the modal
function saveAlbumInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
// Function to close the modal
function closeAlbumInfo() {
  // document.getElementById("myModal").style.display = "none";
  const modal = document.getElementById("myModal")
  modal.parentNode.removeChild(modal)
}
function openAlbum() {
  getAllAlbumsList()
    .then((data) => {
      contentDiv.innerHTML = generateAlbumCardList(data)
    })
    .catch((error) => { console.log({ error }) })
}