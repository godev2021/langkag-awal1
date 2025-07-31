import React from 'react'

const ItemSidebar = ({children}) => {
  return (
    <li className="mx-3 py-2 px-3"><span className="font-semibold">{children}</span></li>
  )
}

export default ItemSidebar