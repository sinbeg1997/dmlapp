import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import BlockContent from "@components/sharedcomponents/BlockContent";
import { useAppDataState } from "../../providers/AppProviver";
import { cloneDeep, findIndex, get } from "lodash";

const overViewConfig = [
    {
        key: "DRAGON",
        data: "0 / 0",
        icon: require("@assets/img/little-fire-dragon.png"),
        subText: "dragon collected",
    },
    {
        key: "GOLD",
        data: "0",
        icon: require("@assets/img/gold.png"),
        subText: "gold from dragons / hour"
    },
    {
        key: "COLLECTOR_POINT",
        data: "0",
        icon: require("@assets/img/collector-points-icon.png"),
        subText: "collector points"
    }
]

const OverView = () => {
    const [overViewData, setOverViewData] = useState(overViewConfig);
    const { appData } = useAppDataState();
    useEffect(() => {
        const newOverViewData = cloneDeep(overViewConfig);
        const dragonTemplates = get(appData, "dragonTemplates", []);
        const idx = findIndex(newOverViewData, { key: "DRAGON" });
        if (idx > -1) {
            newOverViewData[idx].data = `${0}/${dragonTemplates.length}`;
        }
        setOverViewData(newOverViewData)
    }, [appData])
    return (
        <BlockContent
            title="Overview"
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                    backgroundColor: "rgba(220,210,188,1)",
                }}>
                {
                    overViewData.map((oData, idx) => {
                        return (
                            <View key={oData.key} style={{
                                paddingVertical: 30,
                                paddingHorizontal: 40,
                                borderWidth: 2,
                                borderStyle: "solid",
                                borderColor: "rgba(151, 119, 78, .3)",
                                borderRadius: 15,
                                backgroundColor: "rgba(151,119,78,.2)",
                                marginBottom: idx != overViewData.length - 1 ? 20 : 0
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <Text style={{ fontSize: 36, fontFamily: "Grobold" }}>{oData.data}</Text>
                                    <Image
                                        style={{
                                            width: 38,
                                            height: 38,
                                            marginLeft: 10
                                        }}
                                        source={oData.icon}
                                    />
                                </View>
                                <Text style={{ fontSize: 18, marginTop: 5 }}>{oData.subText}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </BlockContent>
    )
}

export default OverView;