import { User } from '@/shared/interfaces/user.interface';
import axios from 'axios';
import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useReducer,
	Dispatch,
	ReactNode,
	useMemo,
	useEffect,
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

	const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

	useEffect(() => {
		async function loadUser() {
			try {
				axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
				axios.defaults.withCredentials = true;
				const res = await axios.get('/api/auth/me');
				dispatch({ type: 'LOGIN', payload: res.data });
			} catch (error) {
				console.log(error);
			} finally {
				dispatch({ type: 'STOP_LOADING' });
			}
		}
		loadUser();
	}, []);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
const useAuthStateDispatch = () => useContext(AuthContext);

export { AuthProvider, useAuthStateDispatch };
