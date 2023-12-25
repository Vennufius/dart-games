import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const highSegmentScoringRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.highSegmentScoring.findMany();
    }),
    getHighscores: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.highSegmentScoring.findMany({
            take: 10,
            orderBy: {
                score: 'desc'
            },
            include: {
                user: {
                    select: {
                        name: true,
                    }
                }
            }
        });
    }),
    create: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
        return ctx.prisma.highSegmentScoring.create({
            data: {
                score: input,
                userId: ctx.session.user.id,
            },
        });
    }),
});
