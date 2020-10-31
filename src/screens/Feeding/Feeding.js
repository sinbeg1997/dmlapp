import React from 'react';
import { ScrollView, View, ImageBackground } from "react-native";
import FoodCalculation from '@components/FoodCalculation';


const Feeding = () => {

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
                    <FoodCalculation />
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

export default Feeding;