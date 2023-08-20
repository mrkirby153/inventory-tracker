import prisma from "@app/lib/prisma";

export const getUser = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    });
}