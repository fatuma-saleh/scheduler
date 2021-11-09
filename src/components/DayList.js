import React, { Component } from "react";
import 'components/DayListItem.js'
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const listItem = props.days.map((prop) => {
    return (
      <DayListItem
        key={prop.id}
        name={prop.name}
        spots={prop.spots}
        selected={prop.name === props.day}
        setDay={props.setDay}
      />


    )
  })


  return (
    <ul>
      {listItem}
    </ul>
  )
}