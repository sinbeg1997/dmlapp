import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import Modal from 'react-native-modal';
import { get, isString } from "lodash";
import { calcBaseAttack, calcBaseHealth, calcBaseGold } from "@utils/helpers";

const DragonDetail = ({
    open,
    onClose,
    data,
    ...props
}) => {

    const [isVisible, setVisible] = useState(false);
    console.log("###data", data);

    useEffect(() => {
        setVisible(open);
    }, [isVisible]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    const dragonName = get(data, "name", '---');
    const dragonImage = get(data, "image", null) ?
        `https://dml-planner.eu/images/dragons/${data.image}` : '';
    const dragonElements = get(data, "image", null) ? get(data, "elements", null) : [];
    const dragonType = get(data, "type", null) && isString(data.type) ? data.type.toLowerCase() : '';
    const baseAttack = calcBaseAttack(dragonName, dragonElements, dragonType);
    const baseHealth = calcBaseHealth(dragonName, dragonElements, dragonType);
    const baseGold = calcBaseGold(dragonElements, dragonType);

    return (
        <Modal
            isVisible={isVisible}
            style={{
                // backgroundColor: "#FFFFFF",
                flex: 1,
                margin: 0
            }}
        >
            <View style={{ flex: 1 }}>
                <Image
                    resizeMode="contain"
                    style={{ flex: 1, width: undefined, height: undefined }}
                    source={{
                        uri: dragonImage
                    }}
                />
                <Button title="Close" onPress={handleClose} />
            </View>
        </Modal>
    )
}

export default DragonDetail;
