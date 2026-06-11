import {useState, useEffect} from 'react'
import Sidebar from '../Sidebar'
import './index.css'

const TaskDetails = props => {
  const [task, setTask] = useState(null)

  const {id} = props.match.params

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('tasksList')) || []
    const found = all.find(each => each.id === parseInt(id))
    setTask(found)
  }, [id])

  const onBack = () => {
    const {history} = props
    history.replace('/dashboard')
  }

  const getBadgeClass = p => {
    if (p === 'high') return 'high-badge'
    if (p === 'medium') return 'med-badge'
    return 'low-badge'
  }

  const getStatusText = s => {
    if (s === 'inprogress') return 'In Progress'
    if (s === 'todo') return 'To Do'
    return 'Done'
  }

  const formatDate = d => {
    const date = new Date(d)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (task === null) {
    return (
      <div className="detail-wrap">
        <Sidebar history={props.history} onClickAddTask={() => {}} />
        <div className="detail-body">
          <p className="not-found">Task not found</p>
        </div>
      </div>
    )
  }

  const {title, description, priority, deadline, status} = task

  return (
    <div className="detail-wrap">
      <Sidebar history={props.history} onClickAddTask={() => {}} />
      <div className="detail-body">
        <button type="button" className="back-btn" onClick={onBack}>
          Back to dashboard
        </button>
        <span className={`p-badge ${getBadgeClass(priority)}`}>
          {priority.toUpperCase()}
        </span>
        <h1 className="detail-title">{title}</h1>
        <div className="info-card">
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="info-val">{getStatusText(status)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Deadline</span>
            <span className="info-val bold-val">{formatDate(deadline)}</span>
          </div>
        </div>
        <div className="desc-card">
          <p className="desc-top">DESCRIPTION</p>
          <p className="desc-body">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails