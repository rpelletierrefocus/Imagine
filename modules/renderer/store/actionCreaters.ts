import { Store } from 'redux'
import { IState, createOptimizeOptions } from './reducer'
import { createAction, Action } from 'redux-actions'
import {
  ACTIONS,
  ITaskAddPayloadItem,
  IDefaultOptionsPayload,
} from './actions'
import {
  IImageFile,
  IOptimizeOptions,
  ITaskItem,
  TaskStatus,
  IUpdateInfo,
  SupportedExt,
} from '../../common/constants'

export default {
  taskAdd: createAction<IImageFile[]>(ACTIONS.TASK_ADD),

  taskDelete: createAction<string[]>(ACTIONS.TASK_DELETE),

  taskClear: createAction(ACTIONS.TASK_CLEAR),
  
  taskMail: createAction(ACTIONS.TASK_MAIL),

  taskUpdateOptions: createAction<{
    id: string
    options: IOptimizeOptions
  }, string, IOptimizeOptions>(
    ACTIONS.TASK_UPDATE_OPTIONS,
    (id, options) => ({ id, options }),
  ),

  taskUpdateExport: createAction<{
    id: string
    exportExt: SupportedExt
  }, string, SupportedExt>(
    ACTIONS.TASK_UPDATE_EXPORT,
    (id, exportExt) => ({ id, exportExt }),
  ),

  taskOptimizeStart: createAction<string>(ACTIONS.TASK_OPTIMIZE_START),

  taskOptimizeSuccess: createAction<{ id: string, optimized: IImageFile }, string, IImageFile>
    (ACTIONS.TASK_OPTIMIZE_SUCCESS, (id, optimized) => ({ id, optimized })),

  taskOptimizeFail: createAction<string>(ACTIONS.TASK_OPTIMIZE_FAIL),

  taskDetail: createAction<string | null>(ACTIONS.TASK_SELECTED_ID_UPDATE),

  appUpdateInfo: createAction<IUpdateInfo>(ACTIONS.APP_UPDATABLE),

  optionsVisible: createAction<boolean>(ACTIONS.OPTIONS_VISIBLE_UPDATE),

  defaultOptions: createAction<IDefaultOptionsPayload>(ACTIONS.DEFAULT_OPTIONS_UPDATE),

  optionsApply: createAction(ACTIONS.OPTIONS_APPLY),

  imageMagickInstalled: createAction<boolean>(ACTIONS.IMAGEMAGICK_CHECKED_UPDATE),
}
