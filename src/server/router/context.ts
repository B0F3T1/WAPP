import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import {
	Session as NextAuthSession,
	unstable_getServerSession as getServerSession
} from 'next-auth'
import { authOptions as nextAuthOptions } from '~/pages/api/auth/[...nextauth]'
import { prisma } from '@server/db/client'

interface Session extends NextAuthSession {
	token: string
	userId: string
}

export const createContext = async (
	opts?: trpcNext.CreateNextContextOptions
) => {
	const req = opts?.req
	const res = opts?.res

	const session =
		req &&
		res &&
		((await getServerSession(req, res, nextAuthOptions)) as Session)

	return {
		req,
		res,
		session,
		prisma
	}
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
