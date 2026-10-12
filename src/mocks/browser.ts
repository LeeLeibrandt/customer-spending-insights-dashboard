import { setupWorker } from 'msw/browser';
import { getTodayIsoDate } from '../utils/dates';
import { createHandlers } from './handlers';

const RELOAD_FLAG = 'mock-worker-reloaded';

const worker = setupWorker(...createHandlers(getTodayIsoDate()));

function activateWorker(quiet: boolean) {
  return worker.start({ onUnhandledRequest: 'bypass', quiet });
}

async function reactivateWorker() {
  if (document.visibilityState === 'visible') {
    worker.stop();
    await activateWorker(true);
  }
}

export async function startMocking() {
  await activateWorker(false);

  if (!navigator.serviceWorker.controller) {
    if (!sessionStorage.getItem(RELOAD_FLAG)) {
      sessionStorage.setItem(RELOAD_FLAG, 'true');
      window.location.reload();
    }
    return;
  }

  sessionStorage.removeItem(RELOAD_FLAG);
  document.addEventListener('visibilitychange', reactivateWorker);
}
