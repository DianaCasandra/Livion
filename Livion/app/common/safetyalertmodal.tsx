import React from 'react';
import { Modal, View } from 'react-native';
import { ThemedText } from '../../components/atoms/ThemedText';

export default function SafetyAlertModal({visible=false, onClose=()=>{}}:{visible?:boolean; onClose?:()=>void}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.4)'}}>
        <View style={{backgroundColor:'#fff', padding:20, borderRadius:8, width:'90%'}}>
          <ThemedText variant="h1">Safety alert</ThemedText>
          <ThemedText style={{marginTop:8}}>This is a critical safety notification.</ThemedText>
        </View>
      </View>
    </Modal>
  );
}