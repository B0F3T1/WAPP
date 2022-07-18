import { useEffect, useRef, useState } from 'react'
import { Button, FormControl, Input, chakra } from '@chakra-ui/react'
import { Modal } from '@components'
import { useStore } from '@store'

interface CreateChatModalProps {
	isOpen: boolean
	onClose: () => void
	onAddingNewChat: (chatName: string) => void
}

export const CreateChatModal: React.FC<CreateChatModalProps> = props => {
	const { isOpen, onClose, onAddingNewChat, ...rest } = props
	const form = useRef(null)
	const isAddingChat = useStore(state => state.isAddingChat)
	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		if (submitted && !isAddingChat) {
			onClose()
			setSubmitted(false)
		}
	}, [isAddingChat, submitted])

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(form.current!)
		const data = Object.fromEntries(formData.entries())
		const { chatName } = data

		if (chatName) {
			setSubmitted(true)
			onAddingNewChat(chatName as string)
		}
	}

	return (
		<Modal
			blockScrollOnMount={false}
			id='search'
			isOpen={isOpen}
			motionPreset='slideInBottom'
			scrollBehavior='inside'
			showCloseIcon={true}
			size='md'
			title='Add a new chat'
			onClose={onClose}
			{...rest}
		>
			<chakra.form
				ref={form}
				display='flex'
				flexDir='column'
				gap={4}
				pb={4}
				onSubmit={onSubmit}
			>
				<FormControl>
					{/* <FormLabel htmlFor='chatName'>Chat name</FormLabel> */}
					<Input
						id='chatName'
						name='chatName'
						placeholder='Chat name'
						type='text'
					/>
				</FormControl>

				<Button
					_active={{
						bg: 'brand.400'
					}}
					_hover={{
						bg: 'brand.400'
					}}
					bg='brand.500'
					isLoading={isAddingChat}
					type='submit'
				>
					Create
				</Button>
			</chakra.form>
		</Modal>
	)
}

export default CreateChatModal
