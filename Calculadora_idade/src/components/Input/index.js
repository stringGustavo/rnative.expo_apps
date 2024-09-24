import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, Animated } from "react-native";
import React, { useState, useRef } from "react";

import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);

    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const [years, setAgeInYears] = useState(0);
    const [months, setAgeInMonths] = useState(0);
    const [days, setAgeInDays] = useState(0);

    const inputValidation = (stringDate) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(stringDate)) return false;

        const [year, month, day] = stringDate.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }

    const dateString = () => {
        const formattedMonth = String(month).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');

        const stringDate = `${year}-${formattedMonth}-${formattedDay}`;

        if (inputValidation(stringDate))
            calculateAge(stringDate);
    }

    const calculateAge = (dateAge) => {
        let today = new Date();
        let birth = new Date(dateAge);
        let msDiff = today - birth;

        setAgeInYears(today.getFullYear() - birth.getFullYear());
        setAgeInMonths(((today.getFullYear() - birth.getFullYear()) * 12) + ((today.getMonth()) - (birth.getMonth())));
        setAgeInDays(Math.floor(msDiff / (1000 * 60 * 60 * 24)));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculadora de Idade</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                    <Text style={[styles.textAge, styles.text]}>Dia</Text>
                    <TextInput style={styles.input}
                        value={day}
                        onSubmitEditing={() => input2Ref.current.focus()}
                        onChangeText={(value) => { setDay(value); }}
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        ref={input1Ref} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={[styles.textAge, styles.text]}>Mês</Text>
                    <TextInput style={styles.input}
                        value={month}
                        onSubmitEditing={() => input3Ref.current.focus()}
                        onChangeText={(value) => { setMonth(value); }}
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        ref={input2Ref} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={[styles.textAge, styles.text]}>Ano</Text>
                    <TextInput style={styles.input}
                        value={year}
                        onChangeText={(value) => { setYear(value); }}
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        ref={input3Ref} />
                </View>
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.addButton} onPress={() => dateString()}>
                    <Text style={styles.text}>Calcular idade</Text>
                </TouchableOpacity>
            </View>


            <Text style={[styles.text, styles.textMessage]}>Você já viveu:</Text>
            {(years || months || days) ? (
                <View style={styles.resultContainer}>
                    <View style={styles.result}>
                        <Text style={[styles.textResult, styles.text]}>{years}</Text>
                        <Text style={[styles.textResult, styles.text]}>Anos</Text>
                    </View>
                    <View style={styles.result}>
                        <Text style={[styles.textResult, styles.text]}>{months}</Text>
                        <Text style={[styles.textResult, styles.text]}>Meses</Text>
                    </View>
                    <View style={styles.result}>
                        <Text style={[styles.textResult, styles.text]}>{days}</Text>
                        <Text style={[styles.textResult, styles.text]}>Dias</Text>
                    </View>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    title: {
        color: '#cccccc',
        fontFamily: 'monospace',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    inputContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#cccccc',
        width: 100,
        height: 40,
        paddingLeft: 10,
        borderRadius: 10,
        marginHorizontal: 5
    },
    buttonBox: {
        flex: 0,
        alignItems: 'center',
    },
    addButton: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23005c',
        marginTop: 20,
        borderRadius: 10,
        height: 40,
        width: 300
    },
    textAge: {
        textAlign: 'center'
    },
    textMessage: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
    },
    resultContainer: {
        flex: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        gap: 40
    },
    result: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        width: 90,
        backgroundColor: '#17003d',
        borderRadius: 10,
        padding: 10
    },
    textResult: {
        fontSize: 20
    },
    text: {
        color: '#cccccc',
        // borderWidth: 1,
        // borderColor: "white"
    }
});
