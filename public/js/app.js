console.log('client side Javascript')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  const location = search.value

  messageOne.textContent='...loading'
  messageTwo.textContent=''
  
  fetch(`/weather?address=${location}`).then((response,error)=>{
  response.json().then((data)=>{
    if(data.error){
      // console.log(data.error)
      messageOne.textContent = data.error
    }else{
      // console.log(data.location)
      // console.log(data.forecastDetails).
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecastDetails
    }
  })
  
})

})

// search.addEventListener('change',(e)=>{
//   e.preventDefault()

//   console.log('value', e.target.value)
// })