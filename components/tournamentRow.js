import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Image
} from 'react-native';

getItem = (tournament_name) => {
    Alert.alert(tournament_name);
}

getBadge = (badge) => {
    switch (badge) {
        case '250':
            return require('../images/categorystamps_250.png');
        case '500':
            return require('../images/categorystamps_500.png');
        case '1000':
            return require('../images/categorystamps_1000.png');
        case 'finals':
            return require('../images/categorystamps_finals.svg');
        case 'nextgen':
            return require('../images/categorystamps_nextgen.svg');
        case 'itf':
            return require('../images/categorystamps_itf.png');
        case 'grandslam':
            return require('../images/categorystamps_grandslam.png');
    }
}

export default Row = (props) => (
    <View style={styles.rowViewContainer}>
        <Image
            source={this.getBadge(props.category)}
            style={{ height: 60 }} resizeMode="contain"
        />
        <View style={styles.tournamentInfo}>
            <View>
                <Text
                    onPress={this.getItem.bind(this, props.name)}
                    style={styles.rowTournament}>{props.name}
                </Text>
            </View>
            <View>
                <Text
                    onPress={this.getItem.bind(this, props.name)}
                    style={styles.rowCity}>{props.city}
                </Text>
            </View>
        </View>
    </View>
);

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
});