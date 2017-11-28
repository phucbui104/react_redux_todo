import { takeLatest } from 'redux-saga' // eslint-disable-line
import { call, fork, put } from 'redux-saga/effects' // eslint-disable-line
import * as ActionTypes from '../constants/ActionTypes' // eslint-disable-line
import watchAddTodo from './add-todo'
import watchEditTodo from './edit-todo'
import watchDeleteTodo from './delete-todo'
import watchFetchTodos from './fetch-todos'
import watchCompleteTodo from './complete-todo'
import watchCompleteAllTodos from './complete-all-todos'
import watchClearCompletedTodos from './clear-completed'
import bootstrap from './bootstrap'

export default function* watchMany() {
  yield [
    fork(watchAddTodo),
    fork(watchEditTodo),
    fork(watchFetchTodos),
    fork(watchDeleteTodo),
    fork(watchCompleteTodo),
    fork(watchCompleteAllTodos),
    fork(watchClearCompletedTodos),
    fork(bootstrap)
  ]
}
