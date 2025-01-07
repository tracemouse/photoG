import type { PostgrestError } from "@supabase/supabase-js";
import type { StorageError } from "@supabase/storage-js"

export class ApiError extends Error {
  constructor(message: string, data:any = null) {
      super(message);
      this.name = "ApiError";
      Error.captureStackTrace(this, this.constructor);
      this.data = data
  }

  data: any;
}

export class DbError extends Error {
  constructor(error: PostgrestError|StorageError, data:any = null) {
      super(error.message);
      this.name = "DbError";
      Error.captureStackTrace(this, this.constructor);
  }
}

export function useServerError(){

  function throwApiError(msg: string, data:unknown = null){
    throw new ApiError(msg, data)
   }

   function throwDbError(error:PostgrestError|StorageError){
    throw new DbError(error)
   }

  function retureError(error:any){
    if(error instanceof ApiError) {
      throw createError({
        message: error.message,
        statusCode: 400,
        data: error.data
      });
		}

    if(error instanceof DbError) {
      console.log(error)
      let msg = "系统错误，请稍后重试"
      let errorJson = JSON.stringify(error)
      if(errorJson.indexOf('duplicate key') >=0){
        msg = "记录已存在，请修改后重新提交"
      }
      if(errorJson.indexOf('not found') >=0){
        msg = "记录不存在"
      }
      throw createError({
        message: msg,
        statusCode: 400,
      });
		}

		throw createError({
			message: "系统错误，请稍后重试",
			statusCode: 400,
		});
  }

  function retureErrorMsg(msg:string){
		throw createError({
			message: msg,
			statusCode: 400
		});
  }

  return {
    throwApiError:throwApiError,
    throwDbError:throwDbError,
    retureError:retureError,
    retureErrorMsg:retureErrorMsg,
  }

}