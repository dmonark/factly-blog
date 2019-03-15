import { filterConstants } from '../constants';

const initialState = {};
initialState['authors'] = []
initialState['categories'] = [
	{
		name: "Science",
		value: "science"
	}, {
		name: "Tech",
		value: "tech"
	}, {
		name: "Biology",
		value: "biology"
	}, {
		name: "Cars",
		value: "cars"
	}
]

export function filter(state = initialState, action) {
  switch (action.type) {
    case filterConstants.AUTHOR_GET:
			return {
				...state,
        authors: action.author
      };
    default:
      return state
  }
}