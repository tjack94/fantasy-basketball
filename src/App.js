import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { players } from './playersService';
import nba from 'nba';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPlayer: null,
			showPlayerStats: false,
			players: players,
			search: ''
		};
	}
	selectPlayer(id) {
		nba.stats.playerInfo({ PlayerID: id }).then((response) => {
			this.setState({ currentPlayer: response.playerHeadlineStats[0], showPlayerStats: true });
		});
	}
	hideStats() {
		this.setState({ showPlayerStats: false });
	}
	searchPlayer(str) {
		const filtered = players.filter((player) => {
			const name = player.lastName + ', ' + player.firstName;
			return name.toLowerCase().includes(str.toLowerCase());
		});
		this.setState({ players: filtered });
  }
  addPlayer(){
    axios.post('api/add-player').then(()=> console.log('player added'))
  }
	render() {
		const playersList = this.state.players.map((player, index) => {
			return (
				<div key={index} onClick={() => this.selectPlayer(player.playerId)}>
					{player.lastName + ', ' + player.firstName}
				</div>
			);
		});
		const playerStats = this.state.showPlayerStats ? (
			<div className="selected-stats">
				<div>
					Player: {this.state.currentPlayer.playerName}
					PPG: {this.state.currentPlayer.pts} APG: {this.state.currentPlayer.ast}
          RPG: {this.state.currentPlayer.reb}
          <button>Add Player</button>
				</div>
				<button onClick={() => this.hideStats()}>X</button>
			</div>
		) : null;

		return (
			<div className="App">
				{playerStats}
				<input placeholder="Search for a player" onChange={(e) => this.searchPlayer(e.target.value)} />
				{playersList}
			</div>
		);
	}
}

export default App;
