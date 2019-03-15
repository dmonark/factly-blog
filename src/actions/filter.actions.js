import { filterConstants } from '../constants';

export const filterActions = {
  addAuthor,
};

function addAuthor(author) {
	return { type: filterConstants.AUTHOR_GET, author};
}