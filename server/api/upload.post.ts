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
		// let fileid = (String(id) == "4")?"3A":String(id)
		const data = await db.file.uploadImg(id as string, fileData)
		// console.log(data)
		// let url = root_url + data.fullPath + "?" + (new Date()).getTime()
		let url = root_url + data.fullPath

		let rec = await db.comm.getById("photo", id)
		if(rec){
			rec.url = url
			rec.point = 0
		}else{
			rec = {id: id, url: url, point:0}
		}
		console.log(rec)
		await db.comm.upsert("photo", rec)

		// await db.user.updAvatar(id as string, url)

		return url

	}catch(error){
		useServerError().retureError(error)
	}
});
