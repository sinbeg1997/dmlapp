import React, { useReducer, useMemo, useEffect } from 'react';
import { APP_DOMAIN } from "../constant/constant";
import { isEqual, isEmpty } from "lodash";
import { ActivityIndicator, View, Text, Image } from 'react-native';

const AppContext = React.createContext();

const initialState = {
    data: [],
    isFetching: false,
    error: {}
};


function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DATA_PENDING':
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case 'GET_DATA_SUCCESS':
            return {
                ...state,
                data: action.data,
                isFetching: false
            }
        case 'GET_DATA_FAIL':
            return {
                ...state,
                data: [],
                isFetching: false,
                error: action.error
            }
        default:
            return state;
    }
}

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const value = useMemo(() => [state, dispatch], [state]);

    useEffect(() => {
        getAppData();
    }, []);

    const getAppData = async () => {
        dispatch({ type: 'GET_DATA_PENDING' });
        try {
            const data = await fetch(`${APP_DOMAIN}/app-data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json());
            dispatch({ type: 'GET_DATA_SUCCESS', data });
        } catch (error) {
            dispatch({ type: 'GET_DATA_FAIL', error });
        }
    }
    return (
        <AppContext.Provider value={value}>
            {
                state.isFetching ?
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}>
                        <Image
                            style={{
                                width: 100,
                                height: 67.5,
                                resizeMode: "contain"
                            }}
                            source={require("@assets/img/chronos.png")}
                        />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontFamily: "Grobold" }}>Loading planner ...</Text>
                        </View>
                        {/* <ActivityIndicator size="large" color="#00ff00" /> */}
                    </View> :
                    children
            }
        </AppContext.Provider>
    )
}

function useAppDataState() {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error(`useAppDataState must be used within a AppContext`)
    }
    const [state, dispatch] = context;
    const { data, isFetching, error } = state;
    return {
        appData: data,
        setAppData: (data) => dispatch({ type: 'GET_DATA_SUCCESS', data }),
        isFetching,
        error
    }
}

export { AppProvider, useAppDataState };

