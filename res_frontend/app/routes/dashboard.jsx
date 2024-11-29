import React from "react"

import Logo from "../../features/dashboard/Logo"
import Heading from "../../features/dashboard/Heading"
import Darkbackground from "../../features/dashboard/Darkbackground"
import Card from "../../features/dashboard/Card"

export default function Dashboard() {
  return (
    <div>
      <Logo />
      <Darkbackground>
        <Heading />
        <Card />
      </Darkbackground>
    </div>
  )
}
