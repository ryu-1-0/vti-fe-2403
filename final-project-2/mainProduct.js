//================================================================================================
//Khai báo biến
const BASE_API_PRODUCT = 'https://65f199d0034bdbecc7632262.mockapi.io/api/products'
const boxProductDiv = document.querySelector('.box-product')
const contentProductDiv = document.querySelector('.content-product')
const formCreateProductDiv = document.querySelector('.form-create-product')
const formEditProductDiv = document.querySelector('.form-edit-product')
const modalViewDetailsProductDiv = document.querySelector('.modal-view-details-product')
const loadingDiv = document.querySelector('.loading')
const boxUserDiv1 = document.querySelector('.box-user')
const contentFuncProductDiv = document.querySelector('.content-functional-product')
//================================================================================================
// get api Products
const getAllProducts = async () => {
  const data = await fetch(`${BASE_API_PRODUCT}`)
  return data.json()
}
const getProductById = async (productId) => {
  const data = await fetch(`${BASE_API_PRODUCT}/${productId}`)
  return data.json()
}
const createProduct = async (newProduct) => {
  const res = await fetch(`${BASE_API_PRODUCT}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  })
  return res.ok
}
const editProduct = async (updatedProduct) => {
  const res = await fetch(`${BASE_API_PRODUCT}/${updatedProduct.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct),
  })
  return res.ok
}
const deleteProduct = async (productId) => {
  const res = await fetch(`${BASE_API_PRODUCT}/${productId}`, {
    method: 'DELETE',
  })
  return res.ok
}
//================================================================================================
// Functions Products
const showCreateProductForm = () => {
  // contentDiv.innerHTML = ''
  formCreateProductDiv.style.display = 'block'

}
// add a new product
const handleAddProduct = async () => {
  const productName = document.getElementById("product-name").value
  const productType = document.getElementById("product-type").value
  const price = document.getElementById("product-price").value
  const productImage = document.getElementById("product-image").value
  const isUsed = document.getElementById("product-is-used").check
  const discount = document.getElementById("product-discount").value
  const countInStock = document.getElementById("product-count-in-stock").value
  const newProduct = {
    productName,
    productType,
    price,
    productImage,
    isUsed,
    discount,
    countInStock,
  }
  console.log({ newProduct })
  // gọi API create
  const isCreated = await createProduct(newProduct)
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

//cancel add product
const handleCancelAddProduct = () => {
  // clear current form values
  formCreateProductDiv.style.display = 'none'
  // location.reload()

}
//=================================================
// deleteProduct
const handleDeleteProduct = async (productId) => {
  const isDeletedOk = deleteProduct(productId)
  if (!isDeletedOk) {
    const productListDiv = document.querySelector(".product-list")
    const errorStatus = document.createElement("h2")
    errorStatus.innerText = "Delete Failed"
    errorStatus.style.color = "red"
    productListDiv.appendChild(errorStatus)
  } else {
    // reload the page when creating succefully
    location.reload()
  }
}
//=================================================
// view details the product
const closeDetailModal = () => {
  modalViewDetailsProductDiv.style.display = "none"
}

const openProductDetailModal = async (selectedProductId) => {
  modalViewDetailsProductDiv.style.display = "block"
  modalViewDetailsProductDiv.innerHTML = "<h2>Loading Detail...</h2>"

  const productDetail = await getProductById(selectedProductId)

  console.log({ productDetail })

  modalViewDetailsProductDiv.innerHTML = `
  <div class="form-content">
      <div class='product-detail'>
      <h2>Product Details</h2>
          <img class='product-image' src='${productDetail.productImage}' />
          <p>Product Name: ${productDetail.productName}</p>
          <p>Product Type: ${productDetail.productType}</p>
          <p>Product Price: ${productDetail.productPrice}</p>
          <p>Is Used: <input type='checkbox' ${productDetail.isUsed && "checked"
    } /></p>
          <p>Count In Stock: ${productDetail.countInStock}</p>
          <p>Discount: ${productDetail.discount}%</p>
          <button onclick='closeDetailModal()'>close</button>
      </div>
      </div>
  `
}
//=================================================
// edit product detail
const handleCancelEditProduct = (event) => {
  console.log(event)
  event.preventDefault()
  formEditProductDiv.style.display = 'none'

}
const handleEditProduct = async () => {
  const productName = document.getElementById("edit-product-name").value
  const productType = document.getElementById("edit-product-type").value
  const price = document.getElementById("edit-product-price").value
  const productImage = document.getElementById("edit-product-image").value
  const isUsed = document.getElementById("edit-product-is-used").check
  const discount = document.getElementById("edit-product-discount").value
  const countInStock = document.getElementById("edit-product-count-in-stock").value
  const editedProduct = {
    id: localStorage.getItem("selected-product-id"),
    productName,
    productType,
    price,
    productImage,
    isUsed,
    discount,
    countInStock,
  }

  const isEdited = await editProduct(editedProduct)
  if (isEdited) {
    location.reload()
  } else {
    const formEditProductDiv = document.querySelector(".form-edit-product")
    const errorStatus = document.createElement("h2")
    errorStatus.innerText = "Create Failed"
    errorStatus.style.color = "red"
    formEditProductDiv.appendChild(errorStatus)
  }
}
const openEditProductForm = async (selectedProduct) => {
  const formEditProductDiv = document.querySelector('.form-edit-product')
  // set product value into the edit-form
  document.getElementById("edit-product-name").value = selectedProduct.productName
  document.getElementById("edit-product-type").value = selectedProduct.productType
  document.getElementById("edit-product-price").value = selectedProduct.price
  document.getElementById("edit-product-image").value = selectedProduct.productImage
  document.getElementById("edit-product-is-used").check = selectedProduct.isUsed
  document.getElementById("edit-product-discount").value = selectedProduct.discount
  document.getElementById("edit-product-count-in-stock").value = selectedProduct.countInStock

  // store the selected product
  localStorage.setItem("selected-product-id", selectedProduct.id)

  //session store
  // sessionStorage.setItem('selected-product-id', selectedProduct.id)

  formEditProductDiv.style.display = 'block'

}
//=================================================
// card product
const gennerProductCard = (product) => {
  return `
  <div class="product-card">
    <img class='product-image' src='${product.productImage}'/>
    <p><strong>${product.productName}</strong></p>
    ${product.used ? '<h4> Is used </h4>' : ''}
    <p>${product.price}</p>
    <div class='actions'>
      <button onclick='openProductDetailModal(${JSON.stringify(product.id)})'>
      View Detail
      </button>

      <button onclick='handleDeleteProduct(${JSON.stringify(product.id)})'>
      Delete product
      </button>

      <button onclick='openEditProductForm(${JSON.stringify(product)})'>
      Edit
      </button>
    </div>
  </div>
  `
}
// const handleOpenProduct = async () => {
//   loadingDiv.style.display = 'none'
//   boxUserDiv1.style.display = 'none'
//   boxProductDiv.style.display = 'block'
//   const productList = await getAllProducts()
//   // console.log(productList)

//   if (productList.length) {
//     contentProductDiv.innerHTML = `
//     <div class="product-list">
//       ${productList.map((product) =>
//       gennerProductCard(product)).join('')
//       }
//     </div>
//     `
//   } else {
//     contentProductDiv.innerHTML = '<h1>No products</h1>'
//   }
// }
const renderProductList = (productList) => {
  if (productList.length) {
    contentProductDiv.innerHTML = `
      <div class="product-list">
        ${productList.map((product) => gennerProductCard(product)).join('')}
      </div>
    `
  } else {
    contentProductDiv.innerHTML = '<h1>No products</h1>'
  }
}
const handleOpenProduct = async () => {
  loadingDiv.style.display = 'none'
  boxUserDiv1.style.display = 'none'
  boxProductDiv.style.display = 'block'
  // console.log(productList)

  // check is Used & sort
  const productIsUsedCheckbox = document.getElementById('filter-product-is-used')
  const productSortUp = document.querySelector('.bx-sort-up')
  const productSortDown = document.querySelector('.bx-sort-down')

  const productList = await getAllProducts()
  renderProductList(productList)
  // sort price products
  const handleSortUp = async () => {
    const productList = await getAllProducts()
    const sortedProductList = productList.sort((a, b) => a.price - b.price)
    renderProductList(sortedProductList)
  }

  const handleSortDown = async () => {
    const productList = await getAllProducts()
    const sortedProductList = productList.sort((a, b) => b.price - a.price)
    renderProductList(sortedProductList)
  }
  // fillter products
  const handleProductFilter = async () => {
    const isUsed = productIsUsedCheckbox.checked
    const filteredProductList = isUsed ? productList.filter(product => product.isUsed) : productList

    renderProductList(filteredProductList)
  }

  productSortUp.addEventListener('click', handleSortUp)
  productSortDown.addEventListener('click', handleSortDown)
  productIsUsedCheckbox.addEventListener('change', handleProductFilter)
}
//=================================================
// search products
const searchProducts = async (nameSearch) => {
  const listAllProducts = await getAllProducts()
  const searchProduct = listAllProducts.filter((product) => {
    const productName = product.productName.toLowerCase()
    const searchKeyword = nameSearch.toLowerCase()
    return productName.includes(searchKeyword)
  })
  if (searchProduct.length > 0) {
    // Có kết quả tìm kiếm
    console.log({ searchProduct })
    console.log('tìm thấy sản phẩm.')
    contentFuncProductDiv.innerHTML = `
    <h2>Search Products</h2><hr />
    <div class="product-list">
      ${searchProduct.map((product) =>
      gennerProductCard(product)).join('')
      }
    </div>
    `
  } else {
    // Không có kết quả tìm kiếm
    console.log('Không tìm thấy sản phẩm.')
    contentFuncProductDiv.innerHTML = `
    <h2>Search Products</h2><hr />
    <h1>Không tìm thấy sản phẩm cần tìm!</h1>`
  }
  contentFuncProductDiv.style.display = 'block'
}
const openSearchProducts = (value) => {
  contentFuncProductDiv.innerHTML = `
  <h2>Search Products</h2>
  ${value}
  `
  contentFuncProductDiv.style.display = 'block'
}
const getValueSearch = () => {
  const inputElement = document.getElementById('search-product-name')
  const searchButton = document.querySelector('.input-search-product i')

  const performSearch = () => {
    const searchValue = inputElement.value
    // Thực hiện hành động tìm kiếm với giá trị searchValue ở đây
    console.log(searchValue)
    searchProducts(searchValue)
    // openSearchProducts(item)
  }

  searchButton.addEventListener('click', performSearch)

  inputElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      performSearch()
    }
  })
}

//=================================================
// sort price products

//=================================================
// sort fill products