
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BookmarkState } from '../store/bookmark.state';
import { CreateBookmark, CREATE_BOOKMARK, GET_BOOKMARK, DELETE_BOOKMARK, UPDATE_BOOKMARK } from '../store/bookmark.action';
import { BookmarkReducer } from '../store/bookmark.reducers';
import Bookmark from '../bookmark.model';
import ActionWithPayload from '../../ActionWithPayload';
import { map } from 'rxjs/operators';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})

export class BookmarkComponent implements OnInit {

  constructor(private store: Store<{ bookmarks: BookmarkState }>) { }

  ngOnInit() {
    this.BookmarkState$ = this.store.pipe(select('bookmarks'));

    let createBookmarkAction: ActionWithPayload<Bookmark> = {
      type: CREATE_BOOKMARK,
      payload: {Id: 0,  Name:"First Bookmark", Url:"www.google.com", Group:'Work', isDeleted: false }
    }

    let getBookmarkAction: Action = {
      type: GET_BOOKMARK      
    }

     this.store.dispatch(createBookmarkAction);
    this.BookmarkSubscription = this.BookmarkState$.pipe(map(x => this.BookmarkList = x.BookmarkList)).subscribe();
    this.store.dispatch(getBookmarkAction);

    this.sortedData = this.BookmarkList;
    this.populateFilters()

  }

  BookmarkState$: Observable<BookmarkState>;
  BookmarkSubscription: Subscription;
  Name: string;
  Url: string;
  Group: string;
  Deleted: boolean = false;
  BookmarkList: Bookmark[];
  sortedData: Bookmark[];
  enableEdit:boolean=false;
  groups=[]
  filterBy='All'
  id=0;
  isEditing=[]
  edittedBookmark ={
    name: "",
    group: "",
    url: "",
    id: 0
  }

  createBookmark() {
    this.id++;
    let bookmarkAction: ActionWithPayload<Bookmark> = {
      type: CREATE_BOOKMARK,
      payload: {  Id: this.id, Name:this.Name, Url:this.Url, Group:this.Group, isDeleted: this.Deleted }
    }
    this.store.dispatch(bookmarkAction);
    this.sortedData = this.BookmarkList;
    this.toggleEnableEdit();
  }

  deleteBookmark(id){
    let element = this.BookmarkList.find(bookmark => bookmark.Id == id);
    let bookmarkAction: ActionWithPayload<number> = {
      type: DELETE_BOOKMARK,
      payload: element.Id
    }
    this.store.dispatch(bookmarkAction);
    this.sortedData = this.BookmarkList;
    this.populateFilters()
  }
  
  populateFilters(){
    this.groups = ['All'];
    this.BookmarkList.forEach(element => {
      this.groups.push(element.Group);
    });
    this.groups = [...new Set(this.groups)];
  }

  ngOnDestroy() {
      this.BookmarkSubscription.unsubscribe();
  }

  toggleEnableEdit(){
    this.cleanForm();
    this.enableEdit = !this.enableEdit
  }

  toggleIsEditting(bookmark){
    this.isEditing = []
    this.isEditing[bookmark.Id]=true
    this.edittedBookmark = {
      id: bookmark.Id,
      url: bookmark.Url,
      group: bookmark.Group,
      name: bookmark.Name
    }
  }

  saveEdition(){
    let bookmarkAction: ActionWithPayload<Bookmark> = {
      type: UPDATE_BOOKMARK,
      payload: {  Id: this.edittedBookmark.id, Name:this.edittedBookmark.name, Url:this.edittedBookmark.url, Group:this.edittedBookmark.group, isDeleted: false }
    }
    this.store.dispatch(bookmarkAction);
    this.sortedData = this.BookmarkList;
    this.isEditing[this.edittedBookmark.id]=false
    this.populateFilters()
  }

  cleanForm(){
    this.Group ="";
    this.Name = "";
    this.Url = "";
    this.populateFilters()
  }

  filterByGruop(){
    this.sortedData = this.BookmarkList;
    if(this.filterBy !== 'All'){
      this.sortedData = this.sortedData.filter(obj => {
        return obj.Group === this.filterBy
      })
    }
  }

  sortData(sort: Sort) {
    const data = this.BookmarkList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Name': return compare(a.Name, b.Name, isAsc);
        case 'Group': return compare(a.Group, b.Group, isAsc);
        case 'Url': return compare(a.Url, b.Url, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
