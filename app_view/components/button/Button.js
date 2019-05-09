import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native'
export default class Button extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button>Azul</Button>
                <Button>Blanco</Button>
                <Button>Negro</Button>
                <Button>Gris</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffbf',
    }
});
