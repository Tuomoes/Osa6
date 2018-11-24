import React from 'react'
import { 
    voting, 
    votingNotificationSetting,
    notificationClearing
 } from '../reducers/anecdoteReducer'
 import Filter from './Filter'
 import {connect} from 'react-redux'

class AnecdoteList extends React.Component {

    vote = (anecdote) => {
        this.props.voting(anecdote.id)
        this.props.votingNotificationSetting(anecdote.id)
        setTimeout(() => {
            this.props.notificationClearing(anecdote.id)
        }, 5000)
    } 



    render() {
        const anecdotes = this.props.anecdotes
        const filter = this.props.filter
		return (
		    <div>
				<h2>Anecdotes</h2>
                <Filter/>
                {anecdotes.filter(x => filter === undefined || x.content.includes(filter))
                    .sort((a, b) => b.votes - a.votes)
                    .map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    voting,
    votingNotificationSetting,
    notificationClearing
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
