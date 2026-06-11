import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/Login'
import Dashboard from './components/Dashboard'
import TaskDetails from './components/TaskDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/task/:id" component={TaskDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App