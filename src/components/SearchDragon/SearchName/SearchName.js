import React, { useState, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import Button from "@components/UI/Button";

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
            <Button onPress={() => onSearch(name)}>
                <Text style={{ fontSize: 16, fontFamily: "Grobold" }}>Search</Text>
            </Button>
        </View>
    )
}

export default SearchName;