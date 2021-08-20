import React from 'react'

function LoginForm({text , errorMsg , handleChange , sendData}) {
    return (
        <div className="Login-forms">
             <form className="Login-form">
                <h3 className="Home-add-item ">{text}</h3>
                <p className="error-msg">{errorMsg}</p>
                <input className="login-form-username" type="text" onChange={handleChange} name="username" placeholder="username"/>
                <input className="login-form-password" type="password" onChange={handleChange}  name="password" placeholder="password"/>
                <button  data-testid='submit-btn' onClick={sendData}>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm