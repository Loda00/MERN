import React, { Component } from 'react'
import { render }  from 'react-dom'
import axios from 'axios'
import { throws, rejects } from 'assert';
import { resolve } from 'path';


class App extends Component {

    constructor () {
        super()

        this.state = {
            title: '',
            desc: '',
            tasks: [],
            idTask: null
        }

        this.addTask = this.addTask.bind(this)
        this.catchForm = this.catchForm.bind(this)
        this.getTasks = this.getTasks.bind(this)
    }

    addTask (e) {

        if (this.state.title.length < 3) {
            console.log(`el titulo debe tener mas de 3 digitos`)
            M.toast({html: 'Form Incomplete !'})
            e.preventDefault()
            return
        }
        
        const {title, desc, idTask} = this.state

        this.setTask(idTask,{title,description: desc})

        e.preventDefault()
       
    }
    
    setTask (id, objTask) {
    
            if (id === undefined || id === null) {
    
                console.log('add', id)
                axios.post(`/api/data`,objTask).then(rs => {
                    M.toast({html: 'Task saved !'})
                    this.cleanForm()
                    this.getTasks()
                })
                .catch(err => console.log(err))
    
            } else {
    
                axios.put(`/api/data/${id}`,objTask)
                .then(rs => {
                    M.toast({html: 'Task Updated !'})
                    this.cleanForm()
                    this.getTasks()
                })
                .catch(err => console.log(err))
            }
    }

    catchForm (e) {

        const { name, value } = e.target

        this.setState({
            [name]: value
        })

    }

    getTasks () {

        axios.get(`/api/data`)
        .then(res => {
            this.setState({tasks: res.data.db})
            console.log(this.state.tasks)
        })
        .catch(err => console.log(`err`, err))
    }

    componentWillMount () {
        this.getTasks()
    }

    deleteTask (ide) {

        console.log('e', ide)
        axios.delete(`/api/data/${ide}`)
        .then(rs => this.getTasks())
        .catch(err => console.log('err ', err))

    }

    cleanForm () {
        this.setState({title: '', desc: ''})
    }

    editTask (id) {

        console.log(`id `, id)

        this.setState({idTask: id})

        axios.get(`api/data/${id}`)
        .then(rs => {

            const { description, title } = rs.data.db

            this.setState({
                title: title,
                desc: description
            })
        })
        .catch(err => console.log(err))

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
                                            <button className="btn light-blue darken-4">Send</button>
                                            {/* <button className="btn light-blue darken-4" onClick={() => this.cleanForm()}>Clean</button> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s1"></div>
                        <div className="col s7" >
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td><i onClick={() => this.editTask(task._id)} className="small material-icons">edit</i></td>
                                                    <td><i onClick={() => this.deleteTask(task._id)} className="small material-icons">delete</i></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App

// library reactjs => tcomb

