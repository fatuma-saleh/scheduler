import React, { Component } from "react";
//import 'components/DayListItem.js'
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const { days, value} = props;
  const listItem = days.map((currentDay) => {
    return (
      <DayListItem
        key={currentDay.id}
        name={currentDay.name}
        spots={currentDay.spots}
        selected={currentDay.name === value}
        //setDay={setDay}
        setDay={() => props.onChange(currentDay.name)}
      />
    )
  })

  return (
    <ul>
      {listItem}
    </ul>
  )
}