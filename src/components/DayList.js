import React, { Component } from "react";
//import 'components/DayListItem.js'
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  console.log("+++",props)
  const { days, day, setDay } = props;
  const listItem = days.map((curentDay) => {
    return (
      <DayListItem
        key={curentDay.id}
        name={curentDay.name}
        spots={curentDay.spots}
        selected={curentDay.name === day}
        setDay={setDay}
      />

    )
  })


  return (
    <ul>
      {listItem}
    </ul>
  )
}