import React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
const { height, width } = Dimensions.get('screen')
class CrauSalComponent extends Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0
        }
    }
  
//  componentDidMount(){
//      this.timer = setInterval(()=>{
//         this.onNextPress()
//       },80000)
//  }
//  componentWillUnmount(){
//     clearInterval(this.timer);
//  }
    setSelectedIndex = event => {
        //width of the view size 
        const ViewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x
        const selectedIndex = Math.floor(contentOffset / ViewSize)
        this.setState({ selectedIndex })

        // get current possition fo sccroview
    }
    onNextPress = () => {     this.setState(prev => ({ selectedIndex: prev.selectedIndex + 1 }),
            () => {
                this.scrollRef.current.scrollTo({

                    y: 0,
                    x: width * this.state.selectedIndex
                })
            }
        )
    }
    render() {
        const { data } = this.props
        let { selectedIndex } = this.state;
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <ScrollView
                    ref={this.scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.setSelectedIndex}
                >
                    {data.map(image => {

                        return (
                            <Image
                                key={image}
                                source={{ uri: image }}
                                style={styles.backgroundIMage}
                            />
                        )
                    })}
                </ScrollView>
                <View style={styles.whiteCircleView}>
                    {data.map((image, index) => {
                        return (
                            <View
                                key={image}
                                style={[styles.whiteCircle, { opacity: index === selectedIndex ? 0.5 : 1 }]}
                            >
                            </View>
                        )
                    })}
                </View>
                
            </View>
        )
    }
}
export default CrauSalComponent;

const styles = StyleSheet.create({
    backgroundIMage: {
        height: 200,
        width: width*0.8,
        marginHorizontal:10,
        borderRadius:10
    },
    whiteCircleView: {
      
        bottom: 15,
        height: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteCircle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'red',
        alignSelf: 'center'

    }
})