import React, { Component } from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  console.log("++++props", props)
  const interviewerList = props.interviewers.map((currentInterviewer) => {

    return (
      <InterviewerListItem
        key={currentInterviewer.id}
        name={currentInterviewer.name}
        avatar={currentInterviewer.avatar}
        interviewer={currentInterviewer.id}
        selected={currentInterviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(currentInterviewer.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )

}