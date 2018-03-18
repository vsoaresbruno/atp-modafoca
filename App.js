import React, { Component } from "react";

import {
	AppRegistry,
	StyleSheet,
	ActivityIndicator,
	ListView,
	FlatList,
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import dataTournaments from "./data/tournaments.json";
// Components
// import Row from './components/tournamentRow';
import Separator from './components/separatorRow';

class FirstActivity extends Component {

	static navigationOptions = {
		title: 'Tournaments',
		headerTitleStyle: {
			/*  */
			color: '#FFF'
		},
		headerStyle: {
			/*  */
			backgroundColor: '#00aeef',
		},

		headerTintColor: {
			/*  */
		},
	}

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			data: dataTournaments
		}

		this.getItem = this.getItem.bind(this);
	}

	getTournaments() {
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.setState({
			isLoading: false,
			dataSource: dataTournaments,
		}, function () {
			// In this block you can do something with new state.
		});
	}

	componentDidMount() {
		return this.getTournaments();
	}

	getItem = (tournament_name) => {
		const { navigate } = this.props.navigation;

		console.log(tournament_name);

		navigate('Second', { ListViewClickItemHolder: tournament_name });
	}

	getBadge = (badge) => {
		switch (badge) {
			case '250':
				return require('./images/categorystamps_250.png');
			case '500':
				return require('./images/categorystamps_500.png');
			case '1000':
				return require('./images/categorystamps_1000.png');
			case 'finals':
				return require('./images/categorystamps_finals.png');
			case 'nextgen':
				return require('./images/categorystamps_nextgen.png');
			case 'itf':
				return require('./images/categorystamps_itf.png');
			case 'grandslam':
				return require('./images/categorystamps_grandslam.png');
			default:
				return require('./images/categorystamps_250.png');
		}
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

			<View style={styles.container}>

				<FlatList
					keyExtractor={(item, index) => index}
					style={styles.listContainer}
					data={this.state.dataSource}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => this.getItem(this, item.name)}>
							<View style={styles.rowViewContainer}>
								<View style={styles.tournamentImg}>
									<Image
										source={this.getBadge(item.category)}
										style={{ height: 60 }} resizeMode="contain"
									/>
								</View>
								<View style={styles.tournamentInfo}>
									<View>
										<Text
											style={styles.rowTournament}>{item.name}
										</Text>
									</View>
									<View>
										<Text
											style={styles.rowCity}>{item.location}
										</Text>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					)}

				/>
			</View>

		);
	}
}

class SecondActivity extends Component {
	static navigationOptions = {
		title: 'Tournaments',
		headerTitleStyle: {
			color: '#FFF'
		},
		headerStyle: {
			backgroundColor: '#00aeef',
		},
		headerTintColor: '#FFF',
	}

	render() {
		return (
			<View style={styles.itemContainer}>
				<Text
					style={styles.rowTournament}>{this.props.navigation.state.params.ListViewClickItemHolder}
				</Text>

			</View>
		);
	}
}

export default Project = StackNavigator({
	First: { screen: FirstActivity },
	Second: { screen: SecondActivity }
});

const styles = StyleSheet.create({

	container: {
		// Setting up View inside content in Vertically center.
		justifyContent: 'center',
		flex: 1,
	},

	listContainer: {
		marginTop: 0,
		margin: 10,
	},

	itemContainer: {
		margin: 10,
	},

	rowViewContainer: {
		flexDirection: 'row',
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
	},

	rowTournament: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#00aeef',
		marginBottom: 3,
	},

	rowCity: {
		fontSize: 18,
		color: "#000",
		fontWeight: 'normal',
	},

	tournamentImg: {
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},

	tournamentInfo: {
		flex: 1,
	},
});