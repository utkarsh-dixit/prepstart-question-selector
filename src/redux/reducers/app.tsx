import {ADD_QUESTION, STEPS, ADD_ANSWER, ADD_CORRECT_ANSWER, REMOVE_QUESTION, REMOVE_ANSWER, REMOVE_CORRECT_ANSWER, RESET_ALL} from "../actions/";

const defaultState = {
    question: null,
    answers: {
        1: null,
        2: null,
        3: null,
        4: null
    },
    correctAnswer: null,
    state: STEPS.QUESTION
};

export function app(state = defaultState, action: any) {
      switch (action.type) {
        case ADD_QUESTION:
            return {
                ...state,
                question: {
                    content: action.question,
                    mode: action.mode
                }
            }
        case REMOVE_QUESTION:
            return {
                ...state,
                question: null
            }
        case ADD_ANSWER:
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.index]: {
                        content: action.answer,
                        mode: action.mode
                    }
                }
            }
        case REMOVE_ANSWER:
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.index]: null
                },
            }
        case ADD_CORRECT_ANSWER:
            return {
                ...state,
                correctAnswer: action.correct
            }
        case REMOVE_CORRECT_ANSWER:
            return {
                ...state,
                correctAnswer: null
            }
        case RESET_ALL:
            return defaultState;
        default:
          return state;
      }
}
