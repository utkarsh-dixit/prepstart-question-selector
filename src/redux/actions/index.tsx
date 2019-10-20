import { any } from "prop-types";
import { requestAPICall } from "../../util/network";

export const RESET_ALL = "RESET_ALL";
export const CHANGE_STATE = "CHANGE_STATE";
export const REMOVE_STEP = "REMOVE_STEP";
export const CHANGE_STEP = "CHANGE_STEP";
export const SAVE_STEP = "SAVE_STEP";
export const SAVE_STEP_PROGRESS = "SAVE_STEP_PROGRESS";

export const STEPS = {
    QUESTION: 1,
    ANSWER_1: 2,
    ANSWER_2: 3,
    ANSWER_3: 4,
    ANSWER_4: 5,
    CORRECT_ANSWER: 6,
    SUBMIT: 7
}

export const NAVIGATION = {
    [STEPS.QUESTION]: STEPS.ANSWER_1,
    [STEPS.ANSWER_1]: STEPS.ANSWER_2,
    [STEPS.ANSWER_2]: STEPS.ANSWER_3,
    [STEPS.ANSWER_3]: STEPS.ANSWER_4,
    [STEPS.ANSWER_4]: STEPS.CORRECT_ANSWER,
    [STEPS.CORRECT_ANSWER]: STEPS.SUBMIT,
};

export const CONTENT_MODE = {
    TEXT: 1,
    IMAGE: 2
};
export const resetAll =  () => {
    return async(dispatch: any) => {
        dispatch({type: RESET_ALL});
    };
}

export const moveToNextStep = (currentStep: number, values: any) => {
    return async(dispatch: any) => {
        dispatch({type: CHANGE_STATE, values, currentStep, step: NAVIGATION[currentStep]});
    };
};

export const removeStep =  (step: number) => {
    return async (dispatch: any) => {
        dispatch({type: REMOVE_STEP, step});
    };
}

export const moveToThisStep = (step: number) => {
    return async(dispatch: any) => {
        dispatch({type: CHANGE_STEP, step});
    };
}

export const moveToNextStepWithoutValues = (step : number) => {
    return async(dispatch: any) => {
        dispatch({type: CHANGE_STEP, step: NAVIGATION[step]});
    };
};

export const saveProgress = (step: number, values: any) => {
    return async(dispatch: any) => {
        dispatch({type: SAVE_STEP_PROGRESS, step, values});
    };
}

export const submit = (payload: any, callback: any) => {
    return async (dispatch: any) => {
        dispatch({type: RESET_ALL});
        const result = await requestAPICall("/createQuestion", payload);
        if(callback)
        callback(result.data);
    }
}