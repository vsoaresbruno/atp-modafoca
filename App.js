import React, { Component } from "react";

import {
	AppRegistry,
	StyleSheet,
	ActivityIndicator,
	ListView,
	Text,
	View,
	Alert,
	Image
} from 'react-native';

import dataTournaments from "./data/tournaments.json";
import statusBar from "./components/statusBar";

export default class Myproject extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}

	GetItem(tournament_name) {

		Alert.alert(tournament_name);

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

	ListViewItemSeparator = () => {
		return (
			<View
				style={{
					height: .5,
					width: "100%",
					backgroundColor: "#c7c8c8",
				}}
			/>
		);
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
					renderSeparator={this.ListViewItemSeparator}
					renderRow={
						(rowData) =>
							<View style={styles.rowViewContainer}>
								<Image
									source={require('./images/categorystamps_1000.png')}
									style={{ height: 60 }} resizeMode="contain"
								/>
								<View style={styles.tournamentInfo}>
									<View><Text onPress={this.GetItem.bind(this, rowData.tournament_name)} style={styles.rowTournament}>{rowData.tournament_name}</Text></View>
									<View><Text onPress={this.GetItem.bind(this, rowData.tournament_name)} style={styles.rowCity}>{rowData.tournament_city}</Text></View>
								</View>
							</View>
					}
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

	rowTournament: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#00aeef',
		flex: 1,
		marginBottom: 3,
	},

	tournamentBadge: {
		flex: 1,
		backgroundColor: 'red',
		marginRight: 5,
		width: 40,
		height: 40
	},
	tournamentInfo: {
		flex: 2,
	},

	rowCity: {
		fontSize: 18,
		color: "#000",
		fontWeight: 'normal',
		flex: 1,
	},


	rowViewContainer: {
		flexDirection: 'row',
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
	}

});