import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Row extends Component {

    render() {
        const data = this.props.data;

        return (

            <View style={styles.rowViewContainer}>
                <Text style={styles.rowPosition}>{data.ranking}</Text>
                <Text numberOfLines={1} style={styles.rowPlayer}>{data.name}</Text>
                <Text style={styles.labelCountry}>({data.country})</Text>
                <Text style={styles.labelPoints}>{data.points}</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    rowViewContainer: {
        flexDirection: 'row',
        margin: 15,
    },

    rowPosition: {
        marginLeft: 5,
        flex: 0.73,
        color: '#333',
        paddingLeft: 10,
    },

    rowPlayer: {
        flex: 1,
        color: '#00aeef',
        minWidth: 65,
    },

    labelCountry: {
        flex: 1.3,
        color: "#000",
    },

    labelPoints: {
        flex: 0.65,
        fontWeight: 'bold',
        color: '#00aeef',
    },



    // rowPosition: {
    //     padding: 10,
    //     fontSize: 16,
    //     fontWeight: 'normal',
    //     color: 'red',
    //     textAlign: 'center',
    //     minWidth: 70,
    // },

    // rowPlayer: {
    //     padding: 10,
    //     paddingRight: 0,
    //     fontSize: 18,
    //     color: '#00aeef',
    //     marginBottom: 3,
    //     width: 150
    // },

    // labelCountry: {
    //     padding: 10,
    //     paddingTop: 11,
    //     paddingLeft: 2,
    //     fontSize: 16,
    //     color: "#000",
    // },

    // labelPoints: {
    //     padding: 10,
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#00aeef',
    //     textAlign: 'right',
    //     alignSelf: 'flex-end',

    // },


    tournamentInfo: {
        flex: 1,
    },
});