export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_CORRECT_ANSWER = "ADD_CORRECT_ANSWER";
export const REMOVE_QUESTION = "REMOVE_QUESTION";
export const REMOVE_ANSWER = "REMOVE_ANSWER";
export const REMOVE_CORRECT_ANSWER = "REMOVE_CORRECT_ANSWER";
export const RESET_ALL = "RESET_ALL";

export const STEPS = {
    QUESTION: 1,
    ANSWER_1: 2,
    ANSWER_2: 3,
    ANSWER_3: 4,
    ANSWER_4: 5,
    CORRECT_ANSWER: 6
}
export const CONTENT_MODE = {
    TEXT: 1,
    IMAGE: 2
};

export const addQuestion = async (content: any, mode: number) => {
    return (dispatch: any) => {
        dispatch({type: content, mode: mode});
    };
};

export const addAnswer = async (index: number, content: any, mode: number) => {
    return (dispatch: any) => {
        dispatch({type: ADD_ANSWER, index, content, mode})
    };
};

export const addCorrectAnswer = async (index: number) => {
    return (dispatch: any) => {
        dispatch({type: ADD_CORRECT_ANSWER, correct: index});
    };
};

export const resetAll = async () => {
    return (dispatch: any) => {
        dispatch({type: RESET_ALL});
    };
}

export const removeQuestion = async () => {
    return (dispatch: any) => {
        dispatch({type: REMOVE_QUESTION});
    };
}

export const removeAnswer = async (index: number) => {
    return (dispatch: any) => {
        dispatch({type: REMOVE_ANSWER, index});
    };
}