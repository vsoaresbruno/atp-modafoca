import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Row extends Component {

    // Navigate to node detail when component is pressed
    _onPress = (data) => {
        this.props.navigation.navigate('Profile', data);
        console.log(data);
    }

    _getBadge = (badge) => {
        switch (badge) {
            case '250':
                return require('../images/categorystamps_250.png');
            case '500':
                return require('../images/categorystamps_500.png');
            case '1000':
                return require('../images/categorystamps_1000.png');
            case 'finals':
                return require('../images/categorystamps_finals.png');
            case 'nextgen':
                return require('../images/categorystamps_nextgen.png');
            case 'itf':
                return require('../images/categorystamps_itf.png');
            case 'grandslam':
                return require('../images/categorystamps_grandslam.png');
            default:
                return require('../images/categorystamps_250.png');
        }
    }

    render() {
        const data = this.props.data;

        return (
            <TouchableOpacity
                onPress={() => this._onPress(data)}>
                <View style={styles.rowViewContainer}>
                    <View style={styles.tournamentImg}>
                        <Image
                            source={this._getBadge(data.category)}
                            style={{ height: 60 }} resizeMode="contain"
                        />
                    </View>
                    <View style={styles.tournamentInfo}>
                        <View>
                            <Text
                                style={styles.rowTournament}>{data.name}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={styles.rowCity}>{data.location}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }

}


const styles = StyleSheet.create({
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