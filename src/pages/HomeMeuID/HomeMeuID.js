import React from 'react'
import { Card } from '../../components/common/Card/Card'
import LoginMeuIdForm from '../../forms/meuid/LoginMeuId'

const HomeMeuID = () => {
  return(
    <div className="container">
      <Card>
        <LoginMeuIdForm />
      </Card>
    </div>
  )
}

export default HomeMeuID
