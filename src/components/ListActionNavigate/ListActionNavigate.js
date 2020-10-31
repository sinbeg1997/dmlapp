import React from 'react';
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BlockContent from '@components/sharedcomponents/BlockContent';

const listNavigate = [
    {
        icon: require("@assets/img/little-fire-dragon.png"),
        description: "Manage your dragon collection",
        screenName: "Manage your dragon collection"
    },
    {
        icon: require("@assets/img/breeding-icon.png"),
        description: "View breeding combinations",
        screenName: "Feeding",
    },
    {
        icon: require("@assets/img/gold-bag.png"),
        description: "Review your economy",
        screenName: "Feeding"
    },
    {
        icon: require("@assets/img/arena-icon.png"),
        description: "Plan your team",
        screenName: "Feeding"
    },
    {
        icon: require("@assets/img/void-temple-level4.png"),
        description: "Plan temple strategies",
        screenName: "Feeding"
    },
    {
        icon: require("@assets/img/legendary-extraordinary.png"),
        description: "View enchantment materials",
        screenName: "Feeding"
    },
    {
        icon: require("@assets/img/food.png"),
        description: "Calculate food spending",
        screenName: "Feeding"
    },
    {
        icon: require("@assets/img/farm.png"),
        description: "Calculate farming combos",
        screenName: "Feeding"
    }
]

function ListActionNavigate() {
    const navigation = useNavigation();
    return (
        <BlockContent
            title="What would you like to do?"
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                    backgroundColor: "rgba(220,210,188,1)",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                {
                    listNavigate.map((action, idx) => {
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={{
                                    width: "49%",
                                    minHeight: 160,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 2,
                                    borderStyle: "solid",
                                    borderColor: "transparent",
                                    backgroundColor: "rgba(151,119,78,.15)",
                                    paddingHorizontal: 10,
                                    paddingVertical: 20,
                                    borderRadius: 15
                                }}
                                onPress={() => navigation.navigate(action.screenName)}
                            >
                                <Image
                                    style={{
                                        // width: 60,
                                        height: 60,
                                        resizeMode: "contain"
                                    }}
                                    source={action.icon}
                                />
                                <Text style={{
                                    textAlign: "center",
                                    marginTop: 15
                                }}>{action.description}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </BlockContent>
    )
}

export default ListActionNavigate;
