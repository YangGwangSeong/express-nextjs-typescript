import { User } from '@/shared/interfaces/user.interface';
import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useReducer,
} from 'react';

interface AuthState {
	authenticated: boolean;
	user: User | undefined;
	loading: boolean;
}

const StateContext = createContext<AuthState>({
	authenticated: false,
	user: undefined,
	loading: true,
});

const DispatchContext = createContext<any>(null);

interface Action {
	type: string;
	payload: any;
}

const reducer = (state: AuthState, { type, payload }: Action) => {
	switch (type) {
		case 'LOGIN':
			return {
				...state,
				authenticated: true,
				user: payload,
			};
		case 'LOGOUT':
			return {
				...state,
				authenticated: false,
				user: null,
			};
		case 'STOP_LOADING':
			return {
				...state,
				loading: false,
			};
		default:
			throw new Error(`Unknown action type: ${type}`);
	}
};

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [state, defaultDispatch] = useReducer(reducer, {
		user: undefined,
		authenticated: false,
		loading: true,
	});

	console.log('state', state);

	const dispatch = (type: string, payload?: any) => {
		defaultDispatch({ type, payload });
	};

	return (
		<DispatchContext.Provider value={dispatch}>
			<StateContext.Provider value={state}>{children}</StateContext.Provider>
		</DispatchContext.Provider>
	);
};

export default AuthProvider;

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
