import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ children, ...props }) => {
    return (
        <TouchableOpacity
            style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#df8500",
                flexDirection: "row",
                justifyContent: "center",
                borderRadius: 7,
                marginTop: 20
            }}
            {...props}
        >
            <LinearGradient
                colors={['#f9db53', '#e7a402']}
                style={{
                    flex: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Button;

