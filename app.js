import { renderTask, renderFooter } from './library/index.js'

let tasks = []
let filter = 'all'

export const TaskStatus = {
  TODO: 'todo',
  COMPLETED: 'completed'
}

const $form = document.getElementById('form')
const $input = document.getElementById('task')
const $taskList = document.getElementById('task-list')


$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const task = $input.value

  if (!task) {
    alert('Per favore, inserisci un task prima di aggiungerlo')
    return null
  }

  filter = 'all'
  tasks = createTask(tasks, task)
  renderTasks(tasks)
  renderCounter(tasks)

  $input.value = ''
})

function renderTasks(taskList = []) {
  $taskList.innerHTML = ''

  taskList.forEach(task => {
    const $task = renderTask(task)
    $taskList.insertAdjacentHTML('beforeend', $task)
  })

  if (!tasks?.length && !taskList.length) return

  const $footer = renderFooter(taskList, filter)
  $taskList.insertAdjacentHTML('beforeend', $footer)

  const $filters = document.querySelector('.filters')
  const $all = $filters.querySelector('.all')
  const $completed = $filters.querySelector('.completed')
  const $uncompleted = $filters.querySelector('.uncompleted')
  const $clear = document.querySelector('.clear')

  $all.addEventListener('click', () => {
    filter = 'all'
    renderTasks(tasks)
    renderCounter(tasks)
  })

  $completed.addEventListener('click', () => {
    filter = 'completed'
    const completedTasks = getCompletedTasks(tasks)
    renderTasks(completedTasks)
    renderCounter(tasks)
  })

  $uncompleted.addEventListener('click', () => {
    filter = 'todo'
    const uncompletedTasks = getUncompletedTasks(tasks)
    renderTasks(uncompletedTasks)
    renderCounter(tasks)
  })

  $clear.addEventListener('click', () => {
    tasks = clearTasks(tasks)
    renderTasks(tasks)
    renderCounter(tasks)
  })

  watchTasks()
}


function watchTasks() {
  const $tasks = document.querySelectorAll('.task')

  $tasks.forEach($task => {
    const id = $task.getAttribute('id')
    const $taskToggle = $task.querySelector('.toggle')
    const $deleteTask = $task.querySelector('.delete-task')

    $taskToggle.addEventListener('click', () => {
      tasks = toggleTaskStatus(tasks, id)
      renderTasks(tasks)
      renderCounter(tasks)
    })

    $deleteTask.addEventListener('click', () => {
      tasks = deleteTask(tasks, id)
      renderTasks(tasks)
      renderCounter(tasks)
    })
  })
}


/**
 * La funzione createTask riceve due parametri in input, il primo è la lista dei task e il secondo è il titolo del task.
 * Questa funzione deve tornare la lista dei task con il nuovo task aggiunto.
 * Il nuovo task deve avere una struttura ad oggetto, con i seguenti campi: id, title, status.
 * L'id deve essere univoco, utilizzare la seguente istruzione Date.now().
 * Il titolo è la descrizione del todo.
 * Lo status può assumere i seguenti valori: todo, completed
*/
function createTask(tasks, task) {
}

/**
 * La funzione toggleTaskStatus riceve due parametri in input, il primo è la lista dei task e il secondo è l'id del task da segnare come fatto.
 * Questa funzione deve ritornare la lista dei task aggiornata.
 */
function toggleTaskStatus(tasks, id) {
}

/**
 * La funzione findTask riceve due parametri in input, il primo è la lista dei task e il secondo è l'id del task da trovare.
 * Deve ritornare il task con id passato come parametro.
 */
function findTask(tasks, id) {
}

/**
 * La funzione getCompletedTasks riceve in input la lista dei task e deve ritornare solo i task completati.
 */
function getCompletedTasks(tasks) {
}

/**
 * La funzione getUncompletedTasks riceve in input la lista dei task e deve ritornare solo i task che non sono stati ancora completati.
 */
function getUncompletedTasks(tasks) {
}

/**
 * La funzione deleteTask riceve due parametri in input, il primo è la lista dei task e il secondo è l'id del task da eliminare. \
 * Questa funzione deve ritornare la lista dei task senza il task da rimuovere.
 */
function deleteTask(tasks, id) {
}

/**
 * La funzione clearTasks riceve in input la lista dei task e deve ritornare una lista vuota.
 */
function clearTasks(tasks) {
}

/**
 * La funzione renderCounter riceve la lista dei task in input e deve poter mostrare sotto la lista dei task il numero totale dei tasks.
 * N.B: è necessario utilizzare i metodi di manipolazione del DOM e non utilizzare i tag HTML.
 */
function renderCounter(tasks) {
}