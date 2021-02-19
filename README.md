# Almost Amazon
We are building an admin app that allows a store owner to login to the app and manage books and authors.

![Screen Shot](./almostam.png)

We will be learning about the following:
- XHR requests
- Promises
- Firebase
- ERDs
- Postman
- CRUD

## Get Started
- Clone your repo
- Install app dependencies: `npm i`
- Start your server: `npm start`
  - The server starts the only error you should see is this one (which will be fixed after the Firebase Walkthrough is completed):
    ```js
    {
      code: "auth/invalid-api-key",
      message: "Your API key is invalid, please check you have copied it correctly.",
      a: null
    }
    ```
- Change `.sample.env` file name to `.env`


## TODO
In preparation for next week, complete the following in lab:
- [Firebase Walkthrough Videos ~15 minutes](https://vimeo.com/showcase/codetracker-firebase) PW: `firebaseRules!`
  - Create a project called `Almost Amazon`
  - Add a Realtime Database
  - Create an app called `Almost Amazon`
  - Add Auth
  - Add the Keys to your `.env` file
  - Upload the sample data to Firebase
- Test the Firebase Setup
  - Start and stop your server
  - Go to the application it should look like this:
 
  <img src="documentation/Login Screen.png" alt="Login Screen" width="300px"/>
 
  - The API key error should also be gone
  - Clicking the button should open up a Google Popup. Select a user to sign in with.

  <img src="documentation/Google Pop-Up.png" alt="Google Pop-Up Screen" width="300px"/>
    
  - After signing in, there should be a Navbar
 
  <img src="documentation/Logged In Screen.png" alt="Logged In Screen" width="300px"/>
  
  - Open the Navbar using the hamburger menu and click on the Log Out Button
 
  <img src="documentation/Logout Button.png" alt="Logout Button Screen" width="300px"/>    
  
  - This should bring back the Login Button
- Install [Postman](https://www.postman.com/downloads/)

## Technologies used
- Javascript
- Firebase Auth
- Firebase Realtime Database
- Axios for XHR requests
- SASS (For your own exploration)
- Bootstrap
- Webpack
