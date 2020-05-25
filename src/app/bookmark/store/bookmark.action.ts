import { Action } from "@ngrx/store";
import ActionWithPayload from "../../ActionWithPayload";
import Bookmark from "../bookmark.model";

export const GET_BOOKMARK = '[Bookmark] GET_BOOKMARK';
export const CREATE_BOOKMARK = '[Bookmark] CREATE_BOOKMARK';
export const DELETE_BOOKMARK = '[Bookmark] DELETE_BOOKMARK';
export const UPDATE_BOOKMARK = '[Bookmark] UPDATE_BOOKMARK';

export class GetBookmark implements Action {
    readonly type = GET_BOOKMARK;

    constructor() { }
}

export class CreateBookmark implements ActionWithPayload<Bookmark> {
    readonly type = CREATE_BOOKMARK;
    payload: Bookmark;

    constructor(payload: Bookmark) {
        this.payload = payload;
    }
}

export class DeleteBookmark implements ActionWithPayload<number> {
    readonly type = CREATE_BOOKMARK;
    payload: number;

    constructor(payload: number) {
        this.payload = payload;
    }
}

export class UpdateBookmark implements ActionWithPayload<Bookmark> {
    readonly type = UPDATE_BOOKMARK;
    payload: Bookmark;

    constructor(payload: Bookmark) {
        this.payload = payload;
    }
}

export type All = GetBookmark | CreateBookmark | DeleteBookmark | UpdateBookmark ;