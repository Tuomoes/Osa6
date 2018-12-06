import anecdotesService from '../services/anecdotes';
const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

//const initialState = { anecdotes: anecdotesAtStart.map(asObject) }
const initialState = {anecdotes: []}

const reducer = (store = initialState, action) => {
	if (action.type==='VOTE') {
		const old = store.anecdotes.filter(a => a.id !==action.id)
		const voted = store.anecdotes.find(a => a.id === action.id)

		return {
            anecdotes: [...old, { ...voted, votes: voted.votes+1} ], 
            notification: store.notification,
            filter: store.filter
        }
	}
	if (action.type === 'CREATE') {
        
        return {
            anecdotes: [...store.anecdotes, action.anecdote],
            notification: store.notification,
            filter: store.filter
        }
    }
    if (action.type === 'SET_VOTING_NOTIFICATION') {
        
        const newNotification = 'you voted \'' + store.anecdotes.find(x => x.id === action.id).content + '\''
        return {
            anecdotes: store.anecdotes,
            notification: newNotification,
            filter: store.filter
        }
    }

    if (action.type === 'CLEAR_NOTIFICATION') {
        
        return {
            anecdotes: store.anecdotes,
            notification: '',
            filter: store.filter
        }
    }

    if (action.type === 'SET_FILTER') {
        return {
            anecdotes: store.anecdotes,
            notification: store.notification,
            filter: action.filterValue
        }
    }

    if (action.type === 'INIT_ANECDOTES') {
        return {
            anecdotes: store.anecdotes.concat(action.anecdotes),
            notification: store.notification,
            filter: store.filter
        }
    }

	return store
}


export const voting = (anecdote) => {
    return async (dispatch) => 
    {
        console.log('voting action creator called')
        await anecdotesService.update({content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1})
        dispatch({
            type: 'VOTE',
            id: anecdote.id
        })
    }
}

export const anecdoteCreation = (content) => {
    return async (dispatch) => 
    {
        console.log('anecdoteCreation action creator called')
        const anecdote = await anecdotesService.createNew(content)
        dispatch({
            type: 'CREATE',
            anecdote
        })
    }
}

export const votingNotificationSetting = (id) => {
    console.log('voting notification setting called')
    {
        return {
            type: 'SET_VOTING_NOTIFICATION',
            id: id
        }
    }
}

export const notificationClearing = () => {
    console.log('voting notification setting called')
    {
        return {
            type: 'CLEAR_NOTIFICATION'
        }
    }
}

export const filterSetting = (filterValue) => {
    console.log('filter setting called')
    {
        return {
            type: 'SET_FILTER',
            filterValue: filterValue
        }
    }
}

export const anecdotesInitialization = () => {
    return async (dispatch) => {
        const anecdotes = await anecdotesService.getAll()
        console.log('anecdote initialization called')
        dispatch({
                type: 'INIT_ANECDOTES',
                anecdotes: anecdotes
        })
    }
}

export default reducer