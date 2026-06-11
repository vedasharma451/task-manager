import Cookies from 'js-cookie'
import Sidebar from '../Sidebar'
import './index.css'

const NotFound = props => {
  const token = Cookies.get('jwt_token')

  const onClickBack = () => {
    const {history} = props
    if (token !== undefined) {
      history.replace('/dashboard')
    } else {
      history.replace('/login')
    }
  }

  return (
    <div className="notfound-container">
      {token !== undefined && (
        <Sidebar history={props.history} onClickAddTask={() => {}} />
      )}
      <div className="notfound-content">
        <div className="notfound-card">
          <h1 className="notfound-code">404</h1>
          <h2 className="notfound-heading">Page not found</h2>
          <p className="notfound-para">
            The page you are looking for does not exist or was moved.
          </p>
          <button type="button" className="notfound-btn" onClick={onClickBack}>
            {token !== undefined ? 'Back to dashboard' : 'Go to Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound