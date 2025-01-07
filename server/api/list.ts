import { useServerError } from "~/composables/useServerError";
import { useDB } from "~/server/utils/db"

export default eventHandler(async (event) => {
	
	const SUPBASE_URL = useRuntimeConfig().api.SUPABASE_URL
	const root_url = `${SUPBASE_URL}/storage/v1/object/public/`

	try{
		const db = await useDB(event)
		const count = await db.comm.getCnt('photo')
		if(count < 1){
		  return {count: 0, items: []}
		}

		const data = await db.comm.getList("photo", 1, 50)
	
		return {count: count, items: data}

	}catch(error){
		useServerError().retureError(error)
	}
});
