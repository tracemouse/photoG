import { useServerError } from "~/composables/useServerError";
import { useDB } from "~/server/utils/db"

export default eventHandler(async (event) => {
	
	const SUPBASE_URL = useRuntimeConfig().api.SUPABASE_URL
	const root_url = `${SUPBASE_URL}/storage/v1/object/public/`

	const { searchValue } = getQuery(event);

	try{
		const db = await useDB(event)

		const data = await db.comm.getList("seatplan", 1, 50, '', '', searchValue as string)

		return {count: 1, items: data}

	}catch(error){
		useServerError().retureError(error)
	}
});
