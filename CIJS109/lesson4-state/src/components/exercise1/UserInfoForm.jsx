import "./UserInfoForm.css"

const UserInfoForm = (props) => {
    const { name, email, handleNameChange, handleEmailChange, handleSubmit } = props;
    return (
        <div className="user-info-form-container">
            <h1>User Info Form</h1>
            <form onSubmit={handleSubmit} className="user-info-form">
                <input value={name} onChange={handleNameChange} className="user-info-form-input" type="text" placeholder="Name" />
                <input value={email} onChange={handleEmailChange} className="user-info-form-input" type="text" placeholder="Email" />
                <button className="user-info-form-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UserInfoForm;