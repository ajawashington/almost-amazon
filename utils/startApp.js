import { getBooks } from '../api/bookData';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { emptyBooks, showBooks } from '../pages/books';
// import { showBooks } from '../pages/books';

const startApp = (user) => {
  domBuilder(); // BUILD THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  domEvents(user); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(user); // ADD FORM EVENT LISTENTERS TO THE DOM
  navigationEvents(user); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  console.warn(user);
  getBooks(user.uid).then((array) => {
    if (array.length) {
      showBooks(array);
    } else {
      emptyBooks();
    }
  });
};

export default startApp;
