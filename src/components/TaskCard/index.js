import './index.css'

const TaskCard = props => {
  const {taskDetails, onDeleteTask, onChangeStatus} = props
  const {id, title, description, priority, deadline, status} = taskDetails

  const getBadgeClass = () => {
    if (priority === 'high') return 'high-badge'
    if (priority === 'medium') return 'med-badge'
    return 'low-badge'
  }

  const shortDesc =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description

  const onDelete = e => {
    e.preventDefault()
    onDeleteTask(id)
  }

  const onStatus = e => {
    e.preventDefault()
    onChangeStatus(id, e.target.value)
  }

  return (
    <div className="card">
      <div className="card-top">
        <span className={`p-badge ${getBadgeClass()}`}>
          {priority.toUpperCase()}
        </span>
        {status === 'done' && <span className="done-badge">COMPLETED</span>}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{shortDesc}</p>
      <p className="card-date">
        Deadline: <span className="date-val">{deadline}</span>
      </p>
      <div className="card-bottom">
        <select
          className="status-drop"
          value={status}
          onChange={onStatus}
          onClick={e => e.preventDefault()}
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="button" className="del-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard