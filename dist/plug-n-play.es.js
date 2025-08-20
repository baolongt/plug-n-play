import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { asciiStringToByteArray, arrayOfNumberToUint8Array, bigEndianCrc32, uint8ArrayToHexString } from "@dfinity/utils";
import { PostMessageTransport } from "@slide-computer/signer-web";
import { BrowserExtensionTransport } from "@slide-computer/signer-extension";
import { StoicTransport } from "@slide-computer/signer-transport-stoic";
import { SignerAgent } from "@slide-computer/signer-agent";
import { Signer } from "@slide-computer/signer";
const ICRC2_IDL = ({ IDL }) => {
  const Account = IDL.Record({
    "owner": IDL.Principal,
    "subaccount": IDL.Opt(IDL.Vec(IDL.Nat8))
  });
  const FeatureFlags = IDL.Record({ "icrc2": IDL.Bool });
  const UpgradeArgs = IDL.Record({
    "maximum_number_of_accounts": IDL.Opt(IDL.Nat64),
    "icrc1_minting_account": IDL.Opt(Account),
    "feature_flags": IDL.Opt(FeatureFlags)
  });
  const Tokens = IDL.Record({ "e8s": IDL.Nat64 });
  const Duration = IDL.Record({ "secs": IDL.Nat64, "nanos": IDL.Nat32 });
  const ArchiveOptions = IDL.Record({
    "num_blocks_to_archive": IDL.Nat64,
    "max_transactions_per_response": IDL.Opt(IDL.Nat64),
    "trigger_threshold": IDL.Nat64,
    "max_message_size_bytes": IDL.Opt(IDL.Nat64),
    "cycles_for_archive_creation": IDL.Opt(IDL.Nat64),
    "node_max_memory_size_bytes": IDL.Opt(IDL.Nat64),
    "controller_id": IDL.Principal
  });
  const InitArgs = IDL.Record({
    "send_whitelist": IDL.Vec(IDL.Principal),
    "token_symbol": IDL.Opt(IDL.Text),
    "transfer_fee": IDL.Opt(Tokens),
    "minting_account": IDL.Text,
    "maximum_number_of_accounts": IDL.Opt(IDL.Nat64),
    "accounts_overflow_trim_quantity": IDL.Opt(IDL.Nat64),
    "transaction_window": IDL.Opt(Duration),
    "max_message_size_bytes": IDL.Opt(IDL.Nat64),
    "icrc1_minting_account": IDL.Opt(Account),
    "archive_options": IDL.Opt(ArchiveOptions),
    "initial_values": IDL.Vec(IDL.Tuple(IDL.Text, Tokens)),
    "token_name": IDL.Opt(IDL.Text),
    "feature_flags": IDL.Opt(FeatureFlags)
  });
  IDL.Variant({
    "Upgrade": IDL.Opt(UpgradeArgs),
    "Init": InitArgs
  });
  const BinaryAccountBalanceArgs = IDL.Record({
    "account": IDL.Vec(IDL.Nat8)
  });
  const AccountBalanceArgs = IDL.Record({ "account": IDL.Text });
  const ArchiveInfo = IDL.Record({ "canister_id": IDL.Principal });
  const Archives = IDL.Record({ "archives": IDL.Vec(ArchiveInfo) });
  const Decimals = IDL.Record({ "decimals": IDL.Nat32 });
  const MetadataValue = IDL.Variant({
    "Int": IDL.Int,
    "Nat": IDL.Nat,
    "Blob": IDL.Vec(IDL.Nat8),
    "Text": IDL.Text
  });
  const StandardRecord = IDL.Record({ "url": IDL.Text, "name": IDL.Text });
  const TransferArg = IDL.Record({
    "to": Account,
    "fee": IDL.Opt(IDL.Nat),
    "memo": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "from_subaccount": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "created_at_time": IDL.Opt(IDL.Nat64),
    "amount": IDL.Nat
  });
  const TransferError = IDL.Variant({
    "GenericError": IDL.Record({
      "message": IDL.Text,
      "error_code": IDL.Nat
    }),
    "TemporarilyUnavailable": IDL.Null,
    "BadBurn": IDL.Record({ "min_burn_amount": IDL.Nat }),
    "Duplicate": IDL.Record({ "duplicate_of": IDL.Nat }),
    "BadFee": IDL.Record({ "expected_fee": IDL.Nat }),
    "CreatedInFuture": IDL.Record({ "ledger_time": IDL.Nat64 }),
    "TooOld": IDL.Null,
    "InsufficientFunds": IDL.Record({ "balance": IDL.Nat })
  });
  const Result = IDL.Variant({ "Ok": IDL.Nat, "Err": TransferError });
  const AllowanceArgs = IDL.Record({
    "account": Account,
    "spender": Account
  });
  const Allowance = IDL.Record({
    "allowance": IDL.Nat,
    "expires_at": IDL.Opt(IDL.Nat64)
  });
  const ApproveArgs = IDL.Record({
    "fee": IDL.Opt(IDL.Nat),
    "memo": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "from_subaccount": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "created_at_time": IDL.Opt(IDL.Nat64),
    "amount": IDL.Nat,
    "expected_allowance": IDL.Opt(IDL.Nat),
    "expires_at": IDL.Opt(IDL.Nat64),
    "spender": Account
  });
  const ApproveError = IDL.Variant({
    "GenericError": IDL.Record({
      "message": IDL.Text,
      "error_code": IDL.Nat
    }),
    "TemporarilyUnavailable": IDL.Null,
    "Duplicate": IDL.Record({ "duplicate_of": IDL.Nat }),
    "BadFee": IDL.Record({ "expected_fee": IDL.Nat }),
    "AllowanceChanged": IDL.Record({ "current_allowance": IDL.Nat }),
    "CreatedInFuture": IDL.Record({ "ledger_time": IDL.Nat64 }),
    "TooOld": IDL.Null,
    "Expired": IDL.Record({ "ledger_time": IDL.Nat64 }),
    "InsufficientFunds": IDL.Record({ "balance": IDL.Nat })
  });
  const Result_1 = IDL.Variant({ "Ok": IDL.Nat, "Err": ApproveError });
  const TransferFromArgs = IDL.Record({
    "to": Account,
    "fee": IDL.Opt(IDL.Nat),
    "spender_subaccount": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "from": Account,
    "memo": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "created_at_time": IDL.Opt(IDL.Nat64),
    "amount": IDL.Nat
  });
  const TransferFromError = IDL.Variant({
    "GenericError": IDL.Record({
      "message": IDL.Text,
      "error_code": IDL.Nat
    }),
    "TemporarilyUnavailable": IDL.Null,
    "InsufficientAllowance": IDL.Record({ "allowance": IDL.Nat }),
    "BadBurn": IDL.Record({ "min_burn_amount": IDL.Nat }),
    "Duplicate": IDL.Record({ "duplicate_of": IDL.Nat }),
    "BadFee": IDL.Record({ "expected_fee": IDL.Nat }),
    "CreatedInFuture": IDL.Record({ "ledger_time": IDL.Nat64 }),
    "TooOld": IDL.Null,
    "InsufficientFunds": IDL.Record({ "balance": IDL.Nat })
  });
  const Result_2 = IDL.Variant({ "Ok": IDL.Nat, "Err": TransferFromError });
  const Name = IDL.Record({ "name": IDL.Text });
  const GetBlocksArgs = IDL.Record({
    "start": IDL.Nat64,
    "length": IDL.Nat64
  });
  const TimeStamp = IDL.Record({ "timestamp_nanos": IDL.Nat64 });
  const CandidOperation = IDL.Variant({
    "Approve": IDL.Record({
      "fee": Tokens,
      "from": IDL.Vec(IDL.Nat8),
      "allowance_e8s": IDL.Int,
      "allowance": Tokens,
      "expected_allowance": IDL.Opt(Tokens),
      "expires_at": IDL.Opt(TimeStamp),
      "spender": IDL.Vec(IDL.Nat8)
    }),
    "Burn": IDL.Record({
      "from": IDL.Vec(IDL.Nat8),
      "amount": Tokens,
      "spender": IDL.Opt(IDL.Vec(IDL.Nat8))
    }),
    "Mint": IDL.Record({ "to": IDL.Vec(IDL.Nat8), "amount": Tokens }),
    "Transfer": IDL.Record({
      "to": IDL.Vec(IDL.Nat8),
      "fee": Tokens,
      "from": IDL.Vec(IDL.Nat8),
      "amount": Tokens,
      "spender": IDL.Opt(IDL.Vec(IDL.Nat8))
    })
  });
  const CandidTransaction = IDL.Record({
    "memo": IDL.Nat64,
    "icrc1_memo": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "operation": IDL.Opt(CandidOperation),
    "created_at_time": TimeStamp
  });
  const CandidBlock = IDL.Record({
    "transaction": CandidTransaction,
    "timestamp": TimeStamp,
    "parent_hash": IDL.Opt(IDL.Vec(IDL.Nat8))
  });
  const BlockRange = IDL.Record({ "blocks": IDL.Vec(CandidBlock) });
  const GetBlocksError = IDL.Variant({
    "BadFirstBlockIndex": IDL.Record({
      "requested_index": IDL.Nat64,
      "first_valid_index": IDL.Nat64
    }),
    "Other": IDL.Record({
      "error_message": IDL.Text,
      "error_code": IDL.Nat64
    })
  });
  const Result_3 = IDL.Variant({ "Ok": BlockRange, "Err": GetBlocksError });
  const ArchivedBlocksRange = IDL.Record({
    "callback": IDL.Func([GetBlocksArgs], [Result_3], ["query"]),
    "start": IDL.Nat64,
    "length": IDL.Nat64
  });
  const QueryBlocksResponse = IDL.Record({
    "certificate": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "blocks": IDL.Vec(CandidBlock),
    "chain_length": IDL.Nat64,
    "first_block_index": IDL.Nat64,
    "archived_blocks": IDL.Vec(ArchivedBlocksRange)
  });
  const Result_4 = IDL.Variant({
    "Ok": IDL.Vec(IDL.Vec(IDL.Nat8)),
    "Err": GetBlocksError
  });
  const ArchivedEncodedBlocksRange = IDL.Record({
    "callback": IDL.Func([GetBlocksArgs], [Result_4], ["query"]),
    "start": IDL.Nat64,
    "length": IDL.Nat64
  });
  const QueryEncodedBlocksResponse = IDL.Record({
    "certificate": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "blocks": IDL.Vec(IDL.Vec(IDL.Nat8)),
    "chain_length": IDL.Nat64,
    "first_block_index": IDL.Nat64,
    "archived_blocks": IDL.Vec(ArchivedEncodedBlocksRange)
  });
  const SendArgs = IDL.Record({
    "to": IDL.Text,
    "fee": Tokens,
    "memo": IDL.Nat64,
    "from_subaccount": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "created_at_time": IDL.Opt(TimeStamp),
    "amount": Tokens
  });
  const Symbol2 = IDL.Record({ "symbol": IDL.Text });
  const TransferArgs = IDL.Record({
    "to": IDL.Vec(IDL.Nat8),
    "fee": Tokens,
    "memo": IDL.Nat64,
    "from_subaccount": IDL.Opt(IDL.Vec(IDL.Nat8)),
    "created_at_time": IDL.Opt(TimeStamp),
    "amount": Tokens
  });
  const TransferError_1 = IDL.Variant({
    "TxTooOld": IDL.Record({ "allowed_window_nanos": IDL.Nat64 }),
    "BadFee": IDL.Record({ "expected_fee": Tokens }),
    "TxDuplicate": IDL.Record({ "duplicate_of": IDL.Nat64 }),
    "TxCreatedInFuture": IDL.Null,
    "InsufficientFunds": IDL.Record({ "balance": Tokens })
  });
  const Result_5 = IDL.Variant({ "Ok": IDL.Nat64, "Err": TransferError_1 });
  const TransferFee = IDL.Record({ "transfer_fee": Tokens });
  return IDL.Service({
    "account_balance": IDL.Func(
      [BinaryAccountBalanceArgs],
      [Tokens],
      ["query"]
    ),
    "account_balance_dfx": IDL.Func([AccountBalanceArgs], [Tokens], ["query"]),
    "account_identifier": IDL.Func([Account], [IDL.Vec(IDL.Nat8)], ["query"]),
    "archives": IDL.Func([], [Archives], ["query"]),
    "decimals": IDL.Func([], [Decimals], ["query"]),
    "icrc1_balance_of": IDL.Func([Account], [IDL.Nat], ["query"]),
    "icrc1_decimals": IDL.Func([], [IDL.Nat8], ["query"]),
    "icrc1_fee": IDL.Func([], [IDL.Nat], ["query"]),
    "icrc1_metadata": IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue))],
      ["query"]
    ),
    "icrc1_minting_account": IDL.Func([], [IDL.Opt(Account)], ["query"]),
    "icrc1_name": IDL.Func([], [IDL.Text], ["query"]),
    "icrc1_supported_standards": IDL.Func(
      [],
      [IDL.Vec(StandardRecord)],
      ["query"]
    ),
    "icrc1_symbol": IDL.Func([], [IDL.Text], ["query"]),
    "icrc1_total_supply": IDL.Func([], [IDL.Nat], ["query"]),
    "icrc1_transfer": IDL.Func([TransferArg], [Result], []),
    "icrc2_allowance": IDL.Func([AllowanceArgs], [Allowance], ["query"]),
    "icrc2_approve": IDL.Func([ApproveArgs], [Result_1], []),
    "icrc2_transfer_from": IDL.Func([TransferFromArgs], [Result_2], []),
    "name": IDL.Func([], [Name], ["query"]),
    "query_blocks": IDL.Func(
      [GetBlocksArgs],
      [QueryBlocksResponse],
      ["query"]
    ),
    "query_encoded_blocks": IDL.Func(
      [GetBlocksArgs],
      [QueryEncodedBlocksResponse],
      ["query"]
    ),
    "send_dfx": IDL.Func([SendArgs], [IDL.Nat64], []),
    "symbol": IDL.Func([], [Symbol2], ["query"]),
    "transfer": IDL.Func([TransferArgs], [Result_5], []),
    "transfer_fee": IDL.Func([IDL.Record({})], [TransferFee], ["query"])
  });
};
var Adapter;
((Adapter2) => {
  ((Status2) => {
    Status2["INIT"] = "INIT";
    Status2["READY"] = "READY";
    Status2["CONNECTING"] = "CONNECTING";
    Status2["CONNECTED"] = "CONNECTED";
    Status2["DISCONNECTING"] = "DISCONNECTING";
    Status2["DISCONNECTED"] = "DISCONNECTED";
    Status2["ERROR"] = "ERROR";
  })(Adapter2.Status || (Adapter2.Status = {}));
  ((Chain2) => {
    Chain2["ICP"] = "icp";
    Chain2["SOL"] = "sol";
    Chain2["ETH"] = "eth";
  })(Adapter2.Chain || (Adapter2.Chain = {}));
})(Adapter || (Adapter = {}));
var N = Object.create;
var H = Object.defineProperty;
var F = Object.getOwnPropertyDescriptor;
var j = Object.getOwnPropertyNames;
var V = Object.getPrototypeOf, G = Object.prototype.hasOwnProperty;
var z = (e3, t) => () => (t || e3((t = { exports: {} }).exports, t), t.exports);
var v = (e3, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function") for (let o of j(t)) !G.call(e3, o) && o !== n && H(e3, o, { get: () => t[o], enumerable: !(r = F(t, o)) || r.enumerable });
  return e3;
};
var J$1 = (e3, t, n) => (n = e3 != null ? N(V(e3)) : {}, v(!e3 || !e3.__esModule ? H(n, "default", { value: e3, enumerable: true }) : n, e3));
function W(e3) {
  return e3 instanceof Uint8Array || e3 != null && typeof e3 == "object" && e3.constructor.name === "Uint8Array";
}
function A(e3, ...t) {
  if (!W(e3)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e3.length)) throw new Error(`Uint8Array expected of length ${t}, not of length=${e3.length}`);
}
function U(e3, t = true) {
  if (e3.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e3.finished) throw new Error("Hash#digest() has already been called");
}
function S(e3, t) {
  A(e3);
  let n = t.outputLen;
  if (e3.length < n) throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
var g = (e3) => new DataView(e3.buffer, e3.byteOffset, e3.byteLength), h = (e3, t) => e3 << 32 - t | e3 >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function $(e3) {
  if (typeof e3 != "string") throw new Error(`utf8ToBytes expected string, got ${typeof e3}`);
  return new Uint8Array(new TextEncoder().encode(e3));
}
function B(e3) {
  return typeof e3 == "string" && (e3 = $(e3)), A(e3), e3;
}
var d = class {
  clone() {
    return this._cloneInto();
  }
};
function T(e3) {
  let t = (r) => e3().update(B(r)).digest(), n = e3();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e3(), t;
}
function M(e3, t, n, r) {
  if (typeof e3.setBigUint64 == "function") return e3.setBigUint64(t, n, r);
  let o = BigInt(32), c = BigInt(4294967295), i = Number(n >> o & c), s = Number(n & c), u = r ? 4 : 0, a = r ? 0 : 4;
  e3.setUint32(t + u, i, r), e3.setUint32(t + a, s, r);
}
var C = (e3, t, n) => e3 & t ^ ~e3 & n, k = (e3, t, n) => e3 & t ^ e3 & n ^ t & n, w = class extends d {
  constructor(t, n, r, o) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = o, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(t), this.view = g(this.buffer);
  }
  update(t) {
    U(this);
    let { view: n, buffer: r, blockLen: o } = this;
    t = B(t);
    let c = t.length;
    for (let i = 0; i < c; ) {
      let s = Math.min(o - this.pos, c - i);
      if (s === o) {
        let u = g(t);
        for (; o <= c - i; i += o) this.process(u, i);
        continue;
      }
      r.set(t.subarray(i, i + s), this.pos), this.pos += s, i += s, this.pos === o && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    U(this), S(t, this), this.finished = true;
    let { buffer: n, view: r, blockLen: o, isLE: c } = this, { pos: i } = this;
    n[i++] = 128, this.buffer.subarray(i).fill(0), this.padOffset > o - i && (this.process(r, 0), i = 0);
    for (let f = i; f < o; f++) n[f] = 0;
    M(r, o - 8, BigInt(this.length * 8), c), this.process(r, 0);
    let s = g(t), u = this.outputLen;
    if (u % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    let a = u / 4, p = this.get();
    if (a > p.length) throw new Error("_sha2: outputLen bigger than state");
    for (let f = 0; f < a; f++) s.setUint32(4 * f, p[f], c);
  }
  digest() {
    let { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    let r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    let { blockLen: n, buffer: r, length: o, finished: c, destroyed: i, pos: s } = this;
    return t.length = o, t.pos = s, t.finished = c, t.destroyed = i, o % n && t.buffer.set(r), t;
  }
};
var P = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), x = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), b = new Uint32Array(64), E = class extends w {
  constructor() {
    super(64, 32, 8, false), this.A = x[0] | 0, this.B = x[1] | 0, this.C = x[2] | 0, this.D = x[3] | 0, this.E = x[4] | 0, this.F = x[5] | 0, this.G = x[6] | 0, this.H = x[7] | 0;
  }
  get() {
    let { A: t, B: n, C: r, D: o, E: c, F: i, G: s, H: u } = this;
    return [t, n, r, o, c, i, s, u];
  }
  set(t, n, r, o, c, i, s, u) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = o | 0, this.E = c | 0, this.F = i | 0, this.G = s | 0, this.H = u | 0;
  }
  process(t, n) {
    for (let f = 0; f < 16; f++, n += 4) b[f] = t.getUint32(n, false);
    for (let f = 16; f < 64; f++) {
      let y = b[f - 15], l = b[f - 2], I = h(y, 7) ^ h(y, 18) ^ y >>> 3, m = h(l, 17) ^ h(l, 19) ^ l >>> 10;
      b[f] = m + b[f - 7] + I + b[f - 16] | 0;
    }
    let { A: r, B: o, C: c, D: i, E: s, F: u, G: a, H: p } = this;
    for (let f = 0; f < 64; f++) {
      let y = h(s, 6) ^ h(s, 11) ^ h(s, 25), l = p + y + C(s, u, a) + P[f] + b[f] | 0, m = (h(r, 2) ^ h(r, 13) ^ h(r, 22)) + k(r, o, c) | 0;
      p = a, a = u, u = s, s = i + l | 0, i = c, c = o, o = r, r = l + m | 0;
    }
    r = r + this.A | 0, o = o + this.B | 0, c = c + this.C | 0, i = i + this.D | 0, s = s + this.E | 0, u = u + this.F | 0, a = a + this.G | 0, p = p + this.H | 0, this.set(r, o, c, i, s, u, a, p);
  }
  roundClean() {
    b.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}, L = class extends E {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
};
var O = T(() => new L());
var D = class e {
  constructor(t) {
    this.bytes = t;
  }
  static fromHex(t) {
    return new e(Uint8Array.from(Buffer.from(t, "hex")));
  }
  static fromPrincipal({ principal: t, subAccount: n = _.fromID(0) }) {
    let r = asciiStringToByteArray(`
account-id`), o = O.create();
    o.update(arrayOfNumberToUint8Array([...r, ...t.toUint8Array(), ...n.toUint8Array()]));
    let c = o.digest(), i = bigEndianCrc32(c), s = new Uint8Array([...i, ...c]);
    return new e(s);
  }
  toHex() {
    return uint8ArrayToHexString(this.bytes);
  }
  toUint8Array() {
    return this.bytes;
  }
  toNumbers() {
    return Array.from(this.bytes);
  }
  toAccountIdentifierHash() {
    return { hash: this.toUint8Array() };
  }
}, _ = class e2 {
  constructor(t) {
    this.bytes = t;
  }
  static fromBytes(t) {
    return t.length != 32 ? Error("Subaccount length must be 32-bytes") : new e2(t);
  }
  static fromPrincipal(t) {
    let n = new Uint8Array(32).fill(0), r = t.toUint8Array();
    n[0] = r.length;
    for (let o = 0; o < r.length; o++) n[1 + o] = r[o];
    return new e2(n);
  }
  static fromID(t) {
    if (t < 0) throw new Error("Number cannot be negative");
    if (t > Number.MAX_SAFE_INTEGER) throw new Error("Number is too large to fit in 32 bytes.");
    let n = new DataView(new ArrayBuffer(32));
    if (typeof n.setBigUint64 == "function") n.setBigUint64(24, BigInt(t));
    else {
      let o = BigInt(1) << BigInt(32);
      n.setUint32(24, Number(BigInt(t) >> BigInt(32))), n.setUint32(28, Number(BigInt(t) % o));
    }
    let r = new Uint8Array(n.buffer);
    return new e2(r);
  }
  toUint8Array() {
    return this.bytes;
  }
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
Principal.fromText("qhbym-qaaaa-aaaaa-aaafq-cai");
BigInt(1095062083);
BigInt(1347768404);
BigInt(1e4);
BigInt(1e8);
var J = z((S2) => {
  S2.byteLength = gr;
  S2.toByteArray = Ar;
  S2.fromByteArray = Tr;
  var B2 = [], x2 = [], Er = typeof Uint8Array < "u" ? Uint8Array : Array, M2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (g2 = 0, X = M2.length; g2 < X; ++g2) B2[g2] = M2[g2], x2[M2.charCodeAt(g2)] = g2;
  var g2, X;
  x2[45] = 62;
  x2[95] = 63;
  function z2(i) {
    var r = i.length;
    if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var t = i.indexOf("=");
    t === -1 && (t = r);
    var e3 = t === r ? 0 : 4 - t % 4;
    return [t, e3];
  }
  function gr(i) {
    var r = z2(i), t = r[0], e3 = r[1];
    return (t + e3) * 3 / 4 - e3;
  }
  function Ir(i, r, t) {
    return (r + t) * 3 / 4 - t;
  }
  function Ar(i) {
    var r, t = z2(i), e3 = t[0], n = t[1], o = new Er(Ir(i, e3, n)), u = 0, f = n > 0 ? e3 - 4 : e3, h2;
    for (h2 = 0; h2 < f; h2 += 4) r = x2[i.charCodeAt(h2)] << 18 | x2[i.charCodeAt(h2 + 1)] << 12 | x2[i.charCodeAt(h2 + 2)] << 6 | x2[i.charCodeAt(h2 + 3)], o[u++] = r >> 16 & 255, o[u++] = r >> 8 & 255, o[u++] = r & 255;
    return n === 2 && (r = x2[i.charCodeAt(h2)] << 2 | x2[i.charCodeAt(h2 + 1)] >> 4, o[u++] = r & 255), n === 1 && (r = x2[i.charCodeAt(h2)] << 10 | x2[i.charCodeAt(h2 + 1)] << 4 | x2[i.charCodeAt(h2 + 2)] >> 2, o[u++] = r >> 8 & 255, o[u++] = r & 255), o;
  }
  function Fr(i) {
    return B2[i >> 18 & 63] + B2[i >> 12 & 63] + B2[i >> 6 & 63] + B2[i & 63];
  }
  function Ur(i, r, t) {
    for (var e3, n = [], o = r; o < t; o += 3) e3 = (i[o] << 16 & 16711680) + (i[o + 1] << 8 & 65280) + (i[o + 2] & 255), n.push(Fr(e3));
    return n.join("");
  }
  function Tr(i) {
    for (var r, t = i.length, e3 = t % 3, n = [], o = 16383, u = 0, f = t - e3; u < f; u += o) n.push(Ur(i, u, u + o > f ? f : u + o));
    return e3 === 1 ? (r = i[t - 1], n.push(B2[r >> 2] + B2[r << 4 & 63] + "==")) : e3 === 2 && (r = (i[t - 2] << 8) + i[t - 1], n.push(B2[r >> 10] + B2[r >> 4 & 63] + B2[r << 2 & 63] + "=")), n.join("");
  }
});
var K = z(($2) => {
  $2.read = function(i, r, t, e3, n) {
    var o, u, f = n * 8 - e3 - 1, h2 = (1 << f) - 1, l = h2 >> 1, s = -7, p = t ? n - 1 : 0, A2 = t ? -1 : 1, w2 = i[r + p];
    for (p += A2, o = w2 & (1 << -s) - 1, w2 >>= -s, s += f; s > 0; o = o * 256 + i[r + p], p += A2, s -= 8) ;
    for (u = o & (1 << -s) - 1, o >>= -s, s += e3; s > 0; u = u * 256 + i[r + p], p += A2, s -= 8) ;
    if (o === 0) o = 1 - l;
    else {
      if (o === h2) return u ? NaN : (w2 ? -1 : 1) * (1 / 0);
      u = u + Math.pow(2, e3), o = o - l;
    }
    return (w2 ? -1 : 1) * u * Math.pow(2, o - e3);
  };
  $2.write = function(i, r, t, e3, n, o) {
    var u, f, h2, l = o * 8 - n - 1, s = (1 << l) - 1, p = s >> 1, A2 = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, w2 = e3 ? 0 : o - 1, b2 = e3 ? 1 : -1, yr = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (f = isNaN(r) ? 1 : 0, u = s) : (u = Math.floor(Math.log(r) / Math.LN2), r * (h2 = Math.pow(2, -u)) < 1 && (u--, h2 *= 2), u + p >= 1 ? r += A2 / h2 : r += A2 * Math.pow(2, 1 - p), r * h2 >= 2 && (u++, h2 /= 2), u + p >= s ? (f = 0, u = s) : u + p >= 1 ? (f = (r * h2 - 1) * Math.pow(2, n), u = u + p) : (f = r * Math.pow(2, p - 1) * Math.pow(2, n), u = 0)); n >= 8; i[t + w2] = f & 255, w2 += b2, f /= 256, n -= 8) ;
    for (u = u << n | f, l += n; l > 0; i[t + w2] = u & 255, w2 += b2, u /= 256, l -= 8) ;
    i[t + w2 - b2] |= yr * 128;
  };
});
var ar = z((R) => {
  var D2 = J(), U2 = K(), Z = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  R.Buffer = c;
  R.SlowBuffer = br;
  R.INSPECT_MAX_BYTES = 50;
  var _2 = 2147483647;
  R.kMaxLength = _2;
  c.TYPED_ARRAY_SUPPORT = Rr();
  !c.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function Rr() {
    try {
      let i = new Uint8Array(1), r = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(i, r), i.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(c.prototype, "parent", { enumerable: true, get: function() {
    if (c.isBuffer(this)) return this.buffer;
  } });
  Object.defineProperty(c.prototype, "offset", { enumerable: true, get: function() {
    if (c.isBuffer(this)) return this.byteOffset;
  } });
  function m(i) {
    if (i > _2) throw new RangeError('The value "' + i + '" is invalid for option "size"');
    let r = new Uint8Array(i);
    return Object.setPrototypeOf(r, c.prototype), r;
  }
  function c(i, r, t) {
    if (typeof i == "number") {
      if (typeof r == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return G2(i);
    }
    return tr(i, r, t);
  }
  c.poolSize = 8192;
  function tr(i, r, t) {
    if (typeof i == "string") return Sr(i, r);
    if (ArrayBuffer.isView(i)) return _r(i);
    if (i == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i);
    if (d2(i, ArrayBuffer) || i && d2(i.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (d2(i, SharedArrayBuffer) || i && d2(i.buffer, SharedArrayBuffer))) return O2(i, r, t);
    if (typeof i == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let e3 = i.valueOf && i.valueOf();
    if (e3 != null && e3 !== i) return c.from(e3, r, t);
    let n = kr(i);
    if (n) return n;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof i[Symbol.toPrimitive] == "function") return c.from(i[Symbol.toPrimitive]("string"), r, t);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i);
  }
  c.from = function(i, r, t) {
    return tr(i, r, t);
  };
  Object.setPrototypeOf(c.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(c, Uint8Array);
  function ir(i) {
    if (typeof i != "number") throw new TypeError('"size" argument must be of type number');
    if (i < 0) throw new RangeError('The value "' + i + '" is invalid for option "size"');
  }
  function Cr(i, r, t) {
    return ir(i), i <= 0 ? m(i) : r !== void 0 ? typeof t == "string" ? m(i).fill(r, t) : m(i).fill(r) : m(i);
  }
  c.alloc = function(i, r, t) {
    return Cr(i, r, t);
  };
  function G2(i) {
    return ir(i), m(i < 0 ? 0 : H2(i) | 0);
  }
  c.allocUnsafe = function(i) {
    return G2(i);
  };
  c.allocUnsafeSlow = function(i) {
    return G2(i);
  };
  function Sr(i, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
    let t = er(i, r) | 0, e3 = m(t), n = e3.write(i, r);
    return n !== t && (e3 = e3.slice(0, n)), e3;
  }
  function P2(i) {
    let r = i.length < 0 ? 0 : H2(i.length) | 0, t = m(r);
    for (let e3 = 0; e3 < r; e3 += 1) t[e3] = i[e3] & 255;
    return t;
  }
  function _r(i) {
    if (d2(i, Uint8Array)) {
      let r = new Uint8Array(i);
      return O2(r.buffer, r.byteOffset, r.byteLength);
    }
    return P2(i);
  }
  function O2(i, r, t) {
    if (r < 0 || i.byteLength < r) throw new RangeError('"offset" is outside of buffer bounds');
    if (i.byteLength < r + (t || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let e3;
    return r === void 0 && t === void 0 ? e3 = new Uint8Array(i) : t === void 0 ? e3 = new Uint8Array(i, r) : e3 = new Uint8Array(i, r, t), Object.setPrototypeOf(e3, c.prototype), e3;
  }
  function kr(i) {
    if (c.isBuffer(i)) {
      let r = H2(i.length) | 0, t = m(r);
      return t.length === 0 || i.copy(t, 0, 0, r), t;
    }
    if (i.length !== void 0) return typeof i.length != "number" || W2(i.length) ? m(0) : P2(i);
    if (i.type === "Buffer" && Array.isArray(i.data)) return P2(i.data);
  }
  function H2(i) {
    if (i >= _2) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + _2.toString(16) + " bytes");
    return i | 0;
  }
  function br(i) {
    return +i != i && (i = 0), c.alloc(+i);
  }
  c.isBuffer = function(r) {
    return r != null && r._isBuffer === true && r !== c.prototype;
  };
  c.compare = function(r, t) {
    if (d2(r, Uint8Array) && (r = c.from(r, r.offset, r.byteLength)), d2(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)), !c.isBuffer(r) || !c.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (r === t) return 0;
    let e3 = r.length, n = t.length;
    for (let o = 0, u = Math.min(e3, n); o < u; ++o) if (r[o] !== t[o]) {
      e3 = r[o], n = t[o];
      break;
    }
    return e3 < n ? -1 : n < e3 ? 1 : 0;
  };
  c.isEncoding = function(r) {
    switch (String(r).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  c.concat = function(r, t) {
    if (!Array.isArray(r)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (r.length === 0) return c.alloc(0);
    let e3;
    if (t === void 0) for (t = 0, e3 = 0; e3 < r.length; ++e3) t += r[e3].length;
    let n = c.allocUnsafe(t), o = 0;
    for (e3 = 0; e3 < r.length; ++e3) {
      let u = r[e3];
      if (d2(u, Uint8Array)) o + u.length > n.length ? (c.isBuffer(u) || (u = c.from(u)), u.copy(n, o)) : Uint8Array.prototype.set.call(n, u, o);
      else if (c.isBuffer(u)) u.copy(n, o);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      o += u.length;
    }
    return n;
  };
  function er(i, r) {
    if (c.isBuffer(i)) return i.length;
    if (ArrayBuffer.isView(i) || d2(i, ArrayBuffer)) return i.byteLength;
    if (typeof i != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof i);
    let t = i.length, e3 = arguments.length > 2 && arguments[2] === true;
    if (!e3 && t === 0) return 0;
    let n = false;
    for (; ; ) switch (r) {
      case "ascii":
      case "latin1":
      case "binary":
        return t;
      case "utf8":
      case "utf-8":
        return q(i).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return t * 2;
      case "hex":
        return t >>> 1;
      case "base64":
        return lr(i).length;
      default:
        if (n) return e3 ? -1 : q(i).length;
        r = ("" + r).toLowerCase(), n = true;
    }
  }
  c.byteLength = er;
  function Lr(i, r, t) {
    let e3 = false;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, r >>>= 0, t <= r)) return "";
    for (i || (i = "utf8"); ; ) switch (i) {
      case "hex":
        return Yr(this, r, t);
      case "utf8":
      case "utf-8":
        return or(this, r, t);
      case "ascii":
        return Gr(this, r, t);
      case "latin1":
      case "binary":
        return Hr(this, r, t);
      case "base64":
        return Or(this, r, t);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Wr(this, r, t);
      default:
        if (e3) throw new TypeError("Unknown encoding: " + i);
        i = (i + "").toLowerCase(), e3 = true;
    }
  }
  c.prototype._isBuffer = true;
  function I(i, r, t) {
    let e3 = i[r];
    i[r] = i[t], i[t] = e3;
  }
  c.prototype.swap16 = function() {
    let r = this.length;
    if (r % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < r; t += 2) I(this, t, t + 1);
    return this;
  };
  c.prototype.swap32 = function() {
    let r = this.length;
    if (r % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < r; t += 4) I(this, t, t + 3), I(this, t + 1, t + 2);
    return this;
  };
  c.prototype.swap64 = function() {
    let r = this.length;
    if (r % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let t = 0; t < r; t += 8) I(this, t, t + 7), I(this, t + 1, t + 6), I(this, t + 2, t + 5), I(this, t + 3, t + 4);
    return this;
  };
  c.prototype.toString = function() {
    let r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? or(this, 0, r) : Lr.apply(this, arguments);
  };
  c.prototype.toLocaleString = c.prototype.toString;
  c.prototype.equals = function(r) {
    if (!c.isBuffer(r)) throw new TypeError("Argument must be a Buffer");
    return this === r ? true : c.compare(this, r) === 0;
  };
  c.prototype.inspect = function() {
    let r = "", t = R.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (r += " ... "), "<Buffer " + r + ">";
  };
  Z && (c.prototype[Z] = c.prototype.inspect);
  c.prototype.compare = function(r, t, e3, n, o) {
    if (d2(r, Uint8Array) && (r = c.from(r, r.offset, r.byteLength)), !c.isBuffer(r)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r);
    if (t === void 0 && (t = 0), e3 === void 0 && (e3 = r ? r.length : 0), n === void 0 && (n = 0), o === void 0 && (o = this.length), t < 0 || e3 > r.length || n < 0 || o > this.length) throw new RangeError("out of range index");
    if (n >= o && t >= e3) return 0;
    if (n >= o) return -1;
    if (t >= e3) return 1;
    if (t >>>= 0, e3 >>>= 0, n >>>= 0, o >>>= 0, this === r) return 0;
    let u = o - n, f = e3 - t, h2 = Math.min(u, f), l = this.slice(n, o), s = r.slice(t, e3);
    for (let p = 0; p < h2; ++p) if (l[p] !== s[p]) {
      u = l[p], f = s[p];
      break;
    }
    return u < f ? -1 : f < u ? 1 : 0;
  };
  function nr(i, r, t, e3, n) {
    if (i.length === 0) return -1;
    if (typeof t == "string" ? (e3 = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, W2(t) && (t = n ? 0 : i.length - 1), t < 0 && (t = i.length + t), t >= i.length) {
      if (n) return -1;
      t = i.length - 1;
    } else if (t < 0) if (n) t = 0;
    else return -1;
    if (typeof r == "string" && (r = c.from(r, e3)), c.isBuffer(r)) return r.length === 0 ? -1 : Q(i, r, t, e3, n);
    if (typeof r == "number") return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? n ? Uint8Array.prototype.indexOf.call(i, r, t) : Uint8Array.prototype.lastIndexOf.call(i, r, t) : Q(i, [r], t, e3, n);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Q(i, r, t, e3, n) {
    let o = 1, u = i.length, f = r.length;
    if (e3 !== void 0 && (e3 = String(e3).toLowerCase(), e3 === "ucs2" || e3 === "ucs-2" || e3 === "utf16le" || e3 === "utf-16le")) {
      if (i.length < 2 || r.length < 2) return -1;
      o = 2, u /= 2, f /= 2, t /= 2;
    }
    function h2(s, p) {
      return o === 1 ? s[p] : s.readUInt16BE(p * o);
    }
    let l;
    if (n) {
      let s = -1;
      for (l = t; l < u; l++) if (h2(i, l) === h2(r, s === -1 ? 0 : l - s)) {
        if (s === -1 && (s = l), l - s + 1 === f) return s * o;
      } else s !== -1 && (l -= l - s), s = -1;
    } else for (t + f > u && (t = u - f), l = t; l >= 0; l--) {
      let s = true;
      for (let p = 0; p < f; p++) if (h2(i, l + p) !== h2(r, p)) {
        s = false;
        break;
      }
      if (s) return l;
    }
    return -1;
  }
  c.prototype.includes = function(r, t, e3) {
    return this.indexOf(r, t, e3) !== -1;
  };
  c.prototype.indexOf = function(r, t, e3) {
    return nr(this, r, t, e3, true);
  };
  c.prototype.lastIndexOf = function(r, t, e3) {
    return nr(this, r, t, e3, false);
  };
  function Nr(i, r, t, e3) {
    t = Number(t) || 0;
    let n = i.length - t;
    e3 ? (e3 = Number(e3), e3 > n && (e3 = n)) : e3 = n;
    let o = r.length;
    e3 > o / 2 && (e3 = o / 2);
    let u;
    for (u = 0; u < e3; ++u) {
      let f = parseInt(r.substr(u * 2, 2), 16);
      if (W2(f)) return u;
      i[t + u] = f;
    }
    return u;
  }
  function Mr(i, r, t, e3) {
    return k2(q(r, i.length - t), i, t, e3);
  }
  function $r(i, r, t, e3) {
    return k2(zr(r), i, t, e3);
  }
  function Dr(i, r, t, e3) {
    return k2(lr(r), i, t, e3);
  }
  function Pr(i, r, t, e3) {
    return k2(Jr(r, i.length - t), i, t, e3);
  }
  c.prototype.write = function(r, t, e3, n) {
    if (t === void 0) n = "utf8", e3 = this.length, t = 0;
    else if (e3 === void 0 && typeof t == "string") n = t, e3 = this.length, t = 0;
    else if (isFinite(t)) t = t >>> 0, isFinite(e3) ? (e3 = e3 >>> 0, n === void 0 && (n = "utf8")) : (n = e3, e3 = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let o = this.length - t;
    if ((e3 === void 0 || e3 > o) && (e3 = o), r.length > 0 && (e3 < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    n || (n = "utf8");
    let u = false;
    for (; ; ) switch (n) {
      case "hex":
        return Nr(this, r, t, e3);
      case "utf8":
      case "utf-8":
        return Mr(this, r, t, e3);
      case "ascii":
      case "latin1":
      case "binary":
        return $r(this, r, t, e3);
      case "base64":
        return Dr(this, r, t, e3);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Pr(this, r, t, e3);
      default:
        if (u) throw new TypeError("Unknown encoding: " + n);
        n = ("" + n).toLowerCase(), u = true;
    }
  };
  c.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function Or(i, r, t) {
    return r === 0 && t === i.length ? D2.fromByteArray(i) : D2.fromByteArray(i.slice(r, t));
  }
  function or(i, r, t) {
    t = Math.min(i.length, t);
    let e3 = [], n = r;
    for (; n < t; ) {
      let o = i[n], u = null, f = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
      if (n + f <= t) {
        let h2, l, s, p;
        switch (f) {
          case 1:
            o < 128 && (u = o);
            break;
          case 2:
            h2 = i[n + 1], (h2 & 192) === 128 && (p = (o & 31) << 6 | h2 & 63, p > 127 && (u = p));
            break;
          case 3:
            h2 = i[n + 1], l = i[n + 2], (h2 & 192) === 128 && (l & 192) === 128 && (p = (o & 15) << 12 | (h2 & 63) << 6 | l & 63, p > 2047 && (p < 55296 || p > 57343) && (u = p));
            break;
          case 4:
            h2 = i[n + 1], l = i[n + 2], s = i[n + 3], (h2 & 192) === 128 && (l & 192) === 128 && (s & 192) === 128 && (p = (o & 15) << 18 | (h2 & 63) << 12 | (l & 63) << 6 | s & 63, p > 65535 && p < 1114112 && (u = p));
        }
      }
      u === null ? (u = 65533, f = 1) : u > 65535 && (u -= 65536, e3.push(u >>> 10 & 1023 | 55296), u = 56320 | u & 1023), e3.push(u), n += f;
    }
    return qr(e3);
  }
  var v2 = 4096;
  function qr(i) {
    let r = i.length;
    if (r <= v2) return String.fromCharCode.apply(String, i);
    let t = "", e3 = 0;
    for (; e3 < r; ) t += String.fromCharCode.apply(String, i.slice(e3, e3 += v2));
    return t;
  }
  function Gr(i, r, t) {
    let e3 = "";
    t = Math.min(i.length, t);
    for (let n = r; n < t; ++n) e3 += String.fromCharCode(i[n] & 127);
    return e3;
  }
  function Hr(i, r, t) {
    let e3 = "";
    t = Math.min(i.length, t);
    for (let n = r; n < t; ++n) e3 += String.fromCharCode(i[n]);
    return e3;
  }
  function Yr(i, r, t) {
    let e3 = i.length;
    (!r || r < 0) && (r = 0), (!t || t < 0 || t > e3) && (t = e3);
    let n = "";
    for (let o = r; o < t; ++o) n += Kr[i[o]];
    return n;
  }
  function Wr(i, r, t) {
    let e3 = i.slice(r, t), n = "";
    for (let o = 0; o < e3.length - 1; o += 2) n += String.fromCharCode(e3[o] + e3[o + 1] * 256);
    return n;
  }
  c.prototype.slice = function(r, t) {
    let e3 = this.length;
    r = ~~r, t = t === void 0 ? e3 : ~~t, r < 0 ? (r += e3, r < 0 && (r = 0)) : r > e3 && (r = e3), t < 0 ? (t += e3, t < 0 && (t = 0)) : t > e3 && (t = e3), t < r && (t = r);
    let n = this.subarray(r, t);
    return Object.setPrototypeOf(n, c.prototype), n;
  };
  function a(i, r, t) {
    if (i % 1 !== 0 || i < 0) throw new RangeError("offset is not uint");
    if (i + r > t) throw new RangeError("Trying to access beyond buffer length");
  }
  c.prototype.readUintLE = c.prototype.readUIntLE = function(r, t, e3) {
    r = r >>> 0, t = t >>> 0, e3 || a(r, t, this.length);
    let n = this[r], o = 1, u = 0;
    for (; ++u < t && (o *= 256); ) n += this[r + u] * o;
    return n;
  };
  c.prototype.readUintBE = c.prototype.readUIntBE = function(r, t, e3) {
    r = r >>> 0, t = t >>> 0, e3 || a(r, t, this.length);
    let n = this[r + --t], o = 1;
    for (; t > 0 && (o *= 256); ) n += this[r + --t] * o;
    return n;
  };
  c.prototype.readUint8 = c.prototype.readUInt8 = function(r, t) {
    return r = r >>> 0, t || a(r, 1, this.length), this[r];
  };
  c.prototype.readUint16LE = c.prototype.readUInt16LE = function(r, t) {
    return r = r >>> 0, t || a(r, 2, this.length), this[r] | this[r + 1] << 8;
  };
  c.prototype.readUint16BE = c.prototype.readUInt16BE = function(r, t) {
    return r = r >>> 0, t || a(r, 2, this.length), this[r] << 8 | this[r + 1];
  };
  c.prototype.readUint32LE = c.prototype.readUInt32LE = function(r, t) {
    return r = r >>> 0, t || a(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  };
  c.prototype.readUint32BE = c.prototype.readUInt32BE = function(r, t) {
    return r = r >>> 0, t || a(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  };
  c.prototype.readBigUInt64LE = E2(function(r) {
    r = r >>> 0, T2(r, "offset");
    let t = this[r], e3 = this[r + 7];
    (t === void 0 || e3 === void 0) && C2(r, this.length - 8);
    let n = t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24, o = this[++r] + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + e3 * 2 ** 24;
    return BigInt(n) + (BigInt(o) << BigInt(32));
  });
  c.prototype.readBigUInt64BE = E2(function(r) {
    r = r >>> 0, T2(r, "offset");
    let t = this[r], e3 = this[r + 7];
    (t === void 0 || e3 === void 0) && C2(r, this.length - 8);
    let n = t * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r], o = this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + e3;
    return (BigInt(n) << BigInt(32)) + BigInt(o);
  });
  c.prototype.readIntLE = function(r, t, e3) {
    r = r >>> 0, t = t >>> 0, e3 || a(r, t, this.length);
    let n = this[r], o = 1, u = 0;
    for (; ++u < t && (o *= 256); ) n += this[r + u] * o;
    return o *= 128, n >= o && (n -= Math.pow(2, 8 * t)), n;
  };
  c.prototype.readIntBE = function(r, t, e3) {
    r = r >>> 0, t = t >>> 0, e3 || a(r, t, this.length);
    let n = t, o = 1, u = this[r + --n];
    for (; n > 0 && (o *= 256); ) u += this[r + --n] * o;
    return o *= 128, u >= o && (u -= Math.pow(2, 8 * t)), u;
  };
  c.prototype.readInt8 = function(r, t) {
    return r = r >>> 0, t || a(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  };
  c.prototype.readInt16LE = function(r, t) {
    r = r >>> 0, t || a(r, 2, this.length);
    let e3 = this[r] | this[r + 1] << 8;
    return e3 & 32768 ? e3 | 4294901760 : e3;
  };
  c.prototype.readInt16BE = function(r, t) {
    r = r >>> 0, t || a(r, 2, this.length);
    let e3 = this[r + 1] | this[r] << 8;
    return e3 & 32768 ? e3 | 4294901760 : e3;
  };
  c.prototype.readInt32LE = function(r, t) {
    return r = r >>> 0, t || a(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  };
  c.prototype.readInt32BE = function(r, t) {
    return r = r >>> 0, t || a(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  };
  c.prototype.readBigInt64LE = E2(function(r) {
    r = r >>> 0, T2(r, "offset");
    let t = this[r], e3 = this[r + 7];
    (t === void 0 || e3 === void 0) && C2(r, this.length - 8);
    let n = this[r + 4] + this[r + 5] * 2 ** 8 + this[r + 6] * 2 ** 16 + (e3 << 24);
    return (BigInt(n) << BigInt(32)) + BigInt(t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24);
  });
  c.prototype.readBigInt64BE = E2(function(r) {
    r = r >>> 0, T2(r, "offset");
    let t = this[r], e3 = this[r + 7];
    (t === void 0 || e3 === void 0) && C2(r, this.length - 8);
    let n = (t << 24) + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r];
    return (BigInt(n) << BigInt(32)) + BigInt(this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + e3);
  });
  c.prototype.readFloatLE = function(r, t) {
    return r = r >>> 0, t || a(r, 4, this.length), U2.read(this, r, true, 23, 4);
  };
  c.prototype.readFloatBE = function(r, t) {
    return r = r >>> 0, t || a(r, 4, this.length), U2.read(this, r, false, 23, 4);
  };
  c.prototype.readDoubleLE = function(r, t) {
    return r = r >>> 0, t || a(r, 8, this.length), U2.read(this, r, true, 52, 8);
  };
  c.prototype.readDoubleBE = function(r, t) {
    return r = r >>> 0, t || a(r, 8, this.length), U2.read(this, r, false, 52, 8);
  };
  function y(i, r, t, e3, n, o) {
    if (!c.isBuffer(i)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > n || r < o) throw new RangeError('"value" argument is out of bounds');
    if (t + e3 > i.length) throw new RangeError("Index out of range");
  }
  c.prototype.writeUintLE = c.prototype.writeUIntLE = function(r, t, e3, n) {
    if (r = +r, t = t >>> 0, e3 = e3 >>> 0, !n) {
      let f = Math.pow(2, 8 * e3) - 1;
      y(this, r, t, e3, f, 0);
    }
    let o = 1, u = 0;
    for (this[t] = r & 255; ++u < e3 && (o *= 256); ) this[t + u] = r / o & 255;
    return t + e3;
  };
  c.prototype.writeUintBE = c.prototype.writeUIntBE = function(r, t, e3, n) {
    if (r = +r, t = t >>> 0, e3 = e3 >>> 0, !n) {
      let f = Math.pow(2, 8 * e3) - 1;
      y(this, r, t, e3, f, 0);
    }
    let o = e3 - 1, u = 1;
    for (this[t + o] = r & 255; --o >= 0 && (u *= 256); ) this[t + o] = r / u & 255;
    return t + e3;
  };
  c.prototype.writeUint8 = c.prototype.writeUInt8 = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 1, 255, 0), this[t] = r & 255, t + 1;
  };
  c.prototype.writeUint16LE = c.prototype.writeUInt16LE = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 2, 65535, 0), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
  };
  c.prototype.writeUint16BE = c.prototype.writeUInt16BE = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 2, 65535, 0), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
  };
  c.prototype.writeUint32LE = c.prototype.writeUInt32LE = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 4, 4294967295, 0), this[t + 3] = r >>> 24, this[t + 2] = r >>> 16, this[t + 1] = r >>> 8, this[t] = r & 255, t + 4;
  };
  c.prototype.writeUint32BE = c.prototype.writeUInt32BE = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 4, 4294967295, 0), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
  };
  function ur(i, r, t, e3, n) {
    sr(r, e3, n, i, t, 7);
    let o = Number(r & BigInt(4294967295));
    i[t++] = o, o = o >> 8, i[t++] = o, o = o >> 8, i[t++] = o, o = o >> 8, i[t++] = o;
    let u = Number(r >> BigInt(32) & BigInt(4294967295));
    return i[t++] = u, u = u >> 8, i[t++] = u, u = u >> 8, i[t++] = u, u = u >> 8, i[t++] = u, t;
  }
  function cr(i, r, t, e3, n) {
    sr(r, e3, n, i, t, 7);
    let o = Number(r & BigInt(4294967295));
    i[t + 7] = o, o = o >> 8, i[t + 6] = o, o = o >> 8, i[t + 5] = o, o = o >> 8, i[t + 4] = o;
    let u = Number(r >> BigInt(32) & BigInt(4294967295));
    return i[t + 3] = u, u = u >> 8, i[t + 2] = u, u = u >> 8, i[t + 1] = u, u = u >> 8, i[t] = u, t + 8;
  }
  c.prototype.writeBigUInt64LE = E2(function(r, t = 0) {
    return ur(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  c.prototype.writeBigUInt64BE = E2(function(r, t = 0) {
    return cr(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  c.prototype.writeIntLE = function(r, t, e3, n) {
    if (r = +r, t = t >>> 0, !n) {
      let h2 = Math.pow(2, 8 * e3 - 1);
      y(this, r, t, e3, h2 - 1, -h2);
    }
    let o = 0, u = 1, f = 0;
    for (this[t] = r & 255; ++o < e3 && (u *= 256); ) r < 0 && f === 0 && this[t + o - 1] !== 0 && (f = 1), this[t + o] = (r / u >> 0) - f & 255;
    return t + e3;
  };
  c.prototype.writeIntBE = function(r, t, e3, n) {
    if (r = +r, t = t >>> 0, !n) {
      let h2 = Math.pow(2, 8 * e3 - 1);
      y(this, r, t, e3, h2 - 1, -h2);
    }
    let o = e3 - 1, u = 1, f = 0;
    for (this[t + o] = r & 255; --o >= 0 && (u *= 256); ) r < 0 && f === 0 && this[t + o + 1] !== 0 && (f = 1), this[t + o] = (r / u >> 0) - f & 255;
    return t + e3;
  };
  c.prototype.writeInt8 = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[t] = r & 255, t + 1;
  };
  c.prototype.writeInt16LE = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 2, 32767, -32768), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
  };
  c.prototype.writeInt16BE = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 2, 32767, -32768), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
  };
  c.prototype.writeInt32LE = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 4, 2147483647, -2147483648), this[t] = r & 255, this[t + 1] = r >>> 8, this[t + 2] = r >>> 16, this[t + 3] = r >>> 24, t + 4;
  };
  c.prototype.writeInt32BE = function(r, t, e3) {
    return r = +r, t = t >>> 0, e3 || y(this, r, t, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
  };
  c.prototype.writeBigInt64LE = E2(function(r, t = 0) {
    return ur(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  c.prototype.writeBigInt64BE = E2(function(r, t = 0) {
    return cr(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function fr(i, r, t, e3, n, o) {
    if (t + e3 > i.length) throw new RangeError("Index out of range");
    if (t < 0) throw new RangeError("Index out of range");
  }
  function hr(i, r, t, e3, n) {
    return r = +r, t = t >>> 0, n || fr(i, r, t, 4), U2.write(i, r, t, e3, 23, 4), t + 4;
  }
  c.prototype.writeFloatLE = function(r, t, e3) {
    return hr(this, r, t, true, e3);
  };
  c.prototype.writeFloatBE = function(r, t, e3) {
    return hr(this, r, t, false, e3);
  };
  function pr(i, r, t, e3, n) {
    return r = +r, t = t >>> 0, n || fr(i, r, t, 8), U2.write(i, r, t, e3, 52, 8), t + 8;
  }
  c.prototype.writeDoubleLE = function(r, t, e3) {
    return pr(this, r, t, true, e3);
  };
  c.prototype.writeDoubleBE = function(r, t, e3) {
    return pr(this, r, t, false, e3);
  };
  c.prototype.copy = function(r, t, e3, n) {
    if (!c.isBuffer(r)) throw new TypeError("argument should be a Buffer");
    if (e3 || (e3 = 0), !n && n !== 0 && (n = this.length), t >= r.length && (t = r.length), t || (t = 0), n > 0 && n < e3 && (n = e3), n === e3 || r.length === 0 || this.length === 0) return 0;
    if (t < 0) throw new RangeError("targetStart out of bounds");
    if (e3 < 0 || e3 >= this.length) throw new RangeError("Index out of range");
    if (n < 0) throw new RangeError("sourceEnd out of bounds");
    n > this.length && (n = this.length), r.length - t < n - e3 && (n = r.length - t + e3);
    let o = n - e3;
    return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, e3, n) : Uint8Array.prototype.set.call(r, this.subarray(e3, n), t), o;
  };
  c.prototype.fill = function(r, t, e3, n) {
    if (typeof r == "string") {
      if (typeof t == "string" ? (n = t, t = 0, e3 = this.length) : typeof e3 == "string" && (n = e3, e3 = this.length), n !== void 0 && typeof n != "string") throw new TypeError("encoding must be a string");
      if (typeof n == "string" && !c.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
      if (r.length === 1) {
        let u = r.charCodeAt(0);
        (n === "utf8" && u < 128 || n === "latin1") && (r = u);
      }
    } else typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
    if (t < 0 || this.length < t || this.length < e3) throw new RangeError("Out of range index");
    if (e3 <= t) return this;
    t = t >>> 0, e3 = e3 === void 0 ? this.length : e3 >>> 0, r || (r = 0);
    let o;
    if (typeof r == "number") for (o = t; o < e3; ++o) this[o] = r;
    else {
      let u = c.isBuffer(r) ? r : c.from(r, n), f = u.length;
      if (f === 0) throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (o = 0; o < e3 - t; ++o) this[o + t] = u[o % f];
    }
    return this;
  };
  var F2 = {};
  function Y(i, r, t) {
    F2[i] = class extends t {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: r.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${i}]`, this.stack, delete this.name;
      }
      get code() {
        return i;
      }
      set code(n) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: n, writable: true });
      }
      toString() {
        return `${this.name} [${i}]: ${this.message}`;
      }
    };
  }
  Y("ERR_BUFFER_OUT_OF_BOUNDS", function(i) {
    return i ? `${i} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  Y("ERR_INVALID_ARG_TYPE", function(i, r) {
    return `The "${i}" argument must be of type number. Received type ${typeof r}`;
  }, TypeError);
  Y("ERR_OUT_OF_RANGE", function(i, r, t) {
    let e3 = `The value of "${i}" is out of range.`, n = t;
    return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? n = rr(String(t)) : typeof t == "bigint" && (n = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (n = rr(n)), n += "n"), e3 += ` It must be ${r}. Received ${n}`, e3;
  }, RangeError);
  function rr(i) {
    let r = "", t = i.length, e3 = i[0] === "-" ? 1 : 0;
    for (; t >= e3 + 4; t -= 3) r = `_${i.slice(t - 3, t)}${r}`;
    return `${i.slice(0, t)}${r}`;
  }
  function jr(i, r, t) {
    T2(r, "offset"), (i[r] === void 0 || i[r + t] === void 0) && C2(r, i.length - (t + 1));
  }
  function sr(i, r, t, e3, n, o) {
    if (i > t || i < r) {
      let u = typeof r == "bigint" ? "n" : "", f;
      throw r === 0 || r === BigInt(0) ? f = `>= 0${u} and < 2${u} ** ${(o + 1) * 8}${u}` : f = `>= -(2${u} ** ${(o + 1) * 8 - 1}${u}) and < 2 ** ${(o + 1) * 8 - 1}${u}`, new F2.ERR_OUT_OF_RANGE("value", f, i);
    }
    jr(e3, n, o);
  }
  function T2(i, r) {
    if (typeof i != "number") throw new F2.ERR_INVALID_ARG_TYPE(r, "number", i);
  }
  function C2(i, r, t) {
    throw Math.floor(i) !== i ? (T2(i, t), new F2.ERR_OUT_OF_RANGE("offset", "an integer", i)) : r < 0 ? new F2.ERR_BUFFER_OUT_OF_BOUNDS() : new F2.ERR_OUT_OF_RANGE("offset", `>= ${0} and <= ${r}`, i);
  }
  var Vr = /[^+/0-9A-Za-z-_]/g;
  function Xr(i) {
    if (i = i.split("=")[0], i = i.trim().replace(Vr, ""), i.length < 2) return "";
    for (; i.length % 4 !== 0; ) i = i + "=";
    return i;
  }
  function q(i, r) {
    r = r || 1 / 0;
    let t, e3 = i.length, n = null, o = [];
    for (let u = 0; u < e3; ++u) {
      if (t = i.charCodeAt(u), t > 55295 && t < 57344) {
        if (!n) {
          if (t > 56319) {
            (r -= 3) > -1 && o.push(239, 191, 189);
            continue;
          } else if (u + 1 === e3) {
            (r -= 3) > -1 && o.push(239, 191, 189);
            continue;
          }
          n = t;
          continue;
        }
        if (t < 56320) {
          (r -= 3) > -1 && o.push(239, 191, 189), n = t;
          continue;
        }
        t = (n - 55296 << 10 | t - 56320) + 65536;
      } else n && (r -= 3) > -1 && o.push(239, 191, 189);
      if (n = null, t < 128) {
        if ((r -= 1) < 0) break;
        o.push(t);
      } else if (t < 2048) {
        if ((r -= 2) < 0) break;
        o.push(t >> 6 | 192, t & 63 | 128);
      } else if (t < 65536) {
        if ((r -= 3) < 0) break;
        o.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
      } else if (t < 1114112) {
        if ((r -= 4) < 0) break;
        o.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return o;
  }
  function zr(i) {
    let r = [];
    for (let t = 0; t < i.length; ++t) r.push(i.charCodeAt(t) & 255);
    return r;
  }
  function Jr(i, r) {
    let t, e3, n, o = [];
    for (let u = 0; u < i.length && !((r -= 2) < 0); ++u) t = i.charCodeAt(u), e3 = t >> 8, n = t % 256, o.push(n), o.push(e3);
    return o;
  }
  function lr(i) {
    return D2.toByteArray(Xr(i));
  }
  function k2(i, r, t, e3) {
    let n;
    for (n = 0; n < e3 && !(n + t >= r.length || n >= i.length); ++n) r[n + t] = i[n];
    return n;
  }
  function d2(i, r) {
    return i instanceof r || i != null && i.constructor != null && i.constructor.name != null && i.constructor.name === r.name;
  }
  function W2(i) {
    return i !== i;
  }
  var Kr = (function() {
    let i = "0123456789abcdef", r = new Array(256);
    for (let t = 0; t < 16; ++t) {
      let e3 = t * 16;
      for (let n = 0; n < 16; ++n) r[e3 + n] = i[t] + i[n];
    }
    return r;
  })();
  function E2(i) {
    return typeof BigInt > "u" ? Zr : i;
  }
  function Zr() {
    throw new Error("BigInt not supported");
  }
});
J$1(ar());
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
function deriveAccountId(principal) {
  try {
    const principalObj = typeof principal === "string" ? Principal.fromText(principal) : principal;
    const accountId = D.fromPrincipal({
      principal: principalObj,
      subAccount: void 0
    }).toHex();
    return accountId;
  } catch (err) {
    console.error("[Utils] Error deriving account ID:", err);
    throw err;
  }
}
async function createAccountFromPrincipal(principal) {
  const principalText = typeof principal === "string" ? principal : principal.toText();
  return {
    owner: principalText,
    subaccount: deriveAccountId(principal)
  };
}
async function fetchRootKeyIfNeeded(agent, fetchRootKey) {
  if (fetchRootKey) {
    try {
      await agent.fetchRootKey();
    } catch (e3) {
      console.warn(`Adapter unable to fetch root key. Check replica status.`, e3);
    }
  }
}
function getDefaultTransportConfig() {
  return {
    windowOpenerFeatures: "width=525,height=705",
    establishTimeout: 45e3,
    disconnectTimeout: 45e3,
    statusPollingRate: 500,
    detectNonClickEstablishment: false
  };
}
function createActorCacheKey(walletName, canisterId, requiresSigning = false) {
  return `${walletName}-${canisterId}-${requiresSigning}`;
}
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["DEBUG"] = "debug";
  LogLevel2["INFO"] = "info";
  LogLevel2["WARN"] = "warn";
  LogLevel2["ERROR"] = "error";
  return LogLevel2;
})(LogLevel || {});
class PnpError extends Error {
  constructor(message, code, context) {
    super(message);
    this.code = code;
    this.context = context;
    this.name = "PnpError";
  }
}
class ErrorManager {
  constructor(logLevel = "info", maxLogs = 1e3) {
    this.logs = [];
    this.maxLogs = 1e3;
    this.logLevel = logLevel;
    this.maxLogs = maxLogs;
  }
  setLogLevel(level) {
    this.logLevel = level;
  }
  shouldLog(level) {
    const levels = Object.values(LogLevel);
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }
  addLog(entry) {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }
  debug(message, context) {
    if (this.shouldLog(
      "debug"
      /* DEBUG */
    )) {
      this.addLog({
        level: "debug",
        message,
        timestamp: /* @__PURE__ */ new Date(),
        context
      });
    }
  }
  info(message, context) {
    if (this.shouldLog(
      "info"
      /* INFO */
    )) {
      this.addLog({
        level: "info",
        message,
        timestamp: /* @__PURE__ */ new Date(),
        context
      });
    }
  }
  warn(message, context) {
    if (this.shouldLog(
      "warn"
      /* WARN */
    )) {
      this.addLog({
        level: "warn",
        message,
        timestamp: /* @__PURE__ */ new Date(),
        context
      });
    }
  }
  error(message, error, context) {
    if (this.shouldLog(
      "error"
      /* ERROR */
    )) {
      this.addLog({
        level: "error",
        message,
        timestamp: /* @__PURE__ */ new Date(),
        context,
        error
      });
    }
  }
  getLogs(level) {
    return level ? this.logs.filter((entry) => entry.level === level) : [...this.logs];
  }
  clearLogs() {
    this.logs = [];
  }
  handleError(error, context) {
    if (error instanceof PnpError) {
      this.error(error.message, error, { ...context, ...error.context });
    } else {
      this.error(error.message, error, context);
    }
  }
}
const _BaseAdapter = class _BaseAdapter {
  constructor(args) {
    this.state = Adapter.Status.INIT;
    this.actorCache = /* @__PURE__ */ new Map();
    this.disposed = false;
    this.validateConfig(args.config);
    this.config = args.config;
    this.adapter = args.adapter;
    this.logger = args.logger || new ErrorManager(LogLevel.INFO);
  }
  /**
   * Validate adapter configuration
   * Override this method to implement adapter-specific validation
   * @param config - The configuration to validate
   * @throws {Error} If configuration is invalid
   */
  validateConfig(config) {
    if (!config) {
      throw new Error("Configuration is required");
    }
  }
  // Common state management
  setState(newState) {
    this.state = newState;
  }
  openChannel() {
    return Promise.resolve();
  }
  getState() {
    return this.state;
  }
  // Standard implementation for getAccountId, can be overridden by subclasses if needed
  async getAccountId() {
    const principal = await this.getPrincipal();
    if (!principal)
      throw new Error("Principal not available to derive account ID");
    return deriveAccountId(principal);
  }
  async getAddresses() {
    const principal = await this.getPrincipal();
    const account = await createAccountFromPrincipal(principal);
    return {
      icp: {
        owner: account.owner,
        subaccount: account.subaccount
      }
    };
  }
  // Base implementation of createActor with caching
  createActor(canisterId, idl, options) {
    const { requiresSigning = false } = options || {};
    const cacheKey = createActorCacheKey(
      this.adapter.walletName,
      canisterId,
      requiresSigning
    );
    const cachedActor = this.actorCache.get(cacheKey);
    if (cachedActor) {
      return cachedActor;
    }
    const actor = this.createActorInternal(canisterId, idl, options);
    this.actorCache.set(cacheKey, actor);
    return actor;
  }
  /**
   * Standardized error handling method for consistent logging across all adapters
   */
  handleError(context, error) {
    const err = error instanceof Error ? error : new Error(String(error));
    this.logger.error(`[${this.adapter.walletName}] ${context}`, err);
  }
  // Base disconnect logic
  async disconnect() {
    if (this.state === Adapter.Status.DISCONNECTING || this.state === Adapter.Status.CONNECTING || this.state === Adapter.Status.DISCONNECTED) {
      return;
    }
    this.setState(Adapter.Status.DISCONNECTING);
    try {
      await this.disconnectInternal();
    } catch (error) {
      this.handleError("Error during disconnect", error);
    } finally {
      this.cleanupInternal();
      this.setState(Adapter.Status.DISCONNECTED);
    }
  }
  /**
   * Perform adapter-specific disconnect logic
   * Override this method to implement custom disconnect behavior
   * Default implementation clears the actor cache
   */
  async disconnectInternal() {
    this.actorCache.clear();
  }
  /**
   * Perform adapter-specific resource cleanup
   * Override this method to clean up resources after disconnect
   * Called after disconnectInternal() in the finally block
   */
  cleanupInternal() {
  }
  /**
   * Dispose of all resources and clean up the adapter
   * This method ensures proper cleanup and prevents memory leaks
   */
  async dispose() {
    if (this.disposed) return;
    try {
      await this.disconnect();
    } catch (error) {
      this.handleError("Error during dispose disconnect", error);
    }
    this.actorCache.clear();
    this.disposed = true;
    await this.onDispose();
  }
  /**
   * Hook for subclasses to perform additional disposal logic
   * Override this method to clean up adapter-specific resources
   */
  async onDispose() {
  }
  // ----- Shared helpers for agents and actors -----
  async buildHttpAgent(options) {
    const { identity } = options || {};
    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    if (this.config.fetchRootKey) {
      try {
        await agent.fetchRootKey();
      } catch (error) {
        this.handleError("Failed to fetch root key", error);
      }
    }
    return agent;
  }
  createActorWithAgent(agent, canisterId, idl) {
    try {
      return Actor.createActor(idl, { agent, canisterId });
    } catch (error) {
      this.handleError("Actor creation error", error);
      throw error;
    }
  }
  // Synchronous variant for contexts that require sync actor creation
  buildHttpAgentSync(options) {
    const { identity } = options || {};
    const agent = HttpAgent.createSync({
      host: this.config.hostUrl,
      identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    if (this.config.fetchRootKey) {
      agent.fetchRootKey().catch((error) => {
        this.handleError("Failed to fetch root key (sync)", error);
      });
    }
    return agent;
  }
};
_BaseAdapter.supportedChains = [Adapter.Chain.ICP];
let BaseAdapter = _BaseAdapter;
function createTypeGuard(...keys) {
  return (config) => {
    if (!config || typeof config !== "object") return false;
    return keys.some((key) => key in config);
  };
}
const isIIAdapterConfig = createTypeGuard(
  "localIdentityCanisterId",
  "iiProviderUrl",
  "iiProviderOrigin",
  "hostUrl"
);
class IIAdapter extends BaseAdapter {
  constructor(args) {
    const normalized = (() => {
      if ("config" in args) {
        return args;
      }
      return {
        adapter: {
          id: "ii",
          enabled: true,
          walletName: "Internet Identity",
          logo: void 0,
          website: "https://internetcomputer.org",
          chain: "ICP",
          adapter: IIAdapter,
          config: {}
        },
        config: args
      };
    })();
    if (!isIIAdapterConfig(normalized.config)) {
      throw new Error("Invalid config for IIAdapter");
    }
    super(normalized);
    this.authClient = null;
    this.agent = null;
    this.initializeAuthClientSync();
  }
  initializeAuthClientSync() {
    AuthClient.create({
      idleOptions: {
        idleTimeout: Number(this.config.timeout ?? 1e3 * 60 * 60 * 24),
        // Default 24 hours
        disableDefaultIdleCallback: true
      }
    }).then((client) => {
      this.authClient = client;
      this.authClient.idleManager?.registerCallback?.(() => this.refreshLogin());
      this.logger.debug("[II] AuthClient initialized successfully");
    }).catch((err) => {
      this.handleError("Failed to create AuthClient", err);
      this.setState(Adapter.Status.ERROR);
    });
  }
  async ensureAuthClient() {
    if (this.authClient) {
      return;
    }
    let attempts = 0;
    while (!this.authClient && attempts < 50) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }
    if (!this.authClient) {
      throw new Error("Failed to initialize AuthClient after 5 seconds");
    }
  }
  async openChannel() {
    return Promise.resolve();
  }
  // Use the resolved config for agent initialization
  async initAgent(identity) {
    const agent = await this.buildHttpAgent({ identity });
    this.agent = agent;
  }
  async connect() {
    try {
      this.setState(Adapter.Status.CONNECTING);
      await this.ensureAuthClient();
      return await this.performLogin();
    } catch (error) {
      this.setState(Adapter.Status.ERROR);
      throw error;
    }
  }
  async performLogin() {
    return new Promise((resolve, reject) => {
      let checkCompleted = false;
      const loginOptions = {
        derivationOrigin: this.config.derivationOrigin,
        identityProvider: this.config.iiProviderUrl || "https://id.ai",
        maxTimeToLive: BigInt((this.config.timeout ?? 1 * 24 * 60 * 60) * 1e3 * 1e3 * 1e3),
        // Default 1 day
        windowOpenerFeatures: `width=500,height=600,left=${window.screen.width / 2 - 250},top=${window.screen.height / 2 - 300}`,
        onSuccess: async () => {
          checkCompleted = true;
          this.logger.debug("[II] Login success callback triggered");
          try {
            const identity = this.authClient.getIdentity();
            const account = await this.createAccountFromIdentity(identity);
            this.setState(Adapter.Status.CONNECTED);
            resolve(account);
          } catch (error) {
            this.setState(Adapter.Status.ERROR);
            reject(error);
          }
        },
        onError: (error) => {
          checkCompleted = true;
          this.handleError("Login error", error || "Unknown error");
          this.setState(Adapter.Status.ERROR);
          reject(new Error(`II Authentication failed: ${error || "Unknown error"}`));
        }
      };
      this.logger.debug("[II] Starting login immediately for Safari compatibility");
      this.authClient.login(loginOptions);
      this.authClient.isAuthenticated().then(async (isAuthenticated) => {
        if (!checkCompleted && isAuthenticated) {
          const identity = this.authClient.getIdentity();
          if (identity && !identity.getPrincipal().isAnonymous()) {
            checkCompleted = true;
            try {
              const account = await this.createAccountFromIdentity(identity);
              this.setState(Adapter.Status.CONNECTED);
              resolve(account);
            } catch (error) {
              this.setState(Adapter.Status.ERROR);
              reject(error);
            }
          }
        }
      }).catch((err) => {
        this.logger.debug("[II] Background auth check failed:", err);
      });
    });
  }
  async createAccountFromIdentity(identity) {
    if (!identity) {
      throw new Error("No identity available after login");
    }
    const principal = identity.getPrincipal();
    this.logger.debug("[II] Principal from identity:", { principal: principal.toText() });
    if (principal.isAnonymous()) {
      throw new Error(
        "Authentication failed: Anonymous principal returned. This usually means the authentication was cancelled or failed."
      );
    }
    await this.initAgent(identity);
    const account = await createAccountFromPrincipal(principal);
    if (!account || !account.owner) {
      throw new Error("Failed to create valid account from principal");
    }
    return account;
  }
  async isConnected() {
    return this.authClient ? await this.authClient.isAuthenticated() : false;
  }
  // Implementation for BaseIcAdapter actor caching
  createActorInternal(canisterId, idl, _options) {
    if (!this.agent) {
      throw new Error("Agent not initialized. Connect first.");
    }
    return this.createActorWithAgent(this.agent, canisterId, idl);
  }
  async getPrincipal() {
    if (!this.authClient) throw new Error("Not connected");
    const identity = this.authClient.getIdentity();
    if (!identity) throw new Error("Identity not available");
    const principal = identity.getPrincipal();
    return principal.toText();
  }
  async refreshLogin() {
    try {
      await this.ensureAuthClient();
      await this.performLogin();
    } catch (error) {
      this.handleError("Failed to refresh login", error);
      await this.disconnect().catch(() => {
      });
    }
  }
  // Disconnect logic specific to II
  async disconnectInternal() {
    if (this.authClient) {
      await this.authClient.logout();
    }
  }
  // Cleanup logic specific to II
  cleanupInternal() {
    this.authClient = null;
    this.agent = null;
  }
  /**
   * Dispose of II-specific resources
   * Ensures AuthClient and agent are properly cleaned up
   */
  async onDispose() {
    if (this.authClient) {
      try {
        await this.authClient.logout();
      } catch (error) {
      }
      this.authClient = null;
    }
    this.agent = null;
  }
}
async function withTimeout(promise, timeoutMs, timeoutError) {
  let timeoutId;
  const timeoutPromise = new Promise((_2, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(timeoutError || `Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
const DEFAULT_TIMEOUTS = {
  connectTimeout: 3e4,
  // 30 seconds
  authTimeout: 6e4,
  // 60 seconds for auth flows
  actorCreationTimeout: 1e4,
  // 10 seconds
  networkTimeout: 6e4
  // 60 seconds
};
class BaseSignerAdapter extends BaseAdapter {
  constructor(args) {
    super(args);
    this.signer = null;
    this.agent = null;
    this.signerAgent = null;
    this.transport = null;
    this.connectionAbortController = null;
    this.windowFocusHandler = null;
    this.principalStorageKey = `${this.adapter.id}_principal`;
  }
  async openChannel() {
    if (this.signer) {
      await this.signer.openChannel();
    }
  }
  async isConnected() {
    return this.agent !== null && this.signer !== null && this.signerAgent !== null;
  }
  async getPrincipal() {
    if (!this.signerAgent) {
      if (this.transport && this.signer && this.adapter.config.hostUrl) {
        this.agent = HttpAgent.createSync({ host: this.adapter.config.hostUrl });
        this.signerAgent = SignerAgent.createSync({
          signer: this.signer,
          account: Principal.anonymous(),
          agent: this.agent
        });
      } else {
        throw new Error(`${this.adapter.walletName} signer agent not initialized or connected`);
      }
    }
    const principal = await this.signerAgent.getPrincipal();
    return principal.toText();
  }
  async connectWithStoredPrincipal() {
    const storedPrincipal = localStorage.getItem(this.principalStorageKey);
    if (storedPrincipal && storedPrincipal !== "null") {
      try {
        const principal = Principal.fromText(storedPrincipal);
        if (this.signerAgent) {
          this.signerAgent.replaceAccount(principal);
        }
        return principal;
      } catch (e3) {
        localStorage.removeItem(this.principalStorageKey);
        return null;
      }
    }
    return null;
  }
  async connectWithAccounts() {
    this.connectionAbortController = new AbortController();
    const focusPromise = new Promise((_2, reject) => {
      this.windowFocusHandler = () => {
        window.removeEventListener("focus", this.windowFocusHandler);
        this.windowFocusHandler = null;
        reject(new Error("Connection cancelled - popup window was closed"));
      };
      window.addEventListener("focus", this.windowFocusHandler);
    });
    try {
      const accounts = await withTimeout(
        Promise.race([
          this.signerAgent.signer.accounts(),
          focusPromise
        ]),
        DEFAULT_TIMEOUTS.authTimeout,
        `${this.adapter.walletName} connection timed out after ${DEFAULT_TIMEOUTS.authTimeout / 1e3}s`
      );
      if (!accounts || accounts.length === 0) {
        await this.disconnect();
        throw new Error(`No accounts returned from ${this.adapter.walletName}`);
      }
      const principal = accounts[0].owner;
      localStorage.setItem(this.principalStorageKey, principal.toText());
      if (this.signerAgent) {
        this.signerAgent.replaceAccount(principal);
      }
      return principal;
    } finally {
      if (this.windowFocusHandler) {
        window.removeEventListener("focus", this.windowFocusHandler);
        this.windowFocusHandler = null;
      }
      this.connectionAbortController = null;
    }
  }
  async connect() {
    this.setState(Adapter.Status.CONNECTING);
    try {
      await this.ensureTransportInitialized();
      if (!this.signerAgent || !this.signerAgent.signer) {
        throw new Error(`${this.adapter.walletName} signer agent not initialized. Please ensure extension is installed.`);
      }
      let principal = await this.connectWithStoredPrincipal();
      if (!principal) {
        principal = await this.connectWithAccounts();
      }
      if (principal.isAnonymous()) {
        this.setState(Adapter.Status.READY);
        throw new Error(
          `Failed to authenticate with ${this.adapter.walletName} - got anonymous principal`
        );
      }
      if (this.adapter.config.fetchRootKey) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKey");
        await this.signerAgent.fetchRootKey();
      }
      this.setState(Adapter.Status.CONNECTED);
      return createAccountFromPrincipal(principal);
    } catch (error) {
      this.handleError("Connection error", error);
      await this.disconnect();
      throw error;
    }
  }
  createActorInternal(canisterId, idlFactory, _options) {
    if (!this.signerAgent) {
      throw new Error(`No signer agent available. Please connect first.`);
    }
    try {
      return Actor.createActor(idlFactory, {
        agent: this.signerAgent,
        canisterId
      });
    } catch (error) {
      this.handleError("Actor creation error", error);
      throw error;
    }
  }
  async disconnectInternal() {
    if (this.windowFocusHandler) {
      window.removeEventListener("focus", this.windowFocusHandler);
      this.windowFocusHandler = null;
    }
    if (this.connectionAbortController) {
      this.connectionAbortController.abort();
      this.connectionAbortController = null;
    }
    if (this.signer) {
      try {
        this.signer.closeChannel();
      } catch (error) {
        this.handleError("Error closing signer channel", error);
      }
    }
    localStorage.removeItem(this.principalStorageKey);
  }
  cleanupInternal() {
    this.agent = null;
    this.signerAgent = null;
  }
  /**
   * Dispose of signer-specific resources
   * Cleans up signer, agents, and stored principal
   */
  async onDispose() {
    if (this.windowFocusHandler) {
      window.removeEventListener("focus", this.windowFocusHandler);
      this.windowFocusHandler = null;
    }
    if (this.connectionAbortController) {
      this.connectionAbortController.abort();
      this.connectionAbortController = null;
    }
    if (this.signer) {
      try {
        this.signer.closeChannel();
      } catch (error) {
      }
      this.signer = null;
    }
    this.agent = null;
    this.signerAgent = null;
    if (this.principalStorageKey) {
      localStorage.removeItem(this.principalStorageKey);
    }
  }
}
var SignerType = /* @__PURE__ */ ((SignerType2) => {
  SignerType2["OISY"] = "oisy";
  SignerType2["NFID"] = "nfid";
  SignerType2["STOIC"] = "stoic";
  SignerType2["PLUG"] = "plug";
  return SignerType2;
})(SignerType || {});
class UnifiedSignerAdapter extends BaseSignerAdapter {
  constructor(args) {
    super(args);
    this.transport = null;
    this.signerType = this.config.signerType || this.detectSignerType();
    this.principalStorageKey = `${this.signerType}_principal`;
  }
  detectSignerType() {
    const name = this.adapter.walletName?.toLowerCase();
    if (name?.includes("oisy")) return "oisy";
    if (name?.includes("nfid")) return "nfid";
    if (name?.includes("stoic")) return "stoic";
    if (this.config.signerUrl?.includes("oisy")) return "oisy";
    if (this.config.signerUrl?.includes("nfid")) return "nfid";
    return "stoic";
  }
  async ensureTransportInitialized() {
    if (!this.transport) {
      await this.initializeTransport();
    }
    if (!this.signer && this.transport) {
      this.signer = new Signer({
        transport: this.transport
      });
      this.agent = HttpAgent.createSync({
        host: this.config.hostUrl,
        verifyQuerySignatures: this.config.verifyQuerySignatures
      });
      this.signerAgent = SignerAgent.createSync({
        signer: this.signer,
        account: Principal.anonymous(),
        agent: this.agent
      });
    }
  }
  async initializeTransport() {
    if (this.signerType === "stoic") {
      const stoicTransport = await StoicTransport.create();
      await stoicTransport.connection.connect();
      this.transport = stoicTransport;
    } else if (this.signerType === "plug") {
      const PLUG_UUID = "71edc834-bab2-4d59-8860-c36a01fee7b8";
      this.transport = await BrowserExtensionTransport.findTransport({
        uuid: PLUG_UUID,
        window
      });
    } else {
      const url = this.config.signerUrl || (this.signerType === "oisy" ? "https://oisy.com/sign" : "https://nfid.one/rpc");
      const config = {
        url,
        windowOpenerFeatures: this.config.windowOpenerFeatures || "width=525,height=705",
        establishTimeout: this.config.establishTimeout || 1e4,
        // Reduced from 45s to 10s
        disconnectTimeout: this.config.disconnectTimeout || 1e4,
        // Reduced from 45s to 10s
        statusPollingRate: this.config.statusPollingRate || 500,
        detectNonClickEstablishment: this.config.detectNonClickEstablishment || false
      };
      this.transport = new PostMessageTransport(config);
    }
  }
  async connect() {
    this.setState(Adapter.Status.CONNECTING);
    try {
      await this.ensureTransportInitialized();
      if (!this.signerAgent || !this.signer) {
        throw new Error(`${this.adapter.walletName} signer agent not initialized. Please ensure extension is installed.`);
      }
      if (this.signerType === "stoic") {
        await this.connectStoic();
      } else {
        await this.connectPostMessage();
      }
      let principal = await this.connectWithStoredPrincipal();
      if (!principal) {
        principal = await this.connectWithAccounts();
      }
      this.setState(Adapter.Status.CONNECTED);
      return await createAccountFromPrincipal(principal);
    } catch (error) {
      this.setState(Adapter.Status.ERROR);
      throw error;
    }
  }
  async connectPostMessage() {
  }
  async connectStoic() {
  }
  cleanupInternal() {
    super.cleanupInternal();
    this.transport = null;
  }
  /**
   * Dispose of UnifiedSigner-specific resources
   * Cleans up transport and signer connections
   */
  async onDispose() {
    if (this.transport) {
      try {
        if ("disconnect" in this.transport && typeof this.transport.disconnect === "function") {
          await this.transport.disconnect();
        } else if ("close" in this.transport && typeof this.transport.close === "function") {
          await this.transport.close();
        }
      } catch (error) {
      }
      this.transport = null;
    }
    if (this.signer) {
      try {
        this.signer.closeChannel();
      } catch (error) {
      }
      this.signer = null;
    }
    this.agent = null;
    this.signerAgent = null;
    localStorage.removeItem(this.principalStorageKey);
  }
}
const oisyLogo = "data:image/webp;base64,UklGRgIcAABXRUJQVlA4WAoAAAAwAAAA/wAA/wAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBI1ggAAA3wxmz/+7T9/12MZoANuKZ2McjZhlBmFqqIoMQqBidoZCedljqQqPZuya1076IgZUnuyB4MUYaJXAJqBmSwKbhAUjMcm41Ndpz3YNgvv17PR29GxARAcENDQ+SyYKkkSCz2mz9njjecd+/eumm3j40OD9mslv5+kFW+dOmSRQuVPpi195w58/3E4iCJNFgmDwl9YL5+rbury0oLRXRUZGQQOKpULly0ZKl0rL29tWWABBEr4+Nk4L4kPDIySmFrbLjSwXQhTyasEcODpXFx8RH2+roLFjaLTUxcDB70X70mQdFz7lwTa61ISQ4Efy5ITIwar6m+yk4RarUEfBuYlLxy1GjsYCFRmkYJfg5Qq5eZDZUOxonVJoHPlakaUW15E8OkZyjB+2u1MebSCjYRZWXOhSCGZaTfKSl2MEfwRg2E0zcr089QOMQUj215CgKbukly9uQgMwRsU0OAUzZLjccn2GDnegj0uu3+ZUcYQPOsN4R7ww7nIYPARb8gg7A/m2r7pUXARLpVEHzZczGX9Q6hStsKJozXiU5UClLYS2FgxS2avoN9wpOpBUOGvqQoLxGYx3NCwJbaTMveG0LydDaYU54jLzojGN6vqcCi2WrTHqcwhOeCUVW5XgWdQpCeBnbNVVVW8F9OOFhWk9a5l+cefdsfbBueM/n9CJ89oQPzzntHom/jr+T1YGHd8rIavtqYADbWJtcV8pNOBVZOyDLp+ej1ELCzSmfJ558PxWBp+ev2L3nGe5cv2Fr0wf3dTj55JA/M7Zvn9ek9/njkY7B4ns/n9/jCOw9s/onPp06e2AVWz/PazQ8f+jIb8u5/yQevi8Huvh/Y8z1PFwKWF71u0XvaRhXYXq4zFXpWcgJYX5VVV+NJT6wH+yckl7V5zqM6UFC7XD/iMW+DhjrJ956S408EvDO51zPSw0HFeTmdFZ4QngY6hqdVdnLPOxeU1KgKnJx7DbTM9drDtadVxECu6Qy3Hs8GNVXqohucygE9s+V7uZQZQhDkWEq4E6YFReWZ5X2ceQk01SoOciUtjCh4qa+SG6KtoGqo5oSDEzrQdYtIz4XoVYSB7nILB14AZeNjfnGfRkYaPGczuO1Z0FaWeshdO72Jg2edR9wTsB7k3VE24ZZtoO8G/+PueExNIGw3DrphCyi8TnrSdcFPkQibzw65bCNonCIpdJVIQyRsMjhclAUqp/oVuyiTTMgscU36XDpl3alwSQbo7Jte6opYJaGQYW5ygRaUDospn50oiVTQ1jpmlQZarxVVzkpDLGgMs4lQUivV3DELNaitXGYkHtSzWCEh2OjVGaWA3gErq2eUTDAk18wkNpBiSeNNM0gExQOjzhEPiTMIWUy0Hss0T4LmCxQXpkkgGhLqpllDtTX1U0WIqbba3jHFSlDdP+LKFPFkQ3zDFHF0i2v8P4WMcLYBANGgu1TRAiCKcIhqBRBJucj2fwPkQZQLH7NiKSgvkXYRD0u7sIR2S7qxiHaLrmEh7RZeh5J2SnOoD/EehIL4oSHUC5FTTy6jniyYesFS6kkl1JMEUS9ITD0x/fyo5zefevPnUG8O/byp5w3yO72J57w7h3h36XdrPvFu3fQj3k27mHh2+o0FEW9sVEK80WEp8YaHgok3ZJMRz2aVE89qCSGepT+UeP39D5SkMwNm8l1fSLrrwLVFpLsGdC8hXTfQtZR0XUCXVEK40WHAOhZOuE4AaI8kXPu/A61RhGv9vxaFlGzDA/83YIsjWyOmbCRfQzzZGqa6EuFPtMmOqTrsq4l2CdPWryFa/XR1CUSrm+6CYgHJ/hmYztKTSLJzmOE5+kUFEmy8dSZN40kEq8WMa5IJVjOz6pUB5Jq4MrOro2pyGTFLI/2WKYll/ns2HeZUYlVh1gYNsQyzqxStJdWfjtk5arWkKocLy2PCCNXX7IomcwahSuHS0nRfMt2vcE3FnSwyFcPFJZlkKnFVsV8qkapuusph2ESk03B5oSSFRNWjrhs6u5lEp+DGk9J1BPpj2B2Dxu0EOga3HvffQJ7fJ90zUbaDPEfh5iPOZ4lzCG4/lCojja3KfQbbc6T5DRz8JSaeMA3NXGi5rCOMHpzUi7aQ5aSDG44TmlCi9BvA0cq+l4hyEJw9qNCSpHyAO33lmXKCWEvA4RJLDkH2gtN75dnkKLJy60aRWkUMkxEcP2PKJUYBOL/HK5cUBQ+55yxQaQhhMMEDOyvTwsnQWQmPrOjMmUeE23vhoXsn3yHCd/DY7yU6EuhHPWdEv1xLgPK/4MFtZckJzFdXA4+uqctSMZ6pGB5eaNLJmc6qh8frLa+LGM6RDx7Mt3/ow2z3vwIvfnlvF7N9Cp7c7ZXHaJ8+5Avnpz6fMNlnD8Cb9z73yWOwTx+AR+996pXny1j3P30IXnXuvv+BiKkcX4F3v7S/Lmcoaz54ON+iUzGTSQ9e1puyEhiprhg8XViXrGWi8hrwdk3Zch0D6f8Cj7fpJe/MY5zb342C10e+n8wJZ5rOveD9vZ1pGoYxVEIAKypVucxSYIIgdhZ45aqYxFTwEALp3GNSZzNIkRECeqZIniNnDOteKwT1xl5LppYpyksguCXlipdCmaH/4AAEuO9gn2YLI5w0QKArT4h08QzQoHdAsB36yzHPyQTO9lszBL3lF1vqs4J2qAqCbzjk3LFBsH4/CiY8Uua/fZ0g/XFsEow4cdwo3ZwiONWnhsGQgyfPSjalCkrV6VEw5lChwS8zy1cg7heX3ASDOopL7qRnhAlAX2kFmLWi1ByjXctzf5Y3g2mbymtFmlQlb5mrDA4wr6PSYF6mVgfw0ITR+DcYucNoHF2ZnBTIK+O1NVfA1Fera8ajEhMX8MQ/5861gsGbzp3rUSSsWe3vYZOX6usGwOyWC3X19oj4uDiphww3NjZ0gPk7rjQ02hRRkZHhEk6Ndra3tw6AjAMtre3tY9KlSxYtVCrdZjZfv9bdNQyCWru6uq9dNz8IDZHLgqWSILHYb/6cOd5w3r1766bdPjY6PGSzWvohuFZQOCA2EQAA0EoAnQEqAAEAAT5tMpNHJCMhoSzyqYCADYlkbvx8eyL+d5IZoF4A/QB+gH6AeIB9ACa3gD+e/lp+//ltU/5x/a/2C/t37W9NhuL3p/Jr4x+IcfX1E9p/2P94/uf7JfN/+wfxr2Afwn+6/7P+o/AB+mn+v/vH+G/aT4jPUH5gP6d/gv/P/gvew/t3/A/s3uN/sP+Z/T74AP6l/mf/V6yPsG+gB/QP8J/4fXE/cv4Kv20/dH3PP89///+P7gH//9QD9/+x36Z/2P8e+//+35DiBL9vMYLId4z5Kt3bABui8cveN0APzZ6sH994x/rH2BvLA9gvo0nUExCHYEUceSTa+nFYudkCYp6yxyDf13nj9qmt7DAwBpMaRrC1IlQzq7zx+l49h1d3deFgw1qTXNjz6GvY3CLwovEjaHW6ENga9gW0fh7+0dV86Xc8GkG6N/1gRW7QArUF5WorCsiORsBlfdTi+XYQ+xjmqKFdrd2BlFJ6UFr0/Sqd72n3rqzYzE9X1nCqWry1bsn+b9hko5WFGZDuMXEuPtqcMcPlTJuyc93muyYEirxlRS5kBuPcwMxy9dmU+1BbJhp08PGw/iytDAvrfIJfvQDgReQWP0OtUa1uVMF6Sfb9ufCjcKBtR1LXv9pT75uGxpcG3zPd+Pbv0OgKIE1af7xZI/ic142uGbfVMSU3T/ZAOoW8rrOXrHnWGBphT8dE4kCGxgSA19BaOyzomvLLpX66QLLtGAeegtskYVqIj2VoDrxHq821AbJaBY7T578CVNRbsMOVg/71UNGiDUtFqAOJjFHD9eOhKAD+P6qAw8PC4j58hgWGNhIFKkB7Fc+Td3Ia8d35zmjFn4ajhI8aiCF8nM96Ti3qz1Xg3LVowPyJYsmvjQ0iOFdwKOWLh3shkJTl4Liqk56hFUnPLpJpDSVoHP/x9s9qWiRQIptj5Xro0pJV+Lzp7Ko3iZrLuHvC2vVoORQk6uR2JgugeTPrq3ouewQQLjmOipukAZMhUIwq3vkfPkMCwxsI8AW8i2MIJeXjguh6ckC9gP0UuCrgYqsF/YmwjS/oMk5a7Z0ry3hNPGYjZnIEjRSNp2E18dUAAAAO/SB1/DrQl4O7JgnVEqzf2qBYlhIXiu9iRNLgZswLEfMFQrzha5IT7m2m03ebtyVae4Xqh+Zm/SkDxplVSAel+rnOZKI13/Vg9aWpXTubEUwe/iroTZStPxE9sAATbfjYCfOIdRnUE5n11eWQ9knu4okbIZ4UoLEw9QPTRsKQQu8y3u+1nFakhq54LvRpEBuVyP4O7ROlAQA2k8fEDQF+hvNTQYfFBdw/cmkW9r/zV+Tz1x4Xxfm9HqG3JYmRwVIe7l1y6hg/DQEfJF1O1t+Xdtjqo7EbM5AkeI94Fhz9fxrt25i7dQa4Wnxttn5y1ETT+Tj5P8YP1r+ELVWjLxbdHz1IlWNfBLqA8zoewZLroirXRFtufI+qDTEw7bkBJUXBxQSWEHOu8Dpj6DXJ31Jes9841cKxZ+svAlEjGq0cN2Q45SvVWxXmnzY/+XmWViEN+zaXG9SoZzNYGX3JpXf50JRzzMSKtaQI8QsMft27D/aKQuyA+gWUi58U25ns1KyYnEegTLodyZ8mUz6gkJV0+7qAk5GcejdZVIEIDPfQpbaYOSE5N4cPWDcVOLXnJA8LIdkn+AIOIwNJixShDxbXB0s4YUZIuuIZfMhXa99CymHgsG8FBHV4+4BmzNFiUek/5UhltHISj8LGhIs4OCryqGIGmxqGDg9ObSJEjWI18F9MNBWws2qGtLImibyhbiWQ0l8cMImLe2tqquTqxTIwqxOJwemnff6VvjQ5L0eO7lCnTLGYCiC4G7AfW+xK99+oDU9/ragrWLxLFrBxFUVsUvf+5qxBf2zwv2hTutCen+Jvlix3EI6O6HpqtSFwClVlicza3f9UfDWLvlvOJ69AvnxGIjj9eP+CyKyfQ8Q2K3UxjVSXu6pC1/c/YUo7FREhdFJp8Sjhy8IbQeCAJuwFGqZd1CMadHRk1TeRHSrJTth+mA9saqRef7f0Gbe3EnCOiUXfuVQ34gRDLKHtv/lVuCvZk3ehe4zF86mq9b5cBDDuvFhtd4hmGub+98/kmykpSw2GV8S1ApLnJvLASo+ZEdHpPXejDzBuqN0T8R9/lseTipwFgdAXyhJ3bccCoivLmFCbPyn32v5AjLKIoehA2pNg0Fve/3bduEiE1sSlozbz6zc6+cmdH4v+F5T2rYXOGoYEUHiYsT/VucSS3WrE/Nc0US6Qa6Atn4M0LPAJgW/bBY7d55XVKHL1eBvpMVHoKEMT6Qg/X2nTApE9UXV5V2a6+xmBT89lDWQrjox4bhhFr6eT5fMN5k/4+28oBNEpyaajDYTmoSezbpjuf5FmM72QqH54nPybYAgJPr7o8Nik/co0v6NWF7HmZ9EnZB67uVPUg5tvju9nw1EhEmdnaFEB9DJ7XkSLFfJ4RifkXhfWKKZAC5nPKnPPJLTuYISCVPShXG/6I0mVP4Q0Z+tXXUV0caUlSNaib3uAH+gjutMAMKf17uyDSGyyYnyj2Mlr5aklr/fXGtmm99NqpCGBNGB7d73IVacg5qBFogHGX+Ri3FH32Ena+iHbJ++xJ0owRtKdeyQpi2YoiHs9JJmRbGxKMK7L4hK0D0s4wU27wGV5ub6IhX+qb0a/1k51pFb1BJwemJeequZjdOmAx5SYANWwYmEZ3d2anG8F1k7Wn5jzDrqvC/ueFWrhue8t2J2SENLHV+IT3hSK7aJTZiDCpFTZwZ6pHVnr9UKg5y9ZiAtQfNRy9a/LPH63/0GaYvROnErfcTKT/klg2lv+UXz3erlzYwVbxSErtURg4EsGVELmtxDig4nJY1+LvG6oq6Xg2c0usyS8sys0BSiHo8HyARsbcsG64oP/DFGLqWPQXQocmWVatBaW/zywISPAcObpzQ64cmTVY5MXuDMNs44T1d5+bUAABPaGSHtwKcN79v26/tMzUfU1bJhRChGW+pBqBCPzGaKq6DpdLLOehfbeceH92qf5IxP9japUFIjpJ1Em7vQfXnSca43hv8bvSvYDUoCzdwvgtR6zmLXnsNWjB3iynrxsJYSSmN/LhBKNtkXVMdJMzp20Hs+ZAVpcooduMTodnsBQ/iIOf+DHobynOmKa+KEbtV6RmN6DUJOvkz/7B9AaQWcNnZubQoGl3C2DMjvMZfXkv8kh67SUHww4WKgoRWDfZ2jwDV2BXNa3hUmdUtXbIii9VosQUAEfmWcLTVUtuSPjgRwIdFFC1u38S6y3MaYg7+y3+jRcZ1AKjveSK99Rmxk6wZxxPev1MnNSOnS7iN6uA8osd+jDJiZCGPB0vk9BU72dIvkZyBBTnrVspA9HhrKKcnzq+HJx+DT42JNOIIrd/dTqDoNb54fwwSwG1RcFWcwJUk96+Ziv24NAwIjB/lU2mtRCseBj+kWamtAGgtFVmnWnBU07TnA3g2eiXNQ+yHuJcLzpcA2jPrqZzSut9u2jBGN+Ph3v2O+LbDRHcaglzFcG5QJP8fGdXBGGi6viw1IdjIfhNUHXH+B4QRCd5nBatb9CWCPMgCe/uIK28JivUn2kIVLkzjAwMsYcmjvYjQwGFgu6XaR2z5xjTGCSQZAtdPthMkDkdcj745U4FuhZUymyhkhZhVE44po0IDO9/KAbCn1yZIoO2tgIpRbarIuij9WiHdizPQ9DptZ17kHPny37fxOvsW5C11lAD69xL4IwSiUrYSldTk/iQOQfAW3/P6F/8p0nlWUkLYdqbhaLPQj6S3dWG2cbO7FNY6ipkJIt1Emx/SQfRmE2gdOzhHyn/RVSMdJ7jTKhPfzgpCOIIZPpL8jXq5iGGJ6DlLRPZJHqH9+ZA9PMlTGU1jHHQR7zH6hPYG80T9NdNz5PnLftY7tWdaVBtRYX9Uw3jTlc1d2oXYdTT6fJJ9MjWSszpxpt+eD7Hm8QNo6HD5CtB3q8rvROtQ1Lnq2H3h6tbXiWyijc0QytOWpk13nX1GJ/LmTvcFhlp58ZrxVo9d0Aa9bsbc2q6b+nSvo34PvzUW2Q6q+n5V3l6WMzoOGk8lyiXcPjQKHt+HgNXhOJJx0cgeWQatbhCvwvoYWGqHh/LJ84hJiQF4Mr6/B/12ObHcxIwQTUaiKuwzuGbHcC0E7CaAnk6tokOvdP70iWz+b4lXs9RqBfwAJTjWBQZm6HTp2f7BLkuQg/Zb++A/kOee2asWAyV3ZQ2X9QJGgxzY4xmQzUe/D+lvocKXpHbtvZH2AQgC7mO9gID/lT+kdd54o/2CjnvOYqQHTjR0v82WloWab92BI0p7ELK6ujb5XBfVKuML87lHmrOO+moXae93Bkd3+g4QXKvvX+lC55IvpwsdCEuyo6y/T6uTVCCNM8K/+hWGOPPAcn4EGoi4xCqG5ZKGFOmUMMmF+memZlh6z/FE0wzhuge/Hw3Kaa/HLCfjgjNV0L86oc1zKY65XGp5Mebolkz9RFHtFIHvU+GdfXKPc3w+jkM0Kfmw1Puwe6AJQUArmAP91vRm4wgAL6xaVBaLeq399g+M2tM2zxjBWuAoVTKqARhbf5kd10S/F+RtBPx6Wcbpb9cN9+lK+lx7LHWOn1Dkq+7FN6hvjgdA3OIeWBFOIcvIvfePQWFCKanV+NxWRWaqvH2/TVsWyxXR1+AjK2nMecvcv5Zk6Nd2MlSaxL8024TujQhqA4ph1haRvYSeHdzYez78D+p6BX1iUUIlPICteuB6A3iUGaiiyz6quSUzu/FdM3hpvJL1pJPiXt8/pukhzES/OK1wpVE7u5iGTSMFIH3AHY1SoEX0xxMI7J5NqQase2nQzlq44suP6ba65LMfMvMr+15m1NIRHqxL3JFQBN2o5T4cM2MiRdYoXR5uTBWMIAlf3MRUKfgKk/8WY86ODdPIdy6tm1GbWay2vR9gD1ySENb/VQhQ9LEtWk27br+8q4ANRuOiDa9ox4Kzdq+FPGTdNk+3ZnaESfKMyflpc5Bb/XjLvoGB6HA8SupxL+COsnv15SxiUY/gH0lqDpFD8KzL9NC3l1yDlvCKp9iNC2GSnQZhjv5LPXSD8VhvsXjzI/sVyHU8AATYqhvyh8zUxHsLDU2w35opXjRkgmUCd4ku13kLSYzFZmrrUjmvXZ2hBrs4I1V6zVPWZ1JmBVEYK0uChnNH0R/M7iTjUPGAhQ2emy1lgoZaL/X674NyEGomlo0eLFEyKsa7C5gEyIxY7Tm7F12eWq5qSUOUvXIdt53nnRyhOWS4JCxu18UABIrcfWhVFvF9kYD8+i05Fa3t4ALQt7fRF+O7+D+z7GK3Pzu+djztuphp1MKH7O1j6IaaFbNIL7mrIYIrck8uJV6BtmNBQKdjcAqGFNIDuf9W3MkG6Q/oaxWJiPxKE6MqRwWXV6QLNqBeQlrGV6wr+FdezbZHskp+Ip2si5BAU+IczmehEJWGEbaClVUMwB1ZmIMLzAxElFeqJWq5eMOVDMeaaNwAHONoVktn/TFjChfPdVUrgAQpUPV3UxzvQMJZZkRpKl3QU9D9/zbe5ZsOV5JtwhwWltfJK/m8fJfF14c2IAcl/KX0FAAD/kYD8+i09rLiYm9BAH2CbgOAJer2YP7PsbQ4BjVzY7YQXMc+/zFOAzJSWh4VAxey9e6MXMj72EKMrwEneh8vpgAGJ4aTEtuN24MNJzAcIVhkLmhc223Fzvv52DrlF7EvUnBdXzZN2H8BTm/WcNW/By48In61LtDUse4yjnrIi4NRp2dIrvtr4bW/F/UrBZoZBRl7UjsnvFHg485CFnZpTw2f1166twivNO+Es1koGTk1pevRs0mF8dnJ/k5P3SF/L77UQq839RswAAAAA=";
const nfidLogo = "data:image/webp;base64,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";
const dfinityLogo = "data:image/webp;base64,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";
const plugLogo = "data:image/webp;base64,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";
const stoicLogo = "data:image/jpeg;base64,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";
const Adapters = {
  // Internet Computer Adapters
  oisy: {
    id: "oisy",
    enabled: true,
    walletName: "OISY Wallet",
    logo: oisyLogo,
    website: "https://oisy.com",
    chain: "ICP",
    adapter: UnifiedSignerAdapter,
    config: {
      signerType: SignerType.OISY,
      signerUrl: "https://oisy.com/sign",
      ...getDefaultTransportConfig()
    }
  },
  nfid: {
    id: "nfid",
    enabled: true,
    walletName: "NFID",
    logo: nfidLogo,
    website: "https://nfid.one",
    chain: "ICP",
    adapter: UnifiedSignerAdapter,
    config: {
      signerType: SignerType.NFID,
      signerUrl: "https://nfid.one/rpc",
      fetchRootKey: false,
      verifyQuerySignatures: true,
      ...getDefaultTransportConfig()
    }
  },
  stoic: {
    id: "stoic",
    enabled: true,
    walletName: "Stoic",
    logo: stoicLogo,
    website: "https://www.stoicwallet.com",
    chain: "ICP",
    adapter: UnifiedSignerAdapter,
    config: {
      signerType: SignerType.STOIC,
      maxTimeToLive: BigInt(8 * 60 * 60 * 1e3 * 1e3 * 1e3),
      // 8 hours
      keyType: "ECDSA"
    }
  },
  ii: {
    id: "ii",
    enabled: true,
    walletName: "Internet Identity",
    logo: dfinityLogo,
    website: "https://internetcomputer.org",
    chain: "ICP",
    adapter: IIAdapter,
    config: {
      fetchRootKey: true,
      verifyQuerySignatures: false,
      timeout: 24 * 60 * 60 * 1e3,
      localIdentityCanisterId: "rdmx6-jaaaa-aaaaa-aaadq-cai"
    }
  },
  plug: {
    id: "plug",
    enabled: true,
    walletName: "Plug",
    logo: plugLogo,
    website: "https://plugwallet.ooo",
    chain: "ICP",
    adapter: UnifiedSignerAdapter,
    config: {
      signerType: SignerType.PLUG,
      ...getDefaultTransportConfig()
    }
  }
};
function createAdapterExtension(adapters) {
  const enhancedAdapters = Object.fromEntries(
    Object.entries(adapters).map(([id, config]) => [
      id,
      { ...config, id }
    ])
  );
  enhancedAdapters.__brand = "AdapterExtension";
  enhancedAdapters.__adapters = adapters;
  return enhancedAdapters;
}
function isAdapterExtension(obj) {
  return typeof obj === "object" && obj !== null && "__brand" in obj && obj.__brand === "AdapterExtension";
}
function extractAdapters(extension) {
  return extension.__adapters;
}
function mergeAdapterExtensions(...extensions) {
  const result = {};
  for (const extension of extensions) {
    if (isAdapterExtension(extension)) {
      Object.assign(result, extractAdapters(extension));
    }
  }
  return result;
}
const DEFAULTS = {
  network: "ic",
  ports: { replica: 8080, frontend: 3e3 },
  delegation: {
    timeout: BigInt(24 * 60 * 60 * 1e3 * 1e3 * 1e3),
    targets: []
  },
  storage: { key: "pnpState" }
};
function createPNPConfig(input = {}) {
  const network = input.network || DEFAULTS.network;
  const isLocal = network === "local";
  const ports = { ...DEFAULTS.ports, ...input.ports };
  const delegation = { ...DEFAULTS.delegation, ...input.delegation };
  const storage = { ...DEFAULTS.storage, ...input.storage };
  const providers = input.providers || {};
  const hostUrl = isLocal ? `http://127.0.0.1:${ports.replica}` : "https://icp0.io";
  const derivationOrigin = providers.frontend && !isLocal ? `https://${providers.frontend}.icp0.io` : `http://localhost:${ports.frontend}`;
  const extensionAdapters = input.extensions ? mergeAdapterExtensions(...input.extensions) : {};
  const adapters = {};
  const adapterIds = /* @__PURE__ */ new Set([
    ...Object.keys(Adapters),
    ...Object.keys(extensionAdapters),
    ...Object.keys(input.adapters || {})
  ]);
  for (const id of adapterIds) {
    const base = Adapters[id] || extensionAdapters[id];
    const override = input.adapters?.[id];
    if (!base && override?.adapter) {
      adapters[id] = override;
      continue;
    }
    if (!base) continue;
    adapters[id] = {
      ...base,
      enabled: override?.enabled ?? base.enabled,
      config: {
        ...base.config,
        // Global settings
        hostUrl,
        derivationOrigin,
        fetchRootKey: input.security?.fetchRootKey ?? isLocal,
        verifyQuerySignatures: input.security?.verifyQuerySignatures ?? !isLocal,
        delegationTimeout: delegation.timeout,
        delegationTargets: delegation.targets,
        localStorageKey: storage.key,
        // Provider IDs
        siwsProviderCanisterId: providers.siws,
        siweProviderCanisterId: providers.siwe,
        frontendCanisterId: providers.frontend,
        // Adapter-specific overrides (flat merge)
        ...Object.fromEntries(
          Object.entries(override || {}).filter(([k2]) => k2 !== "enabled")
        )
      }
    };
  }
  return {
    dfxNetwork: network,
    replicaPort: ports.replica,
    hostUrl,
    delegationTimeout: delegation.timeout,
    delegationTargets: delegation.targets,
    derivationOrigin,
    fetchRootKey: input.security?.fetchRootKey ?? isLocal,
    verifyQuerySignatures: input.security?.verifyQuerySignatures ?? !isLocal,
    localStorageKey: storage.key,
    siwsProviderCanisterId: providers.siws,
    siweProviderCanisterId: providers.siwe,
    adapters
  };
}
class ConfigBuilder {
  constructor() {
    this.config = {};
  }
  static create() {
    return new ConfigBuilder();
  }
  withEnvironment(network, ports) {
    this.config.network = network;
    if (ports) this.config.ports = ports;
    return this;
  }
  // Named-args friendly API with backward compatibility for positional args
  withDelegation(optionsOrTimeout, maybeTargets) {
    if (typeof optionsOrTimeout === "object" && optionsOrTimeout !== null) {
      const { timeout: timeout2, targets: targets2 } = optionsOrTimeout;
      this.config.delegation = { timeout: timeout2, targets: targets2 };
      return this;
    }
    const timeout = optionsOrTimeout;
    const targets = maybeTargets;
    this.config.delegation = { timeout, targets };
    return this;
  }
  withSecurity(fetchRootKey, verifyQuerySignatures) {
    this.config.security = { fetchRootKey, verifyQuerySignatures };
    return this;
  }
  withProviders(providers) {
    this.config.providers = providers;
    return this;
  }
  withExtensions(...extensions) {
    this.config.extensions = extensions;
    return this;
  }
  withAdapter(id, override) {
    if (!this.config.adapters) this.config.adapters = {};
    this.config.adapters[id] = override;
    return this;
  }
  /**
   * Quick builder to enable Internet Computer adapters with optional overrides.
   *
   * Usage examples:
   * - withIcAdapters() // enables ii, plug, oisy, nfid, stoic
   * - withIcAdapters({ plug: { enabled: true, whitelist: ['canister1'] } })
   * - withIcAdapters({ ii: false }) // disables ii while enabling the rest
   */
  withIcAdapters(overrides) {
    const icIds = ["ii", "plug", "oisy", "nfid", "stoic"];
    const excluded = new Set(overrides && "exclude" in overrides ? overrides.exclude || [] : []);
    if (!this.config.adapters) this.config.adapters = {};
    if (!overrides) {
      for (const id of icIds) {
        if (Adapters[id] && !excluded.has(id)) {
          this.config.adapters[id] = { enabled: true };
        }
      }
      return this;
    }
    for (const id of icIds) {
      if (!Adapters[id]) continue;
      if (excluded.has(id)) {
        this.config.adapters[id] = { ...this.config.adapters[id] || {}, enabled: false };
        continue;
      }
      const override = overrides[id];
      if (override === void 0) {
        if (!this.config.adapters[id]) this.config.adapters[id] = { enabled: true };
        continue;
      }
      if (typeof override === "boolean") {
        this.config.adapters[id] = { ...this.config.adapters[id] || {}, enabled: override };
      } else {
        this.config.adapters[id] = {
          ...this.config.adapters[id] || {},
          ...override,
          enabled: override.enabled ?? true
        };
      }
    }
    return this;
  }
  build() {
    return createPNPConfig(this.config);
  }
}
var AdapterStatus = /* @__PURE__ */ ((AdapterStatus2) => {
  AdapterStatus2["INIT"] = "INIT";
  AdapterStatus2["READY"] = "READY";
  AdapterStatus2["CONNECTING"] = "CONNECTING";
  AdapterStatus2["CONNECTED"] = "CONNECTED";
  AdapterStatus2["DISCONNECTING"] = "DISCONNECTING";
  AdapterStatus2["DISCONNECTED"] = "DISCONNECTED";
  AdapterStatus2["ERROR"] = "ERROR";
  return AdapterStatus2;
})(AdapterStatus || {});
class ConnectionManager {
  constructor(config, logger) {
    this.adapter = null;
    this.provider = null;
    this.account = null;
    this.status = AdapterStatus.INIT;
    this.config = config;
    this.status = AdapterStatus.READY;
    this.logger = logger || new ErrorManager();
  }
  setOnConnected(callback) {
    this.onConnectedCallback = callback;
  }
  setOnDisconnected(callback) {
    this.onDisconnectedCallback = callback;
  }
  _resetState() {
    this.account = null;
    this.provider = null;
    this.adapter = null;
    this.status = AdapterStatus.READY;
  }
  async openChannel() {
    if (this.provider) {
      await this.provider.openChannel();
    }
  }
  async connect(walletId) {
    if (this.status === AdapterStatus.CONNECTING) {
      throw new Error("Connection already in progress");
    }
    this.status = AdapterStatus.CONNECTING;
    let instance = null;
    try {
      const targetWalletId = walletId;
      if (!targetWalletId) {
        throw new Error("No wallet ID provided");
      }
      if (!this.config.adapters[targetWalletId]) {
        throw new Error(`Invalid adapter id: ${targetWalletId}`);
      }
      const adapterInfo = this.config.adapters[targetWalletId];
      instance = new adapterInfo.adapter({
        adapter: adapterInfo,
        config: {
          ...this.config,
          ...adapterInfo.config
        },
        logger: this.logger
      });
      if (!instance || typeof instance.connect !== "function") {
        throw new Error("Invalid adapter instance");
      }
      const account = await instance.connect();
      if (!account || !account.owner) {
        throw new Error("Invalid connection result: Missing account or owner");
      }
      this.account = account;
      this.adapter = {
        id: adapterInfo.id || targetWalletId,
        enabled: adapterInfo.enabled ?? true,
        logo: adapterInfo.logo || "",
        walletName: adapterInfo.walletName || targetWalletId,
        chain: adapterInfo.chain || "ICP",
        adapter: adapterInfo.adapter,
        config: adapterInfo.config || {}
      };
      this.provider = instance;
      this.status = AdapterStatus.CONNECTED;
      if (this.onConnectedCallback) {
        await this.onConnectedCallback();
      }
      return account;
    } catch (error) {
      this.status = AdapterStatus.ERROR;
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const enhancedError = new Error(`Connection failed: ${errorMessage}`);
      if (error instanceof Error && error.name) {
        enhancedError.name = error.name;
      }
      if (instance) {
        try {
          await instance.disconnect();
        } catch (disconnectError) {
          this.logger.error("Error during disconnect after failed connect", disconnectError);
        }
      }
      this._resetState();
      throw enhancedError;
    }
  }
  async disconnect() {
    this.status = AdapterStatus.DISCONNECTING;
    try {
      if (this.provider) await this.provider.disconnect();
      this._resetState();
      this.status = AdapterStatus.DISCONNECTED;
      if (this.onDisconnectedCallback) {
        await this.onDisconnectedCallback();
      }
    } catch (error) {
      this._resetState();
      this.status = AdapterStatus.ERROR;
      throw error;
    }
  }
  isAuthenticated() {
    return this.adapter !== null && this.provider !== null && this.account !== null && this.status === AdapterStatus.CONNECTED;
  }
}
class LRUCache {
  constructor(maxSize = 50) {
    this.accessCounter = 0;
    if (maxSize <= 0) {
      throw new Error("LRU cache size must be positive");
    }
    this.maxSize = maxSize;
    this.cache = /* @__PURE__ */ new Map();
    this.accessOrder = /* @__PURE__ */ new Map();
  }
  /**
   * Get a value from the cache
   * Updates access order for LRU tracking
   */
  get(key) {
    const value = this.cache.get(key);
    if (value !== void 0) {
      this.accessOrder.set(key, ++this.accessCounter);
    }
    return value;
  }
  /**
   * Set a value in the cache
   * Evicts least recently used item if size limit is reached
   */
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.accessOrder.set(key, ++this.accessCounter);
      return;
    }
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }
    this.cache.set(key, value);
    this.accessOrder.set(key, ++this.accessCounter);
  }
  /**
   * Check if cache has a key
   */
  has(key) {
    return this.cache.has(key);
  }
  /**
   * Delete a specific key from cache
   */
  delete(key) {
    this.accessOrder.delete(key);
    return this.cache.delete(key);
  }
  /**
   * Clear all items from cache
   */
  clear() {
    this.cache.clear();
    this.accessOrder.clear();
    this.accessCounter = 0;
  }
  /**
   * Get current cache size
   */
  get size() {
    return this.cache.size;
  }
  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize
    };
  }
  /**
   * Evict the least recently used item
   */
  evictLRU() {
    let lruKey;
    let lruAccess = Infinity;
    for (const [key, accessTime] of this.accessOrder.entries()) {
      if (accessTime < lruAccess) {
        lruAccess = accessTime;
        lruKey = key;
      }
    }
    if (lruKey !== void 0) {
      this.cache.delete(lruKey);
      this.accessOrder.delete(lruKey);
    }
  }
  /**
   * Get all keys in cache (for debugging)
   */
  keys() {
    return Array.from(this.cache.keys());
  }
  /**
   * Get entries sorted by access order (most recent first)
   */
  getEntriesByAccessOrder() {
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b2) => {
      const aAccess = this.accessOrder.get(a[0]) || 0;
      const bAccess = this.accessOrder.get(b2[0]) || 0;
      return bAccess - aAccess;
    });
    return entries;
  }
}
class TTLLRUCache extends LRUCache {
  constructor(maxSize = 50, defaultTTLMs = 5 * 60 * 1e3) {
    super(maxSize);
    this.defaultTTL = defaultTTLMs;
  }
  /**
   * Get a value, checking for expiration
   */
  getValue(key) {
    const entry = super.get(key);
    if (!entry) return void 0;
    if (Date.now() > entry.expiry) {
      super.delete(key);
      return void 0;
    }
    return entry.value;
  }
  /**
   * Set a value with optional TTL
   */
  setValue(key, value, ttlMs) {
    const expiry = Date.now() + (ttlMs || this.defaultTTL);
    super.set(key, { value, expiry });
  }
  /**
   * Clean up expired entries
   */
  cleanupExpired() {
    const now = Date.now();
    let removed = 0;
    for (const key of this.keys()) {
      const entry = super.get(key);
      if (entry && now > entry.expiry) {
        super.delete(key);
        removed++;
      }
    }
    return removed;
  }
}
class PerformanceMonitor {
  constructor(enabled = true) {
    this.timings = /* @__PURE__ */ new Map();
    this.metrics = {};
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.enabled = true;
    this.enabled = enabled;
  }
  /**
   * Start timing an operation
   */
  startTiming(operation, id) {
    if (!this.enabled) return "";
    const operationId = id || `${operation}-${Date.now()}`;
    const key = `${operation}:${operationId}`;
    const timing = {
      startTime: performance.now()
    };
    const timings = this.timings.get(operation) || [];
    timings.push(timing);
    this.timings.set(operation, timings);
    return key;
  }
  /**
   * End timing an operation
   */
  endTiming(key, success = true, error) {
    if (!this.enabled) return 0;
    const [operation] = key.split(":");
    const timings = this.timings.get(operation);
    if (!timings || timings.length === 0) return 0;
    const timing = timings[timings.length - 1];
    timing.endTime = performance.now();
    timing.duration = timing.endTime - timing.startTime;
    timing.success = success;
    if (error) timing.error = error;
    this.updateMetrics(operation, timing.duration);
    return timing.duration;
  }
  /**
   * Record a cache hit or miss
   */
  recordCacheAccess(hit) {
    if (!this.enabled) return;
    if (hit) {
      this.cacheHits++;
    } else {
      this.cacheMisses++;
    }
    this.updateCacheHitRate();
  }
  /**
   * Update cache hit rate metric
   */
  updateCacheHitRate() {
    const total = this.cacheHits + this.cacheMisses;
    if (total > 0) {
      this.metrics.cacheHitRate = this.cacheHits / total * 100;
    }
  }
  /**
   * Update average metrics for an operation
   */
  updateMetrics(operation, duration) {
    switch (operation) {
      case "connection":
        this.metrics.connectionTime = this.getAverageTiming("connection");
        break;
      case "actorCreation":
        this.metrics.actorCreationTime = this.getAverageTiming("actorCreation");
        break;
    }
  }
  /**
   * Get average timing for an operation
   */
  getAverageTiming(operation) {
    const timings = this.timings.get(operation);
    if (!timings || timings.length === 0) return 0;
    const completedTimings = timings.filter((t) => t.duration !== void 0);
    if (completedTimings.length === 0) return 0;
    const sum = completedTimings.reduce((acc, t) => acc + (t.duration || 0), 0);
    return sum / completedTimings.length;
  }
  /**
   * Get percentile timing for an operation
   */
  getPercentileTiming(operation, percentile) {
    const timings = this.timings.get(operation);
    if (!timings || timings.length === 0) return 0;
    const durations = timings.filter((t) => t.duration !== void 0).map((t) => t.duration).sort((a, b2) => a - b2);
    if (durations.length === 0) return 0;
    const index = Math.ceil(percentile / 100 * durations.length) - 1;
    return durations[Math.max(0, Math.min(index, durations.length - 1))];
  }
  /**
   * Update memory usage metric
   */
  updateMemoryUsage() {
    if (!this.enabled) return;
    if ("memory" in performance) {
      this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1048576;
    }
  }
  /**
   * Get current metrics
   */
  getMetrics() {
    this.updateMemoryUsage();
    return { ...this.metrics };
  }
  /**
   * Get detailed timing report
   */
  getTimingReport() {
    const report = {};
    for (const [operation, timings] of this.timings.entries()) {
      const completed = timings.filter((t) => t.duration !== void 0);
      const successful = completed.filter((t) => t.success);
      report[operation] = {
        count: completed.length,
        average: this.getAverageTiming(operation),
        p50: this.getPercentileTiming(operation, 50),
        p95: this.getPercentileTiming(operation, 95),
        p99: this.getPercentileTiming(operation, 99),
        successRate: completed.length > 0 ? successful.length / completed.length * 100 : 0
      };
    }
    return report;
  }
  /**
   * Clear all metrics and timings
   */
  clear() {
    this.timings.clear();
    this.metrics = {};
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }
  /**
   * Enable or disable monitoring
   */
  setEnabled(enabled) {
    this.enabled = enabled;
  }
  /**
   * Log performance summary to console
   */
  logSummary() {
    if (!this.enabled) return;
    console.group("🎯 PNP Performance Summary");
    console.table(this.getMetrics());
    console.table(this.getTimingReport());
    console.groupEnd();
  }
}
const globalPerformanceMonitor = new PerformanceMonitor(
  typeof window !== "undefined" && window.location.hostname === "localhost"
);
class ActorManager {
  constructor(config, provider = null) {
    this.config = config;
    this.provider = provider;
    this.actorCache = new TTLLRUCache(50, 5 * 60 * 1e3);
  }
  setProvider(provider) {
    this.provider = provider;
  }
  getActor(options) {
    const { canisterId, idl, anon = false, requiresSigning = false } = options;
    if (anon) {
      return this.createAnonymousActor(canisterId, idl);
    }
    if (!this.provider) {
      throw new Error(
        "Cannot create signed actor. No wallet provider connected."
      );
    }
    const actor = this.provider.createActor(canisterId, idl, {
      requiresSigning
    });
    return actor;
  }
  createAnonymousActor(canisterId, idl) {
    const cacheKey = `anon-${canisterId}`;
    const cachedActor = this.actorCache.getValue(cacheKey);
    if (cachedActor) {
      globalPerformanceMonitor.recordCacheAccess(true);
      return cachedActor;
    }
    globalPerformanceMonitor.recordCacheAccess(false);
    const createActor = () => {
      const timingKey = globalPerformanceMonitor.startTiming("actorCreation", canisterId);
      const agent = HttpAgent.createSync({
        host: this.config.hostUrl,
        verifyQuerySignatures: this.config.verifyQuerySignatures
      });
      fetchRootKeyIfNeeded(agent, this.config.fetchRootKey);
      const actor2 = Actor.createActor(idl, {
        agent,
        canisterId
      });
      this.actorCache.setValue(cacheKey, actor2);
      globalPerformanceMonitor.endTiming(timingKey, true);
      return actor2;
    };
    const actor = createActor();
    return actor;
  }
  clearCache() {
    this.actorCache.clear();
  }
  /**
   * Get cache statistics for monitoring
   */
  getCacheStats() {
    return this.actorCache.getStats();
  }
  /**
   * Clean up expired cache entries
   */
  cleanupExpiredCache() {
    return this.actorCache.cleanupExpired();
  }
}
class ConfigManager {
  constructor(config) {
    this.config = config;
    this.validateConfig(this.config);
  }
  getConfig() {
    return this.config;
  }
  updateConfig(partialConfig) {
    const newConfig = { ...this.config, ...partialConfig };
    const validationResult = this.validateConfig(newConfig);
    if (!validationResult.isValid) {
      throw new Error(`Invalid configuration: ${validationResult.errors.map((e3) => e3.message).join(", ")}`);
    }
    this.config = newConfig;
  }
  validateConfig(config) {
    const errors = [];
    if (config.hostUrl) {
      try {
        new URL(config.hostUrl);
      } catch {
        errors.push({ field: "hostUrl", message: "Invalid host URL format" });
      }
    }
    if (config.delegationTimeout && config.delegationTimeout <= 0) {
      errors.push({ field: "delegationTimeout", message: "Delegation timeout must be positive" });
    }
    if (config.delegationTargets) {
      if (!Array.isArray(config.delegationTargets)) {
        errors.push({ field: "delegationTargets", message: "Delegation targets must be an array" });
      } else {
        config.delegationTargets.forEach((target, index) => {
          if (typeof target !== "string") {
            errors.push({ field: `delegationTargets[${index}]`, message: "Delegation target must be a string" });
          }
        });
      }
    }
    if (config.adapters) {
      Object.entries(config.adapters).forEach(([id, adapter]) => {
        if (!adapter) {
          errors.push({ field: `adapters.${id}`, message: "Adapter configuration is required" });
          return;
        }
        if (adapter.id && typeof adapter.id !== "string") {
          errors.push({ field: `adapters.${id}.id`, message: "Adapter ID must be a string" });
        }
        if (adapter.walletName && typeof adapter.walletName !== "string") {
          errors.push({ field: `adapters.${id}.walletName`, message: "Wallet name must be a string" });
        }
        if (adapter.logo && typeof adapter.logo !== "string") {
          errors.push({ field: `adapters.${id}.logo`, message: "Logo URL must be a string" });
        }
        if (adapter.adapter && typeof adapter.adapter !== "function") {
          errors.push({ field: `adapters.${id}.adapter`, message: "Adapter must be a constructor function" });
        }
      });
    }
    const isValid = errors.length === 0;
    return { isValid, errors };
  }
  // Helper methods
  getAdapterConfig(id) {
    return this.config.adapters?.[id] || null;
  }
  isAdapterEnabled(id) {
    const adapter = this.getAdapterConfig(id);
    return adapter?.enabled !== false;
  }
  enableAdapter(id) {
    this.updateConfig({
      adapters: {
        ...this.config.adapters,
        [id]: {
          ...this.config.adapters?.[id],
          enabled: true
        }
      }
    });
  }
  disableAdapter(id) {
    this.updateConfig({
      adapters: {
        ...this.config.adapters,
        [id]: {
          ...this.config.adapters?.[id],
          enabled: false
        }
      }
    });
  }
}
class StatePersistenceManager {
  constructor(errorManager, options) {
    this.errorManager = errorManager;
    this.options = {
      storage: typeof window !== "undefined" ? window.localStorage : void 0,
      maxHistorySize: 100,
      autoRecover: true,
      validateOnLoad: true,
      ...options
    };
  }
  saveState(history) {
    if (!this.options.storage) return;
    try {
      const serialized = JSON.stringify({
        ...history,
        transitions: history.transitions.map((t) => ({
          ...t,
          timestamp: t.timestamp.toISOString()
        }))
      });
      this.options.storage.setItem(this.options.key, serialized);
    } catch (error) {
      this.errorManager.warn("Failed to persist state", { error });
    }
  }
  loadState() {
    if (!this.options.storage) return null;
    try {
      const serialized = this.options.storage.getItem(this.options.key);
      if (!serialized) return null;
      const parsed = JSON.parse(serialized);
      const history = {
        ...parsed,
        transitions: parsed.transitions.map((t) => ({
          ...t,
          timestamp: new Date(t.timestamp)
        }))
      };
      if (this.options.validateOnLoad && !this.validateStateHistory(history)) {
        this.errorManager.warn("Invalid state history loaded", { history });
        return null;
      }
      return history;
    } catch (error) {
      this.errorManager.warn("Failed to load persisted state", { error });
      return null;
    }
  }
  clearState() {
    if (!this.options.storage) return;
    try {
      this.options.storage.removeItem(this.options.key);
    } catch (error) {
      this.errorManager.warn("Failed to clear persisted state", { error });
    }
  }
  validateStateHistory(history) {
    if (!history.currentState || !history.transitions) return false;
    if (!Object.values(PnpState).includes(history.currentState)) return false;
    for (const transition of history.transitions) {
      if (!this.validateTransition(transition)) return false;
    }
    return true;
  }
  validateTransition(transition) {
    return Object.values(PnpState).includes(transition.from) && Object.values(PnpState).includes(transition.to) && transition.timestamp instanceof Date && !isNaN(transition.timestamp.getTime());
  }
  getStateKey() {
    return this.options.key;
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
}
var PnpState = /* @__PURE__ */ ((PnpState2) => {
  PnpState2["INITIALIZED"] = "initialized";
  PnpState2["CONNECTING"] = "connecting";
  PnpState2["CONNECTED"] = "connected";
  PnpState2["DISCONNECTING"] = "disconnecting";
  PnpState2["DISCONNECTED"] = "disconnected";
  PnpState2["ERROR"] = "error";
  return PnpState2;
})(PnpState || {});
class StateManager {
  constructor(errorManager, persistenceOptions) {
    this.state = "initialized";
    this.transitions = [];
    this.errorManager = errorManager;
    this.persistenceManager = new StatePersistenceManager(errorManager, {
      key: persistenceOptions?.key || "pnp-state",
      ...persistenceOptions
    });
    this.loadState();
  }
  loadState() {
    const savedState = this.persistenceManager.loadState();
    if (savedState) {
      this.state = savedState.currentState;
      this.transitions = savedState.transitions;
      this.lastError = savedState.lastError;
    }
  }
  saveState() {
    const stateHistory = {
      currentState: this.state,
      transitions: this.transitions,
      lastError: this.lastError
    };
    this.persistenceManager.saveState(stateHistory);
  }
  getCurrentState() {
    return this.state;
  }
  getStateHistory() {
    return [...this.transitions];
  }
  getLastError() {
    return this.lastError;
  }
  async transitionTo(newState, context) {
    const transition = {
      from: this.state,
      to: newState,
      timestamp: /* @__PURE__ */ new Date(),
      context
    };
    if (!this.isValidTransition(this.state, newState)) {
      const error = new PnpError(
        `Invalid state transition from ${this.state} to ${newState}`,
        "INVALID_STATE_TRANSITION",
        { transition }
      );
      this.errorManager.handleError(error);
      throw error;
    }
    this.state = newState;
    this.transitions.push(transition);
    this.saveState();
    this.errorManager.info(`State changed from ${transition.from} to ${transition.to}`, {
      context: transition.context
    });
  }
  isValidTransition(from, to) {
    const validTransitions = {
      [
        "initialized"
        /* INITIALIZED */
      ]: [
        "connecting",
        "error"
        /* ERROR */
      ],
      [
        "connecting"
        /* CONNECTING */
      ]: [
        "connected",
        "error"
        /* ERROR */
      ],
      [
        "connected"
        /* CONNECTED */
      ]: [
        "disconnecting",
        "error"
        /* ERROR */
      ],
      [
        "disconnecting"
        /* DISCONNECTING */
      ]: [
        "disconnected",
        "error"
        /* ERROR */
      ],
      [
        "disconnected"
        /* DISCONNECTED */
      ]: [
        "connecting",
        "error"
        /* ERROR */
      ],
      [
        "error"
        /* ERROR */
      ]: [
        "initialized",
        "connecting"
        /* CONNECTING */
      ]
    };
    return validTransitions[from]?.includes(to) ?? false;
  }
  setError(error) {
    this.lastError = error;
    this.saveState();
  }
  clearError() {
    this.lastError = void 0;
    this.saveState();
  }
}
const _PNP = class _PNP {
  /**
   * Register a new adapter globally. Call before PNP instantiation to make available to all instances.
   * @param id Adapter id (unique key)
   * @param config AdapterConfig
   */
  static registerAdapter(id, config) {
    _PNP.adapterRegistry[id] = config;
  }
  /**
   * Unregister an adapter by id.
   * @param id Adapter id
   */
  static unregisterAdapter(id) {
    delete _PNP.adapterRegistry[id];
  }
  /**
   * Get all registered adapters.
   */
  static getRegisteredAdapters() {
    return { ..._PNP.adapterRegistry };
  }
  constructor(config = {}) {
    const mergedAdapters = {
      ..._PNP.adapterRegistry,
      ...config.adapters || {}
    };
    const mergedConfig = { ...config, adapters: mergedAdapters };
    this.errorManager = new ErrorManager(
      config.logLevel || LogLevel.INFO
    );
    this.stateManager = new StateManager(
      this.errorManager,
      {
        key: config.persistenceKey || "pnp-state",
        storage: config.storage,
        maxHistorySize: config.maxStateHistorySize,
        autoRecover: config.autoRecoverState,
        validateOnLoad: config.validateStateOnLoad
      }
    );
    this.configManager = new ConfigManager(mergedConfig);
    let finalConfig = this.configManager.getConfig();
    finalConfig = {
      ...finalConfig,
      adapters: {
        ...finalConfig.adapters,
        ..._PNP.adapterRegistry
      }
    };
    this.configManager.updateConfig(finalConfig);
    this.connectionManager = new ConnectionManager(finalConfig, this.errorManager);
    this.actorManager = new ActorManager(finalConfig, null);
    this.connectionManager.setOnConnected(async () => {
      try {
        await this.stateManager.transitionTo(PnpState.CONNECTED);
        this.actorManager.setProvider(this.connectionManager.provider);
      } catch (error) {
        this.errorManager.handleError(error);
      }
    });
    this.connectionManager.setOnDisconnected(async () => {
      try {
        await this.stateManager.transitionTo(PnpState.DISCONNECTED);
        this.actorManager.setProvider(null);
        this.actorManager.clearCache();
      } catch (error) {
        this.errorManager.handleError(error);
      }
    });
    this.stateManager.transitionTo(PnpState.INITIALIZED).catch((error) => {
      this.errorManager.handleError(error);
    });
  }
  async openChannel() {
    await this.connectionManager.openChannel();
  }
  get config() {
    return this.configManager.getConfig();
  }
  get adapter() {
    return this.connectionManager.adapter;
  }
  get provider() {
    return this.connectionManager.provider;
  }
  get account() {
    return this.connectionManager.account;
  }
  get status() {
    return this.connectionManager.status;
  }
  async connect(walletId) {
    const timingKey = globalPerformanceMonitor.startTiming("connection", walletId);
    try {
      if (this.stateManager.getCurrentState() === PnpState.CONNECTED) {
        this.errorManager.info("Already connected.");
        globalPerformanceMonitor.endTiming(timingKey, true);
        return this.account;
      }
      await this.stateManager.transitionTo(PnpState.CONNECTING);
      const account = await this.connectionManager.connect(walletId);
      this.actorManager.setProvider(this.connectionManager.provider);
      globalPerformanceMonitor.endTiming(timingKey, true);
      return account;
    } catch (error) {
      await this.stateManager.transitionTo(PnpState.ERROR, { error });
      this.errorManager.handleError(error);
      globalPerformanceMonitor.endTiming(timingKey, false, String(error));
      throw error;
    }
  }
  async disconnect() {
    try {
      await this.stateManager.transitionTo(PnpState.DISCONNECTING);
      await this.connectionManager.disconnect();
      this.actorManager.setProvider(null);
      this.actorManager.clearCache();
    } catch (error) {
      await this.stateManager.transitionTo(PnpState.ERROR, { error });
      this.errorManager.handleError(error);
      throw error;
    }
  }
  getActor(options) {
    return this.actorManager.getActor(options);
  }
  getIcrcActor(canisterId, options) {
    const anon = options?.anon ?? false;
    const requiresSigning = options?.requiresSigning ?? false;
    if (anon) {
      return this.actorManager.createAnonymousActor(canisterId, ICRC2_IDL);
    }
    if (this.connectionManager.provider && this.connectionManager.provider.icrcActor) {
      return this.connectionManager.provider.icrcActor({ canisterId, anon: false, requiresSigning });
    }
    return this.actorManager.getActor({ canisterId, idl: ICRC2_IDL, anon: false, requiresSigning });
  }
  isAuthenticated() {
    return this.connectionManager.isAuthenticated();
  }
  getEnabledWallets() {
    return Object.entries(this.config.adapters).filter(([_2, wallet]) => wallet?.enabled !== false).map(([id, wallet]) => ({
      ...wallet,
      id: wallet.id || id
      // Ensure id is always present
    }));
  }
  /**
   * Get performance metrics and cache statistics
   */
  getPerformanceStats() {
    return {
      cache: this.actorManager.getCacheStats(),
      performance: globalPerformanceMonitor.getMetrics(),
      timings: globalPerformanceMonitor.getTimingReport()
    };
  }
};
_PNP.adapterRegistry = {};
let PNP = _PNP;
const createPNP = (config = {}) => {
  const globalConfig = createPNPConfig(config);
  return new PNP(globalConfig);
};
export {
  ConfigBuilder,
  PNP,
  PnpState,
  createAdapterExtension,
  createPNP,
  createPNPConfig
};
//# sourceMappingURL=plug-n-play.es.js.map
