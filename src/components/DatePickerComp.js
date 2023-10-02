import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePickerComp = ({isDatePickerVisible,setDatePickerVisibility,setDateTime,date}) => {
  
    
      const hideDatePicker = () => {
        setDatePickerVisibility?.(false);
      };
    
      const handleConfirm = (date) => {
        setDateTime?.(date)
        hideDatePicker();
      };

  return (

      <DateTimePickerModal
        date={date ?? new Date()}
        minimumDate={new Date()}
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
  );
};

export default DatePickerComp;