'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Constants
const STORAGE_KEY = 'youtube_search_history'
const MAX_HISTORY_ITEMS = 10

// Types
interface SearchHistoryState {
  history: string[]
}

type SearchHistoryAction =
  | { type: 'ADD_SEARCH'; payload: string }
  | { type: 'REMOVE_SEARCH'; payload: string }
  | { type: 'LOAD_HISTORY'; payload: string[] }
  | { type: 'CLEAR_HISTORY' }

interface SearchHistoryContextType {
  history: string[]
  addSearch: (query: string) => void
  removeSearch: (query: string) => void
  clearHistory: () => void
}

// Context
const SearchHistoryContext = createContext<SearchHistoryContextType | null>(null)

// Reducer
function searchHistoryReducer(
  state: SearchHistoryState,
  action: SearchHistoryAction
): SearchHistoryState {
  switch (action.type) {
    case 'ADD_SEARCH': {
      const query = action.payload.trim()
      if (!query) return state

      // Remove duplicate if exists and add to beginning
      const filteredHistory = state.history.filter((item) => item !== query)
      const newHistory = [query, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS)

      return { history: newHistory }
    }

    case 'REMOVE_SEARCH': {
      const newHistory = state.history.filter((item) => item !== action.payload)
      return { history: newHistory }
    }

    case 'LOAD_HISTORY': {
      return { history: action.payload }
    }

    case 'CLEAR_HISTORY': {
      return { history: [] }
    }

    default:
      return state
  }
}

// Provider
interface SearchHistoryProviderProps {
  children: ReactNode
}

export function SearchHistoryProvider({ children }: SearchHistoryProviderProps) {
  const [state, dispatch] = useReducer(searchHistoryReducer, { history: [] })

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY)
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory)
        if (Array.isArray(parsedHistory)) {
          dispatch({ type: 'LOAD_HISTORY', payload: parsedHistory })
        }
      }
    } catch (error) {
      console.error('Failed to load search history from localStorage:', error)
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history))
    } catch (error) {
      console.error('Failed to save search history to localStorage:', error)
    }
  }, [state.history])

  const addSearch = (query: string) => {
    dispatch({ type: 'ADD_SEARCH', payload: query })
  }

  const removeSearch = (query: string) => {
    dispatch({ type: 'REMOVE_SEARCH', payload: query })
  }

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' })
  }

  return (
    <SearchHistoryContext.Provider
      value={{ history: state.history, addSearch, removeSearch, clearHistory }}
    >
      {children}
    </SearchHistoryContext.Provider>
  )
}

// Hook
export function useSearchHistory() {
  const context = useContext(SearchHistoryContext)
  if (!context) {
    throw new Error('useSearchHistory must be used within SearchHistoryProvider')
  }
  return context
}
