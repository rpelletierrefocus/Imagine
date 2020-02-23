import { shell } from 'electron'
import React, { PureComponent, MouseEvent } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Icon from '../components/Icon'
import Popper from '../components/Popper'
import OptionsPanel from './OptionsPanel'
import actions from '../store/actionCreaters'
import { IState } from '../store/reducer'
import { SaveType, IUpdateInfo } from '../../common/constants'
import * as apis from '../apis'
import __ from '../../locales'
import pkg from '../../../package.json'

import './ActionBar.less'

interface IActionBarStateProps {
  count: number
  updateInfo: IUpdateInfo | undefined
  optionsVisible: boolean
}

interface IActionBarDispatchProps {
  onMailAll(): void
  onRemoveAll(): void
  onSave(type: SaveType): void
  onAdd(): void
  onUpdateClick(): void
  onOptionsVisibleToggle(visible: boolean): void
}

class ActionBar extends PureComponent<IActionBarStateProps & IActionBarDispatchProps> {
  handleSaveClick(e: MouseEvent<HTMLElement>, type: SaveType) {
    e.preventDefault()
    this.props.onSave(type)
  }

  onOptionsVisibleClick = () => {
    this.props.onOptionsVisibleToggle(!this.props.optionsVisible)
  }

  onMailOptionsVisibleClick = () => {
    console.log('test')
  }
  
  onOptionsHide = () => {
    this.props.onOptionsVisibleToggle(false)
  }

  render() {
    const { count, updateInfo } = this.props

    return (
      <div className="action-bar">
        <button onClick={this.props.onAdd}>
          <Icon name="add" />
          <span className="ellipsis">{__('add')}</span>
        </button>

        <Popper
          hoverMode={true}
          popper={(
            <div className="popper-menu">
              <a href="#" onClick={e => this.handleSaveClick(e, SaveType.OVER)}>
                {__('save_cover')}
              </a>
              <a href="#" onClick={e => this.handleSaveClick(e, SaveType.NEW_NAME)}>
                {__('save_new')}
              </a>
              <a href="#" onClick={e => this.handleSaveClick(e, SaveType.NEW_DIR)}>
                {__('save_dir')}
              </a>
            </div>
          )}>
          <button className="tooltip-hover" disabled={!count}>
            <Icon name="down" />
            <span className="ellipsis">{__('save')}</span>
          </button>
        </Popper>

        <button onClick={this.props.onRemoveAll} disabled={!count}>
          <Icon name="delete" />
          <span className="ellipsis">{__('clear')}</span>
        </button>
		
		<button onClick={this.props.onMailAll} disabled={!count}>
          <Icon name="mail" />
          <span className="ellipsis">{__('Mail')}</span>
        </button>

        {
          updateInfo ? (
            <button onClick={this.props.onUpdateClick} className="has-update">
              <Icon name="up"/>
              <span className="ellipsis">{__('new_version')}</span>
            </button>
          ) : null
        }

        <div className="blank" />

        <Popper
          className="options-popper"
          visible={this.props.optionsVisible}
          popper={(
            <OptionsPanel onApplyClick={this.onOptionsHide} />
          )}>
          <button
            className={classnames({
              '-active': this.props.optionsVisible,
            })}
            onClick={this.onOptionsVisibleClick}>
            <Icon name="tune" />
          </button>
        </Popper>
		
		<Popper
          className="options-popper"
          visible={this.props.optionsVisible}
          popper={(
            <OptionsPanel onApplyClick={this.onOptionsHide} />
          )}>
          <button
            className={classnames({
              '-active': this.props.optionsVisible,
            })}
            onClick={this.onMailOptionsVisibleClick}>
            <Icon name="select" />
          </button>
        </Popper>
      </div>
    )
  }
}

export default connect<IActionBarStateProps, IActionBarDispatchProps, {}, IState>(
  state => ({
    count: state.tasks.length,
    updateInfo: state.globals.updateInfo,
    optionsVisible: state.globals.optionsVisible,
  }), (dispatch) => ({
    onRemoveAll() {
      dispatch(actions.taskClear())
    },
	onMailAll() {
      dispatch(actions.taskClear())
    },
    onOptionsVisibleToggle(visible: boolean) {
      dispatch(actions.optionsVisible(visible))
    },

    onAdd() {
      apis.fileSelect()
    },

    onSave(type: SaveType) {
      apis.fileSaveAll(type)
    },

    onUpdateClick() {
      shell.openExternal(pkg.homepage + '/releases')
    },
  }),
)(ActionBar)
