import type { Component } from 'solid-js';

import styles from './App.module.css';
import CmdPalette from '../src/CmdPalette';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <CmdPalette />
    </div>
  );
};

export default App;
