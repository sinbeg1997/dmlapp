import React, { useState, useEffect } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { APP_DOMAIN } from "@constant/constant";
import { get, isString } from "lodash";
import { calcBaseAttack, calcBaseHealth, calcBaseGold } from "@utils/helpers";

const DragonItem = ({
    dragonData,
    ...props
}) => {
    const dragonName = get(dragonData, "name", '---');
    const dragonImage = get(dragonData, "image", null) ?
        `https://dml-planner.eu/images/dragons/${dragonData.image}` : '';
    const dragonElements = get(dragonData, "image", null) ? get(dragonData, "elements", null) : [];
    const dragonType = get(dragonData, "type", null) && isString(dragonData.type) ? dragonData.type.toLowerCase() : '';
    const baseAttack = calcBaseAttack(dragonName, dragonElements, dragonType);
    const baseHealth = calcBaseHealth(dragonName, dragonElements, dragonType);
    const baseGold = calcBaseGold(dragonElements, dragonType);
    return (
        <View
            style={{
                flex: 1,
                padding: 15,
                marginTop: 10,
            }}
        >
            <View style={{
                flexDirection: "row",
            }}>
                <Image
                    resizeMode="contain"
                    style={{ flex: 1, width: undefined, height: undefined }}
                    source={{
                        uri: dragonImage
                    }}
                />
                <View style={{
                    marginLeft: 20,
                    width: Dimensions.get("window").width - 120
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",

                    }}>
                        <Text style={{ fontFamily: "Grobold", fontSize: 20 }}>{dragonName}</Text>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            {
                                dragonElements.map((element) => {
                                    return (
                                        <Image
                                            key={element}
                                            style={{
                                                width: 38,
                                                height: 38,
                                            }}
                                            source={{
                                                uri: `${APP_DOMAIN}/images/elements/${element}.png`
                                            }}
                                        />
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 15
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Image
                                style={{
                                    width: 28,
                                    height: 28,
                                    marginRight: 10
                                }}
                                source={{
                                    uri: `${APP_DOMAIN}/images/types/${dragonType}.png`
                                }}
                            />
                            <Image
                                style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 5
                                }}
                                source={{
                                    uri: `${APP_DOMAIN}/images/attack.png`
                                }}
                            />
                            <Text style={{ fontFamily: "Grobold", fontSize: 16 }}>{baseAttack}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Image
                                style={{
                                    width: 28,
                                    height: 28,
                                    marginRight: 5
                                }}
                                source={{
                                    uri: `${APP_DOMAIN}/images/health.png`
                                }}
                            />
                            <Text style={{ fontFamily: "Grobold", fontSize: 16 }}>{baseHealth}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Image
                                style={{
                                    width: 28,
                                    height: 28,
                                    marginRight: 5
                                }}
                                source={{
                                    uri: `${APP_DOMAIN}/images/gold.png`
                                }}
                            />
                            <Text style={{ fontFamily: "Grobold", fontSize: 16 }}>{baseGold}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DragonItem;