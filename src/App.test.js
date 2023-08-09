import {render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducer, setUserData} from './redux';

const store = createStore(reducer);

const renderAppWithProvider = () => render(
    <Provider store={store}>
        <App/>
    </Provider>
);

const mockInitialUserData = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};

const mockInvalidUserData = {
    firstName: '',
    lastName: '',
    email: 'johnz@mailcom',
    message: 'Hello',
};

const mockValidUserData = {
    firstName: 'John',
    lastName: 'Zorn',
    email: 'johnz@mail.com',
    message: 'Hello Hello',
};

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

const fillFormWithData = (data) => {
    const firstNameField = screen.getByLabelText('First name:');
    const lastNameField = screen.getByLabelText('Last name:');
    const emailField = screen.getByLabelText('Email:');
    const messageField = screen.getByLabelText('Message:');

    fireEvent.change(firstNameField, {target: {value: data?.firstName === undefined ? mockValidUserData.firstName : data.firstName}});
    fireEvent.change(lastNameField, {target: {value: data?.lastName === undefined ? mockValidUserData.lastName : data.lastName}});
    fireEvent.change(emailField, {target: {value: data?.email === undefined ? mockValidUserData.email : data.email}});
    fireEvent.change(messageField, {target: {value: data?.message === undefined ? mockValidUserData.message : data.message}});
};

const submitForm = () => {
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
}

describe('App component', () => {
    beforeEach(() => {
        consoleLogMock.mockClear();
        store.dispatch(setUserData(mockInitialUserData))
    });

    it('should disable the submit button initially', () => {
        renderAppWithProvider();
        submitForm();
        expect(consoleLogMock).not.toHaveBeenCalled();
    });

    it('should disable the submit button if the firstName is invalid', () => {
        renderAppWithProvider();
        fillFormWithData({firstName: mockInvalidUserData.firstName});
        submitForm();
        expect(consoleLogMock).not.toHaveBeenCalled();
    });

    it('should disable the submit button if the lastName is invalid', () => {
        renderAppWithProvider();
        fillFormWithData({lastName: mockInvalidUserData.lastName});
        submitForm();
        expect(consoleLogMock).not.toHaveBeenCalled();
    });

    it('should disable the submit button if the email is invalid', () => {
        renderAppWithProvider();
        fillFormWithData({email: mockInvalidUserData.email});
        submitForm();
        expect(consoleLogMock).not.toHaveBeenCalled();
    });

    it('should disable the submit button if the message is invalid', () => {
        renderAppWithProvider();
        fillFormWithData({message: mockInvalidUserData.message});
        submitForm();
        expect(consoleLogMock).not.toHaveBeenCalled();
    });

    it('should show the message on submit, if all the fields passed the validation', () => {
        renderAppWithProvider();
        fillFormWithData();
        submitForm();
        expect(consoleLogMock).toHaveBeenCalledWith(
            `${mockValidUserData.firstName} ${mockValidUserData.lastName} <${mockValidUserData.email}> says: "${mockValidUserData.message}"`
        );
    });

    it('should show the data, if all the fields passed the validation', () => {
        renderAppWithProvider();
        expect(screen.getByText('firstName:'));
        expect(screen.getByText('lastName:'));
        expect(screen.getByText('email:'));
        expect(screen.getByText('message:'));
        fillFormWithData();
        submitForm();
        expect(screen.getByText(`firstName: ${mockValidUserData.firstName}`));
        expect(screen.getByText(`lastName: ${mockValidUserData.lastName}`));
        expect(screen.getByText(`email: ${mockValidUserData.email}`));
        expect(screen.getByText(`message: ${mockValidUserData.message}`));
    });
});
