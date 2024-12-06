import React, { useState } from 'react';
import { datasource } from "./Data.js";
import { TextInput, View, Text, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";

// Function to map the type to its index in the datasource
const getIndexNum = (type) => {
    const types = ['Income', 'Expense'];
    return types.indexOf(type);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        backgroundColor: "#f8f8f8", // Light background for the form
    },
    inputField: {
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 10,
        flex: 1,  // Ensure buttons take equal space
        marginRight: 10, // Add margin to separate the buttons
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: "#f44336", // Red background for the delete button
    },
    saveButton: {
        backgroundColor: "#4CAF50", // Green background for the save button
    },
});

const Edit = ({ navigation, route }) => {
    const [activity, setActivity] = useState(route.params.key);
    const [amount, setAmount] = useState(route.params.amount);
    const [type, setType] = useState(route.params.type);

    const indexNum = getIndexNum(route.params.type);

    const validateAmount = (amount) => {
        const parsedAmount = parseFloat(amount);
        return !isNaN(parsedAmount) && parsedAmount >= 0;
    };

    const handleSave = () => {
        if (!validateAmount(amount)) {
            Alert.alert("Invalid Input", "Please enter a valid numeric amount.");
            return;
        }

        datasource[indexNum].data[route.params.index] = {
            key: activity,
            amount: amount,
        };
        navigation.navigate("Home");
    };

    const handleDelete = () => {
        Alert.alert(
            "Are you sure you want to delete this activity?",
            '',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        datasource[indexNum].data.splice(route.params.index, 1);
                        navigation.navigate("Home");
                    }
                },
                { text: 'No' },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Activity:</Text>
            <TextInput
                style={styles.inputField}
                value={activity}
                onChangeText={setActivity}
                placeholder="Enter activity"
            />

            <Text style={styles.label}>Amount:</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.inputField}
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Edit;
