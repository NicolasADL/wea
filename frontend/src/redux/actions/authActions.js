export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';

export const login = (rut,name,tipo,idCurso,idAsignatura,jefe) => {
	return {
		type: ACTION_LOGIN,
		payload: {
			isLogged: true,
            Name : name,
            Rut : rut,
            tipo : tipo,
            id_curso: idCurso,
            id_asignatura:idAsignatura,
            Jefe:jefe

		},
	}
}

export const logout = () => {
	return {
		type: ACTION_LOGOUT,
		payload: {
			isLogged: false,
            Name : null,
            Rut : null,
            tipo : null,
            id_curso: null,
            id_asignatura:null,
            Jefe:null
		},
	}
}