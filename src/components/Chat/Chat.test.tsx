import React from "react";
import { screen, render } from "@testing-library/react";
import { Chat } from "./Chat";

describe('Chat component', () => {
  test('Should render', () => {
    render(<Chat/>);
    expect(screen.getByRole('heading', {level: 1})).toBeInTheDocument()
  })
})