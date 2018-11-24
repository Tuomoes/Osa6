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
        return (
		    <div>
				<h2>Anecdotes</h2>
                <Filter/>
                {this.props.anecdotesToShow.map(anecdote =>

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
        anecdotesToShow: state.anecdotes.filter(x => state.filter === undefined || x.content.includes(state.filter))
            .sort((a, b) => b.votes - a.votes)
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
