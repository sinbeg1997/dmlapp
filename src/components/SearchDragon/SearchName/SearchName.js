import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const SearchName = ({
    onSearch
}) => {
    const [name, setName] = useState('');

    const handleChangeName = (value) => {
        setName(value);
    }
    return (
        <View>
            <TextInput
                value={name}
                onChangeText={text => handleChangeName(text)}
                style={{
                    borderBottomWidth: 1,
                    borderColor: "#afa594",
                    backgroundColor: "#fff",
                    fontSize: 20,
                    paddingHorizontal: 10
                }}
                placeholder="Search by dragon name ..."
            />
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
                onPress={() => onSearch(name)}
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
                    <Text style={{ fontSize: 16, fontFamily: "Grobold" }}>Search</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default SearchName;