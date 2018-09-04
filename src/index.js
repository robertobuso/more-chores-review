document.addEventListener('DOMContentLoaded', () => {

  // fetch list of chores from database
  fetch('http://localhost:3000/chores')
    .then(response =>response.json())
    .then(data => {
      // find the 'chore list div'
      let choreList = document.getElementById('chore-list')

      // iterate through our chore-data-array
      data.forEach(chore => {
        // - create html element that represents a single chore
        let choreItem = document.createElement('div')
        let choreTitle = document.createElement('p')
        choreTitle.innerText = chore.title
        let chorePriority = document.createElement('p')
        chorePriority.innerText = chore.priority
        let choreDuration = document.createElement('p')
        choreDuration.innerText = chore.duration

        choreItem.append(choreTitle, chorePriority, choreDuration)

        // append the element we just created to the chore list
        choreList.append(choreItem)
      });
    })

    // creating new chores using HTML form

    // locate form containing data for chore creation
    let newChoreForm = document.getElementById('new-chore-form')
    newChoreForm.addEventListener('submit', (event) => {
      event.preventDefault()
      // obtain values for title, priority, duration
      let titleInput = document.getElementById('title')
      let priorityInput = document.getElementById('priority')
      let durationInput = document.getElementById('duration')

      // 'create' new form by updating database with values from form
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
        // create new chore HTML element using new chore data
        let choreItem = document.createElement('div')
        let choreTitle = document.createElement('p')
        choreTitle.innerText = chore.title
        let chorePriority = document.createElement('p')
        chorePriority.innerText = chore.priority
        let choreDuration = document.createElement('p')
        choreDuration.innerText = chore.duration
        choreItem.append(choreTitle, chorePriority, choreDuration)

        //append the HTML element we just created to the chore list
        let choreList = document.getElementById('chore-list')
        choreList.append(choreItem)
      })

    })
})