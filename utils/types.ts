export interface FuncMeta {
  id?: number;
  source_gist_id?: string;
  func_name?: string;
  desc?: string;
  content?: string;

  token_id?: number;
  contract?: string;
  chain?: string;
  txn_hash?: string;

  owner_addr?: string;
  owner?: string;

  created_at?: string;
}

export interface MoveFunc {
  id?: number;
  name?: string;
  description?: string;
  url?: string;
  content?: string;
  txn_hash: string;
  owner?: string;
  created_at?: string;
  object_id?: string;
}
