import { SupabaseClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer'
import { useServerError } from '~/composables/useServerError';
 

//for common table
export async function fileDB(supabase:SupabaseClient){

  async function getClient() { 
    return supabase
  }
 
  async function uploadImg(id:string, fileData:string){
    // fileData = fileData.replace("data:image/jpeg;base64,","")
    // fileData = fileData.replace("data:image/jpeg;base64,","")
    // fileData = fileData.replace("data:image/webp;base64,","")
    // fileData = fileData.replace("data:image/png;base64,","")
    let arr = fileData.split(",")
    let base64String = arr[1]
    let mimeType = arr[0].split(";")[0].replace("data:","")
    console.log(mimeType)
    let ext = "jpg"
    switch(mimeType){
      case "image/jpeg":
        ext = "jpg";
        break;
      case "image/png":
        ext = "png";
        break;
      case "image/webp":
        ext = "webp";
        break;
    }
    const {data , error} =  await supabase
    .storage
    .from('img')
    .upload(`${id}.${ext}`, 
      decode(base64String), 
      {
        contentType: mimeType,
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

