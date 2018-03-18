import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Image,
    TouchableHighlight,
} from 'react-native';

// import { StackNavigator } from 'react-navigation';

getItem = (tournament_name) => {
    // Alert.alert(tournament_name);
    const { navigate } = this.props.navigation;

    navigate('Second', { ListViewClickItemHolder: tournament_name });
    console.log(tournament_name)
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
        default:
            return require('../images/categorystamps_250.png');
    }
}

export default Row = (props) => (
    <TouchableHighlight onPress={this.getItem.bind(this, props.name)}>
        <View style={styles.rowViewContainer}>
            <View style={styles.tournamentImg}>
                <Image
                    source={this.getBadge(props.category)}
                    style={{ height: 60 }} resizeMode="contain"
                />
            </View>
            <View style={styles.tournamentInfo}>
                <View>
                    <Text
                        style={styles.rowTournament}>{props.name}
                    </Text>
                </View>
                <View>
                    <Text
                        style={styles.rowCity}>{props.city}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableHighlight>
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