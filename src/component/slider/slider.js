import React, { Component } from "react";
import { Platform, StyleSheet, Text,Image ,View, Dimensions } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
const { width, height } = Dimensions.get('window')
const images = [
    {id:1,image:"https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {id:2,image:"https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"},
    {id:3,image:"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {id:4,image:"https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
    {id:5,image:"https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"}
];

export default class App extends Component {
    renderItem = ({item,index}) => {
     
        return (
            <View key={index}>
            <Image
                style={styles.slideImage}
                source={{ uri: item.image }}
                resizeMode={'stretch'}
            />
        </View>
        )
    }
    render() {
        return(
        <View style={styles.slideShowWrapper}>
            <AppIntroSlider
                data={images}
                doneLabel={''}
                prevLabel={''}
                nextLabel={''}
                renderItem={this.renderItem}
                activeDotStyle={{backgroundColor:'red'}}
            />
        </View>
        )

    }
}

const styles = StyleSheet.create({
    slideShowWrapper: {
        backgroundColor: 'white',
        height:height/4,
        width: width - 20,
        margin:10
    },
    slideImage: {
        height:height/5,
        width: width - 20,
        borderRadius:10
    },
});