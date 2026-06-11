import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import initialTasksList from './data/task'
import Sidebar from '../Sidebar'
import TaskCard from '../TaskCard'
import AddTaskModal from '../AddTaskModal'
import './index.css'

const Dashboard = props => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('tasksList')
    if (saved !== null) {
      setTasks(JSON.parse(saved))
    } else {
      setTasks(initialTasksList)
      localStorage.setItem('tasksList', JSON.stringify(initialTasksList))
    }
  }, [])

  const onAddTask = newTask => {
    const updated = [...tasks, newTask]
    setTasks(updated)
    localStorage.setItem('tasksList', JSON.stringify(updated))
    setShowModal(false)
  }

  const onDeleteTask = id => {
    const updated = tasks.filter(each => each.id !== id)
    setTasks(updated)
    localStorage.setItem('tasksList', JSON.stringify(updated))
  }

  const onChangeStatus = (id, newStatus) => {
    const updated = tasks.map(each => {
      if (each.id === id) {
        return {...each, status: newStatus}
      }
      return each
    })
    setTasks(updated)
    localStorage.setItem('tasksList', JSON.stringify(updated))
  }

  const getList = status => {
    let list = tasks.filter(each => each.status === status)
    if (filter !== 'all') {
      list = list.filter(each => each.priority === filter)
    }
    return list
  }

  const todoList = getList('todo')
  const inprogressList = getList('inprogress')
  const doneList = getList('done')

  const renderCards = list => {
    if (list.length === 0) {
      return <p className="no-task">No tasks here</p>
    }
    return list.map(each => (
      <Link key={each.id} to={`/task/${each.id}`} className="card-link">
        <TaskCard
          taskDetails={each}
          onDeleteTask={onDeleteTask}
          onChangeStatus={onChangeStatus}
        />
      </Link>
    ))
  }

  return (
    <div className="dash-wrap">
      <Sidebar
        history={props.history}
        onClickAddTask={() => setShowModal(true)}
      />
      <div className="content-area">
        <div className="top-bar">
          <span className="bar-label">Filter by priority</span>
          <select
            className="bar-select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="board">
          <div className="col">
            <div className="col-head">
              <div className="col-left">
                <span className="dot blue-dot" />
                <h2 className="col-title">TO DO</h2>
              </div>
              <span className="badge blue-badge">{todoList.length}</span>
            </div>
            {renderCards(todoList)}
          </div>

          <div className="col">
            <div className="col-head">
              <div className="col-left">
                <span className="dot orange-dot" />
                <h2 className="col-title">IN PROGRESS</h2>
              </div>
              <span className="badge orange-badge">{inprogressList.length}</span>
            </div>
            {renderCards(inprogressList)}
          </div>

          <div className="col">
            <div className="col-head">
              <div className="col-left">
                <span className="dot green-dot" />
                <h2 className="col-title">DONE</h2>
              </div>
              <span className="badge green-badge">{doneList.length}</span>
            </div>
            {renderCards(doneList)}
          </div>
        </div>
      </div>

      {showModal && (
        <AddTaskModal
          onAddTask={onAddTask}
          onClose={() => setShowModal(false)}
          tasksCount={tasks.length}
        />
      )}
    </div>
  )
}

export default Dashboard