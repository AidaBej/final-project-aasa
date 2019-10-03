import React, { Component } from 'react'

export default class SaveBtn extends Component {
  state = {
    name: "toto"
  }

  render() {
    return (
      <div>
        <button>{this.state.toto}</button>
      </div>
    )
  }
}
