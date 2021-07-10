import { StyleSheet } from "react-native";
import Colors from '../../module/utils/Colors';

export default StyleSheet.create({
    btn: {
      backgroundColor: Colors.buttoncolor,
      paddingHorizontal: 40,
 
      paddingVertical: 15,
      borderRadius: 10,
      shadowColor:'rgba(0,0,0,0.9)',
      shadowOffset:{width:0,height:0},
      shadowRadius:3,
      shadowOpacity:1,
      elevation:5,
    
    },
    label: {
      color: Colors.themeColor,
      textAlign:'center',
      fontSize: 15,
      
    },
  });