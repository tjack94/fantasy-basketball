import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { players } from './playersService'
import nba from 'nba'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      currentPlayer: null,
      showPlayerStats: false,
    }
  }
  selectPlayer(id){
    nba.stats.playerInfo( {PlayerID: id} ).then(response=> this.setState({currentPlayer: response.playerHeadlineStats[0], showPlayerStats: true}))
  }
  render() {
    const playersList = players.map((player, index)=>{
      return (
      <div key= {index} onClick={()=> this.selectPlayer(player.playerId)}>
      {player.lastName + ', ' + player.firstName}
      </div>
      )
    })
      const playerStats = this.state.showPlayerStats? <div>Player: {this.state.currentPlayer.playerName} PPG: {this.state.currentPlayer.pts} APG: {this.state.currentPlayer.ast} RPG: {this.state.currentPlayer.reb}</div> : null
    
    return (
      <div className="App">
      {playerStats}
      {playersList}
      </div>
    );
  }
}

export default App;
