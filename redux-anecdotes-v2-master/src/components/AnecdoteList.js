import React from 'react'
import { 
    voting, 
    votingNotificationSetting,
    notificationClearing
 } from '../reducers/anecdoteReducer'
 import Filter from './Filter'

class AnecdoteList extends React.Component {

    vote = async (anecdote) => {
        this.props.store.dispatch(voting(anecdote.id))
        this.props.store.dispatch(votingNotificationSetting(anecdote.id))
        setTimeout(() => {
            this.props.store.dispatch(notificationClearing(anecdote.id))
        }, 5000)
    } 



    render() {
        const anecdotes = this.props.store.getState().anecdotes
        const filter = this.props.store.getState().filter
		return (
		    <div>
				<h2>Anecdotes</h2>
                <Filter store={this.props.store} />
				{anecdotes.filter(x => filter === undefined || x.content.includes(filter)).sort((a, b) => b.votes - a.votes).map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
                            has {anecdote.votes}
							<button onClick={() => 
								this.vote(anecdote)
							}>
                                vote
							</button>
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default AnecdoteList
