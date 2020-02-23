import store from './store'
import { createAction, Action } from 'redux-actions'
import {
  IImageFile,
  IOptimizeOptions,
  ITaskItem,
  TaskStatus,
  IUpdateInfo,
  SupportedExt,
} from '../../common/constants'

export interface ITaskAddPayloadItem {
  image: IImageFile
  options: IOptimizeOptions
}

export interface IDefaultOptionsPayload {
  ext: SupportedExt
  options: IOptimizeOptions
}

export const enum ACTIONS {
  TASK_ADD = 'TASK_ADD',
  TASK_DELETE = 'TASK_DELETE',
  TASK_CLEAR = 'TASK_CLEAR',
  TASK_MAIL = 'TASK_MAIL',
  TASK_UPDATE_OPTIONS = 'TASK_UPDATE_OPTIONS',
  TASK_UPDATE_EXPORT = 'TASK_UPDATE_EXPORT',
  TASK_OPTIMIZE_START = 'TASK_OPTIMIZE_START',
  TASK_OPTIMIZE_SUCCESS = 'TASK_OPTIMIZE_SUCCESS',
  TASK_OPTIMIZE_FAIL = 'TASK_OPTIMIZE_FAIL',
  TASK_SELECTED_ID_UPDATE = 'TASK_SELECTED_ID_UPDATE',
  APP_UPDATABLE = 'APP_UPDATABLE',
  OPTIONS_VISIBLE_UPDATE = 'OPTIONS_VISIBLE_UPDATE',
  DEFAULT_OPTIONS_UPDATE = 'DEFAULT_OPTIONS_UPDATE',
  OPTIONS_APPLY = 'OPTIONS_APPLY',
  IMAGEMAGICK_CHECKED_UPDATE = 'IMAGEMAGICK_CHECKED_UPDATE',
}
