import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard, Animated } from "react-native";
import React, { useState, useRef } from "react";

import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);

    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [imc, setImc] = useState(0);
    const [status, setStatus] = useState('');

    const imcCategories = [
        { min: 0, max: 18.5, label: 'Abaixo do peso' },
        { min: 18.5, max: 24.9, label: 'Peso normal' },
        { min: 25, max: 29.9, label: 'Sobrepeso' },
        { min: 30, max: Infinity, label: 'Obesidade' }
    ];

    const calculateIMC = (height, weight) => {
        if (height > 0 && weight > 0) {
            const imcValue = parseFloat(weight) / (height * height);
            setImc(imcValue.toFixed(2));

            const classification = imcCategories.find( (category) => imcValue >= category.min && imcValue < category.max);
            setStatus(classification.label);
        } else {
            setImc(-1);
            setStatus("Ocorreu um problema:");
        }
    }

    const heightHandler = (height) => {
        const sanitizeHeight = regexValidation(height);
        setHeight(sanitizeHeight);
        calculateIMC(sanitizeHeight, weight);
    }

    const weightHandler = (weight) => {
        const sanitizeWeight = regexValidation(weight);
        setWeight(sanitizeWeight);
        calculateIMC(height, sanitizeWeight);
    }

    const regexValidation = (value) => { return value.replace(/[^0-9.]/g, '') }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculadora de IMC</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                    <Text style={[styles.textSubTitle, styles.text]}>Altura (m)</Text>
                    <TextInput style={styles.input}
                        value={height}
                        onSubmitEditing={() => input2Ref.current.focus()}
                        onChangeText={heightHandler}
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        ref={input1Ref} />
                </View>
                <View style={styles.inputBox}>
                    <Text style={[styles.textSubTitle, styles.text]}>Peso (kg)</Text>
                    <TextInput style={styles.input}
                        value={weight}
                        onChangeText={weightHandler}
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        ref={input2Ref} />
                </View>
            </View>

            <Text style={[styles.text, styles.textMessage]}>Resultado:</Text>

                { (imc != 0) ? (
                    <View style={styles.resultContainer}>
                    <View style={styles.result}>
                        <Text style={[styles.text, styles.textResult]}>{status}</Text>
                        { (!height) ? <Text style={[styles.text, styles.textResult]}>Altura inválida</Text> : null }
                        { (!weight) ? <Text style={[styles.text, styles.textResult]}>Peso inválido</Text> : null }
                        { (weight && height) ? <Text style={[styles.text, styles.textResult]}>{imc}</Text> : null }
                    </View>
                </View>
                ) : (
                    null
                ) }
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
    button: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23005c',
        marginTop: 20,
        borderRadius: 10,
        height: 40,
        width: 300
    },
    textSubTitle: {
        textAlign: 'center',
        marginBottom: 5
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
        minWidth: 100,
        backgroundColor: '#17003d',
        borderRadius: 10,
        padding: 10
    },
    textResult: {
        fontSize: 20,
    },
    text: {
        color: '#cccccc',
        // borderWidth: 1,
        // borderColor: "white"
    }
});
