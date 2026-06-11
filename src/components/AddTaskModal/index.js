import {useState} from 'react'
import './index.css'

const AddTaskModal = props => {
  const {onAddTask, onClose, tasksCount} = props
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('todo')
  const [deadline, setDeadline] = useState('')
  const [err, setErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const todayDate = new Date().toISOString().split('T')[0]

  const onSubmit = e => {
    e.preventDefault()

    if (title === '') {
      setErr(true)
      setErrMsg('Title is required')
      return
    }
    if (title.length > 50) {
      setErr(true)
      setErrMsg('Title should not exceed 50 characters')
      return
    }
    if (desc.length > 200) {
      setErr(true)
      setErrMsg('Description should not exceed 200 characters')
      return
    }
    if (deadline === '') {
      setErr(true)
      setErrMsg('Deadline is required')
      return
    }
    if (deadline <= todayDate) {
      setErr(true)
      setErrMsg('Deadline must be a future date')
      return
    }

    const newTask = {
      id: tasksCount + 1,
      title,
      description: desc,
      priority,
      status,
      deadline,
      createdAt: new Date().toISOString(),
    }

    onAddTask(newTask)
  }

  return (
    <div className="overlay">
      <div className="modal-box">
        <div className="modal-top">
          <h2 className="modal-title">Add New Task</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="task-title">
              TASK TITLE
            </label>
            <input
              type="text"
              id="task-title"
              className="field-input"
              placeholder="e.g. Design homepage"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="task-desc">
              DESCRIPTION
            </label>
            <textarea
              id="task-desc"
              className="field-input field-textarea"
              placeholder="Describe the task..."
              value={desc}
              rows={4}
              onChange={e => setDesc(e.target.value)}
            />
          </div>
          <div className="two-col">
            <div className="field-group">
              <label className="field-label" htmlFor="task-priority">
                PRIORITY
              </label>
              <select
                id="task-priority"
                className="field-input"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="task-status">
                STATUS
              </label>
              <select
                id="task-status"
                className="field-input"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="task-deadline">
              DEADLINE
            </label>
            <input
              type="date"
              id="task-deadline"
              className="field-input"
              value={deadline}
              min={todayDate}
              onChange={e => setDeadline(e.target.value)}
            />
          </div>
          {err && <p className="err-msg">*{errMsg}</p>}
          <div className="modal-btns">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal