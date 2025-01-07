import { SupabaseClient } from '@supabase/supabase-js';
import consola from 'consola';
import { useServerError } from '~/composables/useServerError';

export type increase = {
  row_id: number,
  x: number,
}

//for common table
export async function commDB(supabase:SupabaseClient){

  async function getClient() { 
    return supabase
  }

  async function getById(table:string, id: string|number) {
    const {data , error} =  await supabase.from(table).select()
    .eq('id', id)
    .limit(1).single()
    // .returns<media[]>()
    if(error && error.details != 'The result contains 0 rows'){
      useServerError().throwDbError(error)
    }
    return data
  }

  async function getByField(table:string, fields: Record<string,any>,sortBy:string='', sortType:string='') {
    let orderby
    if(sortType == 'asc'){
      orderby = {ascending: true}
    }else{
      orderby = {ascending: false}
    }

    let query = supabase.from(table).select(`*`)
    for(let key in fields){
      query.eq(key, fields[key])
    }

    if(sortBy){
      query = query.order(sortBy, orderby)
    }

    const {data,error} =  await query
    if(error){
      useServerError().throwDbError(error)
    }
    return data
  }

  async function del(table:string, id:number){
    const {data , error} =  await supabase.from(table).delete().eq('id', id)
    if(error){
      useServerError().throwDbError(error)
    }
    return data
  }

  async function ins(table:string, object:any){
    if(object.id) delete object.id
    if(object.created_at)  delete object.created_at
    const {data , error} =  await supabase.from(table).insert(object).select().limit(1).single()
    if(error){
      useServerError().throwDbError(error)
    }
    return data
  }

  async function upsert(table:string, object:any){
    if(object.created_at) delete object.created_at
    if(object.updated_at) object.updated_at = new Date()
    const {data , error} =  await supabase.from(table).upsert(object).select().limit(1).single()
    if(error){
      useServerError().throwDbError(error)
    }
    return data
  }

  async function upd(table:string, object: Record<string,any>){
    let id = object.id
    delete object.id
    if(object.created_at) delete object.created_at
    const {data , error} =  await supabase.from(table).update(object).eq('id',id)
    if(error){
      useServerError().throwDbError(error)
    }
    return data
  }

  async function getCnt(table:string, fields: Record<string,any>={}):Promise<number>{
    type count = { count: number}
    let query = supabase.from(table).select(`*`,{count: 'exact', head: true})
    if(fields){ 
      for(let key in fields){
        query.eq(key, fields[key])
      }
    }

    const res =  await query.returns<count>()
    if(res.error){
      useServerError().throwDbError(res.error)
    }
    return (res.count)?res.count:0
  }

  async function getList(table:string, page:number, limit:number,sortBy:string='', sortType:string='', fields: Record<string,any>={}):Promise<unknown>{
    let from = (page - 1) * limit
    let to = page * limit - 1
    let orderby
    if(sortType == 'asc'){
      orderby = {ascending: true}
    }else{
      orderby = {ascending: false}
    }

    let query = supabase.from(table).select(`*`)
    if(fields){ 
      for(let key in fields){
        query.eq(key, fields[key])
      }
    }

    if(sortBy){
      query = query.order(sortBy, orderby)
    }
    
    query = query.range(from, to)

    const {data, error} =  await query
    if(error){
      useServerError().throwDbError(error)
    }
    return data
  }

  async function increase(object: increase){
    const {data , error} =  await supabase.rpc('increment', object)
    if(error){
      useServerError().throwDbError(error)
    }
    return data
  }

  return {
    getById: getById,
    ins:ins,
    upsert:upsert,
    upd:upd,
    del:del,
    getCnt: getCnt,
    getList: getList,
    getByField:getByField,
    increase:increase,
  }
}

