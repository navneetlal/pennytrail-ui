import {
  createContext,
  useReducer,
  useContext,
  type Dispatch,
  type ReactNode,
} from 'react'

// Define User interface
interface User {
  id?: string
  is_logged_in: boolean
  username?: string
  first_name?: string
  last_name?: string
  theme?: 'light' | 'dark'
  preferred_currency?: string
  number_format?: string
  language?: string
  encryption_salt?: string
  session_key?: string
}

// Define Action types
type UserAction = { type: 'SET_USER'; payload: User } | { type: 'CLEAR_USER' }

// Create contexts with proper typing
export const UserContext = createContext<User | null>(null)
export const UserDispatchContext = createContext<Dispatch<UserAction> | null>(
  null
)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, dispatch] = useReducer(userReducer, initialUser)

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

function userReducer(user: User, action: UserAction): User {
  switch (action.type) {
    case 'SET_USER': {
      console.log('ACTION.PAYLOAD: ', action.payload)
      console.log('user: ', user)
      return {
        ...user,
        ...action.payload,
      }
    }
    case 'CLEAR_USER': {
      return initialUser
    }
    default: {
      throw Error('Unknown action: ' + (action as UserAction).type)
    }
  }
}

const initialUser: User = {
  is_logged_in: false,
  theme: 'light',
  language: 'en',
  number_format: 'en-IN',
  preferred_currency: 'INR',
}

// Create custom hooks for using the context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext) as Dispatch<UserAction>
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}
