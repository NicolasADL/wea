export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';

export const login = (rut,name,id) => {
	return {
		type: ACTION_LOGIN,
		payload: {
			isLogged: true,
            Name : name,
            Rut : rut,
            ID : id

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