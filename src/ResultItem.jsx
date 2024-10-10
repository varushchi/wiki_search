import React from 'react'
import './ResultItem.css'

export default function ResultItem(props) {

  const time = new Date(props.time)

  return (
    <div className='ResultItem' id={props.id}>
      <a href={`https://en.wikipedia.org/wiki?curid=${props.id}`} target='_blank' rel="noreferrer"><h3>{props.title}</h3></a>
      <p dangerouslySetInnerHTML={{ __html: props.snippet }} />
      <span className='time-span'>{time.getHours()}:{time.getMinutes() < 10 ? `0${time.getMinutes()}`: time.getMinutes()} {time.toDateString().split(' ').slice(1).join(' ')}</span>
    </div>
  )
}
