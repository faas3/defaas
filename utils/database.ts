// import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import * as supabase from "supabase";
import { MoveFunc } from "../utils/types.ts";

class Database {
  #client: supabase.SupabaseClient;

  constructor() {
    const api_url = "https://picwqygjdjkgpkoivdxn.supabase.co";
    const anon_key =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY3dxeWdqZGprZ3Brb2l2ZHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1ODc2NTcsImV4cCI6MTk4MjE2MzY1N30.LlVa9L-n1b7PSVszZRzH8W5_SIaQb6qI5Xy7e16NN6g";

    this.#client = supabase.createClient(api_url, anon_key);
  }

  async insertMove(data: Array<MoveFunc>) {
    const res = await this.#client.from("move_functions").insert(data);
    return res;
  }

  async findByName(name: string): Promise<MoveFunc[]> {
    const { data } = await this.#client
      .from("move_functions")
      .select("*")
      .eq("name", name);
    return data ?? [];
  }

  async findAll(): Promise<MoveFunc[]> {
    const { data } = await this.#client
      .from("move_functions")
      .select("*");
    return data ?? [];
  }
}

export const db = new Database();
