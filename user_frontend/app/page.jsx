"use client"
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Input,
  Checkmark
} from "@/global/components"

export default function Home() {
  return (
    <div className="p-2">
      <Button
        title="Button"
        variant="primary"
        onClick={() => console.log('Button clicked!')}
      />
      <Input
        placeholder="Enter text..."
        type="text"
        onChange={(value) => console.log(value)}
      />
      <Checkmark
        text="Remember me"
        defaultSelected={false}
        onChange={(isChecked) => console.log('Checkbox is now:', isChecked)}
      />
    </div>
  );
}
