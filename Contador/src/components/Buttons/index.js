import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function Buttons({ onIncrement, onDecrement }) {
    return (
        <View style={styles.containerBtn}>
            <TouchableOpacity style={[styles.buttonAct, styles.increment]} onPress={onIncrement}>
                <Text style={[styles.button, styles.text]}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonAct, styles.decrement]} onPress={onDecrement}>
                <Text style={[styles.button, styles.text]}>-</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerBtn: { width: 150, flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
    text: {
        color: "#FFF",
        fontSize: 30,
        textAlign: "center"
    },
    buttonAct: {
        width: 55,
        height: 55,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    increment: {
        backgroundColor: "#23005c"
    },
    decrement: {
        backgroundColor: "#23005c"
    }
});