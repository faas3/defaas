import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import * as supabase from "https://esm.sh/@supabase/supabase-js@1.35.3";
import { Func } from "../utils/types.ts";

export class Database {
  #client: supabase.SupabaseClient;

  constructor() {
    const api_url = "https://picwqygjdjkgpkoivdxn.supabase.co";
    const anon_key =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY3dxeWdqZGprZ3Brb2l2ZHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1ODc2NTcsImV4cCI6MTk4MjE2MzY1N30.LlVa9L-n1b7PSVszZRzH8W5_SIaQb6qI5Xy7e16NN6g";

    this.#client = supabase.createClient(
      api_url,
      anon_key,
    );
  }

  async getAll() {
    const { data: onchain_functions, error } = await this.#client.from(
      "onchain_functions",
    ).select(
      "*",
    );
    return onchain_functions;
  }

  async getById(id: number) {
    const { data, error } = await this.#client.from("onchain_functions").select(
      "*",
    ).eq("id", id);

    return data;
  }

  async getByFuncName(name: string) {
    const { data, error } = await this.#client.from("onchain_functions").select(
      "*",
    ).eq("func_name", name);

    return data;
  }

  async insert(data: Array<Func>) {
    await this.#client.from("onchain_functions").insert([
      ...data,
    ]);
  }
}
