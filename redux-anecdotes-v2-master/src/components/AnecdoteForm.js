import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import {connect} from 'react-redux'
import anecdotesService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdotesService.createNew(content)
    this.props.anecdoteCreation(newAnecdote)
    
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

const mapDispatchToProps = {
    anecdoteCreation
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
