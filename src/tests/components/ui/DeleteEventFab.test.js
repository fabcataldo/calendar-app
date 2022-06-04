import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import '@testing-library/jest-dom';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { mount } from 'enzyme';
import { eventStartDelete } from '../../../actions/events';

jest.mock('../../../actions/events', ()=>({
    eventStartDelete: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState={};
const store = mockStore(initState);
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab></DeleteEventFab>
    </Provider>
)
describe('pruebas en DeleteEventFab', () => { 
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de llamar el eventStartDelete al hacer click', () => { 
        wrapper.find('button').prop('onClick')();

        expect(eventStartDelete).toHaveBeenCalled();
    });

});