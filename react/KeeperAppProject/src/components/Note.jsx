import React from 'react'


export default function (props) {
  return (
    <div  className="note">
      <h1> {props.title} </h1>
      <p> {props.content} </p>
    

    </div>
  )
}
