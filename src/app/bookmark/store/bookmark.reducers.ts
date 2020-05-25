import ActionWithPayload from "../../ActionWithPayload";
import Bookmark from "../bookmark.model";
import { BookmarkState, initializeState } from "./bookmark.state";
import * as BookmarkActions from "./bookmark.action";
import { Action } from "@ngrx/store";

const initialState = initializeState();

export function BookmarkReducer(state: BookmarkState = initialState,
    action: Action) {

    switch (action.type) {
        case BookmarkActions.GET_BOOKMARK:            
            return { ...state, Loaded: false, Loading: true };

        case BookmarkActions.CREATE_BOOKMARK:
            return ({
                ...state,
                BookmarkList: state.BookmarkList.concat((action as ActionWithPayload<Bookmark[]>).payload),
                Loaded: false, Loading: true
            });
        case BookmarkActions.DELETE_BOOKMARK:
            return ({
                ...state,
                BookmarkList: [
                    ...state.BookmarkList.slice(0, (action as ActionWithPayload<number>).payload),
                    ...state.BookmarkList.slice((action as ActionWithPayload<number>).payload + 1)
                ],
                Loaded: false, Loading: true
            });

            case BookmarkActions.UPDATE_BOOKMARK:
                return ({
                    ...state,
                    BookmarkList: [
                        ...state.BookmarkList.map(bookmark => {
                            if (bookmark.Id === (action as ActionWithPayload<Bookmark>).payload.Id) {
                              return (action as ActionWithPayload<Bookmark>).payload;
                            }
                            return bookmark;
                        })
                    ],
                    Loaded: false, Loading: true
                });

        default:
            return state;
    }
}