import { User } from '@/shared/interfaces/user.interface';
import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useReducer,
	Dispatch,
	ReactNode,
} from 'react';

interface AuthState {
	authenticated: boolean;
	user: User | undefined;
	loading: boolean;
}

export type AuthAction =
	| { type: 'LOGIN'; payload: User }
	| { type: 'LOGOUT' }
	| { type: 'STOP_LOADING' }
	| { type: undefined };

const initialState: AuthState = {
	authenticated: false,
	user: undefined,
	loading: true,
};

const AuthContext = createContext<{
	state: AuthState;
	dispatch: Dispatch<AuthAction>;
}>({
	state: initialState,
	dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				authenticated: true,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				authenticated: false,
				user: undefined,
			};
		case 'STOP_LOADING':
			return {
				...state,
				loading: false,
			};
		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}
};

const AuthProvider: FC<PropsWithChildren<{ children?: ReactNode }>> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
const useAuthStateDispatch = () => useContext(AuthContext);

export { AuthProvider, useAuthStateDispatch };
