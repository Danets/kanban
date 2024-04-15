import { FormattedMessage } from 'react-intl'

interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<div>
			<h1 className='text-3xl font-medium'>
				<FormattedMessage id={title} />
			</h1>
			<div className='my-3 h-0.5 bg-border w-full' />
		</div>
	)
}
