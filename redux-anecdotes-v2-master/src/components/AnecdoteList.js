import React from 'react'
import { 
    voting, 
    votingNotificationSetting,
    notificationClearing
 } from '../reducers/anecdoteReducer'

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

		return (
			<div>
				<h2>Anecdotes</h2>
				{anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
