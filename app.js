import { renderTask, renderFooter } from './library/index.js'

let tasks = []
export let filter = 'all'

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
  redrawTasks(tasks)
  renderCounter(tasks)

  $input.value = ''
})

function redrawTasks(taskList = []) {
  $taskList.innerHTML = ''

  taskList.forEach(task => {
    const $task = renderTask(task)
    $taskList.insertAdjacentHTML('beforeend', $task)
  })

  if (!tasks?.length) return

  const $footer = renderFooter(taskList, filter)
  $taskList.insertAdjacentHTML('beforeend', $footer)

  const $filters = document.querySelector('.filters')
  const $all = $filters.querySelector('.all')
  const $completed = $filters.querySelector('.completed')
  const $uncompleted = $filters.querySelector('.uncompleted')
  const $clear = document.querySelector('.clear')

  $all.addEventListener('click', () => {
    filter = 'all'
    redrawTasks(tasks)
    renderCounter(tasks)
  })

  $completed.addEventListener('click', () => {
    filter = 'completed'
    const completedTasks = getCompletedTasks(tasks)
    redrawTasks(completedTasks)
    renderCounter(tasks)
  })

  $uncompleted.addEventListener('click', () => {
    filter = 'todo'
    const uncompletedTasks = getUncompletedTasks(tasks)
    redrawTasks(uncompletedTasks)
    renderCounter(tasks)
  })

  $clear.addEventListener('click', () => {
    tasks = []
    redrawTasks(tasks)
    renderCounter(tasks)
  })

  watchTasks()
}


function watchTasks() {
  const $tasks = document.querySelectorAll('.task')

  $tasks.forEach($task => {
    const id = $task.getAttribute('id')
    const $toggleTask = $task.querySelector('.toggle')
    const $deleteTask = $task.querySelector('.delete-task')

    $toggleTask.addEventListener('click', () => {
      tasks = toggleTaskStatus(tasks, id)
      redrawTasks(tasks)
      renderCounter(tasks)
    })

    $deleteTask.addEventListener('click', () => {
      tasks = deleteTask(tasks, id)
      redrawTasks(tasks)
      renderCounter(tasks)
    })
  })
}




// Item Actions
function createTask(tasks, task) {
  const newTask = {
    id: Date.now(),
    title: task,
    status: TaskStatus.TODO,
  }

  tasks.unshift(newTask)

  return tasks
}

function toggleTaskStatus(tasks, id) {
  const foundTask = findTask(tasks, id)
  const isCompleted = foundTask.status === TaskStatus.COMPLETED

  foundTask.status = isCompleted
    ? TaskStatus.TODO
    : TaskStatus.COMPLETED

  return tasks
}

function findTask(tasks, id) {
  return tasks.find(task => task.id === Number(id))
}

function getCompletedTasks(tasks) {
  return tasks.filter(task => task.status !== TaskStatus.TODO)
}

function getUncompletedTasks(tasks) {
  return tasks.filter(task => task.status !== TaskStatus.COMPLETED)
}

function deleteTask(tasks, id) {
  return tasks.filter(task => task.id !== Number(id))
}


// Render counter
function renderCounter(tasks) {
  const $counter = document.createElement('div')
  $counter.classList.add('counter')
  $counter.innerHTML = `${tasks.length} tasks totali`

  $taskList.append($counter)
}