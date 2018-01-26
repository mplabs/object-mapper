import React, { Component } from 'react'
import objectMapper from 'object-mapper'
import * as _ from 'lodash'

import { Editor } from './editor'

export class App extends Component {

  get output() {
    const { input, map } = this.state
    const output = objectMapper(input, map)
    return JSON.stringify(output, null, '  ');
  }

  constructor() {
    super()
    this.setState({
      input: {},
      map: {},
      errors: {
        input: false,
        map: false
      }
    })
  }

  handleInput = (evt) => {
    try {
      let input
      eval(`input=${evt.target.textContent}`)
      this.setState({
        input,
        errors: { ...this.state.errors, input: false }
      })
    } catch (e) {
      console.log(e);
      this.setState({ errors: { ...this.state.errors, input: true } })
    }
  }

  handleMap = (evt) => {
    try {
      let map;
      eval(`map=${evt.target.textContent}`);
      this.setState({
        map,
        errors: { ...this.state.errors, map: false }
      });
    } catch (e) {
      console.log(e)
      this.setState({ errors: { ...this.state.errors, map: true } })
    }
  }

  render = ({}, { errors }) => (
    <div id="app">
      <header>
        <h1>Object Mapper Demo</h1>
      </header>
      <div class="row">
        <div class="column" error={errors.input}>
          <label htmlFor="input">Input</label>
          <Editor id="input" tagName="code" onChange={this.handleInput} />
        </div>
        <div class="column"  error={errors.map}>
          <label htmlFor="map">Map</label>
          <Editor id="map" tagName="code" onChange={this.handleMap} />
        </div>
        <div class="column">
          <label htmlFor="output">Output</label>
          <Editor id="output" tagName="code" html={this.output} />
        </div>
      </div>
    </div>
  )
}
