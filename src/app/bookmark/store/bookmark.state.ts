
import Bookmark from "../bookmark.model";

export interface BookmarkState {
    Loading: boolean;
    Loaded: boolean;
    BookmarkList: Bookmark[];
}

export const initializeState = (): BookmarkState => {
    return ({
        BookmarkList: [],
        Loading: false,
        Loaded: true
    });
}