import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
import { BrowserRouter } from 'react-router-dom';
// import { SpeechProvider } from '@speechly/react-client';
import { Toaster } from 'react-hot-toast';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <SpeechProvider appId="2a171841-793a-46a0-b6e3-3d59262cb006"> */}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Toaster
        toastOptions={{
          position: 'top-right',
        }}
      />
      {/* </SpeechProvider> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
