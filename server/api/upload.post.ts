import { useServerError } from "~/composables/useServerError";
import { useDB } from "~/server/utils/db"

export default eventHandler(async (event) => {
	
	const SUPBASE_URL = useRuntimeConfig().api.SUPABASE_URL
	const root_url = `${SUPBASE_URL}/storage/v1/object/public/`

	try{

		//上传文件到telegraph
		// const formData = await readFormData(event)
		// const url = await useTelegra().uploadFormData(formData)
		const { id, fileData } = await readBody(event)

		const db = await useDB(event)

		//上传文件到 supabase storage
		const data = await db.file.uploadImg(id as string, fileData)

		let url = root_url + data.fullPath + "?" + (new Date()).getTime()

		// await db.user.updAvatar(id as string, url)

		return url

	}catch(error){
		useServerError().retureError(error)
	}
});
