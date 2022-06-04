import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from "../../helpers/fetch";

jest.mock('sweetalert2', ()=>({
    fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState={};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
let token = '';

describe('pruebas en las acciones Auth', () => {
    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('startLogin correcto', async() => {
        await store.dispatch(startLogin('pepe@gmail.com', '123456'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startLogin incorrecto', async() => { 
        await store.dispatch(startLogin('pepe@gmail.com', '12345677'));
        let actions = store.getActions();
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'password incorrecto', 'error');

        await store.dispatch(startLogin('pepe2@gmail.com', '12345677'));
        actions = store.getActions();
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Un usuario no existe con ese correo', 'error');
    });

    test('startRegister correcto', async() => {
        fetchModule.fetchSinToken = jest.fn(()=>({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'test2',
                    token: 'ABC123ABC'
                }
            }
        }));
        await store.dispatch(startRegister('test@test.com', '123456', 'Test'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test2'
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startChecking correcto', async() => {

        fetchModule.fetchConToken = jest.fn(()=>({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'test2',
                    token: 'ABC123ABC'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();


        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test2'
            }
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    })
});