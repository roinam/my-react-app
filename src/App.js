import "../node_modules/bootstrap/dist/js/bootstrap.bundle"// ../node_modules/bootstrap/scss/bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import $ from 'jquery';
import './App.css';

import Header from './component/Header';
import { PageBody } from './component/PageBody';
import {ErrorBoundary} from "./component/ErrorBoundary";
import { Portal } from "./Portal";

function App() {
  return (
    <ErrorBoundary>
      <div className="App" onClick={() => console.log("I was clicked...")}>      
        <Header />
        <PageBody />

        <Portal></Portal>
      </div>
    </ErrorBoundary>
  );
}

export default App;
