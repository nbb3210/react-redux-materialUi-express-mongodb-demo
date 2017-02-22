import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import accountReducer from '../reducers/accountReducer'
import photoReducer from '../reducers/photoReducer'
import commentReducer from '../reducers/commentReducer'

var store;

export default {
	configureStore: () => {
		const reducers = combineReducers({
			account: accountReducer,
			photo: photoReducer,
			comment: commentReducer
		})

		store = createStore(
			reducers,
			applyMiddleware(thunk)
		)

		return store
	},

	currentStore: () => {
		return store
	}
}