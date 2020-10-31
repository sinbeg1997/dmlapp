import React, { useState, useEffect } from "react";
import { Text, View, Image, ImageBackground, Dimensions, TextInput } from "react-native";
import BlockContent from "@components/sharedcomponents/BlockContent";
import SearchName from "./SearchName";
import Button from "@components/UI/Button";

const SearchDragon = ({
    onSearchName
}) => {

    return (
        <BlockContent
            title="Search"
        >
            <View style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 30,
                backgroundColor: "rgba(220,210,188,1)",
            }}>
                <SearchName
                    onSearch={onSearchName}
                />
            </View>
        </BlockContent>
    )
}

export default SearchDragon;