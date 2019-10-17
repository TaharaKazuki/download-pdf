import React, { Component } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'

class App extends Component {
  state = {
    name: '',
    receipId: 0,
    price1: 0,
    price2: 0
  }

  handleChange = ({ target: { value, name }}) => this.setState({[name]: value})

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(()=> axios.get('fetch-pdf', { responseType: 'blob '}))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

        saveAs(pdfBlob, 'newPdf.pdf')
      })
  }
  render() {
    return (
      <div className="App">
        <input type="text" placeholder="お客様名を入れてください" onChange={this.handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receipId" onChange={this.handleChange}/>
        <input type="number" placeholder="price1" name="price1" onChange={this.handleChange}/>
        <input type="number" placeholder="price2" name="price2" onChange={this.handleChange}/>
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    ) 
  }
}

export default App