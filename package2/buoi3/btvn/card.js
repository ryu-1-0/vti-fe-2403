{/* <div class="post-card">
<p>userId: ${todoInfo.userId}</p>
<p>id: ${todoInfo.id}</p>
<p>title: ${todoInfo.title}</p>
<p>completed: ${todoInfo.completed}</p>
<button onclick='showDetailTodo(${JSON.stringify(
todoInfo
)})'>Show Detail</button>
</div> */}
// const cardIn = { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
const cardComponent = (item) => {
  let count = Object.keys(item).length
  let stringCard = ''
  console.log('count:', count)
  for (let key in item) {
    stringCard += `<p>${key}:${item[key]}</p> <br/>`
  }
  // console.log(stringCard)
  return stringCard
}
// console.log(Object.key(item))
