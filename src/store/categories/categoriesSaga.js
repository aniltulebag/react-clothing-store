import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './categoriesAction';

import { CATEGORIES_ACTION_TYPES } from './categoriesTypes';

import { getCategoriesAndDocuments } from '../../utility/firebase/firebase';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');

    // put is like a dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  // Whenever take the latest "FETCH_CATEGORIES_START" action, initialize the fetch fetchCategoriesAsync Saga.
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // Run everything inside, and only complete when all of it is done.
  yield all([call(onFetchCategories)]);
}
