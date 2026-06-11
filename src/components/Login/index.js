import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const LoginForm = props => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [showErr, setShowErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const onSuccess = token => {
    const {history} = props
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    history.replace('/dashboard')
  }

  const onFailure = msg => {
    setShowErr(true)
    setErrMsg(msg)
  }

  const onSubmit = async e => {
    e.preventDefault()
    const details = {email, password: pass}
    const url =
      'https://csyibgv5y0.execute-api.eu-north-1.amazonaws.com/api/auth/signin'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      onSuccess(data.token)
    } else {
      onFailure(data.message)
    }
  }

  const renderEmailField = () => (
    <>
      <label className="field-label" htmlFor="email">
        EMAIL
      </label>
      <input
        type="text"
        id="email"
        className="field-input"
        value={email}
        placeholder="you@example.com"
        onChange={e => setEmail(e.target.value)}
      />
    </>
  )

  const renderPassField = () => (
    <>
      <label className="field-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="field-input"
        value={pass}
        placeholder="........."
        onChange={e => setPass(e.target.value)}
      />
    </>
  )

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="login-wrap">
      <div className="left-side">
        <img
          src="https://img.icons8.com/fluency/48/clipboard.png"
          alt="logo"
          className="logo-img"
        />
        <h1 className="app-name">Task Manager</h1>
        <p className="app-desc">Sign in to open your project dashboard.</p>
        <ul className="feature-list">
          <li>Plan work across To Do, In Progress, and Done</li>
          <li>Track priorities and deadlines in one place</li>
          <li>Your board is saved in this browser</li>
        </ul>
      </div>
      <div className="right-side">
        <div className="form-card">
          <h2 className="form-heading">Welcome back</h2>
          <p className="form-sub">
            Use your account email and password to continue.
          </p>
          <form onSubmit={onSubmit}>
            <div className="field-wrap">{renderEmailField()}</div>
            <div className="field-wrap">{renderPassField()}</div>
            {showErr && <p className="err-text">*{errMsg}</p>}
            <button type="submit" className="sign-in-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm