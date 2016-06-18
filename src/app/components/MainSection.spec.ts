/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import {MainSection} from './MainSection';

describe('MainSection component', () => {
  class MockTodoService {
    addTodo() {return; }
    editTodo() {return; }
    deleteTodo() {return; }
    completeTodo() {return; }
    completeAll() {return; }
    clearCompleted() {return; }
  }

  let component;

  beforeEach(() => {
    angular
      .module('mainSection', ['app/components/MainSection.html'])
      .service('todoService', MockTodoService)
      .component('mainSection', MainSection);
    angular.mock.module('mainSection');
  });

  beforeEach(angular.mock.inject($componentController => {
    component = $componentController('mainSection', {}, {});
  }));

  it('shoud call clearCompleted', () => {
    spyOn(component.todoService, 'clearCompleted').and.callThrough();
    component.handleClearCompleted();
    expect(component.todoService.clearCompleted).toHaveBeenCalled();
  });

  it('shoud call completeAll', () => {
    spyOn(component.todoService, 'completeAll').and.callThrough();
    component.handleCompleteAll();
    expect(component.todoService.completeAll).toHaveBeenCalled();
  });

  it('shoud set selectedFilter', () => {
    component.handleShow('show_completed');
    expect(component.selectedFilter.type).toEqual('show_completed');
    expect(component.selectedFilter.filter({completed: true})).toEqual(true);
  });

  it('shoud call completeTodo', () => {
    spyOn(component.todoService, 'completeTodo').and.callThrough();
    component.handleChange();
    expect(component.todoService.completeTodo).toHaveBeenCalled();
  });

  it('shoud call deleteTodo', () => {
    spyOn(component.todoService, 'deleteTodo').and.callThrough();
    component.handleSave({text: ''});
    expect(component.todoService.deleteTodo).toHaveBeenCalled();
  });

  it('shoud call editTodo', () => {
    spyOn(component.todoService, 'editTodo').and.callThrough();
    component.handleSave({text: 'Hello'});
    expect(component.todoService.editTodo).toHaveBeenCalled();
  });

  it('shoud call deleteTodo', () => {
    spyOn(component.todoService, 'deleteTodo').and.callThrough();
    component.handleDestroy();
    expect(component.todoService.deleteTodo).toHaveBeenCalled();
  });
});
