import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';
import anecdotesService from './services/anecdotes';
import {anecdoteInitialization} from './reducers/anecdoteReducer';

anecdotesService.getAll().then(anecdotes =>
    anecdotes.forEach(anecdote => {
        console.log(anecdote)
        store.dispatch(anecdoteInitialization(anecdote))
    })
  )

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
            <App store={store}/>
        </Provider>,
		document.getElementById('root')
	)
}

render()
store.subscribe(render)