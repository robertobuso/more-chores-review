document.addEventListener('DOMContentLoaded', () => {
  let choreList = document.getElementById('chore-list')

  // fetch list of chores from database
  fetch('http://localhost:3000/chores')
    .then(response =>response.json())
    .then(data => {
      data.forEach(chore => {
        choreList.append(createChoreDiv(chore))
      });
    })

    // create chore
    let newChoreForm = document.getElementById('new-chore-form')
    newChoreForm.addEventListener('submit', (event) => {
      event.preventDefault()
      let titleInput = document.getElementById('title')
      let priorityInput = document.getElementById('priority')
      let durationInput = document.getElementById('duration')

      fetch('http://localhost:3000/chores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: titleInput.value,
          priority: priorityInput.value,
          duration: durationInput.value
        })
      }).then(response => response.json()).then(chore =>{
        choreList.append(createChoreDiv(chore))
      })

    })

    // delete chore
    choreList.addEventListener('click', (event)=>{
     if (event.target.className === 'delete-button') {
       // delete from database
       fetch(`http://localhost:3000/chores/${event.target.parentNode.dataset.id}`, { method: 'DELETE'})
        .then(response => {
          choreList.removeChild(event.target.parentNode)
        })
        .catch(error => alert(error))
      }
    })

    // edit chore
    choreList.addEventListener('click', (event) => {
      if (event.target.classList.contains('chore-title')) {
        event.target.classList.add('hidden')
        let editTitle = event.target.parentNode.querySelector('input')
        editTitle.classList.remove('hidden')
      }
    })
    
})

function createChoreDiv(chore) {
  let choreItem = document.createElement('div')
  choreItem.innerHTML = `
            <p class='chore-title'>${chore.title}</p>
            <input data-id=${chore.id} name='edit-chore-title' value='${chore.title}' class='hidden' >
            <p>${chore.priority}</p>
            <p>${chore.duration}</p>
            <button class='delete-button'>Delete Chore</button>
        `
  choreItem.classList.add('chore-card')
  choreItem.dataset.id = chore.id 
  return choreItem
}