import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Text,
} from 'react-native';
const window = Dimensions.get('window');

class Profile extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: 'Profile Page',
            headerTintColor: '#000',
            titleStyle: {
                color: '#000',
            },
            headerStyle: {
                elevation: 0,
            },
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: (window.height) * 0.035,
                flex: 1,
            },
        };
    };

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <View>
                <Text>Profile Screen</Text>
            </View>
        );
    }
}

export default Profile;
