import { TaskStatus, filter } from "../app.mjs"

// render functions
export function renderTask(task) {
  const isCompleted = task.status === TaskStatus.COMPLETED

  return (`
    <div class='task ${isCompleted ? 'active' : ''}' id='${task.id}'>
      <div class='toggle'>
        ${isCompleted
      ? '<i class="fa fa-check"></i>'
      : ''
    }
      </div>
      <div class='title'>${task.title}</div>
      <div class='delete-task'>
        <i class='fa fa-trash'></i>
      </div>
    </div>
  `)
}

export function renderFooter(taskList) {
  // <div class='total-items'>${taskList.length} tasks</div>
  return `
    <div class='task-list-footer ${!taskList.length ? 'empty' : ''}'>
      <div class='filters'>
        <div class='filter all ${filter === 'all' ? 'active' : ''}'>Tutti</div>
        <div class='filter completed ${filter === 'completed' ? 'active' : ''}'>Completati</div>
        <div class='filter uncompleted ${filter === 'uncompleted' ? 'active' : ''}'>Da fare</div>
      </div>
      <div class='clear'>Cancella tutti</div>
    </div>
  `
}