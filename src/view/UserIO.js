import React from 'react'

class UserIO extends React.Component {
    render() {
        return (
            <div className="userIO">
                <textarea id="programOutput"></textarea>

                <div className="userIO-input">
                    <input id="programInput"></input>
                    <button type="submit">submit</button>
                </div>
            </div>
        )
    }
}

export default UserIO;