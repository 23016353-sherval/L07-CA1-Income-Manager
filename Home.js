import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { datasource } from './Data';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    incomeHeader: {
        backgroundColor: '#4caf50',
        color: '#fff',
    },
    expenseHeader: {
        backgroundColor: '#f44336',
        color: '#fff',
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        width: 150,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const calculateTotal = () => {
    const totalIncome = datasource[0].data.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const totalExpense = datasource[1].data.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const difference = totalIncome - totalExpense;

    const surplusOrDeficit = difference > 0
        ? `Surplus of $${difference.toFixed(1)}`
        : `Deficit of $${Math.abs(difference).toFixed(1)}`;

    const message = `Total Income: $${totalIncome.toFixed(1)}\nTotal Expenses: $${totalExpense.toFixed(1)}\nYou have a ${surplusOrDeficit}`;

    Alert.alert('Calculation Result', message);
};

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                    navigation.navigate("Edit", {
                        index: index,
                        type: section.title,
                        key: item.key,
                        amount: item.amount,
                    });
                }}
            >
                <Text style={styles.itemText}>{item.key} - ${item.amount}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {datasource.map((section, index) => (
                <View key={index}>
                    <Text style={[styles.sectionHeader, section.title === "Income" ? styles.incomeHeader : styles.expenseHeader]}>
                        {section.title}
                    </Text>
                    {section.data.map((item, index) => (
                        renderItem({ item, index, section })
                    ))}
                </View>
            ))}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Add")}>
                    <Text style={styles.buttonText}>Add Activity</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={calculateTotal}>
                    <Text style={styles.buttonText}>Calculate Total</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
