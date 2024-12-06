import React, { useState } from "react";
import { datasource } from "./Data";
import { TextInput, View, Text, Button, TouchableOpacity, Alert, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 20,
        backgroundColor: "#f8f8f8",  // Light background for form
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
        marginTop: 20,
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

const Add = ({ navigation }) => {
    const [activity, setActivity] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Income');

    const validateAmount = (amount) => {
        const parsedAmount = parseFloat(amount);
        return !isNaN(parsedAmount) && parsedAmount >= 0;
    };

    const handleSubmit = () => {
        if (!validateAmount(amount)) {
            Alert.alert("Invalid Input", "Please enter a valid numeric amount.");
            return;
        }

        let item = { key: activity, amount: amount };
        let indexNum = type === "Income" ? 0 : 1;
        datasource[indexNum].data.push(item);
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Activity:</Text>
            <TextInput
                style={styles.inputField}
                placeholder="Enter activity"
                value={activity}
                onChangeText={setActivity}
            />

            <Text style={styles.label}>Amount:</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.inputField}
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
            />

            <Text style={styles.label}>Type:</Text>
            <RNPickerSelect
                value={type}
                onValueChange={setType}
                items={[
                    { label: "Income", value: "Income" },
                    { label: "Expense", value: "Expense" }
                ]}
            />

            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Add;
