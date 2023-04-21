import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import PlanetsScreen from './screens/planets';
import PlanetScreen from './screens/planet';
import NotFoundScreen from './screens/notfound';


const Routes = () => {
    return (
        <BrowserRouter>
            <React.StrictMode>
                <Switch>
                    <Route exact path='/' component={PlanetsScreen} />
                    <Route exact path='/planet/:id' component={PlanetScreen} />
                    <Route path='*' >
                        <NotFoundScreen />
                    </Route>
                </Switch>
            </React.StrictMode>
        </BrowserRouter>
    )
}

export default Routes;