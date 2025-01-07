import { SupabaseClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer'
import { useServerError } from '~/composables/useServerError';
 

//for common table
export async function fileDB(supabase:SupabaseClient){

  async function getClient() { 
    return supabase
  }
 
  async function uploadImg(id:string, fileData:string){
    fileData = fileData.replace("data:image/jpeg;base64,","")
    const {data , error} =  await supabase
    .storage
    .from('img')
    .upload(`${id}.jpeg`, 
      decode(fileData), 
      {
        contentType: 'image/jpeg',
        upsert: true
      }
    )
    // console.log(error)
    // console.log(data)
    if(error){
      useServerError().throwDbError(error)
    }
    // console.log(data)
    return data
  }

  return {
    uploadImg:uploadImg
  }
}

