import Cookies from 'js-cookie'
import './index.css'

const Sidebar = props => {
  const {onClickAddTask, history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="side-bar">
      <div className="side-top">
        <img
          src="https://img.icons8.com/fluency/48/clipboard.png"
          alt="logo"
          className="side-logo"
        />
        <h1 className="side-title">Task Manager</h1>
        <p className="side-para">Project Dashboard</p>
      </div>
      <div className="side-bottom">
        <button type="button" className="add-btn" onClick={onClickAddTask}>
          + Add Task
        </button>
        <button type="button" className="out-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default Sidebar