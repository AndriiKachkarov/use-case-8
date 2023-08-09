import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import validator from 'validator';
import {selectUserData, setUserData} from './redux';

const MIN_MESSAGE_LENGTH = 10;

function App() {
    const userData = useSelector(selectUserData);

    const [formData, setFormData] = useState(userData);
    const dispatch = useDispatch();

    const {firstName, lastName, email, message} = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setUserData(formData));
        console.log(`${firstName} ${lastName} <${email}> says: "${message}"`);
    };

    const handleChange = e => setFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));

    const isFirstNameValid = !validator.isEmpty(firstName, {ignore_whitespace: true});
    const isLastNameValid = !validator.isEmpty(lastName, {ignore_whitespace: true});
    const isEmailValid = validator.isEmail(email);
    const isMessageValid = validator.isLength(message, {min: MIN_MESSAGE_LENGTH});

    const isFormDisabled = !(isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid);

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label>
                    First name:
                    <input name="firstName" type="text" value={firstName} onChange={handleChange}/>
                </label>
                <label>
                    Last name:
                    <input name="lastName" type="text" value={lastName} onChange={handleChange}/>
                </label>
                <label>
                    Email:
                    <input name="email" type="email" value={email} onChange={handleChange}/>
                </label>
                <label>
                    Message:
                    <input name="message" type="text" value={message} onChange={handleChange}/>
                </label>
                <button type="submit" disabled={isFormDisabled}>Submit</button>
            </form>
            <ul>
                {Object.entries(userData).map((item) => <li key={item[0]}>{`${item[0]}: ${item[1]}`}</li>)}
            </ul>
        </div>
    );
}

export default App;
