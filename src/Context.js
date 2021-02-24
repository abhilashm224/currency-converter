import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import daggy from 'daggy'

import { fetchCurrencyRates, fetchLatestRates, fetchAllCurrencies, fetchHistoricalRates } from './api'
import RemoteData from './api/remoteData'

const Actions = daggy.taggedSum('Actions', {
  HttpRequest: ['field']
})

const reducer = (state, action) => action.cata({
  HttpRequest: field => ({ ...state, ...field })
})

//Setting initial state for the application
const initialState = {
  currencyRates: RemoteData.NotAsked,
  latestRates: RemoteData.NotAsked,
  currencyList: RemoteData.NotAsked,
  searchHistory: []
}

const ReducerContext = React.createContext(initialState)

function ReducerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getCurrencyRates = (data) => {
    dispatch(Actions.HttpRequest({ currencyRates: RemoteData.Loading }))
    fetchCurrencyRates(data).then(res =>
      dispatch(Actions.HttpRequest({ currencyRates: res })))
  }
  const getHistoricalRates = (date, symbols) => {
    dispatch(Actions.HttpRequest({ currencyRates: RemoteData.Loading }))
    fetchHistoricalRates(date, symbols).then(res =>
      dispatch(Actions.HttpRequest({ currencyRates: res })))
  }
  const getLatestRates = (data) => {
    dispatch(Actions.HttpRequest({ latestRates: RemoteData.Loading }))
    fetchLatestRates(data).then(res =>
      dispatch(Actions.HttpRequest({ latestRates: res })))
  }

  const getAllCurrencies = () => {
    dispatch(Actions.HttpRequest({ currencyList: RemoteData.Loading }))
    fetchAllCurrencies().then(res =>
      dispatch(Actions.HttpRequest({ currencyList: res })))
  }

  const storeHistory = (data)=>{
	if(data){
		state.searchHistory.push(data)
	}
	return false
}

  return (
    <ReducerContext.Provider value={{
      state, dispatch, getCurrencyRates, getLatestRates, getAllCurrencies,getHistoricalRates, storeHistory
    }}
    >
      {children}
    </ReducerContext.Provider>
  )
}

ReducerProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { ReducerContext, ReducerProvider, Actions }
