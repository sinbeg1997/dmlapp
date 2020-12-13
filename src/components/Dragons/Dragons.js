import React, { useState, useEffect } from "react";
import { Text, View, Image, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import BlockContent from "@components/sharedcomponents/BlockContent";
import DragonItem from "./DragonItem";
import { isArray } from "lodash";
import Divider from "@components/UI/Divider";


const PAGE_SIZE_DEFAULT = 5;

const Dragons = ({
    getDragonData,
    dragonsData,
    setDragonsData,
    searchNameValue,
    ...props
}) => {

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isRefreshing, setRefreshing] = useState(false);
    const [isLoadMore, setLoadMore] = useState(false);

    useEffect(() => {
        getData(currentPage, PAGE_SIZE_DEFAULT, searchNameValue);
    }, []);


    const getData = async (
        page,
        pageSize,
        searchValue,
        isRefreshing = false) => {
        setLoading(true);
        let data = await getDragonData(page, pageSize);
        if (searchValue) {
            const lowerDragonName = searchValue.toLowerCase();
            data = data.filter(dragon => dragon.name.toLowerCase().includes(lowerDragonName));
        }
        if (isRefreshing) {
            setCurrentPage(0);
            setRefreshing(false);
        } else {
            setCurrentPage((prevPage) => prevPage + 1);
        }
        if (isArray(data) && data.length >= PAGE_SIZE_DEFAULT) {
            setLoadMore(true);
        } else {
            setLoadMore(false);
        }
        setDragonsData([...dragonsData, ...data]);
        setLoading(false);

    }

    const renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (isLoadMore) {
            return (
                <ActivityIndicator
                    color="#000"
                    size="large"
                />
            );
        }
        return null;
    };
    const handleLoadMore = () => {
        if (!loading && isLoadMore) {
            getData(currentPage, PAGE_SIZE_DEFAULT, searchNameValue);
        }
    };
    return (
        <View
            style={{
                flex: 1
            }}
        >
            <BlockContent
                title="Dragons"
            >
                {
                    (loading && currentPage === 0) ?
                        <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size="large" color="#000" />
                        </View> :
                        <FlatList
                            data={dragonsData}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={() => {
                                        setRefreshing(true);
                                        getData(currentPage, PAGE_SIZE_DEFAULT, searchNameValue, true)
                                    }}
                                />
                            }
                            renderItem={({ item }) => {
                                return (
                                    <DragonItem
                                        dragonData={item}
                                    />
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={Divider}
                            ListFooterComponent={renderFooter}
                            onEndReachedThreshold={0.4}
                            onEndReached={handleLoadMore}
                        />
                }
            </BlockContent>
        </View>
    )
}

export default Dragons;