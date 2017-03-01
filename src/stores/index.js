import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import accountReducer from '../reducers/accountReducer'
import photoReducer from '../reducers/photoReducer'

var store;

export default {
	configureStore: () => {
		const reducers = combineReducers({
			account: accountReducer,
			photo: photoReducer,
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