import React from 'react'
import ModalLogin from '~/Componenets/ModalLogin'
import ModalRegister from '~/Componenets/ModalRegister'

const HomePage : React.FC = () => {
  return (
    <div>
        <h1>HomePage</h1>
        <ModalLogin/>
        <ModalRegister/>
    </div>
  )
}

export default HomePage