import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Schedule from '../../pages/Dashboard/Schedule';
import Solutions from '../../pages/Dashboard/Solutions';
import Home from '../../pages/Dashboard/Home';

import styles from './content.module.css';

function Content() {
  return (
    <main className={styles.content}>
      <Switch>
        <Route path="/dashboard/" component={ Home } exact />

        <Route
          path="/dashboard/schedule"
          render={ (props) => (<Schedule
            { ...props }
            day="Agenda do Dia"
          />) }
        />

        <Route path="/dashboard/solutions" component={ Solutions } exact />
      </Switch>
    </main>
  );
}

export default Content;
