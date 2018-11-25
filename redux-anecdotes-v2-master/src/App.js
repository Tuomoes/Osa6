import React from 'react'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdotesService from './services/anecdotes';
import {anecdotesInitialization} from './reducers/anecdoteReducer';
import {connect} from 'react-redux';



class App extends React.Component {

    componentDidMount = async () => {
        const anecdotes = await anecdotesService.getAll()
        console.log(anecdotes)
        this.props.anecdotesInitialization(anecdotes)
      }

	render() {
		const anecdotes = this.props.store.getState().anecdotes
		return (
			<div>
				<h1>Programming anecdotes</h1>
				<Notification/>
				<AnecdoteList/>
				<AnecdoteForm/>
			</div>
		)
	}
}

export default connect(
    null,
    { anecdotesInitialization }
  )(App)
