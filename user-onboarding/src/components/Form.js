import React from 'react';

export default function Form (props) {
    
    const { formVals, updateForm, submitForm, errors, disabled } = props;

    const onChange = evt => {
        const { name, value, checked, type} = evt.target
        const valueToUse = type === 'checkbox' ? checked : value

        updateForm(name, valueToUse)
    }

    const onSubmit = evt => {
        evt.preventDefault();
        submitForm();
    }

    return (
        <form className= 'Form 'onSubmit={onSubmit}>
            <div className="submit">
                <h2>Add a Friend</h2>
                <button disabled={disabled}>Submit</button>
                <div className='errors'>
                    <div>{errors.first_name}</div>
                    <div>{errors.last_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.serviceTerms}</div>
                </div>
            </div>
            <div className='firstName'>
                <label> First: 
                    <input
                        type="text"
                        name="first_name"
                        value={formVals.first_name}
                        onChange={onChange}
                        placeholder="Enter a first name"
                    />
                </label>
            <div className='lastName'>
                <label> Last:
                        <input
                            type="text"
                            name="last_name"
                            value={formVals.last_name}
                            onChange={onChange}
                            placeholder="Enter a last name"
                            />
                        </label>
                    <div className='Email'>
                        <label> Email:
                            <input
                                type="text"
                                name="email"
                                value={formVals.email}
                                onChange={onChange}
                                placeholder="Enter an email"
                                />
                            </label>
                        <div className='Password'>
                            <label> Password:
                            <input
                                type="password"
                                name="password"
                                value={formVals.password}
                                onChange={onChange}
                                placeholder="Enter a password"
                                />
                            </label>
                        <div className='serviceTerms'>
                            <label> Terms of service:
                            <input
                                type='checkbox'
                                name='serviceTerms'
                                value={formVals.serviceTerms}
                                onChange={onChange}
                                />
                            </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
    )
}
