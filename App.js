import React, { Component } from "react";

import { AppRegistry, Platform, StyleSheet, ActivityIndicator, ListView, FlatList, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

// Tab View Stack
import ListTournaments from "./components/ListTournaments";
import TournamentProfile from "./components/TournamentProfile";
import ListRankings from "./components/ListRankings";

const MainTab = TabNavigator(
	{
		Rankings: {
			screen: ListRankings,
		},
		Tournaments: {
			screen: ListTournaments,
		},

	},

	{
		lazy: true,
		animationEnabled: false,
		swipeEnabled: false,
		tabBarPosition: 'bottom',
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				// Current tab active
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Tournaments') {
					iconName = `calendar`;
					// iconName = `ios-information-circle${focused ? '' : '-outline'}`;
				} else if (routeName === 'Rankings') {
					iconName = `list`;
					// iconName = `ios-options${focused ? '' : '-outline'}`;
				}

				// You can return any component that you like here! We usually use an
				// icon component from react-native-vector-icons
				return <Icon type="simple-line-icon" name={iconName} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			showLabel: true,
			activeTintColor: '#00aeef',
			inactiveTintColor: '#666',
			style: {
				backgroundColor: '#FFF',
				height: 48,
			}
		}
	}
);

export default App = StackNavigator({
	MainTab: { screen: MainTab },
	Tournaments: { screen: ListTournaments },
	Profile: { screen: TournamentProfile },
	Rankings: { screen: ListRankings },
},
	{
		cardStyle: {
			shadowOpacity: 0,
			backgroundColor: '#fff',
		}
	}
);

AppRegistry.registerComponent('App', () => App);