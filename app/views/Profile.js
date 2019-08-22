import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { getDataFromServer } from '../services/server';
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
            data: this.props.navigation.state.params.data,
        };
    }

    componentWillMount() {
        this.getDataFromAPI();
    }

    getDataFromAPI = () => {
        getDataFromServer('photos?album=1').then((responseJson) => {
            try {
                if (responseJson === 404) {
                    this.setState({ refreshing: false });
                    Alert.alert(
                        'Data-App',
                        'Unable to fetch data from the server. Please check your internet connection.', [
                            {
                                text: 'OK',
                            },
                        ], {
                            cancelable: false,
                        }
                    );
                }
                else {
                    this.setState({
                        PostsData: responseJson,
                    });
                }
            } catch (error) {
                console.log(`${error}`);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.name}>{this.state.data.title}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.description}>{this.state.data.body}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#00BFFF',
    },
    name: {
        color: '#ffffff',
        fontWeight: '600',
        flexShrink: 1,
        padding: (window.width * 0.04),
        fontSize: (window.width) * 0.06,
    },
    body: {
        marginTop: 10,
        padding: 20,
        flexDirection: 'row',
    },
    description: {
        color: '#696969',
        fontSize: (window.width) * 0.045,
        textAlign: 'left',
        flexWrap: 'wrap',
    },
});

export default Profile;
