import Dragons from '@components/Dragons';
import SearchDragon from '@components/SearchDragon';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground } from "react-native";
import { useAppDataState } from "@providers/AppProviver";
import { get, isString } from "lodash";

const ManageDragon = () => {
    const { appData } = useAppDataState();
    const dragonTemplates = get(appData, "dragonTemplates", []);
    const [dragonsData, setDragonsData] = useState([]);
    const [searchNameValue, setSearchNameValue] = useState('');

    const getDragonData = (page, pageSize) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = dragonTemplates.slice(page * pageSize, pageSize * (page + 1));
                resolve(data);
            }, 100);
        })
    }

    const handleSearch = (dragonName) => {
        const lowerDragonName = isString(dragonName) ? dragonName.toLowerCase() : '';
        const filterData = dragonTemplates.filter(dragon => dragon.name.toLowerCase().includes(lowerDragonName));
        setDragonsData(filterData);
        setSearchNameValue(dragonName);
    }

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <ImageBackground
                style={{
                    flex: 1,
                    resizeMode: "cover",
                }}
                source={require("@assets/img/bg-app.jpg")}
            >

                <View style={{
                    marginBottom: 50,
                    marginTop: 30,
                    flex: 1
                }}>
                    <View style={{ marginBottom: 30, flex: 1 }}>
                        <SearchDragon
                            onSearchName={handleSearch}
                        />
                    </View>
                    <Dragons
                        getDragonData={getDragonData}
                        dragonsData={dragonsData}
                        setDragonsData={setDragonsData}
                        searchNameValue={searchNameValue}

                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default ManageDragon;