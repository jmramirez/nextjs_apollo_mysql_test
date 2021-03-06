import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

function create(initialState){
  
  const isBrowser = typeof window !== 'undefined'

  return new ApolloClient({
    connectToDvTools: isBrowser,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri: isBrowser? 'http://localhost:4000' : 'http://backend:4000',
      credentials: 'same-origin',
      fetch: !isBrowser && fetch,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState){
  if(typeof window === 'undefined'){
    return create(initialState)
  }

  if(!apolloClient){
    apolloClient = create(initialState)
  }

  return apolloClient
}