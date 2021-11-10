import React, { Component } from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  console.log("propsItem",props)
  const interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected ": props.selected
  });

  return(
<li className={interviewersClass} onClick={() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>


  );
}


