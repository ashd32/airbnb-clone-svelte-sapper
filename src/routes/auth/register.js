export const post = (req, res) => {
	res.end('POST request received correctly')
	console.log(req.body)
import { User } from '../../model.js'
export const post = async (req, res) => {
	const { email, password, passwordconfirmation } = req.body

	if (password !== passwordconfirmation) {
		res.statusCode = 500
		res.end(JSON.stringify({ status: 'error', message: 'Passwords do not match' }))
		return
	}

	try {
		const user = await User.create({ email, password })
			return res.end(JSON.stringify({ status: 'success', message: 'Logged in' }))
	} catch (error) {
		let message = 'An error occurred'
    if (error.name === 'SequelizeUniqueConstraintError') {
			message = 'User already exists'
		}

		res.statusCode = 500
		res.end(JSON.stringify({ status: 'error', message }))
	}
}