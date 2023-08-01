import prisma from '@app/lib/prisma';
import { cache } from 'react';

export const getUsers = cache(async () => {
    let users = await prisma.user.findMany({
        include: {
            posts: true
        }
    });
    return users;
});

export const getUser = cache(async (id: number) => {
    let user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user;
})