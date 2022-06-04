import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


const initialState = {
    checking: true,
    // uid: null,
    // name: null
};

describe('Pruebas en authReducer', function() {
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState)
    });

    test('debe de loguearse con el reducer authLogin', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'pepito'
            }
        }
        const state = authReducer(initialState, action);

        expect(state).toEqual({
            uid: '123',
            name: 'pepito',
            checking: false 
        });
    })
});
    