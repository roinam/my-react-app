import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Portal extends Component {
  render() {

    // Creating portal
    return ReactDOM.createPortal(
      <button style={{marginLeft: '10px'}}>
        Portal - Click Me
      </button>,
      document.getElementById('portal')
    );
  }
}