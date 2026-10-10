import { setupWorker } from 'msw/browser';
import { getTodayIsoDate } from '../utils/dates';
import { createHandlers } from './handlers';

export const worker = setupWorker(...createHandlers(getTodayIsoDate()));
