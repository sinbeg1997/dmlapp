import React from "react";
import { Text, View, ImageBackground } from "react-native";

const BlockContent = ({
    children,
    title = "---",
    ...props
}) => {

    return (
        <View style={{
            flex: 1,
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "rgba(70,61,49,.33)",
            borderRadius: 10,
            position: "relative"
        }}>
            <ImageBackground
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}
                source={require("@assets/img/bg-app.jpg")}
            >
                {children}
            </ImageBackground>
            <View style={{
                position: "absolute",
                top: -20,
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <View style={{
                    paddingHorizontal: 20,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderStyle: "solid",
                    backgroundColor: "#daceb9",
                    paddingVertical: 5
                }}>
                    <Text style={{
                        fontSize: 22,
                        textShadowColor: "#fff",
                        fontFamily: "Grobold",
                        letterSpacing: 0.5,
                    }}>{title}</Text>
                </View>
            </View>
        </View>
    )
}

export default BlockContent;