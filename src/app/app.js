import React, { Component } from 'react'
import { render }  from 'react-dom'
import axios from 'axios'


class App extends Component {

    constructor () {
        super()

        this.state = {
            title: '',
            desc: ''
        }

        this.addTask = this.addTask.bind(this)
        this.catchForm = this.catchForm.bind(this)
    }

    addTask (e) {
        console.log(`add task `)

        if (this.state.title.length < 3) {
            console.log(`el titulo debe tener mas de 3 digitos`)
            e.preventDefault()
            return
        }

        axios.post(`/api/data`, {
            title: this.state.title,
            description: this.state.desc
        }).then(rs => {
            console.log(rs)
            M.toast({html: 'Task saved !'})
            this.setState({title: '', desc: ''})
        })
        .catch(err => console.log(err))

        e.preventDefault()
    }

    catchForm (e) {

        const { name, value } = e.target

        this.setState({
            [name]: value
        })

    }

    render () {
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/" >MERN Stack</a>
                    </div>
                </nav>

                <div>
                    <div className="row">
                        <div className="col s3" >
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" value={this.state.title} onChange={this.catchForm} type="text" placeholder="Task" />
                                            </div>
                                        </div>
                                        <div className="row">
                                                <textarea name="desc" onChange={this.catchForm} value={this.state.desc} placeholder="Task Description" className="materialize-textarea col s12"></textarea>
                                        </div>
                                        <div className="row">
                                            <button className="btn light-blue darken-4 col s12">Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7" >

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App

// library reactjs => tcomb

