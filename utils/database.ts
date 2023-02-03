// import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import * as supabase from "supabase"
import { Func, MoveFunc } from "../utils/types.ts"

export class Database {
  #client: supabase.SupabaseClient
  #cache: any

  constructor() {
    const api_url = "https://picwqygjdjkgpkoivdxn.supabase.co"
    const anon_key =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY3dxeWdqZGprZ3Brb2l2ZHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1ODc2NTcsImV4cCI6MTk4MjE2MzY1N30.LlVa9L-n1b7PSVszZRzH8W5_SIaQb6qI5Xy7e16NN6g"

    this.#client = supabase.createClient(api_url, anon_key)
    this.#cache = {}
  }

  async getAll() {
    const { data: onchain_functions } = await this.#client
      .from("onchain_functions")
      .select("*")
      .order("id", { ascending: false })
    return onchain_functions
  }

  async getById(id: number) {
    const { data } = await this.#client
      .from("onchain_functions")
      .select("*")
      .eq("id", id)

    return data
  }

  async getByFuncName(name: string) {
    const { data } = await this.#client
      .from("onchain_functions")
      .select("*")
      .eq("func_name", name)

    return data
  }

  async insert(data: Array<Func>) {
    await this.#client.from("onchain_functions").insert([...data])
  }

  async insert_move(data: Array<MoveFunc>) {
    const res = await this.#client.from("move_functions").insert(data)
    console.log(res)
    return res
  }

  async find_by_name(name: string): Promise<MoveFunc[] | null> {
    const { data } = await this.#client
      .from("move_functions")
      .select("*")
      .eq("name", name)
    return data
  }

  async find_with_cache(name: string): Promise<MoveFunc[] | null> {
    if (Object.keys(this.#cache).includes(name)) {
      console.log("load with cache")
      return this.#cache[name]
    }
    let data = await this.find_by_name(name)
    this.#cache[name] = data
    return data
  }
}
