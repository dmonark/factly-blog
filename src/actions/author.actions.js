import { authorConstants } from '../constants';

export const authorActions = {
  addAuthor,
};

function addAuthor(author) {
	return { type: authorConstants.AUTHOR_GET, author};
}