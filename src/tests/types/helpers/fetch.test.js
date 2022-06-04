import { fetchConToken, fetchSinToken } from "../../../helpers/fetch"

describe('pruebas en el helper fetch', () => {
    let token = '';

    test('fetchSinToken debe de funcionar', async () => {
        const resp = await fetchSinToken('auth', {email: 'pepe@gmail.com', password: '123456'}, 'POST');
        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect(body.ok).toBe(true);
        token = body.token;
    });

    test('fetchConToken debe de funcionar', async () => {
        localStorage.setItem('token', token);
        const resp = await fetchConToken('events/62966a21835ad5eb276da359', {}, 'DELETE');
        const body = await resp.json();
        console.log('body')
        console.log(body)
        expect(body.msg).toBe('Evento no existe por ese id');
    });
})