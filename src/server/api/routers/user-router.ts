import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "shortiny/server/api/trpc";

export const userRouter = createTRPCRouter({
  
  create: publicProcedure
    .input(
      z.object({ 
        name: z.string().trim().min(1),
        email: z.string().trim().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input : {name, email, password} }) => {
      return ctx.prisma.user.create({
        data: {
          name,
          email,
          password
        },
      });
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string().trim(), username: z.string() }))
    .query(({ ctx, input: {id, username}}) => {
      return ctx.prisma.user.update({
        where: {
          id
        },
        data: {
          name: username
        }
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().trim() }))
    .query(({ ctx, input: {id}}) => {
      return ctx.prisma.user.delete({
        where: {
          id
        }
      })
    }),
  findUniqueByEmail: publicProcedure
    .input(z.object({ email: z.string().trim().email() }))
    .query(({ ctx, input: {email}}) => {
      return ctx.prisma.user.findUnique({
        where: {
          email
        }
      })
    }),

  findUniqueById: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ ctx, input: {id}}) => {
    return ctx.prisma.user.findUnique({
      where: {
        id
      }
    })
  })


});
