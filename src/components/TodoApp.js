import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView, Keyboard } from 'react-native';
import style from './../assets/styles/style';
import { connect } from 'react-redux';
import {addTodo, remove, completeTodo}  from './../redux/actions';


class TodoApp extends Component {

    state = {
        taskName: null,
        id: 1
    }

    add = () => {

        Keyboard.dismiss();

        if(this.state.taskName != null) {
            const task = {
                id: this.state.id,
                name: this.state.taskName,
                completed: false
            }
    
            this.props.dispatchAddTodo(task);
    
            this.setState(  { id: this.state.id + 1, taskName: null});
        } else {
            alert("Digite algo para adicionar na lista.")
        }
        
        
    }

    completedTask = (task) => {
        this.props.dispatchCompleteTodo(task);
    }

    remove = (task) => {
        this.props.dispatchRemoveTodo(task);
    }

    renderList = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.completedTask(item)}>
                <View style={localStyle.itemList}>
                    <Text style={item.completed === true ? {color: 'rgba(255,255,255, 0.5)', textDecorationLine: 'line-through'} : {color: 'white'}}>
                        {item.id + ' - ' + item.name}
                    </Text>
                    <TouchableOpacity onPress={() => this.remove(item)} style={{position: 'absolute', alignSelf: 'flex-end', right: 20, backgroundColor: 'rgba(0,0,0,0.15)', padding: 10, borderRadius: 15}}>
                        <Text style={{color: '#fff', fontSize: 13}}>Remover</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
                <ImageBackground source={require('./../assets/bg.jpg')} style={{width: '100%', height: '100%'}}>

                    <View style={localStyle.overlay}>
                            <View style={style.container}>
                                <Text style={localStyle.text1}>Lista de Compras</Text>
                                <View style={localStyle.section}>
                                    <TextInput
                                        value={this.state.taskName}
                                        placeholder="Digite algo..."
                                        onChangeText={(t) => this.setState({taskName: t})}
                                        selectionColor="#fff"
                                        placeholderTextColor="#fff"
                                        underlineColorAndroid={'rgba(255, 255, 255, 0)'}
                                        style={localStyle.input}>
                                    </TextInput>
                                    <TouchableOpacity style={localStyle.button} onPress={() => this.add()}>
                                        <Text style={{color: '#fff', fontSize: 16}}>Adicionar</Text>
                                    </TouchableOpacity>

                                    <ScrollView style={{marginBottom: 50}}>

                                        <FlatList
                                            data={this.props.todos} 
                                            keyExtractor={item => item.id} 
                                            renderItem={this.renderList} >

                                        </FlatList>
                                    </ScrollView>

                                </View>
                            </View>
                        
                    </View>

                </ImageBackground>
        )
    }
}

const mapStateToProps = state => {
    const { todos } = state;
    return { todos }; 
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchAddTodo: (task) => dispatch(addTodo(task)),
        dispatchRemoveTodo: (task) => dispatch(remove(task)),
        dispatchCompleteTodo: (task) => dispatch(completeTodo(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

const localStyle = StyleSheet.create({
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    section: {
        marginTop: 20
    },
    text1: {
        color: 'white',
        fontSize: 18
    },
    input: {
        position: 'relative',
        padding: 10,
        width: Dimensions.get('screen').width * 0.95,
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        color: '#fff'
    },
    button: {
        marginTop: 10,
        padding: 10,
        width: Dimensions.get('screen').width * 0.95,
        height: 50,
        borderRadius: 5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(142, 56, 135, 0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemList: {
        marginTop: 10,
        
        width: Dimensions.get('screen').width * 0.95,
        height: 65,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255, 0.15)',
        padding: 15,
        justifyContent: 'center',
    }
})