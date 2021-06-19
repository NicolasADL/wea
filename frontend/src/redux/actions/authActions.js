export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';

export const login = (rut,name,id,tipo) => {
	return {
		type: ACTION_LOGIN,
		payload: {
			isLogged: true,
            Name : name,
            Rut : rut,
            ID : id,
            tipo : tipo

		},
	}
}

export const logout = () => {
	return {
		type: ACTION_LOGOUT,
		payload: {
			isLogged: false,
		},
	}
}