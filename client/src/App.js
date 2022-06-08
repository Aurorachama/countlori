import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { Home } from './pages/Home/Home';
import UserRoute from './routes/UserRoutes';
// import 'antd/dist/antd.css';
import { Navbar } from './components/Navbar/Navbar';
import { AdminPresets } from './pages/Admin/AdminPresets';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <UserRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <UserRoute exact path='/presets' component={AdminPresets} />
        </Switch>
      </BrowserRouter>

    </div>
  )
}

export default App;
