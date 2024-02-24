// for merged promises

import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

const getBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey).then((bookObj) => {
    getSingleAuthor(bookObj.author_id).then((authorObject) => {
      resolve({ ...bookObj, authorObject });
    });
  }).catch(reject);
});

const getBookDetailsPt2 = async (bookFirebaseKey) => {
  const bookObject = await getSingleBook(bookFirebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);

  return { ...bookObject, authorObject };
};

const getAuthorDetails = async (authorFirebaseKey) => {
  const authorObject = await getSingleAuthor(authorFirebaseKey);
  const authorsBooks = await getAuthorBooks(authorFirebaseKey);

  return { ...authorObject, books: authorsBooks };
};

export {
  getBookDetails, getAuthorDetails, getBookDetailsPt2
};
