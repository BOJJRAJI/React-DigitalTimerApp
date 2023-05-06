import {Component} from 'react'

import './index.css'

const initialState = {
  timeInSeconds: 0,
  timeInMinutes: 25,
  isTimerRunning: false,
}

class DigitalTimer extends Component {
  state = initialState

  clearTimerInterval = () => clearInterval(this.intervalId)

  increaseTimer = () => {
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1,
    }))
  }

  decreaseTimer = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  incrementTimeInSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isTimeCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds + 1}))
    }
  }

  toggleTimer = () => {
    const {timeInMinutes, timeInSeconds, isTimerRunning} = this.state

    const isTimeCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimeCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderStartPauseReset = () => {
    const {isTimerRunning} = this.state
    const timerStateLabel = isTimerRunning ? 'Pause' : 'start'

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="start-restart-container">
        <div className="start-container">
          <button className="button" type="button" onClick={this.toggleTimer}>
            <img
              src={startOrPauseImageUrl}
              className="start-icon"
              alt={startOrPauseAltText}
            />
            <p className="start">{timerStateLabel}</p>
          </button>
        </div>

        <div className="reset-container">
          <button className="button" type="button" onClick={this.resetTimer}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              className="reset-icon"
              alt="reset icon"
            />
          </button>
          <p className="reset">Reset</p>
        </div>
      </div>
    )
  }

  renderTimerIncreaseDecrease = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isButtonDisable = timeInSeconds > 0

    return (
      <div className="set-timer-container">
        <button
          className="plus-button plus"
          type="button"
          onClick={this.decreaseTimer}
          disabled={isButtonDisable}
        >
          -
        </button>
        <div className="container">
          <p>{timeInMinutes}</p>
        </div>

        <button
          className="plus-button plus"
          type="button"
          onClick={this.increaseTimer}
          disabled={isButtonDisable}
        >
          +
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state

    const label = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="timer-card">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-content-container">
          <div className="timer-state-container">
            <div className="timer-container">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-state">{label}</p>
            </div>
          </div>

          <div className="content-container">
            {this.renderStartPauseReset()}
            <p className="timer-limit">Set Timer Limit</p>
            {this.renderTimerIncreaseDecrease()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
