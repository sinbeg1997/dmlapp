import React, { useState, useEffect } from "react";
import { Text, View, Image, ImageBackground, Dimensions, TextInput } from "react-native";
import { calculateFoodCost, displayNumber } from "@utils/helpers";
import { MAX_LEVEL } from "@utils/config";
import BlockContent from "@components/sharedcomponents/BlockContent";

const FoodCalculation = () => {
    const [currentLevel, setCurrentLevel] = useState("1");
    const [targetLevel, setTargetLevel] = useState("2");
    const validateTextInput = (text) => {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText += text[i];
            }
        }
        return newText;
    }
    const onChangedCurrentLevel = (text) => {
        const validateText = validateTextInput(text);
        if (+validateText <= MAX_LEVEL) {
            setCurrentLevel(validateText);
        }
    }
    const onChangedTargetLevel = (text) => {
        const validateText = validateTextInput(text);
        if (+validateText <= MAX_LEVEL) {
            setTargetLevel(validateText);
        }
    }

    const foodCost = calculateFoodCost(currentLevel, targetLevel);
    const foodCostDisplay = displayNumber(foodCost);
    return (
        <BlockContent
            title="Food cost calculation"
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                    backgroundColor: "rgba(220,210,188,1)",

                }}>
                <Text>Calculate how much food is needed to upgrade a dragon</Text>
                <View style={{ marginVertical: 20 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                        width: Dimensions.get('window').width / 2
                    }}>
                        <Text style={{ marginRight: 10 }}>Dragon's current level:</Text>
                        <TextInput
                            keyboardType='numeric'
                            onChangeText={(text) => onChangedCurrentLevel(text)}
                            value={currentLevel}
                            maxLength={3}
                            style={{
                                borderColor: "#000",
                                borderWidth: 1,
                                borderStyle: "solid",
                                backgroundColor: "#fff",
                                width: 50,
                                height: 50,
                                marginLeft: "auto"
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                        width: Dimensions.get('window').width / 2
                    }}>
                        <Text style={{ marginRight: 10 }}>Target level:</Text>
                        <TextInput
                            keyboardType='numeric'
                            onChangeText={(text) => onChangedTargetLevel(text)}
                            value={targetLevel}
                            maxLength={3}
                            style={{
                                borderColor: "#000",
                                borderWidth: 1,
                                borderStyle: "solid",
                                backgroundColor: "#fff",
                                width: 50,
                                height: 50,
                                marginLeft: "auto"
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}>
                        <Text style={{ marginRight: 10, fontSize: 24 }}>Food cost:</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flexWrap: "wrap"
                            }}
                        >
                            <Text style={{ fontFamily: "Grobold", marginRight: 10, fontSize: 24 }}>{foodCostDisplay}</Text>
                            <Image
                                style={{
                                    height: 36,
                                    width: 60,
                                }}
                                source={require("@assets/img/food.png")}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </BlockContent>
    )
}

export default FoodCalculation;