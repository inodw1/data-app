import React from 'react';
import { View, Text, Dimensions } from 'react-native';
const window = Dimensions.get('window');

const Card = (props) => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.itemId}>
                {props.itemId}
            </Text>

            <Text style={styles.itemTitle}>
                {props.itemTitle}
            </Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: (window.width) * 0.025,
        borderRadius: 10,
        borderWidth: 0.5,
    },
    itemId: {
        color: '#000',
        padding: (window.width * 0.04),
        fontSize: (window.width) * 0.045,
    },
    itemTitle: {
        fontWeight: 'normal',
        flexShrink: 1,
        color: '#000',
        padding: (window.width * 0.04),
        fontSize: (window.width) * 0.045,
    },
};

export { Card };
