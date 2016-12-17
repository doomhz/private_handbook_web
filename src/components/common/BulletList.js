import React from 'react';

export const BulletList = (props)=> {
  if (!props.items.length) return null
  let listItems = props.items.map((item, i)=> {
    return (
      <li key={i}>{item}</li>
    )
  })
  return <ul>{listItems}</ul>
}