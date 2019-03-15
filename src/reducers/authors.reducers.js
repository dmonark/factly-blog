import { authorConstants } from '../constants';

const initialState = {};
initialState['authors'] = []

export function authors(state = initialState, action) {
  switch (action.type) {
    case authorConstants.AUTHOR_GET:
			return {
        authors: action.author
      };
    default:
      return state
  }
}