import React, { Component } from "react";

import {
	AppRegistry,
	StyleSheet,
	ActivityIndicator,
	ListView,
	Text,
	View,
	Image
} from 'react-native';

import dataTournaments from "./data/tournaments.json";
/**
 * Components
 */
import statusBar from "./components/statusBar";
import Row from './components/tournamentRow';
import Separator from './components/separatorRow';

export default class Myproject extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}

	getTournaments() {
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.setState({
			isLoading: false,
			dataSource: ds.cloneWithRows(dataTournaments),
		}, function () {
			// In this block you can do something with new state.
		});

	}

	componentDidMount() {
		return this.getTournaments();
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1 }}>
					<ActivityIndicator />
				</View>
			);
		}
		return (

			<View style={styles.MainContainer}>
				<MyStatusBar color="#000" backgroundColor="#00aeef" barStyle="light-content" />
				<ListView
					style={styles.listContainer}
					dataSource={this.state.dataSource}
					renderSeparator={(sectionId, rowId) => <Separator />}
					renderRow={(tournament) => <Row {...tournament} />}
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({

	MainContainer: {
		// Setting up View inside content in Vertically center.
		justifyContent: 'center',
		flex: 1,
	},

	listContainer: {
		margin: 10
	},
});