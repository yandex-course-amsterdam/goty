import React from 'react';

import style from './style.css';

import { Header } from 'app/components';

export const App = () => {
  return (
    <section className={style.app}>
      <Header />
    </section>
  );
};
