import React from 'react';
import { ScrollView, View, ImageBackground, ActivityIndicator } from "react-native";
import OverView from '../../components/OverView';
import ListActionNavigate from '../../components/ListActionNavigate';


const DashBoard = ({ navigation }) => {

    return (
        <ScrollView>
            <ImageBackground
                style={{
                    flex: 1,
                    resizeMode: "cover",
                }}
                source={require("@assets/img/bg-app.jpg")}
            >
                <View style={{
                    marginBottom: 50,
                    marginTop: 30
                }}>
                    <OverView />
                </View>
                <View>
                    <ListActionNavigate />
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

export default DashBoard;