import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "shortiny/server/api/trpc";
import { nanoid } from "nanoid";


export const urlRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  /*create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.url.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),*/

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.url.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  shortinyURL: protectedProcedure
    .input(
      z.object({
        url: z.string().trim().url({ message: "Invalid URL!" }),
        createdById: z.string().trim()
      }),
    )
    .mutation(async ({ ctx: { prisma }, input: { url, createdById } }) => {
      const surl: string = nanoid(6);
      const data = await prisma.url.create({
        data: {
          url,
          shortinyUrl: surl,
          createdById
        },
      });
      return data;
    }),

  fetchLongUrl: publicProcedure
    .input(
      z.object({ 
        shortinyUrl: z.string().length(6, { message: 'Must be 6 characters long' })
      })
    )
    .query(
       ({ ctx, input: {shortinyUrl}}) => {
        return ctx.prisma.url.findUnique({
          where: {
            shortinyUrl: shortinyUrl
          }
        })
      }
    ),

  getAllUrls: protectedProcedure //TODO: BORRAR PORQUE DEBERIA SER PROTECTED Y SOLO VERLO EL USER
    .query(
      ({ctx}) => {
        if(ctx.session?.user === null ) {
          return;
        }
        
        return ctx.prisma.url.findMany({
          select: {
            url: true,
            shortinyUrl: true,
            createdAt: true
          },
          where: {
            createdById: ctx.session.user.id
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
      }
    )
});
