import React, { Component } from "react";

import { AppRegistry, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import { Icon } from 'react-native-elements';

export default class TournamentProfile extends Component {

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
        const data = this.props.navigation.state.params;

        return (
            <View style={styles.itemContainer}>
                <ImageBackground
                    style={styles.headerContainer}
                    source={require("../images/header_blur.jpg")}
                >
                    <Text
                        style={styles.titleHeader}>{data.name}
                    </Text>
                    <Text
                        style={styles.textHeader}>{data.location}
                    </Text>
                    <Text
                        style={styles.textHeader}>{data.dates}
                    </Text>
                </ImageBackground>


                <View style={styles.infoContainer}>

                    <View style={styles.tournamentInfo}>
                        <View style={styles.containerSection}>
                            <Icon style={{}} type="simple-line-icon" name="layers" size={18} />
                            <Text style={styles.titleSection}>
                                Surface
							</Text>
                        </View>

                        <View style={styles.tournamentRow}>
                            <Text style={styles.infoValues}>
                                {data.surface}
                            </Text>

                        </View>
                    </View>

                    <View style={styles.tournamentInfo}>
                        <View style={styles.containerSection}>
                            <Icon style={{}} type="simple-line-icon" name="trophy" size={20} />

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
                                    {data.singles_winner_name}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tournamentRow}>
                            <View>
                                <Text style={styles.infoLabel}>DBL:</Text>
                            </View>
                            <View>
                                <Text style={styles.infoValues}>
                                    {data.doubles_winner_1_name}, {data.doubles_winner_2_name}
                                </Text>
                            </View>
                        </View>
                    </View>



                    <View style={styles.tournamentInfo}>
                        <View style={styles.containerSection}>
                            <Icon style={styles.iconSection} type="simple-line-icon" name="organization" size={18} />
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
                                    {data.singles_draw}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tournamentRow}>
                            <View>
                                <Text style={styles.infoLabel}>DBL:</Text>
                            </View>
                            <View>
                                <Text style={styles.infoValues}>
                                    {data.doubles_draw}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tournamentInfo}>
                        <View style={styles.containerSection}>
                            <Icon style={styles.iconSection} type="material-icons" name="attach-money" size={18} />
                            <Text style={styles.titleSection}>
                                Total Financial Commitment
							</Text>
                        </View>

                        <View style={styles.tournamentRow}>
                            <Text style={styles.infoValues}>
                                {data.fin_commit}
                            </Text>

                        </View>
                    </View>


                </View>
            </View >
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
        marginRight: 5,
    },

    infoValues: {
        fontSize: 16,
        marginBottom: 3,
    },

    containerSection: {
        flexDirection: 'row',
        marginBottom: 5,
        paddingBottom: 5,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1,

    },

    titleSection: {
        marginLeft: 10,
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
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