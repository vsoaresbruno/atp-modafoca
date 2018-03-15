import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export default listViewItemSeparator = () => {
    return (
        <View style={styles.itemSeparator} />
    );
}

const styles = StyleSheet.create({
    itemSeparator: {
        height: .5,
        width: "100%",
        backgroundColor: "#c7c8c8",
    },
});