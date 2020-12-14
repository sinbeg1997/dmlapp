import React, { useState, useEffect } from "react";
import { Text, View, Image, ImageBackground, Dimensions, TextInput } from "react-native";
import { calculateFoodCost, displayNumber, calculateMaxLevel } from "@utils/helpers";
import { MAX_LEVEL } from "@utils/config";
import BlockContent from "@components/sharedcomponents/BlockContent";

const MaxLevelCalculation = () => {
    const [currentLevel, setCurrentLevel] = useState("1");
    const [availableFood, setAvailableFood] = useState("");
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
    const onChangedAvailableFood = (text) => {
        const validateText = validateTextInput(text);
        setAvailableFood(validateText);
    }

    // const foodCost = calculateFoodCost(currentLevel, targetLevel);
    // const foodCostDisplay = displayNumber(foodCost);
    const maxLevel = calculateMaxLevel(+currentLevel, +availableFood);
    const addditionalFoodNeeded = calculateFoodCost(+currentLevel, +maxLevel + 1) - availableFood;
    return (
        <BlockContent
            title="Max level calculation"
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                    backgroundColor: "rgba(220,210,188,1)",

                }}>
                <Text>Calculate how many levels you can upgrade your dragon based on the amount of food you have.</Text>
                <View style={{ marginVertical: 20 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                        width: Dimensions.get('window').width / 2
                    }}>
                        <Text style={{ marginRight: 10 }}>Current level:</Text>
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
                                // marginLeft: "auto"
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                        // width: Dimensions.get('window').width / 2
                    }}>
                        <Text style={{ marginRight: 10 }}>Available food:</Text>
                        <TextInput
                            keyboardType='numeric'
                            onChangeText={(text) => onChangedAvailableFood(text)}
                            value={availableFood}
                            style={{
                                borderColor: "#000",
                                borderWidth: 1,
                                borderStyle: "solid",
                                backgroundColor: "#fff",
                                width: 150,
                                height: 50,
                                marginRight: 10
                            }}
                        />
                        <Image
                            style={{
                                height: 36,
                                width: 60,
                            }}
                            source={require("@assets/img/food.png")}
                        />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}>
                        <Text style={{ marginRight: 10, fontSize: 24 }}>Max level:</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flexWrap: "wrap"
                            }}
                        >
                            <Text style={{ fontFamily: "Grobold", marginRight: 10, fontSize: 24 }}>
                                {maxLevel}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                        flexWrap: "wrap"
                    }}>
                        <Text style={{ marginRight: 10, fontSize: 16 }}>
                            <Text>Additional food needed to reach level {` `}</Text>
                            <Text style={{ fontFamily: "Grobold", fontSize: 18 }}>{maxLevel < 100 ? maxLevel + 1 : 100}</Text>:
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flexWrap: "wrap"
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                {maxLevel < 100 ? displayNumber(addditionalFoodNeeded) : 0}
                            </Text>
                            <Image
                                style={{
                                    height: 18,
                                    width: 30,
                                    marginLeft: 5
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

export default MaxLevelCalculation;