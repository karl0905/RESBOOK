import { Logo, Heading, Card, Darkbackground } from "@/features/dashboard/"

import { Navbar } from "@/global/components/"

export default function page() {
  return (
    <div>
      <Logo />
      <Darkbackground>
        <Heading />
        <Card />
      </Darkbackground>
      <Navbar />
    </div>
  )
}
