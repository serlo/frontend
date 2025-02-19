import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import React, { createContext } from 'react'

export const PasswordContext = createContext<string>('')

interface LoginFormProps {
  children: React.ReactNode
}

export default function LoginForm(props: LoginFormProps) {
  const [password, setPassword] = React.useState('')
  const [isCorrectPassword, setIsCorrectPassword] = React.useState(false)

  const checkPassword = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `/api/datenraum/check-password?password=${encodeURIComponent(password)}`,
        { method: 'POST' }
      )
      if (!response.ok) {
        throw new Error('Wrong password')
      }
      return response.json() as unknown
    },
    onSuccess: () => setIsCorrectPassword(true),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return isCorrectPassword ? renderChildren() : renderLoginForm()

  function renderChildren() {
    return (
      <PasswordContext.Provider value={password}>
        {props.children}
      </PasswordContext.Provider>
    )
  }

  function renderLoginForm() {
    return (
      <div>
        <div className="mx-auto max-w-md p-8">
          <h1 className="mb-4 text-3xl font-bold">Login</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1 block">
                Password:
              </label>
              <input
                id="password"
                className="w-full rounded border border-gray-300 px-3 py-2"
                type="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button
              className={clsx(
                'w-full rounded py-2 font-bold text-white',
                password.length ? 'bg-gray-700' : 'bg-gray-200'
              )}
              onClick={() => checkPassword.mutate()}
              disabled={!password.length}
            >
              Sign in
            </button>
            {checkPassword.isError && (
              <div className="text-red-500">Wrong password</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
