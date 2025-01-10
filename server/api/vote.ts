import { useServerError } from "~/composables/useServerError";
import { useDB } from "~/server/utils/db"

export default eventHandler(async (event) => {
	
	const SUPBASE_URL = useRuntimeConfig().api.SUPABASE_URL
	const root_url = `${SUPBASE_URL}/storage/v1/object/public/`

	const { id, likes } = getQuery(event);

	try{

		const db = await useDB(event)

		let rec = await db.comm.getById("photo", id as string)
		if(!rec){
			useServerError().throwApiError("无效的桌号！")
		}


		let x = 1;
		if(likes != 1){
			x = -1;
		}

		const data = await db.comm.increase({row_id: parseInt(id as string), x: x})
		return { data : data}

	}catch(error){
		useServerError().retureError(error)
	}
});
