import { server } from './server';

export function recordRequests() {
  const urls: string[] = [];
  const record = ({ request }: { request: Request }) => {
    urls.push(request.url);
  };

  server.events.on('request:start', record);

  return {
    urls,
    stop: () => server.events.removeListener('request:start', record),
  };
}
