import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Login from '../components/Login'

describe('Login page', () => {
  test('renders front page', () => {
    const mockonLogin = jest.fn()

    const component = render(
      <Login onLogin={mockonLogin} />
    )

    expect(component.container).toHaveTextContent(
      'Enter', 
      'If you have an existing account you will be logged in', 
      "If you don't have an existing account one will be created for you and you will be logged in automatically", 
      'Username', 
      'Password'
    )
  })

  test('clicking enter sends data and calls onLogin', () => {
    const mockonLogin = jest.fn()

    const component = render(
      <Login onLogin={mockonLogin} />
    )

    const formUsername = component.getByLabelText('Username:')
    const formPassword = component.getByLabelText('Password:')
    const button = component.getByRole('button')
    
    fireEvent.change(formUsername, {
      target: { value: 'test_username'}
    })

    fireEvent.change(formPassword, {
      target: { value: 'test_password'}
    })

    fireEvent.click(button)
  })
})

