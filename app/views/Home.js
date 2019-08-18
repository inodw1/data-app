import React, { Fragment } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Dimensions,
    Alert,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { getDataFromServer } from '../services/server';
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from '../components/Home/Card';

const window = Dimensions.get('window');

class Home extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: 'Welcome to Data App',
            headerTintColor: '#000',
            titleStyle: {
                color: '#000',
            },
            headerLeft: null,
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

    constructor() {
        super();
        this.state = {
            PostsData: [],
            refreshing: false,
        };
    }

    componentDidMount() {
        this.getDataFromCache();
    }

    getDataFromCache = async () => {
        try {
            const data = await AsyncStorage.getItem('posts');
            if (data !== null) {
                this.setState({
                    PostsData: JSON.parse(data),
                });
            } else {
                this.getDataFromAPI();
            }
        } catch (error) {
            console.log(`${error}`);
        }
    }

    getDataFromAPI = () => {
        getDataFromServer('posts').then((responseJson) => {
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
                        refreshing: false,
                    });
                    this.setDataToCache(responseJson);
                }
            } catch (error) {
                console.log(`${error}`);
                this.getDataFromCache();
            }
        });
    }

    setDataToCache = async (params) => {
        try {
            await AsyncStorage.setItem('posts', JSON.stringify(params));
        } catch (error) {
            console.log(`${error}`);
        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getDataFromAPI();
    }

    render() {
        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                        <FlatList
                            data={this.state.PostsData}
                            keyExtractor = { (item, index) => index.toString() }
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity>
                                        <Card itemId={item.id} itemTitle={item.title} />
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }
}

export default Home;
