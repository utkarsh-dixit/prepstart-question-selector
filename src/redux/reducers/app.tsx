import {STEPS, CHANGE_STATE, SAVE_STEP_PROGRESS, REMOVE_STEP, RESET_ALL, CHANGE_STEP} from "../actions/";

const defaultState = {
    values: {},
    step: STEPS.QUESTION
};

export function app(state = defaultState, action: any) {
      switch (action.type) {
        case CHANGE_STATE:
            return{
                ...state,
                step: action.step,
                values: {
                    ...state.values,
                    [action.currentStep]: action.values
                }
            }
        case CHANGE_STEP:
            return{
                ...state,
                step: action.step
            }
        case SAVE_STEP_PROGRESS:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.step]: action.values
                }
            }
        case REMOVE_STEP:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.step]: null
                }
            }
        case RESET_ALL:
            return defaultState;
        default:
          return state;
      }
}
