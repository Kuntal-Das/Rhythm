import { useState } from "react";

export default function useToggle(initalValue = false) {
  const [isSomethingTrue, setIsSomethingTrue] = useState(initalValue);
  const toggle = () =>
    setIsSomethingTrue((prevIsSomethingTrue) => !prevIsSomethingTrue);

  return [isSomethingTrue, toggle];
}
