import { Schema, model } from 'mongoose'
import { IDemo } from '../../../routes/models/bitacora.logs.app.model'

export const demoColeccion = new Schema<IDemo>({
	demo: { type: String }
})

export const BitacoraLogsAppModel = model<IDemo>(
	'demo',
	demoColeccion,
	'demo',
)
