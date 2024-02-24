import { getBooks } from '../api/bookData';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import { showBooks } from '../pages/books';
import navigationEvents from '../events/navigationEvents';

const startApp = (uid, variable) => {
  console.warn(variable);
  domBuilder(); // BUILD THE DOM
  domEvents(uid, variable); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(uid); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(uid); // ATTACH THE EVENT LISTENERS TO THE NAVBAR

  // TODO: Put all books on the DOM on App load
  getBooks(uid).then(showBooks);
};

export default startApp;
