export enum ModalActionKind {
    TOGGLE = "toggle",
}
interface ModalAction {
    type:  ModalActionKind;
}
interface ModalState {
    isShowing: boolean;
}

export const modalReducer = (state: ModalState, action: ModalAction) => {
    switch (action.type){
        case (ModalActionKind.TOGGLE):
            return {
                ...state,
                isShowing: !state.isShowing
            }
        default:
            throw Error("Unknown action.");
    }
}