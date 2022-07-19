import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '@store'
import { Layout } from '@layouts'
import { Bubble, ChatContainer } from '@components'

const Chat: NextPage = () => {
	const { sid } = useRouter().query
	const [title, setTitle] = useState('')
	const client = useStore(state => state.TwilioClient)
	const activeChat = useStore(state => state.activeChat)
	const setActiveChat = useStore(state => state.setActiveChat)
	const getChatData = useStore(state => state.getChatData)
	const activeChatMessages = useStore(state => state.activeChatMessages)
	const getActiveChatMessages = useStore(state => state.getActiveChatMessages)
	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (client && activeChat?.sid !== sid) {
			setTitle('...')
			getChatData(sid as string).then(setActiveChat)
		}
	}, [client, sid, activeChat])

	useEffect(() => {
		if (activeChat) {
			setTitle(activeChat.friendlyName || (activeChat.uniqueName as string))
			getActiveChatMessages()
		}
	}, [activeChat])

	useEffect(() => {
		scrollToBottom()
	}, [activeChatMessages])

	const scrollToBottom = () => {
		bottomRef.current?.scrollIntoView({
			behavior: 'auto',
			block: 'start'
		})
	}

	return (
		<Layout title={title}>
			<ChatContainer>
				{activeChatMessages.map(message => (
					<Bubble key={message.sid} message={message} />
				))}

				<span ref={bottomRef} />
			</ChatContainer>
		</Layout>
	)
}

export default Chat
