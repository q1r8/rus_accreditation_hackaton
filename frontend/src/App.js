import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './routes';
import { MAIN_ROUTE } from './utils/consts';
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ path, component }) => <Route key={path} path={path} component={component} exact />)}
        <Redirect to={MAIN_ROUTE} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
