import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Icon } from 'react-native-elements';

import { StackNavigator } from 'react-navigation';

export default class MenuBar extends React.Component {

    constructor(props) {
        super(props);
    }

    goToRankings = () => {
        console.log(this.props.navigation)
        const { navigate } = this.props.navigation;
        navigate('Rankings', { title: 'Rankings' });
    }

    goToTourneys = () => {
        console.log(this.props.navigation)
        const { navigate } = this.props.navigation;
        this.props.navigation.navigate('First');
    }

    render() {
        return (
            <View style={styles.menuBar}>
                <TouchableOpacity style={styles.menuBarItem} onPress={() => this.goToTourneys()}>
                    <Icon type="simple-line-icon" name="event"></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBarItem} onPress={() => this.goToRankings()}>
                    <Icon type="simple-line-icon" name="people" ></Icon>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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



