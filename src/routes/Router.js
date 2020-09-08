import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import Loading from '../icons/loading.svg'

export const hasRoutes = (routes) => {
  if (routes && routes.length > 0) {
    return true;
  }
  return false;
};

const CustomRoute = ({ privated, ...rest }) => {
  const { authenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container ">
        <img src={Loading} alt="loading" />
        <p>Preparando ambiente seguro...</p>
      </div>
  )
  }
  if (privated && !authenticated) {
    return <Redirect to="/" />
  }
  
  return <Route {...rest} />
}

const getRoutes = (routes) => {
  if (hasRoutes(routes)) {
    return routes.map((route, i) => (
      <CustomRoute
        key={i}
        path={route.path}
        exact
        component={route.component}
        privated={route.privated}
      />
    ));
  }
  throw new Error('Routes component require routes as props')
}

const Routes = ({ routes }) => (
  <Switch>{getRoutes(routes)}</Switch>
)

export default Routes
