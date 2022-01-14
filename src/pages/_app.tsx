import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="p-4 text-white bg-gray-800 min-h-screen">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

/**
 * Install prettier extension (vscode) so it's easier to format your code.
 * Press "shift + alt + f" for a single file or "ctrl + k ctrl + f" for a single line.
 *
 * To check whether prettified or not, "prettier --check ./src"
 * To fix and do a prettify, "prettier --write ./src"
 *
 * Or run via script, see on package.json
 */
