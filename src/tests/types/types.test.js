import { types } from "../../types/types"

describe('Pruebas en types', () => {
    test('los types deben de ser iguales', () => {
        expect(types).toEqual(
            {
                uiOpenModal: '[ui] Open modal',
                uiCloseModal: '[ui] Close modal',
            
                eventSetActive: '[event] Set active',
                eventStartNew: '[event] Start add new',
                eventAddNew: '[event] Add new',
                eventClearActiveEvent: '[event] Clear active event',
                eventUpdated: '[event] Event updated',
                eventDeleted: '[event] Event deleted',
                eventLoaded: '[event] Events loaded',
            
                authCheckingFinish: '[auth] Finish checking login state',
                authStartLogin: '[auth] Start Login',
                authLogin: '[auth] Login',
                authStartRegister: '[auth] Start Register',
                authStartTokenRenew: '[auth] Start token renew',
                authLogout: '[auth] Logout',
            }
        );
    })
})