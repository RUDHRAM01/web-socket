import React, { useEffect } from 'react'
import { Toaster, toast, useToasterStore } from 'react-hot-toast'

function ToastAlert() {
	// limit the maximum number of toasts
	const { toasts } = useToasterStore()

	const TOAST_LIMIT = 4

	useEffect(() => {
		toasts
			.filter((t) => t.visible) // Only consider visible toasts
			.filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
			.forEach((t) => toast.dismiss(t.id)) // Dismiss – Use toast.remove(t.id) for no exit animation
	}, [toasts])

	return (
		<>
			<Toaster
				position="bottom-left"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: '',
					duration: 3000,
					style: {
						background: '#363636',
						color: '#fff',
					},

					// Default options for specific types
					success: {
						duration: 3000,
						theme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}}
			/>
		</>
	)
}

export default ToastAlert
