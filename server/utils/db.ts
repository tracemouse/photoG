import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { commDB } from './db/comm'
import { fileDB } from './db/file'
 

export async function useDB(event:any = ''){
  // supabase.removeAllChannels()
  // const supabase = await serverSupabaseClient(event)  //受RLS限制
  const supabase = serverSupabaseServiceRole(event)
  // const supabase:SupabaseClient = getClient()
  const comm = await commDB(supabase)
  const file = await fileDB(supabase)

  function getClient() {
    return supabase
  }

  return {
    getClient:getClient,
    comm: comm,
    file: file,
  }
}

export function getClient() {
  // console.log(useRuntimeConfig().api.SUPABASE_URL)
  // console.log(useRuntimeConfig().api.SUPABASE_KEY)
  // console.log(useRuntimeConfig().api.SUPABASE_SERVICE_KEY)

  // return createClient(useRuntimeConfig().api.SUPABASE_URL, useRuntimeConfig().api.SUPABASE_KEY)
  return createClient(useRuntimeConfig().api.SUPABASE_URL, useRuntimeConfig().api.SUPABASE_SERVICE_KEY)
  // return createClient(useRuntimeConfig().api.SUPABASE_URL, useRuntimeConfig().api.SUPABASE_SERVICE_KEY,
  //   {
  //   auth: {
  //     persistSession: false,
  //     autoRefreshToken: false,
  //     detectSessionInUrl: false,
  //   }
  // })
}

