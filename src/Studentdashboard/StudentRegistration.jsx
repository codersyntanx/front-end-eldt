import "./Register.css"
function StudentRegistration(){
    return(
        <>
        <div className="main-contain-regist">
            <div className="card-head">
                My Account
            </div>
            <div className="card-body">
                <form>
                <label className="foam-label">First name</label>
                <input className="registinput" type="text" placeholder="Name"/>
                <label className="foam-label">Last name</label>
                <input className="registinput" type="text" placeholder="Name"/>
                <label className="foam-label">Email</label>
                <input className="registinput" type="email" placeholder="Name"/>
                <label className="foam-label">Existing password</label>
                <input className="registinput" type="text" placeholder="password"/>
                <label className="foam-label">New password</label>
                <input className="registinput" type="text" placeholder="password"/>
                <label className="foam-label">Confirm password</label>
                <input className="registinput" type="text" placeholder="password"/>
                </form>
                <button className="btn-warning">Save</button>
            </div>
        </div>
        </>
    )
}
export default StudentRegistration