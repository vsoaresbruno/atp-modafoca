import React, { Component } from "react";

import { View, StyleSheet } from 'react-native';

import Separator from '../components/rowSeparator';

export default class ListRankings extends Component {

    static navigationOptions = {
        title: 'Players',
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
        this.navigation = this.props.navigation

        return (
            <View style={styles.itemContainer}>
                <Separator />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,

    },

    listContainer: {
        marginTop: 0,
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
    },

    menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },

    menuBarItem: {
        marginBottom: 8,
    },

    menuBarText: {
        textAlign: 'center',
    }

});

