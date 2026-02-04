import { z } from 'zod';
import { insertAnswerSchema, rooms, players, answers } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  conflict: z.object({
    message: z.string(),
  }),
};

export const api = {
  rooms: {
    create: {
      method: 'POST' as const,
      path: '/api/rooms',
      input: z.object({ name: z.string().min(1) }),
      responses: {
        201: z.object({ code: z.string(), player: z.custom<typeof players.$inferSelect>() }),
      },
    },
    join: {
      method: 'POST' as const,
      path: '/api/rooms/join',
      input: z.object({ code: z.string().length(6), name: z.string().min(1) }),
      responses: {
        200: z.object({ code: z.string(), player: z.custom<typeof players.$inferSelect>() }),
        404: errorSchemas.notFound,
        409: errorSchemas.conflict, // Room full
      },
    },
    getState: {
      method: 'GET' as const,
      path: '/api/rooms/:code',
      responses: {
        200: z.object({
          roomCode: z.string(),
          players: z.array(z.custom<typeof players.$inferSelect>()),
          answers: z.array(z.custom<typeof answers.$inferSelect>()),
        }),
        404: errorSchemas.notFound,
      },
    },
  },
  answers: {
    submit: {
      method: 'POST' as const,
      path: '/api/answers',
      input: insertAnswerSchema,
      responses: {
        201: z.custom<typeof answers.$inferSelect>(),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
