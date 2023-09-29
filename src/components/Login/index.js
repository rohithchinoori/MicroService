import './index.css'
import {Component} from 'react'

class Login extends Component {
  state = {
    user: '',
    email: '',
    age: '',
    location: '',
    isError: false,
    id: '',
    error: '',
    formed: true,
  }

  getFormDetails = async event => {
    event.preventDefault()
    const {email, age} = this.state
    const userDetails = {email, age}
    /*Sending data to service A */
    const url = 'http://localhost:3001/submitProfileA'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState(prevState => ({formed: !prevState.formed, id: data.userId}))
    } else {
      this.showError()
    }
  }

  showError = () => {
    this.setState({isError: true, error: 'User already exist or Not eligible'})
  }

  getUser = event => {
    this.setState({user: event.target.value})
  }

  getMail = event => {
    this.setState({email: event.target.value})
  }

  getAge = event => {
    this.setState({age: event.target.value})
  }

  getLocation = event => {
    this.setState({location: event.target.value})
  }

  onReset = () => {
    this.setState({formed: true})
  }

  render() {
    const {user, email, age, location, formed, error, isError, id} = this.state
    return (
      <div className="bg">
        {formed ? (
          <>
            <h1 className="head">Login</h1>
            <form className="card" onSubmit={this.getFormDetails}>
              <div className="input-cont">
                <label htmlFor="user">Username</label>
                <input
                  id="user"
                  type="text"
                  placeholder="Username"
                  onChange={this.getUser}
                  value={user}
                />
              </div>
              <div className="input-cont">
                <label htmlFor="mail">Email</label>
                <input
                  id="mail"
                  type="text"
                  placeholder="email"
                  onChange={this.getMail}
                  value={email}
                />
              </div>
              <div className="input-cont">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  type="text"
                  placeholder="Age"
                  onChange={this.getAge}
                  value={age}
                />
              </div>
              <div className="input-cont">
                <label htmlFor="loc">Location</label>
                <input
                  id="loc"
                  type="text"
                  placeholder="Location"
                  onChange={this.getLocation}
                  value={location}
                />
              </div>
              <button type="submit" className="but">
                Submit
              </button>
              {isError && <p className="p">{error}</p>}
            </form>
          </>
        ) : (
          <div className="card">
            <h1 className="head1">
              Your Reference Number: <span className="sp">{id}</span>
            </h1>
            <button type="button" onClick={this.onReset} className="but">
              Done
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default Login
