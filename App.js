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
	ImageBackground,
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
		}
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

	getItem = (tourney) => {
		const { navigate } = this.props.navigation;
		console.log(tourney)
		navigate('Second', tourney);
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
						<TouchableOpacity onPress={() => this.getItem(item)}>
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
		title: 'Tourney',
		headerTitleStyle: {
			color: '#FFF'
		},
		headerStyle: {
			backgroundColor: '#00aeef',
		},
		headerTintColor: '#FFF',
		headerStyle: {
			backgroundColor: '#00aeef'
		},
	}

	render() {
		const resizeMode = 'cover';
		return (
			<View style={styles.itemContainer}>
				<ImageBackground
					style={styles.headerContainer}
					source={require("./images/header_blur.jpg")}
				>
					<Text
						style={styles.titleHeader}>{this.props.navigation.state.params.name}
					</Text>
					<Text
						style={styles.textHeader}>{this.props.navigation.state.params.location}
					</Text>
					<Text
						style={styles.textHeader}>{this.props.navigation.state.params.dates}
					</Text>
				</ImageBackground>


				<View style={styles.infoContainer}>

					<View style={styles.tournamentInfo}>
						<View style={styles.containerSection}>
							<Text style={styles.titleSection}>
								Surface
							</Text>
						</View>

						<View style={styles.tournamentRow}>
							<Text style={styles.infoValues}>
								{this.props.navigation.state.params.surface}
							</Text>

						</View>
					</View>





					<View style={styles.tournamentInfo}>
						<View style={styles.containerSection}>
							<Text style={styles.titleSection}>
								Winner
							</Text>
						</View>
						<View style={styles.tournamentRow}>
							<View>
								<Text style={styles.infoLabel}>SGL:</Text>
							</View>

							<View>
								<Text style={styles.infoValues}>
									{this.props.navigation.state.params.singles_winner_name}
								</Text>
							</View>
						</View>
						<View style={styles.tournamentRow}>
							<View>
								<Text style={styles.infoLabel}>DBL:</Text>
							</View>
							<View>
								<Text style={styles.infoValues}>
									{this.props.navigation.state.params.doubles_winner_1_name}, {this.props.navigation.state.params.doubles_winner_2_name}
								</Text>
							</View>
						</View>
					</View>



					<View style={styles.tournamentInfo}>
						<View style={styles.containerSection}>
							<Text style={styles.titleSection}>
								Draw
							</Text>
						</View>
						<View style={styles.tournamentRow}>
							<View>
								<Text style={styles.infoLabel}>SGL:</Text>
							</View>

							<View>
								<Text style={styles.infoValues}>
									{this.props.navigation.state.params.singles_draw}
								</Text>
							</View>
						</View>
						<View style={styles.tournamentRow}>
							<View>
								<Text style={styles.infoLabel}>DBL:</Text>
							</View>
							<View>
								<Text style={styles.infoValues}>
									{this.props.navigation.state.params.doubles_draw}
								</Text>
							</View>
						</View>
					</View>

					<View style={styles.tournamentInfo}>
						<View style={styles.containerSection}>
							<Text style={styles.titleSection}>
								Total Financial Commitment
							</Text>
						</View>

						<View style={styles.tournamentRow}>
							<Text style={styles.infoValues}>
								{this.props.navigation.state.params.fin_commit}
							</Text>

						</View>
					</View>


				</View>
			</View >
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
		flexDirection: 'column',
		marginBottom: 15,
	},

	itemContainer: {
		flexDirection: 'column',
	},

	tournamentRow: {
		flexDirection: 'row',
		margin: 5,
	},

	headerContainer: {
		justifyContent: 'center',
		paddingLeft: 10,
		height: 100,
	},

	titleHeader: {
		fontSize: 23,
		fontWeight: 'bold',
		color: '#FFF',
	},

	textHeader: {
		fontSize: 13,
		color: '#FFF',
	},

	infoContainer: {
		marginTop: 15,
		margin: 10,

	},

	infoLabel: {
		fontSize: 16,
		fontWeight: 'bold',
	},

	infoValues: {
		fontSize: 16,
		marginBottom: 3,
	},

	containerSection: {
		marginBottom: 5,
		paddingBottom: 5,
		borderBottomColor: '#dcdcdc',
		borderBottomWidth: 1,

	},

	titleSection: {
		color: '#333',
		fontWeight: 'bold',
		fontSize: 20,
	},

	infoText: {
		fontSize: 20,
		color: '#00aeef',
		marginBottom: 3,
	}


});