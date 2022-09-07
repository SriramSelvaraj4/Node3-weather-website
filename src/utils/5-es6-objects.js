const name = 'Sriram'
const userAge = 24

const user={
  name,
  age:userAge,
  location:'India'
}

console.log(user)

const product = {
  label:"Red Notebook",
  price: 3,
  stock: 201,
  salePrice:undefined
}

const transaction = (type, {label, stock})=>{
  console.log(type, label, stock)
}

transaction('order', product)