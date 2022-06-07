import { ChakraProvider } from "@chakra-ui/react"
import { createClient, Provider } from "urql"

const client = createClient({
  url: "https://countries.trevorblades.com/graphql",
  suspense: true,
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
