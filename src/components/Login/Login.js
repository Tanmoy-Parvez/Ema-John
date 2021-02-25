import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    photo: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signInDetails = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInDetails);
      setLoggedInUser(signInDetails);
      history.replace(from);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }


  const handleSignOut = () => {
    firebase.auth().signOut()
    .then( res => {
      const signOutUser = {
        isSignIn: false,
        name: '',
        photo: '',
        email: ''
      }
      setUser(signOutUser)
    })
   .catch(err =>{
     console.log(err);
   })
  }

  const handleBlur = (event) =>{
      let isFormValid = true;
    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }

    if (event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }

      if(isFormValid){
        const newUserInfo = {...user};
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo)
      }
  }
  
  const handleSubmit = (e) => {

       if (newUser && user.email && user.password) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then( res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          updateUserInfo(user.name);
          
        })
        .catch( error => {
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
       }

       if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then( res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log(res.user);
        })
        .catch( error => {
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
       }

  e.preventDefault();
  }

  const updateUserInfo = (name) => {
          const user = firebase.auth().currentUser;

          user.updateProfile({
            displayName: name,

          }).then(function() {
            console.log('User name updated successfully');
          }).catch(function(error) {
            console.log(error);
          });
  }
 

  return (
    <div className='App'>
                      
        {
          user.isSignIn ? <button className='btn btn-danger' onClick={handleSignOut}>Sign Out</button> 
                        :
          <button className='btn btn-success' onClick={handleGoogleSignIn}>Sign In with Google</button>
        }

        {
          user.isSignIn && <div>
              <h1>Welcome {user.name}</h1>
              <p>Your email is {user.email}</p>
              <img src={user.photo} alt=""></img>
          </div>
        }
        <br/>
                  <h1>Our Own Authentication</h1>
        <form className='container'>
              <input type="checkbox" name="newUser" onChange = {() => setNewUser(!newUser)}/> 
              <label htmlFor="newUser">Create New User</label>
              <br/>
              {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" required />}
              <br/>
              <input type="text" name="email" onBlur={handleBlur} placeholder='Your Email' required/>
              <br/>
              <input type="password" name="password" onBlur={handleBlur} placeholder='Your Password' required/>
              <br/>
              <input type="Submit" value="Submit" onClick={handleSubmit}className='btn btn-success'/>
        </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'logged in'} successfully!</p>}
    </div>
  );
}

export default Login;
