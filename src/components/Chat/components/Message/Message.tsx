import React, {FC, useEffect, useRef} from "react";
import {useResizeObserver} from '../../hooks/useResizeObserver';

interface MessageProps {
  index: number,
  style: {},
  message: {
    content: string
  }
}

export const Message: FC<MessageProps> = ({ index, style, message }) => {
  const ref = useRef<HTMLParagraphElement>(null)
  
  useEffect(() => {
    console.log(ref.current?.offsetHeight)
  },[])

  return (
    <p ref={ref}>{message.content}</p>
  )
}