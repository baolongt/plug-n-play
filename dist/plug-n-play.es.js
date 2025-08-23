const ICRC2_IDL = ({ IDL: IDL2 }) => {
  const Account = IDL2.Record({
    "owner": IDL2.Principal,
    "subaccount": IDL2.Opt(IDL2.Vec(IDL2.Nat8))
  });
  const FeatureFlags = IDL2.Record({ "icrc2": IDL2.Bool });
  const UpgradeArgs = IDL2.Record({
    "maximum_number_of_accounts": IDL2.Opt(IDL2.Nat64),
    "icrc1_minting_account": IDL2.Opt(Account),
    "feature_flags": IDL2.Opt(FeatureFlags)
  });
  const Tokens = IDL2.Record({ "e8s": IDL2.Nat64 });
  const Duration = IDL2.Record({ "secs": IDL2.Nat64, "nanos": IDL2.Nat32 });
  const ArchiveOptions = IDL2.Record({
    "num_blocks_to_archive": IDL2.Nat64,
    "max_transactions_per_response": IDL2.Opt(IDL2.Nat64),
    "trigger_threshold": IDL2.Nat64,
    "max_message_size_bytes": IDL2.Opt(IDL2.Nat64),
    "cycles_for_archive_creation": IDL2.Opt(IDL2.Nat64),
    "node_max_memory_size_bytes": IDL2.Opt(IDL2.Nat64),
    "controller_id": IDL2.Principal
  });
  const InitArgs = IDL2.Record({
    "send_whitelist": IDL2.Vec(IDL2.Principal),
    "token_symbol": IDL2.Opt(IDL2.Text),
    "transfer_fee": IDL2.Opt(Tokens),
    "minting_account": IDL2.Text,
    "maximum_number_of_accounts": IDL2.Opt(IDL2.Nat64),
    "accounts_overflow_trim_quantity": IDL2.Opt(IDL2.Nat64),
    "transaction_window": IDL2.Opt(Duration),
    "max_message_size_bytes": IDL2.Opt(IDL2.Nat64),
    "icrc1_minting_account": IDL2.Opt(Account),
    "archive_options": IDL2.Opt(ArchiveOptions),
    "initial_values": IDL2.Vec(IDL2.Tuple(IDL2.Text, Tokens)),
    "token_name": IDL2.Opt(IDL2.Text),
    "feature_flags": IDL2.Opt(FeatureFlags)
  });
  IDL2.Variant({
    "Upgrade": IDL2.Opt(UpgradeArgs),
    "Init": InitArgs
  });
  const BinaryAccountBalanceArgs = IDL2.Record({
    "account": IDL2.Vec(IDL2.Nat8)
  });
  const AccountBalanceArgs = IDL2.Record({ "account": IDL2.Text });
  const ArchiveInfo = IDL2.Record({ "canister_id": IDL2.Principal });
  const Archives = IDL2.Record({ "archives": IDL2.Vec(ArchiveInfo) });
  const Decimals = IDL2.Record({ "decimals": IDL2.Nat32 });
  const MetadataValue = IDL2.Variant({
    "Int": IDL2.Int,
    "Nat": IDL2.Nat,
    "Blob": IDL2.Vec(IDL2.Nat8),
    "Text": IDL2.Text
  });
  const StandardRecord = IDL2.Record({ "url": IDL2.Text, "name": IDL2.Text });
  const TransferArg = IDL2.Record({
    "to": Account,
    "fee": IDL2.Opt(IDL2.Nat),
    "memo": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "from_subaccount": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "created_at_time": IDL2.Opt(IDL2.Nat64),
    "amount": IDL2.Nat
  });
  const TransferError = IDL2.Variant({
    "GenericError": IDL2.Record({
      "message": IDL2.Text,
      "error_code": IDL2.Nat
    }),
    "TemporarilyUnavailable": IDL2.Null,
    "BadBurn": IDL2.Record({ "min_burn_amount": IDL2.Nat }),
    "Duplicate": IDL2.Record({ "duplicate_of": IDL2.Nat }),
    "BadFee": IDL2.Record({ "expected_fee": IDL2.Nat }),
    "CreatedInFuture": IDL2.Record({ "ledger_time": IDL2.Nat64 }),
    "TooOld": IDL2.Null,
    "InsufficientFunds": IDL2.Record({ "balance": IDL2.Nat })
  });
  const Result = IDL2.Variant({ "Ok": IDL2.Nat, "Err": TransferError });
  const AllowanceArgs = IDL2.Record({
    "account": Account,
    "spender": Account
  });
  const Allowance = IDL2.Record({
    "allowance": IDL2.Nat,
    "expires_at": IDL2.Opt(IDL2.Nat64)
  });
  const ApproveArgs = IDL2.Record({
    "fee": IDL2.Opt(IDL2.Nat),
    "memo": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "from_subaccount": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "created_at_time": IDL2.Opt(IDL2.Nat64),
    "amount": IDL2.Nat,
    "expected_allowance": IDL2.Opt(IDL2.Nat),
    "expires_at": IDL2.Opt(IDL2.Nat64),
    "spender": Account
  });
  const ApproveError = IDL2.Variant({
    "GenericError": IDL2.Record({
      "message": IDL2.Text,
      "error_code": IDL2.Nat
    }),
    "TemporarilyUnavailable": IDL2.Null,
    "Duplicate": IDL2.Record({ "duplicate_of": IDL2.Nat }),
    "BadFee": IDL2.Record({ "expected_fee": IDL2.Nat }),
    "AllowanceChanged": IDL2.Record({ "current_allowance": IDL2.Nat }),
    "CreatedInFuture": IDL2.Record({ "ledger_time": IDL2.Nat64 }),
    "TooOld": IDL2.Null,
    "Expired": IDL2.Record({ "ledger_time": IDL2.Nat64 }),
    "InsufficientFunds": IDL2.Record({ "balance": IDL2.Nat })
  });
  const Result_1 = IDL2.Variant({ "Ok": IDL2.Nat, "Err": ApproveError });
  const TransferFromArgs = IDL2.Record({
    "to": Account,
    "fee": IDL2.Opt(IDL2.Nat),
    "spender_subaccount": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "from": Account,
    "memo": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "created_at_time": IDL2.Opt(IDL2.Nat64),
    "amount": IDL2.Nat
  });
  const TransferFromError = IDL2.Variant({
    "GenericError": IDL2.Record({
      "message": IDL2.Text,
      "error_code": IDL2.Nat
    }),
    "TemporarilyUnavailable": IDL2.Null,
    "InsufficientAllowance": IDL2.Record({ "allowance": IDL2.Nat }),
    "BadBurn": IDL2.Record({ "min_burn_amount": IDL2.Nat }),
    "Duplicate": IDL2.Record({ "duplicate_of": IDL2.Nat }),
    "BadFee": IDL2.Record({ "expected_fee": IDL2.Nat }),
    "CreatedInFuture": IDL2.Record({ "ledger_time": IDL2.Nat64 }),
    "TooOld": IDL2.Null,
    "InsufficientFunds": IDL2.Record({ "balance": IDL2.Nat })
  });
  const Result_2 = IDL2.Variant({ "Ok": IDL2.Nat, "Err": TransferFromError });
  const Name = IDL2.Record({ "name": IDL2.Text });
  const GetBlocksArgs = IDL2.Record({
    "start": IDL2.Nat64,
    "length": IDL2.Nat64
  });
  const TimeStamp = IDL2.Record({ "timestamp_nanos": IDL2.Nat64 });
  const CandidOperation = IDL2.Variant({
    "Approve": IDL2.Record({
      "fee": Tokens,
      "from": IDL2.Vec(IDL2.Nat8),
      "allowance_e8s": IDL2.Int,
      "allowance": Tokens,
      "expected_allowance": IDL2.Opt(Tokens),
      "expires_at": IDL2.Opt(TimeStamp),
      "spender": IDL2.Vec(IDL2.Nat8)
    }),
    "Burn": IDL2.Record({
      "from": IDL2.Vec(IDL2.Nat8),
      "amount": Tokens,
      "spender": IDL2.Opt(IDL2.Vec(IDL2.Nat8))
    }),
    "Mint": IDL2.Record({ "to": IDL2.Vec(IDL2.Nat8), "amount": Tokens }),
    "Transfer": IDL2.Record({
      "to": IDL2.Vec(IDL2.Nat8),
      "fee": Tokens,
      "from": IDL2.Vec(IDL2.Nat8),
      "amount": Tokens,
      "spender": IDL2.Opt(IDL2.Vec(IDL2.Nat8))
    })
  });
  const CandidTransaction = IDL2.Record({
    "memo": IDL2.Nat64,
    "icrc1_memo": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "operation": IDL2.Opt(CandidOperation),
    "created_at_time": TimeStamp
  });
  const CandidBlock = IDL2.Record({
    "transaction": CandidTransaction,
    "timestamp": TimeStamp,
    "parent_hash": IDL2.Opt(IDL2.Vec(IDL2.Nat8))
  });
  const BlockRange = IDL2.Record({ "blocks": IDL2.Vec(CandidBlock) });
  const GetBlocksError = IDL2.Variant({
    "BadFirstBlockIndex": IDL2.Record({
      "requested_index": IDL2.Nat64,
      "first_valid_index": IDL2.Nat64
    }),
    "Other": IDL2.Record({
      "error_message": IDL2.Text,
      "error_code": IDL2.Nat64
    })
  });
  const Result_3 = IDL2.Variant({ "Ok": BlockRange, "Err": GetBlocksError });
  const ArchivedBlocksRange = IDL2.Record({
    "callback": IDL2.Func([GetBlocksArgs], [Result_3], ["query"]),
    "start": IDL2.Nat64,
    "length": IDL2.Nat64
  });
  const QueryBlocksResponse = IDL2.Record({
    "certificate": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "blocks": IDL2.Vec(CandidBlock),
    "chain_length": IDL2.Nat64,
    "first_block_index": IDL2.Nat64,
    "archived_blocks": IDL2.Vec(ArchivedBlocksRange)
  });
  const Result_4 = IDL2.Variant({
    "Ok": IDL2.Vec(IDL2.Vec(IDL2.Nat8)),
    "Err": GetBlocksError
  });
  const ArchivedEncodedBlocksRange = IDL2.Record({
    "callback": IDL2.Func([GetBlocksArgs], [Result_4], ["query"]),
    "start": IDL2.Nat64,
    "length": IDL2.Nat64
  });
  const QueryEncodedBlocksResponse = IDL2.Record({
    "certificate": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "blocks": IDL2.Vec(IDL2.Vec(IDL2.Nat8)),
    "chain_length": IDL2.Nat64,
    "first_block_index": IDL2.Nat64,
    "archived_blocks": IDL2.Vec(ArchivedEncodedBlocksRange)
  });
  const SendArgs = IDL2.Record({
    "to": IDL2.Text,
    "fee": Tokens,
    "memo": IDL2.Nat64,
    "from_subaccount": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "created_at_time": IDL2.Opt(TimeStamp),
    "amount": Tokens
  });
  const Symbol2 = IDL2.Record({ "symbol": IDL2.Text });
  const TransferArgs = IDL2.Record({
    "to": IDL2.Vec(IDL2.Nat8),
    "fee": Tokens,
    "memo": IDL2.Nat64,
    "from_subaccount": IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    "created_at_time": IDL2.Opt(TimeStamp),
    "amount": Tokens
  });
  const TransferError_1 = IDL2.Variant({
    "TxTooOld": IDL2.Record({ "allowed_window_nanos": IDL2.Nat64 }),
    "BadFee": IDL2.Record({ "expected_fee": Tokens }),
    "TxDuplicate": IDL2.Record({ "duplicate_of": IDL2.Nat64 }),
    "TxCreatedInFuture": IDL2.Null,
    "InsufficientFunds": IDL2.Record({ "balance": Tokens })
  });
  const Result_5 = IDL2.Variant({ "Ok": IDL2.Nat64, "Err": TransferError_1 });
  const TransferFee = IDL2.Record({ "transfer_fee": Tokens });
  return IDL2.Service({
    "account_balance": IDL2.Func(
      [BinaryAccountBalanceArgs],
      [Tokens],
      ["query"]
    ),
    "account_balance_dfx": IDL2.Func([AccountBalanceArgs], [Tokens], ["query"]),
    "account_identifier": IDL2.Func([Account], [IDL2.Vec(IDL2.Nat8)], ["query"]),
    "archives": IDL2.Func([], [Archives], ["query"]),
    "decimals": IDL2.Func([], [Decimals], ["query"]),
    "icrc1_balance_of": IDL2.Func([Account], [IDL2.Nat], ["query"]),
    "icrc1_decimals": IDL2.Func([], [IDL2.Nat8], ["query"]),
    "icrc1_fee": IDL2.Func([], [IDL2.Nat], ["query"]),
    "icrc1_metadata": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Tuple(IDL2.Text, MetadataValue))],
      ["query"]
    ),
    "icrc1_minting_account": IDL2.Func([], [IDL2.Opt(Account)], ["query"]),
    "icrc1_name": IDL2.Func([], [IDL2.Text], ["query"]),
    "icrc1_supported_standards": IDL2.Func(
      [],
      [IDL2.Vec(StandardRecord)],
      ["query"]
    ),
    "icrc1_symbol": IDL2.Func([], [IDL2.Text], ["query"]),
    "icrc1_total_supply": IDL2.Func([], [IDL2.Nat], ["query"]),
    "icrc1_transfer": IDL2.Func([TransferArg], [Result], []),
    "icrc2_allowance": IDL2.Func([AllowanceArgs], [Allowance], ["query"]),
    "icrc2_approve": IDL2.Func([ApproveArgs], [Result_1], []),
    "icrc2_transfer_from": IDL2.Func([TransferFromArgs], [Result_2], []),
    "name": IDL2.Func([], [Name], ["query"]),
    "query_blocks": IDL2.Func(
      [GetBlocksArgs],
      [QueryBlocksResponse],
      ["query"]
    ),
    "query_encoded_blocks": IDL2.Func(
      [GetBlocksArgs],
      [QueryEncodedBlocksResponse],
      ["query"]
    ),
    "send_dfx": IDL2.Func([SendArgs], [IDL2.Nat64], []),
    "symbol": IDL2.Func([], [Symbol2], ["query"]),
    "transfer": IDL2.Func([TransferArgs], [Result_5], []),
    "transfer_fee": IDL2.Func([IDL2.Record({})], [TransferFee], ["query"])
  });
};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var buffer$1 = {};
var base64Js = {};
var hasRequiredBase64Js;
function requireBase64Js() {
  if (hasRequiredBase64Js) return base64Js;
  hasRequiredBase64Js = 1;
  base64Js.byteLength = byteLength;
  base64Js.toByteArray = toByteArray;
  base64Js.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
      );
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
      );
    }
    return parts.join("");
  }
  return base64Js;
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredIeee754;
function requireIeee754() {
  if (hasRequiredIeee754) return ieee754;
  hasRequiredIeee754 = 1;
  ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
    var e3, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d2 = isLE ? -1 : 1;
    var s = buffer2[offset + i];
    i += d2;
    e3 = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e3 = e3 * 256 + buffer2[offset + i], i += d2, nBits -= 8) {
    }
    m = e3 & (1 << -nBits) - 1;
    e3 >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d2, nBits -= 8) {
    }
    if (e3 === 0) {
      e3 = 1 - eBias;
    } else if (e3 === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e3 = e3 - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e3 - mLen);
  };
  ieee754.write = function(buffer2, value2, offset, isLE, mLen, nBytes) {
    var e3, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d2 = isLE ? 1 : -1;
    var s = value2 < 0 || value2 === 0 && 1 / value2 < 0 ? 1 : 0;
    value2 = Math.abs(value2);
    if (isNaN(value2) || value2 === Infinity) {
      m = isNaN(value2) ? 1 : 0;
      e3 = eMax;
    } else {
      e3 = Math.floor(Math.log(value2) / Math.LN2);
      if (value2 * (c = Math.pow(2, -e3)) < 1) {
        e3--;
        c *= 2;
      }
      if (e3 + eBias >= 1) {
        value2 += rt / c;
      } else {
        value2 += rt * Math.pow(2, 1 - eBias);
      }
      if (value2 * c >= 2) {
        e3++;
        c /= 2;
      }
      if (e3 + eBias >= eMax) {
        m = 0;
        e3 = eMax;
      } else if (e3 + eBias >= 1) {
        m = (value2 * c - 1) * Math.pow(2, mLen);
        e3 = e3 + eBias;
      } else {
        m = value2 * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e3 = 0;
      }
    }
    for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d2, m /= 256, mLen -= 8) {
    }
    e3 = e3 << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer2[offset + i] = e3 & 255, i += d2, e3 /= 256, eLen -= 8) {
    }
    buffer2[offset + i - d2] |= s * 128;
  };
  return ieee754;
}
var hasRequiredBuffer$1;
function requireBuffer$1() {
  if (hasRequiredBuffer$1) return buffer$1;
  hasRequiredBuffer$1 = 1;
  (function(exports) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    const base64 = requireBase64Js();
    const ieee7542 = requireIeee754();
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    const K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e3) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value2, encodingOrOffset, length) {
      if (typeof value2 === "string") {
        return fromString(value2, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value2)) {
        return fromArrayView(value2);
      }
      if (value2 == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value2
        );
      }
      if (isInstance(value2, ArrayBuffer) || value2 && isInstance(value2.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value2, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value2, SharedArrayBuffer) || value2 && isInstance(value2.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value2, encodingOrOffset, length);
      }
      if (typeof value2 === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value2.valueOf && value2.valueOf();
      if (valueOf != null && valueOf !== value2) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b2 = fromObject(value2);
      if (b2) return b2;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value2[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value2[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value2
      );
    }
    Buffer2.from = function(value2, encodingOrOffset, length) {
      return from(value2, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill2, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill2 !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill2, encoding) : createBuffer(size).fill(fill2);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(size, fill2, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy2 = new Uint8Array(arrayView);
        return fromArrayBuffer(copy2.buffer, copy2.byteOffset, copy2.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b2) {
      return b2 != null && b2._isBuffer === true && b2 !== Buffer2.prototype;
    };
    Buffer2.compare = function compare2(a, b2) {
      if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b2, Uint8Array)) b2 = Buffer2.from(b2, b2.offset, b2.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b2)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b2) return 0;
      let x2 = a.length;
      let y = b2.length;
      for (let i = 0, len = Math.min(x2, y); i < len; ++i) {
        if (a[i] !== b2[i]) {
          x2 = a[i];
          y = b2[i];
          break;
        }
      }
      if (x2 < y) return -1;
      if (y < x2) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
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
    Buffer2.concat = function concat2(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer2 = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer2.length) {
            if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
            buf.copy(buffer2, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer2,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer2, pos);
        }
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes2(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes2(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b2, n, m) {
      const i = b2[n];
      b2[n] = b2[m];
      b2[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b2) {
      if (!Buffer2.isBuffer(b2)) throw new TypeError("Argument must be a Buffer");
      if (this === b2) return true;
      return Buffer2.compare(this, b2) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x2 = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x2, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x2 = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x2 < y) return -1;
      if (y < x2) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir) return -1;
        else byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j2 = 0; j2 < valLength; j2++) {
            if (read(arr, i + j2) !== read(val, j2)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes2(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee7542.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee7542.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee7542.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee7542.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value2, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value2 > max || value2 < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE2(value2, offset, byteLength2, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value2, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value2 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value2 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value2, offset, byteLength2, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value2, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value2 & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value2 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 1, 255, 0);
      this[offset] = value2 & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 2, 65535, 0);
      this[offset] = value2 & 255;
      this[offset + 1] = value2 >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 2, 65535, 0);
      this[offset] = value2 >>> 8;
      this[offset + 1] = value2 & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 4, 4294967295, 0);
      this[offset + 3] = value2 >>> 24;
      this[offset + 2] = value2 >>> 16;
      this[offset + 1] = value2 >>> 8;
      this[offset] = value2 & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 4, 4294967295, 0);
      this[offset] = value2 >>> 24;
      this[offset + 1] = value2 >>> 16;
      this[offset + 2] = value2 >>> 8;
      this[offset + 3] = value2 & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value2, offset, min, max) {
      checkIntBI(value2, min, max, buf, offset, 7);
      let lo = Number(value2 & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value2 >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value2, offset, min, max) {
      checkIntBI(value2, min, max, buf, offset, 7);
      let lo = Number(value2 & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value2 >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value2, offset = 0) {
      return wrtBigUInt64LE(this, value2, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value2, offset = 0) {
      return wrtBigUInt64BE(this, value2, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE2(value2, offset, byteLength2, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value2, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value2 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value2 < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value2 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value2, offset, byteLength2, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value2, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value2 & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value2 < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value2 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 1, 127, -128);
      if (value2 < 0) value2 = 255 + value2 + 1;
      this[offset] = value2 & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 2, 32767, -32768);
      this[offset] = value2 & 255;
      this[offset + 1] = value2 >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 2, 32767, -32768);
      this[offset] = value2 >>> 8;
      this[offset + 1] = value2 & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 4, 2147483647, -2147483648);
      this[offset] = value2 & 255;
      this[offset + 1] = value2 >>> 8;
      this[offset + 2] = value2 >>> 16;
      this[offset + 3] = value2 >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 4, 2147483647, -2147483648);
      if (value2 < 0) value2 = 4294967295 + value2 + 1;
      this[offset] = value2 >>> 24;
      this[offset + 1] = value2 >>> 16;
      this[offset + 2] = value2 >>> 8;
      this[offset + 3] = value2 & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value2, offset = 0) {
      return wrtBigUInt64LE(this, value2, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value2, offset = 0) {
      return wrtBigUInt64BE(this, value2, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value2, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value2, offset, littleEndian, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value2, offset, 4);
      }
      ieee7542.write(buf, value2, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value2, offset, noAssert) {
      return writeFloat(this, value2, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value2, offset, noAssert) {
      return writeFloat(this, value2, offset, false, noAssert);
    };
    function writeDouble(buf, value2, offset, littleEndian, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value2, offset, 8);
      }
      ieee7542.write(buf, value2, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value2, offset, noAssert) {
      return writeDouble(this, value2, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value2, offset, noAssert) {
      return writeDouble(this, value2, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    const errors = {};
    function E2(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value2) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value: value2,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E2(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E2(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E2(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value2, min, max, buf, offset, byteLength2) {
      if (value2 > max || value2 < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value2);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value2, name) {
      if (typeof value2 !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value2);
      }
    }
    function boundsError(value2, length, type) {
      if (Math.floor(value2) !== value2) {
        validateNumber(value2, type);
        throw new errors.ERR_OUT_OF_RANGE("offset", "an integer", value2);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        "offset",
        `>= ${0} and <= ${length}`,
        value2
      );
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes2(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src2, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src2.length) break;
        dst[i + offset] = src2[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    const hexSliceLookupTable = (function() {
      const alphabet2 = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j2 = 0; j2 < 16; ++j2) {
          table[i16 + j2] = alphabet2[i] + alphabet2[j2];
        }
      }
      return table;
    })();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  })(buffer$1);
  return buffer$1;
}
var bufferExports = requireBuffer$1();
var ReplicaRejectCode;
(function(ReplicaRejectCode2) {
  ReplicaRejectCode2[ReplicaRejectCode2["SysFatal"] = 1] = "SysFatal";
  ReplicaRejectCode2[ReplicaRejectCode2["SysTransient"] = 2] = "SysTransient";
  ReplicaRejectCode2[ReplicaRejectCode2["DestinationInvalid"] = 3] = "DestinationInvalid";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterReject"] = 4] = "CanisterReject";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterError"] = 5] = "CanisterError";
})(ReplicaRejectCode || (ReplicaRejectCode = {}));
const alphabet = "abcdefghijklmnopqrstuvwxyz234567";
const lookupTable = /* @__PURE__ */ Object.create(null);
for (let i = 0; i < alphabet.length; i++) {
  lookupTable[alphabet[i]] = i;
}
lookupTable["0"] = lookupTable.o;
lookupTable["1"] = lookupTable.i;
function encode$2(input) {
  let skip = 0;
  let bits = 0;
  let output = "";
  function encodeByte(byte) {
    if (skip < 0) {
      bits |= byte >> -skip;
    } else {
      bits = byte << skip & 248;
    }
    if (skip > 3) {
      skip -= 8;
      return 1;
    }
    if (skip < 4) {
      output += alphabet[bits >> 3];
      skip += 5;
    }
    return 0;
  }
  for (let i = 0; i < input.length; ) {
    i += encodeByte(input[i]);
  }
  return output + (skip < 0 ? alphabet[bits >> 3] : "");
}
function decode$2(input) {
  let skip = 0;
  let byte = 0;
  const output = new Uint8Array(input.length * 4 / 3 | 0);
  let o = 0;
  function decodeChar(char) {
    let val = lookupTable[char.toLowerCase()];
    if (val === void 0) {
      throw new Error(`Invalid character: ${JSON.stringify(char)}`);
    }
    val <<= 3;
    byte |= val >>> skip;
    skip += 5;
    if (skip >= 8) {
      output[o++] = byte;
      skip -= 8;
      if (skip > 0) {
        byte = val << 5 - skip & 255;
      } else {
        byte = 0;
      }
    }
  }
  for (const c of input) {
    decodeChar(c);
  }
  return output.slice(0, o);
}
const lookUpTable = new Uint32Array([
  0,
  1996959894,
  3993919788,
  2567524794,
  124634137,
  1886057615,
  3915621685,
  2657392035,
  249268274,
  2044508324,
  3772115230,
  2547177864,
  162941995,
  2125561021,
  3887607047,
  2428444049,
  498536548,
  1789927666,
  4089016648,
  2227061214,
  450548861,
  1843258603,
  4107580753,
  2211677639,
  325883990,
  1684777152,
  4251122042,
  2321926636,
  335633487,
  1661365465,
  4195302755,
  2366115317,
  997073096,
  1281953886,
  3579855332,
  2724688242,
  1006888145,
  1258607687,
  3524101629,
  2768942443,
  901097722,
  1119000684,
  3686517206,
  2898065728,
  853044451,
  1172266101,
  3705015759,
  2882616665,
  651767980,
  1373503546,
  3369554304,
  3218104598,
  565507253,
  1454621731,
  3485111705,
  3099436303,
  671266974,
  1594198024,
  3322730930,
  2970347812,
  795835527,
  1483230225,
  3244367275,
  3060149565,
  1994146192,
  31158534,
  2563907772,
  4023717930,
  1907459465,
  112637215,
  2680153253,
  3904427059,
  2013776290,
  251722036,
  2517215374,
  3775830040,
  2137656763,
  141376813,
  2439277719,
  3865271297,
  1802195444,
  476864866,
  2238001368,
  4066508878,
  1812370925,
  453092731,
  2181625025,
  4111451223,
  1706088902,
  314042704,
  2344532202,
  4240017532,
  1658658271,
  366619977,
  2362670323,
  4224994405,
  1303535960,
  984961486,
  2747007092,
  3569037538,
  1256170817,
  1037604311,
  2765210733,
  3554079995,
  1131014506,
  879679996,
  2909243462,
  3663771856,
  1141124467,
  855842277,
  2852801631,
  3708648649,
  1342533948,
  654459306,
  3188396048,
  3373015174,
  1466479909,
  544179635,
  3110523913,
  3462522015,
  1591671054,
  702138776,
  2966460450,
  3352799412,
  1504918807,
  783551873,
  3082640443,
  3233442989,
  3988292384,
  2596254646,
  62317068,
  1957810842,
  3939845945,
  2647816111,
  81470997,
  1943803523,
  3814918930,
  2489596804,
  225274430,
  2053790376,
  3826175755,
  2466906013,
  167816743,
  2097651377,
  4027552580,
  2265490386,
  503444072,
  1762050814,
  4150417245,
  2154129355,
  426522225,
  1852507879,
  4275313526,
  2312317920,
  282753626,
  1742555852,
  4189708143,
  2394877945,
  397917763,
  1622183637,
  3604390888,
  2714866558,
  953729732,
  1340076626,
  3518719985,
  2797360999,
  1068828381,
  1219638859,
  3624741850,
  2936675148,
  906185462,
  1090812512,
  3747672003,
  2825379669,
  829329135,
  1181335161,
  3412177804,
  3160834842,
  628085408,
  1382605366,
  3423369109,
  3138078467,
  570562233,
  1426400815,
  3317316542,
  2998733608,
  733239954,
  1555261956,
  3268935591,
  3050360625,
  752459403,
  1541320221,
  2607071920,
  3965973030,
  1969922972,
  40735498,
  2617837225,
  3943577151,
  1913087877,
  83908371,
  2512341634,
  3803740692,
  2075208622,
  213261112,
  2463272603,
  3855990285,
  2094854071,
  198958881,
  2262029012,
  4057260610,
  1759359992,
  534414190,
  2176718541,
  4139329115,
  1873836001,
  414664567,
  2282248934,
  4279200368,
  1711684554,
  285281116,
  2405801727,
  4167216745,
  1634467795,
  376229701,
  2685067896,
  3608007406,
  1308918612,
  956543938,
  2808555105,
  3495958263,
  1231636301,
  1047427035,
  2932959818,
  3654703836,
  1088359270,
  936918e3,
  2847714899,
  3736837829,
  1202900863,
  817233897,
  3183342108,
  3401237130,
  1404277552,
  615818150,
  3134207493,
  3453421203,
  1423857449,
  601450431,
  3009837614,
  3294710456,
  1567103746,
  711928724,
  3020668471,
  3272380065,
  1510334235,
  755167117
]);
function getCrc32(buf) {
  const b2 = new Uint8Array(buf);
  let crc = -1;
  for (let i = 0; i < b2.length; i++) {
    const byte = b2[i];
    const t = (byte ^ crc) & 255;
    crc = lookUpTable[t] ^ crc >>> 8;
  }
  return (crc ^ -1) >>> 0;
}
const crypto$1 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b2, ...lengths) {
  if (!isBytes(b2))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b2.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b2.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
const hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_2, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
class Hash {
}
function createHasher$1(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto$1 && typeof crypto$1.getRandomValues === "function") {
    return crypto$1.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto$1 && typeof crypto$1.randomBytes === "function") {
    return Uint8Array.from(crypto$1.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}
function setBigUint64(view, byteOffset, value2, isLE) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value2, isLE);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value2 >> _32n2 & _u32_max);
  const wl = Number(value2 & _u32_max);
  const h2 = isLE ? 4 : 0;
  const l = isLE ? 0 : 4;
  view.setUint32(byteOffset + h2, wh, isLE);
  view.setUint32(byteOffset + l, wl, isLE);
}
function Chi(a, b2, c) {
  return a & b2 ^ ~a & c;
}
function Maj(a, b2, c) {
  return a & b2 ^ a & c ^ b2 & c;
}
class HashMD extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer: buffer2, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer2.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer: buffer2, view, blockLen, isLE } = this;
    let { pos } = this;
    buffer2[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer2[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE);
  }
  digest() {
    const { buffer: buffer2, outputLen } = this;
    this.digestInto(buffer2);
    const res = buffer2.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer: buffer2, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer2);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
}
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
const SHA224_IV = /* @__PURE__ */ Uint32Array.from([
  3238371032,
  914150663,
  812702999,
  4144912697,
  4290775857,
  1750603025,
  1694076839,
  3204075428
]);
const SHA512_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h: h2, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h2, l];
  }
  return [Ah, Al];
}
const shrSH = (h2, _l, s) => h2 >>> s;
const shrSL = (h2, l, s) => h2 << 32 - s | l >>> s;
const rotrSH = (h2, l, s) => h2 >>> s | l << 32 - s;
const rotrSL = (h2, l, s) => h2 << 32 - s | l >>> s;
const rotrBH = (h2, l, s) => h2 << 64 - s | l >>> s - 32;
const rotrBL = (h2, l, s) => h2 >>> s - 32 | l << 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
const SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A: A2, B: B2, C: C2, D: D2, E: E2, F: F2, G: G2, H: H2 } = this;
    return [A2, B2, C2, D2, E2, F2, G2, H2];
  }
  // prettier-ignore
  set(A2, B2, C2, D2, E2, F2, G2, H2) {
    this.A = A2 | 0;
    this.B = B2 | 0;
    this.C = C2 | 0;
    this.D = D2 | 0;
    this.E = E2 | 0;
    this.F = F2 | 0;
    this.G = G2 | 0;
    this.H = H2 | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A: A2, B: B2, C: C2, D: D2, E: E2, F: F2, G: G2, H: H2 } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E2, 6) ^ rotr(E2, 11) ^ rotr(E2, 25);
      const T1 = H2 + sigma1 + Chi(E2, F2, G2) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A2, 2) ^ rotr(A2, 13) ^ rotr(A2, 22);
      const T2 = sigma0 + Maj(A2, B2, C2) | 0;
      H2 = G2;
      G2 = F2;
      F2 = E2;
      E2 = D2 + T1 | 0;
      D2 = C2;
      C2 = B2;
      B2 = A2;
      A2 = T1 + T2 | 0;
    }
    A2 = A2 + this.A | 0;
    B2 = B2 + this.B | 0;
    C2 = C2 + this.C | 0;
    D2 = D2 + this.D | 0;
    E2 = E2 + this.E | 0;
    F2 = F2 + this.F | 0;
    G2 = G2 + this.G | 0;
    H2 = H2 + this.H | 0;
    this.set(A2, B2, C2, D2, E2, F2, G2, H2);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
}
class SHA224 extends SHA256 {
  constructor() {
    super(28);
    this.A = SHA224_IV[0] | 0;
    this.B = SHA224_IV[1] | 0;
    this.C = SHA224_IV[2] | 0;
    this.D = SHA224_IV[3] | 0;
    this.E = SHA224_IV[4] | 0;
    this.F = SHA224_IV[5] | 0;
    this.G = SHA224_IV[6] | 0;
    this.H = SHA224_IV[7] | 0;
  }
}
const K512 = /* @__PURE__ */ (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
const SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
const SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
class SHA512 extends HashMD {
  constructor(outputLen = 64) {
    super(128, outputLen, 16, false);
    this.Ah = SHA512_IV[0] | 0;
    this.Al = SHA512_IV[1] | 0;
    this.Bh = SHA512_IV[2] | 0;
    this.Bl = SHA512_IV[3] | 0;
    this.Ch = SHA512_IV[4] | 0;
    this.Cl = SHA512_IV[5] | 0;
    this.Dh = SHA512_IV[6] | 0;
    this.Dl = SHA512_IV[7] | 0;
    this.Eh = SHA512_IV[8] | 0;
    this.El = SHA512_IV[9] | 0;
    this.Fh = SHA512_IV[10] | 0;
    this.Fl = SHA512_IV[11] | 0;
    this.Gh = SHA512_IV[12] | 0;
    this.Gl = SHA512_IV[13] | 0;
    this.Hh = SHA512_IV[14] | 0;
    this.Hl = SHA512_IV[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const sha256$1 = /* @__PURE__ */ createHasher$1(() => new SHA256());
const sha224$2 = /* @__PURE__ */ createHasher$1(() => new SHA224());
const sha512 = /* @__PURE__ */ createHasher$1(() => new SHA512());
const sha256 = sha256$1;
const sha224$1 = sha224$2;
function sha224(data) {
  return sha224$1.create().update(new Uint8Array(data)).digest();
}
const JSON_KEY_PRINCIPAL = "__principal__";
const SELF_AUTHENTICATING_SUFFIX = 2;
const ANONYMOUS_SUFFIX = 4;
const MANAGEMENT_CANISTER_PRINCIPAL_TEXT_STR = "aaaaa-aa";
const fromHexString = (hexString) => {
  var _a2;
  return new Uint8Array(((_a2 = hexString.match(/.{1,2}/g)) !== null && _a2 !== void 0 ? _a2 : []).map((byte) => parseInt(byte, 16)));
};
const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
let Principal$1 = class Principal {
  constructor(_arr) {
    this._arr = _arr;
    this._isPrincipal = true;
  }
  static anonymous() {
    return new this(new Uint8Array([ANONYMOUS_SUFFIX]));
  }
  /**
   * Utility method, returning the principal representing the management canister, decoded from the hex string `'aaaaa-aa'`
   * @returns {Principal} principal of the management canister
   */
  static managementCanister() {
    return this.fromText(MANAGEMENT_CANISTER_PRINCIPAL_TEXT_STR);
  }
  static selfAuthenticating(publicKey) {
    const sha = sha224(publicKey);
    return new this(new Uint8Array([...sha, SELF_AUTHENTICATING_SUFFIX]));
  }
  static from(other) {
    if (typeof other === "string") {
      return Principal.fromText(other);
    } else if (Object.getPrototypeOf(other) === Uint8Array.prototype) {
      return new Principal(other);
    } else if (typeof other === "object" && other !== null && other._isPrincipal === true) {
      return new Principal(other._arr);
    }
    throw new Error(`Impossible to convert ${JSON.stringify(other)} to Principal.`);
  }
  static fromHex(hex) {
    return new this(fromHexString(hex));
  }
  static fromText(text) {
    let maybePrincipal = text;
    if (text.includes(JSON_KEY_PRINCIPAL)) {
      const obj = JSON.parse(text);
      if (JSON_KEY_PRINCIPAL in obj) {
        maybePrincipal = obj[JSON_KEY_PRINCIPAL];
      }
    }
    const canisterIdNoDash = maybePrincipal.toLowerCase().replace(/-/g, "");
    let arr = decode$2(canisterIdNoDash);
    arr = arr.slice(4, arr.length);
    const principal = new this(arr);
    if (principal.toText() !== maybePrincipal) {
      throw new Error(`Principal "${principal.toText()}" does not have a valid checksum (original value "${maybePrincipal}" may not be a valid Principal ID).`);
    }
    return principal;
  }
  static fromUint8Array(arr) {
    return new this(arr);
  }
  isAnonymous() {
    return this._arr.byteLength === 1 && this._arr[0] === ANONYMOUS_SUFFIX;
  }
  toUint8Array() {
    return this._arr;
  }
  toHex() {
    return toHexString(this._arr).toUpperCase();
  }
  toText() {
    const checksumArrayBuf = new ArrayBuffer(4);
    const view = new DataView(checksumArrayBuf);
    view.setUint32(0, getCrc32(this._arr));
    const checksum = new Uint8Array(checksumArrayBuf);
    const bytes = Uint8Array.from(this._arr);
    const array = new Uint8Array([...checksum, ...bytes]);
    const result = encode$2(array);
    const matches = result.match(/.{1,5}/g);
    if (!matches) {
      throw new Error();
    }
    return matches.join("-");
  }
  toString() {
    return this.toText();
  }
  /**
   * Serializes to JSON
   * @returns {JsonnablePrincipal} a JSON object with a single key, {@link JSON_KEY_PRINCIPAL}, whose value is the principal as a string
   */
  toJSON() {
    return { [JSON_KEY_PRINCIPAL]: this.toText() };
  }
  /**
   * Utility method taking a Principal to compare against. Used for determining canister ranges in certificate verification
   * @param {Principal} other - a {@link Principal} to compare
   * @returns {'lt' | 'eq' | 'gt'} `'lt' | 'eq' | 'gt'` a string, representing less than, equal to, or greater than
   */
  compareTo(other) {
    for (let i = 0; i < Math.min(this._arr.length, other._arr.length); i++) {
      if (this._arr[i] < other._arr[i])
        return "lt";
      else if (this._arr[i] > other._arr[i])
        return "gt";
    }
    if (this._arr.length < other._arr.length)
      return "lt";
    if (this._arr.length > other._arr.length)
      return "gt";
    return "eq";
  }
  /**
   * Utility method checking whether a provided Principal is less than or equal to the current one using the {@link Principal.compareTo} method
   * @param other a {@link Principal} to compare
   * @returns {boolean} boolean
   */
  ltEq(other) {
    const cmp = this.compareTo(other);
    return cmp == "lt" || cmp == "eq";
  }
  /**
   * Utility method checking whether a provided Principal is greater than or equal to the current one using the {@link Principal.compareTo} method
   * @param other a {@link Principal} to compare
   * @returns {boolean} boolean
   */
  gtEq(other) {
    const cmp = this.compareTo(other);
    return cmp == "gt" || cmp == "eq";
  }
};
const esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JSON_KEY_PRINCIPAL,
  Principal: Principal$1
}, Symbol.toStringTag, { value: "Module" }));
function concat$1(...buffers) {
  const result = new Uint8Array(buffers.reduce((acc, curr) => acc + curr.byteLength, 0));
  let index2 = 0;
  for (const b2 of buffers) {
    result.set(new Uint8Array(b2), index2);
    index2 += b2.byteLength;
  }
  return result.buffer;
}
function toHex(buffer2) {
  return [...new Uint8Array(buffer2)].map((x2) => x2.toString(16).padStart(2, "0")).join("");
}
const hexRe = new RegExp(/^[0-9a-fA-F]+$/);
function fromHex(hex) {
  if (!hexRe.test(hex)) {
    throw new Error("Invalid hexadecimal string.");
  }
  const buffer2 = [...hex].reduce((acc, curr, i) => {
    acc[i / 2 | 0] = (acc[i / 2 | 0] || "") + curr;
    return acc;
  }, []).map((x2) => Number.parseInt(x2, 16));
  return new Uint8Array(buffer2).buffer;
}
function compare$1(b1, b2) {
  if (b1.byteLength !== b2.byteLength) {
    return b1.byteLength - b2.byteLength;
  }
  const u1 = new Uint8Array(b1);
  const u2 = new Uint8Array(b2);
  for (let i = 0; i < u1.length; i++) {
    if (u1[i] !== u2[i]) {
      return u1[i] - u2[i];
    }
  }
  return 0;
}
function bufEquals(b1, b2) {
  return compare$1(b1, b2) === 0;
}
function uint8ToBuf$1(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength).buffer;
}
function bufFromBufLike$1(bufLike) {
  if (bufLike instanceof Uint8Array) {
    return uint8ToBuf$1(bufLike);
  }
  if (bufLike instanceof ArrayBuffer) {
    return bufLike;
  }
  if (Array.isArray(bufLike)) {
    return uint8ToBuf$1(new Uint8Array(bufLike));
  }
  if ("buffer" in bufLike) {
    return bufFromBufLike$1(bufLike.buffer);
  }
  return uint8ToBuf$1(new Uint8Array(bufLike));
}
class AgentError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "AgentError";
    this.__proto__ = AgentError.prototype;
    Object.setPrototypeOf(this, AgentError.prototype);
  }
}
function concat(...buffers) {
  const result = new Uint8Array(buffers.reduce((acc, curr) => acc + curr.byteLength, 0));
  let index2 = 0;
  for (const b2 of buffers) {
    result.set(new Uint8Array(b2), index2);
    index2 += b2.byteLength;
  }
  return result;
}
class PipeArrayBuffer {
  /**
   * Creates a new instance of a pipe
   * @param buffer an optional buffer to start with
   * @param length an optional amount of bytes to use for the length.
   */
  constructor(buffer2, length = (buffer2 === null || buffer2 === void 0 ? void 0 : buffer2.byteLength) || 0) {
    this._buffer = bufFromBufLike(buffer2 || new ArrayBuffer(0));
    this._view = new Uint8Array(this._buffer, 0, length);
  }
  /**
   * Save a checkpoint of the reading view (for backtracking)
   */
  save() {
    return this._view;
  }
  /**
   * Restore a checkpoint of the reading view (for backtracking)
   * @param checkPoint a previously saved checkpoint
   */
  restore(checkPoint) {
    this._view = checkPoint;
  }
  get buffer() {
    return bufFromBufLike(this._view.slice());
  }
  get byteLength() {
    return this._view.byteLength;
  }
  /**
   * Read `num` number of bytes from the front of the pipe.
   * @param num The number of bytes to read.
   */
  read(num) {
    const result = this._view.subarray(0, num);
    this._view = this._view.subarray(num);
    return result.slice().buffer;
  }
  readUint8() {
    const result = this._view[0];
    this._view = this._view.subarray(1);
    return result;
  }
  /**
   * Write a buffer to the end of the pipe.
   * @param buf The bytes to write.
   */
  write(buf) {
    const b2 = new Uint8Array(buf);
    const offset = this._view.byteLength;
    if (this._view.byteOffset + this._view.byteLength + b2.byteLength >= this._buffer.byteLength) {
      this.alloc(b2.byteLength);
    } else {
      this._view = new Uint8Array(this._buffer, this._view.byteOffset, this._view.byteLength + b2.byteLength);
    }
    this._view.set(b2, offset);
  }
  /**
   * Whether or not there is more data to read from the buffer
   */
  get end() {
    return this._view.byteLength === 0;
  }
  /**
   * Allocate a fixed amount of memory in the buffer. This does not affect the view.
   * @param amount A number of bytes to add to the buffer.
   */
  alloc(amount) {
    const b2 = new ArrayBuffer((this._buffer.byteLength + amount) * 1.2 | 0);
    const v2 = new Uint8Array(b2, 0, this._view.byteLength + amount);
    v2.set(this._view);
    this._buffer = b2;
    this._view = v2;
  }
}
function uint8ToBuf(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength).buffer;
}
function bufFromBufLike(bufLike) {
  if (bufLike instanceof Uint8Array) {
    return uint8ToBuf(bufLike);
  }
  if (bufLike instanceof ArrayBuffer) {
    return bufLike;
  }
  if (Array.isArray(bufLike)) {
    return uint8ToBuf(new Uint8Array(bufLike));
  }
  if ("buffer" in bufLike) {
    return bufFromBufLike(bufLike.buffer);
  }
  return uint8ToBuf(new Uint8Array(bufLike));
}
function idlHash(s) {
  const utf8encoder = new TextEncoder();
  const array = utf8encoder.encode(s);
  let h2 = 0;
  for (const c of array) {
    h2 = (h2 * 223 + c) % 2 ** 32;
  }
  return h2;
}
function idlLabelToId(label) {
  if (/^_\d+_$/.test(label) || /^_0x[0-9a-fA-F]+_$/.test(label)) {
    const num = +label.slice(1, -1);
    if (Number.isSafeInteger(num) && num >= 0 && num < 2 ** 32) {
      return num;
    }
  }
  return idlHash(label);
}
function eob() {
  throw new Error("unexpected end of buffer");
}
function safeRead(pipe, num) {
  if (pipe.byteLength < num) {
    eob();
  }
  return pipe.read(num);
}
function safeReadUint8(pipe) {
  const byte = pipe.readUint8();
  if (byte === void 0) {
    eob();
  }
  return byte;
}
function lebEncode(value2) {
  if (typeof value2 === "number") {
    value2 = BigInt(value2);
  }
  if (value2 < BigInt(0)) {
    throw new Error("Cannot leb encode negative values.");
  }
  const byteLength = (value2 === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value2)))) + 1;
  const pipe = new PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
  while (true) {
    const i = Number(value2 & BigInt(127));
    value2 /= BigInt(128);
    if (value2 === BigInt(0)) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  return pipe.buffer;
}
function lebDecode(pipe) {
  let weight = BigInt(1);
  let value2 = BigInt(0);
  let byte;
  do {
    byte = safeReadUint8(pipe);
    value2 += BigInt(byte & 127).valueOf() * weight;
    weight *= BigInt(128);
  } while (byte >= 128);
  return value2;
}
function slebEncode(value2) {
  if (typeof value2 === "number") {
    value2 = BigInt(value2);
  }
  const isNeg = value2 < BigInt(0);
  if (isNeg) {
    value2 = -value2 - BigInt(1);
  }
  const byteLength = (value2 === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(value2)))) + 1;
  const pipe = new PipeArrayBuffer(new ArrayBuffer(byteLength), 0);
  while (true) {
    const i = getLowerBytes(value2);
    value2 /= BigInt(128);
    if (isNeg && value2 === BigInt(0) && (i & 64) !== 0 || !isNeg && value2 === BigInt(0) && (i & 64) === 0) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  function getLowerBytes(num) {
    const bytes = num % BigInt(128);
    if (isNeg) {
      return Number(BigInt(128) - bytes - BigInt(1));
    } else {
      return Number(bytes);
    }
  }
  return pipe.buffer;
}
function slebDecode(pipe) {
  const pipeView = new Uint8Array(pipe.buffer);
  let len = 0;
  for (; len < pipeView.byteLength; len++) {
    if (pipeView[len] < 128) {
      if ((pipeView[len] & 64) === 0) {
        return lebDecode(pipe);
      }
      break;
    }
  }
  const bytes = new Uint8Array(safeRead(pipe, len + 1));
  let value2 = BigInt(0);
  for (let i = bytes.byteLength - 1; i >= 0; i--) {
    value2 = value2 * BigInt(128) + BigInt(128 - (bytes[i] & 127) - 1);
  }
  return -value2 - BigInt(1);
}
function writeUIntLE(value2, byteLength) {
  if (BigInt(value2) < BigInt(0)) {
    throw new Error("Cannot write negative values.");
  }
  return writeIntLE(value2, byteLength);
}
function writeIntLE(value2, byteLength) {
  value2 = BigInt(value2);
  const pipe = new PipeArrayBuffer(new ArrayBuffer(Math.min(1, byteLength)), 0);
  let i = 0;
  let mul = BigInt(256);
  let sub = BigInt(0);
  let byte = Number(value2 % mul);
  pipe.write(new Uint8Array([byte]));
  while (++i < byteLength) {
    if (value2 < 0 && sub === BigInt(0) && byte !== 0) {
      sub = BigInt(1);
    }
    byte = Number((value2 / mul - sub) % BigInt(256));
    pipe.write(new Uint8Array([byte]));
    mul *= BigInt(256);
  }
  return pipe.buffer;
}
function readUIntLE(pipe, byteLength) {
  let val = BigInt(safeReadUint8(pipe));
  let mul = BigInt(1);
  let i = 0;
  while (++i < byteLength) {
    mul *= BigInt(256);
    const byte = BigInt(safeReadUint8(pipe));
    val = val + mul * byte;
  }
  return val;
}
function readIntLE(pipe, byteLength) {
  let val = readUIntLE(pipe, byteLength);
  const mul = BigInt(2) ** (BigInt(8) * BigInt(byteLength - 1) + BigInt(7));
  if (val >= mul) {
    val -= mul * BigInt(2);
  }
  return val;
}
function iexp2(n) {
  const nBig = BigInt(n);
  if (n < 0) {
    throw new RangeError("Input must be non-negative");
  }
  return BigInt(1) << nBig;
}
const magicNumber = "DIDL";
const toReadableString_max = 400;
function zipWith(xs, ys, f) {
  return xs.map((x2, i) => f(x2, ys[i]));
}
class TypeTable {
  constructor() {
    this._typs = [];
    this._idx = /* @__PURE__ */ new Map();
  }
  has(obj) {
    return this._idx.has(obj.name);
  }
  add(type, buf) {
    const idx = this._typs.length;
    this._idx.set(type.name, idx);
    this._typs.push(buf);
  }
  merge(obj, knot) {
    const idx = this._idx.get(obj.name);
    const knotIdx = this._idx.get(knot);
    if (idx === void 0) {
      throw new Error("Missing type index for " + obj);
    }
    if (knotIdx === void 0) {
      throw new Error("Missing type index for " + knot);
    }
    this._typs[idx] = this._typs[knotIdx];
    this._typs.splice(knotIdx, 1);
    this._idx.delete(knot);
  }
  encode() {
    const len = lebEncode(this._typs.length);
    const buf = concat(...this._typs);
    return concat(len, buf);
  }
  indexOf(typeName) {
    if (!this._idx.has(typeName)) {
      throw new Error("Missing type index for " + typeName);
    }
    return slebEncode(this._idx.get(typeName) || 0);
  }
}
class Visitor {
  visitType(t, data) {
    throw new Error("Not implemented");
  }
  visitPrimitive(t, data) {
    return this.visitType(t, data);
  }
  visitEmpty(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitBool(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitNull(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitReserved(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitText(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitNumber(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitInt(t, data) {
    return this.visitNumber(t, data);
  }
  visitNat(t, data) {
    return this.visitNumber(t, data);
  }
  visitFloat(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitFixedInt(t, data) {
    return this.visitNumber(t, data);
  }
  visitFixedNat(t, data) {
    return this.visitNumber(t, data);
  }
  visitPrincipal(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitConstruct(t, data) {
    return this.visitType(t, data);
  }
  visitVec(t, ty, data) {
    return this.visitConstruct(t, data);
  }
  visitOpt(t, ty, data) {
    return this.visitConstruct(t, data);
  }
  visitRecord(t, fields, data) {
    return this.visitConstruct(t, data);
  }
  visitTuple(t, components, data) {
    const fields = components.map((ty, i) => [`_${i}_`, ty]);
    return this.visitRecord(t, fields, data);
  }
  visitVariant(t, fields, data) {
    return this.visitConstruct(t, data);
  }
  visitRec(t, ty, data) {
    return this.visitConstruct(ty, data);
  }
  visitFunc(t, data) {
    return this.visitConstruct(t, data);
  }
  visitService(t, data) {
    return this.visitConstruct(t, data);
  }
}
class Type {
  /* Display type name */
  display() {
    return this.name;
  }
  valueToString(x2) {
    return toReadableString(x2);
  }
  /* Implement `T` in the IDL spec, only needed for non-primitive types */
  buildTypeTable(typeTable) {
    if (!typeTable.has(this)) {
      this._buildTypeTableImpl(typeTable);
    }
  }
}
class PrimitiveType extends Type {
  checkType(t) {
    if (this.name !== t.name) {
      throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
    }
    return t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _buildTypeTableImpl(typeTable) {
    return;
  }
}
class ConstructType extends Type {
  checkType(t) {
    if (t instanceof RecClass) {
      const ty = t.getType();
      if (typeof ty === "undefined") {
        throw new Error("type mismatch with uninitialized type");
      }
      return ty;
    }
    throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
  }
  encodeType(typeTable) {
    return typeTable.indexOf(this.name);
  }
}
class EmptyClass extends PrimitiveType {
  accept(v2, d2) {
    return v2.visitEmpty(this, d2);
  }
  covariant(x2) {
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    throw new Error("Empty cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Empty cannot appear as a value");
  }
  encodeType() {
    return slebEncode(
      -17
      /* IDLTypeIds.Empty */
    );
  }
  decodeValue() {
    throw new Error("Empty cannot appear as an output");
  }
  get name() {
    return "empty";
  }
}
class UnknownClass extends Type {
  checkType(t) {
    throw new Error("Method not implemented for unknown.");
  }
  accept(v2, d2) {
    throw v2.visitType(this, d2);
  }
  covariant(x2) {
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    throw new Error("Unknown cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Unknown cannot appear as a value");
  }
  encodeType() {
    throw new Error("Unknown cannot be serialized");
  }
  decodeValue(b2, t) {
    let decodedValue = t.decodeValue(b2, t);
    if (Object(decodedValue) !== decodedValue) {
      decodedValue = Object(decodedValue);
    }
    let typeFunc;
    if (t instanceof RecClass) {
      typeFunc = () => t.getType();
    } else {
      typeFunc = () => t;
    }
    Object.defineProperty(decodedValue, "type", {
      value: typeFunc,
      writable: true,
      enumerable: false,
      configurable: true
    });
    return decodedValue;
  }
  _buildTypeTableImpl() {
    throw new Error("Unknown cannot be serialized");
  }
  get name() {
    return "Unknown";
  }
}
class BoolClass extends PrimitiveType {
  accept(v2, d2) {
    return v2.visitBool(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "boolean")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return new Uint8Array([x2 ? 1 : 0]);
  }
  encodeType() {
    return slebEncode(
      -2
      /* IDLTypeIds.Bool */
    );
  }
  decodeValue(b2, t) {
    this.checkType(t);
    switch (safeReadUint8(b2)) {
      case 0:
        return false;
      case 1:
        return true;
      default:
        throw new Error("Boolean value out of range");
    }
  }
  get name() {
    return "bool";
  }
}
class NullClass extends PrimitiveType {
  accept(v2, d2) {
    return v2.visitNull(this, d2);
  }
  covariant(x2) {
    if (x2 === null)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    return new ArrayBuffer(0);
  }
  encodeType() {
    return slebEncode(
      -1
      /* IDLTypeIds.Null */
    );
  }
  decodeValue(b2, t) {
    this.checkType(t);
    return null;
  }
  get name() {
    return "null";
  }
}
class ReservedClass extends PrimitiveType {
  accept(v2, d2) {
    return v2.visitReserved(this, d2);
  }
  covariant(x2) {
    return true;
  }
  encodeValue() {
    return new ArrayBuffer(0);
  }
  encodeType() {
    return slebEncode(
      -16
      /* IDLTypeIds.Reserved */
    );
  }
  decodeValue(b2, t) {
    if (t.name !== this.name) {
      t.decodeValue(b2, t);
    }
    return null;
  }
  get name() {
    return "reserved";
  }
}
class TextClass extends PrimitiveType {
  accept(v2, d2) {
    return v2.visitText(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "string")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = new TextEncoder().encode(x2);
    const len = lebEncode(buf.byteLength);
    return concat(len, buf);
  }
  encodeType() {
    return slebEncode(
      -15
      /* IDLTypeIds.Text */
    );
  }
  decodeValue(b2, t) {
    this.checkType(t);
    const len = lebDecode(b2);
    const buf = safeRead(b2, Number(len));
    const decoder2 = new TextDecoder("utf8", { fatal: true });
    return decoder2.decode(buf);
  }
  get name() {
    return "text";
  }
  valueToString(x2) {
    return '"' + x2 + '"';
  }
}
class IntClass extends PrimitiveType {
  accept(v2, d2) {
    return v2.visitInt(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "bigint" || Number.isInteger(x2))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return slebEncode(x2);
  }
  encodeType() {
    return slebEncode(
      -4
      /* IDLTypeIds.Int */
    );
  }
  decodeValue(b2, t) {
    this.checkType(t);
    return slebDecode(b2);
  }
  get name() {
    return "int";
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class NatClass extends PrimitiveType {
  accept(v2, d2) {
    return v2.visitNat(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "bigint" && x2 >= BigInt(0) || Number.isInteger(x2) && x2 >= 0)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return lebEncode(x2);
  }
  encodeType() {
    return slebEncode(
      -3
      /* IDLTypeIds.Nat */
    );
  }
  decodeValue(b2, t) {
    this.checkType(t);
    return lebDecode(b2);
  }
  get name() {
    return "nat";
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FloatClass extends PrimitiveType {
  constructor(_bits) {
    super();
    this._bits = _bits;
    if (_bits !== 32 && _bits !== 64) {
      throw new Error("not a valid float type");
    }
  }
  accept(v2, d2) {
    return v2.visitFloat(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "number" || x2 instanceof Number)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = new ArrayBuffer(this._bits / 8);
    const view = new DataView(buf);
    if (this._bits === 32) {
      view.setFloat32(0, x2, true);
    } else {
      view.setFloat64(0, x2, true);
    }
    return buf;
  }
  encodeType() {
    const opcode = this._bits === 32 ? -13 : -14;
    return slebEncode(opcode);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    const bytes = safeRead(b2, this._bits / 8);
    const view = new DataView(bytes);
    if (this._bits === 32) {
      return view.getFloat32(0, true);
    } else {
      return view.getFloat64(0, true);
    }
  }
  get name() {
    return "float" + this._bits;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FixedIntClass extends PrimitiveType {
  constructor(_bits) {
    super();
    this._bits = _bits;
  }
  accept(v2, d2) {
    return v2.visitFixedInt(this, d2);
  }
  covariant(x2) {
    const min = iexp2(this._bits - 1) * BigInt(-1);
    const max = iexp2(this._bits - 1) - BigInt(1);
    let ok = false;
    if (typeof x2 === "bigint") {
      ok = x2 >= min && x2 <= max;
    } else if (Number.isInteger(x2)) {
      const v2 = BigInt(x2);
      ok = v2 >= min && v2 <= max;
    } else {
      ok = false;
    }
    if (ok)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return writeIntLE(x2, this._bits / 8);
  }
  encodeType() {
    const offset = Math.log2(this._bits) - 3;
    return slebEncode(-9 - offset);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    const num = readIntLE(b2, this._bits / 8);
    if (this._bits <= 32) {
      return Number(num);
    } else {
      return num;
    }
  }
  get name() {
    return `int${this._bits}`;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FixedNatClass extends PrimitiveType {
  constructor(_bits) {
    super();
    this._bits = _bits;
  }
  accept(v2, d2) {
    return v2.visitFixedNat(this, d2);
  }
  covariant(x2) {
    const max = iexp2(this._bits);
    let ok = false;
    if (typeof x2 === "bigint" && x2 >= BigInt(0)) {
      ok = x2 < max;
    } else if (Number.isInteger(x2) && x2 >= 0) {
      const v2 = BigInt(x2);
      ok = v2 < max;
    } else {
      ok = false;
    }
    if (ok)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return writeUIntLE(x2, this._bits / 8);
  }
  encodeType() {
    const offset = Math.log2(this._bits) - 3;
    return slebEncode(-5 - offset);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    const num = readUIntLE(b2, this._bits / 8);
    if (this._bits <= 32) {
      return Number(num);
    } else {
      return num;
    }
  }
  get name() {
    return `nat${this._bits}`;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class VecClass extends ConstructType {
  constructor(_type) {
    super();
    this._type = _type;
    this._blobOptimization = false;
    if (_type instanceof FixedNatClass && _type._bits === 8) {
      this._blobOptimization = true;
    }
  }
  accept(v2, d2) {
    return v2.visitVec(this, this._type, d2);
  }
  covariant(x2) {
    const bits = this._type instanceof FixedNatClass ? this._type._bits : this._type instanceof FixedIntClass ? this._type._bits : 0;
    if (ArrayBuffer.isView(x2) && bits == x2.BYTES_PER_ELEMENT * 8 || Array.isArray(x2) && x2.every((v2, idx) => {
      try {
        return this._type.covariant(v2);
      } catch (e3) {
        throw new Error(`Invalid ${this.display()} argument: 

index ${idx} -> ${e3.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const len = lebEncode(x2.length);
    if (this._blobOptimization) {
      return concat(len, new Uint8Array(x2));
    }
    if (ArrayBuffer.isView(x2)) {
      return concat(len, new Uint8Array(x2.buffer));
    }
    const buf = new PipeArrayBuffer(new ArrayBuffer(len.byteLength + x2.length), 0);
    buf.write(len);
    for (const d2 of x2) {
      const encoded = this._type.encodeValue(d2);
      buf.write(new Uint8Array(encoded));
    }
    return buf.buffer;
  }
  _buildTypeTableImpl(typeTable) {
    this._type.buildTypeTable(typeTable);
    const opCode = slebEncode(
      -19
      /* IDLTypeIds.Vector */
    );
    const buffer2 = this._type.encodeType(typeTable);
    typeTable.add(this, concat(opCode, buffer2));
  }
  decodeValue(b2, t) {
    const vec = this.checkType(t);
    if (!(vec instanceof VecClass)) {
      throw new Error("Not a vector type");
    }
    const len = Number(lebDecode(b2));
    if (this._type instanceof FixedNatClass) {
      if (this._type._bits == 8) {
        return new Uint8Array(b2.read(len));
      }
      if (this._type._bits == 16) {
        return new Uint16Array(b2.read(len * 2));
      }
      if (this._type._bits == 32) {
        return new Uint32Array(b2.read(len * 4));
      }
      if (this._type._bits == 64) {
        return new BigUint64Array(b2.read(len * 8));
      }
    }
    if (this._type instanceof FixedIntClass) {
      if (this._type._bits == 8) {
        return new Int8Array(b2.read(len));
      }
      if (this._type._bits == 16) {
        return new Int16Array(b2.read(len * 2));
      }
      if (this._type._bits == 32) {
        return new Int32Array(b2.read(len * 4));
      }
      if (this._type._bits == 64) {
        return new BigInt64Array(b2.read(len * 8));
      }
    }
    const rets = [];
    for (let i = 0; i < len; i++) {
      rets.push(this._type.decodeValue(b2, vec._type));
    }
    return rets;
  }
  get name() {
    return `vec ${this._type.name}`;
  }
  display() {
    return `vec ${this._type.display()}`;
  }
  valueToString(x2) {
    const elements = x2.map((e3) => this._type.valueToString(e3));
    return "vec {" + elements.join("; ") + "}";
  }
}
class OptClass extends ConstructType {
  constructor(_type) {
    super();
    this._type = _type;
  }
  accept(v2, d2) {
    return v2.visitOpt(this, this._type, d2);
  }
  covariant(x2) {
    try {
      if (Array.isArray(x2) && (x2.length === 0 || x2.length === 1 && this._type.covariant(x2[0])))
        return true;
    } catch (e3) {
      throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)} 

-> ${e3.message}`);
    }
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    if (x2.length === 0) {
      return new Uint8Array([0]);
    } else {
      return concat(new Uint8Array([1]), this._type.encodeValue(x2[0]));
    }
  }
  _buildTypeTableImpl(typeTable) {
    this._type.buildTypeTable(typeTable);
    const opCode = slebEncode(
      -18
      /* IDLTypeIds.Opt */
    );
    const buffer2 = this._type.encodeType(typeTable);
    typeTable.add(this, concat(opCode, buffer2));
  }
  decodeValue(b2, t) {
    if (t instanceof NullClass) {
      return [];
    }
    if (t instanceof ReservedClass) {
      return [];
    }
    let wireType = t;
    if (t instanceof RecClass) {
      const ty = t.getType();
      if (typeof ty === "undefined") {
        throw new Error("type mismatch with uninitialized type");
      } else
        wireType = ty;
    }
    if (wireType instanceof OptClass) {
      switch (safeReadUint8(b2)) {
        case 0:
          return [];
        case 1: {
          const checkpoint = b2.save();
          try {
            const v2 = this._type.decodeValue(b2, wireType._type);
            return [v2];
          } catch (e3) {
            b2.restore(checkpoint);
            wireType._type.decodeValue(b2, wireType._type);
            return [];
          }
        }
        default:
          throw new Error("Not an option value");
      }
    } else if (this._type instanceof NullClass || this._type instanceof OptClass || this._type instanceof ReservedClass) {
      wireType.decodeValue(b2, wireType);
      return [];
    } else {
      const checkpoint = b2.save();
      try {
        const v2 = this._type.decodeValue(b2, t);
        return [v2];
      } catch (e3) {
        b2.restore(checkpoint);
        wireType.decodeValue(b2, t);
        return [];
      }
    }
  }
  get name() {
    return `opt ${this._type.name}`;
  }
  display() {
    return `opt ${this._type.display()}`;
  }
  valueToString(x2) {
    if (x2.length === 0) {
      return "null";
    } else {
      return `opt ${this._type.valueToString(x2[0])}`;
    }
  }
}
class RecordClass extends ConstructType {
  constructor(fields = {}) {
    super();
    this._fields = Object.entries(fields).sort((a, b2) => idlLabelToId(a[0]) - idlLabelToId(b2[0]));
  }
  accept(v2, d2) {
    return v2.visitRecord(this, this._fields, d2);
  }
  tryAsTuple() {
    const res = [];
    for (let i = 0; i < this._fields.length; i++) {
      const [key, type] = this._fields[i];
      if (key !== `_${i}_`) {
        return null;
      }
      res.push(type);
    }
    return res;
  }
  covariant(x2) {
    if (typeof x2 === "object" && this._fields.every(([k2, t]) => {
      if (!x2.hasOwnProperty(k2)) {
        throw new Error(`Record is missing key "${k2}".`);
      }
      try {
        return t.covariant(x2[k2]);
      } catch (e3) {
        throw new Error(`Invalid ${this.display()} argument: 

field ${k2} -> ${e3.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const values = this._fields.map(([key]) => x2[key]);
    const bufs = zipWith(this._fields, values, ([, c], d2) => c.encodeValue(d2));
    return concat(...bufs);
  }
  _buildTypeTableImpl(T2) {
    this._fields.forEach(([_2, value2]) => value2.buildTypeTable(T2));
    const opCode = slebEncode(
      -20
      /* IDLTypeIds.Record */
    );
    const len = lebEncode(this._fields.length);
    const fields = this._fields.map(([key, value2]) => concat(lebEncode(idlLabelToId(key)), value2.encodeType(T2)));
    T2.add(this, concat(opCode, len, concat(...fields)));
  }
  decodeValue(b2, t) {
    const record = this.checkType(t);
    if (!(record instanceof RecordClass)) {
      throw new Error("Not a record type");
    }
    const x2 = {};
    let expectedRecordIdx = 0;
    let actualRecordIdx = 0;
    while (actualRecordIdx < record._fields.length) {
      const [hash2, type] = record._fields[actualRecordIdx];
      if (expectedRecordIdx >= this._fields.length) {
        type.decodeValue(b2, type);
        actualRecordIdx++;
        continue;
      }
      const [expectKey, expectType] = this._fields[expectedRecordIdx];
      const expectedId = idlLabelToId(this._fields[expectedRecordIdx][0]);
      const actualId = idlLabelToId(hash2);
      if (expectedId === actualId) {
        x2[expectKey] = expectType.decodeValue(b2, type);
        expectedRecordIdx++;
        actualRecordIdx++;
      } else if (actualId > expectedId) {
        if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
          x2[expectKey] = [];
          expectedRecordIdx++;
        } else {
          throw new Error("Cannot find required field " + expectKey);
        }
      } else {
        type.decodeValue(b2, type);
        actualRecordIdx++;
      }
    }
    for (const [expectKey, expectType] of this._fields.slice(expectedRecordIdx)) {
      if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
        x2[expectKey] = [];
      } else {
        throw new Error("Cannot find required field " + expectKey);
      }
    }
    return x2;
  }
  get name() {
    const fields = this._fields.map(([key, value2]) => key + ":" + value2.name);
    return `record {${fields.join("; ")}}`;
  }
  display() {
    const fields = this._fields.map(([key, value2]) => key + ":" + value2.display());
    return `record {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    const values = this._fields.map(([key]) => x2[key]);
    const fields = zipWith(this._fields, values, ([k2, c], d2) => k2 + "=" + c.valueToString(d2));
    return `record {${fields.join("; ")}}`;
  }
}
class TupleClass extends RecordClass {
  constructor(_components) {
    const x2 = {};
    _components.forEach((e3, i) => x2["_" + i + "_"] = e3);
    super(x2);
    this._components = _components;
  }
  accept(v2, d2) {
    return v2.visitTuple(this, this._components, d2);
  }
  covariant(x2) {
    if (Array.isArray(x2) && x2.length >= this._fields.length && this._components.every((t, i) => {
      try {
        return t.covariant(x2[i]);
      } catch (e3) {
        throw new Error(`Invalid ${this.display()} argument: 

index ${i} -> ${e3.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const bufs = zipWith(this._components, x2, (c, d2) => c.encodeValue(d2));
    return concat(...bufs);
  }
  decodeValue(b2, t) {
    const tuple = this.checkType(t);
    if (!(tuple instanceof TupleClass)) {
      throw new Error("not a tuple type");
    }
    if (tuple._components.length < this._components.length) {
      throw new Error("tuple mismatch");
    }
    const res = [];
    for (const [i, wireType] of tuple._components.entries()) {
      if (i >= this._components.length) {
        wireType.decodeValue(b2, wireType);
      } else {
        res.push(this._components[i].decodeValue(b2, wireType));
      }
    }
    return res;
  }
  display() {
    const fields = this._components.map((value2) => value2.display());
    return `record {${fields.join("; ")}}`;
  }
  valueToString(values) {
    const fields = zipWith(this._components, values, (c, d2) => c.valueToString(d2));
    return `record {${fields.join("; ")}}`;
  }
}
class VariantClass extends ConstructType {
  constructor(fields = {}) {
    super();
    this._fields = Object.entries(fields).sort((a, b2) => idlLabelToId(a[0]) - idlLabelToId(b2[0]));
  }
  accept(v2, d2) {
    return v2.visitVariant(this, this._fields, d2);
  }
  covariant(x2) {
    if (typeof x2 === "object" && Object.entries(x2).length === 1 && this._fields.every(([k2, v2]) => {
      try {
        return !x2.hasOwnProperty(k2) || v2.covariant(x2[k2]);
      } catch (e3) {
        throw new Error(`Invalid ${this.display()} argument: 

variant ${k2} -> ${e3.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    for (let i = 0; i < this._fields.length; i++) {
      const [name, type] = this._fields[i];
      if (x2.hasOwnProperty(name)) {
        const idx = lebEncode(i);
        const buf = type.encodeValue(x2[name]);
        return concat(idx, buf);
      }
    }
    throw Error("Variant has no data: " + x2);
  }
  _buildTypeTableImpl(typeTable) {
    this._fields.forEach(([, type]) => {
      type.buildTypeTable(typeTable);
    });
    const opCode = slebEncode(
      -21
      /* IDLTypeIds.Variant */
    );
    const len = lebEncode(this._fields.length);
    const fields = this._fields.map(([key, value2]) => concat(lebEncode(idlLabelToId(key)), value2.encodeType(typeTable)));
    typeTable.add(this, concat(opCode, len, ...fields));
  }
  decodeValue(b2, t) {
    const variant = this.checkType(t);
    if (!(variant instanceof VariantClass)) {
      throw new Error("Not a variant type");
    }
    const idx = Number(lebDecode(b2));
    if (idx >= variant._fields.length) {
      throw Error("Invalid variant index: " + idx);
    }
    const [wireHash, wireType] = variant._fields[idx];
    for (const [key, expectType] of this._fields) {
      if (idlLabelToId(wireHash) === idlLabelToId(key)) {
        const value2 = expectType.decodeValue(b2, wireType);
        return { [key]: value2 };
      }
    }
    throw new Error("Cannot find field hash " + wireHash);
  }
  get name() {
    const fields = this._fields.map(([key, type]) => key + ":" + type.name);
    return `variant {${fields.join("; ")}}`;
  }
  display() {
    const fields = this._fields.map(([key, type]) => key + (type.name === "null" ? "" : `:${type.display()}`));
    return `variant {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    for (const [name, type] of this._fields) {
      if (x2.hasOwnProperty(name)) {
        const value2 = type.valueToString(x2[name]);
        if (value2 === "null") {
          return `variant {${name}}`;
        } else {
          return `variant {${name}=${value2}}`;
        }
      }
    }
    throw new Error("Variant has no data: " + x2);
  }
}
class RecClass extends ConstructType {
  constructor() {
    super(...arguments);
    this._id = RecClass._counter++;
    this._type = void 0;
  }
  accept(v2, d2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return v2.visitRec(this, this._type, d2);
  }
  fill(t) {
    this._type = t;
  }
  getType() {
    return this._type;
  }
  covariant(x2) {
    if (this._type ? this._type.covariant(x2) : false)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.encodeValue(x2);
  }
  _buildTypeTableImpl(typeTable) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    typeTable.add(this, new Uint8Array([]));
    this._type.buildTypeTable(typeTable);
    typeTable.merge(this, this._type.name);
  }
  decodeValue(b2, t) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.decodeValue(b2, t);
  }
  get name() {
    return `rec_${this._id}`;
  }
  display() {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return `μ${this.name}.${this._type.name}`;
  }
  valueToString(x2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.valueToString(x2);
  }
}
RecClass._counter = 0;
function decodePrincipalId(b2) {
  const x2 = safeReadUint8(b2);
  if (x2 !== 1) {
    throw new Error("Cannot decode principal");
  }
  const len = Number(lebDecode(b2));
  return Principal$1.fromUint8Array(new Uint8Array(safeRead(b2, len)));
}
class PrincipalClass extends PrimitiveType {
  accept(v2, d2) {
    return v2.visitPrincipal(this, d2);
  }
  covariant(x2) {
    if (x2 && x2._isPrincipal)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = x2.toUint8Array();
    const len = lebEncode(buf.byteLength);
    return concat(new Uint8Array([1]), len, buf);
  }
  encodeType() {
    return slebEncode(
      -24
      /* IDLTypeIds.Principal */
    );
  }
  decodeValue(b2, t) {
    this.checkType(t);
    return decodePrincipalId(b2);
  }
  get name() {
    return "principal";
  }
  valueToString(x2) {
    return `${this.name} "${x2.toText()}"`;
  }
}
class FuncClass extends ConstructType {
  constructor(argTypes, retTypes, annotations = []) {
    super();
    this.argTypes = argTypes;
    this.retTypes = retTypes;
    this.annotations = annotations;
  }
  static argsToString(types, v2) {
    if (types.length !== v2.length) {
      throw new Error("arity mismatch");
    }
    return "(" + types.map((t, i) => t.valueToString(v2[i])).join(", ") + ")";
  }
  accept(v2, d2) {
    return v2.visitFunc(this, d2);
  }
  covariant(x2) {
    if (Array.isArray(x2) && x2.length === 2 && x2[0] && x2[0]._isPrincipal && typeof x2[1] === "string")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue([principal, methodName]) {
    const buf = principal.toUint8Array();
    const len = lebEncode(buf.byteLength);
    const canister = concat(new Uint8Array([1]), len, buf);
    const method = new TextEncoder().encode(methodName);
    const methodLen = lebEncode(method.byteLength);
    return concat(new Uint8Array([1]), canister, methodLen, method);
  }
  _buildTypeTableImpl(T2) {
    this.argTypes.forEach((arg) => arg.buildTypeTable(T2));
    this.retTypes.forEach((arg) => arg.buildTypeTable(T2));
    const opCode = slebEncode(
      -22
      /* IDLTypeIds.Func */
    );
    const argLen = lebEncode(this.argTypes.length);
    const args = concat(...this.argTypes.map((arg) => arg.encodeType(T2)));
    const retLen = lebEncode(this.retTypes.length);
    const rets = concat(...this.retTypes.map((arg) => arg.encodeType(T2)));
    const annLen = lebEncode(this.annotations.length);
    const anns = concat(...this.annotations.map((a) => this.encodeAnnotation(a)));
    T2.add(this, concat(opCode, argLen, args, retLen, rets, annLen, anns));
  }
  decodeValue(b2) {
    const x2 = safeReadUint8(b2);
    if (x2 !== 1) {
      throw new Error("Cannot decode function reference");
    }
    const canister = decodePrincipalId(b2);
    const mLen = Number(lebDecode(b2));
    const buf = safeRead(b2, mLen);
    const decoder2 = new TextDecoder("utf8", { fatal: true });
    const method = decoder2.decode(buf);
    return [canister, method];
  }
  get name() {
    const args = this.argTypes.map((arg) => arg.name).join(", ");
    const rets = this.retTypes.map((arg) => arg.name).join(", ");
    const annon = " " + this.annotations.join(" ");
    return `(${args}) -> (${rets})${annon}`;
  }
  valueToString([principal, str]) {
    return `func "${principal.toText()}".${str}`;
  }
  display() {
    const args = this.argTypes.map((arg) => arg.display()).join(", ");
    const rets = this.retTypes.map((arg) => arg.display()).join(", ");
    const annon = " " + this.annotations.join(" ");
    return `(${args}) → (${rets})${annon}`;
  }
  encodeAnnotation(ann) {
    if (ann === "query") {
      return new Uint8Array([1]);
    } else if (ann === "oneway") {
      return new Uint8Array([2]);
    } else if (ann === "composite_query") {
      return new Uint8Array([3]);
    } else {
      throw new Error("Illegal function annotation");
    }
  }
}
class ServiceClass extends ConstructType {
  constructor(fields) {
    super();
    this._fields = Object.entries(fields).sort((a, b2) => {
      if (a[0] < b2[0]) {
        return -1;
      }
      if (a[0] > b2[0]) {
        return 1;
      }
      return 0;
    });
  }
  accept(v2, d2) {
    return v2.visitService(this, d2);
  }
  covariant(x2) {
    if (x2 && x2._isPrincipal)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = x2.toUint8Array();
    const len = lebEncode(buf.length);
    return concat(new Uint8Array([1]), len, buf);
  }
  _buildTypeTableImpl(T2) {
    this._fields.forEach(([_2, func]) => func.buildTypeTable(T2));
    const opCode = slebEncode(
      -23
      /* IDLTypeIds.Service */
    );
    const len = lebEncode(this._fields.length);
    const meths = this._fields.map(([label, func]) => {
      const labelBuf = new TextEncoder().encode(label);
      const labelLen = lebEncode(labelBuf.length);
      return concat(labelLen, labelBuf, func.encodeType(T2));
    });
    T2.add(this, concat(opCode, len, ...meths));
  }
  decodeValue(b2) {
    return decodePrincipalId(b2);
  }
  get name() {
    const fields = this._fields.map(([key, value2]) => key + ":" + value2.name);
    return `service {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    return `service "${x2.toText()}"`;
  }
}
function toReadableString(x2) {
  const str = JSON.stringify(x2, (_key, value2) => typeof value2 === "bigint" ? `BigInt(${value2})` : value2);
  return str && str.length > toReadableString_max ? str.substring(0, toReadableString_max - 3) + "..." : str;
}
function encode$1(argTypes, args) {
  if (args.length < argTypes.length) {
    throw Error("Wrong number of message arguments");
  }
  const typeTable = new TypeTable();
  argTypes.forEach((t) => t.buildTypeTable(typeTable));
  const magic = new TextEncoder().encode(magicNumber);
  const table = typeTable.encode();
  const len = lebEncode(args.length);
  const typs = concat(...argTypes.map((t) => t.encodeType(typeTable)));
  const vals = concat(...zipWith(argTypes, args, (t, x2) => {
    try {
      t.covariant(x2);
    } catch (e3) {
      const err = new Error(e3.message + "\n\n");
      throw err;
    }
    return t.encodeValue(x2);
  }));
  return concat(magic, table, len, typs, vals);
}
function decode$1(retTypes, bytes) {
  const b2 = new PipeArrayBuffer(bytes);
  if (bytes.byteLength < magicNumber.length) {
    throw new Error("Message length smaller than magic number");
  }
  const magicBuffer = safeRead(b2, magicNumber.length);
  const magic = new TextDecoder().decode(magicBuffer);
  if (magic !== magicNumber) {
    throw new Error("Wrong magic number: " + JSON.stringify(magic));
  }
  function readTypeTable(pipe) {
    const typeTable = [];
    const len = Number(lebDecode(pipe));
    for (let i = 0; i < len; i++) {
      const ty = Number(slebDecode(pipe));
      switch (ty) {
        case -18:
        case -19: {
          const t = Number(slebDecode(pipe));
          typeTable.push([ty, t]);
          break;
        }
        case -20:
        case -21: {
          const fields = [];
          let objectLength = Number(lebDecode(pipe));
          let prevHash;
          while (objectLength--) {
            const hash2 = Number(lebDecode(pipe));
            if (hash2 >= Math.pow(2, 32)) {
              throw new Error("field id out of 32-bit range");
            }
            if (typeof prevHash === "number" && prevHash >= hash2) {
              throw new Error("field id collision or not sorted");
            }
            prevHash = hash2;
            const t = Number(slebDecode(pipe));
            fields.push([hash2, t]);
          }
          typeTable.push([ty, fields]);
          break;
        }
        case -22: {
          const args = [];
          let argLength = Number(lebDecode(pipe));
          while (argLength--) {
            args.push(Number(slebDecode(pipe)));
          }
          const returnValues = [];
          let returnValuesLength = Number(lebDecode(pipe));
          while (returnValuesLength--) {
            returnValues.push(Number(slebDecode(pipe)));
          }
          const annotations = [];
          let annotationLength = Number(lebDecode(pipe));
          while (annotationLength--) {
            const annotation = Number(lebDecode(pipe));
            switch (annotation) {
              case 1: {
                annotations.push("query");
                break;
              }
              case 2: {
                annotations.push("oneway");
                break;
              }
              case 3: {
                annotations.push("composite_query");
                break;
              }
              default:
                throw new Error("unknown annotation");
            }
          }
          typeTable.push([ty, [args, returnValues, annotations]]);
          break;
        }
        case -23: {
          let servLength = Number(lebDecode(pipe));
          const methods = [];
          while (servLength--) {
            const nameLength = Number(lebDecode(pipe));
            const funcName = new TextDecoder().decode(safeRead(pipe, nameLength));
            const funcType = slebDecode(pipe);
            methods.push([funcName, funcType]);
          }
          typeTable.push([ty, methods]);
          break;
        }
        default:
          throw new Error("Illegal op_code: " + ty);
      }
    }
    const rawList = [];
    const length = Number(lebDecode(pipe));
    for (let i = 0; i < length; i++) {
      rawList.push(Number(slebDecode(pipe)));
    }
    return [typeTable, rawList];
  }
  const [rawTable, rawTypes] = readTypeTable(b2);
  if (rawTypes.length < retTypes.length) {
    throw new Error("Wrong number of return values");
  }
  const table = rawTable.map((_2) => Rec());
  function getType(t) {
    if (t < -24) {
      throw new Error("future value not supported");
    }
    if (t < 0) {
      switch (t) {
        case -1:
          return Null;
        case -2:
          return Bool;
        case -3:
          return Nat;
        case -4:
          return Int;
        case -5:
          return Nat8;
        case -6:
          return Nat16;
        case -7:
          return Nat32;
        case -8:
          return Nat64;
        case -9:
          return Int8;
        case -10:
          return Int16;
        case -11:
          return Int32;
        case -12:
          return Int64;
        case -13:
          return Float32;
        case -14:
          return Float64;
        case -15:
          return Text;
        case -16:
          return Reserved;
        case -17:
          return Empty;
        case -24:
          return Principal2;
        default:
          throw new Error("Illegal op_code: " + t);
      }
    }
    if (t >= rawTable.length) {
      throw new Error("type index out of range");
    }
    return table[t];
  }
  function buildType(entry) {
    switch (entry[0]) {
      case -19: {
        const ty = getType(entry[1]);
        return Vec(ty);
      }
      case -18: {
        const ty = getType(entry[1]);
        return Opt(ty);
      }
      case -20: {
        const fields = {};
        for (const [hash2, ty] of entry[1]) {
          const name = `_${hash2}_`;
          fields[name] = getType(ty);
        }
        const record = Record(fields);
        const tuple = record.tryAsTuple();
        if (Array.isArray(tuple)) {
          return Tuple(...tuple);
        } else {
          return record;
        }
      }
      case -21: {
        const fields = {};
        for (const [hash2, ty] of entry[1]) {
          const name = `_${hash2}_`;
          fields[name] = getType(ty);
        }
        return Variant(fields);
      }
      case -22: {
        const [args, returnValues, annotations] = entry[1];
        return Func(args.map((t) => getType(t)), returnValues.map((t) => getType(t)), annotations);
      }
      case -23: {
        const rec = {};
        const methods = entry[1];
        for (const [name, typeRef] of methods) {
          let type = getType(typeRef);
          if (type instanceof RecClass) {
            type = type.getType();
          }
          if (!(type instanceof FuncClass)) {
            throw new Error("Illegal service definition: services can only contain functions");
          }
          rec[name] = type;
        }
        return Service(rec);
      }
      default:
        throw new Error("Illegal op_code: " + entry[0]);
    }
  }
  rawTable.forEach((entry, i) => {
    if (entry[0] === -22) {
      const t = buildType(entry);
      table[i].fill(t);
    }
  });
  rawTable.forEach((entry, i) => {
    if (entry[0] !== -22) {
      const t = buildType(entry);
      table[i].fill(t);
    }
  });
  const types = rawTypes.map((t) => getType(t));
  const output = retTypes.map((t, i) => {
    return t.decodeValue(b2, types[i]);
  });
  for (let ind = retTypes.length; ind < types.length; ind++) {
    types[ind].decodeValue(b2, types[ind]);
  }
  if (b2.byteLength > 0) {
    throw new Error("decode: Left-over bytes");
  }
  return output;
}
const Empty = new EmptyClass();
const Reserved = new ReservedClass();
const Unknown = new UnknownClass();
const Bool = new BoolClass();
const Null = new NullClass();
const Text = new TextClass();
const Int = new IntClass();
const Nat = new NatClass();
const Float32 = new FloatClass(32);
const Float64 = new FloatClass(64);
const Int8 = new FixedIntClass(8);
const Int16 = new FixedIntClass(16);
const Int32 = new FixedIntClass(32);
const Int64 = new FixedIntClass(64);
const Nat8 = new FixedNatClass(8);
const Nat16 = new FixedNatClass(16);
const Nat32 = new FixedNatClass(32);
const Nat64 = new FixedNatClass(64);
const Principal2 = new PrincipalClass();
function Tuple(...types) {
  return new TupleClass(types);
}
function Vec(t) {
  return new VecClass(t);
}
function Opt(t) {
  return new OptClass(t);
}
function Record(t) {
  return new RecordClass(t);
}
function Variant(fields) {
  return new VariantClass(fields);
}
function Rec() {
  return new RecClass();
}
function Func(args, ret, annotations = []) {
  return new FuncClass(args, ret, annotations);
}
function Service(t) {
  return new ServiceClass(t);
}
const IDL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Bool,
  BoolClass,
  ConstructType,
  Empty,
  EmptyClass,
  FixedIntClass,
  FixedNatClass,
  Float32,
  Float64,
  FloatClass,
  Func,
  FuncClass,
  Int,
  Int16,
  Int32,
  Int64,
  Int8,
  IntClass,
  Nat,
  Nat16,
  Nat32,
  Nat64,
  Nat8,
  NatClass,
  Null,
  NullClass,
  Opt,
  OptClass,
  PrimitiveType,
  Principal: Principal2,
  PrincipalClass,
  Rec,
  RecClass,
  Record,
  RecordClass,
  Reserved,
  ReservedClass,
  Service,
  ServiceClass,
  Text,
  TextClass,
  Tuple,
  TupleClass,
  Type,
  Unknown,
  UnknownClass,
  Variant,
  VariantClass,
  Vec,
  VecClass,
  Visitor,
  decode: decode$1,
  encode: encode$1
}, Symbol.toStringTag, { value: "Module" }));
var src$1 = {};
var buffer = {};
var hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer) return buffer;
  hasRequiredBuffer = 1;
  (function(exports) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    var base64 = requireBase64Js();
    var ieee7542 = requireIeee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        var proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e3) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      var buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value2, encodingOrOffset, length) {
      if (typeof value2 === "string") {
        return fromString(value2, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value2)) {
        return fromArrayView(value2);
      }
      if (value2 == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value2
        );
      }
      if (isInstance(value2, ArrayBuffer) || value2 && isInstance(value2.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value2, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value2, SharedArrayBuffer) || value2 && isInstance(value2.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value2, encodingOrOffset, length);
      }
      if (typeof value2 === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      var valueOf = value2.valueOf && value2.valueOf();
      if (valueOf != null && valueOf !== value2) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      var b2 = fromObject(value2);
      if (b2) return b2;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value2[Symbol.toPrimitive] === "function") {
        return Buffer2.from(
          value2[Symbol.toPrimitive]("string"),
          encodingOrOffset,
          length
        );
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value2
      );
    }
    Buffer2.from = function(value2, encodingOrOffset, length) {
      return from(value2, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill2, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill2 !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill2, encoding) : createBuffer(size).fill(fill2);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(size, fill2, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      var length = byteLength(string, encoding) | 0;
      var buf = createBuffer(length);
      var actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        var copy2 = new Uint8Array(arrayView);
        return fromArrayBuffer(copy2.buffer, copy2.byteOffset, copy2.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      var buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b2) {
      return b2 != null && b2._isBuffer === true && b2 !== Buffer2.prototype;
    };
    Buffer2.compare = function compare2(a, b2) {
      if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b2, Uint8Array)) b2 = Buffer2.from(b2, b2.offset, b2.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b2)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b2) return 0;
      var x2 = a.length;
      var y = b2.length;
      for (var i = 0, len = Math.min(x2, y); i < len; ++i) {
        if (a[i] !== b2[i]) {
          x2 = a[i];
          y = b2[i];
          break;
        }
      }
      if (x2 < y) return -1;
      if (y < x2) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
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
    Buffer2.concat = function concat2(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer2 = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer2.length) {
            Buffer2.from(buf).copy(buffer2, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer2,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer2, pos);
        }
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      var len = string.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes2(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes2(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b2, n, m) {
      var i = b2[n];
      b2[n] = b2[m];
      b2[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      var length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b2) {
      if (!Buffer2.isBuffer(b2)) throw new TypeError("Argument must be a Buffer");
      if (this === b2) return true;
      return Buffer2.compare(this, b2) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      var str = "";
      var max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x2 = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x2, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x2 = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x2 < y) return -1;
      if (y < x2) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir) return -1;
        else byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j2 = 0; j2 < valLength; j2++) {
            if (read(arr, i + j2) !== read(val, j2)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes2(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function readIntLE2(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee7542.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee7542.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee7542.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee7542.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value2, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value2 > max || value2 < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE2(value2, offset, byteLength2, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value2, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value2 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value2 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value2, offset, byteLength2, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value2, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value2 & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value2 / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 1, 255, 0);
      this[offset] = value2 & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 2, 65535, 0);
      this[offset] = value2 & 255;
      this[offset + 1] = value2 >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 2, 65535, 0);
      this[offset] = value2 >>> 8;
      this[offset + 1] = value2 & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 4, 4294967295, 0);
      this[offset + 3] = value2 >>> 24;
      this[offset + 2] = value2 >>> 16;
      this[offset + 1] = value2 >>> 8;
      this[offset] = value2 & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 4, 4294967295, 0);
      this[offset] = value2 >>> 24;
      this[offset + 1] = value2 >>> 16;
      this[offset + 2] = value2 >>> 8;
      this[offset + 3] = value2 & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE2(value2, offset, byteLength2, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value2, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value2 & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value2 < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value2 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value2, offset, byteLength2, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value2, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value2 & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value2 < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value2 / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 1, 127, -128);
      if (value2 < 0) value2 = 255 + value2 + 1;
      this[offset] = value2 & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 2, 32767, -32768);
      this[offset] = value2 & 255;
      this[offset + 1] = value2 >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 2, 32767, -32768);
      this[offset] = value2 >>> 8;
      this[offset + 1] = value2 & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 4, 2147483647, -2147483648);
      this[offset] = value2 & 255;
      this[offset + 1] = value2 >>> 8;
      this[offset + 2] = value2 >>> 16;
      this[offset + 3] = value2 >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value2, offset, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value2, offset, 4, 2147483647, -2147483648);
      if (value2 < 0) value2 = 4294967295 + value2 + 1;
      this[offset] = value2 >>> 24;
      this[offset + 1] = value2 >>> 16;
      this[offset + 2] = value2 >>> 8;
      this[offset + 3] = value2 & 255;
      return offset + 4;
    };
    function checkIEEE754(buf, value2, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value2, offset, littleEndian, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value2, offset, 4);
      }
      ieee7542.write(buf, value2, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value2, offset, noAssert) {
      return writeFloat(this, value2, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value2, offset, noAssert) {
      return writeFloat(this, value2, offset, false, noAssert);
    };
    function writeDouble(buf, value2, offset, littleEndian, noAssert) {
      value2 = +value2;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value2, offset, 8);
      }
      ieee7542.write(buf, value2, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value2, offset, noAssert) {
      return writeDouble(this, value2, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value2, offset, noAssert) {
      return writeDouble(this, value2, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        var len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes2(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src2, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src2.length) break;
        dst[i + offset] = src2[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function() {
      var alphabet2 = "0123456789abcdef";
      var table = new Array(256);
      for (var i = 0; i < 16; ++i) {
        var i16 = i * 16;
        for (var j2 = 0; j2 < 16; ++j2) {
          table[i16 + j2] = alphabet2[i] + alphabet2[j2];
        }
      }
      return table;
    })();
  })(buffer);
  return buffer;
}
var bignumber$1 = { exports: {} };
var bignumber = bignumber$1.exports;
var hasRequiredBignumber;
function requireBignumber() {
  if (hasRequiredBignumber) return bignumber$1.exports;
  hasRequiredBignumber = 1;
  (function(module) {
    (function(globalObject) {
      var BigNumber, isNumeric2 = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil2 = Math.ceil, mathfloor2 = Math.floor, bignumberError2 = "[BigNumber Error] ", tooManyDigits2 = bignumberError2 + "Number primitive has more than 15 significant digits: ", BASE2 = 1e14, LOG_BASE2 = 14, MAX_SAFE_INTEGER2 = 9007199254740991, POWS_TEN2 = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE2 = 1e7, MAX2 = 1e9;
      function clone2(configObject) {
        var div, convertBase, parseNumeric, P2 = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: " ",
          // non-breaking space
          suffix: ""
        }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
        function BigNumber2(v2, b2) {
          var alphabet2, c, caseChanged, e3, i, isNum, len, str, x2 = this;
          if (!(x2 instanceof BigNumber2)) return new BigNumber2(v2, b2);
          if (b2 == null) {
            if (v2 && v2._isBigNumber === true) {
              x2.s = v2.s;
              if (!v2.c || v2.e > MAX_EXP) {
                x2.c = x2.e = null;
              } else if (v2.e < MIN_EXP) {
                x2.c = [x2.e = 0];
              } else {
                x2.e = v2.e;
                x2.c = v2.c.slice();
              }
              return;
            }
            if ((isNum = typeof v2 == "number") && v2 * 0 == 0) {
              x2.s = 1 / v2 < 0 ? (v2 = -v2, -1) : 1;
              if (v2 === ~~v2) {
                for (e3 = 0, i = v2; i >= 10; i /= 10, e3++) ;
                if (e3 > MAX_EXP) {
                  x2.c = x2.e = null;
                } else {
                  x2.e = e3;
                  x2.c = [v2];
                }
                return;
              }
              str = String(v2);
            } else {
              if (!isNumeric2.test(str = String(v2))) return parseNumeric(x2, str, isNum);
              x2.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
            }
            if ((e3 = str.indexOf(".")) > -1) str = str.replace(".", "");
            if ((i = str.search(/e/i)) > 0) {
              if (e3 < 0) e3 = i;
              e3 += +str.slice(i + 1);
              str = str.substring(0, i);
            } else if (e3 < 0) {
              e3 = str.length;
            }
          } else {
            intCheck2(b2, 2, ALPHABET.length, "Base");
            if (b2 == 10 && alphabetHasNormalDecimalDigits) {
              x2 = new BigNumber2(v2);
              return round(x2, DECIMAL_PLACES + x2.e + 1, ROUNDING_MODE);
            }
            str = String(v2);
            if (isNum = typeof v2 == "number") {
              if (v2 * 0 != 0) return parseNumeric(x2, str, isNum, b2);
              x2.s = 1 / v2 < 0 ? (str = str.slice(1), -1) : 1;
              if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                throw Error(tooManyDigits2 + v2);
              }
            } else {
              x2.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
            alphabet2 = ALPHABET.slice(0, b2);
            e3 = i = 0;
            for (len = str.length; i < len; i++) {
              if (alphabet2.indexOf(c = str.charAt(i)) < 0) {
                if (c == ".") {
                  if (i > e3) {
                    e3 = len;
                    continue;
                  }
                } else if (!caseChanged) {
                  if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                    caseChanged = true;
                    i = -1;
                    e3 = 0;
                    continue;
                  }
                }
                return parseNumeric(x2, String(v2), isNum, b2);
              }
            }
            isNum = false;
            str = convertBase(str, b2, 10, x2.s);
            if ((e3 = str.indexOf(".")) > -1) str = str.replace(".", "");
            else e3 = str.length;
          }
          for (i = 0; str.charCodeAt(i) === 48; i++) ;
          for (len = str.length; str.charCodeAt(--len) === 48; ) ;
          if (str = str.slice(i, ++len)) {
            len -= i;
            if (isNum && BigNumber2.DEBUG && len > 15 && (v2 > MAX_SAFE_INTEGER2 || v2 !== mathfloor2(v2))) {
              throw Error(tooManyDigits2 + x2.s * v2);
            }
            if ((e3 = e3 - i - 1) > MAX_EXP) {
              x2.c = x2.e = null;
            } else if (e3 < MIN_EXP) {
              x2.c = [x2.e = 0];
            } else {
              x2.e = e3;
              x2.c = [];
              i = (e3 + 1) % LOG_BASE2;
              if (e3 < 0) i += LOG_BASE2;
              if (i < len) {
                if (i) x2.c.push(+str.slice(0, i));
                for (len -= LOG_BASE2; i < len; ) {
                  x2.c.push(+str.slice(i, i += LOG_BASE2));
                }
                i = LOG_BASE2 - (str = str.slice(i)).length;
              } else {
                i -= len;
              }
              for (; i--; str += "0") ;
              x2.c.push(+str);
            }
          } else {
            x2.c = [x2.e = 0];
          }
        }
        BigNumber2.clone = clone2;
        BigNumber2.ROUND_UP = 0;
        BigNumber2.ROUND_DOWN = 1;
        BigNumber2.ROUND_CEIL = 2;
        BigNumber2.ROUND_FLOOR = 3;
        BigNumber2.ROUND_HALF_UP = 4;
        BigNumber2.ROUND_HALF_DOWN = 5;
        BigNumber2.ROUND_HALF_EVEN = 6;
        BigNumber2.ROUND_HALF_CEIL = 7;
        BigNumber2.ROUND_HALF_FLOOR = 8;
        BigNumber2.EUCLID = 9;
        BigNumber2.config = BigNumber2.set = function(obj) {
          var p, v2;
          if (obj != null) {
            if (typeof obj == "object") {
              if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                v2 = obj[p];
                intCheck2(v2, 0, MAX2, p);
                DECIMAL_PLACES = v2;
              }
              if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                v2 = obj[p];
                intCheck2(v2, 0, 8, p);
                ROUNDING_MODE = v2;
              }
              if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                v2 = obj[p];
                if (v2 && v2.pop) {
                  intCheck2(v2[0], -MAX2, 0, p);
                  intCheck2(v2[1], 0, MAX2, p);
                  TO_EXP_NEG = v2[0];
                  TO_EXP_POS = v2[1];
                } else {
                  intCheck2(v2, -MAX2, MAX2, p);
                  TO_EXP_NEG = -(TO_EXP_POS = v2 < 0 ? -v2 : v2);
                }
              }
              if (obj.hasOwnProperty(p = "RANGE")) {
                v2 = obj[p];
                if (v2 && v2.pop) {
                  intCheck2(v2[0], -MAX2, -1, p);
                  intCheck2(v2[1], 1, MAX2, p);
                  MIN_EXP = v2[0];
                  MAX_EXP = v2[1];
                } else {
                  intCheck2(v2, -MAX2, MAX2, p);
                  if (v2) {
                    MIN_EXP = -(MAX_EXP = v2 < 0 ? -v2 : v2);
                  } else {
                    throw Error(bignumberError2 + p + " cannot be zero: " + v2);
                  }
                }
              }
              if (obj.hasOwnProperty(p = "CRYPTO")) {
                v2 = obj[p];
                if (v2 === !!v2) {
                  if (v2) {
                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                      CRYPTO = v2;
                    } else {
                      CRYPTO = !v2;
                      throw Error(bignumberError2 + "crypto unavailable");
                    }
                  } else {
                    CRYPTO = v2;
                  }
                } else {
                  throw Error(bignumberError2 + p + " not true or false: " + v2);
                }
              }
              if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                v2 = obj[p];
                intCheck2(v2, 0, 9, p);
                MODULO_MODE = v2;
              }
              if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                v2 = obj[p];
                intCheck2(v2, 0, MAX2, p);
                POW_PRECISION = v2;
              }
              if (obj.hasOwnProperty(p = "FORMAT")) {
                v2 = obj[p];
                if (typeof v2 == "object") FORMAT = v2;
                else throw Error(bignumberError2 + p + " not an object: " + v2);
              }
              if (obj.hasOwnProperty(p = "ALPHABET")) {
                v2 = obj[p];
                if (typeof v2 == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v2)) {
                  alphabetHasNormalDecimalDigits = v2.slice(0, 10) == "0123456789";
                  ALPHABET = v2;
                } else {
                  throw Error(bignumberError2 + p + " invalid: " + v2);
                }
              }
            } else {
              throw Error(bignumberError2 + "Object expected: " + obj);
            }
          }
          return {
            DECIMAL_PLACES,
            ROUNDING_MODE,
            EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
            RANGE: [MIN_EXP, MAX_EXP],
            CRYPTO,
            MODULO_MODE,
            POW_PRECISION,
            FORMAT,
            ALPHABET
          };
        };
        BigNumber2.isBigNumber = function(v2) {
          if (!v2 || v2._isBigNumber !== true) return false;
          if (!BigNumber2.DEBUG) return true;
          var i, n, c = v2.c, e3 = v2.e, s = v2.s;
          out: if ({}.toString.call(c) == "[object Array]") {
            if ((s === 1 || s === -1) && e3 >= -MAX2 && e3 <= MAX2 && e3 === mathfloor2(e3)) {
              if (c[0] === 0) {
                if (e3 === 0 && c.length === 1) return true;
                break out;
              }
              i = (e3 + 1) % LOG_BASE2;
              if (i < 1) i += LOG_BASE2;
              if (String(c[0]).length == i) {
                for (i = 0; i < c.length; i++) {
                  n = c[i];
                  if (n < 0 || n >= BASE2 || n !== mathfloor2(n)) break out;
                }
                if (n !== 0) return true;
              }
            }
          } else if (c === null && e3 === null && (s === null || s === 1 || s === -1)) {
            return true;
          }
          throw Error(bignumberError2 + "Invalid BigNumber: " + v2);
        };
        BigNumber2.maximum = BigNumber2.max = function() {
          return maxOrMin(arguments, -1);
        };
        BigNumber2.minimum = BigNumber2.min = function() {
          return maxOrMin(arguments, 1);
        };
        BigNumber2.random = (function() {
          var pow2_53 = 9007199254740992;
          var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
            return mathfloor2(Math.random() * pow2_53);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(dp) {
            var a, b2, e3, k2, v2, i = 0, c = [], rand = new BigNumber2(ONE);
            if (dp == null) dp = DECIMAL_PLACES;
            else intCheck2(dp, 0, MAX2);
            k2 = mathceil2(dp / LOG_BASE2);
            if (CRYPTO) {
              if (crypto.getRandomValues) {
                a = crypto.getRandomValues(new Uint32Array(k2 *= 2));
                for (; i < k2; ) {
                  v2 = a[i] * 131072 + (a[i + 1] >>> 11);
                  if (v2 >= 9e15) {
                    b2 = crypto.getRandomValues(new Uint32Array(2));
                    a[i] = b2[0];
                    a[i + 1] = b2[1];
                  } else {
                    c.push(v2 % 1e14);
                    i += 2;
                  }
                }
                i = k2 / 2;
              } else if (crypto.randomBytes) {
                a = crypto.randomBytes(k2 *= 7);
                for (; i < k2; ) {
                  v2 = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                  if (v2 >= 9e15) {
                    crypto.randomBytes(7).copy(a, i);
                  } else {
                    c.push(v2 % 1e14);
                    i += 7;
                  }
                }
                i = k2 / 7;
              } else {
                CRYPTO = false;
                throw Error(bignumberError2 + "crypto unavailable");
              }
            }
            if (!CRYPTO) {
              for (; i < k2; ) {
                v2 = random53bitInt();
                if (v2 < 9e15) c[i++] = v2 % 1e14;
              }
            }
            k2 = c[--i];
            dp %= LOG_BASE2;
            if (k2 && dp) {
              v2 = POWS_TEN2[LOG_BASE2 - dp];
              c[i] = mathfloor2(k2 / v2) * v2;
            }
            for (; c[i] === 0; c.pop(), i--) ;
            if (i < 0) {
              c = [e3 = 0];
            } else {
              for (e3 = -1; c[0] === 0; c.splice(0, 1), e3 -= LOG_BASE2) ;
              for (i = 1, v2 = c[0]; v2 >= 10; v2 /= 10, i++) ;
              if (i < LOG_BASE2) e3 -= LOG_BASE2 - i;
            }
            rand.e = e3;
            rand.c = c;
            return rand;
          };
        })();
        BigNumber2.sum = function() {
          var i = 1, args = arguments, sum = new BigNumber2(args[0]);
          for (; i < args.length; ) sum = sum.plus(args[i++]);
          return sum;
        };
        convertBase = /* @__PURE__ */ (function() {
          var decimal = "0123456789";
          function toBaseOut(str, baseIn, baseOut, alphabet2) {
            var j2, arr = [0], arrL, i = 0, len = str.length;
            for (; i < len; ) {
              for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
              arr[0] += alphabet2.indexOf(str.charAt(i++));
              for (j2 = 0; j2 < arr.length; j2++) {
                if (arr[j2] > baseOut - 1) {
                  if (arr[j2 + 1] == null) arr[j2 + 1] = 0;
                  arr[j2 + 1] += arr[j2] / baseOut | 0;
                  arr[j2] %= baseOut;
                }
              }
            }
            return arr.reverse();
          }
          return function(str, baseIn, baseOut, sign, callerIsToString) {
            var alphabet2, d2, e3, k2, r, x2, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
            if (i >= 0) {
              k2 = POW_PRECISION;
              POW_PRECISION = 0;
              str = str.replace(".", "");
              y = new BigNumber2(baseIn);
              x2 = y.pow(str.length - i);
              POW_PRECISION = k2;
              y.c = toBaseOut(
                toFixedPoint2(coeffToString2(x2.c), x2.e, "0"),
                10,
                baseOut,
                decimal
              );
              y.e = y.c.length;
            }
            xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet2 = ALPHABET, decimal) : (alphabet2 = decimal, ALPHABET));
            e3 = k2 = xc.length;
            for (; xc[--k2] == 0; xc.pop()) ;
            if (!xc[0]) return alphabet2.charAt(0);
            if (i < 0) {
              --e3;
            } else {
              x2.c = xc;
              x2.e = e3;
              x2.s = sign;
              x2 = div(x2, y, dp, rm, baseOut);
              xc = x2.c;
              r = x2.r;
              e3 = x2.e;
            }
            d2 = e3 + dp + 1;
            i = xc[d2];
            k2 = baseOut / 2;
            r = r || d2 < 0 || xc[d2 + 1] != null;
            r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : i > k2 || i == k2 && (rm == 4 || r || rm == 6 && xc[d2 - 1] & 1 || rm == (x2.s < 0 ? 8 : 7));
            if (d2 < 1 || !xc[0]) {
              str = r ? toFixedPoint2(alphabet2.charAt(1), -dp, alphabet2.charAt(0)) : alphabet2.charAt(0);
            } else {
              xc.length = d2;
              if (r) {
                for (--baseOut; ++xc[--d2] > baseOut; ) {
                  xc[d2] = 0;
                  if (!d2) {
                    ++e3;
                    xc = [1].concat(xc);
                  }
                }
              }
              for (k2 = xc.length; !xc[--k2]; ) ;
              for (i = 0, str = ""; i <= k2; str += alphabet2.charAt(xc[i++])) ;
              str = toFixedPoint2(str, e3, alphabet2.charAt(0));
            }
            return str;
          };
        })();
        div = /* @__PURE__ */ (function() {
          function multiply(x2, k2, base) {
            var m, temp, xlo, xhi, carry = 0, i = x2.length, klo = k2 % SQRT_BASE2, khi = k2 / SQRT_BASE2 | 0;
            for (x2 = x2.slice(); i--; ) {
              xlo = x2[i] % SQRT_BASE2;
              xhi = x2[i] / SQRT_BASE2 | 0;
              m = khi * xlo + xhi * klo;
              temp = klo * xlo + m % SQRT_BASE2 * SQRT_BASE2 + carry;
              carry = (temp / base | 0) + (m / SQRT_BASE2 | 0) + khi * xhi;
              x2[i] = temp % base;
            }
            if (carry) x2 = [carry].concat(x2);
            return x2;
          }
          function compare22(a, b2, aL, bL) {
            var i, cmp;
            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i = cmp = 0; i < aL; i++) {
                if (a[i] != b2[i]) {
                  cmp = a[i] > b2[i] ? 1 : -1;
                  break;
                }
              }
            }
            return cmp;
          }
          function subtract(a, b2, aL, base) {
            var i = 0;
            for (; aL--; ) {
              a[aL] -= i;
              i = a[aL] < b2[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b2[aL];
            }
            for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
          }
          return function(x2, y, dp, rm, base) {
            var cmp, e3, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x2.s == y.s ? 1 : -1, xc = x2.c, yc = y.c;
            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber2(
                // Return NaN if either NaN, or both Infinity or 0.
                !x2.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                  // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                  xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                )
              );
            }
            q = new BigNumber2(s);
            qc = q.c = [];
            e3 = x2.e - y.e;
            s = dp + e3 + 1;
            if (!base) {
              base = BASE2;
              e3 = bitFloor2(x2.e / LOG_BASE2) - bitFloor2(y.e / LOG_BASE2);
              s = s / LOG_BASE2 | 0;
            }
            for (i = 0; yc[i] == (xc[i] || 0); i++) ;
            if (yc[i] > (xc[i] || 0)) e3--;
            if (s < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i = 0;
              s += 2;
              n = mathfloor2(base / (yc[0] + 1));
              if (n > 1) {
                yc = multiply(yc, n, base);
                xc = multiply(xc, n, base);
                yL = yc.length;
                xL = xc.length;
              }
              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length;
              for (; remL < yL; rem[remL++] = 0) ;
              yz = yc.slice();
              yz = [0].concat(yz);
              yc0 = yc[0];
              if (yc[1] >= base / 2) yc0++;
              do {
                n = 0;
                cmp = compare22(yc, rem, yL, remL);
                if (cmp < 0) {
                  rem0 = rem[0];
                  if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                  n = mathfloor2(rem0 / yc0);
                  if (n > 1) {
                    if (n >= base) n = base - 1;
                    prod = multiply(yc, n, base);
                    prodL = prod.length;
                    remL = rem.length;
                    while (compare22(prod, rem, prodL, remL) == 1) {
                      n--;
                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    if (n == 0) {
                      cmp = n = 1;
                    }
                    prod = yc.slice();
                    prodL = prod.length;
                  }
                  if (prodL < remL) prod = [0].concat(prod);
                  subtract(rem, prod, remL, base);
                  remL = rem.length;
                  if (cmp == -1) {
                    while (compare22(yc, rem, yL, remL) < 1) {
                      n++;
                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n++;
                  rem = [0];
                }
                qc[i++] = n;
                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s--);
              more = rem[0] != null;
              if (!qc[0]) qc.splice(0, 1);
            }
            if (base == BASE2) {
              for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
              round(q, dp + (q.e = i + e3 * LOG_BASE2 - 1) + 1, rm, more);
            } else {
              q.e = e3;
              q.r = +more;
            }
            return q;
          };
        })();
        function format(n, i, rm, id) {
          var c0, e3, ne, len, str;
          if (rm == null) rm = ROUNDING_MODE;
          else intCheck2(rm, 0, 8);
          if (!n.c) return n.toString();
          c0 = n.c[0];
          ne = n.e;
          if (i == null) {
            str = coeffToString2(n.c);
            str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential2(str, ne) : toFixedPoint2(str, ne, "0");
          } else {
            n = round(new BigNumber2(n), i, rm);
            e3 = n.e;
            str = coeffToString2(n.c);
            len = str.length;
            if (id == 1 || id == 2 && (i <= e3 || e3 <= TO_EXP_NEG)) {
              for (; len < i; str += "0", len++) ;
              str = toExponential2(str, e3);
            } else {
              i -= ne + (id === 2 && e3 > ne);
              str = toFixedPoint2(str, e3, "0");
              if (e3 + 1 > len) {
                if (--i > 0) for (str += "."; i--; str += "0") ;
              } else {
                i += e3 - len;
                if (i > 0) {
                  if (e3 + 1 == len) str += ".";
                  for (; i--; str += "0") ;
                }
              }
            }
          }
          return n.s < 0 && c0 ? "-" + str : str;
        }
        function maxOrMin(args, n) {
          var k2, y, i = 1, x2 = new BigNumber2(args[0]);
          for (; i < args.length; i++) {
            y = new BigNumber2(args[i]);
            if (!y.s || (k2 = compare2(x2, y)) === n || k2 === 0 && x2.s === n) {
              x2 = y;
            }
          }
          return x2;
        }
        function normalise(n, c, e3) {
          var i = 1, j2 = c.length;
          for (; !c[--j2]; c.pop()) ;
          for (j2 = c[0]; j2 >= 10; j2 /= 10, i++) ;
          if ((e3 = i + e3 * LOG_BASE2 - 1) > MAX_EXP) {
            n.c = n.e = null;
          } else if (e3 < MIN_EXP) {
            n.c = [n.e = 0];
          } else {
            n.e = e3;
            n.c = c;
          }
          return n;
        }
        parseNumeric = /* @__PURE__ */ (function() {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(x2, str, isNum, b2) {
            var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
            if (isInfinityOrNaN.test(s)) {
              x2.s = isNaN(s) ? null : s < 0 ? -1 : 1;
            } else {
              if (!isNum) {
                s = s.replace(basePrefix, function(m, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                  return !b2 || b2 == base ? p1 : m;
                });
                if (b2) {
                  base = b2;
                  s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                }
                if (str != s) return new BigNumber2(s, base);
              }
              if (BigNumber2.DEBUG) {
                throw Error(bignumberError2 + "Not a" + (b2 ? " base " + b2 : "") + " number: " + str);
              }
              x2.s = null;
            }
            x2.c = x2.e = null;
          };
        })();
        function round(x2, sd, rm, r) {
          var d2, i, j2, k2, n, ni, rd, xc = x2.c, pows10 = POWS_TEN2;
          if (xc) {
            out: {
              for (d2 = 1, k2 = xc[0]; k2 >= 10; k2 /= 10, d2++) ;
              i = sd - d2;
              if (i < 0) {
                i += LOG_BASE2;
                j2 = sd;
                n = xc[ni = 0];
                rd = mathfloor2(n / pows10[d2 - j2 - 1] % 10);
              } else {
                ni = mathceil2((i + 1) / LOG_BASE2);
                if (ni >= xc.length) {
                  if (r) {
                    for (; xc.length <= ni; xc.push(0)) ;
                    n = rd = 0;
                    d2 = 1;
                    i %= LOG_BASE2;
                    j2 = i - LOG_BASE2 + 1;
                  } else {
                    break out;
                  }
                } else {
                  n = k2 = xc[ni];
                  for (d2 = 1; k2 >= 10; k2 /= 10, d2++) ;
                  i %= LOG_BASE2;
                  j2 = i - LOG_BASE2 + d2;
                  rd = j2 < 0 ? 0 : mathfloor2(n / pows10[d2 - j2 - 1] % 10);
                }
              }
              r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
              // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
              // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
              xc[ni + 1] != null || (j2 < 0 ? n : n % pows10[d2 - j2 - 1]);
              r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
              (i > 0 ? j2 > 0 ? n / pows10[d2 - j2] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x2.s < 0 ? 8 : 7));
              if (sd < 1 || !xc[0]) {
                xc.length = 0;
                if (r) {
                  sd -= x2.e + 1;
                  xc[0] = pows10[(LOG_BASE2 - sd % LOG_BASE2) % LOG_BASE2];
                  x2.e = -sd || 0;
                } else {
                  xc[0] = x2.e = 0;
                }
                return x2;
              }
              if (i == 0) {
                xc.length = ni;
                k2 = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k2 = pows10[LOG_BASE2 - i];
                xc[ni] = j2 > 0 ? mathfloor2(n / pows10[d2 - j2] % pows10[j2]) * k2 : 0;
              }
              if (r) {
                for (; ; ) {
                  if (ni == 0) {
                    for (i = 1, j2 = xc[0]; j2 >= 10; j2 /= 10, i++) ;
                    j2 = xc[0] += k2;
                    for (k2 = 1; j2 >= 10; j2 /= 10, k2++) ;
                    if (i != k2) {
                      x2.e++;
                      if (xc[0] == BASE2) xc[0] = 1;
                    }
                    break;
                  } else {
                    xc[ni] += k2;
                    if (xc[ni] != BASE2) break;
                    xc[ni--] = 0;
                    k2 = 1;
                  }
                }
              }
              for (i = xc.length; xc[--i] === 0; xc.pop()) ;
            }
            if (x2.e > MAX_EXP) {
              x2.c = x2.e = null;
            } else if (x2.e < MIN_EXP) {
              x2.c = [x2.e = 0];
            }
          }
          return x2;
        }
        function valueOf(n) {
          var str, e3 = n.e;
          if (e3 === null) return n.toString();
          str = coeffToString2(n.c);
          str = e3 <= TO_EXP_NEG || e3 >= TO_EXP_POS ? toExponential2(str, e3) : toFixedPoint2(str, e3, "0");
          return n.s < 0 ? "-" + str : str;
        }
        P2.absoluteValue = P2.abs = function() {
          var x2 = new BigNumber2(this);
          if (x2.s < 0) x2.s = 1;
          return x2;
        };
        P2.comparedTo = function(y, b2) {
          return compare2(this, new BigNumber2(y, b2));
        };
        P2.decimalPlaces = P2.dp = function(dp, rm) {
          var c, n, v2, x2 = this;
          if (dp != null) {
            intCheck2(dp, 0, MAX2);
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck2(rm, 0, 8);
            return round(new BigNumber2(x2), dp + x2.e + 1, rm);
          }
          if (!(c = x2.c)) return null;
          n = ((v2 = c.length - 1) - bitFloor2(this.e / LOG_BASE2)) * LOG_BASE2;
          if (v2 = c[v2]) for (; v2 % 10 == 0; v2 /= 10, n--) ;
          if (n < 0) n = 0;
          return n;
        };
        P2.dividedBy = P2.div = function(y, b2) {
          return div(this, new BigNumber2(y, b2), DECIMAL_PLACES, ROUNDING_MODE);
        };
        P2.dividedToIntegerBy = P2.idiv = function(y, b2) {
          return div(this, new BigNumber2(y, b2), 0, 1);
        };
        P2.exponentiatedBy = P2.pow = function(n, m) {
          var half, isModExp, i, k2, more, nIsBig, nIsNeg, nIsOdd, y, x2 = this;
          n = new BigNumber2(n);
          if (n.c && !n.isInteger()) {
            throw Error(bignumberError2 + "Exponent not an integer: " + valueOf(n));
          }
          if (m != null) m = new BigNumber2(m);
          nIsBig = n.e > 14;
          if (!x2.c || !x2.c[0] || x2.c[0] == 1 && !x2.e && x2.c.length == 1 || !n.c || !n.c[0]) {
            y = new BigNumber2(Math.pow(+valueOf(x2), nIsBig ? n.s * (2 - isOdd2(n)) : +valueOf(n)));
            return m ? y.mod(m) : y;
          }
          nIsNeg = n.s < 0;
          if (m) {
            if (m.c ? !m.c[0] : !m.s) return new BigNumber2(NaN);
            isModExp = !nIsNeg && x2.isInteger() && m.isInteger();
            if (isModExp) x2 = x2.mod(m);
          } else if (n.e > 9 && (x2.e > 0 || x2.e < -1 || (x2.e == 0 ? x2.c[0] > 1 || nIsBig && x2.c[1] >= 24e7 : x2.c[0] < 8e13 || nIsBig && x2.c[0] <= 9999975e7))) {
            k2 = x2.s < 0 && isOdd2(n) ? -0 : 0;
            if (x2.e > -1) k2 = 1 / k2;
            return new BigNumber2(nIsNeg ? 1 / k2 : k2);
          } else if (POW_PRECISION) {
            k2 = mathceil2(POW_PRECISION / LOG_BASE2 + 2);
          }
          if (nIsBig) {
            half = new BigNumber2(0.5);
            if (nIsNeg) n.s = 1;
            nIsOdd = isOdd2(n);
          } else {
            i = Math.abs(+valueOf(n));
            nIsOdd = i % 2;
          }
          y = new BigNumber2(ONE);
          for (; ; ) {
            if (nIsOdd) {
              y = y.times(x2);
              if (!y.c) break;
              if (k2) {
                if (y.c.length > k2) y.c.length = k2;
              } else if (isModExp) {
                y = y.mod(m);
              }
            }
            if (i) {
              i = mathfloor2(i / 2);
              if (i === 0) break;
              nIsOdd = i % 2;
            } else {
              n = n.times(half);
              round(n, n.e + 1, 1);
              if (n.e > 14) {
                nIsOdd = isOdd2(n);
              } else {
                i = +valueOf(n);
                if (i === 0) break;
                nIsOdd = i % 2;
              }
            }
            x2 = x2.times(x2);
            if (k2) {
              if (x2.c && x2.c.length > k2) x2.c.length = k2;
            } else if (isModExp) {
              x2 = x2.mod(m);
            }
          }
          if (isModExp) return y;
          if (nIsNeg) y = ONE.div(y);
          return m ? y.mod(m) : k2 ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
        };
        P2.integerValue = function(rm) {
          var n = new BigNumber2(this);
          if (rm == null) rm = ROUNDING_MODE;
          else intCheck2(rm, 0, 8);
          return round(n, n.e + 1, rm);
        };
        P2.isEqualTo = P2.eq = function(y, b2) {
          return compare2(this, new BigNumber2(y, b2)) === 0;
        };
        P2.isFinite = function() {
          return !!this.c;
        };
        P2.isGreaterThan = P2.gt = function(y, b2) {
          return compare2(this, new BigNumber2(y, b2)) > 0;
        };
        P2.isGreaterThanOrEqualTo = P2.gte = function(y, b2) {
          return (b2 = compare2(this, new BigNumber2(y, b2))) === 1 || b2 === 0;
        };
        P2.isInteger = function() {
          return !!this.c && bitFloor2(this.e / LOG_BASE2) > this.c.length - 2;
        };
        P2.isLessThan = P2.lt = function(y, b2) {
          return compare2(this, new BigNumber2(y, b2)) < 0;
        };
        P2.isLessThanOrEqualTo = P2.lte = function(y, b2) {
          return (b2 = compare2(this, new BigNumber2(y, b2))) === -1 || b2 === 0;
        };
        P2.isNaN = function() {
          return !this.s;
        };
        P2.isNegative = function() {
          return this.s < 0;
        };
        P2.isPositive = function() {
          return this.s > 0;
        };
        P2.isZero = function() {
          return !!this.c && this.c[0] == 0;
        };
        P2.minus = function(y, b2) {
          var i, j2, t, xLTy, x2 = this, a = x2.s;
          y = new BigNumber2(y, b2);
          b2 = y.s;
          if (!a || !b2) return new BigNumber2(NaN);
          if (a != b2) {
            y.s = -b2;
            return x2.plus(y);
          }
          var xe = x2.e / LOG_BASE2, ye = y.e / LOG_BASE2, xc = x2.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc) return xc ? (y.s = -b2, y) : new BigNumber2(yc ? x2 : NaN);
            if (!xc[0] || !yc[0]) {
              return yc[0] ? (y.s = -b2, y) : new BigNumber2(xc[0] ? x2 : (
                // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                ROUNDING_MODE == 3 ? -0 : 0
              ));
            }
          }
          xe = bitFloor2(xe);
          ye = bitFloor2(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (xLTy = a < 0) {
              a = -a;
              t = xc;
            } else {
              ye = xe;
              t = yc;
            }
            t.reverse();
            for (b2 = a; b2--; t.push(0)) ;
            t.reverse();
          } else {
            j2 = (xLTy = (a = xc.length) < (b2 = yc.length)) ? a : b2;
            for (a = b2 = 0; b2 < j2; b2++) {
              if (xc[b2] != yc[b2]) {
                xLTy = xc[b2] < yc[b2];
                break;
              }
            }
          }
          if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
          }
          b2 = (j2 = yc.length) - (i = xc.length);
          if (b2 > 0) for (; b2--; xc[i++] = 0) ;
          b2 = BASE2 - 1;
          for (; j2 > a; ) {
            if (xc[--j2] < yc[j2]) {
              for (i = j2; i && !xc[--i]; xc[i] = b2) ;
              --xc[i];
              xc[j2] += BASE2;
            }
            xc[j2] -= yc[j2];
          }
          for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
          if (!xc[0]) {
            y.s = ROUNDING_MODE == 3 ? -1 : 1;
            y.c = [y.e = 0];
            return y;
          }
          return normalise(y, xc, ye);
        };
        P2.modulo = P2.mod = function(y, b2) {
          var q, s, x2 = this;
          y = new BigNumber2(y, b2);
          if (!x2.c || !y.s || y.c && !y.c[0]) {
            return new BigNumber2(NaN);
          } else if (!y.c || x2.c && !x2.c[0]) {
            return new BigNumber2(x2);
          }
          if (MODULO_MODE == 9) {
            s = y.s;
            y.s = 1;
            q = div(x2, y, 0, 3);
            y.s = s;
            q.s *= s;
          } else {
            q = div(x2, y, 0, MODULO_MODE);
          }
          y = x2.minus(q.times(y));
          if (!y.c[0] && MODULO_MODE == 1) y.s = x2.s;
          return y;
        };
        P2.multipliedBy = P2.times = function(y, b2) {
          var c, e3, i, j2, k2, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x2 = this, xc = x2.c, yc = (y = new BigNumber2(y, b2)).c;
          if (!xc || !yc || !xc[0] || !yc[0]) {
            if (!x2.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y.c = y.e = y.s = null;
            } else {
              y.s *= x2.s;
              if (!xc || !yc) {
                y.c = y.e = null;
              } else {
                y.c = [0];
                y.e = 0;
              }
            }
            return y;
          }
          e3 = bitFloor2(x2.e / LOG_BASE2) + bitFloor2(y.e / LOG_BASE2);
          y.s *= x2.s;
          xcL = xc.length;
          ycL = yc.length;
          if (xcL < ycL) {
            zc = xc;
            xc = yc;
            yc = zc;
            i = xcL;
            xcL = ycL;
            ycL = i;
          }
          for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
          base = BASE2;
          sqrtBase = SQRT_BASE2;
          for (i = ycL; --i >= 0; ) {
            c = 0;
            ylo = yc[i] % sqrtBase;
            yhi = yc[i] / sqrtBase | 0;
            for (k2 = xcL, j2 = i + k2; j2 > i; ) {
              xlo = xc[--k2] % sqrtBase;
              xhi = xc[k2] / sqrtBase | 0;
              m = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j2] + c;
              c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
              zc[j2--] = xlo % base;
            }
            zc[j2] = c;
          }
          if (c) {
            ++e3;
          } else {
            zc.splice(0, 1);
          }
          return normalise(y, zc, e3);
        };
        P2.negated = function() {
          var x2 = new BigNumber2(this);
          x2.s = -x2.s || null;
          return x2;
        };
        P2.plus = function(y, b2) {
          var t, x2 = this, a = x2.s;
          y = new BigNumber2(y, b2);
          b2 = y.s;
          if (!a || !b2) return new BigNumber2(NaN);
          if (a != b2) {
            y.s = -b2;
            return x2.minus(y);
          }
          var xe = x2.e / LOG_BASE2, ye = y.e / LOG_BASE2, xc = x2.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc) return new BigNumber2(a / 0);
            if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber2(xc[0] ? x2 : a * 0);
          }
          xe = bitFloor2(xe);
          ye = bitFloor2(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (a > 0) {
              ye = xe;
              t = yc;
            } else {
              a = -a;
              t = xc;
            }
            t.reverse();
            for (; a--; t.push(0)) ;
            t.reverse();
          }
          a = xc.length;
          b2 = yc.length;
          if (a - b2 < 0) {
            t = yc;
            yc = xc;
            xc = t;
            b2 = a;
          }
          for (a = 0; b2; ) {
            a = (xc[--b2] = xc[b2] + yc[b2] + a) / BASE2 | 0;
            xc[b2] = BASE2 === xc[b2] ? 0 : xc[b2] % BASE2;
          }
          if (a) {
            xc = [a].concat(xc);
            ++ye;
          }
          return normalise(y, xc, ye);
        };
        P2.precision = P2.sd = function(sd, rm) {
          var c, n, v2, x2 = this;
          if (sd != null && sd !== !!sd) {
            intCheck2(sd, 1, MAX2);
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck2(rm, 0, 8);
            return round(new BigNumber2(x2), sd, rm);
          }
          if (!(c = x2.c)) return null;
          v2 = c.length - 1;
          n = v2 * LOG_BASE2 + 1;
          if (v2 = c[v2]) {
            for (; v2 % 10 == 0; v2 /= 10, n--) ;
            for (v2 = c[0]; v2 >= 10; v2 /= 10, n++) ;
          }
          if (sd && x2.e + 1 > n) n = x2.e + 1;
          return n;
        };
        P2.shiftedBy = function(k2) {
          intCheck2(k2, -MAX_SAFE_INTEGER2, MAX_SAFE_INTEGER2);
          return this.times("1e" + k2);
        };
        P2.squareRoot = P2.sqrt = function() {
          var m, n, r, rep, t, x2 = this, c = x2.c, s = x2.s, e3 = x2.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
          if (s !== 1 || !c || !c[0]) {
            return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x2 : 1 / 0);
          }
          s = Math.sqrt(+valueOf(x2));
          if (s == 0 || s == 1 / 0) {
            n = coeffToString2(c);
            if ((n.length + e3) % 2 == 0) n += "0";
            s = Math.sqrt(+n);
            e3 = bitFloor2((e3 + 1) / 2) - (e3 < 0 || e3 % 2);
            if (s == 1 / 0) {
              n = "5e" + e3;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e3;
            }
            r = new BigNumber2(n);
          } else {
            r = new BigNumber2(s + "");
          }
          if (r.c[0]) {
            e3 = r.e;
            s = e3 + dp;
            if (s < 3) s = 0;
            for (; ; ) {
              t = r;
              r = half.times(t.plus(div(x2, t, dp, 1)));
              if (coeffToString2(t.c).slice(0, s) === (n = coeffToString2(r.c)).slice(0, s)) {
                if (r.e < e3) --s;
                n = n.slice(s - 3, s + 1);
                if (n == "9999" || !rep && n == "4999") {
                  if (!rep) {
                    round(t, t.e + DECIMAL_PLACES + 2, 0);
                    if (t.times(t).eq(x2)) {
                      r = t;
                      break;
                    }
                  }
                  dp += 4;
                  s += 4;
                  rep = 1;
                } else {
                  if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    round(r, r.e + DECIMAL_PLACES + 2, 1);
                    m = !r.times(r).eq(x2);
                  }
                  break;
                }
              }
            }
          }
          return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
        };
        P2.toExponential = function(dp, rm) {
          if (dp != null) {
            intCheck2(dp, 0, MAX2);
            dp++;
          }
          return format(this, dp, rm, 1);
        };
        P2.toFixed = function(dp, rm) {
          if (dp != null) {
            intCheck2(dp, 0, MAX2);
            dp = dp + this.e + 1;
          }
          return format(this, dp, rm);
        };
        P2.toFormat = function(dp, rm, format2) {
          var str, x2 = this;
          if (format2 == null) {
            if (dp != null && rm && typeof rm == "object") {
              format2 = rm;
              rm = null;
            } else if (dp && typeof dp == "object") {
              format2 = dp;
              dp = rm = null;
            } else {
              format2 = FORMAT;
            }
          } else if (typeof format2 != "object") {
            throw Error(bignumberError2 + "Argument not an object: " + format2);
          }
          str = x2.toFixed(dp, rm);
          if (x2.c) {
            var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x2.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
            if (g2) {
              i = g1;
              g1 = g2;
              g2 = i;
              len -= i;
            }
            if (g1 > 0 && len > 0) {
              i = len % g1 || g1;
              intPart = intDigits.substr(0, i);
              for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
              if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
              if (isNeg) intPart = "-" + intPart;
            }
            str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
              new RegExp("\\d{" + g2 + "}\\B", "g"),
              "$&" + (format2.fractionGroupSeparator || "")
            ) : fractionPart) : intPart;
          }
          return (format2.prefix || "") + str + (format2.suffix || "");
        };
        P2.toFraction = function(md) {
          var d2, d0, d1, d22, e3, exp, n, n0, n1, q, r, s, x2 = this, xc = x2.c;
          if (md != null) {
            n = new BigNumber2(md);
            if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
              throw Error(bignumberError2 + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
            }
          }
          if (!xc) return new BigNumber2(x2);
          d2 = new BigNumber2(ONE);
          n1 = d0 = new BigNumber2(ONE);
          d1 = n0 = new BigNumber2(ONE);
          s = coeffToString2(xc);
          e3 = d2.e = s.length - x2.e - 1;
          d2.c[0] = POWS_TEN2[(exp = e3 % LOG_BASE2) < 0 ? LOG_BASE2 + exp : exp];
          md = !md || n.comparedTo(d2) > 0 ? e3 > 0 ? d2 : n1 : n;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n = new BigNumber2(s);
          n0.c[0] = 0;
          for (; ; ) {
            q = div(n, d2, 0, 1);
            d22 = d0.plus(q.times(d1));
            if (d22.comparedTo(md) == 1) break;
            d0 = d1;
            d1 = d22;
            n1 = n0.plus(q.times(d22 = n1));
            n0 = d22;
            d2 = n.minus(q.times(d22 = d2));
            n = d22;
          }
          d22 = div(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d22.times(n1));
          d0 = d0.plus(d22.times(d1));
          n0.s = n1.s = x2.s;
          e3 = e3 * 2;
          r = div(n1, d1, e3, ROUNDING_MODE).minus(x2).abs().comparedTo(
            div(n0, d0, e3, ROUNDING_MODE).minus(x2).abs()
          ) < 1 ? [n1, d1] : [n0, d0];
          MAX_EXP = exp;
          return r;
        };
        P2.toNumber = function() {
          return +valueOf(this);
        };
        P2.toPrecision = function(sd, rm) {
          if (sd != null) intCheck2(sd, 1, MAX2);
          return format(this, sd, rm, 2);
        };
        P2.toString = function(b2) {
          var str, n = this, s = n.s, e3 = n.e;
          if (e3 === null) {
            if (s) {
              str = "Infinity";
              if (s < 0) str = "-" + str;
            } else {
              str = "NaN";
            }
          } else {
            if (b2 == null) {
              str = e3 <= TO_EXP_NEG || e3 >= TO_EXP_POS ? toExponential2(coeffToString2(n.c), e3) : toFixedPoint2(coeffToString2(n.c), e3, "0");
            } else if (b2 === 10 && alphabetHasNormalDecimalDigits) {
              n = round(new BigNumber2(n), DECIMAL_PLACES + e3 + 1, ROUNDING_MODE);
              str = toFixedPoint2(coeffToString2(n.c), n.e, "0");
            } else {
              intCheck2(b2, 2, ALPHABET.length, "Base");
              str = convertBase(toFixedPoint2(coeffToString2(n.c), e3, "0"), 10, b2, s, true);
            }
            if (s < 0 && n.c[0]) str = "-" + str;
          }
          return str;
        };
        P2.valueOf = P2.toJSON = function() {
          return valueOf(this);
        };
        P2._isBigNumber = true;
        if (configObject != null) BigNumber2.set(configObject);
        return BigNumber2;
      }
      function bitFloor2(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
      }
      function coeffToString2(a) {
        var s, z2, i = 1, j2 = a.length, r = a[0] + "";
        for (; i < j2; ) {
          s = a[i++] + "";
          z2 = LOG_BASE2 - s.length;
          for (; z2--; s = "0" + s) ;
          r += s;
        }
        for (j2 = r.length; r.charCodeAt(--j2) === 48; ) ;
        return r.slice(0, j2 + 1 || 1);
      }
      function compare2(x2, y) {
        var a, b2, xc = x2.c, yc = y.c, i = x2.s, j2 = y.s, k2 = x2.e, l = y.e;
        if (!i || !j2) return null;
        a = xc && !xc[0];
        b2 = yc && !yc[0];
        if (a || b2) return a ? b2 ? 0 : -j2 : i;
        if (i != j2) return i;
        a = i < 0;
        b2 = k2 == l;
        if (!xc || !yc) return b2 ? 0 : !xc ^ a ? 1 : -1;
        if (!b2) return k2 > l ^ a ? 1 : -1;
        j2 = (k2 = xc.length) < (l = yc.length) ? k2 : l;
        for (i = 0; i < j2; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
        return k2 == l ? 0 : k2 > l ^ a ? 1 : -1;
      }
      function intCheck2(n, min, max, name) {
        if (n < min || n > max || n !== mathfloor2(n)) {
          throw Error(bignumberError2 + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
        }
      }
      function isOdd2(n) {
        var k2 = n.c.length - 1;
        return bitFloor2(n.e / LOG_BASE2) == k2 && n.c[k2] % 2 != 0;
      }
      function toExponential2(str, e3) {
        return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e3 < 0 ? "e" : "e+") + e3;
      }
      function toFixedPoint2(str, e3, z2) {
        var len, zs;
        if (e3 < 0) {
          for (zs = z2 + "."; ++e3; zs += z2) ;
          str = zs + str;
        } else {
          len = str.length;
          if (++e3 > len) {
            for (zs = z2, e3 -= len; --e3; zs += z2) ;
            str += zs;
          } else if (e3 < len) {
            str = str.slice(0, e3) + "." + str.slice(e3);
          }
        }
        return str;
      }
      BigNumber = clone2();
      BigNumber["default"] = BigNumber.BigNumber = BigNumber;
      if (module.exports) {
        module.exports = BigNumber;
      } else {
        if (!globalObject) {
          globalObject = typeof globalThis != "undefined" && globalThis ? globalThis : window;
        }
        globalObject.BigNumber = BigNumber;
      }
    })(bignumber);
  })(bignumber$1);
  return bignumber$1.exports;
}
var decoder_asm;
var hasRequiredDecoder_asm;
function requireDecoder_asm() {
  if (hasRequiredDecoder_asm) return decoder_asm;
  hasRequiredDecoder_asm = 1;
  decoder_asm = function decodeAsm(stdlib, foreign, buffer2) {
    ;
    var heap = new stdlib.Uint8Array(buffer2);
    var pushInt = foreign.pushInt;
    var pushInt32 = foreign.pushInt32;
    var pushInt32Neg = foreign.pushInt32Neg;
    var pushInt64 = foreign.pushInt64;
    var pushInt64Neg = foreign.pushInt64Neg;
    var pushFloat = foreign.pushFloat;
    var pushFloatSingle = foreign.pushFloatSingle;
    var pushFloatDouble = foreign.pushFloatDouble;
    var pushTrue = foreign.pushTrue;
    var pushFalse = foreign.pushFalse;
    var pushUndefined = foreign.pushUndefined;
    var pushNull = foreign.pushNull;
    var pushInfinity = foreign.pushInfinity;
    var pushInfinityNeg = foreign.pushInfinityNeg;
    var pushNaN = foreign.pushNaN;
    var pushNaNNeg = foreign.pushNaNNeg;
    var pushArrayStart = foreign.pushArrayStart;
    var pushArrayStartFixed = foreign.pushArrayStartFixed;
    var pushArrayStartFixed32 = foreign.pushArrayStartFixed32;
    var pushArrayStartFixed64 = foreign.pushArrayStartFixed64;
    var pushObjectStart = foreign.pushObjectStart;
    var pushObjectStartFixed = foreign.pushObjectStartFixed;
    var pushObjectStartFixed32 = foreign.pushObjectStartFixed32;
    var pushObjectStartFixed64 = foreign.pushObjectStartFixed64;
    var pushByteString = foreign.pushByteString;
    var pushByteStringStart = foreign.pushByteStringStart;
    var pushUtf8String = foreign.pushUtf8String;
    var pushUtf8StringStart = foreign.pushUtf8StringStart;
    var pushSimpleUnassigned = foreign.pushSimpleUnassigned;
    var pushTagStart = foreign.pushTagStart;
    var pushTagStart4 = foreign.pushTagStart4;
    var pushTagStart8 = foreign.pushTagStart8;
    var pushTagUnassigned = foreign.pushTagUnassigned;
    var pushBreak = foreign.pushBreak;
    var pow = stdlib.Math.pow;
    var offset = 0;
    var inputLength = 0;
    var code = 0;
    function parse(input) {
      input = input | 0;
      offset = 0;
      inputLength = input;
      while ((offset | 0) < (inputLength | 0)) {
        code = jumpTable[heap[offset] & 255](heap[offset] | 0) | 0;
        if ((code | 0) > 0) {
          break;
        }
      }
      return code | 0;
    }
    function checkOffset(n) {
      n = n | 0;
      if (((offset | 0) + (n | 0) | 0) < (inputLength | 0)) {
        return 0;
      }
      return 1;
    }
    function readUInt16(n) {
      n = n | 0;
      return heap[n | 0] << 8 | heap[n + 1 | 0] | 0;
    }
    function readUInt32(n) {
      n = n | 0;
      return heap[n | 0] << 24 | heap[n + 1 | 0] << 16 | heap[n + 2 | 0] << 8 | heap[n + 3 | 0] | 0;
    }
    function INT_P(octet) {
      octet = octet | 0;
      pushInt(octet | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function UINT_P_8(octet) {
      octet = octet | 0;
      if (checkOffset(1) | 0) {
        return 1;
      }
      pushInt(heap[offset + 1 | 0] | 0);
      offset = offset + 2 | 0;
      return 0;
    }
    function UINT_P_16(octet) {
      octet = octet | 0;
      if (checkOffset(2) | 0) {
        return 1;
      }
      pushInt(
        readUInt16(offset + 1 | 0) | 0
      );
      offset = offset + 3 | 0;
      return 0;
    }
    function UINT_P_32(octet) {
      octet = octet | 0;
      if (checkOffset(4) | 0) {
        return 1;
      }
      pushInt32(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0
      );
      offset = offset + 5 | 0;
      return 0;
    }
    function UINT_P_64(octet) {
      octet = octet | 0;
      if (checkOffset(8) | 0) {
        return 1;
      }
      pushInt64(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0,
        readUInt16(offset + 5 | 0) | 0,
        readUInt16(offset + 7 | 0) | 0
      );
      offset = offset + 9 | 0;
      return 0;
    }
    function INT_N(octet) {
      octet = octet | 0;
      pushInt(-1 - (octet - 32 | 0) | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function UINT_N_8(octet) {
      octet = octet | 0;
      if (checkOffset(1) | 0) {
        return 1;
      }
      pushInt(
        -1 - (heap[offset + 1 | 0] | 0) | 0
      );
      offset = offset + 2 | 0;
      return 0;
    }
    function UINT_N_16(octet) {
      octet = octet | 0;
      var val = 0;
      if (checkOffset(2) | 0) {
        return 1;
      }
      val = readUInt16(offset + 1 | 0) | 0;
      pushInt(-1 - (val | 0) | 0);
      offset = offset + 3 | 0;
      return 0;
    }
    function UINT_N_32(octet) {
      octet = octet | 0;
      if (checkOffset(4) | 0) {
        return 1;
      }
      pushInt32Neg(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0
      );
      offset = offset + 5 | 0;
      return 0;
    }
    function UINT_N_64(octet) {
      octet = octet | 0;
      if (checkOffset(8) | 0) {
        return 1;
      }
      pushInt64Neg(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0,
        readUInt16(offset + 5 | 0) | 0,
        readUInt16(offset + 7 | 0) | 0
      );
      offset = offset + 9 | 0;
      return 0;
    }
    function BYTE_STRING(octet) {
      octet = octet | 0;
      var start = 0;
      var end = 0;
      var step = 0;
      step = octet - 64 | 0;
      if (checkOffset(step | 0) | 0) {
        return 1;
      }
      start = offset + 1 | 0;
      end = (offset + 1 | 0) + (step | 0) | 0;
      pushByteString(start | 0, end | 0);
      offset = end | 0;
      return 0;
    }
    function BYTE_STRING_8(octet) {
      octet = octet | 0;
      var start = 0;
      var end = 0;
      var length = 0;
      if (checkOffset(1) | 0) {
        return 1;
      }
      length = heap[offset + 1 | 0] | 0;
      start = offset + 2 | 0;
      end = (offset + 2 | 0) + (length | 0) | 0;
      if (checkOffset(length + 1 | 0) | 0) {
        return 1;
      }
      pushByteString(start | 0, end | 0);
      offset = end | 0;
      return 0;
    }
    function BYTE_STRING_16(octet) {
      octet = octet | 0;
      var start = 0;
      var end = 0;
      var length = 0;
      if (checkOffset(2) | 0) {
        return 1;
      }
      length = readUInt16(offset + 1 | 0) | 0;
      start = offset + 3 | 0;
      end = (offset + 3 | 0) + (length | 0) | 0;
      if (checkOffset(length + 2 | 0) | 0) {
        return 1;
      }
      pushByteString(start | 0, end | 0);
      offset = end | 0;
      return 0;
    }
    function BYTE_STRING_32(octet) {
      octet = octet | 0;
      var start = 0;
      var end = 0;
      var length = 0;
      if (checkOffset(4) | 0) {
        return 1;
      }
      length = readUInt32(offset + 1 | 0) | 0;
      start = offset + 5 | 0;
      end = (offset + 5 | 0) + (length | 0) | 0;
      if (checkOffset(length + 4 | 0) | 0) {
        return 1;
      }
      pushByteString(start | 0, end | 0);
      offset = end | 0;
      return 0;
    }
    function BYTE_STRING_64(octet) {
      octet = octet | 0;
      return 1;
    }
    function BYTE_STRING_BREAK(octet) {
      octet = octet | 0;
      pushByteStringStart();
      offset = offset + 1 | 0;
      return 0;
    }
    function UTF8_STRING(octet) {
      octet = octet | 0;
      var start = 0;
      var end = 0;
      var step = 0;
      step = octet - 96 | 0;
      if (checkOffset(step | 0) | 0) {
        return 1;
      }
      start = offset + 1 | 0;
      end = (offset + 1 | 0) + (step | 0) | 0;
      pushUtf8String(start | 0, end | 0);
      offset = end | 0;
      return 0;
    }
    function UTF8_STRING_8(octet) {
      octet = octet | 0;
      var start = 0;
      var end = 0;
      var length = 0;
      if (checkOffset(1) | 0) {
        return 1;
      }
      length = heap[offset + 1 | 0] | 0;
      start = offset + 2 | 0;
      end = (offset + 2 | 0) + (length | 0) | 0;
      if (checkOffset(length + 1 | 0) | 0) {
        return 1;
      }
      pushUtf8String(start | 0, end | 0);
      offset = end | 0;
      return 0;
    }
    function UTF8_STRING_16(octet) {
      octet = octet | 0;
      var start = 0;
      var end = 0;
      var length = 0;
      if (checkOffset(2) | 0) {
        return 1;
      }
      length = readUInt16(offset + 1 | 0) | 0;
      start = offset + 3 | 0;
      end = (offset + 3 | 0) + (length | 0) | 0;
      if (checkOffset(length + 2 | 0) | 0) {
        return 1;
      }
      pushUtf8String(start | 0, end | 0);
      offset = end | 0;
      return 0;
    }
    function UTF8_STRING_32(octet) {
      octet = octet | 0;
      var start = 0;
      var end = 0;
      var length = 0;
      if (checkOffset(4) | 0) {
        return 1;
      }
      length = readUInt32(offset + 1 | 0) | 0;
      start = offset + 5 | 0;
      end = (offset + 5 | 0) + (length | 0) | 0;
      if (checkOffset(length + 4 | 0) | 0) {
        return 1;
      }
      pushUtf8String(start | 0, end | 0);
      offset = end | 0;
      return 0;
    }
    function UTF8_STRING_64(octet) {
      octet = octet | 0;
      return 1;
    }
    function UTF8_STRING_BREAK(octet) {
      octet = octet | 0;
      pushUtf8StringStart();
      offset = offset + 1 | 0;
      return 0;
    }
    function ARRAY(octet) {
      octet = octet | 0;
      pushArrayStartFixed(octet - 128 | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function ARRAY_8(octet) {
      octet = octet | 0;
      if (checkOffset(1) | 0) {
        return 1;
      }
      pushArrayStartFixed(heap[offset + 1 | 0] | 0);
      offset = offset + 2 | 0;
      return 0;
    }
    function ARRAY_16(octet) {
      octet = octet | 0;
      if (checkOffset(2) | 0) {
        return 1;
      }
      pushArrayStartFixed(
        readUInt16(offset + 1 | 0) | 0
      );
      offset = offset + 3 | 0;
      return 0;
    }
    function ARRAY_32(octet) {
      octet = octet | 0;
      if (checkOffset(4) | 0) {
        return 1;
      }
      pushArrayStartFixed32(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0
      );
      offset = offset + 5 | 0;
      return 0;
    }
    function ARRAY_64(octet) {
      octet = octet | 0;
      if (checkOffset(8) | 0) {
        return 1;
      }
      pushArrayStartFixed64(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0,
        readUInt16(offset + 5 | 0) | 0,
        readUInt16(offset + 7 | 0) | 0
      );
      offset = offset + 9 | 0;
      return 0;
    }
    function ARRAY_BREAK(octet) {
      octet = octet | 0;
      pushArrayStart();
      offset = offset + 1 | 0;
      return 0;
    }
    function MAP(octet) {
      octet = octet | 0;
      var step = 0;
      step = octet - 160 | 0;
      if (checkOffset(step | 0) | 0) {
        return 1;
      }
      pushObjectStartFixed(step | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function MAP_8(octet) {
      octet = octet | 0;
      if (checkOffset(1) | 0) {
        return 1;
      }
      pushObjectStartFixed(heap[offset + 1 | 0] | 0);
      offset = offset + 2 | 0;
      return 0;
    }
    function MAP_16(octet) {
      octet = octet | 0;
      if (checkOffset(2) | 0) {
        return 1;
      }
      pushObjectStartFixed(
        readUInt16(offset + 1 | 0) | 0
      );
      offset = offset + 3 | 0;
      return 0;
    }
    function MAP_32(octet) {
      octet = octet | 0;
      if (checkOffset(4) | 0) {
        return 1;
      }
      pushObjectStartFixed32(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0
      );
      offset = offset + 5 | 0;
      return 0;
    }
    function MAP_64(octet) {
      octet = octet | 0;
      if (checkOffset(8) | 0) {
        return 1;
      }
      pushObjectStartFixed64(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0,
        readUInt16(offset + 5 | 0) | 0,
        readUInt16(offset + 7 | 0) | 0
      );
      offset = offset + 9 | 0;
      return 0;
    }
    function MAP_BREAK(octet) {
      octet = octet | 0;
      pushObjectStart();
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_KNOWN(octet) {
      octet = octet | 0;
      pushTagStart(octet - 192 | 0 | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_BIGNUM_POS(octet) {
      octet = octet | 0;
      pushTagStart(octet | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_BIGNUM_NEG(octet) {
      octet = octet | 0;
      pushTagStart(octet | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_FRAC(octet) {
      octet = octet | 0;
      pushTagStart(octet | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_BIGNUM_FLOAT(octet) {
      octet = octet | 0;
      pushTagStart(octet | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_UNASSIGNED(octet) {
      octet = octet | 0;
      pushTagStart(octet - 192 | 0 | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_BASE64_URL(octet) {
      octet = octet | 0;
      pushTagStart(octet | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_BASE64(octet) {
      octet = octet | 0;
      pushTagStart(octet | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_BASE16(octet) {
      octet = octet | 0;
      pushTagStart(octet | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function TAG_MORE_1(octet) {
      octet = octet | 0;
      if (checkOffset(1) | 0) {
        return 1;
      }
      pushTagStart(heap[offset + 1 | 0] | 0);
      offset = offset + 2 | 0;
      return 0;
    }
    function TAG_MORE_2(octet) {
      octet = octet | 0;
      if (checkOffset(2) | 0) {
        return 1;
      }
      pushTagStart(
        readUInt16(offset + 1 | 0) | 0
      );
      offset = offset + 3 | 0;
      return 0;
    }
    function TAG_MORE_4(octet) {
      octet = octet | 0;
      if (checkOffset(4) | 0) {
        return 1;
      }
      pushTagStart4(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0
      );
      offset = offset + 5 | 0;
      return 0;
    }
    function TAG_MORE_8(octet) {
      octet = octet | 0;
      if (checkOffset(8) | 0) {
        return 1;
      }
      pushTagStart8(
        readUInt16(offset + 1 | 0) | 0,
        readUInt16(offset + 3 | 0) | 0,
        readUInt16(offset + 5 | 0) | 0,
        readUInt16(offset + 7 | 0) | 0
      );
      offset = offset + 9 | 0;
      return 0;
    }
    function SIMPLE_UNASSIGNED(octet) {
      octet = octet | 0;
      pushSimpleUnassigned((octet | 0) - 224 | 0);
      offset = offset + 1 | 0;
      return 0;
    }
    function SIMPLE_FALSE(octet) {
      octet = octet | 0;
      pushFalse();
      offset = offset + 1 | 0;
      return 0;
    }
    function SIMPLE_TRUE(octet) {
      octet = octet | 0;
      pushTrue();
      offset = offset + 1 | 0;
      return 0;
    }
    function SIMPLE_NULL(octet) {
      octet = octet | 0;
      pushNull();
      offset = offset + 1 | 0;
      return 0;
    }
    function SIMPLE_UNDEFINED(octet) {
      octet = octet | 0;
      pushUndefined();
      offset = offset + 1 | 0;
      return 0;
    }
    function SIMPLE_BYTE(octet) {
      octet = octet | 0;
      if (checkOffset(1) | 0) {
        return 1;
      }
      pushSimpleUnassigned(heap[offset + 1 | 0] | 0);
      offset = offset + 2 | 0;
      return 0;
    }
    function SIMPLE_FLOAT_HALF(octet) {
      octet = octet | 0;
      var f = 0;
      var g2 = 0;
      var sign = 1;
      var exp = 0;
      var mant = 0;
      var r = 0;
      if (checkOffset(2) | 0) {
        return 1;
      }
      f = heap[offset + 1 | 0] | 0;
      g2 = heap[offset + 2 | 0] | 0;
      if ((f | 0) & 128) {
        sign = -1;
      }
      exp = +(((f | 0) & 124) >> 2);
      mant = +(((f | 0) & 3) << 8 | g2);
      if (+exp == 0) {
        pushFloat(+(+sign * 5960464477539063e-23 * +mant));
      } else if (+exp == 31) {
        if (+sign == 1) {
          if (+mant > 0) {
            pushNaN();
          } else {
            pushInfinity();
          }
        } else {
          if (+mant > 0) {
            pushNaNNeg();
          } else {
            pushInfinityNeg();
          }
        }
      } else {
        pushFloat(+(+sign * pow(2, +(+exp - 25)) * +(1024 + mant)));
      }
      offset = offset + 3 | 0;
      return 0;
    }
    function SIMPLE_FLOAT_SINGLE(octet) {
      octet = octet | 0;
      if (checkOffset(4) | 0) {
        return 1;
      }
      pushFloatSingle(
        heap[offset + 1 | 0] | 0,
        heap[offset + 2 | 0] | 0,
        heap[offset + 3 | 0] | 0,
        heap[offset + 4 | 0] | 0
      );
      offset = offset + 5 | 0;
      return 0;
    }
    function SIMPLE_FLOAT_DOUBLE(octet) {
      octet = octet | 0;
      if (checkOffset(8) | 0) {
        return 1;
      }
      pushFloatDouble(
        heap[offset + 1 | 0] | 0,
        heap[offset + 2 | 0] | 0,
        heap[offset + 3 | 0] | 0,
        heap[offset + 4 | 0] | 0,
        heap[offset + 5 | 0] | 0,
        heap[offset + 6 | 0] | 0,
        heap[offset + 7 | 0] | 0,
        heap[offset + 8 | 0] | 0
      );
      offset = offset + 9 | 0;
      return 0;
    }
    function ERROR(octet) {
      octet = octet | 0;
      return 1;
    }
    function BREAK(octet) {
      octet = octet | 0;
      pushBreak();
      offset = offset + 1 | 0;
      return 0;
    }
    var jumpTable = [
      // Integer 0x00..0x17 (0..23)
      INT_P,
      // 0x00
      INT_P,
      // 0x01
      INT_P,
      // 0x02
      INT_P,
      // 0x03
      INT_P,
      // 0x04
      INT_P,
      // 0x05
      INT_P,
      // 0x06
      INT_P,
      // 0x07
      INT_P,
      // 0x08
      INT_P,
      // 0x09
      INT_P,
      // 0x0A
      INT_P,
      // 0x0B
      INT_P,
      // 0x0C
      INT_P,
      // 0x0D
      INT_P,
      // 0x0E
      INT_P,
      // 0x0F
      INT_P,
      // 0x10
      INT_P,
      // 0x11
      INT_P,
      // 0x12
      INT_P,
      // 0x13
      INT_P,
      // 0x14
      INT_P,
      // 0x15
      INT_P,
      // 0x16
      INT_P,
      // 0x17
      // Unsigned integer (one-byte uint8_t follows)
      UINT_P_8,
      // 0x18
      // Unsigned integer (two-byte uint16_t follows)
      UINT_P_16,
      // 0x19
      // Unsigned integer (four-byte uint32_t follows)
      UINT_P_32,
      // 0x1a
      // Unsigned integer (eight-byte uint64_t follows)
      UINT_P_64,
      // 0x1b
      ERROR,
      // 0x1c
      ERROR,
      // 0x1d
      ERROR,
      // 0x1e
      ERROR,
      // 0x1f
      // Negative integer -1-0x00..-1-0x17 (-1..-24)
      INT_N,
      // 0x20
      INT_N,
      // 0x21
      INT_N,
      // 0x22
      INT_N,
      // 0x23
      INT_N,
      // 0x24
      INT_N,
      // 0x25
      INT_N,
      // 0x26
      INT_N,
      // 0x27
      INT_N,
      // 0x28
      INT_N,
      // 0x29
      INT_N,
      // 0x2A
      INT_N,
      // 0x2B
      INT_N,
      // 0x2C
      INT_N,
      // 0x2D
      INT_N,
      // 0x2E
      INT_N,
      // 0x2F
      INT_N,
      // 0x30
      INT_N,
      // 0x31
      INT_N,
      // 0x32
      INT_N,
      // 0x33
      INT_N,
      // 0x34
      INT_N,
      // 0x35
      INT_N,
      // 0x36
      INT_N,
      // 0x37
      // Negative integer -1-n (one-byte uint8_t for n follows)
      UINT_N_8,
      // 0x38
      // Negative integer -1-n (two-byte uint16_t for n follows)
      UINT_N_16,
      // 0x39
      // Negative integer -1-n (four-byte uint32_t for nfollows)
      UINT_N_32,
      // 0x3a
      // Negative integer -1-n (eight-byte uint64_t for n follows)
      UINT_N_64,
      // 0x3b
      ERROR,
      // 0x3c
      ERROR,
      // 0x3d
      ERROR,
      // 0x3e
      ERROR,
      // 0x3f
      // byte string (0x00..0x17 bytes follow)
      BYTE_STRING,
      // 0x40
      BYTE_STRING,
      // 0x41
      BYTE_STRING,
      // 0x42
      BYTE_STRING,
      // 0x43
      BYTE_STRING,
      // 0x44
      BYTE_STRING,
      // 0x45
      BYTE_STRING,
      // 0x46
      BYTE_STRING,
      // 0x47
      BYTE_STRING,
      // 0x48
      BYTE_STRING,
      // 0x49
      BYTE_STRING,
      // 0x4A
      BYTE_STRING,
      // 0x4B
      BYTE_STRING,
      // 0x4C
      BYTE_STRING,
      // 0x4D
      BYTE_STRING,
      // 0x4E
      BYTE_STRING,
      // 0x4F
      BYTE_STRING,
      // 0x50
      BYTE_STRING,
      // 0x51
      BYTE_STRING,
      // 0x52
      BYTE_STRING,
      // 0x53
      BYTE_STRING,
      // 0x54
      BYTE_STRING,
      // 0x55
      BYTE_STRING,
      // 0x56
      BYTE_STRING,
      // 0x57
      // byte string (one-byte uint8_t for n, and then n bytes follow)
      BYTE_STRING_8,
      // 0x58
      // byte string (two-byte uint16_t for n, and then n bytes follow)
      BYTE_STRING_16,
      // 0x59
      // byte string (four-byte uint32_t for n, and then n bytes follow)
      BYTE_STRING_32,
      // 0x5a
      // byte string (eight-byte uint64_t for n, and then n bytes follow)
      BYTE_STRING_64,
      // 0x5b
      ERROR,
      // 0x5c
      ERROR,
      // 0x5d
      ERROR,
      // 0x5e
      // byte string, byte strings follow, terminated by "break"
      BYTE_STRING_BREAK,
      // 0x5f
      // UTF-8 string (0x00..0x17 bytes follow)
      UTF8_STRING,
      // 0x60
      UTF8_STRING,
      // 0x61
      UTF8_STRING,
      // 0x62
      UTF8_STRING,
      // 0x63
      UTF8_STRING,
      // 0x64
      UTF8_STRING,
      // 0x65
      UTF8_STRING,
      // 0x66
      UTF8_STRING,
      // 0x67
      UTF8_STRING,
      // 0x68
      UTF8_STRING,
      // 0x69
      UTF8_STRING,
      // 0x6A
      UTF8_STRING,
      // 0x6B
      UTF8_STRING,
      // 0x6C
      UTF8_STRING,
      // 0x6D
      UTF8_STRING,
      // 0x6E
      UTF8_STRING,
      // 0x6F
      UTF8_STRING,
      // 0x70
      UTF8_STRING,
      // 0x71
      UTF8_STRING,
      // 0x72
      UTF8_STRING,
      // 0x73
      UTF8_STRING,
      // 0x74
      UTF8_STRING,
      // 0x75
      UTF8_STRING,
      // 0x76
      UTF8_STRING,
      // 0x77
      // UTF-8 string (one-byte uint8_t for n, and then n bytes follow)
      UTF8_STRING_8,
      // 0x78
      // UTF-8 string (two-byte uint16_t for n, and then n bytes follow)
      UTF8_STRING_16,
      // 0x79
      // UTF-8 string (four-byte uint32_t for n, and then n bytes follow)
      UTF8_STRING_32,
      // 0x7a
      // UTF-8 string (eight-byte uint64_t for n, and then n bytes follow)
      UTF8_STRING_64,
      // 0x7b
      // UTF-8 string, UTF-8 strings follow, terminated by "break"
      ERROR,
      // 0x7c
      ERROR,
      // 0x7d
      ERROR,
      // 0x7e
      UTF8_STRING_BREAK,
      // 0x7f
      // array (0x00..0x17 data items follow)
      ARRAY,
      // 0x80
      ARRAY,
      // 0x81
      ARRAY,
      // 0x82
      ARRAY,
      // 0x83
      ARRAY,
      // 0x84
      ARRAY,
      // 0x85
      ARRAY,
      // 0x86
      ARRAY,
      // 0x87
      ARRAY,
      // 0x88
      ARRAY,
      // 0x89
      ARRAY,
      // 0x8A
      ARRAY,
      // 0x8B
      ARRAY,
      // 0x8C
      ARRAY,
      // 0x8D
      ARRAY,
      // 0x8E
      ARRAY,
      // 0x8F
      ARRAY,
      // 0x90
      ARRAY,
      // 0x91
      ARRAY,
      // 0x92
      ARRAY,
      // 0x93
      ARRAY,
      // 0x94
      ARRAY,
      // 0x95
      ARRAY,
      // 0x96
      ARRAY,
      // 0x97
      // array (one-byte uint8_t fo, and then n data items follow)
      ARRAY_8,
      // 0x98
      // array (two-byte uint16_t for n, and then n data items follow)
      ARRAY_16,
      // 0x99
      // array (four-byte uint32_t for n, and then n data items follow)
      ARRAY_32,
      // 0x9a
      // array (eight-byte uint64_t for n, and then n data items follow)
      ARRAY_64,
      // 0x9b
      // array, data items follow, terminated by "break"
      ERROR,
      // 0x9c
      ERROR,
      // 0x9d
      ERROR,
      // 0x9e
      ARRAY_BREAK,
      // 0x9f
      // map (0x00..0x17 pairs of data items follow)
      MAP,
      // 0xa0
      MAP,
      // 0xa1
      MAP,
      // 0xa2
      MAP,
      // 0xa3
      MAP,
      // 0xa4
      MAP,
      // 0xa5
      MAP,
      // 0xa6
      MAP,
      // 0xa7
      MAP,
      // 0xa8
      MAP,
      // 0xa9
      MAP,
      // 0xaA
      MAP,
      // 0xaB
      MAP,
      // 0xaC
      MAP,
      // 0xaD
      MAP,
      // 0xaE
      MAP,
      // 0xaF
      MAP,
      // 0xb0
      MAP,
      // 0xb1
      MAP,
      // 0xb2
      MAP,
      // 0xb3
      MAP,
      // 0xb4
      MAP,
      // 0xb5
      MAP,
      // 0xb6
      MAP,
      // 0xb7
      // map (one-byte uint8_t for n, and then n pairs of data items follow)
      MAP_8,
      // 0xb8
      // map (two-byte uint16_t for n, and then n pairs of data items follow)
      MAP_16,
      // 0xb9
      // map (four-byte uint32_t for n, and then n pairs of data items follow)
      MAP_32,
      // 0xba
      // map (eight-byte uint64_t for n, and then n pairs of data items follow)
      MAP_64,
      // 0xbb
      ERROR,
      // 0xbc
      ERROR,
      // 0xbd
      ERROR,
      // 0xbe
      // map, pairs of data items follow, terminated by "break"
      MAP_BREAK,
      // 0xbf
      // Text-based date/time (data item follows; see Section 2.4.1)
      TAG_KNOWN,
      // 0xc0
      // Epoch-based date/time (data item follows; see Section 2.4.1)
      TAG_KNOWN,
      // 0xc1
      // Positive bignum (data item "byte string" follows)
      TAG_KNOWN,
      // 0xc2
      // Negative bignum (data item "byte string" follows)
      TAG_KNOWN,
      // 0xc3
      // Decimal Fraction (data item "array" follows; see Section 2.4.3)
      TAG_KNOWN,
      // 0xc4
      // Bigfloat (data item "array" follows; see Section 2.4.3)
      TAG_KNOWN,
      // 0xc5
      // (tagged item)
      TAG_UNASSIGNED,
      // 0xc6
      TAG_UNASSIGNED,
      // 0xc7
      TAG_UNASSIGNED,
      // 0xc8
      TAG_UNASSIGNED,
      // 0xc9
      TAG_UNASSIGNED,
      // 0xca
      TAG_UNASSIGNED,
      // 0xcb
      TAG_UNASSIGNED,
      // 0xcc
      TAG_UNASSIGNED,
      // 0xcd
      TAG_UNASSIGNED,
      // 0xce
      TAG_UNASSIGNED,
      // 0xcf
      TAG_UNASSIGNED,
      // 0xd0
      TAG_UNASSIGNED,
      // 0xd1
      TAG_UNASSIGNED,
      // 0xd2
      TAG_UNASSIGNED,
      // 0xd3
      TAG_UNASSIGNED,
      // 0xd4
      // Expected Conversion (data item follows; see Section 2.4.4.2)
      TAG_UNASSIGNED,
      // 0xd5
      TAG_UNASSIGNED,
      // 0xd6
      TAG_UNASSIGNED,
      // 0xd7
      // (more tagged items, 1/2/4/8 bytes and then a data item follow)
      TAG_MORE_1,
      // 0xd8
      TAG_MORE_2,
      // 0xd9
      TAG_MORE_4,
      // 0xda
      TAG_MORE_8,
      // 0xdb
      ERROR,
      // 0xdc
      ERROR,
      // 0xdd
      ERROR,
      // 0xde
      ERROR,
      // 0xdf
      // (simple value)
      SIMPLE_UNASSIGNED,
      // 0xe0
      SIMPLE_UNASSIGNED,
      // 0xe1
      SIMPLE_UNASSIGNED,
      // 0xe2
      SIMPLE_UNASSIGNED,
      // 0xe3
      SIMPLE_UNASSIGNED,
      // 0xe4
      SIMPLE_UNASSIGNED,
      // 0xe5
      SIMPLE_UNASSIGNED,
      // 0xe6
      SIMPLE_UNASSIGNED,
      // 0xe7
      SIMPLE_UNASSIGNED,
      // 0xe8
      SIMPLE_UNASSIGNED,
      // 0xe9
      SIMPLE_UNASSIGNED,
      // 0xea
      SIMPLE_UNASSIGNED,
      // 0xeb
      SIMPLE_UNASSIGNED,
      // 0xec
      SIMPLE_UNASSIGNED,
      // 0xed
      SIMPLE_UNASSIGNED,
      // 0xee
      SIMPLE_UNASSIGNED,
      // 0xef
      SIMPLE_UNASSIGNED,
      // 0xf0
      SIMPLE_UNASSIGNED,
      // 0xf1
      SIMPLE_UNASSIGNED,
      // 0xf2
      SIMPLE_UNASSIGNED,
      // 0xf3
      // False
      SIMPLE_FALSE,
      // 0xf4
      // True
      SIMPLE_TRUE,
      // 0xf5
      // Null
      SIMPLE_NULL,
      // 0xf6
      // Undefined
      SIMPLE_UNDEFINED,
      // 0xf7
      // (simple value, one byte follows)
      SIMPLE_BYTE,
      // 0xf8
      // Half-Precision Float (two-byte IEEE 754)
      SIMPLE_FLOAT_HALF,
      // 0xf9
      // Single-Precision Float (four-byte IEEE 754)
      SIMPLE_FLOAT_SINGLE,
      // 0xfa
      // Double-Precision Float (eight-byte IEEE 754)
      SIMPLE_FLOAT_DOUBLE,
      // 0xfb
      ERROR,
      // 0xfc
      ERROR,
      // 0xfd
      ERROR,
      // 0xfe
      // "break" stop code
      BREAK
      // 0xff
    ];
    return {
      parse
    };
  };
  return decoder_asm;
}
var utils = {};
var constants = {};
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const Bignumber = requireBignumber().BigNumber;
  constants.MT = {
    POS_INT: 0,
    NEG_INT: 1,
    BYTE_STRING: 2,
    UTF8_STRING: 3,
    ARRAY: 4,
    MAP: 5,
    TAG: 6,
    SIMPLE_FLOAT: 7
  };
  constants.TAG = {
    DATE_STRING: 0,
    DATE_EPOCH: 1,
    POS_BIGINT: 2,
    NEG_BIGINT: 3,
    DECIMAL_FRAC: 4,
    BIGFLOAT: 5,
    BASE64URL_EXPECTED: 21,
    BASE64_EXPECTED: 22,
    BASE16_EXPECTED: 23,
    CBOR: 24,
    URI: 32,
    BASE64URL: 33,
    BASE64: 34,
    REGEXP: 35,
    MIME: 36
  };
  constants.NUMBYTES = {
    ZERO: 0,
    ONE: 24,
    TWO: 25,
    FOUR: 26,
    EIGHT: 27,
    INDEFINITE: 31
  };
  constants.SIMPLE = {
    FALSE: 20,
    TRUE: 21,
    NULL: 22,
    UNDEFINED: 23
  };
  constants.SYMS = {
    NULL: Symbol("null"),
    UNDEFINED: Symbol("undef"),
    PARENT: Symbol("parent"),
    BREAK: Symbol("break"),
    STREAM: Symbol("stream")
  };
  constants.SHIFT32 = Math.pow(2, 32);
  constants.SHIFT16 = Math.pow(2, 16);
  constants.MAX_SAFE_HIGH = 2097151;
  constants.NEG_ONE = new Bignumber(-1);
  constants.TEN = new Bignumber(10);
  constants.TWO = new Bignumber(2);
  constants.PARENT = {
    ARRAY: 0,
    OBJECT: 1,
    MAP: 2,
    TAG: 3,
    BYTE_STRING: 4,
    UTF8_STRING: 5
  };
  return constants;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  (function(exports) {
    const { Buffer: Buffer2 } = requireBuffer();
    const Bignumber = requireBignumber().BigNumber;
    const constants2 = requireConstants();
    const SHIFT32 = constants2.SHIFT32;
    const SHIFT16 = constants2.SHIFT16;
    const MAX_SAFE_HIGH = 2097151;
    exports.parseHalf = function parseHalf(buf) {
      var exp, mant, sign;
      sign = buf[0] & 128 ? -1 : 1;
      exp = (buf[0] & 124) >> 2;
      mant = (buf[0] & 3) << 8 | buf[1];
      if (!exp) {
        return sign * 5960464477539063e-23 * mant;
      } else if (exp === 31) {
        return sign * (mant ? 0 / 0 : Infinity);
      } else {
        return sign * Math.pow(2, exp - 25) * (1024 + mant);
      }
    };
    function toHex2(n) {
      if (n < 16) {
        return "0" + n.toString(16);
      }
      return n.toString(16);
    }
    exports.arrayBufferToBignumber = function(buf) {
      const len = buf.byteLength;
      let res = "";
      for (let i = 0; i < len; i++) {
        res += toHex2(buf[i]);
      }
      return new Bignumber(res, 16);
    };
    exports.buildMap = (obj) => {
      const res = /* @__PURE__ */ new Map();
      const keys = Object.keys(obj);
      const length = keys.length;
      for (let i = 0; i < length; i++) {
        res.set(keys[i], obj[keys[i]]);
      }
      return res;
    };
    exports.buildInt32 = (f, g2) => {
      return f * SHIFT16 + g2;
    };
    exports.buildInt64 = (f1, f2, g1, g2) => {
      const f = exports.buildInt32(f1, f2);
      const g3 = exports.buildInt32(g1, g2);
      if (f > MAX_SAFE_HIGH) {
        return new Bignumber(f).times(SHIFT32).plus(g3);
      } else {
        return f * SHIFT32 + g3;
      }
    };
    exports.writeHalf = function writeHalf(buf, half) {
      const u32 = Buffer2.allocUnsafe(4);
      u32.writeFloatBE(half, 0);
      const u = u32.readUInt32BE(0);
      if ((u & 8191) !== 0) {
        return false;
      }
      var s16 = u >> 16 & 32768;
      const exp = u >> 23 & 255;
      const mant = u & 8388607;
      if (exp >= 113 && exp <= 142) {
        s16 += (exp - 112 << 10) + (mant >> 13);
      } else if (exp >= 103 && exp < 113) {
        if (mant & (1 << 126 - exp) - 1) {
          return false;
        }
        s16 += mant + 8388608 >> 126 - exp;
      } else {
        return false;
      }
      buf.writeUInt16BE(s16, 0);
      return true;
    };
    exports.keySorter = function(a, b2) {
      var lenA = a[0].byteLength;
      var lenB = b2[0].byteLength;
      if (lenA > lenB) {
        return 1;
      }
      if (lenB > lenA) {
        return -1;
      }
      return a[0].compare(b2[0]);
    };
    exports.isNegativeZero = (x2) => {
      return x2 === 0 && 1 / x2 < 0;
    };
    exports.nextPowerOf2 = (n) => {
      let count = 0;
      if (n && !(n & n - 1)) {
        return n;
      }
      while (n !== 0) {
        n >>= 1;
        count += 1;
      }
      return 1 << count;
    };
  })(utils);
  return utils;
}
var simple;
var hasRequiredSimple;
function requireSimple() {
  if (hasRequiredSimple) return simple;
  hasRequiredSimple = 1;
  const constants2 = requireConstants();
  const MT = constants2.MT;
  const SIMPLE = constants2.SIMPLE;
  const SYMS = constants2.SYMS;
  class Simple {
    /**
     * Creates an instance of Simple.
     *
     * @param {integer} value - the simple value's integer value
     */
    constructor(value2) {
      if (typeof value2 !== "number") {
        throw new Error("Invalid Simple type: " + typeof value2);
      }
      if (value2 < 0 || value2 > 255 || (value2 | 0) !== value2) {
        throw new Error("value must be a small positive integer: " + value2);
      }
      this.value = value2;
    }
    /**
     * Debug string for simple value
     *
     * @returns {string} simple(value)
     */
    toString() {
      return "simple(" + this.value + ")";
    }
    /**
     * Debug string for simple value
     *
     * @returns {string} simple(value)
     */
    inspect() {
      return "simple(" + this.value + ")";
    }
    /**
     * Push the simple value onto the CBOR stream
     *
     * @param {cbor.Encoder} gen The generator to push onto
     * @returns {number}
     */
    encodeCBOR(gen) {
      return gen._pushInt(this.value, MT.SIMPLE_FLOAT);
    }
    /**
     * Is the given object a Simple?
     *
     * @param {any} obj - object to test
     * @returns {bool} - is it Simple?
     */
    static isSimple(obj) {
      return obj instanceof Simple;
    }
    /**
     * Decode from the CBOR additional information into a JavaScript value.
     * If the CBOR item has no parent, return a "safe" symbol instead of
     * `null` or `undefined`, so that the value can be passed through a
     * stream in object mode.
     *
     * @param {Number} val - the CBOR additional info to convert
     * @param {bool} hasParent - Does the CBOR item have a parent?
     * @returns {(null|undefined|Boolean|Symbol)} - the decoded value
     */
    static decode(val, hasParent) {
      if (hasParent == null) {
        hasParent = true;
      }
      switch (val) {
        case SIMPLE.FALSE:
          return false;
        case SIMPLE.TRUE:
          return true;
        case SIMPLE.NULL:
          if (hasParent) {
            return null;
          } else {
            return SYMS.NULL;
          }
        case SIMPLE.UNDEFINED:
          if (hasParent) {
            return void 0;
          } else {
            return SYMS.UNDEFINED;
          }
        case -1:
          if (!hasParent) {
            throw new Error("Invalid BREAK");
          }
          return SYMS.BREAK;
        default:
          return new Simple(val);
      }
    }
  }
  simple = Simple;
  return simple;
}
var tagged;
var hasRequiredTagged;
function requireTagged() {
  if (hasRequiredTagged) return tagged;
  hasRequiredTagged = 1;
  class Tagged {
    /**
     * Creates an instance of Tagged.
     *
     * @param {Number} tag - the number of the tag
     * @param {any} value - the value inside the tag
     * @param {Error} err - the error that was thrown parsing the tag, or null
     */
    constructor(tag, value2, err) {
      this.tag = tag;
      this.value = value2;
      this.err = err;
      if (typeof this.tag !== "number") {
        throw new Error("Invalid tag type (" + typeof this.tag + ")");
      }
      if (this.tag < 0 || (this.tag | 0) !== this.tag) {
        throw new Error("Tag must be a positive integer: " + this.tag);
      }
    }
    /**
     * Convert to a String
     *
     * @returns {String} string of the form '1(2)'
     */
    toString() {
      return `${this.tag}(${JSON.stringify(this.value)})`;
    }
    /**
     * Push the simple value onto the CBOR stream
     *
     * @param {cbor.Encoder} gen The generator to push onto
     * @returns {number}
     */
    encodeCBOR(gen) {
      gen._pushTag(this.tag);
      return gen.pushAny(this.value);
    }
    /**
     * If we have a converter for this type, do the conversion.  Some converters
     * are built-in.  Additional ones can be passed in.  If you want to remove
     * a built-in converter, pass a converter in whose value is 'null' instead
     * of a function.
     *
     * @param {Object} converters - keys in the object are a tag number, the value
     *   is a function that takes the decoded CBOR and returns a JavaScript value
     *   of the appropriate type.  Throw an exception in the function on errors.
     * @returns {any} - the converted item
     */
    convert(converters) {
      var er, f;
      f = converters != null ? converters[this.tag] : void 0;
      if (typeof f !== "function") {
        f = Tagged["_tag" + this.tag];
        if (typeof f !== "function") {
          return this;
        }
      }
      try {
        return f.call(Tagged, this.value);
      } catch (error) {
        er = error;
        this.err = er;
        return this;
      }
    }
  }
  tagged = Tagged;
  return tagged;
}
var urlBrowser;
var hasRequiredUrlBrowser;
function requireUrlBrowser() {
  if (hasRequiredUrlBrowser) return urlBrowser;
  hasRequiredUrlBrowser = 1;
  const defaultBase = globalThis.location ? globalThis.location.protocol + "//" + globalThis.location.host : "";
  const URL2 = globalThis.URL;
  class URLWithLegacySupport {
    constructor(url = "", base = defaultBase) {
      this.super = new URL2(url, base);
      this.path = this.pathname + this.search;
      this.auth = this.username && this.password ? this.username + ":" + this.password : null;
      this.query = this.search && this.search.startsWith("?") ? this.search.slice(1) : null;
    }
    get hash() {
      return this.super.hash;
    }
    get host() {
      return this.super.host;
    }
    get hostname() {
      return this.super.hostname;
    }
    get href() {
      return this.super.href;
    }
    get origin() {
      return this.super.origin;
    }
    get password() {
      return this.super.password;
    }
    get pathname() {
      return this.super.pathname;
    }
    get port() {
      return this.super.port;
    }
    get protocol() {
      return this.super.protocol;
    }
    get search() {
      return this.super.search;
    }
    get searchParams() {
      return this.super.searchParams;
    }
    get username() {
      return this.super.username;
    }
    set hash(hash2) {
      this.super.hash = hash2;
    }
    set host(host) {
      this.super.host = host;
    }
    set hostname(hostname) {
      this.super.hostname = hostname;
    }
    set href(href) {
      this.super.href = href;
    }
    set origin(origin) {
      this.super.origin = origin;
    }
    set password(password) {
      this.super.password = password;
    }
    set pathname(pathname) {
      this.super.pathname = pathname;
    }
    set port(port) {
      this.super.port = port;
    }
    set protocol(protocol) {
      this.super.protocol = protocol;
    }
    set search(search) {
      this.super.search = search;
    }
    set searchParams(searchParams) {
      this.super.searchParams = searchParams;
    }
    set username(username) {
      this.super.username = username;
    }
    createObjectURL(o) {
      return this.super.createObjectURL(o);
    }
    revokeObjectURL(o) {
      this.super.revokeObjectURL(o);
    }
    toJSON() {
      return this.super.toJSON();
    }
    toString() {
      return this.super.toString();
    }
    format() {
      return this.toString();
    }
  }
  function format(obj) {
    if (typeof obj === "string") {
      const url = new URL2(obj);
      return url.toString();
    }
    if (!(obj instanceof URL2)) {
      const userPass = obj.username && obj.password ? `${obj.username}:${obj.password}@` : "";
      const auth = obj.auth ? obj.auth + "@" : "";
      const port = obj.port ? ":" + obj.port : "";
      const protocol = obj.protocol ? obj.protocol + "//" : "";
      const host = obj.host || "";
      const hostname = obj.hostname || "";
      const search = obj.search || (obj.query ? "?" + obj.query : "");
      const hash2 = obj.hash || "";
      const pathname = obj.pathname || "";
      const path = obj.path || pathname + search;
      return `${protocol}${userPass || auth}${host || hostname + port}${path}${hash2}`;
    }
  }
  urlBrowser = {
    URLWithLegacySupport,
    URLSearchParams: globalThis.URLSearchParams,
    defaultBase,
    format
  };
  return urlBrowser;
}
var relative;
var hasRequiredRelative;
function requireRelative() {
  if (hasRequiredRelative) return relative;
  hasRequiredRelative = 1;
  const { URLWithLegacySupport, format } = requireUrlBrowser();
  relative = (url, location2 = {}, protocolMap = {}, defaultProtocol) => {
    let protocol = location2.protocol ? location2.protocol.replace(":", "") : "http";
    protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ":";
    let urlParsed;
    try {
      urlParsed = new URLWithLegacySupport(url);
    } catch (err) {
      urlParsed = {};
    }
    const base = Object.assign({}, location2, {
      protocol: protocol || urlParsed.protocol,
      host: location2.host || urlParsed.host
    });
    return new URLWithLegacySupport(url, format(base)).toString();
  };
  return relative;
}
var isoUrl;
var hasRequiredIsoUrl;
function requireIsoUrl() {
  if (hasRequiredIsoUrl) return isoUrl;
  hasRequiredIsoUrl = 1;
  const {
    URLWithLegacySupport,
    format,
    URLSearchParams,
    defaultBase
  } = requireUrlBrowser();
  const relative2 = requireRelative();
  isoUrl = {
    URL: URLWithLegacySupport,
    URLSearchParams,
    format,
    relative: relative2,
    defaultBase
  };
  return isoUrl;
}
var decoder;
var hasRequiredDecoder;
function requireDecoder() {
  if (hasRequiredDecoder) return decoder;
  hasRequiredDecoder = 1;
  const { Buffer: Buffer2 } = requireBuffer();
  const ieee7542 = requireIeee754();
  const Bignumber = requireBignumber().BigNumber;
  const parser = requireDecoder_asm();
  const utils2 = requireUtils();
  const c = requireConstants();
  const Simple = requireSimple();
  const Tagged = requireTagged();
  const { URL: URL2 } = requireIsoUrl();
  class Decoder {
    /**
     * @param {Object} [opts={}]
     * @param {number} [opts.size=65536] - Size of the allocated heap.
     */
    constructor(opts) {
      opts = opts || {};
      if (!opts.size || opts.size < 65536) {
        opts.size = 65536;
      } else {
        opts.size = utils2.nextPowerOf2(opts.size);
      }
      this._heap = new ArrayBuffer(opts.size);
      this._heap8 = new Uint8Array(this._heap);
      this._buffer = Buffer2.from(this._heap);
      this._reset();
      this._knownTags = Object.assign({
        0: (val) => new Date(val),
        1: (val) => new Date(val * 1e3),
        2: (val) => utils2.arrayBufferToBignumber(val),
        3: (val) => c.NEG_ONE.minus(utils2.arrayBufferToBignumber(val)),
        4: (v2) => {
          return c.TEN.pow(v2[0]).times(v2[1]);
        },
        5: (v2) => {
          return c.TWO.pow(v2[0]).times(v2[1]);
        },
        32: (val) => new URL2(val),
        35: (val) => new RegExp(val)
      }, opts.tags);
      this.parser = parser(globalThis, {
        // eslint-disable-next-line no-console
        log: console.log.bind(console),
        pushInt: this.pushInt.bind(this),
        pushInt32: this.pushInt32.bind(this),
        pushInt32Neg: this.pushInt32Neg.bind(this),
        pushInt64: this.pushInt64.bind(this),
        pushInt64Neg: this.pushInt64Neg.bind(this),
        pushFloat: this.pushFloat.bind(this),
        pushFloatSingle: this.pushFloatSingle.bind(this),
        pushFloatDouble: this.pushFloatDouble.bind(this),
        pushTrue: this.pushTrue.bind(this),
        pushFalse: this.pushFalse.bind(this),
        pushUndefined: this.pushUndefined.bind(this),
        pushNull: this.pushNull.bind(this),
        pushInfinity: this.pushInfinity.bind(this),
        pushInfinityNeg: this.pushInfinityNeg.bind(this),
        pushNaN: this.pushNaN.bind(this),
        pushNaNNeg: this.pushNaNNeg.bind(this),
        pushArrayStart: this.pushArrayStart.bind(this),
        pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
        pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
        pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
        pushObjectStart: this.pushObjectStart.bind(this),
        pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
        pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
        pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
        pushByteString: this.pushByteString.bind(this),
        pushByteStringStart: this.pushByteStringStart.bind(this),
        pushUtf8String: this.pushUtf8String.bind(this),
        pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
        pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
        pushTagUnassigned: this.pushTagUnassigned.bind(this),
        pushTagStart: this.pushTagStart.bind(this),
        pushTagStart4: this.pushTagStart4.bind(this),
        pushTagStart8: this.pushTagStart8.bind(this),
        pushBreak: this.pushBreak.bind(this)
      }, this._heap);
    }
    get _depth() {
      return this._parents.length;
    }
    get _currentParent() {
      return this._parents[this._depth - 1];
    }
    get _ref() {
      return this._currentParent.ref;
    }
    // Finish the current parent
    _closeParent() {
      var p = this._parents.pop();
      if (p.length > 0) {
        throw new Error(`Missing ${p.length} elements`);
      }
      switch (p.type) {
        case c.PARENT.TAG:
          this._push(
            this.createTag(p.ref[0], p.ref[1])
          );
          break;
        case c.PARENT.BYTE_STRING:
          this._push(this.createByteString(p.ref, p.length));
          break;
        case c.PARENT.UTF8_STRING:
          this._push(this.createUtf8String(p.ref, p.length));
          break;
        case c.PARENT.MAP:
          if (p.values % 2 > 0) {
            throw new Error("Odd number of elements in the map");
          }
          this._push(this.createMap(p.ref, p.length));
          break;
        case c.PARENT.OBJECT:
          if (p.values % 2 > 0) {
            throw new Error("Odd number of elements in the map");
          }
          this._push(this.createObject(p.ref, p.length));
          break;
        case c.PARENT.ARRAY:
          this._push(this.createArray(p.ref, p.length));
          break;
      }
      if (this._currentParent && this._currentParent.type === c.PARENT.TAG) {
        this._dec();
      }
    }
    // Reduce the expected length of the current parent by one
    _dec() {
      const p = this._currentParent;
      if (p.length < 0) {
        return;
      }
      p.length--;
      if (p.length === 0) {
        this._closeParent();
      }
    }
    // Push any value to the current parent
    _push(val, hasChildren) {
      const p = this._currentParent;
      p.values++;
      switch (p.type) {
        case c.PARENT.ARRAY:
        case c.PARENT.BYTE_STRING:
        case c.PARENT.UTF8_STRING:
          if (p.length > -1) {
            this._ref[this._ref.length - p.length] = val;
          } else {
            this._ref.push(val);
          }
          this._dec();
          break;
        case c.PARENT.OBJECT:
          if (p.tmpKey != null) {
            this._ref[p.tmpKey] = val;
            p.tmpKey = null;
            this._dec();
          } else {
            p.tmpKey = val;
            if (typeof p.tmpKey !== "string") {
              p.type = c.PARENT.MAP;
              p.ref = utils2.buildMap(p.ref);
            }
          }
          break;
        case c.PARENT.MAP:
          if (p.tmpKey != null) {
            this._ref.set(p.tmpKey, val);
            p.tmpKey = null;
            this._dec();
          } else {
            p.tmpKey = val;
          }
          break;
        case c.PARENT.TAG:
          this._ref.push(val);
          if (!hasChildren) {
            this._dec();
          }
          break;
        default:
          throw new Error("Unknown parent type");
      }
    }
    // Create a new parent in the parents list
    _createParent(obj, type, len) {
      this._parents[this._depth] = {
        type,
        length: len,
        ref: obj,
        values: 0,
        tmpKey: null
      };
    }
    // Reset all state back to the beginning, also used for initiatlization
    _reset() {
      this._res = [];
      this._parents = [{
        type: c.PARENT.ARRAY,
        length: -1,
        ref: this._res,
        values: 0,
        tmpKey: null
      }];
    }
    // -- Interface to customize deoding behaviour
    createTag(tagNumber, value2) {
      const typ = this._knownTags[tagNumber];
      if (!typ) {
        return new Tagged(tagNumber, value2);
      }
      return typ(value2);
    }
    createMap(obj, len) {
      return obj;
    }
    createObject(obj, len) {
      return obj;
    }
    createArray(arr, len) {
      return arr;
    }
    createByteString(raw, len) {
      return Buffer2.concat(raw);
    }
    createByteStringFromHeap(start, end) {
      if (start === end) {
        return Buffer2.alloc(0);
      }
      return Buffer2.from(this._heap.slice(start, end));
    }
    createInt(val) {
      return val;
    }
    createInt32(f, g2) {
      return utils2.buildInt32(f, g2);
    }
    createInt64(f1, f2, g1, g2) {
      return utils2.buildInt64(f1, f2, g1, g2);
    }
    createFloat(val) {
      return val;
    }
    createFloatSingle(a, b2, c2, d2) {
      return ieee7542.read([a, b2, c2, d2], 0, false, 23, 4);
    }
    createFloatDouble(a, b2, c2, d2, e3, f, g2, h2) {
      return ieee7542.read([a, b2, c2, d2, e3, f, g2, h2], 0, false, 52, 8);
    }
    createInt32Neg(f, g2) {
      return -1 - utils2.buildInt32(f, g2);
    }
    createInt64Neg(f1, f2, g1, g2) {
      const f = utils2.buildInt32(f1, f2);
      const g3 = utils2.buildInt32(g1, g2);
      if (f > c.MAX_SAFE_HIGH) {
        return c.NEG_ONE.minus(new Bignumber(f).times(c.SHIFT32).plus(g3));
      }
      return -1 - (f * c.SHIFT32 + g3);
    }
    createTrue() {
      return true;
    }
    createFalse() {
      return false;
    }
    createNull() {
      return null;
    }
    createUndefined() {
      return void 0;
    }
    createInfinity() {
      return Infinity;
    }
    createInfinityNeg() {
      return -Infinity;
    }
    createNaN() {
      return NaN;
    }
    createNaNNeg() {
      return NaN;
    }
    createUtf8String(raw, len) {
      return raw.join("");
    }
    createUtf8StringFromHeap(start, end) {
      if (start === end) {
        return "";
      }
      return this._buffer.toString("utf8", start, end);
    }
    createSimpleUnassigned(val) {
      return new Simple(val);
    }
    // -- Interface for decoder.asm.js
    pushInt(val) {
      this._push(this.createInt(val));
    }
    pushInt32(f, g2) {
      this._push(this.createInt32(f, g2));
    }
    pushInt64(f1, f2, g1, g2) {
      this._push(this.createInt64(f1, f2, g1, g2));
    }
    pushFloat(val) {
      this._push(this.createFloat(val));
    }
    pushFloatSingle(a, b2, c2, d2) {
      this._push(this.createFloatSingle(a, b2, c2, d2));
    }
    pushFloatDouble(a, b2, c2, d2, e3, f, g2, h2) {
      this._push(this.createFloatDouble(a, b2, c2, d2, e3, f, g2, h2));
    }
    pushInt32Neg(f, g2) {
      this._push(this.createInt32Neg(f, g2));
    }
    pushInt64Neg(f1, f2, g1, g2) {
      this._push(this.createInt64Neg(f1, f2, g1, g2));
    }
    pushTrue() {
      this._push(this.createTrue());
    }
    pushFalse() {
      this._push(this.createFalse());
    }
    pushNull() {
      this._push(this.createNull());
    }
    pushUndefined() {
      this._push(this.createUndefined());
    }
    pushInfinity() {
      this._push(this.createInfinity());
    }
    pushInfinityNeg() {
      this._push(this.createInfinityNeg());
    }
    pushNaN() {
      this._push(this.createNaN());
    }
    pushNaNNeg() {
      this._push(this.createNaNNeg());
    }
    pushArrayStart() {
      this._createParent([], c.PARENT.ARRAY, -1);
    }
    pushArrayStartFixed(len) {
      this._createArrayStartFixed(len);
    }
    pushArrayStartFixed32(len1, len2) {
      const len = utils2.buildInt32(len1, len2);
      this._createArrayStartFixed(len);
    }
    pushArrayStartFixed64(len1, len2, len3, len4) {
      const len = utils2.buildInt64(len1, len2, len3, len4);
      this._createArrayStartFixed(len);
    }
    pushObjectStart() {
      this._createObjectStartFixed(-1);
    }
    pushObjectStartFixed(len) {
      this._createObjectStartFixed(len);
    }
    pushObjectStartFixed32(len1, len2) {
      const len = utils2.buildInt32(len1, len2);
      this._createObjectStartFixed(len);
    }
    pushObjectStartFixed64(len1, len2, len3, len4) {
      const len = utils2.buildInt64(len1, len2, len3, len4);
      this._createObjectStartFixed(len);
    }
    pushByteStringStart() {
      this._parents[this._depth] = {
        type: c.PARENT.BYTE_STRING,
        length: -1,
        ref: [],
        values: 0,
        tmpKey: null
      };
    }
    pushByteString(start, end) {
      this._push(this.createByteStringFromHeap(start, end));
    }
    pushUtf8StringStart() {
      this._parents[this._depth] = {
        type: c.PARENT.UTF8_STRING,
        length: -1,
        ref: [],
        values: 0,
        tmpKey: null
      };
    }
    pushUtf8String(start, end) {
      this._push(this.createUtf8StringFromHeap(start, end));
    }
    pushSimpleUnassigned(val) {
      this._push(this.createSimpleUnassigned(val));
    }
    pushTagStart(tag) {
      this._parents[this._depth] = {
        type: c.PARENT.TAG,
        length: 1,
        ref: [tag]
      };
    }
    pushTagStart4(f, g2) {
      this.pushTagStart(utils2.buildInt32(f, g2));
    }
    pushTagStart8(f1, f2, g1, g2) {
      this.pushTagStart(utils2.buildInt64(f1, f2, g1, g2));
    }
    pushTagUnassigned(tagNumber) {
      this._push(this.createTag(tagNumber));
    }
    pushBreak() {
      if (this._currentParent.length > -1) {
        throw new Error("Unexpected break");
      }
      this._closeParent();
    }
    _createObjectStartFixed(len) {
      if (len === 0) {
        this._push(this.createObject({}));
        return;
      }
      this._createParent({}, c.PARENT.OBJECT, len);
    }
    _createArrayStartFixed(len) {
      if (len === 0) {
        this._push(this.createArray([]));
        return;
      }
      this._createParent(new Array(len), c.PARENT.ARRAY, len);
    }
    _decode(input) {
      if (input.byteLength === 0) {
        throw new Error("Input too short");
      }
      this._reset();
      this._heap8.set(input);
      const code = this.parser.parse(input.byteLength);
      if (this._depth > 1) {
        while (this._currentParent.length === 0) {
          this._closeParent();
        }
        if (this._depth > 1) {
          throw new Error("Undeterminated nesting");
        }
      }
      if (code > 0) {
        throw new Error("Failed to parse");
      }
      if (this._res.length === 0) {
        throw new Error("No valid result");
      }
    }
    // -- Public Interface
    decodeFirst(input) {
      this._decode(input);
      return this._res[0];
    }
    decodeAll(input) {
      this._decode(input);
      return this._res;
    }
    /**
     * Decode the first cbor object.
     *
     * @param {Buffer|string} input
     * @param {string} [enc='hex'] - Encoding used if a string is passed.
     * @returns {*}
     */
    static decode(input, enc) {
      if (typeof input === "string") {
        input = Buffer2.from(input, enc || "hex");
      }
      const dec = new Decoder({ size: input.length });
      return dec.decodeFirst(input);
    }
    /**
     * Decode all cbor objects.
     *
     * @param {Buffer|string} input
     * @param {string} [enc='hex'] - Encoding used if a string is passed.
     * @returns {Array<*>}
     */
    static decodeAll(input, enc) {
      if (typeof input === "string") {
        input = Buffer2.from(input, enc || "hex");
      }
      const dec = new Decoder({ size: input.length });
      return dec.decodeAll(input);
    }
  }
  Decoder.decodeFirst = Decoder.decode;
  decoder = Decoder;
  return decoder;
}
var diagnose;
var hasRequiredDiagnose;
function requireDiagnose() {
  if (hasRequiredDiagnose) return diagnose;
  hasRequiredDiagnose = 1;
  const { Buffer: Buffer2 } = requireBuffer();
  const Decoder = requireDecoder();
  const utils2 = requireUtils();
  class Diagnose extends Decoder {
    createTag(tagNumber, value2) {
      return `${tagNumber}(${value2})`;
    }
    createInt(val) {
      return super.createInt(val).toString();
    }
    createInt32(f, g2) {
      return super.createInt32(f, g2).toString();
    }
    createInt64(f1, f2, g1, g2) {
      return super.createInt64(f1, f2, g1, g2).toString();
    }
    createInt32Neg(f, g2) {
      return super.createInt32Neg(f, g2).toString();
    }
    createInt64Neg(f1, f2, g1, g2) {
      return super.createInt64Neg(f1, f2, g1, g2).toString();
    }
    createTrue() {
      return "true";
    }
    createFalse() {
      return "false";
    }
    createFloat(val) {
      const fl = super.createFloat(val);
      if (utils2.isNegativeZero(val)) {
        return "-0_1";
      }
      return `${fl}_1`;
    }
    createFloatSingle(a, b2, c, d2) {
      const fl = super.createFloatSingle(a, b2, c, d2);
      return `${fl}_2`;
    }
    createFloatDouble(a, b2, c, d2, e3, f, g2, h2) {
      const fl = super.createFloatDouble(a, b2, c, d2, e3, f, g2, h2);
      return `${fl}_3`;
    }
    createByteString(raw, len) {
      const val = raw.join(", ");
      if (len === -1) {
        return `(_ ${val})`;
      }
      return `h'${val}`;
    }
    createByteStringFromHeap(start, end) {
      const val = Buffer2.from(
        super.createByteStringFromHeap(start, end)
      ).toString("hex");
      return `h'${val}'`;
    }
    createInfinity() {
      return "Infinity_1";
    }
    createInfinityNeg() {
      return "-Infinity_1";
    }
    createNaN() {
      return "NaN_1";
    }
    createNaNNeg() {
      return "-NaN_1";
    }
    createNull() {
      return "null";
    }
    createUndefined() {
      return "undefined";
    }
    createSimpleUnassigned(val) {
      return `simple(${val})`;
    }
    createArray(arr, len) {
      const val = super.createArray(arr, len);
      if (len === -1) {
        return `[_ ${val.join(", ")}]`;
      }
      return `[${val.join(", ")}]`;
    }
    createMap(map, len) {
      const val = super.createMap(map);
      const list = Array.from(val.keys()).reduce(collectObject(val), "");
      if (len === -1) {
        return `{_ ${list}}`;
      }
      return `{${list}}`;
    }
    createObject(obj, len) {
      const val = super.createObject(obj);
      const map = Object.keys(val).reduce(collectObject(val), "");
      if (len === -1) {
        return `{_ ${map}}`;
      }
      return `{${map}}`;
    }
    createUtf8String(raw, len) {
      const val = raw.join(", ");
      if (len === -1) {
        return `(_ ${val})`;
      }
      return `"${val}"`;
    }
    createUtf8StringFromHeap(start, end) {
      const val = Buffer2.from(
        super.createUtf8StringFromHeap(start, end)
      ).toString("utf8");
      return `"${val}"`;
    }
    static diagnose(input, enc) {
      if (typeof input === "string") {
        input = Buffer2.from(input, enc || "hex");
      }
      const dec = new Diagnose();
      return dec.decodeFirst(input);
    }
  }
  diagnose = Diagnose;
  function collectObject(val) {
    return (acc, key) => {
      if (acc) {
        return `${acc}, ${key}: ${val[key]}`;
      }
      return `${key}: ${val[key]}`;
    };
  }
  return diagnose;
}
var encoder;
var hasRequiredEncoder;
function requireEncoder() {
  if (hasRequiredEncoder) return encoder;
  hasRequiredEncoder = 1;
  const { Buffer: Buffer2 } = requireBuffer();
  const { URL: URL2 } = requireIsoUrl();
  const Bignumber = requireBignumber().BigNumber;
  const utils2 = requireUtils();
  const constants2 = requireConstants();
  const MT = constants2.MT;
  const NUMBYTES = constants2.NUMBYTES;
  const SHIFT32 = constants2.SHIFT32;
  const SYMS = constants2.SYMS;
  const TAG = constants2.TAG;
  const HALF = constants2.MT.SIMPLE_FLOAT << 5 | constants2.NUMBYTES.TWO;
  const FLOAT = constants2.MT.SIMPLE_FLOAT << 5 | constants2.NUMBYTES.FOUR;
  const DOUBLE = constants2.MT.SIMPLE_FLOAT << 5 | constants2.NUMBYTES.EIGHT;
  const TRUE = constants2.MT.SIMPLE_FLOAT << 5 | constants2.SIMPLE.TRUE;
  const FALSE = constants2.MT.SIMPLE_FLOAT << 5 | constants2.SIMPLE.FALSE;
  const UNDEFINED = constants2.MT.SIMPLE_FLOAT << 5 | constants2.SIMPLE.UNDEFINED;
  const NULL = constants2.MT.SIMPLE_FLOAT << 5 | constants2.SIMPLE.NULL;
  const MAXINT_BN = new Bignumber("0x20000000000000");
  const BUF_NAN = Buffer2.from("f97e00", "hex");
  const BUF_INF_NEG = Buffer2.from("f9fc00", "hex");
  const BUF_INF_POS = Buffer2.from("f97c00", "hex");
  function toType(obj) {
    return {}.toString.call(obj).slice(8, -1);
  }
  class Encoder {
    /**
     * @param {Object} [options={}]
     * @param {function(Buffer)} options.stream
     */
    constructor(options) {
      options = options || {};
      this.streaming = typeof options.stream === "function";
      this.onData = options.stream;
      this.semanticTypes = [
        [URL2, this._pushUrl],
        [Bignumber, this._pushBigNumber]
      ];
      const addTypes = options.genTypes || [];
      const len = addTypes.length;
      for (let i = 0; i < len; i++) {
        this.addSemanticType(
          addTypes[i][0],
          addTypes[i][1]
        );
      }
      this._reset();
    }
    addSemanticType(type, fun) {
      const len = this.semanticTypes.length;
      for (let i = 0; i < len; i++) {
        const typ = this.semanticTypes[i][0];
        if (typ === type) {
          const old = this.semanticTypes[i][1];
          this.semanticTypes[i][1] = fun;
          return old;
        }
      }
      this.semanticTypes.push([type, fun]);
      return null;
    }
    push(val) {
      if (!val) {
        return true;
      }
      this.result[this.offset] = val;
      this.resultMethod[this.offset] = 0;
      this.resultLength[this.offset] = val.length;
      this.offset++;
      if (this.streaming) {
        this.onData(this.finalize());
      }
      return true;
    }
    pushWrite(val, method, len) {
      this.result[this.offset] = val;
      this.resultMethod[this.offset] = method;
      this.resultLength[this.offset] = len;
      this.offset++;
      if (this.streaming) {
        this.onData(this.finalize());
      }
      return true;
    }
    _pushUInt8(val) {
      return this.pushWrite(val, 1, 1);
    }
    _pushUInt16BE(val) {
      return this.pushWrite(val, 2, 2);
    }
    _pushUInt32BE(val) {
      return this.pushWrite(val, 3, 4);
    }
    _pushDoubleBE(val) {
      return this.pushWrite(val, 4, 8);
    }
    _pushNaN() {
      return this.push(BUF_NAN);
    }
    _pushInfinity(obj) {
      const half = obj < 0 ? BUF_INF_NEG : BUF_INF_POS;
      return this.push(half);
    }
    _pushFloat(obj) {
      const b2 = Buffer2.allocUnsafe(2);
      if (utils2.writeHalf(b2, obj)) {
        if (utils2.parseHalf(b2) === obj) {
          return this._pushUInt8(HALF) && this.push(b2);
        }
      }
      const b4 = Buffer2.allocUnsafe(4);
      b4.writeFloatBE(obj, 0);
      if (b4.readFloatBE(0) === obj) {
        return this._pushUInt8(FLOAT) && this.push(b4);
      }
      return this._pushUInt8(DOUBLE) && this._pushDoubleBE(obj);
    }
    _pushInt(obj, mt, orig) {
      const m = mt << 5;
      if (obj < 24) {
        return this._pushUInt8(m | obj);
      }
      if (obj <= 255) {
        return this._pushUInt8(m | NUMBYTES.ONE) && this._pushUInt8(obj);
      }
      if (obj <= 65535) {
        return this._pushUInt8(m | NUMBYTES.TWO) && this._pushUInt16BE(obj);
      }
      if (obj <= 4294967295) {
        return this._pushUInt8(m | NUMBYTES.FOUR) && this._pushUInt32BE(obj);
      }
      if (obj <= Number.MAX_SAFE_INTEGER) {
        return this._pushUInt8(m | NUMBYTES.EIGHT) && this._pushUInt32BE(Math.floor(obj / SHIFT32)) && this._pushUInt32BE(obj % SHIFT32);
      }
      if (mt === MT.NEG_INT) {
        return this._pushFloat(orig);
      }
      return this._pushFloat(obj);
    }
    _pushIntNum(obj) {
      if (obj < 0) {
        return this._pushInt(-obj - 1, MT.NEG_INT, obj);
      } else {
        return this._pushInt(obj, MT.POS_INT);
      }
    }
    _pushNumber(obj) {
      switch (false) {
        case obj === obj:
          return this._pushNaN(obj);
        case isFinite(obj):
          return this._pushInfinity(obj);
        case obj % 1 !== 0:
          return this._pushIntNum(obj);
        default:
          return this._pushFloat(obj);
      }
    }
    _pushString(obj) {
      const len = Buffer2.byteLength(obj, "utf8");
      return this._pushInt(len, MT.UTF8_STRING) && this.pushWrite(obj, 5, len);
    }
    _pushBoolean(obj) {
      return this._pushUInt8(obj ? TRUE : FALSE);
    }
    _pushUndefined(obj) {
      return this._pushUInt8(UNDEFINED);
    }
    _pushArray(gen, obj) {
      const len = obj.length;
      if (!gen._pushInt(len, MT.ARRAY)) {
        return false;
      }
      for (let j2 = 0; j2 < len; j2++) {
        if (!gen.pushAny(obj[j2])) {
          return false;
        }
      }
      return true;
    }
    _pushTag(tag) {
      return this._pushInt(tag, MT.TAG);
    }
    _pushDate(gen, obj) {
      return gen._pushTag(TAG.DATE_EPOCH) && gen.pushAny(Math.round(obj / 1e3));
    }
    _pushBuffer(gen, obj) {
      return gen._pushInt(obj.length, MT.BYTE_STRING) && gen.push(obj);
    }
    _pushNoFilter(gen, obj) {
      return gen._pushBuffer(gen, obj.slice());
    }
    _pushRegexp(gen, obj) {
      return gen._pushTag(TAG.REGEXP) && gen.pushAny(obj.source);
    }
    _pushSet(gen, obj) {
      if (!gen._pushInt(obj.size, MT.ARRAY)) {
        return false;
      }
      for (const x2 of obj) {
        if (!gen.pushAny(x2)) {
          return false;
        }
      }
      return true;
    }
    _pushUrl(gen, obj) {
      return gen._pushTag(TAG.URI) && gen.pushAny(obj.format());
    }
    _pushBigint(obj) {
      let tag = TAG.POS_BIGINT;
      if (obj.isNegative()) {
        obj = obj.negated().minus(1);
        tag = TAG.NEG_BIGINT;
      }
      let str = obj.toString(16);
      if (str.length % 2) {
        str = "0" + str;
      }
      const buf = Buffer2.from(str, "hex");
      return this._pushTag(tag) && this._pushBuffer(this, buf);
    }
    _pushBigNumber(gen, obj) {
      if (obj.isNaN()) {
        return gen._pushNaN();
      }
      if (!obj.isFinite()) {
        return gen._pushInfinity(obj.isNegative() ? -Infinity : Infinity);
      }
      if (obj.isInteger()) {
        return gen._pushBigint(obj);
      }
      if (!(gen._pushTag(TAG.DECIMAL_FRAC) && gen._pushInt(2, MT.ARRAY))) {
        return false;
      }
      const dec = obj.decimalPlaces();
      const slide = obj.multipliedBy(new Bignumber(10).pow(dec));
      if (!gen._pushIntNum(-dec)) {
        return false;
      }
      if (slide.abs().isLessThan(MAXINT_BN)) {
        return gen._pushIntNum(slide.toNumber());
      } else {
        return gen._pushBigint(slide);
      }
    }
    _pushMap(gen, obj) {
      if (!gen._pushInt(obj.size, MT.MAP)) {
        return false;
      }
      return this._pushRawMap(
        obj.size,
        Array.from(obj)
      );
    }
    _pushObject(obj) {
      if (!obj) {
        return this._pushUInt8(NULL);
      }
      var len = this.semanticTypes.length;
      for (var i = 0; i < len; i++) {
        if (obj instanceof this.semanticTypes[i][0]) {
          return this.semanticTypes[i][1].call(obj, this, obj);
        }
      }
      var f = obj.encodeCBOR;
      if (typeof f === "function") {
        return f.call(obj, this);
      }
      var keys = Object.keys(obj);
      var keyLength = keys.length;
      if (!this._pushInt(keyLength, MT.MAP)) {
        return false;
      }
      return this._pushRawMap(
        keyLength,
        keys.map((k2) => [k2, obj[k2]])
      );
    }
    _pushRawMap(len, map) {
      map = map.map(function(a) {
        a[0] = Encoder.encode(a[0]);
        return a;
      }).sort(utils2.keySorter);
      for (var j2 = 0; j2 < len; j2++) {
        if (!this.push(map[j2][0])) {
          return false;
        }
        if (!this.pushAny(map[j2][1])) {
          return false;
        }
      }
      return true;
    }
    /**
     * Alias for `.pushAny`
     *
     * @param {*} obj
     * @returns {boolean} true on success
     */
    write(obj) {
      return this.pushAny(obj);
    }
    /**
     * Push any supported type onto the encoded stream
     *
     * @param {any} obj
     * @returns {boolean} true on success
     */
    pushAny(obj) {
      var typ = toType(obj);
      switch (typ) {
        case "Number":
          return this._pushNumber(obj);
        case "String":
          return this._pushString(obj);
        case "Boolean":
          return this._pushBoolean(obj);
        case "Object":
          return this._pushObject(obj);
        case "Array":
          return this._pushArray(this, obj);
        case "Uint8Array":
          return this._pushBuffer(this, Buffer2.isBuffer(obj) ? obj : Buffer2.from(obj));
        case "Null":
          return this._pushUInt8(NULL);
        case "Undefined":
          return this._pushUndefined(obj);
        case "Map":
          return this._pushMap(this, obj);
        case "Set":
          return this._pushSet(this, obj);
        case "URL":
          return this._pushUrl(this, obj);
        case "BigNumber":
          return this._pushBigNumber(this, obj);
        case "Date":
          return this._pushDate(this, obj);
        case "RegExp":
          return this._pushRegexp(this, obj);
        case "Symbol":
          switch (obj) {
            case SYMS.NULL:
              return this._pushObject(null);
            case SYMS.UNDEFINED:
              return this._pushUndefined(void 0);
            // TODO: Add pluggable support for other symbols
            default:
              throw new Error("Unknown symbol: " + obj.toString());
          }
        default:
          throw new Error("Unknown type: " + typeof obj + ", " + (obj ? obj.toString() : ""));
      }
    }
    finalize() {
      if (this.offset === 0) {
        return null;
      }
      var result = this.result;
      var resultLength = this.resultLength;
      var resultMethod = this.resultMethod;
      var offset = this.offset;
      var size = 0;
      var i = 0;
      for (; i < offset; i++) {
        size += resultLength[i];
      }
      var res = Buffer2.allocUnsafe(size);
      var index2 = 0;
      var length = 0;
      for (i = 0; i < offset; i++) {
        length = resultLength[i];
        switch (resultMethod[i]) {
          case 0:
            result[i].copy(res, index2);
            break;
          case 1:
            res.writeUInt8(result[i], index2, true);
            break;
          case 2:
            res.writeUInt16BE(result[i], index2, true);
            break;
          case 3:
            res.writeUInt32BE(result[i], index2, true);
            break;
          case 4:
            res.writeDoubleBE(result[i], index2, true);
            break;
          case 5:
            res.write(result[i], index2, length, "utf8");
            break;
          default:
            throw new Error("unkown method");
        }
        index2 += length;
      }
      var tmp = res;
      this._reset();
      return tmp;
    }
    _reset() {
      this.result = [];
      this.resultMethod = [];
      this.resultLength = [];
      this.offset = 0;
    }
    /**
     * Encode the given value
     * @param {*} o
     * @returns {Buffer}
     */
    static encode(o) {
      const enc = new Encoder();
      const ret = enc.pushAny(o);
      if (!ret) {
        throw new Error("Failed to encode input");
      }
      return enc.finalize();
    }
  }
  encoder = Encoder;
  return encoder;
}
var hasRequiredSrc$1;
function requireSrc$1() {
  if (hasRequiredSrc$1) return src$1;
  hasRequiredSrc$1 = 1;
  (function(exports) {
    exports.Diagnose = requireDiagnose();
    exports.Decoder = requireDecoder();
    exports.Encoder = requireEncoder();
    exports.Simple = requireSimple();
    exports.Tagged = requireTagged();
    exports.decodeAll = exports.Decoder.decodeAll;
    exports.decodeFirst = exports.Decoder.decodeFirst;
    exports.diagnose = exports.Diagnose.diagnose;
    exports.encode = exports.Encoder.encode;
    exports.decode = exports.Decoder.decode;
    exports.leveldb = {
      decode: exports.Decoder.decodeAll,
      encode: exports.Encoder.encode,
      buffer: true,
      name: "cbor"
    };
  })(src$1);
  return src$1;
}
var srcExports$1 = requireSrc$1();
const borc = /* @__PURE__ */ getDefaultExportFromCjs(srcExports$1);
function hash(data) {
  return uint8ToBuf$1(sha256.create().update(new Uint8Array(data)).digest());
}
function hashValue(value2) {
  if (value2 instanceof borc.Tagged) {
    return hashValue(value2.value);
  } else if (typeof value2 === "string") {
    return hashString(value2);
  } else if (typeof value2 === "number") {
    return hash(lebEncode(value2));
  } else if (value2 instanceof ArrayBuffer || ArrayBuffer.isView(value2)) {
    return hash(value2);
  } else if (Array.isArray(value2)) {
    const vals = value2.map(hashValue);
    return hash(concat$1(...vals));
  } else if (value2 && typeof value2 === "object" && value2._isPrincipal) {
    return hash(value2.toUint8Array());
  } else if (typeof value2 === "object" && value2 !== null && typeof value2.toHash === "function") {
    return hashValue(value2.toHash());
  } else if (typeof value2 === "object") {
    return hashOfMap(value2);
  } else if (typeof value2 === "bigint") {
    return hash(lebEncode(value2));
  }
  throw Object.assign(new Error(`Attempt to hash a value of unsupported type: ${value2}`), {
    // include so logs/callers can understand the confusing value.
    // (when stringified in error message, prototype info is lost)
    value: value2
  });
}
const hashString = (value2) => {
  const encoded = new TextEncoder().encode(value2);
  return hash(encoded);
};
function requestIdOf(request2) {
  return hashOfMap(request2);
}
function hashOfMap(map) {
  const hashed = Object.entries(map).filter(([, value2]) => value2 !== void 0).map(([key, value2]) => {
    const hashedKey = hashString(key);
    const hashedValue = hashValue(value2);
    return [hashedKey, hashedValue];
  });
  const traversed = hashed;
  const sorted = traversed.sort(([k1], [k2]) => {
    return compare$1(k1, k2);
  });
  const concatenated = concat$1(...sorted.map((x2) => concat$1(...x2)));
  const result = hash(concatenated);
  return result;
}
var __rest$1 = function(s, e3) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e3.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e3.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const domainSeparator$1 = new TextEncoder().encode("\nic-request");
class SignIdentity {
  /**
   * Get the principal represented by this identity. Normally should be a
   * `Principal.selfAuthenticating()`.
   */
  getPrincipal() {
    if (!this._principal) {
      this._principal = Principal$1.selfAuthenticating(new Uint8Array(this.getPublicKey().toDer()));
    }
    return this._principal;
  }
  /**
   * Transform a request into a signed version of the request. This is done last
   * after the transforms on the body of a request. The returned object can be
   * anything, but must be serializable to CBOR.
   * @param request - internet computer request to transform
   */
  async transformRequest(request2) {
    const { body } = request2, fields = __rest$1(request2, ["body"]);
    const requestId = requestIdOf(body);
    return Object.assign(Object.assign({}, fields), { body: {
      content: body,
      sender_pubkey: this.getPublicKey().toDer(),
      sender_sig: await this.sign(concat$1(domainSeparator$1, requestId))
    } });
  }
}
class AnonymousIdentity {
  getPrincipal() {
    return Principal$1.anonymous();
  }
  async transformRequest(request2) {
    return Object.assign(Object.assign({}, request2), { body: { content: request2.body } });
  }
}
var src = {};
var serializer$1 = {};
var value = {};
var hasRequiredValue;
function requireValue() {
  if (hasRequiredValue) return value;
  hasRequiredValue = 1;
  Object.defineProperty(value, "__esModule", { value: true });
  const MAX_U64_NUMBER = 9007199254740992;
  function _concat(a, ...args) {
    const newBuffer = new Uint8Array(a.byteLength + args.reduce((acc, b2) => acc + b2.byteLength, 0));
    newBuffer.set(new Uint8Array(a), 0);
    let i = a.byteLength;
    for (const b2 of args) {
      newBuffer.set(new Uint8Array(b2), i);
      i += b2.byteLength;
    }
    return newBuffer.buffer;
  }
  function _serializeValue(major, minor, value2) {
    value2 = value2.replace(/[^0-9a-fA-F]/g, "");
    const length = 2 ** (minor - 24);
    value2 = value2.slice(-length * 2).padStart(length * 2, "0");
    const bytes2 = [(major << 5) + minor].concat(value2.match(/../g).map((byte) => parseInt(byte, 16)));
    return new Uint8Array(bytes2).buffer;
  }
  function _serializeNumber(major, value2) {
    if (value2 < 24) {
      return new Uint8Array([(major << 5) + value2]).buffer;
    } else {
      const minor = value2 <= 255 ? 24 : value2 <= 65535 ? 25 : value2 <= 4294967295 ? 26 : 27;
      return _serializeValue(major, minor, value2.toString(16));
    }
  }
  function _serializeString(str) {
    const utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 128) {
        utf8.push(charcode);
      } else if (charcode < 2048) {
        utf8.push(192 | charcode >> 6, 128 | charcode & 63);
      } else if (charcode < 55296 || charcode >= 57344) {
        utf8.push(224 | charcode >> 12, 128 | charcode >> 6 & 63, 128 | charcode & 63);
      } else {
        i++;
        charcode = (charcode & 1023) << 10 | str.charCodeAt(i) & 1023;
        utf8.push(240 | charcode >> 18, 128 | charcode >> 12 & 63, 128 | charcode >> 6 & 63, 128 | charcode & 63);
      }
    }
    return _concat(new Uint8Array(_serializeNumber(3, str.length)), new Uint8Array(utf8));
  }
  function tagged2(tag, value2) {
    if (tag == 14277111) {
      return _concat(new Uint8Array([217, 217, 247]), value2);
    }
    if (tag < 24) {
      return _concat(new Uint8Array([(6 << 5) + tag]), value2);
    } else {
      const minor = tag <= 255 ? 24 : tag <= 65535 ? 25 : tag <= 4294967295 ? 26 : 27;
      const length = 2 ** (minor - 24);
      const value3 = tag.toString(16).slice(-length * 2).padStart(length * 2, "0");
      const bytes2 = [(6 << 5) + minor].concat(value3.match(/../g).map((byte) => parseInt(byte, 16)));
      return new Uint8Array(bytes2).buffer;
    }
  }
  value.tagged = tagged2;
  function raw(bytes2) {
    return new Uint8Array(bytes2).buffer;
  }
  value.raw = raw;
  function uSmall(n) {
    if (isNaN(n)) {
      throw new RangeError("Invalid number.");
    }
    n = Math.min(Math.max(0, n), 23);
    const bytes2 = [(0 << 5) + n];
    return new Uint8Array(bytes2).buffer;
  }
  value.uSmall = uSmall;
  function u8(u82, radix) {
    u82 = parseInt("" + u82, radix);
    if (isNaN(u82)) {
      throw new RangeError("Invalid number.");
    }
    u82 = Math.min(Math.max(0, u82), 255);
    u82 = u82.toString(16);
    return _serializeValue(0, 24, u82);
  }
  value.u8 = u8;
  function u16(u162, radix) {
    u162 = parseInt("" + u162, radix);
    if (isNaN(u162)) {
      throw new RangeError("Invalid number.");
    }
    u162 = Math.min(Math.max(0, u162), 65535);
    u162 = u162.toString(16);
    return _serializeValue(0, 25, u162);
  }
  value.u16 = u16;
  function u32(u322, radix) {
    u322 = parseInt("" + u322, radix);
    if (isNaN(u322)) {
      throw new RangeError("Invalid number.");
    }
    u322 = Math.min(Math.max(0, u322), 4294967295);
    u322 = u322.toString(16);
    return _serializeValue(0, 26, u322);
  }
  value.u32 = u32;
  function u64(u642, radix) {
    if (typeof u642 == "string" && radix == 16) {
      if (u642.match(/[^0-9a-fA-F]/)) {
        throw new RangeError("Invalid number.");
      }
      return _serializeValue(0, 27, u642);
    }
    u642 = parseInt("" + u642, radix);
    if (isNaN(u642)) {
      throw new RangeError("Invalid number.");
    }
    u642 = Math.min(Math.max(0, u642), MAX_U64_NUMBER);
    u642 = u642.toString(16);
    return _serializeValue(0, 27, u642);
  }
  value.u64 = u64;
  function iSmall(n) {
    if (isNaN(n)) {
      throw new RangeError("Invalid number.");
    }
    if (n === 0) {
      return uSmall(0);
    }
    n = Math.min(Math.max(0, -n), 24) - 1;
    const bytes2 = [(1 << 5) + n];
    return new Uint8Array(bytes2).buffer;
  }
  value.iSmall = iSmall;
  function i8(i82, radix) {
    i82 = parseInt("" + i82, radix);
    if (isNaN(i82)) {
      throw new RangeError("Invalid number.");
    }
    i82 = Math.min(Math.max(0, -i82 - 1), 255);
    i82 = i82.toString(16);
    return _serializeValue(1, 24, i82);
  }
  value.i8 = i8;
  function i16(i162, radix) {
    i162 = parseInt("" + i162, radix);
    if (isNaN(i162)) {
      throw new RangeError("Invalid number.");
    }
    i162 = Math.min(Math.max(0, -i162 - 1), 65535);
    i162 = i162.toString(16);
    return _serializeValue(1, 25, i162);
  }
  value.i16 = i16;
  function i32(i322, radix) {
    i322 = parseInt("" + i322, radix);
    if (isNaN(i322)) {
      throw new RangeError("Invalid number.");
    }
    i322 = Math.min(Math.max(0, -i322 - 1), 4294967295);
    i322 = i322.toString(16);
    return _serializeValue(1, 26, i322);
  }
  value.i32 = i32;
  function i64(i642, radix) {
    if (typeof i642 == "string" && radix == 16) {
      if (i642.startsWith("-")) {
        i642 = i642.slice(1);
      } else {
        i642 = "0";
      }
      if (i642.match(/[^0-9a-fA-F]/) || i642.length > 16) {
        throw new RangeError("Invalid number.");
      }
      let done = false;
      let newI64 = i642.split("").reduceRight((acc, x2) => {
        if (done) {
          return x2 + acc;
        }
        let n = parseInt(x2, 16) - 1;
        if (n >= 0) {
          done = true;
          return n.toString(16) + acc;
        } else {
          return "f" + acc;
        }
      }, "");
      if (!done) {
        return u64(0);
      }
      return _serializeValue(1, 27, newI64);
    }
    i642 = parseInt("" + i642, radix);
    if (isNaN(i642)) {
      throw new RangeError("Invalid number.");
    }
    i642 = Math.min(Math.max(0, -i642 - 1), 9007199254740992);
    i642 = i642.toString(16);
    return _serializeValue(1, 27, i642);
  }
  value.i64 = i64;
  function number(n) {
    if (n >= 0) {
      if (n < 24) {
        return uSmall(n);
      } else if (n <= 255) {
        return u8(n);
      } else if (n <= 65535) {
        return u16(n);
      } else if (n <= 4294967295) {
        return u32(n);
      } else {
        return u64(n);
      }
    } else {
      if (n >= -24) {
        return iSmall(n);
      } else if (n >= -255) {
        return i8(n);
      } else if (n >= -65535) {
        return i16(n);
      } else if (n >= -4294967295) {
        return i32(n);
      } else {
        return i64(n);
      }
    }
  }
  value.number = number;
  function bytes(bytes2) {
    return _concat(_serializeNumber(2, bytes2.byteLength), bytes2);
  }
  value.bytes = bytes;
  function string(str) {
    return _serializeString(str);
  }
  value.string = string;
  function array(items) {
    return _concat(_serializeNumber(4, items.length), ...items);
  }
  value.array = array;
  function map(items, stable = false) {
    if (!(items instanceof Map)) {
      items = new Map(Object.entries(items));
    }
    let entries = Array.from(items.entries());
    if (stable) {
      entries = entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    }
    return _concat(_serializeNumber(5, items.size), ...entries.map(([k2, v2]) => _concat(_serializeString(k2), v2)));
  }
  value.map = map;
  function singleFloat(f) {
    const single = new Float32Array([f]);
    return _concat(new Uint8Array([(7 << 5) + 26]), new Uint8Array(single.buffer));
  }
  value.singleFloat = singleFloat;
  function doubleFloat(f) {
    const single = new Float64Array([f]);
    return _concat(new Uint8Array([(7 << 5) + 27]), new Uint8Array(single.buffer));
  }
  value.doubleFloat = doubleFloat;
  function bool(v2) {
    return v2 ? true_() : false_();
  }
  value.bool = bool;
  function true_() {
    return raw(new Uint8Array([(7 << 5) + 21]));
  }
  value.true_ = true_;
  function false_() {
    return raw(new Uint8Array([(7 << 5) + 20]));
  }
  value.false_ = false_;
  function null_() {
    return raw(new Uint8Array([(7 << 5) + 22]));
  }
  value.null_ = null_;
  function undefined_() {
    return raw(new Uint8Array([(7 << 5) + 23]));
  }
  value.undefined_ = undefined_;
  return value;
}
var hasRequiredSerializer;
function requireSerializer() {
  if (hasRequiredSerializer) return serializer$1;
  hasRequiredSerializer = 1;
  var __importStar = serializer$1 && serializer$1.__importStar || function(mod2) {
    if (mod2 && mod2.__esModule) return mod2;
    var result = {};
    if (mod2 != null) {
      for (var k2 in mod2) if (Object.hasOwnProperty.call(mod2, k2)) result[k2] = mod2[k2];
    }
    result["default"] = mod2;
    return result;
  };
  Object.defineProperty(serializer$1, "__esModule", { value: true });
  const cbor = __importStar(requireValue());
  const BufferClasses = [
    ArrayBuffer,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Float32Array,
    Float64Array
  ];
  class JsonDefaultCborEncoder {
    // @param _serializer The CBOR Serializer to use.
    // @param _stable Whether or not keys from objects should be sorted (stable). This is
    //     particularly useful when testing encodings between JSON objects.
    constructor(_serializer, _stable = false) {
      this._serializer = _serializer;
      this._stable = _stable;
      this.name = "jsonDefault";
      this.priority = -100;
    }
    match(value2) {
      return ["undefined", "boolean", "number", "string", "object"].indexOf(typeof value2) != -1;
    }
    encode(value2) {
      switch (typeof value2) {
        case "undefined":
          return cbor.undefined_();
        case "boolean":
          return cbor.bool(value2);
        case "number":
          if (Math.floor(value2) === value2) {
            return cbor.number(value2);
          } else {
            return cbor.doubleFloat(value2);
          }
        case "string":
          return cbor.string(value2);
        case "object":
          if (value2 === null) {
            return cbor.null_();
          } else if (Array.isArray(value2)) {
            return cbor.array(value2.map((x2) => this._serializer.serializeValue(x2)));
          } else if (BufferClasses.find((x2) => value2 instanceof x2)) {
            return cbor.bytes(value2.buffer);
          } else if (Object.getOwnPropertyNames(value2).indexOf("toJSON") !== -1) {
            return this.encode(value2.toJSON());
          } else if (value2 instanceof Map) {
            const m = /* @__PURE__ */ new Map();
            for (const [key, item] of value2.entries()) {
              m.set(key, this._serializer.serializeValue(item));
            }
            return cbor.map(m, this._stable);
          } else {
            const m = /* @__PURE__ */ new Map();
            for (const [key, item] of Object.entries(value2)) {
              m.set(key, this._serializer.serializeValue(item));
            }
            return cbor.map(m, this._stable);
          }
        default:
          throw new Error("Invalid value.");
      }
    }
  }
  serializer$1.JsonDefaultCborEncoder = JsonDefaultCborEncoder;
  class ToCborEncoder {
    constructor() {
      this.name = "cborEncoder";
      this.priority = -90;
    }
    match(value2) {
      return typeof value2 == "object" && typeof value2["toCBOR"] == "function";
    }
    encode(value2) {
      return value2.toCBOR();
    }
  }
  serializer$1.ToCborEncoder = ToCborEncoder;
  class CborSerializer {
    constructor() {
      this._encoders = /* @__PURE__ */ new Set();
    }
    static withDefaultEncoders(stable = false) {
      const s = new this();
      s.addEncoder(new JsonDefaultCborEncoder(s, stable));
      s.addEncoder(new ToCborEncoder());
      return s;
    }
    removeEncoder(name) {
      for (const encoder2 of this._encoders.values()) {
        if (encoder2.name == name) {
          this._encoders.delete(encoder2);
        }
      }
    }
    addEncoder(encoder2) {
      this._encoders.add(encoder2);
    }
    getEncoderFor(value2) {
      let chosenEncoder = null;
      for (const encoder2 of this._encoders) {
        if (!chosenEncoder || encoder2.priority > chosenEncoder.priority) {
          if (encoder2.match(value2)) {
            chosenEncoder = encoder2;
          }
        }
      }
      if (chosenEncoder === null) {
        throw new Error("Could not find an encoder for value.");
      }
      return chosenEncoder;
    }
    serializeValue(value2) {
      return this.getEncoderFor(value2).encode(value2);
    }
    serialize(value2) {
      return this.serializeValue(value2);
    }
  }
  serializer$1.CborSerializer = CborSerializer;
  class SelfDescribeCborSerializer extends CborSerializer {
    serialize(value2) {
      return cbor.raw(new Uint8Array([
        // Self describe CBOR.
        ...new Uint8Array([217, 217, 247]),
        ...new Uint8Array(super.serializeValue(value2))
      ]));
    }
  }
  serializer$1.SelfDescribeCborSerializer = SelfDescribeCborSerializer;
  return serializer$1;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    function __export(m) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    var __importStar = src && src.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule) return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k2 in mod2) if (Object.hasOwnProperty.call(mod2, k2)) result[k2] = mod2[k2];
      }
      result["default"] = mod2;
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(requireSerializer());
    const value2 = __importStar(requireValue());
    exports.value = value2;
  })(src);
  return src;
}
var srcExports = requireSrc();
class PrincipalEncoder {
  get name() {
    return "Principal";
  }
  get priority() {
    return 0;
  }
  match(value2) {
    return value2 && value2._isPrincipal === true;
  }
  encode(v2) {
    return srcExports.value.bytes(v2.toUint8Array());
  }
}
class BufferEncoder {
  get name() {
    return "Buffer";
  }
  get priority() {
    return 1;
  }
  match(value2) {
    return value2 instanceof ArrayBuffer || ArrayBuffer.isView(value2);
  }
  encode(v2) {
    return srcExports.value.bytes(new Uint8Array(v2));
  }
}
class BigIntEncoder {
  get name() {
    return "BigInt";
  }
  get priority() {
    return 1;
  }
  match(value2) {
    return typeof value2 === `bigint`;
  }
  encode(v2) {
    if (v2 > BigInt(0)) {
      return srcExports.value.tagged(2, srcExports.value.bytes(fromHex(v2.toString(16))));
    } else {
      return srcExports.value.tagged(3, srcExports.value.bytes(fromHex((BigInt("-1") * v2).toString(16))));
    }
  }
}
const serializer = srcExports.SelfDescribeCborSerializer.withDefaultEncoders(true);
serializer.addEncoder(new PrincipalEncoder());
serializer.addEncoder(new BufferEncoder());
serializer.addEncoder(new BigIntEncoder());
var CborTag;
(function(CborTag2) {
  CborTag2[CborTag2["Uint64LittleEndian"] = 71] = "Uint64LittleEndian";
  CborTag2[CborTag2["Semantic"] = 55799] = "Semantic";
})(CborTag || (CborTag = {}));
function encode(value2) {
  return serializer.serialize(value2);
}
function decodePositiveBigInt(buf) {
  const len = buf.byteLength;
  let res = BigInt(0);
  for (let i = 0; i < len; i++) {
    res = res * BigInt(256) + BigInt(buf[i]);
  }
  return res;
}
class Uint8ArrayDecoder extends borc.Decoder {
  createByteString(raw) {
    return concat$1(...raw);
  }
  createByteStringFromHeap(start, end) {
    if (start === end) {
      return new ArrayBuffer(0);
    }
    return new Uint8Array(this._heap.slice(start, end));
  }
}
function decode(input) {
  const buffer2 = new Uint8Array(input);
  const decoder2 = new Uint8ArrayDecoder({
    size: buffer2.byteLength,
    tags: {
      // Override tags 2 and 3 for BigInt support (borc supports only BigNumber).
      2: (val) => decodePositiveBigInt(val),
      3: (val) => -decodePositiveBigInt(val),
      [CborTag.Semantic]: (value2) => value2
    }
  });
  try {
    return decoder2.decodeFirst(buffer2);
  } catch (e3) {
    throw new Error(`Failed to decode CBOR: ${e3}, input: ${toHex(buffer2)}`);
  }
}
const randomNumber = () => {
  if (typeof window !== "undefined" && !!window.crypto && !!window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.randomInt) {
    return crypto.randomInt(0, 4294967295);
  }
  return Math.floor(Math.random() * 4294967295);
};
var SubmitRequestType;
(function(SubmitRequestType2) {
  SubmitRequestType2["Call"] = "call";
})(SubmitRequestType || (SubmitRequestType = {}));
function makeNonce() {
  const buffer2 = new ArrayBuffer(16);
  const view = new DataView(buffer2);
  const rand1 = randomNumber();
  const rand2 = randomNumber();
  const rand3 = randomNumber();
  const rand4 = randomNumber();
  view.setUint32(0, rand1);
  view.setUint32(4, rand2);
  view.setUint32(8, rand3);
  view.setUint32(12, rand4);
  return buffer2;
}
const NANOSECONDS_PER_MILLISECONDS = BigInt(1e6);
const REPLICA_PERMITTED_DRIFT_MILLISECONDS = 60 * 1e3;
class Expiry {
  constructor(deltaInMSec) {
    if (deltaInMSec < 90 * 1e3) {
      const raw_value2 = BigInt(Date.now() + deltaInMSec) * NANOSECONDS_PER_MILLISECONDS;
      const ingress_as_seconds2 = raw_value2 / BigInt(1e9);
      this._value = ingress_as_seconds2 * BigInt(1e9);
      return;
    }
    const raw_value = BigInt(Math.floor(Date.now() + deltaInMSec - REPLICA_PERMITTED_DRIFT_MILLISECONDS)) * NANOSECONDS_PER_MILLISECONDS;
    const ingress_as_seconds = raw_value / BigInt(1e9);
    const ingress_as_minutes = ingress_as_seconds / BigInt(60);
    const rounded_down_nanos = ingress_as_minutes * BigInt(60) * BigInt(1e9);
    this._value = rounded_down_nanos;
  }
  toCBOR() {
    return srcExports.value.u64(this._value.toString(16), 16);
  }
  toHash() {
    return lebEncode(this._value);
  }
}
function makeNonceTransform(nonceFn = makeNonce) {
  return async (request2) => {
    const headers = request2.request.headers;
    request2.request.headers = headers;
    if (request2.endpoint === "call") {
      request2.body.nonce = nonceFn();
    }
  };
}
function httpHeadersTransform(headers) {
  const headerFields = [];
  headers.forEach((value2, key) => {
    headerFields.push([key, value2]);
  });
  return headerFields;
}
class AgentHTTPResponseError extends AgentError {
  constructor(message, response) {
    super(message);
    this.response = response;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
class AgentCallError extends AgentError {
  constructor(message, response, requestId, senderPubkey, senderSig, ingressExpiry) {
    super(message);
    this.response = response;
    this.requestId = requestId;
    this.senderPubkey = senderPubkey;
    this.senderSig = senderSig;
    this.ingressExpiry = ingressExpiry;
    this.name = "AgentCallError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
class AgentQueryError extends AgentError {
  constructor(message, response, requestId, senderPubkey, senderSig, ingressExpiry) {
    super(message);
    this.response = response;
    this.requestId = requestId;
    this.senderPubkey = senderPubkey;
    this.senderSig = senderSig;
    this.ingressExpiry = ingressExpiry;
    this.name = "AgentQueryError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
class AgentReadStateError extends AgentError {
  constructor(message, response, requestId, senderPubkey, senderSig, ingressExpiry) {
    super(message);
    this.response = response;
    this.requestId = requestId;
    this.senderPubkey = senderPubkey;
    this.senderSig = senderSig;
    this.ingressExpiry = ingressExpiry;
    this.name = "AgentReadStateError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$7 = /* @__PURE__ */ BigInt(0);
const _1n$8 = /* @__PURE__ */ BigInt(1);
function _abool2(value2, title = "") {
  if (typeof value2 !== "boolean") {
    const prefix = title && `"${title}"`;
    throw new Error(prefix + "expected boolean, got type=" + typeof value2);
  }
  return value2;
}
function _abytes2(value2, length, title = "") {
  const bytes = isBytes(value2);
  const len = value2?.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value2}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value2;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n$7 : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  abytes(bytes);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e3) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e3);
    }
  } else if (isBytes(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}
const isPosBig = (n) => typeof n === "bigint" && _0n$7 <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n$7; n >>= _1n$8, len += 1)
    ;
  return len;
}
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n$8;
}
const bitMask = (n) => (_1n$8 << BigInt(n)) - _1n$8;
function isHash(val) {
  return typeof val === "function" && Number.isSafeInteger(val.outputLen);
}
function _validateObject(object, fields, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  Object.entries(fields).forEach(([k2, v2]) => checkField(k2, v2, false));
  Object.entries(optFields).forEach(([k2, v2]) => checkField(k2, v2, true));
}
const notImplemented = () => {
  throw new Error("not implemented");
};
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$6 = BigInt(0), _1n$7 = BigInt(1), _2n$6 = /* @__PURE__ */ BigInt(2), _3n$4 = /* @__PURE__ */ BigInt(3);
const _4n$2 = /* @__PURE__ */ BigInt(4), _5n$1 = /* @__PURE__ */ BigInt(5), _7n = /* @__PURE__ */ BigInt(7);
const _8n$2 = /* @__PURE__ */ BigInt(8), _9n = /* @__PURE__ */ BigInt(9), _16n = /* @__PURE__ */ BigInt(16);
function mod(a, b2) {
  const result = a % b2;
  return result >= _0n$6 ? result : b2 + result;
}
function pow2(x2, power, modulo) {
  let res = x2;
  while (power-- > _0n$6) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n$6)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n$6)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod(number, modulo);
  let b2 = modulo;
  let x2 = _0n$6, u = _1n$7;
  while (a !== _0n$6) {
    const q = b2 / a;
    const r = b2 % a;
    const m = x2 - u * q;
    b2 = a, a = r, x2 = u, u = m;
  }
  const gcd = b2;
  if (gcd !== _1n$7)
    throw new Error("invert: does not exist");
  return mod(x2, modulo);
}
function assertIsSquare(Fp3, root, n) {
  if (!Fp3.eql(Fp3.sqr(root), n))
    throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp3, n) {
  const p1div4 = (Fp3.ORDER + _1n$7) / _4n$2;
  const root = Fp3.pow(n, p1div4);
  assertIsSquare(Fp3, root, n);
  return root;
}
function sqrt5mod8(Fp3, n) {
  const p5div8 = (Fp3.ORDER - _5n$1) / _8n$2;
  const n2 = Fp3.mul(n, _2n$6);
  const v2 = Fp3.pow(n2, p5div8);
  const nv = Fp3.mul(n, v2);
  const i = Fp3.mul(Fp3.mul(nv, _2n$6), v2);
  const root = Fp3.mul(nv, Fp3.sub(i, Fp3.ONE));
  assertIsSquare(Fp3, root, n);
  return root;
}
function sqrt9mod16(P2) {
  const Fp_ = Field(P2);
  const tn = tonelliShanks(P2);
  const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
  const c2 = tn(Fp_, c1);
  const c3 = tn(Fp_, Fp_.neg(c1));
  const c4 = (P2 + _7n) / _16n;
  return (Fp3, n) => {
    let tv1 = Fp3.pow(n, c4);
    let tv2 = Fp3.mul(tv1, c1);
    const tv3 = Fp3.mul(tv1, c2);
    const tv4 = Fp3.mul(tv1, c3);
    const e1 = Fp3.eql(Fp3.sqr(tv2), n);
    const e22 = Fp3.eql(Fp3.sqr(tv3), n);
    tv1 = Fp3.cmov(tv1, tv2, e1);
    tv2 = Fp3.cmov(tv4, tv3, e22);
    const e3 = Fp3.eql(Fp3.sqr(tv2), n);
    const root = Fp3.cmov(tv1, tv2, e3);
    assertIsSquare(Fp3, root, n);
    return root;
  };
}
function tonelliShanks(P2) {
  if (P2 < _3n$4)
    throw new Error("sqrt is not defined for small field");
  let Q = P2 - _1n$7;
  let S2 = 0;
  while (Q % _2n$6 === _0n$6) {
    Q /= _2n$6;
    S2++;
  }
  let Z = _2n$6;
  const _Fp = Field(P2);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S2 === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n$7) / _2n$6;
  return function tonelliSlow(Fp3, n) {
    if (Fp3.is0(n))
      return n;
    if (FpLegendre(Fp3, n) !== 1)
      throw new Error("Cannot find square root");
    let M2 = S2;
    let c = Fp3.mul(Fp3.ONE, cc);
    let t = Fp3.pow(n, Q);
    let R = Fp3.pow(n, Q1div2);
    while (!Fp3.eql(t, Fp3.ONE)) {
      if (Fp3.is0(t))
        return Fp3.ZERO;
      let i = 1;
      let t_tmp = Fp3.sqr(t);
      while (!Fp3.eql(t_tmp, Fp3.ONE)) {
        i++;
        t_tmp = Fp3.sqr(t_tmp);
        if (i === M2)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n$7 << BigInt(M2 - i - 1);
      const b2 = Fp3.pow(c, exponent);
      M2 = i;
      c = Fp3.sqr(b2);
      t = Fp3.mul(t, c);
      R = Fp3.mul(R, b2);
    }
    return R;
  };
}
function FpSqrt(P2) {
  if (P2 % _4n$2 === _3n$4)
    return sqrt3mod4;
  if (P2 % _8n$2 === _5n$1)
    return sqrt5mod8;
  if (P2 % _16n === _9n)
    return sqrt9mod16(P2);
  return tonelliShanks(P2);
}
const isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n$7) === _1n$7;
const FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  _validateObject(field, opts);
  return field;
}
function FpPow(Fp3, num, power) {
  if (power < _0n$6)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n$6)
    return Fp3.ONE;
  if (power === _1n$7)
    return num;
  let p = Fp3.ONE;
  let d2 = num;
  while (power > _0n$6) {
    if (power & _1n$7)
      p = Fp3.mul(p, d2);
    d2 = Fp3.sqr(d2);
    power >>= _1n$7;
  }
  return p;
}
function FpInvertBatch(Fp3, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp3.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i) => {
    if (Fp3.is0(num))
      return acc;
    inverted[i] = acc;
    return Fp3.mul(acc, num);
  }, Fp3.ONE);
  const invertedAcc = Fp3.inv(multipliedAcc);
  nums.reduceRight((acc, num, i) => {
    if (Fp3.is0(num))
      return acc;
    inverted[i] = Fp3.mul(acc, inverted[i]);
    return Fp3.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp3, n) {
  const p1mod2 = (Fp3.ORDER - _1n$7) / _2n$6;
  const powered = Fp3.pow(n, p1mod2);
  const yes = Fp3.eql(powered, Fp3.ONE);
  const zero = Fp3.eql(powered, Fp3.ZERO);
  const no = Fp3.eql(powered, Fp3.neg(Fp3.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLenOrOpts, isLE = false, opts = {}) {
  if (ORDER <= _0n$6)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  let _nbitLength = void 0;
  let _sqrt = void 0;
  let modFromBytes = false;
  let allowedLengths = void 0;
  if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
    if (opts.sqrt || isLE)
      throw new Error("cannot specify opts in two arguments");
    const _opts = bitLenOrOpts;
    if (_opts.BITS)
      _nbitLength = _opts.BITS;
    if (_opts.sqrt)
      _sqrt = _opts.sqrt;
    if (typeof _opts.isLE === "boolean")
      isLE = _opts.isLE;
    if (typeof _opts.modFromBytes === "boolean")
      modFromBytes = _opts.modFromBytes;
    allowedLengths = _opts.allowedLengths;
  } else {
    if (typeof bitLenOrOpts === "number")
      _nbitLength = bitLenOrOpts;
    if (opts.sqrt)
      _sqrt = opts.sqrt;
  }
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, _nbitLength);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n$6,
    ONE: _1n$7,
    allowedLengths,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n$6 <= num && num < ORDER;
    },
    is0: (num) => num === _0n$6,
    // is valid and invertible
    isValidNot0: (num) => !f.is0(num) && f.isValid(num),
    isOdd: (num) => (num & _1n$7) === _1n$7,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: _sqrt || ((n) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n);
    }),
    toBytes: (num) => isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes, skipValidation = true) => {
      if (allowedLengths) {
        if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
          throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
        }
        const padded = new Uint8Array(BYTES);
        padded.set(bytes, isLE ? 0 : padded.length - bytes.length);
        bytes = padded;
      }
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      let scalar = isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
      if (modFromBytes)
        scalar = mod(scalar, ORDER);
      if (!skipValidation) {
        if (!f.isValid(scalar))
          throw new Error("invalid field element: outside of range 0..ORDER");
      }
      return scalar;
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a, b2, c) => c ? b2 : a
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n$7) + _1n$7;
  return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$5 = BigInt(0);
const _1n$6 = BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c, points) {
  const invertedZs = FpInvertBatch(c.Fp, points.map((p) => p.Z));
  return points.map((p, i) => c.fromAffine(p.toAffine(invertedZs[i])));
}
function validateW(W2, bits) {
  if (!Number.isSafeInteger(W2) || W2 <= 0 || W2 > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W2);
}
function calcWOpts(W2, scalarBits) {
  validateW(W2, scalarBits);
  const windows = Math.ceil(scalarBits / W2) + 1;
  const windowSize = 2 ** (W2 - 1);
  const maxNumber = 2 ** W2;
  const mask = bitMask(W2);
  const shiftBy = BigInt(W2);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n$6;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p, i) => {
    if (!(p instanceof c))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s, i) => {
    if (!field.isValid(s))
      throw new Error("invalid scalar at index " + i);
  });
}
const pointPrecomputes = /* @__PURE__ */ new WeakMap();
const pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P2) {
  return pointWindowSizes.get(P2) || 1;
}
function assert0(n) {
  if (n !== _0n$5)
    throw new Error("invalid wNAF");
}
class wNAF {
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n, p = this.ZERO) {
    let d2 = elm;
    while (n > _0n$5) {
      if (n & _1n$6)
        p = p.add(d2);
      d2 = d2.double();
      n >>= _1n$6;
    }
    return p;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W2) {
    const { windows, windowSize } = calcWOpts(W2, this.bits);
    const points = [];
    let p = point;
    let base = p;
    for (let window2 = 0; window2 < windows; window2++) {
      base = p;
      points.push(base);
      for (let i = 1; i < windowSize; i++) {
        base = base.add(p);
        points.push(base);
      }
      p = base.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W2, precomputes, n) {
    if (!this.Fn.isValid(n))
      throw new Error("invalid scalar");
    let p = this.ZERO;
    let f = this.BASE;
    const wo = calcWOpts(W2, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window2, wo);
      n = nextN;
      if (isZero) {
        f = f.add(negateCt(isNegF, precomputes[offsetF]));
      } else {
        p = p.add(negateCt(isNeg, precomputes[offset]));
      }
    }
    assert0(n);
    return { p, f };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W2, precomputes, n, acc = this.ZERO) {
    const wo = calcWOpts(W2, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      if (n === _0n$5)
        break;
      const { nextN, offset, isZero, isNeg } = calcOffsets(n, window2, wo);
      n = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert0(n);
    return acc;
  }
  getPrecomputes(W2, point, transform) {
    let comp = pointPrecomputes.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W2);
      if (W2 !== 1) {
        if (typeof transform === "function")
          comp = transform(comp);
        pointPrecomputes.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W2 = getW(point);
    return this.wNAF(W2, this.getPrecomputes(W2, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W2 = getW(point);
    if (W2 === 1)
      return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W2, this.getPrecomputes(W2, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P2, W2) {
    validateW(W2, this.bits);
    pointWindowSizes.set(P2, W2);
    pointPrecomputes.delete(P2);
  }
  hasCache(elm) {
    return getW(elm) !== 1;
  }
}
function mulEndoUnsafe(Point, point, k1, k2) {
  let acc = point;
  let p1 = Point.ZERO;
  let p2 = Point.ZERO;
  while (k1 > _0n$5 || k2 > _0n$5) {
    if (k1 & _1n$6)
      p1 = p1.add(acc);
    if (k2 & _1n$6)
      p2 = p2.add(acc);
    acc = acc.double();
    k1 >>= _1n$6;
    k2 >>= _1n$6;
  }
  return { p1, p2 };
}
function pippenger(c, fieldN, points, scalars) {
  validateMSMPoints(points, c);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j2 = 0; j2 < slength; j2++) {
      const scalar = scalars[j2];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j2]);
    }
    let resI = zero;
    for (let j2 = buckets.length - 1, sumI = zero; j2 > 0; j2--) {
      sumI = sumI.add(buckets[j2]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j2 = 0; j2 < windowSize; j2++)
        sum = sum.double();
  }
  return sum;
}
function createField(order, field, isLE) {
  if (field) {
    if (field.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField(field);
    return field;
  } else {
    return Field(order, { isLE });
  }
}
function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0)
    FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p of ["p", "n", "h"]) {
    const val = CURVE[p];
    if (!(typeof val === "bigint" && val > _0n$5))
      throw new Error(`CURVE.${p} must be positive bigint`);
  }
  const Fp3 = createField(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b2 = type === "weierstrass" ? "b" : "d";
  const params = ["Gx", "Gy", "a", _b2];
  for (const p of params) {
    if (!Fp3.isValid(CURVE[p]))
      throw new Error(`CURVE.${p} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp: Fp3, Fn };
}
const os2ip = bytesToNumberBE;
function i2osp(value2, length) {
  anum(value2);
  anum(length);
  if (value2 < 0 || value2 >= 1 << 8 * length)
    throw new Error("invalid I2OSP input: " + value2);
  const res = Array.from({ length }).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    res[i] = value2 & 255;
    value2 >>>= 8;
  }
  return new Uint8Array(res);
}
function strxor(a, b2) {
  const arr = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    arr[i] = a[i] ^ b2[i];
  }
  return arr;
}
function anum(item) {
  if (!Number.isSafeInteger(item))
    throw new Error("number expected");
}
function normDST(DST) {
  if (!isBytes(DST) && typeof DST !== "string")
    throw new Error("DST must be Uint8Array or string");
  return typeof DST === "string" ? utf8ToBytes(DST) : DST;
}
function expand_message_xmd(msg, DST, lenInBytes, H2) {
  abytes(msg);
  anum(lenInBytes);
  DST = normDST(DST);
  if (DST.length > 255)
    DST = H2(concatBytes(utf8ToBytes("H2C-OVERSIZE-DST-"), DST));
  const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H2;
  const ell = Math.ceil(lenInBytes / b_in_bytes);
  if (lenInBytes > 65535 || ell > 255)
    throw new Error("expand_message_xmd: invalid lenInBytes");
  const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
  const Z_pad = i2osp(0, r_in_bytes);
  const l_i_b_str = i2osp(lenInBytes, 2);
  const b2 = new Array(ell);
  const b_0 = H2(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
  b2[0] = H2(concatBytes(b_0, i2osp(1, 1), DST_prime));
  for (let i = 1; i <= ell; i++) {
    const args = [strxor(b_0, b2[i - 1]), i2osp(i + 1, 1), DST_prime];
    b2[i] = H2(concatBytes(...args));
  }
  const pseudo_random_bytes = concatBytes(...b2);
  return pseudo_random_bytes.slice(0, lenInBytes);
}
function expand_message_xof(msg, DST, lenInBytes, k2, H2) {
  abytes(msg);
  anum(lenInBytes);
  DST = normDST(DST);
  if (DST.length > 255) {
    const dkLen = Math.ceil(2 * k2 / 8);
    DST = H2.create({ dkLen }).update(utf8ToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
  }
  if (lenInBytes > 65535 || DST.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return H2.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
function hash_to_field(msg, count, options) {
  _validateObject(options, {
    p: "bigint",
    m: "number",
    k: "number",
    hash: "function"
  });
  const { p, k: k2, m, hash: hash2, expand, DST } = options;
  if (!isHash(options.hash))
    throw new Error("expected valid hash");
  abytes(msg);
  anum(count);
  const log2p = p.toString(2).length;
  const L2 = Math.ceil((log2p + k2) / 8);
  const len_in_bytes = count * m * L2;
  let prb;
  if (expand === "xmd") {
    prb = expand_message_xmd(msg, DST, len_in_bytes, hash2);
  } else if (expand === "xof") {
    prb = expand_message_xof(msg, DST, len_in_bytes, k2, hash2);
  } else if (expand === "_internal_pass") {
    prb = msg;
  } else {
    throw new Error('expand must be "xmd" or "xof"');
  }
  const u = new Array(count);
  for (let i = 0; i < count; i++) {
    const e3 = new Array(m);
    for (let j2 = 0; j2 < m; j2++) {
      const elm_offset = L2 * (j2 + i * m);
      const tv = prb.subarray(elm_offset, elm_offset + L2);
      e3[j2] = mod(os2ip(tv), p);
    }
    u[i] = e3;
  }
  return u;
}
function isogenyMap(field, map) {
  const coeff = map.map((i) => Array.from(i).reverse());
  return (x2, y) => {
    const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x2), i)));
    const [xd_inv, yd_inv] = FpInvertBatch(field, [xd, yd], true);
    x2 = field.mul(xn, xd_inv);
    y = field.mul(y, field.mul(yn, yd_inv));
    return { x: x2, y };
  };
}
const _DST_scalar = utf8ToBytes("HashToScalar-");
function createHasher(Point, mapToCurve, defaults) {
  if (typeof mapToCurve !== "function")
    throw new Error("mapToCurve() must be defined");
  function map(num) {
    return Point.fromAffine(mapToCurve(num));
  }
  function clear(initial) {
    const P2 = initial.clearCofactor();
    if (P2.equals(Point.ZERO))
      return Point.ZERO;
    P2.assertValidity();
    return P2;
  }
  return {
    defaults,
    hashToCurve(msg, options) {
      const opts = Object.assign({}, defaults, options);
      const u = hash_to_field(msg, 2, opts);
      const u0 = map(u[0]);
      const u1 = map(u[1]);
      return clear(u0.add(u1));
    },
    encodeToCurve(msg, options) {
      const optsDst = defaults.encodeDST ? { DST: defaults.encodeDST } : {};
      const opts = Object.assign({}, defaults, optsDst, options);
      const u = hash_to_field(msg, 1, opts);
      const u0 = map(u[0]);
      return clear(u0);
    },
    /** See {@link H2CHasher} */
    mapToCurve(scalars) {
      if (!Array.isArray(scalars))
        throw new Error("expected array of bigints");
      for (const i of scalars)
        if (typeof i !== "bigint")
          throw new Error("expected array of bigints");
      return clear(map(scalars));
    },
    // hash_to_scalar can produce 0: https://www.rfc-editor.org/errata/eid8393
    // RFC 9380, draft-irtf-cfrg-bbs-signatures-08
    hashToScalar(msg, options) {
      const N2 = Point.Fn.ORDER;
      const opts = Object.assign({}, defaults, { p: N2, m: 1, DST: _DST_scalar }, options);
      return hash_to_field(msg, 1, opts)[0][0];
    }
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const divNearest = (num, den) => (num + (num >= 0 ? den : -den) / _2n$5) / den;
function _splitEndoScalar(k2, basis, n) {
  const [[a1, b1], [a2, b2]] = basis;
  const c1 = divNearest(b2 * k2, n);
  const c2 = divNearest(-b1 * k2, n);
  let k1 = k2 - c1 * a1 - c2 * a2;
  let k22 = -c1 * b1 - c2 * b2;
  const k1neg = k1 < _0n$4;
  const k2neg = k22 < _0n$4;
  if (k1neg)
    k1 = -k1;
  if (k2neg)
    k22 = -k22;
  const MAX_NUM = bitMask(Math.ceil(bitLen(n) / 2)) + _1n$5;
  if (k1 < _0n$4 || k1 >= MAX_NUM || k22 < _0n$4 || k22 >= MAX_NUM) {
    throw new Error("splitScalar (endomorphism): failed, k=" + k2);
  }
  return { k1neg, k1, k2neg, k2: k22 };
}
const _0n$4 = BigInt(0), _1n$5 = BigInt(1), _2n$5 = BigInt(2), _3n$3 = BigInt(3), _4n$1 = BigInt(4);
function _normFnElement(Fn, key) {
  const { BYTES: expected } = Fn;
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else {
    let bytes = ensureBytes("private key", key);
    try {
      num = Fn.fromBytes(bytes);
    } catch (error) {
      throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
    }
  }
  if (!Fn.isValidNot0(num))
    throw new Error("invalid private key: out of range [1..N-1]");
  return num;
}
function weierstrassN(params, extraOpts = {}) {
  const validated = _createCurveFields("weierstrass", params, extraOpts);
  const { Fp: Fp3, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  _validateObject(extraOpts, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object",
    wrapPrivateKey: "boolean"
  });
  const { endo } = extraOpts;
  if (endo) {
    if (!Fp3.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
      throw new Error('invalid endo: expected "beta": bigint and "basises": array');
    }
  }
  const lengths = getWLengths(Fp3, Fn);
  function assertCompressionIsSupported() {
    if (!Fp3.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes(_c, point, isCompressed) {
    const { x: x2, y } = point.toAffine();
    const bx = Fp3.toBytes(x2);
    _abool2(isCompressed, "isCompressed");
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp3.isOdd(y);
      return concatBytes(pprefix(hasEvenY), bx);
    } else {
      return concatBytes(Uint8Array.of(4), bx, Fp3.toBytes(y));
    }
  }
  function pointFromBytes(bytes) {
    _abytes2(bytes, void 0, "Point");
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    const length = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length === comp && (head === 2 || head === 3)) {
      const x2 = Fp3.fromBytes(tail);
      if (!Fp3.isValid(x2))
        throw new Error("bad point: is not on curve, wrong x");
      const y2 = weierstrassEquation(x2);
      let y;
      try {
        y = Fp3.sqrt(y2);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const isYOdd = Fp3.isOdd(y);
      const isHeadOdd = (head & 1) === 1;
      if (isHeadOdd !== isYOdd)
        y = Fp3.neg(y);
      return { x: x2, y };
    } else if (length === uncomp && head === 4) {
      const L2 = Fp3.BYTES;
      const x2 = Fp3.fromBytes(tail.subarray(0, L2));
      const y = Fp3.fromBytes(tail.subarray(L2, L2 * 2));
      if (!isValidXY(x2, y))
        throw new Error("bad point: is not on curve");
      return { x: x2, y };
    } else {
      throw new Error(`bad point: got length ${length}, expected compressed=${comp} or uncompressed=${uncomp}`);
    }
  }
  const encodePoint = extraOpts.toBytes || pointToBytes;
  const decodePoint = extraOpts.fromBytes || pointFromBytes;
  function weierstrassEquation(x2) {
    const x22 = Fp3.sqr(x2);
    const x3 = Fp3.mul(x22, x2);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x2, CURVE.a)), CURVE.b);
  }
  function isValidXY(x2, y) {
    const left = Fp3.sqr(y);
    const right = weierstrassEquation(x2);
    return Fp3.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp3.mul(Fp3.pow(CURVE.a, _3n$3), _4n$1);
  const _27b2 = Fp3.mul(Fp3.sqr(CURVE.b), BigInt(27));
  if (Fp3.is0(Fp3.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function acoord(title, n, banZero = false) {
    if (!Fp3.isValid(n) || banZero && Fp3.is0(n))
      throw new Error(`bad point coordinate ${title}`);
    return n;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  function splitEndoScalarN(k2) {
    if (!endo || !endo.basises)
      throw new Error("no endo");
    return _splitEndoScalar(k2, endo.basises, Fn.ORDER);
  }
  const toAffineMemo = memoized((p, iz) => {
    const { X, Y, Z } = p;
    if (Fp3.eql(Z, Fp3.ONE))
      return { x: X, y: Y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp3.ONE : Fp3.inv(Z);
    const x2 = Fp3.mul(X, iz);
    const y = Fp3.mul(Y, iz);
    const zz = Fp3.mul(Z, iz);
    if (is0)
      return { x: Fp3.ZERO, y: Fp3.ZERO };
    if (!Fp3.eql(zz, Fp3.ONE))
      throw new Error("invZ was invalid");
    return { x: x2, y };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (extraOpts.allowInfinityPoint && !Fp3.is0(p.Y))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: x2, y } = p.toAffine();
    if (!Fp3.isValid(x2) || !Fp3.isValid(y))
      throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x2, y))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp3.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  class Point {
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(X, Y, Z) {
      this.X = acoord("x", X);
      this.Y = acoord("y", Y, true);
      this.Z = acoord("z", Z);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p) {
      const { x: x2, y } = p || {};
      if (!p || !Fp3.isValid(x2) || !Fp3.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point)
        throw new Error("projective point not allowed");
      if (Fp3.is0(x2) && Fp3.is0(y))
        return Point.ZERO;
      return new Point(x2, y, Fp3.ONE);
    }
    static fromBytes(bytes) {
      const P2 = Point.fromAffine(decodePoint(_abytes2(bytes, void 0, "point")));
      P2.assertValidity();
      return P2;
    }
    static fromHex(hex) {
      return Point.fromBytes(ensureBytes("pointHex", hex));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_3n$3);
      return this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (!Fp3.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !Fp3.isOdd(y);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const U1 = Fp3.eql(Fp3.mul(X1, Z2), Fp3.mul(X2, Z1));
      const U2 = Fp3.eql(Fp3.mul(Y1, Z2), Fp3.mul(Y2, Z1));
      return U1 && U2;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new Point(this.X, Fp3.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b: b2 } = CURVE;
      const b3 = Fp3.mul(b2, _3n$3);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      let t0 = Fp3.mul(X1, X1);
      let t1 = Fp3.mul(Y1, Y1);
      let t2 = Fp3.mul(Z1, Z1);
      let t3 = Fp3.mul(X1, Y1);
      t3 = Fp3.add(t3, t3);
      Z3 = Fp3.mul(X1, Z1);
      Z3 = Fp3.add(Z3, Z3);
      X3 = Fp3.mul(a, Z3);
      Y3 = Fp3.mul(b3, t2);
      Y3 = Fp3.add(X3, Y3);
      X3 = Fp3.sub(t1, Y3);
      Y3 = Fp3.add(t1, Y3);
      Y3 = Fp3.mul(X3, Y3);
      X3 = Fp3.mul(t3, X3);
      Z3 = Fp3.mul(b3, Z3);
      t2 = Fp3.mul(a, t2);
      t3 = Fp3.sub(t0, t2);
      t3 = Fp3.mul(a, t3);
      t3 = Fp3.add(t3, Z3);
      Z3 = Fp3.add(t0, t0);
      t0 = Fp3.add(Z3, t0);
      t0 = Fp3.add(t0, t2);
      t0 = Fp3.mul(t0, t3);
      Y3 = Fp3.add(Y3, t0);
      t2 = Fp3.mul(Y1, Z1);
      t2 = Fp3.add(t2, t2);
      t0 = Fp3.mul(t2, t3);
      X3 = Fp3.sub(X3, t0);
      Z3 = Fp3.mul(t2, t1);
      Z3 = Fp3.add(Z3, Z3);
      Z3 = Fp3.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      const a = CURVE.a;
      const b3 = Fp3.mul(CURVE.b, _3n$3);
      let t0 = Fp3.mul(X1, X2);
      let t1 = Fp3.mul(Y1, Y2);
      let t2 = Fp3.mul(Z1, Z2);
      let t3 = Fp3.add(X1, Y1);
      let t4 = Fp3.add(X2, Y2);
      t3 = Fp3.mul(t3, t4);
      t4 = Fp3.add(t0, t1);
      t3 = Fp3.sub(t3, t4);
      t4 = Fp3.add(X1, Z1);
      let t5 = Fp3.add(X2, Z2);
      t4 = Fp3.mul(t4, t5);
      t5 = Fp3.add(t0, t2);
      t4 = Fp3.sub(t4, t5);
      t5 = Fp3.add(Y1, Z1);
      X3 = Fp3.add(Y2, Z2);
      t5 = Fp3.mul(t5, X3);
      X3 = Fp3.add(t1, t2);
      t5 = Fp3.sub(t5, X3);
      Z3 = Fp3.mul(a, t4);
      X3 = Fp3.mul(b3, t2);
      Z3 = Fp3.add(X3, Z3);
      X3 = Fp3.sub(t1, Z3);
      Z3 = Fp3.add(t1, Z3);
      Y3 = Fp3.mul(X3, Z3);
      t1 = Fp3.add(t0, t0);
      t1 = Fp3.add(t1, t0);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.mul(b3, t4);
      t1 = Fp3.add(t1, t2);
      t2 = Fp3.sub(t0, t2);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.add(t4, t2);
      t0 = Fp3.mul(t1, t4);
      Y3 = Fp3.add(Y3, t0);
      t0 = Fp3.mul(t5, t4);
      X3 = Fp3.mul(t3, X3);
      X3 = Fp3.sub(X3, t0);
      t0 = Fp3.mul(t3, t1);
      Z3 = Fp3.mul(t5, Z3);
      Z3 = Fp3.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = extraOpts;
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul = (n) => wnaf.cached(this, n, (p) => normalizeZ(Point, p));
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
        const { p: k1p, f: k1f } = mul(k1);
        const { p: k2p, f: k2f } = mul(k2);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p, f } = mul(scalar);
        point = p;
        fake = f;
      }
      return normalizeZ(Point, [point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = extraOpts;
      const p = this;
      if (!Fn.isValid(sc))
        throw new Error("invalid scalar: out of range");
      if (sc === _0n$4 || p.is0())
        return Point.ZERO;
      if (sc === _1n$5)
        return p;
      if (wnaf.hasCache(this))
        return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
        const { p1, p2 } = mulEndoUnsafe(Point, p, k1, k2);
        return finishEndo(endo2.beta, p1, p2, k1neg, k2neg);
      } else {
        return wnaf.unsafe(p, sc);
      }
    }
    multiplyAndAddUnsafe(Q, a, b2) {
      const sum = this.multiplyUnsafe(a).add(Q.multiplyUnsafe(b2));
      return sum.is0() ? void 0 : sum;
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = extraOpts;
      if (cofactor === _1n$5)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      return wnaf.unsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = extraOpts;
      if (cofactor === _1n$5)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    toBytes(isCompressed = true) {
      _abool2(isCompressed, "isCompressed");
      this.assertValidity();
      return encodePoint(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(isCompressed = true) {
      return this.toBytes(isCompressed);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(_normFnElement(Fn, privateKey));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp3.ONE);
  Point.ZERO = new Point(Fp3.ZERO, Fp3.ONE, Fp3.ZERO);
  Point.Fp = Fp3;
  Point.Fn = Fn;
  const bits = Fn.BITS;
  const wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
  Point.BASE.precompute(8);
  return Point;
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function SWUFpSqrtRatio(Fp3, Z) {
  const q = Fp3.ORDER;
  let l = _0n$4;
  for (let o = q - _1n$5; o % _2n$5 === _0n$4; o /= _2n$5)
    l += _1n$5;
  const c1 = l;
  const _2n_pow_c1_1 = _2n$5 << c1 - _1n$5 - _1n$5;
  const _2n_pow_c1 = _2n_pow_c1_1 * _2n$5;
  const c2 = (q - _1n$5) / _2n_pow_c1;
  const c3 = (c2 - _1n$5) / _2n$5;
  const c4 = _2n_pow_c1 - _1n$5;
  const c5 = _2n_pow_c1_1;
  const c6 = Fp3.pow(Z, c2);
  const c7 = Fp3.pow(Z, (c2 + _1n$5) / _2n$5);
  let sqrtRatio = (u, v2) => {
    let tv1 = c6;
    let tv2 = Fp3.pow(v2, c4);
    let tv3 = Fp3.sqr(tv2);
    tv3 = Fp3.mul(tv3, v2);
    let tv5 = Fp3.mul(u, tv3);
    tv5 = Fp3.pow(tv5, c3);
    tv5 = Fp3.mul(tv5, tv2);
    tv2 = Fp3.mul(tv5, v2);
    tv3 = Fp3.mul(tv5, u);
    let tv4 = Fp3.mul(tv3, tv2);
    tv5 = Fp3.pow(tv4, c5);
    let isQR = Fp3.eql(tv5, Fp3.ONE);
    tv2 = Fp3.mul(tv3, c7);
    tv5 = Fp3.mul(tv4, tv1);
    tv3 = Fp3.cmov(tv2, tv3, isQR);
    tv4 = Fp3.cmov(tv5, tv4, isQR);
    for (let i = c1; i > _1n$5; i--) {
      let tv52 = i - _2n$5;
      tv52 = _2n$5 << tv52 - _1n$5;
      let tvv5 = Fp3.pow(tv4, tv52);
      const e1 = Fp3.eql(tvv5, Fp3.ONE);
      tv2 = Fp3.mul(tv3, tv1);
      tv1 = Fp3.mul(tv1, tv1);
      tvv5 = Fp3.mul(tv4, tv1);
      tv3 = Fp3.cmov(tv2, tv3, e1);
      tv4 = Fp3.cmov(tvv5, tv4, e1);
    }
    return { isValid: isQR, value: tv3 };
  };
  if (Fp3.ORDER % _4n$1 === _3n$3) {
    const c12 = (Fp3.ORDER - _3n$3) / _4n$1;
    const c22 = Fp3.sqrt(Fp3.neg(Z));
    sqrtRatio = (u, v2) => {
      let tv1 = Fp3.sqr(v2);
      const tv2 = Fp3.mul(u, v2);
      tv1 = Fp3.mul(tv1, tv2);
      let y1 = Fp3.pow(tv1, c12);
      y1 = Fp3.mul(y1, tv2);
      const y2 = Fp3.mul(y1, c22);
      const tv3 = Fp3.mul(Fp3.sqr(y1), v2);
      const isQR = Fp3.eql(tv3, u);
      let y = Fp3.cmov(y2, y1, isQR);
      return { isValid: isQR, value: y };
    };
  }
  return sqrtRatio;
}
function mapToCurveSimpleSWU(Fp3, opts) {
  validateField(Fp3);
  const { A: A2, B: B2, Z } = opts;
  if (!Fp3.isValid(A2) || !Fp3.isValid(B2) || !Fp3.isValid(Z))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const sqrtRatio = SWUFpSqrtRatio(Fp3, Z);
  if (!Fp3.isOdd)
    throw new Error("Field does not have .isOdd()");
  return (u) => {
    let tv1, tv2, tv3, tv4, tv5, tv6, x2, y;
    tv1 = Fp3.sqr(u);
    tv1 = Fp3.mul(tv1, Z);
    tv2 = Fp3.sqr(tv1);
    tv2 = Fp3.add(tv2, tv1);
    tv3 = Fp3.add(tv2, Fp3.ONE);
    tv3 = Fp3.mul(tv3, B2);
    tv4 = Fp3.cmov(Z, Fp3.neg(tv2), !Fp3.eql(tv2, Fp3.ZERO));
    tv4 = Fp3.mul(tv4, A2);
    tv2 = Fp3.sqr(tv3);
    tv6 = Fp3.sqr(tv4);
    tv5 = Fp3.mul(tv6, A2);
    tv2 = Fp3.add(tv2, tv5);
    tv2 = Fp3.mul(tv2, tv3);
    tv6 = Fp3.mul(tv6, tv4);
    tv5 = Fp3.mul(tv6, B2);
    tv2 = Fp3.add(tv2, tv5);
    x2 = Fp3.mul(tv1, tv3);
    const { isValid, value: value2 } = sqrtRatio(tv2, tv6);
    y = Fp3.mul(tv1, u);
    y = Fp3.mul(y, value2);
    x2 = Fp3.cmov(x2, tv3, isValid);
    y = Fp3.cmov(y, value2, isValid);
    const e1 = Fp3.isOdd(u) === Fp3.isOdd(y);
    y = Fp3.cmov(Fp3.neg(y), y, e1);
    const tv4_inv = FpInvertBatch(Fp3, [tv4], true)[0];
    x2 = Fp3.mul(x2, tv4_inv);
    return { x: x2, y };
  };
}
function getWLengths(Fp3, Fn) {
  return {
    secretKey: Fn.BYTES,
    publicKey: 1 + Fp3.BYTES,
    publicKeyUncompressed: 1 + 2 * Fp3.BYTES,
    publicKeyHasPrefix: true,
    signature: 2 * Fn.BYTES
  };
}
function weierstrassPoints(c) {
  const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c);
  const Point = weierstrassN(CURVE, curveOpts);
  return _weierstrass_new_output_to_legacy(c, Point);
}
function _weierstrass_legacy_opts_to_new(c) {
  const CURVE = {
    a: c.a,
    b: c.b,
    p: c.Fp.ORDER,
    n: c.n,
    h: c.h,
    Gx: c.Gx,
    Gy: c.Gy
  };
  const Fp3 = c.Fp;
  let allowedLengths = c.allowedPrivateKeyLengths ? Array.from(new Set(c.allowedPrivateKeyLengths.map((l) => Math.ceil(l / 2)))) : void 0;
  const Fn = Field(CURVE.n, {
    BITS: c.nBitLength,
    allowedLengths,
    modFromBytes: c.wrapPrivateKey
  });
  const curveOpts = {
    Fp: Fp3,
    Fn,
    allowInfinityPoint: c.allowInfinityPoint,
    endo: c.endo,
    isTorsionFree: c.isTorsionFree,
    clearCofactor: c.clearCofactor,
    fromBytes: c.fromBytes,
    toBytes: c.toBytes
  };
  return { CURVE, curveOpts };
}
function _legacyHelperEquat(Fp3, a, b2) {
  function weierstrassEquation(x2) {
    const x22 = Fp3.sqr(x2);
    const x3 = Fp3.mul(x22, x2);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x2, a)), b2);
  }
  return weierstrassEquation;
}
function _weierstrass_new_output_to_legacy(c, Point) {
  const { Fp: Fp3, Fn } = Point;
  function isWithinCurveOrder(num) {
    return inRange(num, _1n$5, Fn.ORDER);
  }
  const weierstrassEquation = _legacyHelperEquat(Fp3, c.a, c.b);
  return Object.assign({}, {
    CURVE: c,
    Point,
    ProjectivePoint: Point,
    normPrivateKeyToScalar: (key) => _normFnElement(Fn, key),
    weierstrassEquation,
    isWithinCurveOrder
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$3 = BigInt(0), _1n$4 = BigInt(1), _2n$4 = BigInt(2), _3n$2 = BigInt(3);
function NAfDecomposition(a) {
  const res = [];
  for (; a > _1n$4; a >>= _1n$4) {
    if ((a & _1n$4) === _0n$3)
      res.unshift(0);
    else if ((a & _3n$2) === _3n$2) {
      res.unshift(-1);
      a += _1n$4;
    } else
      res.unshift(1);
  }
  return res;
}
function aNonEmpty(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error("expected non-empty array");
}
function createBlsPairing(fields, G1, G2, params) {
  const { Fp2: Fp22, Fp12: Fp122 } = fields;
  const { twistType, ateLoopSize, xNegative, postPrecompute } = params;
  let lineFunction;
  if (twistType === "multiplicative") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul014(f, c0, Fp22.mul(c1, Px), Fp22.mul(c2, Py));
  } else if (twistType === "divisive") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul034(f, Fp22.mul(c2, Py), Fp22.mul(c1, Px), c0);
  } else
    throw new Error("bls: unknown twist type");
  const Fp2div2 = Fp22.div(Fp22.ONE, Fp22.mul(Fp22.ONE, _2n$4));
  function pointDouble(ell, Rx, Ry, Rz) {
    const t0 = Fp22.sqr(Ry);
    const t1 = Fp22.sqr(Rz);
    const t2 = Fp22.mulByB(Fp22.mul(t1, _3n$2));
    const t3 = Fp22.mul(t2, _3n$2);
    const t4 = Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(Ry, Rz)), t1), t0);
    const c0 = Fp22.sub(t2, t0);
    const c1 = Fp22.mul(Fp22.sqr(Rx), _3n$2);
    const c2 = Fp22.neg(t4);
    ell.push([c0, c1, c2]);
    Rx = Fp22.mul(Fp22.mul(Fp22.mul(Fp22.sub(t0, t3), Rx), Ry), Fp2div2);
    Ry = Fp22.sub(Fp22.sqr(Fp22.mul(Fp22.add(t0, t3), Fp2div2)), Fp22.mul(Fp22.sqr(t2), _3n$2));
    Rz = Fp22.mul(t0, t4);
    return { Rx, Ry, Rz };
  }
  function pointAdd(ell, Rx, Ry, Rz, Qx, Qy) {
    const t0 = Fp22.sub(Ry, Fp22.mul(Qy, Rz));
    const t1 = Fp22.sub(Rx, Fp22.mul(Qx, Rz));
    const c0 = Fp22.sub(Fp22.mul(t0, Qx), Fp22.mul(t1, Qy));
    const c1 = Fp22.neg(t0);
    const c2 = t1;
    ell.push([c0, c1, c2]);
    const t2 = Fp22.sqr(t1);
    const t3 = Fp22.mul(t2, t1);
    const t4 = Fp22.mul(t2, Rx);
    const t5 = Fp22.add(Fp22.sub(t3, Fp22.mul(t4, _2n$4)), Fp22.mul(Fp22.sqr(t0), Rz));
    Rx = Fp22.mul(t1, t5);
    Ry = Fp22.sub(Fp22.mul(Fp22.sub(t4, t5), t0), Fp22.mul(t3, Ry));
    Rz = Fp22.mul(Rz, t3);
    return { Rx, Ry, Rz };
  }
  const ATE_NAF = NAfDecomposition(ateLoopSize);
  const calcPairingPrecomputes = memoized((point) => {
    const p = point;
    const { x: x2, y } = p.toAffine();
    const Qx = x2, Qy = y, negQy = Fp22.neg(y);
    let Rx = Qx, Ry = Qy, Rz = Fp22.ONE;
    const ell = [];
    for (const bit of ATE_NAF) {
      const cur = [];
      ({ Rx, Ry, Rz } = pointDouble(cur, Rx, Ry, Rz));
      if (bit)
        ({ Rx, Ry, Rz } = pointAdd(cur, Rx, Ry, Rz, Qx, bit === -1 ? negQy : Qy));
      ell.push(cur);
    }
    if (postPrecompute) {
      const last = ell[ell.length - 1];
      postPrecompute(Rx, Ry, Rz, Qx, Qy, pointAdd.bind(null, last));
    }
    return ell;
  });
  function millerLoopBatch(pairs, withFinalExponent = false) {
    let f12 = Fp122.ONE;
    if (pairs.length) {
      const ellLen = pairs[0][0].length;
      for (let i = 0; i < ellLen; i++) {
        f12 = Fp122.sqr(f12);
        for (const [ell, Px, Py] of pairs) {
          for (const [c0, c1, c2] of ell[i])
            f12 = lineFunction(c0, c1, c2, f12, Px, Py);
        }
      }
    }
    if (xNegative)
      f12 = Fp122.conjugate(f12);
    return withFinalExponent ? Fp122.finalExponentiate(f12) : f12;
  }
  function pairingBatch(pairs, withFinalExponent = true) {
    const res = [];
    normalizeZ(G1, pairs.map(({ g1 }) => g1));
    normalizeZ(G2, pairs.map(({ g2 }) => g2));
    for (const { g1, g2 } of pairs) {
      if (g1.is0() || g2.is0())
        throw new Error("pairing is not available for ZERO point");
      g1.assertValidity();
      g2.assertValidity();
      const Qa = g1.toAffine();
      res.push([calcPairingPrecomputes(g2), Qa.x, Qa.y]);
    }
    return millerLoopBatch(res, withFinalExponent);
  }
  function pairing(Q, P2, withFinalExponent = true) {
    return pairingBatch([{ g1: Q, g2: P2 }], withFinalExponent);
  }
  return {
    Fp12: Fp122,
    // NOTE: we re-export Fp12 here because pairing results are Fp12!
    millerLoopBatch,
    pairing,
    pairingBatch,
    calcPairingPrecomputes
  };
}
function createBlsSig(blsPairing, PubCurve, SigCurve, SignatureCoder, isSigG1) {
  const { Fp12: Fp122, pairingBatch } = blsPairing;
  function normPub(point) {
    return point instanceof PubCurve.Point ? point : PubCurve.Point.fromHex(point);
  }
  function normSig(point) {
    return point instanceof SigCurve.Point ? point : SigCurve.Point.fromHex(point);
  }
  function amsg(m) {
    if (!(m instanceof SigCurve.Point))
      throw new Error(`expected valid message hashed to ${!isSigG1 ? "G2" : "G1"} curve`);
    return m;
  }
  const pair = !isSigG1 ? (a, b2) => ({ g1: a, g2: b2 }) : (a, b2) => ({ g1: b2, g2: a });
  return {
    // P = pk x G
    getPublicKey(secretKey) {
      const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
      return PubCurve.Point.BASE.multiply(sec);
    },
    // S = pk x H(m)
    sign(message, secretKey, unusedArg) {
      if (unusedArg != null)
        throw new Error("sign() expects 2 arguments");
      const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
      amsg(message).assertValidity();
      return message.multiply(sec);
    },
    // Checks if pairing of public key & hash is equal to pairing of generator & signature.
    // e(P, H(m)) == e(G, S)
    // e(S, G) == e(H(m), P)
    verify(signature, message, publicKey, unusedArg) {
      if (unusedArg != null)
        throw new Error("verify() expects 3 arguments");
      signature = normSig(signature);
      publicKey = normPub(publicKey);
      const P2 = publicKey.negate();
      const G2 = PubCurve.Point.BASE;
      const Hm = amsg(message);
      const S2 = signature;
      const exp = pairingBatch([pair(P2, Hm), pair(G2, S2)]);
      return Fp122.eql(exp, Fp122.ONE);
    },
    // https://ethresear.ch/t/fast-verification-of-multiple-bls-signatures/5407
    // e(G, S) = e(G, SUM(n)(Si)) = MUL(n)(e(G, Si))
    // TODO: maybe `{message: G2Hex, publicKey: G1Hex}[]` instead?
    verifyBatch(signature, messages, publicKeys) {
      aNonEmpty(messages);
      if (publicKeys.length !== messages.length)
        throw new Error("amount of public keys and messages should be equal");
      const sig = normSig(signature);
      const nMessages = messages;
      const nPublicKeys = publicKeys.map(normPub);
      const messagePubKeyMap = /* @__PURE__ */ new Map();
      for (let i = 0; i < nPublicKeys.length; i++) {
        const pub = nPublicKeys[i];
        const msg = nMessages[i];
        let keys = messagePubKeyMap.get(msg);
        if (keys === void 0) {
          keys = [];
          messagePubKeyMap.set(msg, keys);
        }
        keys.push(pub);
      }
      const paired = [];
      const G2 = PubCurve.Point.BASE;
      try {
        for (const [msg, keys] of messagePubKeyMap) {
          const groupPublicKey = keys.reduce((acc, msg2) => acc.add(msg2));
          paired.push(pair(groupPublicKey, msg));
        }
        paired.push(pair(G2.negate(), sig));
        return Fp122.eql(pairingBatch(paired), Fp122.ONE);
      } catch {
        return false;
      }
    },
    // Adds a bunch of public key points together.
    // pk1 + pk2 + pk3 = pkA
    aggregatePublicKeys(publicKeys) {
      aNonEmpty(publicKeys);
      publicKeys = publicKeys.map((pub) => normPub(pub));
      const agg = publicKeys.reduce((sum, p) => sum.add(p), PubCurve.Point.ZERO);
      agg.assertValidity();
      return agg;
    },
    // Adds a bunch of signature points together.
    // pk1 + pk2 + pk3 = pkA
    aggregateSignatures(signatures) {
      aNonEmpty(signatures);
      signatures = signatures.map((sig) => normSig(sig));
      const agg = signatures.reduce((sum, s) => sum.add(s), SigCurve.Point.ZERO);
      agg.assertValidity();
      return agg;
    },
    hash(messageBytes, DST) {
      abytes(messageBytes);
      const opts = DST ? { DST } : void 0;
      return SigCurve.hashToCurve(messageBytes, opts);
    },
    Signature: SignatureCoder
  };
}
function bls(CURVE) {
  const { Fp: Fp3, Fr, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 } = CURVE.fields;
  const G1_ = weierstrassPoints(CURVE.G1);
  const G1 = Object.assign(G1_, createHasher(G1_.Point, CURVE.G1.mapToCurve, {
    ...CURVE.htfDefaults,
    ...CURVE.G1.htfDefaults
  }));
  const G2_ = weierstrassPoints(CURVE.G2);
  const G2 = Object.assign(G2_, createHasher(G2_.Point, CURVE.G2.mapToCurve, {
    ...CURVE.htfDefaults,
    ...CURVE.G2.htfDefaults
  }));
  const pairingRes = createBlsPairing(CURVE.fields, G1.Point, G2.Point, {
    ...CURVE.params,
    postPrecompute: CURVE.postPrecompute
  });
  const { millerLoopBatch, pairing, pairingBatch, calcPairingPrecomputes } = pairingRes;
  const longSignatures = createBlsSig(pairingRes, G1, G2, CURVE.G2.Signature, false);
  const shortSignatures = createBlsSig(pairingRes, G2, G1, CURVE.G1.ShortSignature, true);
  const rand = CURVE.randomBytes || randomBytes;
  const randomSecretKey = () => {
    const length = getMinHashLength(Fr.ORDER);
    return mapHashToField(rand(length), Fr.ORDER);
  };
  const utils2 = {
    randomSecretKey,
    randomPrivateKey: randomSecretKey,
    calcPairingPrecomputes
  };
  const { ShortSignature } = CURVE.G1;
  const { Signature } = CURVE.G2;
  function normP1Hash(point, htfOpts) {
    return point instanceof G1.Point ? point : shortSignatures.hash(ensureBytes("point", point), htfOpts?.DST);
  }
  function normP2Hash(point, htfOpts) {
    return point instanceof G2.Point ? point : longSignatures.hash(ensureBytes("point", point), htfOpts?.DST);
  }
  function getPublicKey(privateKey) {
    return longSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function getPublicKeyForShortSignatures(privateKey) {
    return shortSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function sign(message, privateKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    const S2 = longSignatures.sign(Hm, privateKey);
    return message instanceof G2.Point ? S2 : Signature.toBytes(S2);
  }
  function signShortSignature(message, privateKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    const S2 = shortSignatures.sign(Hm, privateKey);
    return message instanceof G1.Point ? S2 : ShortSignature.toBytes(S2);
  }
  function verify(signature, message, publicKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    return longSignatures.verify(signature, Hm, publicKey);
  }
  function verifyShortSignature(signature, message, publicKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    return shortSignatures.verify(signature, Hm, publicKey);
  }
  function aggregatePublicKeys(publicKeys) {
    const agg = longSignatures.aggregatePublicKeys(publicKeys);
    return publicKeys[0] instanceof G1.Point ? agg : agg.toBytes(true);
  }
  function aggregateSignatures(signatures) {
    const agg = longSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G2.Point ? agg : Signature.toBytes(agg);
  }
  function aggregateShortSignatures(signatures) {
    const agg = shortSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G1.Point ? agg : ShortSignature.toBytes(agg);
  }
  function verifyBatch(signature, messages, publicKeys, htfOpts) {
    const Hm = messages.map((m) => normP2Hash(m, htfOpts));
    return longSignatures.verifyBatch(signature, Hm, publicKeys);
  }
  G1.Point.BASE.precompute(4);
  return {
    longSignatures,
    shortSignatures,
    millerLoopBatch,
    pairing,
    pairingBatch,
    verifyBatch,
    fields: {
      Fr,
      Fp: Fp3,
      Fp2: Fp22,
      Fp6: Fp62,
      Fp12: Fp122
    },
    params: {
      ateLoopSize: CURVE.params.ateLoopSize,
      twistType: CURVE.params.twistType,
      // deprecated
      r: CURVE.params.r,
      G1b: CURVE.G1.b,
      G2b: CURVE.G2.b
    },
    utils: utils2,
    // deprecated
    getPublicKey,
    getPublicKeyForShortSignatures,
    sign,
    signShortSignature,
    verify,
    verifyShortSignature,
    aggregatePublicKeys,
    aggregateSignatures,
    aggregateShortSignatures,
    G1,
    G2,
    Signature,
    ShortSignature
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$2 = BigInt(0), _1n$3 = BigInt(1), _2n$3 = BigInt(2), _3n$1 = BigInt(3);
function calcFrobeniusCoefficients(Fp3, nonResidue, modulus, degree, num = 1, divisor) {
  const _divisor = BigInt(divisor === void 0 ? degree : divisor);
  const towerModulus = modulus ** BigInt(degree);
  const res = [];
  for (let i = 0; i < num; i++) {
    const a = BigInt(i + 1);
    const powers = [];
    for (let j2 = 0, qPower = _1n$3; j2 < degree; j2++) {
      const power = (a * qPower - a) / _divisor % towerModulus;
      powers.push(Fp3.pow(nonResidue, power));
      qPower *= modulus;
    }
    res.push(powers);
  }
  return res;
}
function psiFrobenius(Fp3, Fp22, base) {
  const PSI_X = Fp22.pow(base, (Fp3.ORDER - _1n$3) / _3n$1);
  const PSI_Y = Fp22.pow(base, (Fp3.ORDER - _1n$3) / _2n$3);
  function psi(x2, y) {
    const x22 = Fp22.mul(Fp22.frobeniusMap(x2, 1), PSI_X);
    const y2 = Fp22.mul(Fp22.frobeniusMap(y, 1), PSI_Y);
    return [x22, y2];
  }
  const PSI2_X = Fp22.pow(base, (Fp3.ORDER ** _2n$3 - _1n$3) / _3n$1);
  const PSI2_Y = Fp22.pow(base, (Fp3.ORDER ** _2n$3 - _1n$3) / _2n$3);
  if (!Fp22.eql(PSI2_Y, Fp22.neg(Fp22.ONE)))
    throw new Error("psiFrobenius: PSI2_Y!==-1");
  function psi2(x2, y) {
    return [Fp22.mul(x2, PSI2_X), Fp22.neg(y)];
  }
  const mapAffine = (fn) => (c, P2) => {
    const affine = P2.toAffine();
    const p = fn(affine.x, affine.y);
    return c.fromAffine({ x: p[0], y: p[1] });
  };
  const G2psi3 = mapAffine(psi);
  const G2psi22 = mapAffine(psi2);
  return { psi, psi2, G2psi: G2psi3, G2psi2: G2psi22, PSI_X, PSI_Y, PSI2_X, PSI2_Y };
}
const Fp2fromBigTuple = (Fp3, tuple) => {
  if (tuple.length !== 2)
    throw new Error("invalid tuple");
  const fps = tuple.map((n) => Fp3.create(n));
  return { c0: fps[0], c1: fps[1] };
};
class _Field2 {
  constructor(Fp3, opts = {}) {
    this.MASK = _1n$3;
    const ORDER = Fp3.ORDER;
    const FP2_ORDER = ORDER * ORDER;
    this.Fp = Fp3;
    this.ORDER = FP2_ORDER;
    this.BITS = bitLen(FP2_ORDER);
    this.BYTES = Math.ceil(bitLen(FP2_ORDER) / 8);
    this.isLE = Fp3.isLE;
    this.ZERO = { c0: Fp3.ZERO, c1: Fp3.ZERO };
    this.ONE = { c0: Fp3.ONE, c1: Fp3.ZERO };
    this.Fp_NONRESIDUE = Fp3.create(opts.NONRESIDUE || BigInt(-1));
    this.Fp_div2 = Fp3.div(Fp3.ONE, _2n$3);
    this.NONRESIDUE = Fp2fromBigTuple(Fp3, opts.FP2_NONRESIDUE);
    this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp3, this.Fp_NONRESIDUE, Fp3.ORDER, 2)[0];
    this.mulByB = opts.Fp2mulByB;
    Object.seal(this);
  }
  fromBigTuple(tuple) {
    return Fp2fromBigTuple(this.Fp, tuple);
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1 }) {
    function isValidC(num, ORDER) {
      return typeof num === "bigint" && _0n$2 <= num && num < ORDER;
    }
    return isValidC(c0, this.ORDER) && isValidC(c1, this.ORDER);
  }
  is0({ c0, c1 }) {
    return this.Fp.is0(c0) && this.Fp.is0(c1);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  eql({ c0, c1 }, { c0: r0, c1: r1 }) {
    return this.Fp.eql(c0, r0) && this.Fp.eql(c1, r1);
  }
  neg({ c0, c1 }) {
    return { c0: this.Fp.neg(c0), c1: this.Fp.neg(c1) };
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  // Normalized
  add(f1, f2) {
    const { c0, c1 } = f1;
    const { c0: r0, c1: r1 } = f2;
    return {
      c0: this.Fp.add(c0, r0),
      c1: this.Fp.add(c1, r1)
    };
  }
  sub({ c0, c1 }, { c0: r0, c1: r1 }) {
    return {
      c0: this.Fp.sub(c0, r0),
      c1: this.Fp.sub(c1, r1)
    };
  }
  mul({ c0, c1 }, rhs) {
    const { Fp: Fp3 } = this;
    if (typeof rhs === "bigint")
      return { c0: Fp3.mul(c0, rhs), c1: Fp3.mul(c1, rhs) };
    const { c0: r0, c1: r1 } = rhs;
    let t1 = Fp3.mul(c0, r0);
    let t2 = Fp3.mul(c1, r1);
    const o0 = Fp3.sub(t1, t2);
    const o1 = Fp3.sub(Fp3.mul(Fp3.add(c0, c1), Fp3.add(r0, r1)), Fp3.add(t1, t2));
    return { c0: o0, c1: o1 };
  }
  sqr({ c0, c1 }) {
    const { Fp: Fp3 } = this;
    const a = Fp3.add(c0, c1);
    const b2 = Fp3.sub(c0, c1);
    const c = Fp3.add(c0, c0);
    return { c0: Fp3.mul(a, b2), c1: Fp3.mul(c, c1) };
  }
  // NonNormalized stuff
  addN(a, b2) {
    return this.add(a, b2);
  }
  subN(a, b2) {
    return this.sub(a, b2);
  }
  mulN(a, b2) {
    return this.mul(a, b2);
  }
  sqrN(a) {
    return this.sqr(a);
  }
  // Why inversion for bigint inside Fp instead of Fp2? it is even used in that context?
  div(lhs, rhs) {
    const { Fp: Fp3 } = this;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  inv({ c0: a, c1: b2 }) {
    const { Fp: Fp3 } = this;
    const factor = Fp3.inv(Fp3.create(a * a + b2 * b2));
    return { c0: Fp3.mul(factor, Fp3.create(a)), c1: Fp3.mul(factor, Fp3.create(-b2)) };
  }
  sqrt(num) {
    const { Fp: Fp3 } = this;
    const Fp22 = this;
    const { c0, c1 } = num;
    if (Fp3.is0(c1)) {
      if (FpLegendre(Fp3, c0) === 1)
        return Fp22.create({ c0: Fp3.sqrt(c0), c1: Fp3.ZERO });
      else
        return Fp22.create({ c0: Fp3.ZERO, c1: Fp3.sqrt(Fp3.div(c0, this.Fp_NONRESIDUE)) });
    }
    const a = Fp3.sqrt(Fp3.sub(Fp3.sqr(c0), Fp3.mul(Fp3.sqr(c1), this.Fp_NONRESIDUE)));
    let d2 = Fp3.mul(Fp3.add(a, c0), this.Fp_div2);
    const legendre = FpLegendre(Fp3, d2);
    if (legendre === -1)
      d2 = Fp3.sub(d2, a);
    const a0 = Fp3.sqrt(d2);
    const candidateSqrt = Fp22.create({ c0: a0, c1: Fp3.div(Fp3.mul(c1, this.Fp_div2), a0) });
    if (!Fp22.eql(Fp22.sqr(candidateSqrt), num))
      throw new Error("Cannot find square root");
    const x1 = candidateSqrt;
    const x2 = Fp22.neg(x1);
    const { re: re1, im: im1 } = Fp22.reim(x1);
    const { re: re2, im: im2 } = Fp22.reim(x2);
    if (im1 > im2 || im1 === im2 && re1 > re2)
      return x1;
    return x2;
  }
  // Same as sgn0_m_eq_2 in RFC 9380
  isOdd(x2) {
    const { re: x0, im: x1 } = this.reim(x2);
    const sign_0 = x0 % _2n$3;
    const zero_0 = x0 === _0n$2;
    const sign_1 = x1 % _2n$3;
    return BigInt(sign_0 || zero_0 && sign_1) == _1n$3;
  }
  // Bytes util
  fromBytes(b2) {
    const { Fp: Fp3 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    return { c0: Fp3.fromBytes(b2.subarray(0, Fp3.BYTES)), c1: Fp3.fromBytes(b2.subarray(Fp3.BYTES)) };
  }
  toBytes({ c0, c1 }) {
    return concatBytes(this.Fp.toBytes(c0), this.Fp.toBytes(c1));
  }
  cmov({ c0, c1 }, { c0: r0, c1: r1 }, c) {
    return {
      c0: this.Fp.cmov(c0, r0, c),
      c1: this.Fp.cmov(c1, r1, c)
    };
  }
  reim({ c0, c1 }) {
    return { re: c0, im: c1 };
  }
  Fp4Square(a, b2) {
    const Fp22 = this;
    const a2 = Fp22.sqr(a);
    const b22 = Fp22.sqr(b2);
    return {
      first: Fp22.add(Fp22.mulByNonresidue(b22), a2),
      // b² * Nonresidue + a²
      second: Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(a, b2)), a2), b22)
      // (a + b)² - a² - b²
    };
  }
  // multiply by u + 1
  mulByNonresidue({ c0, c1 }) {
    return this.mul({ c0, c1 }, this.NONRESIDUE);
  }
  frobeniusMap({ c0, c1 }, power) {
    return {
      c0,
      c1: this.Fp.mul(c1, this.FROBENIUS_COEFFICIENTS[power % 2])
    };
  }
}
class _Field6 {
  constructor(Fp22) {
    this.MASK = _1n$3;
    this.Fp2 = Fp22;
    this.ORDER = Fp22.ORDER;
    this.BITS = 3 * Fp22.BITS;
    this.BYTES = 3 * Fp22.BYTES;
    this.isLE = Fp22.isLE;
    this.ZERO = { c0: Fp22.ZERO, c1: Fp22.ZERO, c2: Fp22.ZERO };
    this.ONE = { c0: Fp22.ONE, c1: Fp22.ZERO, c2: Fp22.ZERO };
    const { Fp: Fp3 } = Fp22;
    const frob = calcFrobeniusCoefficients(Fp22, Fp22.NONRESIDUE, Fp3.ORDER, 6, 2, 3);
    this.FROBENIUS_COEFFICIENTS_1 = frob[0];
    this.FROBENIUS_COEFFICIENTS_2 = frob[1];
    Object.seal(this);
  }
  add({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.add(c0, r0),
      c1: Fp22.add(c1, r1),
      c2: Fp22.add(c2, r2)
    };
  }
  sub({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.sub(c0, r0),
      c1: Fp22.sub(c1, r1),
      c2: Fp22.sub(c2, r2)
    };
  }
  mul({ c0, c1, c2 }, rhs) {
    const { Fp2: Fp22 } = this;
    if (typeof rhs === "bigint") {
      return {
        c0: Fp22.mul(c0, rhs),
        c1: Fp22.mul(c1, rhs),
        c2: Fp22.mul(c2, rhs)
      };
    }
    const { c0: r0, c1: r1, c2: r2 } = rhs;
    const t0 = Fp22.mul(c0, r0);
    const t1 = Fp22.mul(c1, r1);
    const t2 = Fp22.mul(c2, r2);
    return {
      // t0 + (c1 + c2) * (r1 * r2) - (T1 + T2) * (u + 1)
      c0: Fp22.add(t0, Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), Fp22.add(r1, r2)), Fp22.add(t1, t2)))),
      // (c0 + c1) * (r0 + r1) - (T0 + T1) + T2 * (u + 1)
      c1: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c1), Fp22.add(r0, r1)), Fp22.add(t0, t1)), Fp22.mulByNonresidue(t2)),
      // T1 + (c0 + c2) * (r0 + r2) - T0 + T2
      c2: Fp22.sub(Fp22.add(t1, Fp22.mul(Fp22.add(c0, c2), Fp22.add(r0, r2))), Fp22.add(t0, t2))
    };
  }
  sqr({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.sqr(c0);
    let t1 = Fp22.mul(Fp22.mul(c0, c1), _2n$3);
    let t3 = Fp22.mul(Fp22.mul(c1, c2), _2n$3);
    let t4 = Fp22.sqr(c2);
    return {
      c0: Fp22.add(Fp22.mulByNonresidue(t3), t0),
      // T3 * (u + 1) + T0
      c1: Fp22.add(Fp22.mulByNonresidue(t4), t1),
      // T4 * (u + 1) + T1
      // T1 + (c0 - c1 + c2)² + T3 - T0 - T4
      c2: Fp22.sub(Fp22.sub(Fp22.add(Fp22.add(t1, Fp22.sqr(Fp22.add(Fp22.sub(c0, c1), c2))), t3), t0), t4)
    };
  }
  addN(a, b2) {
    return this.add(a, b2);
  }
  subN(a, b2) {
    return this.sub(a, b2);
  }
  mulN(a, b2) {
    return this.mul(a, b2);
  }
  sqrN(a) {
    return this.sqr(a);
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.isValid(c0) && Fp22.isValid(c1) && Fp22.isValid(c2);
  }
  is0({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.is0(c0) && Fp22.is0(c1) && Fp22.is0(c2);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  neg({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return { c0: Fp22.neg(c0), c1: Fp22.neg(c1), c2: Fp22.neg(c2) };
  }
  eql({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.eql(c0, r0) && Fp22.eql(c1, r1) && Fp22.eql(c2, r2);
  }
  sqrt(_2) {
    return notImplemented();
  }
  // Do we need division by bigint at all? Should be done via order:
  div(lhs, rhs) {
    const { Fp2: Fp22 } = this;
    const { Fp: Fp3 } = Fp22;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  inv({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.sub(Fp22.sqr(c0), Fp22.mulByNonresidue(Fp22.mul(c2, c1)));
    let t1 = Fp22.sub(Fp22.mulByNonresidue(Fp22.sqr(c2)), Fp22.mul(c0, c1));
    let t2 = Fp22.sub(Fp22.sqr(c1), Fp22.mul(c0, c2));
    let t4 = Fp22.inv(Fp22.add(Fp22.mulByNonresidue(Fp22.add(Fp22.mul(c2, t1), Fp22.mul(c1, t2))), Fp22.mul(c0, t0)));
    return { c0: Fp22.mul(t4, t0), c1: Fp22.mul(t4, t1), c2: Fp22.mul(t4, t2) };
  }
  // Bytes utils
  fromBytes(b2) {
    const { Fp2: Fp22 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    const B2 = Fp22.BYTES;
    return {
      c0: Fp22.fromBytes(b2.subarray(0, B2)),
      c1: Fp22.fromBytes(b2.subarray(B2, B2 * 2)),
      c2: Fp22.fromBytes(b2.subarray(2 * B2))
    };
  }
  toBytes({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return concatBytes(Fp22.toBytes(c0), Fp22.toBytes(c1), Fp22.toBytes(c2));
  }
  cmov({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }, c) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.cmov(c0, r0, c),
      c1: Fp22.cmov(c1, r1, c),
      c2: Fp22.cmov(c2, r2, c)
    };
  }
  fromBigSix(t) {
    const { Fp2: Fp22 } = this;
    if (!Array.isArray(t) || t.length !== 6)
      throw new Error("invalid Fp6 usage");
    return {
      c0: Fp22.fromBigTuple(t.slice(0, 2)),
      c1: Fp22.fromBigTuple(t.slice(2, 4)),
      c2: Fp22.fromBigTuple(t.slice(4, 6))
    };
  }
  frobeniusMap({ c0, c1, c2 }, power) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.frobeniusMap(c0, power),
      c1: Fp22.mul(Fp22.frobeniusMap(c1, power), this.FROBENIUS_COEFFICIENTS_1[power % 6]),
      c2: Fp22.mul(Fp22.frobeniusMap(c2, power), this.FROBENIUS_COEFFICIENTS_2[power % 6])
    };
  }
  mulByFp2({ c0, c1, c2 }, rhs) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.mul(c0, rhs),
      c1: Fp22.mul(c1, rhs),
      c2: Fp22.mul(c2, rhs)
    };
  }
  mulByNonresidue({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return { c0: Fp22.mulByNonresidue(c2), c1: c0, c2: c1 };
  }
  // Sparse multiplication
  mul1({ c0, c1, c2 }, b1) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.mulByNonresidue(Fp22.mul(c2, b1)),
      c1: Fp22.mul(c0, b1),
      c2: Fp22.mul(c1, b1)
    };
  }
  // Sparse multiplication
  mul01({ c0, c1, c2 }, b0, b1) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.mul(c0, b0);
    let t1 = Fp22.mul(c1, b1);
    return {
      // ((c1 + c2) * b1 - T1) * (u + 1) + T0
      c0: Fp22.add(Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), b1), t1)), t0),
      // (b0 + b1) * (c0 + c1) - T0 - T1
      c1: Fp22.sub(Fp22.sub(Fp22.mul(Fp22.add(b0, b1), Fp22.add(c0, c1)), t0), t1),
      // (c0 + c2) * b0 - T0 + T1
      c2: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c2), b0), t0), t1)
    };
  }
}
class _Field12 {
  constructor(Fp62, opts) {
    this.MASK = _1n$3;
    const { Fp2: Fp22 } = Fp62;
    const { Fp: Fp3 } = Fp22;
    this.Fp6 = Fp62;
    this.ORDER = Fp22.ORDER;
    this.BITS = 2 * Fp62.BITS;
    this.BYTES = 2 * Fp62.BYTES;
    this.isLE = Fp62.isLE;
    this.ZERO = { c0: Fp62.ZERO, c1: Fp62.ZERO };
    this.ONE = { c0: Fp62.ONE, c1: Fp62.ZERO };
    this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp22, Fp22.NONRESIDUE, Fp3.ORDER, 12, 1, 6)[0];
    this.X_LEN = opts.X_LEN;
    this.finalExponentiate = opts.Fp12finalExponentiate;
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.isValid(c0) && Fp62.isValid(c1);
  }
  is0({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.is0(c0) && Fp62.is0(c1);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  neg({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return { c0: Fp62.neg(c0), c1: Fp62.neg(c1) };
  }
  eql({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.eql(c0, r0) && Fp62.eql(c1, r1);
  }
  sqrt(_2) {
    notImplemented();
  }
  inv({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    let t = Fp62.inv(Fp62.sub(Fp62.sqr(c0), Fp62.mulByNonresidue(Fp62.sqr(c1))));
    return { c0: Fp62.mul(c0, t), c1: Fp62.neg(Fp62.mul(c1, t)) };
  }
  div(lhs, rhs) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { Fp: Fp3 } = Fp22;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  // Normalized
  add({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.add(c0, r0),
      c1: Fp62.add(c1, r1)
    };
  }
  sub({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.sub(c0, r0),
      c1: Fp62.sub(c1, r1)
    };
  }
  mul({ c0, c1 }, rhs) {
    const { Fp6: Fp62 } = this;
    if (typeof rhs === "bigint")
      return { c0: Fp62.mul(c0, rhs), c1: Fp62.mul(c1, rhs) };
    let { c0: r0, c1: r1 } = rhs;
    let t1 = Fp62.mul(c0, r0);
    let t2 = Fp62.mul(c1, r1);
    return {
      c0: Fp62.add(t1, Fp62.mulByNonresidue(t2)),
      // T1 + T2 * v
      // (c0 + c1) * (r0 + r1) - (T1 + T2)
      c1: Fp62.sub(Fp62.mul(Fp62.add(c0, c1), Fp62.add(r0, r1)), Fp62.add(t1, t2))
    };
  }
  sqr({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    let ab = Fp62.mul(c0, c1);
    return {
      // (c1 * v + c0) * (c0 + c1) - AB - AB * v
      c0: Fp62.sub(Fp62.sub(Fp62.mul(Fp62.add(Fp62.mulByNonresidue(c1), c0), Fp62.add(c0, c1)), ab), Fp62.mulByNonresidue(ab)),
      c1: Fp62.add(ab, ab)
    };
  }
  // NonNormalized stuff
  addN(a, b2) {
    return this.add(a, b2);
  }
  subN(a, b2) {
    return this.sub(a, b2);
  }
  mulN(a, b2) {
    return this.mul(a, b2);
  }
  sqrN(a) {
    return this.sqr(a);
  }
  // Bytes utils
  fromBytes(b2) {
    const { Fp6: Fp62 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    return {
      c0: Fp62.fromBytes(b2.subarray(0, Fp62.BYTES)),
      c1: Fp62.fromBytes(b2.subarray(Fp62.BYTES))
    };
  }
  toBytes({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return concatBytes(Fp62.toBytes(c0), Fp62.toBytes(c1));
  }
  cmov({ c0, c1 }, { c0: r0, c1: r1 }, c) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.cmov(c0, r0, c),
      c1: Fp62.cmov(c1, r1, c)
    };
  }
  // Utils
  // toString() {
  //   return '' + 'Fp12(' + this.c0 + this.c1 + '* w');
  // },
  // fromTuple(c: [Fp6, Fp6]) {
  //   return new Fp12(...c);
  // }
  fromBigTwelve(t) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.fromBigSix(t.slice(0, 6)),
      c1: Fp62.fromBigSix(t.slice(6, 12))
    };
  }
  // Raises to q**i -th power
  frobeniusMap(lhs, power) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { c0, c1, c2 } = Fp62.frobeniusMap(lhs.c1, power);
    const coeff = this.FROBENIUS_COEFFICIENTS[power % 12];
    return {
      c0: Fp62.frobeniusMap(lhs.c0, power),
      c1: Fp62.create({
        c0: Fp22.mul(c0, coeff),
        c1: Fp22.mul(c1, coeff),
        c2: Fp22.mul(c2, coeff)
      })
    };
  }
  mulByFp2({ c0, c1 }, rhs) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.mulByFp2(c0, rhs),
      c1: Fp62.mulByFp2(c1, rhs)
    };
  }
  conjugate({ c0, c1 }) {
    return { c0, c1: this.Fp6.neg(c1) };
  }
  // Sparse multiplication
  mul014({ c0, c1 }, o0, o1, o4) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    let t0 = Fp62.mul01(c0, o0, o1);
    let t1 = Fp62.mul1(c1, o4);
    return {
      c0: Fp62.add(Fp62.mulByNonresidue(t1), t0),
      // T1 * v + T0
      // (c1 + c0) * [o0, o1+o4] - T0 - T1
      c1: Fp62.sub(Fp62.sub(Fp62.mul01(Fp62.add(c1, c0), o0, Fp22.add(o1, o4)), t0), t1)
    };
  }
  mul034({ c0, c1 }, o0, o3, o4) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const a = Fp62.create({
      c0: Fp22.mul(c0.c0, o0),
      c1: Fp22.mul(c0.c1, o0),
      c2: Fp22.mul(c0.c2, o0)
    });
    const b2 = Fp62.mul01(c1, o3, o4);
    const e3 = Fp62.mul01(Fp62.add(c0, c1), Fp22.add(o0, o3), o4);
    return {
      c0: Fp62.add(Fp62.mulByNonresidue(b2), a),
      c1: Fp62.sub(e3, Fp62.add(a, b2))
    };
  }
  // A cyclotomic group is a subgroup of Fp^n defined by
  //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
  // The result of any pairing is in a cyclotomic subgroup
  // https://eprint.iacr.org/2009/565.pdf
  // https://eprint.iacr.org/2010/354.pdf
  _cyclotomicSquare({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { c0: c0c0, c1: c0c1, c2: c0c2 } = c0;
    const { c0: c1c0, c1: c1c1, c2: c1c2 } = c1;
    const { first: t3, second: t4 } = Fp22.Fp4Square(c0c0, c1c1);
    const { first: t5, second: t6 } = Fp22.Fp4Square(c1c0, c0c2);
    const { first: t7, second: t8 } = Fp22.Fp4Square(c0c1, c1c2);
    const t9 = Fp22.mulByNonresidue(t8);
    return {
      c0: Fp62.create({
        c0: Fp22.add(Fp22.mul(Fp22.sub(t3, c0c0), _2n$3), t3),
        // 2 * (T3 - c0c0)  + T3
        c1: Fp22.add(Fp22.mul(Fp22.sub(t5, c0c1), _2n$3), t5),
        // 2 * (T5 - c0c1)  + T5
        c2: Fp22.add(Fp22.mul(Fp22.sub(t7, c0c2), _2n$3), t7)
      }),
      // 2 * (T7 - c0c2)  + T7
      c1: Fp62.create({
        c0: Fp22.add(Fp22.mul(Fp22.add(t9, c1c0), _2n$3), t9),
        // 2 * (T9 + c1c0) + T9
        c1: Fp22.add(Fp22.mul(Fp22.add(t4, c1c1), _2n$3), t4),
        // 2 * (T4 + c1c1) + T4
        c2: Fp22.add(Fp22.mul(Fp22.add(t6, c1c2), _2n$3), t6)
      })
    };
  }
  // https://eprint.iacr.org/2009/565.pdf
  _cyclotomicExp(num, n) {
    let z2 = this.ONE;
    for (let i = this.X_LEN - 1; i >= 0; i--) {
      z2 = this._cyclotomicSquare(z2);
      if (bitGet(n, i))
        z2 = this.mul(z2, num);
    }
    return z2;
  }
}
function tower12(opts) {
  const Fp3 = Field(opts.ORDER);
  const Fp22 = new _Field2(Fp3, opts);
  const Fp62 = new _Field6(Fp22);
  const Fp122 = new _Field12(Fp62, opts);
  return { Fp: Fp3, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$1 = BigInt(0), _1n$2 = BigInt(1), _2n$2 = BigInt(2), _3n = BigInt(3), _4n = BigInt(4);
const BLS_X = BigInt("0xd201000000010000");
const BLS_X_LEN = bitLen(BLS_X);
const bls12_381_CURVE_G1 = {
  p: BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab"),
  n: BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001"),
  h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
  a: _0n$1,
  b: _4n,
  Gx: BigInt("0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb"),
  Gy: BigInt("0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1")
};
const bls12_381_Fr = Field(bls12_381_CURVE_G1.n, {
  modFromBytes: true,
  isLE: true
});
const { Fp: Fp$1, Fp2, Fp6, Fp12 } = tower12({
  ORDER: bls12_381_CURVE_G1.p,
  X_LEN: BLS_X_LEN,
  // Finite extension field over irreducible polynominal.
  // Fp(u) / (u² - β) where β = -1
  FP2_NONRESIDUE: [_1n$2, _1n$2],
  Fp2mulByB: ({ c0, c1 }) => {
    const t0 = Fp$1.mul(c0, _4n);
    const t1 = Fp$1.mul(c1, _4n);
    return { c0: Fp$1.sub(t0, t1), c1: Fp$1.add(t0, t1) };
  },
  Fp12finalExponentiate: (num) => {
    const x2 = BLS_X;
    const t0 = Fp12.div(Fp12.frobeniusMap(num, 6), num);
    const t1 = Fp12.mul(Fp12.frobeniusMap(t0, 2), t0);
    const t2 = Fp12.conjugate(Fp12._cyclotomicExp(t1, x2));
    const t3 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicSquare(t1)), t2);
    const t4 = Fp12.conjugate(Fp12._cyclotomicExp(t3, x2));
    const t5 = Fp12.conjugate(Fp12._cyclotomicExp(t4, x2));
    const t6 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicExp(t5, x2)), Fp12._cyclotomicSquare(t2));
    const t7 = Fp12.conjugate(Fp12._cyclotomicExp(t6, x2));
    const t2_t5_pow_q2 = Fp12.frobeniusMap(Fp12.mul(t2, t5), 2);
    const t4_t1_pow_q3 = Fp12.frobeniusMap(Fp12.mul(t4, t1), 3);
    const t6_t1c_pow_q1 = Fp12.frobeniusMap(Fp12.mul(t6, Fp12.conjugate(t1)), 1);
    const t7_t3c_t1 = Fp12.mul(Fp12.mul(t7, Fp12.conjugate(t3)), t1);
    return Fp12.mul(Fp12.mul(Fp12.mul(t2_t5_pow_q2, t4_t1_pow_q3), t6_t1c_pow_q1), t7_t3c_t1);
  }
});
const { G2psi, G2psi2 } = psiFrobenius(Fp$1, Fp2, Fp2.div(Fp2.ONE, Fp2.NONRESIDUE));
const htfDefaults = Object.freeze({
  DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  p: Fp$1.ORDER,
  m: 2,
  k: 128,
  expand: "xmd",
  hash: sha256$1
});
const bls12_381_CURVE_G2 = {
  p: Fp2.ORDER,
  n: bls12_381_CURVE_G1.n,
  h: BigInt("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5"),
  a: Fp2.ZERO,
  b: Fp2.fromBigTuple([_4n, _4n]),
  Gx: Fp2.fromBigTuple([
    BigInt("0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8"),
    BigInt("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e")
  ]),
  Gy: Fp2.fromBigTuple([
    BigInt("0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801"),
    BigInt("0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be")
  ])
};
const COMPZERO = setMask(Fp$1.toBytes(_0n$1), { infinity: true, compressed: true });
function parseMask(bytes) {
  bytes = bytes.slice();
  const mask = bytes[0] & 224;
  const compressed = !!(mask >> 7 & 1);
  const infinity = !!(mask >> 6 & 1);
  const sort = !!(mask >> 5 & 1);
  bytes[0] &= 31;
  return { compressed, infinity, sort, value: bytes };
}
function setMask(bytes, mask) {
  if (bytes[0] & 224)
    throw new Error("setMask: non-empty mask");
  if (mask.compressed)
    bytes[0] |= 128;
  if (mask.infinity)
    bytes[0] |= 64;
  if (mask.sort)
    bytes[0] |= 32;
  return bytes;
}
function pointG1ToBytes(_c, point, isComp) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const is0 = point.is0();
  const { x: x2, y } = point.toAffine();
  if (isComp) {
    if (is0)
      return COMPZERO.slice();
    const sort = Boolean(y * _2n$2 / P2);
    return setMask(numberToBytesBE(x2, L2), { compressed: true, sort });
  } else {
    if (is0) {
      return concatBytes(Uint8Array.of(64), new Uint8Array(2 * L2 - 1));
    } else {
      return concatBytes(numberToBytesBE(x2, L2), numberToBytesBE(y, L2));
    }
  }
}
function signatureG1ToBytes(point) {
  point.assertValidity();
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const { x: x2, y } = point.toAffine();
  if (point.is0())
    return COMPZERO.slice();
  const sort = Boolean(y * _2n$2 / P2);
  return setMask(numberToBytesBE(x2, L2), { compressed: true, sort });
}
function pointG1FromBytes(bytes) {
  const { compressed, infinity, sort, value: value2 } = parseMask(bytes);
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  if (value2.length === 48 && compressed) {
    const compressedValue = bytesToNumberBE(value2);
    const x2 = Fp$1.create(compressedValue & bitMask(Fp$1.BITS));
    if (infinity) {
      if (x2 !== _0n$1)
        throw new Error("invalid G1 point: non-empty, at infinity, with compression");
      return { x: _0n$1, y: _0n$1 };
    }
    const right = Fp$1.add(Fp$1.pow(x2, _3n), Fp$1.create(bls12_381_CURVE_G1.b));
    let y = Fp$1.sqrt(right);
    if (!y)
      throw new Error("invalid G1 point: compressed point");
    if (y * _2n$2 / P2 !== BigInt(sort))
      y = Fp$1.neg(y);
    return { x: Fp$1.create(x2), y: Fp$1.create(y) };
  } else if (value2.length === 96 && !compressed) {
    const x2 = bytesToNumberBE(value2.subarray(0, L2));
    const y = bytesToNumberBE(value2.subarray(L2));
    if (infinity) {
      if (x2 !== _0n$1 || y !== _0n$1)
        throw new Error("G1: non-empty point at infinity");
      return bls12_381.G1.Point.ZERO.toAffine();
    }
    return { x: Fp$1.create(x2), y: Fp$1.create(y) };
  } else {
    throw new Error("invalid G1 point: expected 48/96 bytes");
  }
}
function signatureG1FromBytes(hex) {
  const { infinity, sort, value: value2 } = parseMask(ensureBytes("signatureHex", hex, 48));
  const P2 = Fp$1.ORDER;
  const Point = bls12_381.G1.Point;
  const compressedValue = bytesToNumberBE(value2);
  if (infinity)
    return Point.ZERO;
  const x2 = Fp$1.create(compressedValue & bitMask(Fp$1.BITS));
  const right = Fp$1.add(Fp$1.pow(x2, _3n), Fp$1.create(bls12_381_CURVE_G1.b));
  let y = Fp$1.sqrt(right);
  if (!y)
    throw new Error("invalid G1 point: compressed");
  const aflag = BigInt(sort);
  if (y * _2n$2 / P2 !== aflag)
    y = Fp$1.neg(y);
  const point = Point.fromAffine({ x: x2, y });
  point.assertValidity();
  return point;
}
function pointG2ToBytes(_c, point, isComp) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const is0 = point.is0();
  const { x: x2, y } = point.toAffine();
  if (isComp) {
    if (is0)
      return concatBytes(COMPZERO, numberToBytesBE(_0n$1, L2));
    const flag = Boolean(y.c1 === _0n$1 ? y.c0 * _2n$2 / P2 : y.c1 * _2n$2 / P2);
    return concatBytes(setMask(numberToBytesBE(x2.c1, L2), { compressed: true, sort: flag }), numberToBytesBE(x2.c0, L2));
  } else {
    if (is0)
      return concatBytes(Uint8Array.of(64), new Uint8Array(4 * L2 - 1));
    const { re: x0, im: x1 } = Fp2.reim(x2);
    const { re: y0, im: y1 } = Fp2.reim(y);
    return concatBytes(numberToBytesBE(x1, L2), numberToBytesBE(x0, L2), numberToBytesBE(y1, L2), numberToBytesBE(y0, L2));
  }
}
function signatureG2ToBytes(point) {
  point.assertValidity();
  const { BYTES: L2 } = Fp$1;
  if (point.is0())
    return concatBytes(COMPZERO, numberToBytesBE(_0n$1, L2));
  const { x: x2, y } = point.toAffine();
  const { re: x0, im: x1 } = Fp2.reim(x2);
  const { re: y0, im: y1 } = Fp2.reim(y);
  const tmp = y1 > _0n$1 ? y1 * _2n$2 : y0 * _2n$2;
  const sort = Boolean(tmp / Fp$1.ORDER & _1n$2);
  const z2 = x0;
  return concatBytes(setMask(numberToBytesBE(x1, L2), { sort, compressed: true }), numberToBytesBE(z2, L2));
}
function pointG2FromBytes(bytes) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const { compressed, infinity, sort, value: value2 } = parseMask(bytes);
  if (!compressed && !infinity && sort || // 00100000
  !compressed && infinity && sort || // 01100000
  sort && infinity && compressed) {
    throw new Error("invalid encoding flag: " + (bytes[0] & 224));
  }
  const slc = (b2, from, to) => bytesToNumberBE(b2.slice(from, to));
  if (value2.length === 96 && compressed) {
    if (infinity) {
      if (value2.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
        throw new Error("invalid G2 point: compressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x_1 = slc(value2, 0, L2);
    const x_0 = slc(value2, L2, 2 * L2);
    const x2 = Fp2.create({ c0: Fp$1.create(x_0), c1: Fp$1.create(x_1) });
    const right = Fp2.add(Fp2.pow(x2, _3n), bls12_381_CURVE_G2.b);
    let y = Fp2.sqrt(right);
    const Y_bit = y.c1 === _0n$1 ? y.c0 * _2n$2 / P2 : y.c1 * _2n$2 / P2 ? _1n$2 : _0n$1;
    y = sort && Y_bit > 0 ? y : Fp2.neg(y);
    return { x: x2, y };
  } else if (value2.length === 192 && !compressed) {
    if (infinity) {
      if (value2.reduce((p, c) => p !== 0 ? c + 1 : c, 0) > 0) {
        throw new Error("invalid G2 point: uncompressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x1 = slc(value2, 0 * L2, 1 * L2);
    const x0 = slc(value2, 1 * L2, 2 * L2);
    const y1 = slc(value2, 2 * L2, 3 * L2);
    const y0 = slc(value2, 3 * L2, 4 * L2);
    return { x: Fp2.fromBigTuple([x0, x1]), y: Fp2.fromBigTuple([y0, y1]) };
  } else {
    throw new Error("invalid G2 point: expected 96/192 bytes");
  }
}
function signatureG2FromBytes(hex) {
  const { ORDER: P2 } = Fp$1;
  const { infinity, sort, value: value2 } = parseMask(ensureBytes("signatureHex", hex));
  const Point = bls12_381.G2.Point;
  const half = value2.length / 2;
  if (half !== 48 && half !== 96)
    throw new Error("invalid compressed signature length, expected 96/192 bytes");
  const z1 = bytesToNumberBE(value2.slice(0, half));
  const z2 = bytesToNumberBE(value2.slice(half));
  if (infinity)
    return Point.ZERO;
  const x1 = Fp$1.create(z1 & bitMask(Fp$1.BITS));
  const x2 = Fp$1.create(z2);
  const x3 = Fp2.create({ c0: x2, c1: x1 });
  const y2 = Fp2.add(Fp2.pow(x3, _3n), bls12_381_CURVE_G2.b);
  let y = Fp2.sqrt(y2);
  if (!y)
    throw new Error("Failed to find a square root");
  const { re: y0, im: y1 } = Fp2.reim(y);
  const aflag1 = BigInt(sort);
  const isGreater = y1 > _0n$1 && y1 * _2n$2 / P2 !== aflag1;
  const is0 = y1 === _0n$1 && y0 * _2n$2 / P2 !== aflag1;
  if (isGreater || is0)
    y = Fp2.neg(y);
  const point = Point.fromAffine({ x: x3, y });
  point.assertValidity();
  return point;
}
const bls12_381 = bls({
  // Fields
  fields: {
    Fp: Fp$1,
    Fp2,
    Fp6,
    Fp12,
    Fr: bls12_381_Fr
  },
  // G1: y² = x³ + 4
  G1: {
    ...bls12_381_CURVE_G1,
    Fp: Fp$1,
    htfDefaults: { ...htfDefaults, m: 1, DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_" },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    isTorsionFree: (c, point) => {
      const beta = BigInt("0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe");
      const phi = new c(Fp$1.mul(point.X, beta), point.Y, point.Z);
      const xP = point.multiplyUnsafe(BLS_X).negate();
      const u2P = xP.multiplyUnsafe(BLS_X);
      return u2P.equals(phi);
    },
    // Clear cofactor of G1
    // https://eprint.iacr.org/2019/403
    clearCofactor: (_c, point) => {
      return point.multiplyUnsafe(BLS_X).add(point);
    },
    mapToCurve: mapToG1,
    fromBytes: pointG1FromBytes,
    toBytes: pointG1ToBytes,
    ShortSignature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG1FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG1FromBytes(hex);
      },
      toBytes(point) {
        return signatureG1ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG1ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG1ToBytes(point));
      }
    }
  },
  G2: {
    ...bls12_381_CURVE_G2,
    Fp: Fp2,
    // https://datatracker.ietf.org/doc/html/rfc9380#name-clearing-the-cofactor
    // https://datatracker.ietf.org/doc/html/rfc9380#name-cofactor-clearing-for-bls12
    hEff: BigInt("0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551"),
    htfDefaults: { ...htfDefaults },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    mapToCurve: mapToG2,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    // Older version: https://eprint.iacr.org/2019/814.pdf
    isTorsionFree: (c, P2) => {
      return P2.multiplyUnsafe(BLS_X).negate().equals(G2psi(c, P2));
    },
    // Maps the point into the prime-order subgroup G2.
    // clear_cofactor_bls12381_g2 from RFC 9380.
    // https://eprint.iacr.org/2017/419.pdf
    // prettier-ignore
    clearCofactor: (c, P2) => {
      const x2 = BLS_X;
      let t1 = P2.multiplyUnsafe(x2).negate();
      let t2 = G2psi(c, P2);
      let t3 = P2.double();
      t3 = G2psi2(c, t3);
      t3 = t3.subtract(t2);
      t2 = t1.add(t2);
      t2 = t2.multiplyUnsafe(x2).negate();
      t3 = t3.add(t2);
      t3 = t3.subtract(t1);
      const Q = t3.subtract(P2);
      return Q;
    },
    fromBytes: pointG2FromBytes,
    toBytes: pointG2ToBytes,
    Signature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG2FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG2FromBytes(hex);
      },
      toBytes(point) {
        return signatureG2ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG2ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG2ToBytes(point));
      }
    }
  },
  params: {
    ateLoopSize: BLS_X,
    // The BLS parameter x for BLS12-381
    r: bls12_381_CURVE_G1.n,
    // order; z⁴ − z² + 1; CURVE.n from other curves
    xNegative: true,
    twistType: "multiplicative"
  },
  htfDefaults
});
const isogenyMapG2 = isogenyMap(Fp2, [
  // xNum
  [
    [
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6"
    ],
    [
      "0x0",
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a"
    ],
    [
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
      "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d"
    ],
    [
      "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
      "0x0"
    ]
  ],
  // xDen
  [
    [
      "0x0",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63"
    ],
    [
      "0xc",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f"
    ],
    ["0x1", "0x0"]
    // LAST 1
  ],
  // yNum
  [
    [
      "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
      "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706"
    ],
    [
      "0x0",
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be"
    ],
    [
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
      "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f"
    ],
    [
      "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
      "0x0"
    ]
  ],
  // yDen
  [
    [
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb"
    ],
    [
      "0x0",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3"
    ],
    [
      "0x12",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99"
    ],
    ["0x1", "0x0"]
    // LAST 1
  ]
].map((i) => i.map((pair) => Fp2.fromBigTuple(pair.map(BigInt)))));
const isogenyMapG1 = isogenyMap(Fp$1, [
  // xNum
  [
    "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
    "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
    "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
    "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
    "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
    "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
    "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
    "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
    "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
    "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
    "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
    "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229"
  ],
  // xDen
  [
    "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
    "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
    "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
    "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
    "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
    "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
    "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
    "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
    "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
    "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ],
  // yNum
  [
    "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
    "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
    "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
    "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
    "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
    "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
    "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
    "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
    "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
    "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
    "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
    "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
    "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
    "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
    "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
    "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604"
  ],
  // yDen
  [
    "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
    "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
    "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
    "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
    "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
    "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
    "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
    "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
    "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
    "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
    "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
    "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
    "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
    "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
    "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ]
].map((i) => i.map((j2) => BigInt(j2))));
const G1_SWU = mapToCurveSimpleSWU(Fp$1, {
  A: Fp$1.create(BigInt("0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d")),
  B: Fp$1.create(BigInt("0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0")),
  Z: Fp$1.create(BigInt(11))
});
const G2_SWU = mapToCurveSimpleSWU(Fp2, {
  A: Fp2.create({ c0: Fp$1.create(_0n$1), c1: Fp$1.create(BigInt(240)) }),
  // A' = 240 * I
  B: Fp2.create({ c0: Fp$1.create(BigInt(1012)), c1: Fp$1.create(BigInt(1012)) }),
  // B' = 1012 * (1 + I)
  Z: Fp2.create({ c0: Fp$1.create(BigInt(-2)), c1: Fp$1.create(BigInt(-1)) })
  // Z: -(2 + I)
});
function mapToG1(scalars) {
  const { x: x2, y } = G1_SWU(Fp$1.create(scalars[0]));
  return isogenyMapG1(x2, y);
}
function mapToG2(scalars) {
  const { x: x2, y } = G2_SWU(Fp2.fromBigTuple(scalars));
  return isogenyMapG2(x2, y);
}
function blsVerify(pk, sig, msg) {
  const primaryKey = typeof pk === "string" ? pk : toHex(pk);
  const signature = typeof sig === "string" ? sig : toHex(sig);
  const message = typeof msg === "string" ? msg : toHex(msg);
  return bls12_381.verifyShortSignature(signature, message, primaryKey);
}
const decodeLeb128 = (buf) => {
  return lebDecode(new PipeArrayBuffer(buf));
};
const decodeTime = (buf) => {
  const decoded = decodeLeb128(buf);
  return new Date(Number(decoded) / 1e6);
};
var __classPrivateFieldSet$j = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$j = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Certificate_disableTimeVerification;
class CertificateVerificationError extends AgentError {
  constructor(reason) {
    super(`Invalid certificate: ${reason}`);
  }
}
var NodeType;
(function(NodeType2) {
  NodeType2[NodeType2["Empty"] = 0] = "Empty";
  NodeType2[NodeType2["Fork"] = 1] = "Fork";
  NodeType2[NodeType2["Labeled"] = 2] = "Labeled";
  NodeType2[NodeType2["Leaf"] = 3] = "Leaf";
  NodeType2[NodeType2["Pruned"] = 4] = "Pruned";
})(NodeType || (NodeType = {}));
function isBufferGreaterThan(a, b2) {
  const a8 = new Uint8Array(a);
  const b8 = new Uint8Array(b2);
  for (let i = 0; i < a8.length; i++) {
    if (a8[i] > b8[i]) {
      return true;
    }
  }
  return false;
}
class Certificate {
  constructor(certificate, _rootKey, _canisterId, _blsVerify, _maxAgeInMinutes = 5, disableTimeVerification = false) {
    this._rootKey = _rootKey;
    this._canisterId = _canisterId;
    this._blsVerify = _blsVerify;
    this._maxAgeInMinutes = _maxAgeInMinutes;
    _Certificate_disableTimeVerification.set(this, false);
    __classPrivateFieldSet$j(this, _Certificate_disableTimeVerification, disableTimeVerification, "f");
    this.cert = decode(new Uint8Array(certificate));
  }
  /**
   * Create a new instance of a certificate, automatically verifying it. Throws a
   * CertificateVerificationError if the certificate cannot be verified.
   * @constructs  Certificate
   * @param {CreateCertificateOptions} options {@link CreateCertificateOptions}
   * @param {ArrayBuffer} options.certificate The bytes of the certificate
   * @param {ArrayBuffer} options.rootKey The root key to verify against
   * @param {Principal} options.canisterId The effective or signing canister ID
   * @param {number} options.maxAgeInMinutes The maximum age of the certificate in minutes. Default is 5 minutes.
   * @throws {CertificateVerificationError}
   */
  static async create(options) {
    const cert = Certificate.createUnverified(options);
    await cert.verify();
    return cert;
  }
  static createUnverified(options) {
    let blsVerify$1 = options.blsVerify;
    if (!blsVerify$1) {
      blsVerify$1 = blsVerify;
    }
    return new Certificate(options.certificate, options.rootKey, options.canisterId, blsVerify$1, options.maxAgeInMinutes, options.disableTimeVerification);
  }
  lookup(path) {
    return lookup_path(path, this.cert.tree);
  }
  lookup_label(label) {
    return this.lookup([label]);
  }
  async verify() {
    const rootHash = await reconstruct(this.cert.tree);
    const derKey = await this._checkDelegationAndGetKey(this.cert.delegation);
    const sig = this.cert.signature;
    const key = extractDER(derKey);
    const msg = concat$1(domain_sep("ic-state-root"), rootHash);
    let sigVer = false;
    const lookupTime = lookupResultToBuffer(this.lookup(["time"]));
    if (!lookupTime) {
      throw new CertificateVerificationError("Certificate does not contain a time");
    }
    if (!__classPrivateFieldGet$j(this, _Certificate_disableTimeVerification, "f")) {
      const FIVE_MINUTES_IN_MSEC2 = 5 * 60 * 1e3;
      const MAX_AGE_IN_MSEC = this._maxAgeInMinutes * 60 * 1e3;
      const now = Date.now();
      const earliestCertificateTime = now - MAX_AGE_IN_MSEC;
      const fiveMinutesFromNow = now + FIVE_MINUTES_IN_MSEC2;
      const certTime = decodeTime(lookupTime);
      if (certTime.getTime() < earliestCertificateTime) {
        throw new CertificateVerificationError(`Certificate is signed more than ${this._maxAgeInMinutes} minutes in the past. Certificate time: ` + certTime.toISOString() + " Current time: " + new Date(now).toISOString());
      } else if (certTime.getTime() > fiveMinutesFromNow) {
        throw new CertificateVerificationError("Certificate is signed more than 5 minutes in the future. Certificate time: " + certTime.toISOString() + " Current time: " + new Date(now).toISOString());
      }
    }
    try {
      sigVer = await this._blsVerify(new Uint8Array(key), new Uint8Array(sig), new Uint8Array(msg));
    } catch (err) {
      sigVer = false;
    }
    if (!sigVer) {
      throw new CertificateVerificationError("Signature verification failed");
    }
  }
  async _checkDelegationAndGetKey(d2) {
    if (!d2) {
      return this._rootKey;
    }
    const cert = await Certificate.createUnverified({
      certificate: d2.certificate,
      rootKey: this._rootKey,
      canisterId: this._canisterId,
      blsVerify: this._blsVerify,
      // Do not check max age for delegation certificates
      maxAgeInMinutes: Infinity
    });
    if (cert.cert.delegation) {
      throw new CertificateVerificationError("Delegation certificates cannot be nested");
    }
    await cert.verify();
    if (this._canisterId.toString() !== MANAGEMENT_CANISTER_ID) {
      const canisterInRange = check_canister_ranges({
        canisterId: this._canisterId,
        subnetId: Principal$1.fromUint8Array(new Uint8Array(d2.subnet_id)),
        tree: cert.cert.tree
      });
      if (!canisterInRange) {
        throw new CertificateVerificationError(`Canister ${this._canisterId} not in range of delegations for subnet 0x${toHex(d2.subnet_id)}`);
      }
    }
    const publicKeyLookup = lookupResultToBuffer(cert.lookup(["subnet", d2.subnet_id, "public_key"]));
    if (!publicKeyLookup) {
      throw new Error(`Could not find subnet key for subnet 0x${toHex(d2.subnet_id)}`);
    }
    return publicKeyLookup;
  }
}
_Certificate_disableTimeVerification = /* @__PURE__ */ new WeakMap();
const DER_PREFIX = fromHex("308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100");
const KEY_LENGTH = 96;
function extractDER(buf) {
  const expectedLength = DER_PREFIX.byteLength + KEY_LENGTH;
  if (buf.byteLength !== expectedLength) {
    throw new TypeError(`BLS DER-encoded public key must be ${expectedLength} bytes long`);
  }
  const prefix = buf.slice(0, DER_PREFIX.byteLength);
  if (!bufEquals(prefix, DER_PREFIX)) {
    throw new TypeError(`BLS DER-encoded public key is invalid. Expect the following prefix: ${DER_PREFIX}, but get ${prefix}`);
  }
  return buf.slice(DER_PREFIX.byteLength);
}
function lookupResultToBuffer(result) {
  if (result.status !== LookupStatus.Found) {
    return void 0;
  }
  if (result.value instanceof ArrayBuffer) {
    return result.value;
  }
  if (result.value instanceof Uint8Array) {
    return result.value.buffer;
  }
  return void 0;
}
async function reconstruct(t) {
  switch (t[0]) {
    case NodeType.Empty:
      return hash(domain_sep("ic-hashtree-empty"));
    case NodeType.Pruned:
      return t[1];
    case NodeType.Leaf:
      return hash(concat$1(domain_sep("ic-hashtree-leaf"), t[1]));
    case NodeType.Labeled:
      return hash(concat$1(domain_sep("ic-hashtree-labeled"), t[1], await reconstruct(t[2])));
    case NodeType.Fork:
      return hash(concat$1(domain_sep("ic-hashtree-fork"), await reconstruct(t[1]), await reconstruct(t[2])));
    default:
      throw new Error("unreachable");
  }
}
function domain_sep(s) {
  const len = new Uint8Array([s.length]);
  const str = new TextEncoder().encode(s);
  return concat$1(len, str);
}
var LookupStatus;
(function(LookupStatus2) {
  LookupStatus2["Unknown"] = "unknown";
  LookupStatus2["Absent"] = "absent";
  LookupStatus2["Found"] = "found";
})(LookupStatus || (LookupStatus = {}));
var LabelLookupStatus;
(function(LabelLookupStatus2) {
  LabelLookupStatus2["Less"] = "less";
  LabelLookupStatus2["Greater"] = "greater";
})(LabelLookupStatus || (LabelLookupStatus = {}));
function lookup_path(path, tree) {
  if (path.length === 0) {
    switch (tree[0]) {
      case NodeType.Leaf: {
        if (!tree[1]) {
          throw new Error("Invalid tree structure for leaf");
        }
        if (tree[1] instanceof ArrayBuffer) {
          return {
            status: LookupStatus.Found,
            value: tree[1]
          };
        }
        if (tree[1] instanceof Uint8Array) {
          return {
            status: LookupStatus.Found,
            value: tree[1].buffer
          };
        }
        return {
          status: LookupStatus.Found,
          value: tree[1]
        };
      }
      default: {
        return {
          status: LookupStatus.Found,
          value: tree
        };
      }
    }
  }
  const label = typeof path[0] === "string" ? new TextEncoder().encode(path[0]) : path[0];
  const lookupResult = find_label(label, tree);
  switch (lookupResult.status) {
    case LookupStatus.Found: {
      return lookup_path(path.slice(1), lookupResult.value);
    }
    case LabelLookupStatus.Greater:
    case LabelLookupStatus.Less: {
      return {
        status: LookupStatus.Absent
      };
    }
    default: {
      return lookupResult;
    }
  }
}
function flatten_forks(t) {
  switch (t[0]) {
    case NodeType.Empty:
      return [];
    case NodeType.Fork:
      return flatten_forks(t[1]).concat(flatten_forks(t[2]));
    default:
      return [t];
  }
}
function find_label(label, tree) {
  switch (tree[0]) {
    // if we have a labelled node, compare the node's label to the one we are
    // looking for
    case NodeType.Labeled:
      if (isBufferGreaterThan(label, tree[1])) {
        return {
          status: LabelLookupStatus.Greater
        };
      }
      if (bufEquals(label, tree[1])) {
        return {
          status: LookupStatus.Found,
          value: tree[2]
        };
      }
      return {
        status: LabelLookupStatus.Less
      };
    // if we have a fork node, we need to search both sides, starting with the left
    case NodeType.Fork:
      const leftLookupResult = find_label(label, tree[1]);
      switch (leftLookupResult.status) {
        // if the label we're searching for is greater than the left node lookup,
        // we need to search the right node
        case LabelLookupStatus.Greater: {
          const rightLookupResult = find_label(label, tree[2]);
          if (rightLookupResult.status === LabelLookupStatus.Less) {
            return {
              status: LookupStatus.Absent
            };
          }
          return rightLookupResult;
        }
        // if the left node returns an uncertain result, we need to search the
        // right node
        case LookupStatus.Unknown: {
          let rightLookupResult = find_label(label, tree[2]);
          if (rightLookupResult.status === LabelLookupStatus.Less) {
            return {
              status: LookupStatus.Unknown
            };
          }
          return rightLookupResult;
        }
        // if the label we're searching for is not greater than the left node
        // lookup, or the result is not uncertain, we stop searching and return
        // whatever the result of the left node lookup was, which can be either
        // Found or Absent
        default: {
          return leftLookupResult;
        }
      }
    // if we encounter a Pruned node, we can't know for certain if the label
    // we're searching for is present or not
    case NodeType.Pruned:
      return {
        status: LookupStatus.Unknown
      };
    // if the current node is Empty, or a Leaf, we can stop searching because
    // we know for sure that the label we're searching for is not present
    default:
      return {
        status: LookupStatus.Absent
      };
  }
}
function check_canister_ranges(params) {
  const { canisterId, subnetId, tree } = params;
  const rangeLookup = lookup_path(["subnet", subnetId.toUint8Array(), "canister_ranges"], tree);
  if (rangeLookup.status !== LookupStatus.Found || !(rangeLookup.value instanceof ArrayBuffer)) {
    throw new Error(`Could not find canister ranges for subnet ${subnetId}`);
  }
  const ranges_arr = decode(rangeLookup.value);
  const ranges = ranges_arr.map((v2) => [
    Principal$1.fromUint8Array(v2[0]),
    Principal$1.fromUint8Array(v2[1])
  ]);
  const canisterInRange = ranges.some((r) => r[0].ltEq(canisterId) && r[1].gtEq(canisterId));
  return canisterInRange;
}
class CustomPath {
  constructor(key, path, decodeStrategy) {
    this.key = key;
    this.path = path;
    this.decodeStrategy = decodeStrategy;
  }
}
const request = async (options) => {
  const { agent, paths } = options;
  const canisterId = Principal$1.from(options.canisterId);
  const uniquePaths = [...new Set(paths)];
  const encodedPaths = uniquePaths.map((path) => {
    return encodePath(path, canisterId);
  });
  const status = /* @__PURE__ */ new Map();
  const promises = uniquePaths.map((path, index2) => {
    return (async () => {
      var _a2;
      try {
        const response = await agent.readState(canisterId, {
          paths: [encodedPaths[index2]]
        });
        if (agent.rootKey == null) {
          throw new Error("Agent is missing root key");
        }
        const cert = await Certificate.create({
          certificate: response.certificate,
          rootKey: agent.rootKey,
          canisterId,
          disableTimeVerification: true
        });
        const lookup = (cert2, path3) => {
          if (path3 === "subnet") {
            if (agent.rootKey == null) {
              throw new Error("Agent is missing root key");
            }
            const data2 = fetchNodeKeys(response.certificate, canisterId, agent.rootKey);
            return {
              path: path3,
              data: data2
            };
          } else {
            return {
              path: path3,
              data: lookupResultToBuffer(cert2.lookup(encodePath(path3, canisterId)))
            };
          }
        };
        const { path: path2, data } = lookup(cert, uniquePaths[index2]);
        if (!data) {
          console.warn(`Expected to find result for path ${path2}, but instead found nothing.`);
          if (typeof path2 === "string") {
            status.set(path2, null);
          } else {
            status.set(path2.key, null);
          }
        } else {
          switch (path2) {
            case "time": {
              status.set(path2, decodeTime(data));
              break;
            }
            case "controllers": {
              status.set(path2, decodeControllers(data));
              break;
            }
            case "module_hash": {
              status.set(path2, decodeHex(data));
              break;
            }
            case "subnet": {
              status.set(path2, data);
              break;
            }
            case "candid": {
              status.set(path2, new TextDecoder().decode(data));
              break;
            }
            default: {
              if (typeof path2 !== "string" && "key" in path2 && "path" in path2) {
                switch (path2.decodeStrategy) {
                  case "raw":
                    status.set(path2.key, data);
                    break;
                  case "leb128": {
                    status.set(path2.key, decodeLeb128(data));
                    break;
                  }
                  case "cbor": {
                    status.set(path2.key, decodeCbor(data));
                    break;
                  }
                  case "hex": {
                    status.set(path2.key, decodeHex(data));
                    break;
                  }
                  case "utf-8": {
                    status.set(path2.key, decodeUtf8(data));
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        if ((_a2 = error === null || error === void 0 ? void 0 : error.message) === null || _a2 === void 0 ? void 0 : _a2.includes("Invalid certificate")) {
          throw new AgentError(error.message);
        }
        if (typeof path !== "string" && "key" in path && "path" in path) {
          status.set(path.key, null);
        } else {
          status.set(path, null);
        }
        console.group();
        console.warn(`Expected to find result for path ${path}, but instead found nothing.`);
        console.warn(error);
        console.groupEnd();
      }
    })();
  });
  await Promise.all(promises);
  return status;
};
const fetchNodeKeys = (certificate, canisterId, root_key) => {
  if (!canisterId._isPrincipal) {
    throw new Error("Invalid canisterId");
  }
  const cert = decode(new Uint8Array(certificate));
  const tree = cert.tree;
  let delegation = cert.delegation;
  let subnetId;
  if (delegation && delegation.subnet_id) {
    subnetId = Principal$1.fromUint8Array(new Uint8Array(delegation.subnet_id));
  } else if (!delegation && typeof root_key !== "undefined") {
    subnetId = Principal$1.selfAuthenticating(new Uint8Array(root_key));
    delegation = {
      subnet_id: subnetId.toUint8Array(),
      certificate: new ArrayBuffer(0)
    };
  } else {
    subnetId = Principal$1.selfAuthenticating(Principal$1.fromText("tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe").toUint8Array());
    delegation = {
      subnet_id: subnetId.toUint8Array(),
      certificate: new ArrayBuffer(0)
    };
  }
  const canisterInRange = check_canister_ranges({ canisterId, subnetId, tree });
  if (!canisterInRange) {
    throw new Error("Canister not in range");
  }
  const subnetLookupResult = lookup_path(["subnet", delegation.subnet_id, "node"], tree);
  if (subnetLookupResult.status !== LookupStatus.Found) {
    throw new Error("Node not found");
  }
  if (subnetLookupResult.value instanceof ArrayBuffer) {
    throw new Error("Invalid node tree");
  }
  const nodeForks = flatten_forks(subnetLookupResult.value);
  const nodeKeys = /* @__PURE__ */ new Map();
  nodeForks.forEach((fork) => {
    const node_id = Principal$1.from(new Uint8Array(fork[1])).toText();
    const publicKeyLookupResult = lookup_path(["public_key"], fork[2]);
    if (publicKeyLookupResult.status !== LookupStatus.Found) {
      throw new Error("Public key not found");
    }
    const derEncodedPublicKey = publicKeyLookupResult.value;
    if (derEncodedPublicKey.byteLength !== 44) {
      throw new Error("Invalid public key length");
    } else {
      nodeKeys.set(node_id, derEncodedPublicKey);
    }
  });
  return {
    subnetId: Principal$1.fromUint8Array(new Uint8Array(delegation.subnet_id)).toText(),
    nodeKeys
  };
};
const encodePath = (path, canisterId) => {
  const encoder2 = new TextEncoder();
  const encode2 = (arg) => {
    return new DataView(encoder2.encode(arg).buffer).buffer;
  };
  const canisterBuffer = new DataView(canisterId.toUint8Array().buffer).buffer;
  switch (path) {
    case "time":
      return [encode2("time")];
    case "controllers":
      return [encode2("canister"), canisterBuffer, encode2("controllers")];
    case "module_hash":
      return [encode2("canister"), canisterBuffer, encode2("module_hash")];
    case "subnet":
      return [encode2("subnet")];
    case "candid":
      return [encode2("canister"), canisterBuffer, encode2("metadata"), encode2("candid:service")];
    default: {
      if ("key" in path && "path" in path) {
        if (typeof path["path"] === "string" || path["path"] instanceof ArrayBuffer) {
          const metaPath = path.path;
          const encoded = typeof metaPath === "string" ? encode2(metaPath) : metaPath;
          return [encode2("canister"), canisterBuffer, encode2("metadata"), encoded];
        } else {
          return path["path"];
        }
      }
    }
  }
  throw new Error(`An unexpeected error was encountered while encoding your path for canister status. Please ensure that your path, ${path} was formatted correctly.`);
};
const decodeHex = (buf) => {
  return toHex(buf);
};
const decodeCbor = (buf) => {
  return decode(buf);
};
const decodeUtf8 = (buf) => {
  return new TextDecoder().decode(buf);
};
const decodeControllers = (buf) => {
  const controllersRaw = decodeCbor(buf);
  return controllersRaw.map((buf2) => {
    return Principal$1.fromUint8Array(new Uint8Array(buf2));
  });
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CustomPath,
  encodePath,
  fetchNodeKeys,
  request
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n = BigInt(0), _1n$1 = BigInt(1), _2n$1 = BigInt(2), _8n$1 = BigInt(8);
function isEdValidXY(Fp3, CURVE, x2, y) {
  const x22 = Fp3.sqr(x2);
  const y2 = Fp3.sqr(y);
  const left = Fp3.add(Fp3.mul(CURVE.a, x22), y2);
  const right = Fp3.add(Fp3.ONE, Fp3.mul(CURVE.d, Fp3.mul(x22, y2)));
  return Fp3.eql(left, right);
}
function edwards(params, extraOpts = {}) {
  const validated = _createCurveFields("edwards", params, extraOpts, extraOpts.FpFnLE);
  const { Fp: Fp3, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor } = CURVE;
  _validateObject(extraOpts, {}, { uvRatio: "function" });
  const MASK = _2n$1 << BigInt(Fn.BYTES * 8) - _1n$1;
  const modP = (n) => Fp3.create(n);
  const uvRatio2 = extraOpts.uvRatio || ((u, v2) => {
    try {
      return { isValid: true, value: Fp3.sqrt(Fp3.div(u, v2)) };
    } catch (e3) {
      return { isValid: false, value: _0n };
    }
  });
  if (!isEdValidXY(Fp3, CURVE, CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  function acoord(title, n, banZero = false) {
    const min = banZero ? _1n$1 : _0n;
    aInRange("coordinate " + title, n, min, MASK);
    return n;
  }
  function aextpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ExtendedPoint expected");
  }
  const toAffineMemo = memoized((p, iz) => {
    const { X, Y, Z } = p;
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? _8n$1 : Fp3.inv(Z);
    const x2 = modP(X * iz);
    const y = modP(Y * iz);
    const zz = Fp3.mul(Z, iz);
    if (is0)
      return { x: _0n, y: _1n$1 };
    if (zz !== _1n$1)
      throw new Error("invZ was invalid");
    return { x: x2, y };
  });
  const assertValidMemo = memoized((p) => {
    const { a, d: d2 } = CURVE;
    if (p.is0())
      throw new Error("bad point: ZERO");
    const { X, Y, Z, T: T2 } = p;
    const X2 = modP(X * X);
    const Y2 = modP(Y * Y);
    const Z2 = modP(Z * Z);
    const Z4 = modP(Z2 * Z2);
    const aX2 = modP(X2 * a);
    const left = modP(Z2 * modP(aX2 + Y2));
    const right = modP(Z4 + modP(d2 * modP(X2 * Y2)));
    if (left !== right)
      throw new Error("bad point: equation left != right (1)");
    const XY = modP(X * Y);
    const ZT = modP(Z * T2);
    if (XY !== ZT)
      throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class Point {
    constructor(X, Y, Z, T2) {
      this.X = acoord("x", X);
      this.Y = acoord("y", Y);
      this.Z = acoord("z", Z, true);
      this.T = acoord("t", T2);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    static fromAffine(p) {
      if (p instanceof Point)
        throw new Error("extended point not allowed");
      const { x: x2, y } = p || {};
      acoord("x", x2);
      acoord("y", y);
      return new Point(x2, y, _1n$1, modP(x2 * y));
    }
    // Uses algo from RFC8032 5.1.3.
    static fromBytes(bytes, zip215 = false) {
      const len = Fp3.BYTES;
      const { a, d: d2 } = CURVE;
      bytes = copyBytes(_abytes2(bytes, len, "point"));
      _abool2(zip215, "zip215");
      const normed = copyBytes(bytes);
      const lastByte = bytes[len - 1];
      normed[len - 1] = lastByte & -129;
      const y = bytesToNumberLE(normed);
      const max = zip215 ? MASK : Fp3.ORDER;
      aInRange("point.y", y, _0n, max);
      const y2 = modP(y * y);
      const u = modP(y2 - _1n$1);
      const v2 = modP(d2 * y2 - a);
      let { isValid, value: x2 } = uvRatio2(u, v2);
      if (!isValid)
        throw new Error("bad point: invalid y coordinate");
      const isXOdd = (x2 & _1n$1) === _1n$1;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x2 === _0n && isLastByteOdd)
        throw new Error("bad point: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x2 = modP(-x2);
      return Point.fromAffine({ x: x2, y });
    }
    static fromHex(bytes, zip215 = false) {
      return Point.fromBytes(ensureBytes("point", bytes), zip215);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_2n$1);
      return this;
    }
    // Useful in fromAffine() - not for fromBytes(), which always created valid points.
    assertValidity() {
      assertValidMemo(this);
    }
    // Compare one point to another.
    equals(other) {
      aextpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    negate() {
      return new Point(modP(-this.X), this.Y, this.Z, modP(-this.T));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a } = CURVE;
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const A2 = modP(X1 * X1);
      const B2 = modP(Y1 * Y1);
      const C2 = modP(_2n$1 * modP(Z1 * Z1));
      const D2 = modP(a * A2);
      const x1y1 = X1 + Y1;
      const E2 = modP(modP(x1y1 * x1y1) - A2 - B2);
      const G2 = D2 + B2;
      const F2 = G2 - C2;
      const H2 = D2 - B2;
      const X3 = modP(E2 * F2);
      const Y3 = modP(G2 * H2);
      const T3 = modP(E2 * H2);
      const Z3 = modP(F2 * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      aextpoint(other);
      const { a, d: d2 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1, T: T1 } = this;
      const { X: X2, Y: Y2, Z: Z2, T: T2 } = other;
      const A2 = modP(X1 * X2);
      const B2 = modP(Y1 * Y2);
      const C2 = modP(T1 * d2 * T2);
      const D2 = modP(Z1 * Z2);
      const E2 = modP((X1 + Y1) * (X2 + Y2) - A2 - B2);
      const F2 = D2 - C2;
      const G2 = D2 + C2;
      const H2 = modP(B2 - a * A2);
      const X3 = modP(E2 * F2);
      const Y3 = modP(G2 * H2);
      const T3 = modP(E2 * H2);
      const Z3 = modP(F2 * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    // Constant-time multiplication.
    multiply(scalar) {
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: expected 1 <= sc < curve.n");
      const { p, f } = wnaf.cached(this, scalar, (p2) => normalizeZ(Point, p2));
      return normalizeZ(Point, [p, f])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(scalar, acc = Point.ZERO) {
      if (!Fn.isValid(scalar))
        throw new Error("invalid scalar: expected 0 <= sc < curve.n");
      if (scalar === _0n)
        return Point.ZERO;
      if (this.is0() || scalar === _1n$1)
        return this;
      return wnaf.unsafe(this, scalar, (p) => normalizeZ(Point, p), acc);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafe(this, CURVE.n).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    clearCofactor() {
      if (cofactor === _1n$1)
        return this;
      return this.multiplyUnsafe(cofactor);
    }
    toBytes() {
      const { x: x2, y } = this.toAffine();
      const bytes = Fp3.toBytes(y);
      bytes[bytes.length - 1] |= x2 & _1n$1 ? 128 : 0;
      return bytes;
    }
    toHex() {
      return bytesToHex(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get ex() {
      return this.X;
    }
    get ey() {
      return this.Y;
    }
    get ez() {
      return this.Z;
    }
    get et() {
      return this.T;
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    toRawBytes() {
      return this.toBytes();
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n$1, modP(CURVE.Gx * CURVE.Gy));
  Point.ZERO = new Point(_0n, _1n$1, _1n$1, _0n);
  Point.Fp = Fp3;
  Point.Fn = Fn;
  const wnaf = new wNAF(Point, Fn.BITS);
  Point.BASE.precompute(8);
  return Point;
}
function eddsa(Point, cHash, eddsaOpts = {}) {
  if (typeof cHash !== "function")
    throw new Error('"hash" function param is required');
  _validateObject(eddsaOpts, {}, {
    adjustScalarBytes: "function",
    randomBytes: "function",
    domain: "function",
    prehash: "function",
    mapToCurve: "function"
  });
  const { prehash } = eddsaOpts;
  const { BASE: BASE2, Fp: Fp3, Fn } = Point;
  const randomBytes$1 = eddsaOpts.randomBytes || randomBytes;
  const adjustScalarBytes2 = eddsaOpts.adjustScalarBytes || ((bytes) => bytes);
  const domain = eddsaOpts.domain || ((data, ctx, phflag) => {
    _abool2(phflag, "phflag");
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  function modN_LE(hash2) {
    return Fn.create(bytesToNumberLE(hash2));
  }
  function getPrivateScalar(key) {
    const len = lengths.secretKey;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    return { head, prefix, scalar };
  }
  function getExtendedPublicKey(secretKey) {
    const { head, prefix, scalar } = getPrivateScalar(secretKey);
    const point = BASE2.multiply(scalar);
    const pointBytes = point.toBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey(secretKey) {
    return getExtendedPublicKey(secretKey).pointBytes;
  }
  function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
    const msg = concatBytes(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign(msg, secretKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(secretKey);
    const r = hashDomainToScalar(options.context, prefix, msg);
    const R = BASE2.multiply(r).toBytes();
    const k2 = hashDomainToScalar(options.context, R, pointBytes, msg);
    const s = Fn.create(r + k2 * scalar);
    if (!Fn.isValid(s))
      throw new Error("sign failed: invalid s");
    const rs = concatBytes(R, Fn.toBytes(s));
    return _abytes2(rs, lengths.signature, "result");
  }
  const verifyOpts = { zip215: true };
  function verify(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = lengths.signature;
    sig = ensureBytes("signature", sig, len);
    msg = ensureBytes("message", msg);
    publicKey = ensureBytes("publicKey", publicKey, lengths.publicKey);
    if (zip215 !== void 0)
      _abool2(zip215, "zip215");
    if (prehash)
      msg = prehash(msg);
    const mid = len / 2;
    const r = sig.subarray(0, mid);
    const s = bytesToNumberLE(sig.subarray(mid, len));
    let A2, R, SB;
    try {
      A2 = Point.fromBytes(publicKey, zip215);
      R = Point.fromBytes(r, zip215);
      SB = BASE2.multiplyUnsafe(s);
    } catch (error) {
      return false;
    }
    if (!zip215 && A2.isSmallOrder())
      return false;
    const k2 = hashDomainToScalar(context, R.toBytes(), A2.toBytes(), msg);
    const RkA = R.add(A2.multiplyUnsafe(k2));
    return RkA.subtract(SB).clearCofactor().is0();
  }
  const _size = Fp3.BYTES;
  const lengths = {
    secretKey: _size,
    publicKey: _size,
    signature: 2 * _size,
    seed: _size
  };
  function randomSecretKey(seed = randomBytes$1(lengths.seed)) {
    return _abytes2(seed, lengths.seed, "seed");
  }
  function keygen(seed) {
    const secretKey = utils2.randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey(secretKey) };
  }
  function isValidSecretKey(key) {
    return isBytes(key) && key.length === Fn.BYTES;
  }
  function isValidPublicKey(key, zip215) {
    try {
      return !!Point.fromBytes(key, zip215);
    } catch (error) {
      return false;
    }
  }
  const utils2 = {
    getExtendedPublicKey,
    randomSecretKey,
    isValidSecretKey,
    isValidPublicKey,
    /**
     * Converts ed public key to x public key. Uses formula:
     * - ed25519:
     *   - `(u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)`
     *   - `(x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))`
     * - ed448:
     *   - `(u, v) = ((y-1)/(y+1), sqrt(156324)*u/x)`
     *   - `(x, y) = (sqrt(156324)*u/v, (1+u)/(1-u))`
     */
    toMontgomery(publicKey) {
      const { y } = Point.fromBytes(publicKey);
      const size = lengths.publicKey;
      const is25519 = size === 32;
      if (!is25519 && size !== 57)
        throw new Error("only defined for 25519 and 448");
      const u = is25519 ? Fp3.div(_1n$1 + y, _1n$1 - y) : Fp3.div(y - _1n$1, y + _1n$1);
      return Fp3.toBytes(u);
    },
    toMontgomerySecret(secretKey) {
      const size = lengths.secretKey;
      _abytes2(secretKey, size);
      const hashed = cHash(secretKey.subarray(0, size));
      return adjustScalarBytes2(hashed).subarray(0, size);
    },
    /** @deprecated */
    randomPrivateKey: randomSecretKey,
    /** @deprecated */
    precompute(windowSize = 8, point = Point.BASE) {
      return point.precompute(windowSize, false);
    }
  };
  return Object.freeze({
    keygen,
    getPublicKey,
    sign,
    verify,
    utils: utils2,
    Point,
    lengths
  });
}
function _eddsa_legacy_opts_to_new(c) {
  const CURVE = {
    a: c.a,
    d: c.d,
    p: c.Fp.ORDER,
    n: c.n,
    h: c.h,
    Gx: c.Gx,
    Gy: c.Gy
  };
  const Fp3 = c.Fp;
  const Fn = Field(CURVE.n, c.nBitLength, true);
  const curveOpts = { Fp: Fp3, Fn, uvRatio: c.uvRatio };
  const eddsaOpts = {
    randomBytes: c.randomBytes,
    adjustScalarBytes: c.adjustScalarBytes,
    domain: c.domain,
    prehash: c.prehash,
    mapToCurve: c.mapToCurve
  };
  return { CURVE, curveOpts, hash: c.hash, eddsaOpts };
}
function _eddsa_new_output_to_legacy(c, eddsa2) {
  const Point = eddsa2.Point;
  const legacy = Object.assign({}, eddsa2, {
    ExtendedPoint: Point,
    CURVE: c,
    nBitLength: Point.Fn.BITS,
    nByteLength: Point.Fn.BYTES
  });
  return legacy;
}
function twistedEdwards(c) {
  const { CURVE, curveOpts, hash: hash2, eddsaOpts } = _eddsa_legacy_opts_to_new(c);
  const Point = edwards(CURVE, curveOpts);
  const EDDSA = eddsa(Point, hash2, eddsaOpts);
  return _eddsa_new_output_to_legacy(c, EDDSA);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _1n = BigInt(1), _2n = BigInt(2);
BigInt(3);
const _5n = BigInt(5), _8n = BigInt(8);
const ed25519_CURVE_p = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed");
const ed25519_CURVE = /* @__PURE__ */ (() => ({
  p: ed25519_CURVE_p,
  n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
  h: _8n,
  a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
  d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
  Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
  Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
}))();
function ed25519_pow_2_252_3(x2) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P2 = ed25519_CURVE_p;
  const x22 = x2 * x2 % P2;
  const b2 = x22 * x2 % P2;
  const b4 = pow2(b2, _2n, P2) * b2 % P2;
  const b5 = pow2(b4, _1n, P2) * x2 % P2;
  const b10 = pow2(b5, _5n, P2) * b5 % P2;
  const b20 = pow2(b10, _10n, P2) * b10 % P2;
  const b40 = pow2(b20, _20n, P2) * b20 % P2;
  const b80 = pow2(b40, _40n, P2) * b40 % P2;
  const b160 = pow2(b80, _80n, P2) * b80 % P2;
  const b240 = pow2(b160, _80n, P2) * b80 % P2;
  const b250 = pow2(b240, _10n, P2) * b10 % P2;
  const pow_p_5_8 = pow2(b250, _2n, P2) * x2 % P2;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes) {
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  return bytes;
}
const ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
function uvRatio(u, v2) {
  const P2 = ed25519_CURVE_p;
  const v3 = mod(v2 * v2 * v2, P2);
  const v7 = mod(v3 * v3 * v2, P2);
  const pow = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x2 = mod(u * v3 * pow, P2);
  const vx2 = mod(v2 * x2 * x2, P2);
  const root1 = x2;
  const root2 = mod(x2 * ED25519_SQRT_M1, P2);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod(-u, P2);
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P2);
  if (useRoot1)
    x2 = root1;
  if (useRoot2 || noRoot)
    x2 = root2;
  if (isNegativeLE(x2, P2))
    x2 = mod(-x2, P2);
  return { isValid: useRoot1 || useRoot2, value: x2 };
}
const Fp = /* @__PURE__ */ (() => Field(ed25519_CURVE.p, { isLE: true }))();
const ed25519Defaults = /* @__PURE__ */ (() => ({
  ...ed25519_CURVE,
  Fp,
  hash: sha512,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
}))();
const ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();
var __classPrivateFieldSet$i = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$i = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExpirableMap_inner, _ExpirableMap_expirationTime, _a$3, _b;
class ExpirableMap {
  /**
   * Create a new ExpirableMap.
   * @param {ExpirableMapOptions<any, any>} options - options for the map.
   * @param {Iterable<[any, any]>} options.source - an optional source of entries to initialize the map with.
   * @param {number} options.expirationTime - the time in milliseconds after which entries will expire.
   */
  constructor(options = {}) {
    _ExpirableMap_inner.set(this, void 0);
    _ExpirableMap_expirationTime.set(this, void 0);
    this[_a$3] = this.entries.bind(this);
    this[_b] = "ExpirableMap";
    const { source = [], expirationTime = 10 * 60 * 1e3 } = options;
    const currentTime = Date.now();
    __classPrivateFieldSet$i(this, _ExpirableMap_inner, new Map([...source].map(([key, value2]) => [key, { value: value2, timestamp: currentTime }])), "f");
    __classPrivateFieldSet$i(this, _ExpirableMap_expirationTime, expirationTime, "f");
  }
  /**
   * Prune removes all expired entries.
   */
  prune() {
    const currentTime = Date.now();
    for (const [key, entry] of __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").entries()) {
      if (currentTime - entry.timestamp > __classPrivateFieldGet$i(this, _ExpirableMap_expirationTime, "f")) {
        __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").delete(key);
      }
    }
    return this;
  }
  // Implementing the Map interface
  /**
   * Set the value for the given key. Prunes expired entries.
   * @param key for the entry
   * @param value of the entry
   * @returns this
   */
  set(key, value2) {
    this.prune();
    const entry = {
      value: value2,
      timestamp: Date.now()
    };
    __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").set(key, entry);
    return this;
  }
  /**
   * Get the value associated with the key, if it exists and has not expired.
   * @param key K
   * @returns the value associated with the key, or undefined if the key is not present or has expired.
   */
  get(key) {
    const entry = __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").get(key);
    if (entry === void 0) {
      return void 0;
    }
    if (Date.now() - entry.timestamp > __classPrivateFieldGet$i(this, _ExpirableMap_expirationTime, "f")) {
      __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").delete(key);
      return void 0;
    }
    return entry.value;
  }
  /**
   * Clear all entries.
   */
  clear() {
    __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").clear();
  }
  /**
   * Entries returns the entries of the map, without the expiration time.
   * @returns an iterator over the entries of the map.
   */
  entries() {
    const iterator = __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").entries();
    const generator = function* () {
      for (const [key, value2] of iterator) {
        yield [key, value2.value];
      }
    };
    return generator();
  }
  /**
   * Values returns the values of the map, without the expiration time.
   * @returns an iterator over the values of the map.
   */
  values() {
    const iterator = __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").values();
    const generator = function* () {
      for (const value2 of iterator) {
        yield value2.value;
      }
    };
    return generator();
  }
  /**
   * Keys returns the keys of the map
   * @returns an iterator over the keys of the map.
   */
  keys() {
    return __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").keys();
  }
  /**
   * forEach calls the callbackfn on each entry of the map.
   * @param callbackfn to call on each entry
   * @param thisArg to use as this when calling the callbackfn
   */
  forEach(callbackfn, thisArg) {
    for (const [key, value2] of __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").entries()) {
      callbackfn.call(thisArg, value2.value, key, this);
    }
  }
  /**
   * has returns true if the key exists and has not expired.
   * @param key K
   * @returns true if the key exists and has not expired.
   */
  has(key) {
    return __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").has(key);
  }
  /**
   * delete the entry for the given key.
   * @param key K
   * @returns true if the key existed and has been deleted.
   */
  delete(key) {
    return __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").delete(key);
  }
  /**
   * get size of the map.
   * @returns the size of the map.
   */
  get size() {
    return __classPrivateFieldGet$i(this, _ExpirableMap_inner, "f").size;
  }
}
_ExpirableMap_inner = /* @__PURE__ */ new WeakMap(), _ExpirableMap_expirationTime = /* @__PURE__ */ new WeakMap(), _a$3 = Symbol.iterator, _b = Symbol.toStringTag;
const encodeLenBytes = (len) => {
  if (len <= 127) {
    return 1;
  } else if (len <= 255) {
    return 2;
  } else if (len <= 65535) {
    return 3;
  } else if (len <= 16777215) {
    return 4;
  } else {
    throw new Error("Length too long (> 4 bytes)");
  }
};
const encodeLen = (buf, offset, len) => {
  if (len <= 127) {
    buf[offset] = len;
    return 1;
  } else if (len <= 255) {
    buf[offset] = 129;
    buf[offset + 1] = len;
    return 2;
  } else if (len <= 65535) {
    buf[offset] = 130;
    buf[offset + 1] = len >> 8;
    buf[offset + 2] = len;
    return 3;
  } else if (len <= 16777215) {
    buf[offset] = 131;
    buf[offset + 1] = len >> 16;
    buf[offset + 2] = len >> 8;
    buf[offset + 3] = len;
    return 4;
  } else {
    throw new Error("Length too long (> 4 bytes)");
  }
};
const decodeLenBytes = (buf, offset) => {
  if (buf[offset] < 128)
    return 1;
  if (buf[offset] === 128)
    throw new Error("Invalid length 0");
  if (buf[offset] === 129)
    return 2;
  if (buf[offset] === 130)
    return 3;
  if (buf[offset] === 131)
    return 4;
  throw new Error("Length too long (> 4 bytes)");
};
const decodeLen = (buf, offset) => {
  const lenBytes = decodeLenBytes(buf, offset);
  if (lenBytes === 1)
    return buf[offset];
  else if (lenBytes === 2)
    return buf[offset + 1];
  else if (lenBytes === 3)
    return (buf[offset + 1] << 8) + buf[offset + 2];
  else if (lenBytes === 4)
    return (buf[offset + 1] << 16) + (buf[offset + 2] << 8) + buf[offset + 3];
  throw new Error("Length too long (> 4 bytes)");
};
Uint8Array.from([
  ...[48, 12],
  ...[6, 10],
  ...[43, 6, 1, 4, 1, 131, 184, 67, 1, 1]
  // DER encoded COSE
]);
const ED25519_OID = Uint8Array.from([
  ...[48, 5],
  ...[6, 3],
  ...[43, 101, 112]
  // id-Ed25519 OID
]);
Uint8Array.from([
  ...[48, 16],
  ...[6, 7],
  ...[42, 134, 72, 206, 61, 2, 1],
  ...[6, 5],
  ...[43, 129, 4, 0, 10]
  // OID secp256k1
]);
function wrapDER(payload, oid) {
  const bitStringHeaderLength = 2 + encodeLenBytes(payload.byteLength + 1);
  const len = oid.byteLength + bitStringHeaderLength + payload.byteLength;
  let offset = 0;
  const buf = new Uint8Array(1 + encodeLenBytes(len) + len);
  buf[offset++] = 48;
  offset += encodeLen(buf, offset, len);
  buf.set(oid, offset);
  offset += oid.byteLength;
  buf[offset++] = 3;
  offset += encodeLen(buf, offset, payload.byteLength + 1);
  buf[offset++] = 0;
  buf.set(new Uint8Array(payload), offset);
  return buf;
}
const unwrapDER = (derEncoded, oid) => {
  let offset = 0;
  const expect = (n, msg) => {
    if (buf[offset++] !== n) {
      throw new Error("Expected: " + msg);
    }
  };
  const buf = new Uint8Array(derEncoded);
  expect(48, "sequence");
  offset += decodeLenBytes(buf, offset);
  if (!bufEquals(buf.slice(offset, offset + oid.byteLength), oid)) {
    throw new Error("Not the expected OID.");
  }
  offset += oid.byteLength;
  expect(3, "bit string");
  const payloadLen = decodeLen(buf, offset) - 1;
  offset += decodeLenBytes(buf, offset);
  expect(0, "0 padding");
  const result = buf.slice(offset);
  if (payloadLen !== result.length) {
    throw new Error(`DER payload mismatch: Expected length ${payloadLen} actual length ${result.length}`);
  }
  return result;
};
var __classPrivateFieldSet$h = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$h = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ed25519PublicKey_rawKey$1, _Ed25519PublicKey_derKey$1;
let Ed25519PublicKey$1 = class Ed25519PublicKey {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(key) {
    _Ed25519PublicKey_rawKey$1.set(this, void 0);
    _Ed25519PublicKey_derKey$1.set(this, void 0);
    if (key.byteLength !== Ed25519PublicKey.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    __classPrivateFieldSet$h(this, _Ed25519PublicKey_rawKey$1, key, "f");
    __classPrivateFieldSet$h(this, _Ed25519PublicKey_derKey$1, Ed25519PublicKey.derEncode(key), "f");
  }
  static from(key) {
    return this.fromDer(key.toDer());
  }
  static fromRaw(rawKey) {
    return new Ed25519PublicKey(rawKey);
  }
  static fromDer(derKey) {
    return new Ed25519PublicKey(this.derDecode(derKey));
  }
  static derEncode(publicKey) {
    return wrapDER(publicKey, ED25519_OID).buffer;
  }
  static derDecode(key) {
    const unwrapped = unwrapDER(key, ED25519_OID);
    if (unwrapped.length !== this.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    return unwrapped;
  }
  get rawKey() {
    return __classPrivateFieldGet$h(this, _Ed25519PublicKey_rawKey$1, "f");
  }
  get derKey() {
    return __classPrivateFieldGet$h(this, _Ed25519PublicKey_derKey$1, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
};
_Ed25519PublicKey_rawKey$1 = /* @__PURE__ */ new WeakMap(), _Ed25519PublicKey_derKey$1 = /* @__PURE__ */ new WeakMap();
Ed25519PublicKey$1.RAW_KEY_LENGTH = 32;
class Observable {
  constructor() {
    this.observers = [];
  }
  subscribe(func) {
    this.observers.push(func);
  }
  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }
  notify(data, ...rest) {
    this.observers.forEach((observer) => observer(data, ...rest));
  }
}
class ObservableLog extends Observable {
  constructor() {
    super();
  }
  print(message, ...rest) {
    this.notify({ message, level: "info" }, ...rest);
  }
  warn(message, ...rest) {
    this.notify({ message, level: "warn" }, ...rest);
  }
  error(message, error, ...rest) {
    this.notify({ message, level: "error", error }, ...rest);
  }
}
var __classPrivateFieldSet$g = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$g = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExponentialBackoff_currentInterval, _ExponentialBackoff_randomizationFactor, _ExponentialBackoff_multiplier, _ExponentialBackoff_maxInterval, _ExponentialBackoff_startTime, _ExponentialBackoff_maxElapsedTime, _ExponentialBackoff_maxIterations, _ExponentialBackoff_date, _ExponentialBackoff_count;
const RANDOMIZATION_FACTOR = 0.5;
const MULTIPLIER = 1.5;
const INITIAL_INTERVAL_MSEC = 500;
const MAX_INTERVAL_MSEC = 6e4;
const MAX_ELAPSED_TIME_MSEC = 9e5;
const MAX_ITERATIONS = 10;
class ExponentialBackoff {
  constructor(options = ExponentialBackoff.default) {
    _ExponentialBackoff_currentInterval.set(this, void 0);
    _ExponentialBackoff_randomizationFactor.set(this, void 0);
    _ExponentialBackoff_multiplier.set(this, void 0);
    _ExponentialBackoff_maxInterval.set(this, void 0);
    _ExponentialBackoff_startTime.set(this, void 0);
    _ExponentialBackoff_maxElapsedTime.set(this, void 0);
    _ExponentialBackoff_maxIterations.set(this, void 0);
    _ExponentialBackoff_date.set(this, void 0);
    _ExponentialBackoff_count.set(this, 0);
    const { initialInterval = INITIAL_INTERVAL_MSEC, randomizationFactor = RANDOMIZATION_FACTOR, multiplier = MULTIPLIER, maxInterval = MAX_INTERVAL_MSEC, maxElapsedTime = MAX_ELAPSED_TIME_MSEC, maxIterations = MAX_ITERATIONS, date = Date } = options;
    __classPrivateFieldSet$g(this, _ExponentialBackoff_currentInterval, initialInterval, "f");
    __classPrivateFieldSet$g(this, _ExponentialBackoff_randomizationFactor, randomizationFactor, "f");
    __classPrivateFieldSet$g(this, _ExponentialBackoff_multiplier, multiplier, "f");
    __classPrivateFieldSet$g(this, _ExponentialBackoff_maxInterval, maxInterval, "f");
    __classPrivateFieldSet$g(this, _ExponentialBackoff_date, date, "f");
    __classPrivateFieldSet$g(this, _ExponentialBackoff_startTime, date.now(), "f");
    __classPrivateFieldSet$g(this, _ExponentialBackoff_maxElapsedTime, maxElapsedTime, "f");
    __classPrivateFieldSet$g(this, _ExponentialBackoff_maxIterations, maxIterations, "f");
  }
  get ellapsedTimeInMsec() {
    return __classPrivateFieldGet$g(this, _ExponentialBackoff_date, "f").now() - __classPrivateFieldGet$g(this, _ExponentialBackoff_startTime, "f");
  }
  get currentInterval() {
    return __classPrivateFieldGet$g(this, _ExponentialBackoff_currentInterval, "f");
  }
  get count() {
    return __classPrivateFieldGet$g(this, _ExponentialBackoff_count, "f");
  }
  get randomValueFromInterval() {
    const delta = __classPrivateFieldGet$g(this, _ExponentialBackoff_randomizationFactor, "f") * __classPrivateFieldGet$g(this, _ExponentialBackoff_currentInterval, "f");
    const min = __classPrivateFieldGet$g(this, _ExponentialBackoff_currentInterval, "f") - delta;
    const max = __classPrivateFieldGet$g(this, _ExponentialBackoff_currentInterval, "f") + delta;
    return Math.random() * (max - min) + min;
  }
  incrementCurrentInterval() {
    var _a2;
    __classPrivateFieldSet$g(this, _ExponentialBackoff_currentInterval, Math.min(__classPrivateFieldGet$g(this, _ExponentialBackoff_currentInterval, "f") * __classPrivateFieldGet$g(this, _ExponentialBackoff_multiplier, "f"), __classPrivateFieldGet$g(this, _ExponentialBackoff_maxInterval, "f")), "f");
    __classPrivateFieldSet$g(this, _ExponentialBackoff_count, (_a2 = __classPrivateFieldGet$g(this, _ExponentialBackoff_count, "f"), _a2++, _a2), "f");
    return __classPrivateFieldGet$g(this, _ExponentialBackoff_currentInterval, "f");
  }
  next() {
    if (this.ellapsedTimeInMsec >= __classPrivateFieldGet$g(this, _ExponentialBackoff_maxElapsedTime, "f") || __classPrivateFieldGet$g(this, _ExponentialBackoff_count, "f") >= __classPrivateFieldGet$g(this, _ExponentialBackoff_maxIterations, "f")) {
      return null;
    } else {
      this.incrementCurrentInterval();
      return this.randomValueFromInterval;
    }
  }
}
_ExponentialBackoff_currentInterval = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_randomizationFactor = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_multiplier = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_maxInterval = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_startTime = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_maxElapsedTime = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_maxIterations = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_date = /* @__PURE__ */ new WeakMap(), _ExponentialBackoff_count = /* @__PURE__ */ new WeakMap();
ExponentialBackoff.default = {
  initialInterval: INITIAL_INTERVAL_MSEC,
  randomizationFactor: RANDOMIZATION_FACTOR,
  multiplier: MULTIPLIER,
  maxInterval: MAX_INTERVAL_MSEC,
  // 1 minute
  maxElapsedTime: MAX_ELAPSED_TIME_MSEC,
  maxIterations: MAX_ITERATIONS,
  date: Date
};
var __classPrivateFieldSet$f = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$f = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HttpAgent_instances, _HttpAgent_rootKeyPromise, _HttpAgent_shouldFetchRootKey, _HttpAgent_identity, _HttpAgent_fetch, _HttpAgent_fetchOptions, _HttpAgent_callOptions, _HttpAgent_timeDiffMsecs, _HttpAgent_credentials, _HttpAgent_retryTimes, _HttpAgent_backoffStrategy, _HttpAgent_maxIngressExpiryInMinutes, _HttpAgent_waterMark, _HttpAgent_queryPipeline, _HttpAgent_updatePipeline, _HttpAgent_subnetKeys, _HttpAgent_verifyQuerySignatures, _HttpAgent_requestAndRetryQuery, _HttpAgent_requestAndRetry, _HttpAgent_verifyQueryResponse, _HttpAgent_rootKeyGuard;
var RequestStatusResponseStatus;
(function(RequestStatusResponseStatus2) {
  RequestStatusResponseStatus2["Received"] = "received";
  RequestStatusResponseStatus2["Processing"] = "processing";
  RequestStatusResponseStatus2["Replied"] = "replied";
  RequestStatusResponseStatus2["Rejected"] = "rejected";
  RequestStatusResponseStatus2["Unknown"] = "unknown";
  RequestStatusResponseStatus2["Done"] = "done";
})(RequestStatusResponseStatus || (RequestStatusResponseStatus = {}));
const MINUTE_TO_MSECS = 60 * 1e3;
const IC_ROOT_KEY = "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d9685f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484b01291091c5f87b98883463f98091a0baaae";
const MANAGEMENT_CANISTER_ID = "aaaaa-aa";
const IC0_DOMAIN = "ic0.app";
const IC0_SUB_DOMAIN = ".ic0.app";
const ICP0_DOMAIN = "icp0.io";
const ICP0_SUB_DOMAIN = ".icp0.io";
const ICP_API_DOMAIN = "icp-api.io";
const ICP_API_SUB_DOMAIN = ".icp-api.io";
class HttpDefaultFetchError extends AgentError {
  constructor(message) {
    super(message);
    this.message = message;
  }
}
class IdentityInvalidError extends AgentError {
  constructor(message) {
    super(message);
    this.message = message;
  }
}
function getDefaultFetch() {
  let defaultFetch;
  if (typeof window !== "undefined") {
    if (window.fetch) {
      defaultFetch = window.fetch.bind(window);
    } else {
      throw new HttpDefaultFetchError("Fetch implementation was not available. You appear to be in a browser context, but window.fetch was not present.");
    }
  } else if (typeof globalThis !== "undefined") {
    if (globalThis.fetch) {
      defaultFetch = globalThis.fetch.bind(globalThis);
    } else {
      throw new HttpDefaultFetchError("Fetch implementation was not available. You appear to be in a Node.js context, but global.fetch was not available.");
    }
  } else if (typeof globalThis !== "undefined") {
    if (globalThis.fetch) {
      defaultFetch = globalThis.fetch.bind(globalThis);
    }
  }
  if (defaultFetch) {
    return defaultFetch;
  }
  throw new HttpDefaultFetchError("Fetch implementation was not available. Please provide fetch to the HttpAgent constructor, or ensure it is available in the window or global context.");
}
function determineHost(configuredHost) {
  let host;
  if (configuredHost !== void 0) {
    if (!configuredHost.match(/^[a-z]+:/) && typeof window !== "undefined") {
      host = new URL(window.location.protocol + "//" + configuredHost);
    } else {
      host = new URL(configuredHost);
    }
  } else {
    const knownHosts = ["ic0.app", "icp0.io", "127.0.0.1", "localhost"];
    const remoteHosts = [".github.dev", ".gitpod.io"];
    const location2 = typeof window !== "undefined" ? window.location : void 0;
    const hostname = location2 === null || location2 === void 0 ? void 0 : location2.hostname;
    let knownHost;
    if (hostname && typeof hostname === "string") {
      if (remoteHosts.some((host2) => hostname.endsWith(host2))) {
        knownHost = hostname;
      } else {
        knownHost = knownHosts.find((host2) => hostname.endsWith(host2));
      }
    }
    if (location2 && knownHost) {
      host = new URL(`${location2.protocol}//${knownHost}${location2.port ? ":" + location2.port : ""}`);
    } else {
      host = new URL("https://icp-api.io");
    }
  }
  return host.toString();
}
class HttpAgent {
  /**
   * @param options - Options for the HttpAgent
   * @deprecated Use `HttpAgent.create` or `HttpAgent.createSync` instead
   */
  constructor(options = {}) {
    var _a2, _b2;
    _HttpAgent_instances.add(this);
    _HttpAgent_rootKeyPromise.set(this, null);
    _HttpAgent_shouldFetchRootKey.set(this, false);
    _HttpAgent_identity.set(this, void 0);
    _HttpAgent_fetch.set(this, void 0);
    _HttpAgent_fetchOptions.set(this, void 0);
    _HttpAgent_callOptions.set(this, void 0);
    _HttpAgent_timeDiffMsecs.set(this, 0);
    _HttpAgent_credentials.set(this, void 0);
    _HttpAgent_retryTimes.set(this, void 0);
    _HttpAgent_backoffStrategy.set(this, void 0);
    _HttpAgent_maxIngressExpiryInMinutes.set(this, void 0);
    this._isAgent = true;
    this.config = {};
    _HttpAgent_waterMark.set(this, 0);
    this.log = new ObservableLog();
    _HttpAgent_queryPipeline.set(this, []);
    _HttpAgent_updatePipeline.set(this, []);
    _HttpAgent_subnetKeys.set(this, new ExpirableMap({
      expirationTime: 5 * 60 * 1e3
      // 5 minutes
    }));
    _HttpAgent_verifyQuerySignatures.set(this, true);
    _HttpAgent_verifyQueryResponse.set(this, (queryResponse, subnetStatus) => {
      if (__classPrivateFieldGet$f(this, _HttpAgent_verifyQuerySignatures, "f") === false) {
        return queryResponse;
      }
      if (!subnetStatus) {
        throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
      }
      const { status, signatures = [], requestId } = queryResponse;
      const domainSeparator2 = bufFromBufLike$1(new TextEncoder().encode("\vic-response"));
      for (const sig of signatures) {
        const { timestamp, identity } = sig;
        const nodeId = Principal$1.fromUint8Array(identity).toText();
        let hash2;
        if (status === "replied") {
          const { reply } = queryResponse;
          hash2 = hashOfMap({
            status,
            reply,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else if (status === "rejected") {
          const { reject_code, reject_message, error_code } = queryResponse;
          hash2 = hashOfMap({
            status,
            reject_code,
            reject_message,
            error_code,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else {
          throw new Error(`Unknown status: ${status}`);
        }
        const separatorWithHash = concat$1(domainSeparator2, bufFromBufLike$1(new Uint8Array(hash2)));
        const pubKey = subnetStatus === null || subnetStatus === void 0 ? void 0 : subnetStatus.nodeKeys.get(nodeId);
        if (!pubKey) {
          throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
        }
        const rawKey = Ed25519PublicKey$1.fromDer(pubKey).rawKey;
        const valid = ed25519.verify(sig.signature, new Uint8Array(separatorWithHash), new Uint8Array(rawKey));
        if (valid)
          return queryResponse;
        throw new CertificateVerificationError(`Invalid signature from replica ${nodeId} signed query.`);
      }
      return queryResponse;
    });
    this.config = options;
    __classPrivateFieldSet$f(this, _HttpAgent_fetch, options.fetch || getDefaultFetch() || fetch.bind(globalThis));
    __classPrivateFieldSet$f(this, _HttpAgent_fetchOptions, options.fetchOptions);
    __classPrivateFieldSet$f(this, _HttpAgent_callOptions, options.callOptions);
    __classPrivateFieldSet$f(this, _HttpAgent_shouldFetchRootKey, (_a2 = options.shouldFetchRootKey) !== null && _a2 !== void 0 ? _a2 : false);
    if (options.rootKey) {
      this.rootKey = options.rootKey;
    } else if (__classPrivateFieldGet$f(this, _HttpAgent_shouldFetchRootKey, "f")) {
      this.rootKey = null;
    } else {
      this.rootKey = fromHex(IC_ROOT_KEY);
    }
    const host = determineHost(options.host);
    this.host = new URL(host);
    if (options.verifyQuerySignatures !== void 0) {
      __classPrivateFieldSet$f(this, _HttpAgent_verifyQuerySignatures, options.verifyQuerySignatures);
    }
    __classPrivateFieldSet$f(this, _HttpAgent_retryTimes, (_b2 = options.retryTimes) !== null && _b2 !== void 0 ? _b2 : 3);
    const defaultBackoffFactory = () => new ExponentialBackoff({
      maxIterations: __classPrivateFieldGet$f(this, _HttpAgent_retryTimes, "f")
    });
    __classPrivateFieldSet$f(this, _HttpAgent_backoffStrategy, options.backoffStrategy || defaultBackoffFactory);
    if (this.host.hostname.endsWith(IC0_SUB_DOMAIN)) {
      this.host.hostname = IC0_DOMAIN;
    } else if (this.host.hostname.endsWith(ICP0_SUB_DOMAIN)) {
      this.host.hostname = ICP0_DOMAIN;
    } else if (this.host.hostname.endsWith(ICP_API_SUB_DOMAIN)) {
      this.host.hostname = ICP_API_DOMAIN;
    }
    if (options.credentials) {
      const { name, password } = options.credentials;
      __classPrivateFieldSet$f(this, _HttpAgent_credentials, `${name}${password ? ":" + password : ""}`);
    }
    __classPrivateFieldSet$f(this, _HttpAgent_identity, Promise.resolve(options.identity || new AnonymousIdentity()));
    if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes > 5) {
      throw new AgentError(`The maximum ingress expiry time is 5 minutes. Provided ingress expiry time is ${options.ingressExpiryInMinutes} minutes.`);
    }
    if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes <= 0) {
      throw new AgentError(`Ingress expiry time must be greater than 0. Provided ingress expiry time is ${options.ingressExpiryInMinutes} minutes.`);
    }
    __classPrivateFieldSet$f(this, _HttpAgent_maxIngressExpiryInMinutes, options.ingressExpiryInMinutes || 5);
    this.addTransform("update", makeNonceTransform(makeNonce));
    if (options.useQueryNonces) {
      this.addTransform("query", makeNonceTransform(makeNonce));
    }
    if (options.logToConsole) {
      this.log.subscribe((log) => {
        if (log.level === "error") {
          console.error(log.message);
        } else if (log.level === "warn") {
          console.warn(log.message);
        } else {
          console.log(log.message);
        }
      });
    }
  }
  get waterMark() {
    return __classPrivateFieldGet$f(this, _HttpAgent_waterMark, "f");
  }
  static createSync(options = {}) {
    return new this(Object.assign({}, options));
  }
  static async create(options = {
    shouldFetchRootKey: false
  }) {
    const agent = HttpAgent.createSync(options);
    const initPromises = [agent.syncTime()];
    if (agent.host.toString() !== "https://icp-api.io" && options.shouldFetchRootKey) {
      initPromises.push(agent.fetchRootKey());
    }
    await Promise.all(initPromises);
    return agent;
  }
  static async from(agent) {
    var _a2;
    try {
      if ("config" in agent) {
        return await HttpAgent.create(agent.config);
      }
      return await HttpAgent.create({
        fetch: agent._fetch,
        fetchOptions: agent._fetchOptions,
        callOptions: agent._callOptions,
        host: agent._host.toString(),
        identity: (_a2 = agent._identity) !== null && _a2 !== void 0 ? _a2 : void 0
      });
    } catch (_b2) {
      throw new AgentError("Failed to create agent from provided agent");
    }
  }
  isLocal() {
    const hostname = this.host.hostname;
    return hostname === "127.0.0.1" || hostname.endsWith("127.0.0.1");
  }
  addTransform(type, fn, priority = fn.priority || 0) {
    if (type === "update") {
      const i = __classPrivateFieldGet$f(this, _HttpAgent_updatePipeline, "f").findIndex((x2) => (x2.priority || 0) < priority);
      __classPrivateFieldGet$f(this, _HttpAgent_updatePipeline, "f").splice(i >= 0 ? i : __classPrivateFieldGet$f(this, _HttpAgent_updatePipeline, "f").length, 0, Object.assign(fn, { priority }));
    } else if (type === "query") {
      const i = __classPrivateFieldGet$f(this, _HttpAgent_queryPipeline, "f").findIndex((x2) => (x2.priority || 0) < priority);
      __classPrivateFieldGet$f(this, _HttpAgent_queryPipeline, "f").splice(i >= 0 ? i : __classPrivateFieldGet$f(this, _HttpAgent_queryPipeline, "f").length, 0, Object.assign(fn, { priority }));
    }
  }
  async getPrincipal() {
    if (!__classPrivateFieldGet$f(this, _HttpAgent_identity, "f")) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    return (await __classPrivateFieldGet$f(this, _HttpAgent_identity, "f")).getPrincipal();
  }
  /**
   * Makes a call to a canister method.
   * @param canisterId - The ID of the canister to call. Can be a Principal or a string.
   * @param options - Options for the call.
   * @param options.methodName - The name of the method to call.
   * @param options.arg - The argument to pass to the method, as an ArrayBuffer.
   * @param options.effectiveCanisterId - (Optional) The effective canister ID, if different from the target canister ID.
   * @param options.callSync - (Optional) Whether to use synchronous call mode. Defaults to true.
   * @param options.nonce - (Optional) A unique nonce for the request. If provided, it will override any nonce set by transforms.
   * @param identity - (Optional) The identity to use for the call. If not provided, the agent's current identity will be used.
   * @returns A promise that resolves to the response of the call, including the request ID and response details.
   */
  async call(canisterId, options, identity) {
    var _a2, _b2;
    await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const callSync = (_a2 = options.callSync) !== null && _a2 !== void 0 ? _a2 : true;
    const id = await (identity !== void 0 ? await identity : await __classPrivateFieldGet$f(this, _HttpAgent_identity, "f"));
    if (!id) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    const canister = Principal$1.from(canisterId);
    const ecid = options.effectiveCanisterId ? Principal$1.from(options.effectiveCanisterId) : canister;
    const sender = id.getPrincipal() || Principal$1.anonymous();
    let ingress_expiry = new Expiry(__classPrivateFieldGet$f(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS);
    if (Math.abs(__classPrivateFieldGet$f(this, _HttpAgent_timeDiffMsecs, "f")) > 1e3 * 30) {
      ingress_expiry = new Expiry(__classPrivateFieldGet$f(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS + __classPrivateFieldGet$f(this, _HttpAgent_timeDiffMsecs, "f"));
    }
    const submit = {
      request_type: SubmitRequestType.Call,
      canister_id: canister,
      method_name: options.methodName,
      arg: options.arg,
      sender,
      ingress_expiry
    };
    let transformedRequest = await this._transform({
      request: {
        body: null,
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/cbor" }, __classPrivateFieldGet$f(this, _HttpAgent_credentials, "f") ? { Authorization: "Basic " + btoa(__classPrivateFieldGet$f(this, _HttpAgent_credentials, "f")) } : {})
      },
      endpoint: "call",
      body: submit
    });
    let nonce;
    if (options === null || options === void 0 ? void 0 : options.nonce) {
      nonce = toNonce(options.nonce);
    } else if (transformedRequest.body.nonce) {
      nonce = toNonce(transformedRequest.body.nonce);
    } else {
      nonce = void 0;
    }
    submit.nonce = nonce;
    function toNonce(buf) {
      return new Uint8Array(buf);
    }
    transformedRequest = await id.transformRequest(transformedRequest);
    const body = encode(transformedRequest.body);
    const backoff2 = __classPrivateFieldGet$f(this, _HttpAgent_backoffStrategy, "f").call(this);
    const requestId = requestIdOf(submit);
    try {
      const requestSync = () => {
        this.log.print(`fetching "/api/v3/canister/${ecid.toText()}/call" with request:`, transformedRequest);
        return __classPrivateFieldGet$f(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v3/canister/${ecid.toText()}/call`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet$f(this, _HttpAgent_callOptions, "f")), transformedRequest.request), { body }));
      };
      const requestAsync = () => {
        this.log.print(`fetching "/api/v2/canister/${ecid.toText()}/call" with request:`, transformedRequest);
        return __classPrivateFieldGet$f(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v2/canister/${ecid.toText()}/call`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet$f(this, _HttpAgent_callOptions, "f")), transformedRequest.request), { body }));
      };
      const request2 = __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
        request: callSync ? requestSync : requestAsync,
        backoff: backoff2,
        tries: 0
      });
      const response = await request2;
      const responseBuffer = await response.arrayBuffer();
      const responseBody = response.status === 200 && responseBuffer.byteLength > 0 ? decode(responseBuffer) : null;
      if (responseBody && "certificate" in responseBody) {
        const time = await this.parseTimeFromResponse({
          certificate: responseBody.certificate
        });
        __classPrivateFieldSet$f(this, _HttpAgent_waterMark, time, "f");
      }
      return {
        requestId,
        response: {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          body: responseBody,
          headers: httpHeadersTransform(response.headers)
        },
        requestDetails: submit
      };
    } catch (error) {
      if (error.message.includes("v3 api not supported.")) {
        this.log.warn("v3 api not supported. Fall back to v2");
        return this.call(canisterId, Object.assign(Object.assign({}, options), {
          // disable v3 api
          callSync: false
        }), identity);
      }
      const message = `Error while making call: ${(_b2 = error.message) !== null && _b2 !== void 0 ? _b2 : String(error)}`;
      const callError = new AgentCallError(message, error, toHex(requestId), toHex(transformedRequest.body.sender_pubkey), toHex(transformedRequest.body.sender_sig), String(transformedRequest.body.content.ingress_expiry["_value"]));
      this.log.error(message, callError);
      throw callError;
    }
  }
  async query(canisterId, fields, identity) {
    var _a2, _b2, _c, _d;
    await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const backoff2 = __classPrivateFieldGet$f(this, _HttpAgent_backoffStrategy, "f").call(this);
    const ecid = fields.effectiveCanisterId ? Principal$1.from(fields.effectiveCanisterId) : Principal$1.from(canisterId);
    this.log.print(`ecid ${ecid.toString()}`);
    this.log.print(`canisterId ${canisterId.toString()}`);
    let transformedRequest = void 0;
    let queryResult;
    const id = await (identity !== void 0 ? identity : __classPrivateFieldGet$f(this, _HttpAgent_identity, "f"));
    if (!id) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    const canister = Principal$1.from(canisterId);
    const sender = (id === null || id === void 0 ? void 0 : id.getPrincipal()) || Principal$1.anonymous();
    const request2 = {
      request_type: "query",
      canister_id: canister,
      method_name: fields.methodName,
      arg: fields.arg,
      sender,
      ingress_expiry: new Expiry(__classPrivateFieldGet$f(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS)
    };
    const requestId = requestIdOf(request2);
    transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/cbor" }, __classPrivateFieldGet$f(this, _HttpAgent_credentials, "f") ? { Authorization: "Basic " + btoa(__classPrivateFieldGet$f(this, _HttpAgent_credentials, "f")) } : {})
      },
      endpoint: "read",
      body: request2
    });
    transformedRequest = await (id === null || id === void 0 ? void 0 : id.transformRequest(transformedRequest));
    const body = encode(transformedRequest.body);
    const args = {
      canister: canister.toText(),
      ecid,
      transformedRequest,
      body,
      requestId,
      backoff: backoff2,
      tries: 0
    };
    const makeQuery = async () => {
      return {
        requestDetails: request2,
        query: await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery).call(this, args)
      };
    };
    const getSubnetStatus = async () => {
      if (!__classPrivateFieldGet$f(this, _HttpAgent_verifyQuerySignatures, "f")) {
        return void 0;
      }
      const subnetStatus = __classPrivateFieldGet$f(this, _HttpAgent_subnetKeys, "f").get(ecid.toString());
      if (subnetStatus) {
        return subnetStatus;
      }
      await this.fetchSubnetKeys(ecid.toString());
      return __classPrivateFieldGet$f(this, _HttpAgent_subnetKeys, "f").get(ecid.toString());
    };
    try {
      const [_queryResult, subnetStatus] = await Promise.all([makeQuery(), getSubnetStatus()]);
      queryResult = _queryResult;
      const { requestDetails, query } = queryResult;
      const queryWithDetails = Object.assign(Object.assign({}, query), { requestDetails });
      this.log.print("Query response:", queryWithDetails);
      if (!__classPrivateFieldGet$f(this, _HttpAgent_verifyQuerySignatures, "f")) {
        return queryWithDetails;
      }
      try {
        return __classPrivateFieldGet$f(this, _HttpAgent_verifyQueryResponse, "f").call(this, queryWithDetails, subnetStatus);
      } catch (_e) {
        this.log.warn("Query response verification failed. Retrying with fresh subnet keys.");
        __classPrivateFieldGet$f(this, _HttpAgent_subnetKeys, "f").delete(canisterId.toString());
        await this.fetchSubnetKeys(ecid.toString());
        const updatedSubnetStatus = __classPrivateFieldGet$f(this, _HttpAgent_subnetKeys, "f").get(canisterId.toString());
        if (!updatedSubnetStatus) {
          throw new CertificateVerificationError("Invalid signature from replica signed query: no matching node key found.");
        }
        return __classPrivateFieldGet$f(this, _HttpAgent_verifyQueryResponse, "f").call(this, queryWithDetails, updatedSubnetStatus);
      }
    } catch (error) {
      const message = `Error while making call: ${(_a2 = error.message) !== null && _a2 !== void 0 ? _a2 : String(error)}`;
      const queryError = new AgentQueryError(message, error, String(requestId), toHex((_b2 = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _b2 === void 0 ? void 0 : _b2.sender_pubkey), toHex((_c = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _c === void 0 ? void 0 : _c.sender_sig), String((_d = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _d === void 0 ? void 0 : _d.content.ingress_expiry["_value"]));
      this.log.error(message, queryError);
      throw queryError;
    }
  }
  async createReadStateRequest(fields, identity) {
    await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const id = await (identity !== void 0 ? await identity : await __classPrivateFieldGet$f(this, _HttpAgent_identity, "f"));
    if (!id) {
      throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
    }
    const sender = (id === null || id === void 0 ? void 0 : id.getPrincipal()) || Principal$1.anonymous();
    const transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/cbor" }, __classPrivateFieldGet$f(this, _HttpAgent_credentials, "f") ? { Authorization: "Basic " + btoa(__classPrivateFieldGet$f(this, _HttpAgent_credentials, "f")) } : {})
      },
      endpoint: "read_state",
      body: {
        request_type: "read_state",
        paths: fields.paths,
        sender,
        ingress_expiry: new Expiry(__classPrivateFieldGet$f(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS)
      }
    });
    return id === null || id === void 0 ? void 0 : id.transformRequest(transformedRequest);
  }
  async readState(canisterId, fields, identity, request2) {
    var _a2, _b2, _c, _d;
    function getRequestId(fields2) {
      for (const path of fields2.paths) {
        const [pathName, value2] = path;
        const request_status = bufFromBufLike$1(new TextEncoder().encode("request_status"));
        if (bufEquals(pathName, request_status)) {
          return value2;
        }
      }
    }
    const requestId = getRequestId(fields);
    await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const canister = typeof canisterId === "string" ? Principal$1.fromText(canisterId) : canisterId;
    const transformedRequest = request2 !== null && request2 !== void 0 ? request2 : await this.createReadStateRequest(fields, identity);
    const body = encode(transformedRequest.body);
    this.log.print(`fetching "/api/v2/canister/${canister}/read_state" with request:`, transformedRequest);
    const backoff2 = __classPrivateFieldGet$f(this, _HttpAgent_backoffStrategy, "f").call(this);
    try {
      const response = await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
        request: () => __classPrivateFieldGet$f(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v2/canister/${canister.toString()}/read_state`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet$f(this, _HttpAgent_fetchOptions, "f")), transformedRequest.request), { body })),
        backoff: backoff2,
        tries: 0
      });
      if (!response.ok) {
        throw new Error(`Server returned an error:
  Code: ${response.status} (${response.statusText})
  Body: ${await response.text()}
`);
      }
      const decodedResponse = decode(await response.arrayBuffer());
      this.log.print("Read state response:", decodedResponse);
      const parsedTime = await this.parseTimeFromResponse(decodedResponse);
      if (parsedTime > 0) {
        this.log.print("Read state response time:", parsedTime);
        __classPrivateFieldSet$f(this, _HttpAgent_waterMark, parsedTime, "f");
      }
      return decodedResponse;
    } catch (error) {
      const message = `Caught exception while attempting to read state: ${(_a2 = error.message) !== null && _a2 !== void 0 ? _a2 : String(error)}`;
      const readStateError = new AgentReadStateError(message, error, String(requestId), toHex((_b2 = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _b2 === void 0 ? void 0 : _b2.sender_pubkey), toHex((_c = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _c === void 0 ? void 0 : _c.sender_sig), String((_d = transformedRequest === null || transformedRequest === void 0 ? void 0 : transformedRequest.body) === null || _d === void 0 ? void 0 : _d.content.ingress_expiry["_value"]));
      this.log.error(message, readStateError);
      throw readStateError;
    }
  }
  async parseTimeFromResponse(response) {
    let tree;
    if (response.certificate) {
      const decoded = decode(response.certificate);
      if (decoded && "tree" in decoded) {
        tree = decoded.tree;
      } else {
        throw new Error("Could not decode time from response");
      }
      const timeLookup = lookup_path(["time"], tree);
      if (timeLookup.status !== LookupStatus.Found) {
        throw new Error("Time was not found in the response or was not in its expected format.");
      }
      if (!(timeLookup.value instanceof ArrayBuffer) && !ArrayBuffer.isView(timeLookup)) {
        throw new Error("Time was not found in the response or was not in its expected format.");
      }
      const date = decodeTime(bufFromBufLike$1(timeLookup.value));
      this.log.print("Time from response:", date);
      this.log.print("Time from response in milliseconds:", Number(date));
      return Number(date);
    } else {
      this.log.warn("No certificate found in response");
    }
    return 0;
  }
  /**
   * Allows agent to sync its time with the network. Can be called during intialization or mid-lifecycle if the device's clock has drifted away from the network time. This is necessary to set the Expiry for a request
   * @param {Principal} canisterId - Pass a canister ID if you need to sync the time with a particular replica. Uses the management canister by default
   */
  async syncTime(canisterId) {
    await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const CanisterStatus = await Promise.resolve().then(() => index);
    const callTime = Date.now();
    try {
      if (!canisterId) {
        this.log.print("Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai");
      }
      const anonymousAgent = HttpAgent.createSync({
        identity: new AnonymousIdentity(),
        host: this.host.toString(),
        fetch: __classPrivateFieldGet$f(this, _HttpAgent_fetch, "f"),
        retryTimes: 0
      });
      const status = await CanisterStatus.request({
        // Fall back with canisterId of the ICP Ledger
        canisterId: canisterId !== null && canisterId !== void 0 ? canisterId : Principal$1.from("ryjl3-tyaaa-aaaaa-aaaba-cai"),
        agent: anonymousAgent,
        paths: ["time"]
      });
      const replicaTime = status.get("time");
      if (replicaTime) {
        __classPrivateFieldSet$f(this, _HttpAgent_timeDiffMsecs, Number(replicaTime) - Number(callTime), "f");
        this.log.notify({
          message: `Syncing time: offset of ${__classPrivateFieldGet$f(this, _HttpAgent_timeDiffMsecs, "f")}`,
          level: "info"
        });
      }
    } catch (error) {
      this.log.error("Caught exception while attempting to sync time", error);
    }
  }
  async status() {
    const headers = __classPrivateFieldGet$f(this, _HttpAgent_credentials, "f") ? {
      Authorization: "Basic " + btoa(__classPrivateFieldGet$f(this, _HttpAgent_credentials, "f"))
    } : {};
    this.log.print(`fetching "/api/v2/status"`);
    const backoff2 = __classPrivateFieldGet$f(this, _HttpAgent_backoffStrategy, "f").call(this);
    const response = await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
      backoff: backoff2,
      request: () => __classPrivateFieldGet$f(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v2/status`, this.host), Object.assign({ headers }, __classPrivateFieldGet$f(this, _HttpAgent_fetchOptions, "f"))),
      tries: 0
    });
    return decode(await response.arrayBuffer());
  }
  async fetchRootKey() {
    let result;
    if (__classPrivateFieldGet$f(this, _HttpAgent_rootKeyPromise, "f")) {
      result = await __classPrivateFieldGet$f(this, _HttpAgent_rootKeyPromise, "f");
    } else {
      __classPrivateFieldSet$f(this, _HttpAgent_rootKeyPromise, new Promise((resolve, reject) => {
        this.status().then((value2) => {
          const rootKey = value2.root_key;
          this.rootKey = rootKey;
          resolve(rootKey);
        }).catch(reject);
      }));
      result = await __classPrivateFieldGet$f(this, _HttpAgent_rootKeyPromise, "f");
    }
    __classPrivateFieldSet$f(this, _HttpAgent_rootKeyPromise, null);
    return result;
  }
  invalidateIdentity() {
    __classPrivateFieldSet$f(this, _HttpAgent_identity, null);
  }
  replaceIdentity(identity) {
    __classPrivateFieldSet$f(this, _HttpAgent_identity, Promise.resolve(identity));
  }
  async fetchSubnetKeys(canisterId) {
    await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_rootKeyGuard).call(this);
    const effectiveCanisterId = Principal$1.from(canisterId);
    const response = await request({
      canisterId: effectiveCanisterId,
      paths: ["subnet"],
      agent: this
    });
    const subnetResponse = response.get("subnet");
    if (subnetResponse && typeof subnetResponse === "object" && "nodeKeys" in subnetResponse) {
      __classPrivateFieldGet$f(this, _HttpAgent_subnetKeys, "f").set(effectiveCanisterId.toText(), subnetResponse);
      return subnetResponse;
    }
    return void 0;
  }
  _transform(request2) {
    let p = Promise.resolve(request2);
    if (request2.endpoint === "call") {
      for (const fn of __classPrivateFieldGet$f(this, _HttpAgent_updatePipeline, "f")) {
        p = p.then((r) => fn(r).then((r2) => r2 || r));
      }
    } else {
      for (const fn of __classPrivateFieldGet$f(this, _HttpAgent_queryPipeline, "f")) {
        p = p.then((r) => fn(r).then((r2) => r2 || r));
      }
    }
    return p;
  }
}
_HttpAgent_rootKeyPromise = /* @__PURE__ */ new WeakMap(), _HttpAgent_shouldFetchRootKey = /* @__PURE__ */ new WeakMap(), _HttpAgent_identity = /* @__PURE__ */ new WeakMap(), _HttpAgent_fetch = /* @__PURE__ */ new WeakMap(), _HttpAgent_fetchOptions = /* @__PURE__ */ new WeakMap(), _HttpAgent_callOptions = /* @__PURE__ */ new WeakMap(), _HttpAgent_timeDiffMsecs = /* @__PURE__ */ new WeakMap(), _HttpAgent_credentials = /* @__PURE__ */ new WeakMap(), _HttpAgent_retryTimes = /* @__PURE__ */ new WeakMap(), _HttpAgent_backoffStrategy = /* @__PURE__ */ new WeakMap(), _HttpAgent_maxIngressExpiryInMinutes = /* @__PURE__ */ new WeakMap(), _HttpAgent_waterMark = /* @__PURE__ */ new WeakMap(), _HttpAgent_queryPipeline = /* @__PURE__ */ new WeakMap(), _HttpAgent_updatePipeline = /* @__PURE__ */ new WeakMap(), _HttpAgent_subnetKeys = /* @__PURE__ */ new WeakMap(), _HttpAgent_verifyQuerySignatures = /* @__PURE__ */ new WeakMap(), _HttpAgent_verifyQueryResponse = /* @__PURE__ */ new WeakMap(), _HttpAgent_instances = /* @__PURE__ */ new WeakSet(), _HttpAgent_requestAndRetryQuery = async function _HttpAgent_requestAndRetryQuery2(args) {
  var _a2, _b2;
  const { ecid, transformedRequest, body, requestId, backoff: backoff2, tries } = args;
  const delay = tries === 0 ? 0 : backoff2.next();
  this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with tries:`, {
    tries,
    backoff: backoff2,
    delay
  });
  if (delay === null) {
    throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet$f(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
  }
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  let response;
  try {
    this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with request:`, transformedRequest);
    const fetchResponse = await __classPrivateFieldGet$f(this, _HttpAgent_fetch, "f").call(this, "" + new URL(`/api/v2/canister/${ecid.toString()}/query`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet$f(this, _HttpAgent_fetchOptions, "f")), transformedRequest.request), { body }));
    if (fetchResponse.status === 200) {
      const queryResponse = decode(await fetchResponse.arrayBuffer());
      response = Object.assign(Object.assign({}, queryResponse), { httpDetails: {
        ok: fetchResponse.ok,
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        headers: httpHeadersTransform(fetchResponse.headers)
      }, requestId });
    } else {
      throw new AgentHTTPResponseError(`Gateway returned an error:
  Code: ${fetchResponse.status} (${fetchResponse.statusText})
  Body: ${await fetchResponse.text()}
`, {
        ok: fetchResponse.ok,
        status: fetchResponse.status,
        statusText: fetchResponse.statusText,
        headers: httpHeadersTransform(fetchResponse.headers)
      });
    }
  } catch (error) {
    if (tries < __classPrivateFieldGet$f(this, _HttpAgent_retryTimes, "f")) {
      this.log.warn(`Caught exception while attempting to make query:
  ${error}
  Retrying query.`);
      return await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery2).call(this, Object.assign(Object.assign({}, args), { tries: tries + 1 }));
    }
    throw error;
  }
  const timestamp = (_b2 = (_a2 = response.signatures) === null || _a2 === void 0 ? void 0 : _a2[0]) === null || _b2 === void 0 ? void 0 : _b2.timestamp;
  if (!__classPrivateFieldGet$f(this, _HttpAgent_verifyQuerySignatures, "f")) {
    return response;
  }
  if (!timestamp) {
    throw new Error("Timestamp not found in query response. This suggests a malformed or malicious response.");
  }
  const timeStampInMs = Number(BigInt(timestamp) / BigInt(1e6));
  this.log.print("watermark and timestamp", {
    waterMark: this.waterMark,
    timestamp: timeStampInMs
  });
  if (Number(this.waterMark) > timeStampInMs) {
    const error = new AgentError("Timestamp is below the watermark. Retrying query.");
    this.log.error("Timestamp is below", error, {
      timestamp,
      waterMark: this.waterMark
    });
    if (tries < __classPrivateFieldGet$f(this, _HttpAgent_retryTimes, "f")) {
      return await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery2).call(this, Object.assign(Object.assign({}, args), { tries: tries + 1 }));
    }
    {
      throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet$f(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
    }
  }
  return response;
}, _HttpAgent_requestAndRetry = async function _HttpAgent_requestAndRetry2(args) {
  const { request: request2, backoff: backoff2, tries } = args;
  const delay = tries === 0 ? 0 : backoff2.next();
  if (delay === null) {
    throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet$f(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
  }
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  let response;
  try {
    response = await request2();
  } catch (error) {
    if (__classPrivateFieldGet$f(this, _HttpAgent_retryTimes, "f") > tries) {
      this.log.warn(`Caught exception while attempting to make request:
  ${error}
  Retrying request.`);
      return await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry2).call(this, { request: request2, backoff: backoff2, tries: tries + 1 });
    }
    throw error;
  }
  if (response.ok) {
    return response;
  }
  const responseText = await response.clone().text();
  const errorMessage = `Server returned an error:
  Code: ${response.status} (${response.statusText})
  Body: ${responseText}
`;
  if (response.status === 404 && response.url.includes("api/v3")) {
    throw new AgentHTTPResponseError("v3 api not supported. Fall back to v2", {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: httpHeadersTransform(response.headers)
    });
  }
  if (tries < __classPrivateFieldGet$f(this, _HttpAgent_retryTimes, "f")) {
    return await __classPrivateFieldGet$f(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry2).call(this, { request: request2, backoff: backoff2, tries: tries + 1 });
  }
  throw new AgentHTTPResponseError(errorMessage, {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    headers: httpHeadersTransform(response.headers)
  });
}, _HttpAgent_rootKeyGuard = async function _HttpAgent_rootKeyGuard2() {
  if (this.rootKey) {
    return;
  } else if (this.rootKey === null && __classPrivateFieldGet$f(this, _HttpAgent_shouldFetchRootKey, "f")) {
    await this.fetchRootKey();
  } else {
    throw new AgentError(`Invalid root key detected. The root key for this agent is ${this.rootKey} and the shouldFetchRootKey value is set to ${__classPrivateFieldGet$f(this, _HttpAgent_shouldFetchRootKey, "f")}. The root key should only be unknown if you are in local development. Otherwise you should avoid fetching and use the default IC Root Key or the known root key of your environment.`);
  }
};
var ProxyMessageKind;
(function(ProxyMessageKind2) {
  ProxyMessageKind2["Error"] = "err";
  ProxyMessageKind2["GetPrincipal"] = "gp";
  ProxyMessageKind2["GetPrincipalResponse"] = "gpr";
  ProxyMessageKind2["Query"] = "q";
  ProxyMessageKind2["QueryResponse"] = "qr";
  ProxyMessageKind2["Call"] = "c";
  ProxyMessageKind2["CallResponse"] = "cr";
  ProxyMessageKind2["ReadState"] = "rs";
  ProxyMessageKind2["ReadStateResponse"] = "rsr";
  ProxyMessageKind2["Status"] = "s";
  ProxyMessageKind2["StatusResponse"] = "sr";
})(ProxyMessageKind || (ProxyMessageKind = {}));
function getDefaultAgent() {
  const agent = typeof window === "undefined" ? typeof globalThis === "undefined" ? typeof globalThis === "undefined" ? void 0 : globalThis.ic.agent : globalThis.ic.agent : window.ic.agent;
  if (!agent) {
    throw new Error("No Agent could be found.");
  }
  return agent;
}
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function maxAttempts(count) {
  let attempts = count;
  return async (canisterId, requestId, status) => {
    if (--attempts <= 0) {
      throw new Error(`Failed to retrieve a reply for request after ${count} attempts:
  Request ID: ${toHex(requestId)}
  Request status: ${status}
`);
    }
  };
}
function throttle(throttleInMsec) {
  return () => new Promise((resolve) => setTimeout(resolve, throttleInMsec));
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw new Error(`Request timed out after ${timeInMsec} msec:
  Request ID: ${toHex(requestId)}
  Request status: ${status}
`);
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const strategy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  backoff,
  chain,
  conditionalDelay,
  defaultStrategy,
  maxAttempts,
  once,
  throttle,
  timeout
}, Symbol.toStringTag, { value: "Module" }));
async function pollForResponse(agent, canisterId, requestId, strategy2 = defaultStrategy(), request2, blsVerify2) {
  var _a2;
  const path = [new TextEncoder().encode("request_status"), requestId];
  const currentRequest = request2 !== null && request2 !== void 0 ? request2 : await ((_a2 = agent.createReadStateRequest) === null || _a2 === void 0 ? void 0 : _a2.call(agent, { paths: [path] }));
  const state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  if (agent.rootKey == null)
    throw new Error("Agent root key not initialized before polling");
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: blsVerify2
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup([...path, new TextEncoder().encode("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing:
      await strategy2(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, strategy2, currentRequest, blsVerify2);
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup([...path, "reject_message"])));
      throw new Error(`Call was rejected:
  Request ID: ${toHex(requestId)}
  Reject code: ${rejectCode}
  Reject text: ${rejectMessage}
`);
    }
    case RequestStatusResponseStatus.Done:
      throw new Error(`Call was marked as done but we never saw the reply:
  Request ID: ${toHex(requestId)}
`);
  }
  throw new Error("unreachable");
}
const polling = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defaultStrategy,
  pollForResponse,
  strategy
}, Symbol.toStringTag, { value: "Module" }));
const managementCanisterIdl = ({ IDL: IDL2 }) => {
  const bitcoin_network = IDL2.Variant({
    mainnet: IDL2.Null,
    testnet: IDL2.Null
  });
  const bitcoin_address = IDL2.Text;
  const bitcoin_get_balance_args = IDL2.Record({
    network: bitcoin_network,
    address: bitcoin_address,
    min_confirmations: IDL2.Opt(IDL2.Nat32)
  });
  const satoshi = IDL2.Nat64;
  const bitcoin_get_balance_result = satoshi;
  const bitcoin_block_height = IDL2.Nat32;
  const bitcoin_get_block_headers_args = IDL2.Record({
    start_height: bitcoin_block_height,
    end_height: IDL2.Opt(bitcoin_block_height),
    network: bitcoin_network
  });
  const bitcoin_block_header = IDL2.Vec(IDL2.Nat8);
  const bitcoin_get_block_headers_result = IDL2.Record({
    tip_height: bitcoin_block_height,
    block_headers: IDL2.Vec(bitcoin_block_header)
  });
  const bitcoin_get_current_fee_percentiles_args = IDL2.Record({
    network: bitcoin_network
  });
  const millisatoshi_per_byte = IDL2.Nat64;
  const bitcoin_get_current_fee_percentiles_result = IDL2.Vec(millisatoshi_per_byte);
  const bitcoin_get_utxos_args = IDL2.Record({
    network: bitcoin_network,
    filter: IDL2.Opt(IDL2.Variant({
      page: IDL2.Vec(IDL2.Nat8),
      min_confirmations: IDL2.Nat32
    })),
    address: bitcoin_address
  });
  const bitcoin_block_hash = IDL2.Vec(IDL2.Nat8);
  const outpoint = IDL2.Record({
    txid: IDL2.Vec(IDL2.Nat8),
    vout: IDL2.Nat32
  });
  const utxo = IDL2.Record({
    height: IDL2.Nat32,
    value: satoshi,
    outpoint
  });
  const bitcoin_get_utxos_result = IDL2.Record({
    next_page: IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    tip_height: bitcoin_block_height,
    tip_block_hash: bitcoin_block_hash,
    utxos: IDL2.Vec(utxo)
  });
  const bitcoin_send_transaction_args = IDL2.Record({
    transaction: IDL2.Vec(IDL2.Nat8),
    network: bitcoin_network
  });
  const canister_id = IDL2.Principal;
  const canister_info_args = IDL2.Record({
    canister_id,
    num_requested_changes: IDL2.Opt(IDL2.Nat64)
  });
  const change_origin = IDL2.Variant({
    from_user: IDL2.Record({ user_id: IDL2.Principal }),
    from_canister: IDL2.Record({
      canister_version: IDL2.Opt(IDL2.Nat64),
      canister_id: IDL2.Principal
    })
  });
  const snapshot_id = IDL2.Vec(IDL2.Nat8);
  const change_details = IDL2.Variant({
    creation: IDL2.Record({ controllers: IDL2.Vec(IDL2.Principal) }),
    code_deployment: IDL2.Record({
      mode: IDL2.Variant({
        reinstall: IDL2.Null,
        upgrade: IDL2.Null,
        install: IDL2.Null
      }),
      module_hash: IDL2.Vec(IDL2.Nat8)
    }),
    load_snapshot: IDL2.Record({
      canister_version: IDL2.Nat64,
      taken_at_timestamp: IDL2.Nat64,
      snapshot_id
    }),
    controllers_change: IDL2.Record({
      controllers: IDL2.Vec(IDL2.Principal)
    }),
    code_uninstall: IDL2.Null
  });
  const change = IDL2.Record({
    timestamp_nanos: IDL2.Nat64,
    canister_version: IDL2.Nat64,
    origin: change_origin,
    details: change_details
  });
  const canister_info_result = IDL2.Record({
    controllers: IDL2.Vec(IDL2.Principal),
    module_hash: IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    recent_changes: IDL2.Vec(change),
    total_num_changes: IDL2.Nat64
  });
  const canister_status_args = IDL2.Record({ canister_id });
  const log_visibility = IDL2.Variant({
    controllers: IDL2.Null,
    public: IDL2.Null,
    allowed_viewers: IDL2.Vec(IDL2.Principal)
  });
  const definite_canister_settings = IDL2.Record({
    freezing_threshold: IDL2.Nat,
    controllers: IDL2.Vec(IDL2.Principal),
    reserved_cycles_limit: IDL2.Nat,
    log_visibility,
    wasm_memory_limit: IDL2.Nat,
    memory_allocation: IDL2.Nat,
    compute_allocation: IDL2.Nat
  });
  const canister_status_result = IDL2.Record({
    status: IDL2.Variant({
      stopped: IDL2.Null,
      stopping: IDL2.Null,
      running: IDL2.Null
    }),
    memory_size: IDL2.Nat,
    cycles: IDL2.Nat,
    settings: definite_canister_settings,
    query_stats: IDL2.Record({
      response_payload_bytes_total: IDL2.Nat,
      num_instructions_total: IDL2.Nat,
      num_calls_total: IDL2.Nat,
      request_payload_bytes_total: IDL2.Nat
    }),
    idle_cycles_burned_per_day: IDL2.Nat,
    module_hash: IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    reserved_cycles: IDL2.Nat
  });
  const clear_chunk_store_args = IDL2.Record({ canister_id });
  const canister_settings = IDL2.Record({
    freezing_threshold: IDL2.Opt(IDL2.Nat),
    controllers: IDL2.Opt(IDL2.Vec(IDL2.Principal)),
    reserved_cycles_limit: IDL2.Opt(IDL2.Nat),
    log_visibility: IDL2.Opt(log_visibility),
    wasm_memory_limit: IDL2.Opt(IDL2.Nat),
    memory_allocation: IDL2.Opt(IDL2.Nat),
    compute_allocation: IDL2.Opt(IDL2.Nat)
  });
  const create_canister_args = IDL2.Record({
    settings: IDL2.Opt(canister_settings),
    sender_canister_version: IDL2.Opt(IDL2.Nat64)
  });
  const create_canister_result = IDL2.Record({ canister_id });
  const delete_canister_args = IDL2.Record({ canister_id });
  const delete_canister_snapshot_args = IDL2.Record({
    canister_id,
    snapshot_id
  });
  const deposit_cycles_args = IDL2.Record({ canister_id });
  const ecdsa_curve = IDL2.Variant({ secp256k1: IDL2.Null });
  const ecdsa_public_key_args = IDL2.Record({
    key_id: IDL2.Record({ name: IDL2.Text, curve: ecdsa_curve }),
    canister_id: IDL2.Opt(canister_id),
    derivation_path: IDL2.Vec(IDL2.Vec(IDL2.Nat8))
  });
  const ecdsa_public_key_result = IDL2.Record({
    public_key: IDL2.Vec(IDL2.Nat8),
    chain_code: IDL2.Vec(IDL2.Nat8)
  });
  const fetch_canister_logs_args = IDL2.Record({ canister_id });
  const canister_log_record = IDL2.Record({
    idx: IDL2.Nat64,
    timestamp_nanos: IDL2.Nat64,
    content: IDL2.Vec(IDL2.Nat8)
  });
  const fetch_canister_logs_result = IDL2.Record({
    canister_log_records: IDL2.Vec(canister_log_record)
  });
  const http_header = IDL2.Record({ value: IDL2.Text, name: IDL2.Text });
  const http_request_result = IDL2.Record({
    status: IDL2.Nat,
    body: IDL2.Vec(IDL2.Nat8),
    headers: IDL2.Vec(http_header)
  });
  const http_request_args = IDL2.Record({
    url: IDL2.Text,
    method: IDL2.Variant({
      get: IDL2.Null,
      head: IDL2.Null,
      post: IDL2.Null
    }),
    max_response_bytes: IDL2.Opt(IDL2.Nat64),
    body: IDL2.Opt(IDL2.Vec(IDL2.Nat8)),
    transform: IDL2.Opt(IDL2.Record({
      function: IDL2.Func([
        IDL2.Record({
          context: IDL2.Vec(IDL2.Nat8),
          response: http_request_result
        })
      ], [http_request_result], ["query"]),
      context: IDL2.Vec(IDL2.Nat8)
    })),
    headers: IDL2.Vec(http_header)
  });
  const canister_install_mode = IDL2.Variant({
    reinstall: IDL2.Null,
    upgrade: IDL2.Opt(IDL2.Record({
      wasm_memory_persistence: IDL2.Opt(IDL2.Variant({ keep: IDL2.Null, replace: IDL2.Null })),
      skip_pre_upgrade: IDL2.Opt(IDL2.Bool)
    })),
    install: IDL2.Null
  });
  const chunk_hash = IDL2.Record({ hash: IDL2.Vec(IDL2.Nat8) });
  const install_chunked_code_args = IDL2.Record({
    arg: IDL2.Vec(IDL2.Nat8),
    wasm_module_hash: IDL2.Vec(IDL2.Nat8),
    mode: canister_install_mode,
    chunk_hashes_list: IDL2.Vec(chunk_hash),
    target_canister: canister_id,
    store_canister: IDL2.Opt(canister_id),
    sender_canister_version: IDL2.Opt(IDL2.Nat64)
  });
  const wasm_module = IDL2.Vec(IDL2.Nat8);
  const install_code_args = IDL2.Record({
    arg: IDL2.Vec(IDL2.Nat8),
    wasm_module,
    mode: canister_install_mode,
    canister_id,
    sender_canister_version: IDL2.Opt(IDL2.Nat64)
  });
  const list_canister_snapshots_args = IDL2.Record({
    canister_id
  });
  const snapshot = IDL2.Record({
    id: snapshot_id,
    total_size: IDL2.Nat64,
    taken_at_timestamp: IDL2.Nat64
  });
  const list_canister_snapshots_result = IDL2.Vec(snapshot);
  const load_canister_snapshot_args = IDL2.Record({
    canister_id,
    sender_canister_version: IDL2.Opt(IDL2.Nat64),
    snapshot_id
  });
  const node_metrics_history_args = IDL2.Record({
    start_at_timestamp_nanos: IDL2.Nat64,
    subnet_id: IDL2.Principal
  });
  const node_metrics = IDL2.Record({
    num_block_failures_total: IDL2.Nat64,
    node_id: IDL2.Principal,
    num_blocks_proposed_total: IDL2.Nat64
  });
  const node_metrics_history_result = IDL2.Vec(IDL2.Record({
    timestamp_nanos: IDL2.Nat64,
    node_metrics: IDL2.Vec(node_metrics)
  }));
  const provisional_create_canister_with_cycles_args = IDL2.Record({
    settings: IDL2.Opt(canister_settings),
    specified_id: IDL2.Opt(canister_id),
    amount: IDL2.Opt(IDL2.Nat),
    sender_canister_version: IDL2.Opt(IDL2.Nat64)
  });
  const provisional_create_canister_with_cycles_result = IDL2.Record({
    canister_id
  });
  const provisional_top_up_canister_args = IDL2.Record({
    canister_id,
    amount: IDL2.Nat
  });
  const raw_rand_result = IDL2.Vec(IDL2.Nat8);
  const schnorr_algorithm = IDL2.Variant({
    ed25519: IDL2.Null,
    bip340secp256k1: IDL2.Null
  });
  const schnorr_public_key_args = IDL2.Record({
    key_id: IDL2.Record({
      algorithm: schnorr_algorithm,
      name: IDL2.Text
    }),
    canister_id: IDL2.Opt(canister_id),
    derivation_path: IDL2.Vec(IDL2.Vec(IDL2.Nat8))
  });
  const schnorr_public_key_result = IDL2.Record({
    public_key: IDL2.Vec(IDL2.Nat8),
    chain_code: IDL2.Vec(IDL2.Nat8)
  });
  const sign_with_ecdsa_args = IDL2.Record({
    key_id: IDL2.Record({ name: IDL2.Text, curve: ecdsa_curve }),
    derivation_path: IDL2.Vec(IDL2.Vec(IDL2.Nat8)),
    message_hash: IDL2.Vec(IDL2.Nat8)
  });
  const sign_with_ecdsa_result = IDL2.Record({
    signature: IDL2.Vec(IDL2.Nat8)
  });
  const schnorr_aux = IDL2.Variant({
    bip341: IDL2.Record({ merkle_root_hash: IDL2.Vec(IDL2.Nat8) })
  });
  const sign_with_schnorr_args = IDL2.Record({
    aux: IDL2.Opt(schnorr_aux),
    key_id: IDL2.Record({
      algorithm: schnorr_algorithm,
      name: IDL2.Text
    }),
    derivation_path: IDL2.Vec(IDL2.Vec(IDL2.Nat8)),
    message: IDL2.Vec(IDL2.Nat8)
  });
  const sign_with_schnorr_result = IDL2.Record({
    signature: IDL2.Vec(IDL2.Nat8)
  });
  const start_canister_args = IDL2.Record({ canister_id });
  const stop_canister_args = IDL2.Record({ canister_id });
  const stored_chunks_args = IDL2.Record({ canister_id });
  const stored_chunks_result = IDL2.Vec(chunk_hash);
  const subnet_info_args = IDL2.Record({ subnet_id: IDL2.Principal });
  const subnet_info_result = IDL2.Record({ replica_version: IDL2.Text });
  const take_canister_snapshot_args = IDL2.Record({
    replace_snapshot: IDL2.Opt(snapshot_id),
    canister_id
  });
  const take_canister_snapshot_result = snapshot;
  const uninstall_code_args = IDL2.Record({
    canister_id,
    sender_canister_version: IDL2.Opt(IDL2.Nat64)
  });
  const update_settings_args = IDL2.Record({
    canister_id: IDL2.Principal,
    settings: canister_settings,
    sender_canister_version: IDL2.Opt(IDL2.Nat64)
  });
  const upload_chunk_args = IDL2.Record({
    chunk: IDL2.Vec(IDL2.Nat8),
    canister_id: IDL2.Principal
  });
  const upload_chunk_result = chunk_hash;
  return IDL2.Service({
    bitcoin_get_balance: IDL2.Func([bitcoin_get_balance_args], [bitcoin_get_balance_result], []),
    bitcoin_get_block_headers: IDL2.Func([bitcoin_get_block_headers_args], [bitcoin_get_block_headers_result], []),
    bitcoin_get_current_fee_percentiles: IDL2.Func([bitcoin_get_current_fee_percentiles_args], [bitcoin_get_current_fee_percentiles_result], []),
    bitcoin_get_utxos: IDL2.Func([bitcoin_get_utxos_args], [bitcoin_get_utxos_result], []),
    bitcoin_send_transaction: IDL2.Func([bitcoin_send_transaction_args], [], []),
    canister_info: IDL2.Func([canister_info_args], [canister_info_result], []),
    canister_status: IDL2.Func([canister_status_args], [canister_status_result], []),
    clear_chunk_store: IDL2.Func([clear_chunk_store_args], [], []),
    create_canister: IDL2.Func([create_canister_args], [create_canister_result], []),
    delete_canister: IDL2.Func([delete_canister_args], [], []),
    delete_canister_snapshot: IDL2.Func([delete_canister_snapshot_args], [], []),
    deposit_cycles: IDL2.Func([deposit_cycles_args], [], []),
    ecdsa_public_key: IDL2.Func([ecdsa_public_key_args], [ecdsa_public_key_result], []),
    fetch_canister_logs: IDL2.Func([fetch_canister_logs_args], [fetch_canister_logs_result], ["query"]),
    http_request: IDL2.Func([http_request_args], [http_request_result], []),
    install_chunked_code: IDL2.Func([install_chunked_code_args], [], []),
    install_code: IDL2.Func([install_code_args], [], []),
    list_canister_snapshots: IDL2.Func([list_canister_snapshots_args], [list_canister_snapshots_result], []),
    load_canister_snapshot: IDL2.Func([load_canister_snapshot_args], [], []),
    node_metrics_history: IDL2.Func([node_metrics_history_args], [node_metrics_history_result], []),
    provisional_create_canister_with_cycles: IDL2.Func([provisional_create_canister_with_cycles_args], [provisional_create_canister_with_cycles_result], []),
    provisional_top_up_canister: IDL2.Func([provisional_top_up_canister_args], [], []),
    raw_rand: IDL2.Func([], [raw_rand_result], []),
    schnorr_public_key: IDL2.Func([schnorr_public_key_args], [schnorr_public_key_result], []),
    sign_with_ecdsa: IDL2.Func([sign_with_ecdsa_args], [sign_with_ecdsa_result], []),
    sign_with_schnorr: IDL2.Func([sign_with_schnorr_args], [sign_with_schnorr_result], []),
    start_canister: IDL2.Func([start_canister_args], [], []),
    stop_canister: IDL2.Func([stop_canister_args], [], []),
    stored_chunks: IDL2.Func([stored_chunks_args], [stored_chunks_result], []),
    subnet_info: IDL2.Func([subnet_info_args], [subnet_info_result], []),
    take_canister_snapshot: IDL2.Func([take_canister_snapshot_args], [take_canister_snapshot_result], []),
    uninstall_code: IDL2.Func([uninstall_code_args], [], []),
    update_settings: IDL2.Func([update_settings_args], [], []),
    upload_chunk: IDL2.Func([upload_chunk_args], [upload_chunk_result], [])
  });
};
class ActorCallError extends AgentError {
  constructor(canisterId, methodName, type, props) {
    super([
      `Call failed:`,
      `  Canister: ${canisterId.toText()}`,
      `  Method: ${methodName} (${type})`,
      ...Object.getOwnPropertyNames(props).map((n) => `  "${n}": ${JSON.stringify(props[n])}`)
    ].join("\n"));
    this.canisterId = canisterId;
    this.methodName = methodName;
    this.type = type;
    this.props = props;
  }
}
class QueryCallRejectedError extends ActorCallError {
  constructor(canisterId, methodName, result) {
    var _a2;
    super(canisterId, methodName, "query", {
      Status: result.status,
      Code: (_a2 = ReplicaRejectCode[result.reject_code]) !== null && _a2 !== void 0 ? _a2 : `Unknown Code "${result.reject_code}"`,
      Message: result.reject_message
    });
    this.result = result;
  }
}
class UpdateCallRejectedError extends ActorCallError {
  constructor(canisterId, methodName, requestId, response, reject_code, reject_message, error_code) {
    super(canisterId, methodName, "update", Object.assign({ "Request ID": toHex(requestId) }, response.body ? Object.assign(Object.assign({}, error_code ? {
      "Error code": error_code
    } : {}), { "Reject code": String(reject_code), "Reject message": reject_message }) : {
      "HTTP status code": response.status.toString(),
      "HTTP status text": response.statusText
    }));
    this.requestId = requestId;
    this.response = response;
    this.reject_code = reject_code;
    this.reject_message = reject_message;
    this.error_code = error_code;
  }
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal$1.from(actor[metadataSymbol].config.canisterId);
  }
  static async install(fields, config) {
    const mode = fields.mode === void 0 ? { install: null } : fields.mode;
    const arg = fields.arg ? [...new Uint8Array(fields.arg)] : [];
    const wasmModule = [...new Uint8Array(fields.module)];
    const canisterId = typeof config.canisterId === "string" ? Principal$1.fromText(config.canisterId) : config.canisterId;
    await getManagementCanister(config).install_code({
      mode,
      arg,
      wasm_module: wasmModule,
      canister_id: canisterId,
      sender_canister_version: []
    });
  }
  static async createCanister(config, settings) {
    function settingsToCanisterSettings(settings2) {
      return [
        {
          controllers: settings2.controllers ? [settings2.controllers] : [],
          compute_allocation: settings2.compute_allocation ? [settings2.compute_allocation] : [],
          freezing_threshold: settings2.freezing_threshold ? [settings2.freezing_threshold] : [],
          memory_allocation: settings2.memory_allocation ? [settings2.memory_allocation] : [],
          reserved_cycles_limit: [],
          log_visibility: [],
          wasm_memory_limit: []
        }
      ];
    }
    const { canister_id: canisterId } = await getManagementCanister(config || {}).provisional_create_canister_with_cycles({
      amount: [],
      settings: settingsToCanisterSettings(settings || {}),
      specified_id: [],
      sender_canister_version: []
    });
    return canisterId;
  }
  static async createAndInstallCanister(interfaceFactory, fields, config) {
    const canisterId = await this.createCanister(config);
    await this.install(Object.assign({}, fields), Object.assign(Object.assign({}, config), { canisterId }));
    return this.createActor(interfaceFactory, Object.assign(Object.assign({}, config), { canisterId }));
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId)
          throw new AgentError(`Canister ID is required, but received ${typeof config.canisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`);
        const canisterId = typeof config.canisterId === "string" ? Principal$1.fromText(config.canisterId) : config.canisterId;
        super({
          config: Object.assign(Object.assign(Object.assign({}, DEFAULT_ACTOR_CONFIG), config), { canisterId }),
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options === null || options === void 0 ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options === null || options === void 0 ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw new AgentError(`Canister ID is required, but received ${typeof configuration.canisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`);
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode$1(types, bufferExports.Buffer.from(msg));
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingStrategyFactory: defaultStrategy
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify2) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = Object.assign(Object.assign({}, options), (_b2 = (_a2 = actor[metadataSymbol].config).queryTransform) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, methodName, args, Object.assign(Object.assign({}, actor[metadataSymbol].config), options)));
      const agent = options.agent || actor[metadataSymbol].config.agent || getDefaultAgent();
      const cid = Principal$1.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode$1(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = Object.assign(Object.assign({}, result.httpDetails), { requestDetails: result.requestDetails });
      switch (result.status) {
        case "rejected":
          throw new QueryCallRejectedError(cid, methodName, result);
        case "replied":
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = Object.assign(Object.assign({}, options), (_b2 = (_a2 = actor[metadataSymbol].config).callTransform) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, methodName, args, Object.assign(Object.assign({}, actor[metadataSymbol].config), options)));
      const agent = options.agent || actor[metadataSymbol].config.agent || getDefaultAgent();
      const { canisterId, effectiveCanisterId, pollingStrategyFactory } = Object.assign(Object.assign(Object.assign({}, DEFAULT_ACTOR_CONFIG), actor[metadataSymbol].config), options);
      const cid = Principal$1.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal$1.from(effectiveCanisterId) : cid;
      const arg = encode$1(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid
      });
      let reply;
      let certificate;
      if (response.body && response.body.certificate) {
        if (agent.rootKey == null) {
          throw new Error("Agent is missing root key");
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: bufFromBufLike(cert),
          rootKey: agent.rootKey,
          canisterId: Principal$1.from(canisterId),
          blsVerify: blsVerify2
        });
        const path = [new TextEncoder().encode("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            throw new UpdateCallRejectedError(cid, methodName, requestId, response, rejectCode, rejectMessage, error_code);
          }
        }
      } else if (response.body && "reject_message" in response.body) {
        const { reject_code, reject_message, error_code } = response.body;
        throw new UpdateCallRejectedError(cid, methodName, requestId, response, reject_code, reject_message, error_code);
      }
      if (response.status === 202) {
        const pollStrategy = pollingStrategyFactory();
        const response2 = await pollForResponse(agent, ecid, requestId, pollStrategy, blsVerify2);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = Object.assign(Object.assign({}, response), { requestDetails });
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else if (func.retTypes.length === 0) {
        return shouldIncludeHttpDetails ? {
          httpDetails: response,
          result: void 0
        } : void 0;
      } else {
        throw new Error(`Call was returned undefined, but type [${func.retTypes.join(",")}].`);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
function getManagementCanister(config) {
  function transform(methodName, args) {
    if (config.effectiveCanisterId) {
      return { effectiveCanisterId: Principal$1.from(config.effectiveCanisterId) };
    }
    const first = args[0];
    let effectiveCanisterId = Principal$1.fromHex("");
    if (first && typeof first === "object" && first.target_canister && methodName === "install_chunked_code") {
      effectiveCanisterId = Principal$1.from(first.target_canister);
    }
    if (first && typeof first === "object" && first.canister_id) {
      effectiveCanisterId = Principal$1.from(first.canister_id);
    }
    return { effectiveCanisterId };
  }
  return Actor.createActor(managementCanisterIdl, Object.assign(Object.assign(Object.assign({}, config), { canisterId: Principal$1.fromHex("") }), {
    callTransform: transform,
    queryTransform: transform
  }));
}
var __classPrivateFieldSet$e = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$e = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ed25519PublicKey_rawKey, _Ed25519PublicKey_derKey, _Ed25519KeyIdentity_publicKey, _Ed25519KeyIdentity_privateKey;
function isObject(value2) {
  return value2 !== null && typeof value2 === "object";
}
class Ed25519PublicKey2 {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(key) {
    _Ed25519PublicKey_rawKey.set(this, void 0);
    _Ed25519PublicKey_derKey.set(this, void 0);
    if (key.byteLength !== Ed25519PublicKey2.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    __classPrivateFieldSet$e(this, _Ed25519PublicKey_rawKey, bufFromBufLike$1(key), "f");
    __classPrivateFieldSet$e(this, _Ed25519PublicKey_derKey, Ed25519PublicKey2.derEncode(key), "f");
  }
  /**
   * Construct Ed25519PublicKey from an existing PublicKey
   * @param {unknown} maybeKey - existing PublicKey, ArrayBuffer, DerEncodedPublicKey, or hex string
   * @returns {Ed25519PublicKey} Instance of Ed25519PublicKey
   */
  static from(maybeKey) {
    if (typeof maybeKey === "string") {
      const key = fromHex(maybeKey);
      return this.fromRaw(key);
    } else if (isObject(maybeKey)) {
      const key = maybeKey;
      if (isObject(key) && Object.hasOwnProperty.call(key, "__derEncodedPublicKey__")) {
        return this.fromDer(key);
      } else if (ArrayBuffer.isView(key)) {
        const view = key;
        return this.fromRaw(bufFromBufLike$1(view.buffer));
      } else if (key instanceof ArrayBuffer) {
        return this.fromRaw(key);
      } else if ("rawKey" in key) {
        return this.fromRaw(key.rawKey);
      } else if ("derKey" in key) {
        return this.fromDer(key.derKey);
      } else if ("toDer" in key) {
        return this.fromDer(key.toDer());
      }
    }
    throw new Error("Cannot construct Ed25519PublicKey from the provided key.");
  }
  static fromRaw(rawKey) {
    return new Ed25519PublicKey2(rawKey);
  }
  static fromDer(derKey) {
    return new Ed25519PublicKey2(this.derDecode(derKey));
  }
  static derEncode(publicKey) {
    const key = wrapDER(publicKey, ED25519_OID).buffer;
    key.__derEncodedPublicKey__ = void 0;
    return key;
  }
  static derDecode(key) {
    const unwrapped = unwrapDER(key, ED25519_OID);
    if (unwrapped.length !== this.RAW_KEY_LENGTH) {
      throw new Error("An Ed25519 public key must be exactly 32bytes long");
    }
    return bufFromBufLike$1(unwrapped);
  }
  get rawKey() {
    return __classPrivateFieldGet$e(this, _Ed25519PublicKey_rawKey, "f");
  }
  get derKey() {
    return __classPrivateFieldGet$e(this, _Ed25519PublicKey_derKey, "f");
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
}
_Ed25519PublicKey_rawKey = /* @__PURE__ */ new WeakMap(), _Ed25519PublicKey_derKey = /* @__PURE__ */ new WeakMap();
Ed25519PublicKey2.RAW_KEY_LENGTH = 32;
class Ed25519KeyIdentity extends SignIdentity {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(publicKey, privateKey) {
    super();
    _Ed25519KeyIdentity_publicKey.set(this, void 0);
    _Ed25519KeyIdentity_privateKey.set(this, void 0);
    __classPrivateFieldSet$e(this, _Ed25519KeyIdentity_publicKey, Ed25519PublicKey2.from(publicKey), "f");
    __classPrivateFieldSet$e(this, _Ed25519KeyIdentity_privateKey, new Uint8Array(privateKey), "f");
  }
  /**
   * Generate a new Ed25519KeyIdentity.
   * @param seed a 32-byte seed for the private key. If not provided, a random seed will be generated.
   * @returns Ed25519KeyIdentity
   */
  static generate(seed) {
    if (seed && seed.length !== 32) {
      throw new Error("Ed25519 Seed needs to be 32 bytes long.");
    }
    if (!seed)
      seed = ed25519.utils.randomPrivateKey();
    if (bufEquals(seed, new Uint8Array(new Array(32).fill(0)))) {
      console.warn("Seed is all zeros. This is not a secure seed. Please provide a seed with sufficient entropy if this is a production environment.");
    }
    const sk = new Uint8Array(32);
    for (let i = 0; i < 32; i++)
      sk[i] = new Uint8Array(seed)[i];
    const pk = ed25519.getPublicKey(sk);
    return Ed25519KeyIdentity.fromKeyPair(pk, sk);
  }
  static fromParsedJson(obj) {
    const [publicKeyDer, privateKeyRaw] = obj;
    return new Ed25519KeyIdentity(Ed25519PublicKey2.fromDer(fromHex(publicKeyDer)), fromHex(privateKeyRaw));
  }
  static fromJSON(json) {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      if (typeof parsed[0] === "string" && typeof parsed[1] === "string") {
        return this.fromParsedJson([parsed[0], parsed[1]]);
      } else {
        throw new Error("Deserialization error: JSON must have at least 2 items.");
      }
    }
    throw new Error(`Deserialization error: Invalid JSON type for string: ${JSON.stringify(json)}`);
  }
  static fromKeyPair(publicKey, privateKey) {
    return new Ed25519KeyIdentity(Ed25519PublicKey2.fromRaw(publicKey), privateKey);
  }
  static fromSecretKey(secretKey) {
    const publicKey = ed25519.getPublicKey(new Uint8Array(secretKey));
    return Ed25519KeyIdentity.fromKeyPair(publicKey, secretKey);
  }
  /**
   * Serialize this key to JSON.
   */
  toJSON() {
    return [toHex(__classPrivateFieldGet$e(this, _Ed25519KeyIdentity_publicKey, "f").toDer()), toHex(__classPrivateFieldGet$e(this, _Ed25519KeyIdentity_privateKey, "f"))];
  }
  /**
   * Return a copy of the key pair.
   */
  getKeyPair() {
    return {
      secretKey: __classPrivateFieldGet$e(this, _Ed25519KeyIdentity_privateKey, "f"),
      publicKey: __classPrivateFieldGet$e(this, _Ed25519KeyIdentity_publicKey, "f")
    };
  }
  /**
   * Return the public key.
   */
  getPublicKey() {
    return __classPrivateFieldGet$e(this, _Ed25519KeyIdentity_publicKey, "f");
  }
  /**
   * Signs a blob of data, with this identity's private key.
   * @param challenge - challenge to sign with this identity's secretKey, producing a signature
   */
  async sign(challenge) {
    const blob = new Uint8Array(challenge);
    const signature = uint8ToBuf$1(ed25519.sign(blob, __classPrivateFieldGet$e(this, _Ed25519KeyIdentity_privateKey, "f").slice(0, 32)));
    Object.defineProperty(signature, "__signature__", {
      enumerable: false,
      value: void 0
    });
    return signature;
  }
  /**
   * Verify
   * @param sig - signature to verify
   * @param msg - message to verify
   * @param pk - public key
   * @returns - true if the signature is valid, false otherwise
   */
  static verify(sig, msg, pk) {
    const [signature, message, publicKey] = [sig, msg, pk].map((x2) => {
      if (typeof x2 === "string") {
        x2 = fromHex(x2);
      }
      if (x2 instanceof Uint8Array) {
        x2 = bufFromBufLike$1(x2.buffer);
      }
      return new Uint8Array(x2);
    });
    return ed25519.verify(signature, message, publicKey);
  }
}
_Ed25519KeyIdentity_publicKey = /* @__PURE__ */ new WeakMap(), _Ed25519KeyIdentity_privateKey = /* @__PURE__ */ new WeakMap();
class CryptoError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, CryptoError.prototype);
  }
}
function _getEffectiveCrypto(subtleCrypto) {
  if (typeof globalThis !== "undefined" && globalThis["crypto"] && globalThis["crypto"]["subtle"]) {
    return globalThis["crypto"]["subtle"];
  }
  if (subtleCrypto) {
    return subtleCrypto;
  } else if (typeof crypto !== "undefined" && crypto["subtle"]) {
    return crypto.subtle;
  } else {
    throw new CryptoError("Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto");
  }
}
class ECDSAKeyIdentity extends SignIdentity {
  // `fromKeyPair` and `generate` should be used for instantiation, not this constructor.
  constructor(keyPair, derKey, subtleCrypto) {
    super();
    this._keyPair = keyPair;
    this._derKey = derKey;
    this._subtleCrypto = subtleCrypto;
  }
  /**
   * Generates a randomly generated identity for use in calls to the Internet Computer.
   * @param {CryptoKeyOptions} options optional settings
   * @param {CryptoKeyOptions['extractable']} options.extractable - whether the key should allow itself to be used. Set to false for maximum security.
   * @param {CryptoKeyOptions['keyUsages']} options.keyUsages - a list of key usages that the key can be used for
   * @param {CryptoKeyOptions['subtleCrypto']} options.subtleCrypto interface
   * @constructs ECDSAKeyIdentity
   * @returns a {@link ECDSAKeyIdentity}
   */
  static async generate(options) {
    const { extractable = false, keyUsages = ["sign", "verify"], subtleCrypto } = options !== null && options !== void 0 ? options : {};
    const effectiveCrypto = _getEffectiveCrypto(subtleCrypto);
    const keyPair = await effectiveCrypto.generateKey({
      name: "ECDSA",
      namedCurve: "P-256"
    }, extractable, keyUsages);
    const derKey = await effectiveCrypto.exportKey("spki", keyPair.publicKey);
    return new this(keyPair, derKey, effectiveCrypto);
  }
  /**
   * generates an identity from a public and private key. Please ensure that you are generating these keys securely and protect the user's private key
   * @param keyPair a CryptoKeyPair
   * @param subtleCrypto - a SubtleCrypto interface in case one is not available globally
   * @returns an {@link ECDSAKeyIdentity}
   */
  static async fromKeyPair(keyPair, subtleCrypto) {
    const effectiveCrypto = _getEffectiveCrypto(subtleCrypto);
    const derKey = await effectiveCrypto.exportKey("spki", keyPair.publicKey);
    return new ECDSAKeyIdentity(keyPair, derKey, effectiveCrypto);
  }
  /**
   * Return the internally-used key pair.
   * @returns a CryptoKeyPair
   */
  getKeyPair() {
    return this._keyPair;
  }
  /**
   * Return the public key.
   * @returns an {@link PublicKey & DerCryptoKey}
   */
  getPublicKey() {
    const derKey = this._derKey;
    const key = Object.create(this._keyPair.publicKey);
    key.toDer = function() {
      return derKey;
    };
    return key;
  }
  /**
   * Signs a blob of data, with this identity's private key.
   * @param {ArrayBuffer} challenge - challenge to sign with this identity's secretKey, producing a signature
   * @returns {Promise<Signature>} signature
   */
  async sign(challenge) {
    const params = {
      name: "ECDSA",
      hash: { name: "SHA-256" }
    };
    const signature = await this._subtleCrypto.sign(params, this._keyPair.privateKey, challenge);
    return signature;
  }
}
var __classPrivateFieldSet$d = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$d = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PartialIdentity_inner;
class PartialIdentity {
  constructor(inner) {
    _PartialIdentity_inner.set(this, void 0);
    __classPrivateFieldSet$d(this, _PartialIdentity_inner, inner, "f");
  }
  /**
   * The raw public key of this identity.
   */
  get rawKey() {
    return __classPrivateFieldGet$d(this, _PartialIdentity_inner, "f").rawKey;
  }
  /**
   * The DER-encoded public key of this identity.
   */
  get derKey() {
    return __classPrivateFieldGet$d(this, _PartialIdentity_inner, "f").derKey;
  }
  /**
   * The DER-encoded public key of this identity.
   */
  toDer() {
    return __classPrivateFieldGet$d(this, _PartialIdentity_inner, "f").toDer();
  }
  /**
   * The inner {@link PublicKey} used by this identity.
   */
  getPublicKey() {
    return __classPrivateFieldGet$d(this, _PartialIdentity_inner, "f");
  }
  /**
   * The {@link Principal} of this identity.
   */
  getPrincipal() {
    if (!__classPrivateFieldGet$d(this, _PartialIdentity_inner, "f").rawKey) {
      throw new Error("Cannot get principal from a public key without a raw key.");
    }
    return Principal$1.fromUint8Array(new Uint8Array(__classPrivateFieldGet$d(this, _PartialIdentity_inner, "f").rawKey));
  }
  /**
   * Required for the Identity interface, but cannot implemented for just a public key.
   */
  transformRequest() {
    return Promise.reject("Not implemented. You are attempting to use a partial identity to sign calls, but this identity only has access to the public key.To sign calls, use a DelegationIdentity instead.");
  }
}
_PartialIdentity_inner = /* @__PURE__ */ new WeakMap();
var __classPrivateFieldSet$c = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$c = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest = function(s, e3) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e3.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e3.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var _PartialDelegationIdentity_delegation;
const domainSeparator = new TextEncoder().encode("ic-request-auth-delegation");
const requestDomainSeparator = new TextEncoder().encode("\nic-request");
function _parseBlob(value2) {
  if (typeof value2 !== "string" || value2.length < 64) {
    throw new Error("Invalid public key.");
  }
  return fromHex(value2);
}
class Delegation {
  constructor(pubkey, expiration, targets) {
    this.pubkey = pubkey;
    this.expiration = expiration;
    this.targets = targets;
  }
  toCBOR() {
    return srcExports.value.map(Object.assign({ pubkey: srcExports.value.bytes(this.pubkey), expiration: srcExports.value.u64(this.expiration.toString(16), 16) }, this.targets && {
      targets: srcExports.value.array(this.targets.map((t) => srcExports.value.bytes(bufFromBufLike(t.toUint8Array()))))
    }));
  }
  toJSON() {
    return Object.assign({ expiration: this.expiration.toString(16), pubkey: toHex(this.pubkey) }, this.targets && { targets: this.targets.map((p) => p.toHex()) });
  }
}
async function _createSingleDelegation(from, to, expiration, targets) {
  const delegation = new Delegation(
    to.toDer(),
    BigInt(+expiration) * BigInt(1e6),
    // In nanoseconds.
    targets
  );
  const challenge = new Uint8Array([
    ...domainSeparator,
    ...new Uint8Array(requestIdOf(Object.assign({}, delegation)))
  ]);
  const signature = await from.sign(bufFromBufLike(challenge));
  return {
    delegation,
    signature
  };
}
class DelegationChain {
  constructor(delegations, publicKey) {
    this.delegations = delegations;
    this.publicKey = publicKey;
  }
  /**
   * Create a delegation chain between two (or more) keys. By default, the expiration time
   * will be very short (15 minutes).
   *
   * To build a chain of more than 2 identities, this function needs to be called multiple times,
   * passing the previous delegation chain into the options argument. For example:
   * @example
   * const rootKey = createKey();
   * const middleKey = createKey();
   * const bottomeKey = createKey();
   *
   * const rootToMiddle = await DelegationChain.create(
   *   root, middle.getPublicKey(), Date.parse('2100-01-01'),
   * );
   * const middleToBottom = await DelegationChain.create(
   *   middle, bottom.getPublicKey(), Date.parse('2100-01-01'), { previous: rootToMiddle },
   * );
   *
   * // We can now use a delegation identity that uses the delegation above:
   * const identity = DelegationIdentity.fromDelegation(bottomKey, middleToBottom);
   * @param from The identity that will delegate.
   * @param to The identity that gets delegated. It can now sign messages as if it was the
   *           identity above.
   * @param expiration The length the delegation is valid. By default, 15 minutes from calling
   *                   this function.
   * @param options A set of options for this delegation. expiration and previous
   * @param options.previous - Another DelegationChain that this chain should start with.
   * @param options.targets - targets that scope the delegation (e.g. Canister Principals)
   */
  static async create(from, to, expiration = new Date(Date.now() + 15 * 60 * 1e3), options = {}) {
    var _a2, _b2;
    const delegation = await _createSingleDelegation(from, to, expiration, options.targets);
    return new DelegationChain([...((_a2 = options.previous) === null || _a2 === void 0 ? void 0 : _a2.delegations) || [], delegation], ((_b2 = options.previous) === null || _b2 === void 0 ? void 0 : _b2.publicKey) || from.getPublicKey().toDer());
  }
  /**
   * Creates a DelegationChain object from a JSON string.
   * @param json The JSON string to parse.
   */
  static fromJSON(json) {
    const { publicKey, delegations } = typeof json === "string" ? JSON.parse(json) : json;
    if (!Array.isArray(delegations)) {
      throw new Error("Invalid delegations.");
    }
    const parsedDelegations = delegations.map((signedDelegation) => {
      const { delegation, signature } = signedDelegation;
      const { pubkey, expiration, targets } = delegation;
      if (targets !== void 0 && !Array.isArray(targets)) {
        throw new Error("Invalid targets.");
      }
      return {
        delegation: new Delegation(
          _parseBlob(pubkey),
          BigInt("0x" + expiration),
          // expiration in JSON is an hexa string (See toJSON() below).
          targets && targets.map((t) => {
            if (typeof t !== "string") {
              throw new Error("Invalid target.");
            }
            return Principal$1.fromHex(t);
          })
        ),
        signature: _parseBlob(signature)
      };
    });
    return new this(parsedDelegations, _parseBlob(publicKey));
  }
  /**
   * Creates a DelegationChain object from a list of delegations and a DER-encoded public key.
   * @param delegations The list of delegations.
   * @param publicKey The DER-encoded public key of the key-pair signing the first delegation.
   */
  static fromDelegations(delegations, publicKey) {
    return new this(delegations, publicKey);
  }
  toJSON() {
    return {
      delegations: this.delegations.map((signedDelegation) => {
        const { delegation, signature } = signedDelegation;
        const { targets } = delegation;
        return {
          delegation: Object.assign({ expiration: delegation.expiration.toString(16), pubkey: toHex(delegation.pubkey) }, targets && {
            targets: targets.map((t) => t.toHex())
          }),
          signature: toHex(signature)
        };
      }),
      publicKey: toHex(this.publicKey)
    };
  }
}
class DelegationIdentity extends SignIdentity {
  constructor(_inner, _delegation) {
    super();
    this._inner = _inner;
    this._delegation = _delegation;
  }
  /**
   * Create a delegation without having access to delegateKey.
   * @param key The key used to sign the requests.
   * @param delegation A delegation object created using `createDelegation`.
   */
  static fromDelegation(key, delegation) {
    return new this(key, delegation);
  }
  getDelegation() {
    return this._delegation;
  }
  getPublicKey() {
    return {
      derKey: this._delegation.publicKey,
      toDer: () => this._delegation.publicKey
    };
  }
  sign(blob) {
    return this._inner.sign(blob);
  }
  async transformRequest(request2) {
    const { body } = request2, fields = __rest(request2, ["body"]);
    const requestId = await requestIdOf(body);
    return Object.assign(Object.assign({}, fields), { body: {
      content: body,
      sender_sig: await this.sign(bufFromBufLike(new Uint8Array([...requestDomainSeparator, ...new Uint8Array(requestId)]))),
      sender_delegation: this._delegation.delegations,
      sender_pubkey: this._delegation.publicKey
    } });
  }
}
class PartialDelegationIdentity extends PartialIdentity {
  constructor(inner, delegation) {
    super(inner);
    _PartialDelegationIdentity_delegation.set(this, void 0);
    __classPrivateFieldSet$c(this, _PartialDelegationIdentity_delegation, delegation, "f");
  }
  /**
   * The Delegation Chain of this identity.
   */
  get delegation() {
    return __classPrivateFieldGet$c(this, _PartialDelegationIdentity_delegation, "f");
  }
  /**
   * Create a {@link PartialDelegationIdentity} from a {@link PublicKey} and a {@link DelegationChain}.
   * @param key The {@link PublicKey} to delegate to.
   * @param delegation a {@link DelegationChain} targeting the inner key.
   * @constructs PartialDelegationIdentity
   */
  static fromDelegation(key, delegation) {
    return new PartialDelegationIdentity(key, delegation);
  }
}
_PartialDelegationIdentity_delegation = /* @__PURE__ */ new WeakMap();
function isDelegationValid(chain2, checks) {
  for (const { delegation } of chain2.delegations) {
    if (+new Date(Number(delegation.expiration / BigInt(1e6))) <= +Date.now()) {
      return false;
    }
  }
  const scopes2 = [];
  for (const s of scopes2) {
    const scope = s.toText();
    for (const { delegation } of chain2.delegations) {
      if (delegation.targets === void 0) {
        continue;
      }
      let none = true;
      for (const target of delegation.targets) {
        if (target.toText() === scope) {
          none = false;
          break;
        }
      }
      if (none) {
        return false;
      }
    }
  }
  return true;
}
var PubKeyCoseAlgo;
(function(PubKeyCoseAlgo2) {
  PubKeyCoseAlgo2[PubKeyCoseAlgo2["ECDSA_WITH_SHA256"] = -7] = "ECDSA_WITH_SHA256";
})(PubKeyCoseAlgo || (PubKeyCoseAlgo = {}));
const events = ["mousedown", "mousemove", "keydown", "touchstart", "wheel"];
class IdleManager {
  /**
   * @protected
   * @param options {@link IdleManagerOptions}
   */
  constructor(options = {}) {
    var _a2;
    this.callbacks = [];
    this.idleTimeout = 10 * 60 * 1e3;
    this.timeoutID = void 0;
    const { onIdle, idleTimeout = 10 * 60 * 1e3 } = options || {};
    this.callbacks = onIdle ? [onIdle] : [];
    this.idleTimeout = idleTimeout;
    const _resetTimer = this._resetTimer.bind(this);
    window.addEventListener("load", _resetTimer, true);
    events.forEach(function(name) {
      document.addEventListener(name, _resetTimer, true);
    });
    const debounce = (func, wait) => {
      let timeout2;
      return (...args) => {
        const context = this;
        const later = function() {
          timeout2 = void 0;
          func.apply(context, args);
        };
        clearTimeout(timeout2);
        timeout2 = window.setTimeout(later, wait);
      };
    };
    if (options === null || options === void 0 ? void 0 : options.captureScroll) {
      const scroll = debounce(_resetTimer, (_a2 = options === null || options === void 0 ? void 0 : options.scrollDebounce) !== null && _a2 !== void 0 ? _a2 : 100);
      window.addEventListener("scroll", scroll, true);
    }
    _resetTimer();
  }
  /**
   * Creates an {@link IdleManager}
   * @param {IdleManagerOptions} options Optional configuration
   * @see {@link IdleManagerOptions}
   * @param options.onIdle Callback once user has been idle. Use to prompt for fresh login, and use `Actor.agentOf(your_actor).invalidateIdentity()` to protect the user
   * @param options.idleTimeout timeout in ms
   * @param options.captureScroll capture scroll events
   * @param options.scrollDebounce scroll debounce time in ms
   */
  static create(options = {}) {
    return new this(options);
  }
  /**
   * @param {IdleCB} callback function to be called when user goes idle
   */
  registerCallback(callback) {
    this.callbacks.push(callback);
  }
  /**
   * Cleans up the idle manager and its listeners
   */
  exit() {
    clearTimeout(this.timeoutID);
    window.removeEventListener("load", this._resetTimer, true);
    const _resetTimer = this._resetTimer.bind(this);
    events.forEach(function(name) {
      document.removeEventListener(name, _resetTimer, true);
    });
    this.callbacks.forEach((cb) => cb());
  }
  /**
   * Resets the timeouts during cleanup
   */
  _resetTimer() {
    const exit = this.exit.bind(this);
    window.clearTimeout(this.timeoutID);
    this.timeoutID = window.setTimeout(exit, this.idleTimeout);
  }
}
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const cursorRequestMap = /* @__PURE__ */ new WeakMap();
const transactionDoneMap = /* @__PURE__ */ new WeakMap();
const transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
const transformCache = /* @__PURE__ */ new WeakMap();
const reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest$1(request2) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request2.removeEventListener("success", success);
      request2.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request2.result));
      unlisten();
    };
    const error = () => {
      reject(request2.error);
      unlisten();
    };
    request2.addEventListener("success", success);
    request2.addEventListener("error", error);
  });
  promise.then((value2) => {
    if (value2 instanceof IDBCursor) {
      cursorRequestMap.set(value2, request2);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request2);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames") {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value2) {
    target[prop] = value2;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value2) {
  if (typeof value2 === "function")
    return wrapFunction(value2);
  if (value2 instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value2);
  if (instanceOfAny(value2, getIdbProxyableTypes()))
    return new Proxy(value2, idbProxyTraps);
  return value2;
}
function wrap(value2) {
  if (value2 instanceof IDBRequest)
    return promisifyRequest$1(value2);
  if (transformCache.has(value2))
    return transformCache.get(value2);
  const newValue = transformCachableValue(value2);
  if (newValue !== value2) {
    transformCache.set(value2, newValue);
    reverseTransformCache.set(newValue, value2);
  }
  return newValue;
}
const unwrap = (value2) => reverseTransformCache.get(value2);
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request2 = indexedDB.open(name, version);
  const openPromise = wrap(request2);
  if (upgrade) {
    request2.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request2.result), event.oldVersion, event.newVersion, wrap(request2.transaction), event);
    });
  }
  if (blocked) {
    request2.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
const readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
const writeMethods = ["put", "add", "delete", "clear"];
const cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
const AUTH_DB_NAME = "auth-client-db";
const OBJECT_STORE_NAME = "ic-keyval";
const _openDbStore = async (dbName = AUTH_DB_NAME, storeName = OBJECT_STORE_NAME, version) => {
  if (isBrowser$1 && (localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem(KEY_STORAGE_DELEGATION))) {
    localStorage.removeItem(KEY_STORAGE_DELEGATION);
    localStorage.removeItem(KEY_STORAGE_KEY);
  }
  return await openDB(dbName, version, {
    upgrade: (database) => {
      if (database.objectStoreNames.contains(storeName)) {
        database.clear(storeName);
      }
      database.createObjectStore(storeName);
    }
  });
};
async function _getValue(db, storeName, key) {
  return await db.get(storeName, key);
}
async function _setValue(db, storeName, key, value2) {
  return await db.put(storeName, value2, key);
}
async function _removeValue(db, storeName, key) {
  return await db.delete(storeName, key);
}
class IdbKeyVal {
  // Do not use - instead prefer create
  constructor(_db, _storeName) {
    this._db = _db;
    this._storeName = _storeName;
  }
  /**
   * @param {DBCreateOptions} options - DBCreateOptions
   * @param {DBCreateOptions['dbName']} options.dbName name for the indexeddb database
   * @default
   * @param {DBCreateOptions['storeName']} options.storeName name for the indexeddb Data Store
   * @default
   * @param {DBCreateOptions['version']} options.version version of the database. Increment to safely upgrade
   * @constructs an {@link IdbKeyVal}
   */
  static async create(options) {
    const { dbName = AUTH_DB_NAME, storeName = OBJECT_STORE_NAME, version = DB_VERSION } = options !== null && options !== void 0 ? options : {};
    const db = await _openDbStore(dbName, storeName, version);
    return new IdbKeyVal(db, storeName);
  }
  /**
   * Basic setter
   * @param {IDBValidKey} key string | number | Date | BufferSource | IDBValidKey[]
   * @param value value to set
   * @returns void
   */
  async set(key, value2) {
    return await _setValue(this._db, this._storeName, key, value2);
  }
  /**
   * Basic getter
   * Pass in a type T for type safety if you know the type the value will have if it is found
   * @param {IDBValidKey} key string | number | Date | BufferSource | IDBValidKey[]
   * @returns `Promise<T | null>`
   * @example
   * await get<string>('exampleKey') -> 'exampleValue'
   */
  async get(key) {
    var _a2;
    return (_a2 = await _getValue(this._db, this._storeName, key)) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /**
   * Remove a key
   * @param key {@link IDBValidKey}
   * @returns void
   */
  async remove(key) {
    return await _removeValue(this._db, this._storeName, key);
  }
}
var __classPrivateFieldSet$b = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$b = function(receiver, state, kind, f) {
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : state.get(receiver);
};
var _IdbStorage_options;
const KEY_STORAGE_KEY = "identity";
const KEY_STORAGE_DELEGATION = "delegation";
const KEY_VECTOR = "iv";
const DB_VERSION = 1;
const isBrowser$1 = typeof window !== "undefined";
class LocalStorage {
  constructor(prefix = "ic-", _localStorage) {
    this.prefix = prefix;
    this._localStorage = _localStorage;
  }
  get(key) {
    return Promise.resolve(this._getLocalStorage().getItem(this.prefix + key));
  }
  set(key, value2) {
    this._getLocalStorage().setItem(this.prefix + key, value2);
    return Promise.resolve();
  }
  remove(key) {
    this._getLocalStorage().removeItem(this.prefix + key);
    return Promise.resolve();
  }
  _getLocalStorage() {
    if (this._localStorage) {
      return this._localStorage;
    }
    const ls = typeof window === "undefined" ? typeof globalThis === "undefined" ? typeof globalThis === "undefined" ? void 0 : globalThis.localStorage : globalThis.localStorage : window.localStorage;
    if (!ls) {
      throw new Error("Could not find local storage.");
    }
    return ls;
  }
}
let IdbStorage$1 = class IdbStorage {
  /**
   * @param options - DBCreateOptions
   * @param options.dbName - name for the indexeddb database
   * @param options.storeName - name for the indexeddb Data Store
   * @param options.version - version of the database. Increment to safely upgrade
   * @constructs an {@link IdbStorage}
   * @example
   * ```typescript
   * const storage = new IdbStorage({ dbName: 'my-db', storeName: 'my-store', version: 2 });
   * ```
   */
  constructor(options) {
    _IdbStorage_options.set(this, void 0);
    __classPrivateFieldSet$b(this, _IdbStorage_options, options !== null && options !== void 0 ? options : {});
  }
  get _db() {
    return new Promise((resolve) => {
      if (this.initializedDb) {
        resolve(this.initializedDb);
        return;
      }
      IdbKeyVal.create(__classPrivateFieldGet$b(this, _IdbStorage_options, "f")).then((db) => {
        this.initializedDb = db;
        resolve(db);
      });
    });
  }
  async get(key) {
    const db = await this._db;
    return await db.get(key);
  }
  async set(key, value2) {
    const db = await this._db;
    await db.set(key, value2);
  }
  async remove(key) {
    const db = await this._db;
    await db.remove(key);
  }
};
_IdbStorage_options = /* @__PURE__ */ new WeakMap();
const IDENTITY_PROVIDER_DEFAULT = "https://identity.internetcomputer.org";
const IDENTITY_PROVIDER_ENDPOINT = "#authorize";
const ECDSA_KEY_LABEL$1 = "ECDSA";
const ED25519_KEY_LABEL = "Ed25519";
const INTERRUPT_CHECK_INTERVAL = 500;
const ERROR_USER_INTERRUPT = "UserInterrupt";
class AuthClient {
  constructor(_identity, _key, _chain, _storage, idleManager, _createOptions, _idpWindow, _eventHandler) {
    this._identity = _identity;
    this._key = _key;
    this._chain = _chain;
    this._storage = _storage;
    this.idleManager = idleManager;
    this._createOptions = _createOptions;
    this._idpWindow = _idpWindow;
    this._eventHandler = _eventHandler;
    this._registerDefaultIdleCallback();
  }
  /**
   * Create an AuthClient to manage authentication and identity
   * @constructs
   * @param {AuthClientCreateOptions} options - Options for creating an {@link AuthClient}
   * @see {@link AuthClientCreateOptions}
   * @param options.identity Optional Identity to use as the base
   * @see {@link SignIdentity}
   * @param options.storage Storage mechanism for delegration credentials
   * @see {@link AuthClientStorage}
   * @param options.keyType Type of key to use for the base key
   * @param {IdleOptions} options.idleOptions Configures an {@link IdleManager}
   * @see {@link IdleOptions}
   * Default behavior is to clear stored identity and reload the page when a user goes idle, unless you set the disableDefaultIdleCallback flag or pass in a custom idle callback.
   * @example
   * const authClient = await AuthClient.create({
   *   idleOptions: {
   *     disableIdle: true
   *   }
   * })
   */
  static async create(options = {}) {
    var _a2, _b2, _c;
    const storage2 = (_a2 = options.storage) !== null && _a2 !== void 0 ? _a2 : new IdbStorage$1();
    const keyType = (_b2 = options.keyType) !== null && _b2 !== void 0 ? _b2 : ECDSA_KEY_LABEL$1;
    let key = null;
    if (options.identity) {
      key = options.identity;
    } else {
      let maybeIdentityStorage = await storage2.get(KEY_STORAGE_KEY);
      if (!maybeIdentityStorage && isBrowser$1) {
        try {
          const fallbackLocalStorage = new LocalStorage();
          const localChain = await fallbackLocalStorage.get(KEY_STORAGE_DELEGATION);
          const localKey = await fallbackLocalStorage.get(KEY_STORAGE_KEY);
          if (localChain && localKey && keyType === ECDSA_KEY_LABEL$1) {
            console.log("Discovered an identity stored in localstorage. Migrating to IndexedDB");
            await storage2.set(KEY_STORAGE_DELEGATION, localChain);
            await storage2.set(KEY_STORAGE_KEY, localKey);
            maybeIdentityStorage = localChain;
            await fallbackLocalStorage.remove(KEY_STORAGE_DELEGATION);
            await fallbackLocalStorage.remove(KEY_STORAGE_KEY);
          }
        } catch (error) {
          console.error("error while attempting to recover localstorage: " + error);
        }
      }
      if (maybeIdentityStorage) {
        try {
          if (typeof maybeIdentityStorage === "object") {
            if (keyType === ED25519_KEY_LABEL && typeof maybeIdentityStorage === "string") {
              key = await Ed25519KeyIdentity.fromJSON(maybeIdentityStorage);
            } else {
              key = await ECDSAKeyIdentity.fromKeyPair(maybeIdentityStorage);
            }
          } else if (typeof maybeIdentityStorage === "string") {
            key = Ed25519KeyIdentity.fromJSON(maybeIdentityStorage);
          }
        } catch (_d) {
        }
      }
    }
    let identity = new AnonymousIdentity();
    let chain2 = null;
    if (key) {
      try {
        const chainStorage = await storage2.get(KEY_STORAGE_DELEGATION);
        if (typeof chainStorage === "object" && chainStorage !== null) {
          throw new Error("Delegation chain is incorrectly stored. A delegation chain should be stored as a string.");
        }
        if (options.identity) {
          identity = options.identity;
        } else if (chainStorage) {
          chain2 = DelegationChain.fromJSON(chainStorage);
          if (!isDelegationValid(chain2)) {
            await _deleteStorage(storage2);
            key = null;
          } else {
            if ("toDer" in key) {
              identity = PartialDelegationIdentity.fromDelegation(key, chain2);
            } else {
              identity = DelegationIdentity.fromDelegation(key, chain2);
            }
          }
        }
      } catch (e3) {
        console.error(e3);
        await _deleteStorage(storage2);
        key = null;
      }
    }
    let idleManager = void 0;
    if ((_c = options.idleOptions) === null || _c === void 0 ? void 0 : _c.disableIdle) {
      idleManager = void 0;
    } else if (chain2 || options.identity) {
      idleManager = IdleManager.create(options.idleOptions);
    }
    if (!key) {
      if (keyType === ED25519_KEY_LABEL) {
        key = await Ed25519KeyIdentity.generate();
        await storage2.set(KEY_STORAGE_KEY, JSON.stringify(key.toJSON()));
      } else {
        if (options.storage && keyType === ECDSA_KEY_LABEL$1) {
          console.warn(`You are using a custom storage provider that may not support CryptoKey storage. If you are using a custom storage provider that does not support CryptoKey storage, you should use '${ED25519_KEY_LABEL}' as the key type, as it can serialize to a string`);
        }
        key = await ECDSAKeyIdentity.generate();
        await storage2.set(KEY_STORAGE_KEY, key.getKeyPair());
      }
    }
    return new this(identity, key, chain2, storage2, idleManager, options);
  }
  _registerDefaultIdleCallback() {
    var _a2, _b2;
    const idleOptions = (_a2 = this._createOptions) === null || _a2 === void 0 ? void 0 : _a2.idleOptions;
    if (!(idleOptions === null || idleOptions === void 0 ? void 0 : idleOptions.onIdle) && !(idleOptions === null || idleOptions === void 0 ? void 0 : idleOptions.disableDefaultIdleCallback)) {
      (_b2 = this.idleManager) === null || _b2 === void 0 ? void 0 : _b2.registerCallback(() => {
        this.logout();
        location.reload();
      });
    }
  }
  async _handleSuccess(message, onSuccess) {
    var _a2, _b2;
    const delegations = message.delegations.map((signedDelegation) => {
      return {
        delegation: new Delegation(signedDelegation.delegation.pubkey, signedDelegation.delegation.expiration, signedDelegation.delegation.targets),
        signature: signedDelegation.signature.buffer
      };
    });
    const delegationChain = DelegationChain.fromDelegations(delegations, message.userPublicKey.buffer);
    const key = this._key;
    if (!key) {
      return;
    }
    this._chain = delegationChain;
    if ("toDer" in key) {
      this._identity = PartialDelegationIdentity.fromDelegation(key, this._chain);
    } else {
      this._identity = DelegationIdentity.fromDelegation(key, this._chain);
    }
    (_a2 = this._idpWindow) === null || _a2 === void 0 ? void 0 : _a2.close();
    const idleOptions = (_b2 = this._createOptions) === null || _b2 === void 0 ? void 0 : _b2.idleOptions;
    if (!this.idleManager && !(idleOptions === null || idleOptions === void 0 ? void 0 : idleOptions.disableIdle)) {
      this.idleManager = IdleManager.create(idleOptions);
      this._registerDefaultIdleCallback();
    }
    this._removeEventListener();
    delete this._idpWindow;
    if (this._chain) {
      await this._storage.set(KEY_STORAGE_DELEGATION, JSON.stringify(this._chain.toJSON()));
    }
    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(message);
  }
  getIdentity() {
    return this._identity;
  }
  async isAuthenticated() {
    return !this.getIdentity().getPrincipal().isAnonymous() && this._chain !== null;
  }
  /**
   * AuthClient Login -
   * Opens up a new window to authenticate with Internet Identity
   * @param {AuthClientLoginOptions} options - Options for logging in
   * @param options.identityProvider Identity provider
   * @param options.maxTimeToLive Expiration of the authentication in nanoseconds
   * @param options.allowPinAuthentication If present, indicates whether or not the Identity Provider should allow the user to authenticate and/or register using a temporary key/PIN identity. Authenticating dapps may want to prevent users from using Temporary keys/PIN identities because Temporary keys/PIN identities are less secure than Passkeys (webauthn credentials) and because Temporary keys/PIN identities generally only live in a browser database (which may get cleared by the browser/OS).
   * @param options.derivationOrigin Origin for Identity Provider to use while generating the delegated identity
   * @param options.windowOpenerFeatures Configures the opened authentication window
   * @param options.onSuccess Callback once login has completed
   * @param options.onError Callback in case authentication fails
   * @example
   * const authClient = await AuthClient.create();
   * authClient.login({
   *  identityProvider: 'http://<canisterID>.127.0.0.1:8000',
   *  maxTimeToLive: BigInt (7) * BigInt(24) * BigInt(3_600_000_000_000), // 1 week
   *  windowOpenerFeatures: "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
   *  onSuccess: () => {
   *    console.log('Login Successful!');
   *  },
   *  onError: (error) => {
   *    console.error('Login Failed: ', error);
   *  }
   * });
   */
  async login(options) {
    var _a2, _b2, _c, _d;
    const defaultTimeToLive = (
      /* hours */
      BigInt(8) * /* nanoseconds */
      BigInt(36e11)
    );
    const identityProviderUrl = new URL(((_a2 = options === null || options === void 0 ? void 0 : options.identityProvider) === null || _a2 === void 0 ? void 0 : _a2.toString()) || IDENTITY_PROVIDER_DEFAULT);
    identityProviderUrl.hash = IDENTITY_PROVIDER_ENDPOINT;
    (_b2 = this._idpWindow) === null || _b2 === void 0 ? void 0 : _b2.close();
    this._removeEventListener();
    this._eventHandler = this._getEventHandler(identityProviderUrl, Object.assign({ maxTimeToLive: (_c = options === null || options === void 0 ? void 0 : options.maxTimeToLive) !== null && _c !== void 0 ? _c : defaultTimeToLive }, options));
    window.addEventListener("message", this._eventHandler);
    this._idpWindow = (_d = window.open(identityProviderUrl.toString(), "idpWindow", options === null || options === void 0 ? void 0 : options.windowOpenerFeatures)) !== null && _d !== void 0 ? _d : void 0;
    const checkInterruption = () => {
      if (this._idpWindow) {
        if (this._idpWindow.closed) {
          this._handleFailure(ERROR_USER_INTERRUPT, options === null || options === void 0 ? void 0 : options.onError);
        } else {
          setTimeout(checkInterruption, INTERRUPT_CHECK_INTERVAL);
        }
      }
    };
    checkInterruption();
  }
  _getEventHandler(identityProviderUrl, options) {
    return async (event) => {
      var _a2, _b2, _c;
      if (event.origin !== identityProviderUrl.origin) {
        return;
      }
      const message = event.data;
      switch (message.kind) {
        case "authorize-ready": {
          const request2 = Object.assign({ kind: "authorize-client", sessionPublicKey: new Uint8Array((_a2 = this._key) === null || _a2 === void 0 ? void 0 : _a2.getPublicKey().toDer()), maxTimeToLive: options === null || options === void 0 ? void 0 : options.maxTimeToLive, allowPinAuthentication: options === null || options === void 0 ? void 0 : options.allowPinAuthentication, derivationOrigin: (_b2 = options === null || options === void 0 ? void 0 : options.derivationOrigin) === null || _b2 === void 0 ? void 0 : _b2.toString() }, options === null || options === void 0 ? void 0 : options.customValues);
          (_c = this._idpWindow) === null || _c === void 0 ? void 0 : _c.postMessage(request2, identityProviderUrl.origin);
          break;
        }
        case "authorize-client-success":
          try {
            await this._handleSuccess(message, options === null || options === void 0 ? void 0 : options.onSuccess);
          } catch (err) {
            this._handleFailure(err.message, options === null || options === void 0 ? void 0 : options.onError);
          }
          break;
        case "authorize-client-failure":
          this._handleFailure(message.text, options === null || options === void 0 ? void 0 : options.onError);
          break;
      }
    };
  }
  _handleFailure(errorMessage, onError) {
    var _a2;
    (_a2 = this._idpWindow) === null || _a2 === void 0 ? void 0 : _a2.close();
    onError === null || onError === void 0 ? void 0 : onError(errorMessage);
    this._removeEventListener();
    delete this._idpWindow;
  }
  _removeEventListener() {
    if (this._eventHandler) {
      window.removeEventListener("message", this._eventHandler);
    }
    this._eventHandler = void 0;
  }
  async logout(options = {}) {
    await _deleteStorage(this._storage);
    this._identity = new AnonymousIdentity();
    this._chain = null;
    if (options.returnTo) {
      try {
        window.history.pushState({}, "", options.returnTo);
      } catch (_a2) {
        window.location.href = options.returnTo;
      }
    }
  }
}
async function _deleteStorage(storage2) {
  await storage2.remove(KEY_STORAGE_KEY);
  await storage2.remove(KEY_STORAGE_DELEGATION);
  await storage2.remove(KEY_VECTOR);
}
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
var I = ((n) => (n[n.FractionalMoreThan8Decimals = 0] = "FractionalMoreThan8Decimals", n[n.InvalidFormat = 1] = "InvalidFormat", n[n.FractionalTooManyDecimals = 2] = "FractionalTooManyDecimals", n))(I || {});
BigInt(1e8);
var _t = (e3) => new Uint8Array(e3), St = (e3) => Array.from(e3).map((t) => t.charCodeAt(0)), k$1 = (e3) => (e3 instanceof Uint8Array || (e3 = Uint8Array.from(e3)), e3.reduce((t, r) => t + r.toString(16).padStart(2, "0"), ""));
var g$1 = "abcdefghijklmnopqrstuvwxyz234567", b$1 = /* @__PURE__ */ Object.create(null);
for (let e3 = 0; e3 < g$1.length; e3++) b$1[g$1[e3]] = e3;
b$1[0] = b$1.o;
b$1[1] = b$1.i;
var $$1 = new Uint32Array([0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117]), J$2 = (e3) => {
  let t = -1;
  for (let r = 0; r < e3.length; r++) {
    let o = (e3[r] ^ t) & 255;
    t = $$1[o] ^ t >>> 8;
  }
  return (t ^ -1) >>> 0;
}, Lt = (e3) => {
  let t = new ArrayBuffer(4);
  return new DataView(t).setUint32(0, J$2(e3), false), new Uint8Array(t);
};
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
      let y = b[f - 15], l = b[f - 2], I2 = h(y, 7) ^ h(y, 18) ^ y >>> 3, m = h(l, 17) ^ h(l, 19) ^ l >>> 10;
      b[f] = m + b[f - 7] + I2 + b[f - 16] | 0;
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
    let r = St(`
account-id`), o = O.create();
    o.update(_t([...r, ...t.toUint8Array(), ...n.toUint8Array()]));
    let c = o.digest(), i = Lt(c), s = new Uint8Array([...i, ...c]);
    return new e(s);
  }
  toHex() {
    return k$1(this.bytes);
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
Principal$1.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
Principal$1.fromText("qhbym-qaaaa-aaaaa-aaafq-cai");
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
  function I2(i, r, t) {
    let e3 = i[r];
    i[r] = i[t], i[t] = e3;
  }
  c.prototype.swap16 = function() {
    let r = this.length;
    if (r % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < r; t += 2) I2(this, t, t + 1);
    return this;
  };
  c.prototype.swap32 = function() {
    let r = this.length;
    if (r % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < r; t += 4) I2(this, t, t + 3), I2(this, t + 1, t + 2);
    return this;
  };
  c.prototype.swap64 = function() {
    let r = this.length;
    if (r % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let t = 0; t < r; t += 8) I2(this, t, t + 7), I2(this, t + 1, t + 6), I2(this, t + 2, t + 5), I2(this, t + 3, t + 4);
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
    const principalObj = typeof principal === "string" ? Principal$1.fromText(principal) : principal;
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
function formatSiwsMessage(message) {
  const issuedAtDate = new Date(Number(message.issued_at / BigInt(1e6)));
  const expirationDate = new Date(Number(message.expiration_time / BigInt(1e6)));
  let formattedMessage = `${message.domain} wants you to sign in with your Solana account:
`;
  formattedMessage += `${message.address}

`;
  formattedMessage += (message.statement || "") + "\n\n";
  formattedMessage += `URI: ${message.uri}
`;
  formattedMessage += `Version: ${message.version}
`;
  formattedMessage += `Chain ID: ${message.chain_id || "solana"}
`;
  formattedMessage += `Nonce: ${message.nonce}
`;
  formattedMessage += `Issued At: ${issuedAtDate.toISOString()}
`;
  formattedMessage += `Expiration Time: ${expirationDate.toISOString()}`;
  if (message.request_id) formattedMessage += `
Request ID: ${message.request_id}`;
  if (message.resources) {
    formattedMessage += `
Resources:`;
    message.resources.forEach((resource) => {
      formattedMessage += `
- ${resource}`;
    });
  }
  return formattedMessage;
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
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
const storage = {
  getItem: (key) => {
    if (!isBrowser || typeof localStorage === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value2) => {
    if (!isBrowser || typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(key, value2);
    } catch {
    }
  },
  removeItem: (key) => {
    if (!isBrowser || typeof localStorage === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch {
    }
  }
};
const windowEvents = {
  addEventListener: (event, handler) => {
    if (isBrowser) {
      window.addEventListener(event, handler);
    }
  },
  removeEventListener: (event, handler) => {
    if (isBrowser) {
      window.removeEventListener(event, handler);
    }
  }
};
const getScreenDimensions = () => {
  if (isBrowser && window.screen) {
    return {
      width: window.screen.width,
      height: window.screen.height
    };
  }
  return {
    width: 1920,
    height: 1080
  };
};
const getStorage = () => {
  if (isBrowser && typeof localStorage !== "undefined") {
    return localStorage;
  }
  return void 0;
};
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
        windowOpenerFeatures: (() => {
          const screen = getScreenDimensions();
          return `width=500,height=600,left=${screen.width / 2 - 250},top=${screen.height / 2 - 300}`;
        })(),
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
const INVALID_REQUEST_ERROR = -32600;
const NOT_SUPPORTED_ERROR = 2e3;
const NETWORK_ERROR = 4e3;
const ENCODE_CHUNK_SIZE = 1e5;
const fromBase64 = (base64) => {
  if (typeof globalThis.Buffer !== "undefined") {
    return globalThis.Buffer.from(base64, "base64").buffer;
  }
  if (typeof globalThis.atob !== "undefined") {
    return Uint8Array.from(globalThis.atob(base64), (m) => m.charCodeAt(0)).buffer;
  }
  throw Error("Could not decode base64 string");
};
const toBase64 = (bytes) => {
  if (typeof globalThis.Buffer !== "undefined") {
    return globalThis.Buffer.from(bytes).toString("base64");
  }
  if (typeof globalThis.btoa !== "undefined") {
    return btoa(Array.from({ length: Math.ceil(bytes.byteLength / ENCODE_CHUNK_SIZE) }).map((_2, index2) => String.fromCharCode(...new Uint8Array(bytes.slice(index2 * ENCODE_CHUNK_SIZE, (index2 + 1) * ENCODE_CHUNK_SIZE)))).join(""));
  }
  throw Error("Could not encode base64 string");
};
var __classPrivateFieldSet$a = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$a = function(receiver, state, kind, f) {
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Signer_options, _Signer_channel, _Signer_establishingChannel, _Signer_scheduledChannelClosure;
class SignerError extends Error {
  constructor(error) {
    super(error.message);
    Object.setPrototypeOf(this, SignerError.prototype);
    this.code = error.code;
    this.data = error.data;
  }
}
const wrapTransportError = (error) => new SignerError({
  code: NETWORK_ERROR,
  message: error instanceof Error ? error.message : "Network error"
});
const unwrapResponse = (response) => {
  if ("error" in response) {
    throw new SignerError(response.error);
  }
  if ("result" in response) {
    return response.result;
  }
  throw new SignerError({
    code: NETWORK_ERROR,
    message: "Invalid response"
  });
};
class Signer {
  constructor(options) {
    _Signer_options.set(this, void 0);
    _Signer_channel.set(this, void 0);
    _Signer_establishingChannel.set(this, void 0);
    _Signer_scheduledChannelClosure.set(this, void 0);
    __classPrivateFieldSet$a(this, _Signer_options, Object.assign({ autoCloseTransportChannel: true, closeTransportChannelAfter: 200, crypto: globalThis.crypto }, options));
  }
  get transport() {
    return __classPrivateFieldGet$a(this, _Signer_options, "f").transport;
  }
  async openChannel() {
    clearTimeout(__classPrivateFieldGet$a(this, _Signer_scheduledChannelClosure, "f"));
    if (__classPrivateFieldGet$a(this, _Signer_establishingChannel, "f")) {
      await __classPrivateFieldGet$a(this, _Signer_establishingChannel, "f");
    }
    if (__classPrivateFieldGet$a(this, _Signer_channel, "f") && !__classPrivateFieldGet$a(this, _Signer_channel, "f").closed) {
      return __classPrivateFieldGet$a(this, _Signer_channel, "f");
    }
    const channel = __classPrivateFieldGet$a(this, _Signer_options, "f").transport.establishChannel();
    __classPrivateFieldSet$a(this, _Signer_establishingChannel, channel.then(() => {
    }).catch(() => {
    }));
    __classPrivateFieldSet$a(this, _Signer_channel, void 0);
    __classPrivateFieldSet$a(this, _Signer_channel, await channel.catch((error) => {
      throw wrapTransportError(error);
    }));
    __classPrivateFieldSet$a(this, _Signer_establishingChannel, void 0);
    return __classPrivateFieldGet$a(this, _Signer_channel, "f");
  }
  async closeChannel() {
    var _a2;
    await ((_a2 = __classPrivateFieldGet$a(this, _Signer_channel, "f")) === null || _a2 === void 0 ? void 0 : _a2.close());
  }
  async transformRequest(request2) {
    if (__classPrivateFieldGet$a(this, _Signer_options, "f").derivationOrigin) {
      return Object.assign(Object.assign({}, request2), { params: Object.assign(Object.assign({}, request2.params), { icrc95DerivationOrigin: __classPrivateFieldGet$a(this, _Signer_options, "f").derivationOrigin }) });
    }
    return request2;
  }
  async sendRequest(request2) {
    const channel = await this.openChannel();
    return new Promise(async (resolve, reject) => {
      const responseListener = channel.addEventListener("response", async (response) => {
        if (response.id !== request2.id) {
          return;
        }
        responseListener();
        closeListener();
        resolve(response);
        if (__classPrivateFieldGet$a(this, _Signer_options, "f").autoCloseTransportChannel) {
          __classPrivateFieldSet$a(this, _Signer_scheduledChannelClosure, setTimeout(() => {
            if (!channel.closed) {
              channel.close();
            }
          }, __classPrivateFieldGet$a(this, _Signer_options, "f").closeTransportChannelAfter));
        }
      });
      const closeListener = channel.addEventListener("close", () => {
        responseListener();
        closeListener();
        reject(new SignerError({
          code: NETWORK_ERROR,
          message: "Channel was closed before a response was received"
        }));
      });
      try {
        await channel.send(await this.transformRequest(request2));
      } catch (error) {
        responseListener();
        closeListener();
        reject(wrapTransportError(error));
      }
    });
  }
  async supportedStandards() {
    const response = await this.sendRequest({
      id: __classPrivateFieldGet$a(this, _Signer_options, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_supported_standards"
    });
    const result = unwrapResponse(response);
    return result.supportedStandards;
  }
  async requestPermissions(scopes2) {
    const response = await this.sendRequest({
      id: __classPrivateFieldGet$a(this, _Signer_options, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_request_permissions",
      params: { scopes: scopes2 }
    });
    const result = unwrapResponse(response);
    return result.scopes;
  }
  async permissions() {
    const response = await this.sendRequest({
      id: __classPrivateFieldGet$a(this, _Signer_options, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_permissions"
    });
    const result = unwrapResponse(response);
    return result.scopes;
  }
  async accounts() {
    const response = await this.sendRequest({
      id: __classPrivateFieldGet$a(this, _Signer_options, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc27_accounts"
    });
    const result = unwrapResponse(response);
    return result.accounts.map(({ owner, subaccount }) => ({
      owner: Principal$1.fromText(owner),
      subaccount: subaccount === void 0 ? void 0 : fromBase64(subaccount)
    }));
  }
  async delegation(params) {
    var _a2;
    const response = await this.sendRequest({
      id: __classPrivateFieldGet$a(this, _Signer_options, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc34_delegation",
      params: {
        publicKey: toBase64(params.publicKey),
        targets: (_a2 = params.targets) === null || _a2 === void 0 ? void 0 : _a2.map((p) => p.toText()),
        maxTimeToLive: params.maxTimeToLive === void 0 ? void 0 : String(params.maxTimeToLive)
      }
    });
    const result = unwrapResponse(response);
    return DelegationChain.fromDelegations(result.signerDelegation.map((delegation) => {
      var _a22;
      return {
        delegation: new Delegation(fromBase64(delegation.delegation.pubkey), BigInt(delegation.delegation.expiration), (_a22 = delegation.delegation.targets) === null || _a22 === void 0 ? void 0 : _a22.map((principal) => Principal$1.fromText(principal))),
        signature: fromBase64(delegation.signature)
      };
    }), fromBase64(result.publicKey));
  }
  async callCanister(params) {
    const response = await this.sendRequest({
      id: __classPrivateFieldGet$a(this, _Signer_options, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc49_call_canister",
      params: {
        canisterId: params.canisterId.toText(),
        sender: params.sender.toText(),
        method: params.method,
        arg: toBase64(params.arg)
      }
    });
    const result = unwrapResponse(response);
    const contentMap = fromBase64(result.contentMap);
    const certificate = fromBase64(result.certificate);
    return { contentMap, certificate };
  }
  async batchCallCanister(params) {
    const response = await this.sendRequest({
      id: __classPrivateFieldGet$a(this, _Signer_options, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc112_batch_call_canister",
      params: {
        sender: params.sender.toText(),
        requests: params.requests.map((requests) => requests.map((request2) => ({
          canisterId: request2.canisterId.toText(),
          method: request2.method,
          arg: toBase64(request2.arg)
        }))),
        validation: params.validation ? {
          canisterId: params.validation.canisterId.toText(),
          method: params.validation.method
        } : void 0
      }
    });
    const result = unwrapResponse(response);
    if (params.requests.length !== result.responses.length || params.requests.some((entries, index2) => entries.length !== result.responses[index2].length)) {
      throw new SignerError({
        code: NETWORK_ERROR,
        message: "Invalid batch call canister response, responses structure does not match request structure"
      });
    }
    return result.responses.map((responses) => responses.map((response2) => {
      if ("result" in response2) {
        const contentMap = fromBase64(response2.result.contentMap);
        const certificate = fromBase64(response2.result.certificate);
        return { result: { contentMap, certificate } };
      }
      return response2;
    }));
  }
}
_Signer_options = /* @__PURE__ */ new WeakMap(), _Signer_channel = /* @__PURE__ */ new WeakMap(), _Signer_establishingChannel = /* @__PURE__ */ new WeakMap(), _Signer_scheduledChannelClosure = /* @__PURE__ */ new WeakMap();
const isJsonRpcMessage = (message) => typeof message === "object" && !!message && "jsonrpc" in message && message.jsonrpc === "2.0";
const isJsonRpcRequest = (message) => isJsonRpcMessage(message) && "method" in message && typeof message.method === "string";
const isJsonRpcResponse = (message) => isJsonRpcMessage(message) && "id" in message && (typeof message.id === "string" || typeof message.id === "number");
var __classPrivateFieldSet$9 = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$9 = function(receiver, state, kind, f) {
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PostMessageChannel_closeListeners, _PostMessageChannel_options, _PostMessageChannel_closed;
class PostMessageChannel {
  constructor(options) {
    _PostMessageChannel_closeListeners.set(this, /* @__PURE__ */ new Set());
    _PostMessageChannel_options.set(this, void 0);
    _PostMessageChannel_closed.set(this, false);
    __classPrivateFieldSet$9(this, _PostMessageChannel_options, Object.assign({ window: globalThis.window, manageFocus: true }, options));
  }
  get closed() {
    return __classPrivateFieldGet$9(this, _PostMessageChannel_closed, "f");
  }
  addEventListener(...[event, listener]) {
    switch (event) {
      case "close":
        __classPrivateFieldGet$9(this, _PostMessageChannel_closeListeners, "f").add(listener);
        return () => {
          __classPrivateFieldGet$9(this, _PostMessageChannel_closeListeners, "f").delete(listener);
        };
      case "response":
        const messageListener = async (event2) => {
          if (event2.source !== __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").signerWindow || event2.origin !== __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").signerOrigin || !isJsonRpcResponse(event2.data)) {
            return;
          }
          listener(event2.data);
        };
        __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").window.addEventListener("message", messageListener);
        return () => {
          __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").window.removeEventListener("message", messageListener);
        };
    }
  }
  async send(request2) {
    if (__classPrivateFieldGet$9(this, _PostMessageChannel_closed, "f")) {
      throw new PostMessageTransportError("Communication channel is closed");
    }
    __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").signerWindow.postMessage(request2, __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").signerOrigin);
    if (__classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").manageFocus) {
      __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").signerWindow.focus();
    }
  }
  async close() {
    if (__classPrivateFieldGet$9(this, _PostMessageChannel_closed, "f")) {
      return;
    }
    __classPrivateFieldSet$9(this, _PostMessageChannel_closed, true);
    __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").signerWindow.close();
    if (__classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").manageFocus) {
      __classPrivateFieldGet$9(this, _PostMessageChannel_options, "f").window.focus();
    }
    __classPrivateFieldGet$9(this, _PostMessageChannel_closeListeners, "f").forEach((listener) => listener());
  }
}
_PostMessageChannel_closeListeners = /* @__PURE__ */ new WeakMap(), _PostMessageChannel_options = /* @__PURE__ */ new WeakMap(), _PostMessageChannel_closed = /* @__PURE__ */ new WeakMap();
const urlIsSecureContext = (value2) => {
  try {
    const url = new URL(value2);
    return url.protocol === "https:" || url.hostname === "127.0.0.1" || url.hostname.split(".").slice(-1)[0] === "localhost";
  } catch (_a2) {
    return false;
  }
};
var __classPrivateFieldSet$8 = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$8 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HeartbeatClient_instances, _HeartbeatClient_options, _HeartbeatClient_establish, _HeartbeatClient_maintain, _HeartbeatClient_receiveReadyResponse, _HeartbeatClient_sendStatusRequest;
class HeartbeatClient {
  constructor(options) {
    _HeartbeatClient_instances.add(this);
    _HeartbeatClient_options.set(this, void 0);
    __classPrivateFieldSet$8(this, _HeartbeatClient_options, Object.assign({ establishTimeout: 1e4, disconnectTimeout: 2e3, statusPollingRate: 300, window: globalThis.window, crypto: globalThis.crypto }, options));
    __classPrivateFieldGet$8(this, _HeartbeatClient_instances, "m", _HeartbeatClient_establish).call(this);
  }
}
_HeartbeatClient_options = /* @__PURE__ */ new WeakMap(), _HeartbeatClient_instances = /* @__PURE__ */ new WeakSet(), _HeartbeatClient_establish = function _HeartbeatClient_establish2() {
  const pending = [];
  const create = () => {
    const id = __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").crypto.randomUUID();
    pending.push(id);
    return id;
  };
  const listener = __classPrivateFieldGet$8(this, _HeartbeatClient_instances, "m", _HeartbeatClient_receiveReadyResponse).call(this, (response) => {
    if (pending.includes(response.data.id)) {
      listener();
      clearInterval(interval);
      clearTimeout(timeout2);
      __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").onEstablish(response.origin);
      __classPrivateFieldGet$8(this, _HeartbeatClient_instances, "m", _HeartbeatClient_maintain).call(this, response.origin);
    }
  });
  const timeout2 = setTimeout(() => {
    listener();
    clearInterval(interval);
    __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").onEstablishTimeout();
  }, __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").establishTimeout);
  const interval = setInterval(() => __classPrivateFieldGet$8(this, _HeartbeatClient_instances, "m", _HeartbeatClient_sendStatusRequest).call(this, create()), __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").statusPollingRate);
}, _HeartbeatClient_maintain = function _HeartbeatClient_maintain2(origin) {
  let interval;
  let timeout2;
  let pending = [];
  const consume = (id) => {
    const index2 = pending.findIndex((entry) => entry.id === id);
    if (index2 > -1) {
      pending.splice(index2, 1);
    }
    return index2 > -1;
  };
  const create = () => {
    const id = __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").crypto.randomUUID();
    const time = (/* @__PURE__ */ new Date()).getTime();
    pending = pending.filter((entry) => time - __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").disconnectTimeout > entry.time);
    pending.push({ id, time });
    return id;
  };
  const resetTimeout = () => {
    clearTimeout(timeout2);
    timeout2 = setTimeout(() => {
      listener();
      clearInterval(interval);
      __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").onDisconnect();
    }, __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").disconnectTimeout);
  };
  const listener = __classPrivateFieldGet$8(this, _HeartbeatClient_instances, "m", _HeartbeatClient_receiveReadyResponse).call(this, (response) => {
    if (response.origin === origin && consume(response.data.id)) {
      resetTimeout();
    }
  });
  resetTimeout();
  interval = setInterval(() => __classPrivateFieldGet$8(this, _HeartbeatClient_instances, "m", _HeartbeatClient_sendStatusRequest).call(this, create()), __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").statusPollingRate);
}, _HeartbeatClient_receiveReadyResponse = function _HeartbeatClient_receiveReadyResponse2(handler) {
  const listener = (event) => {
    if (event.source === __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").signerWindow && isJsonRpcResponse(event.data) && "result" in event.data && event.data.result === "ready") {
      handler(event);
    }
  };
  __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").window.addEventListener("message", listener);
  return () => __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").window.removeEventListener("message", listener);
}, _HeartbeatClient_sendStatusRequest = function _HeartbeatClient_sendStatusRequest2(id) {
  __classPrivateFieldGet$8(this, _HeartbeatClient_options, "f").signerWindow.postMessage({ jsonrpc: "2.0", id, method: "icrc29_status" }, "*");
};
var __classPrivateFieldSet$7 = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$7 = function(receiver, state, kind, f) {
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PostMessageTransport_options;
const NON_CLICK_ESTABLISHMENT_LINK = "https://github.com/slide-computer/signer-js/blob/main/packages/signer-web/README.md#channels-must-be-established-in-a-click-handler";
class PostMessageTransportError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, PostMessageTransportError.prototype);
  }
}
let withinClick = false;
if (globalThis.window) {
  globalThis.window.addEventListener("click", () => withinClick = true, true);
  globalThis.window.addEventListener("click", () => withinClick = false);
}
class PostMessageTransport {
  constructor(options) {
    _PostMessageTransport_options.set(this, void 0);
    if (!urlIsSecureContext(options.url)) {
      throw new PostMessageTransportError("Invalid signer RPC url");
    }
    __classPrivateFieldSet$7(this, _PostMessageTransport_options, Object.assign({ windowOpenerFeatures: "", window: globalThis.window, establishTimeout: 12e4, disconnectTimeout: 2e3, statusPollingRate: 300, crypto: globalThis.crypto, manageFocus: true, closeOnEstablishTimeout: true, detectNonClickEstablishment: true }, options));
  }
  async establishChannel() {
    if (__classPrivateFieldGet$7(this, _PostMessageTransport_options, "f").detectNonClickEstablishment && !withinClick) {
      throw new PostMessageTransportError(`Signer window should not be opened outside of click handler, see: ${NON_CLICK_ESTABLISHMENT_LINK}`);
    }
    const signerWindow = __classPrivateFieldGet$7(this, _PostMessageTransport_options, "f").window.open(__classPrivateFieldGet$7(this, _PostMessageTransport_options, "f").url, "signerWindow", __classPrivateFieldGet$7(this, _PostMessageTransport_options, "f").windowOpenerFeatures);
    if (!signerWindow) {
      throw new PostMessageTransportError("Signer window could not be opened");
    }
    return new Promise((resolve, reject) => {
      let channel;
      new HeartbeatClient(Object.assign(Object.assign({}, __classPrivateFieldGet$7(this, _PostMessageTransport_options, "f")), { signerWindow, onEstablish: (origin) => {
        channel = new PostMessageChannel(Object.assign(Object.assign({}, __classPrivateFieldGet$7(this, _PostMessageTransport_options, "f")), { signerOrigin: origin, signerWindow }));
        resolve(channel);
      }, onEstablishTimeout: () => {
        if (__classPrivateFieldGet$7(this, _PostMessageTransport_options, "f").closeOnEstablishTimeout) {
          signerWindow.close();
        }
        reject(new PostMessageTransportError("Communication channel could not be established within a reasonable time"));
      }, onDisconnect: () => channel.close() }));
    });
  }
}
_PostMessageTransport_options = /* @__PURE__ */ new WeakMap();
var __classPrivateFieldSet$6 = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$6 = function(receiver, state, kind, f) {
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowserExtensionChannel_closeListeners, _BrowserExtensionChannel_responseListeners, _BrowserExtensionChannel_options, _BrowserExtensionChannel_closed;
class BrowserExtensionChannel {
  constructor(options) {
    _BrowserExtensionChannel_closeListeners.set(this, /* @__PURE__ */ new Set());
    _BrowserExtensionChannel_responseListeners.set(this, /* @__PURE__ */ new Set());
    _BrowserExtensionChannel_options.set(this, void 0);
    _BrowserExtensionChannel_closed.set(this, false);
    __classPrivateFieldSet$6(this, _BrowserExtensionChannel_options, Object.assign({ window: globalThis.window }, options));
    const closeListener = () => {
      __classPrivateFieldGet$6(this, _BrowserExtensionChannel_options, "f").window.removeEventListener("icrc94:unexpectedlyClosed", closeListener);
      __classPrivateFieldSet$6(this, _BrowserExtensionChannel_closed, true);
      __classPrivateFieldGet$6(this, _BrowserExtensionChannel_closeListeners, "f").forEach((listener) => listener());
    };
    __classPrivateFieldGet$6(this, _BrowserExtensionChannel_options, "f").window.addEventListener("icrc94:unexpectedlyClosed", closeListener);
  }
  get closed() {
    return __classPrivateFieldGet$6(this, _BrowserExtensionChannel_closed, "f");
  }
  addEventListener(...[event, listener]) {
    switch (event) {
      case "close":
        __classPrivateFieldGet$6(this, _BrowserExtensionChannel_closeListeners, "f").add(listener);
        return () => {
          __classPrivateFieldGet$6(this, _BrowserExtensionChannel_closeListeners, "f").delete(listener);
        };
      case "response":
        __classPrivateFieldGet$6(this, _BrowserExtensionChannel_responseListeners, "f").add(listener);
        return () => {
          __classPrivateFieldGet$6(this, _BrowserExtensionChannel_responseListeners, "f").delete(listener);
        };
    }
  }
  async send(request2) {
    if (__classPrivateFieldGet$6(this, _BrowserExtensionChannel_closed, "f")) {
      throw new BrowserExtensionTransportError("Communication channel is closed");
    }
    const response = await __classPrivateFieldGet$6(this, _BrowserExtensionChannel_options, "f").providerDetail.sendMessage(request2);
    if (!isJsonRpcResponse(response)) {
      return;
    }
    __classPrivateFieldGet$6(this, _BrowserExtensionChannel_responseListeners, "f").forEach((listener) => listener(response));
  }
  async close() {
    if (__classPrivateFieldGet$6(this, _BrowserExtensionChannel_closed, "f")) {
      return;
    }
    __classPrivateFieldSet$6(this, _BrowserExtensionChannel_closed, true);
    await __classPrivateFieldGet$6(this, _BrowserExtensionChannel_options, "f").providerDetail.dismiss();
    __classPrivateFieldGet$6(this, _BrowserExtensionChannel_closeListeners, "f").forEach((listener) => listener());
  }
}
_BrowserExtensionChannel_closeListeners = /* @__PURE__ */ new WeakMap(), _BrowserExtensionChannel_responseListeners = /* @__PURE__ */ new WeakMap(), _BrowserExtensionChannel_options = /* @__PURE__ */ new WeakMap(), _BrowserExtensionChannel_closed = /* @__PURE__ */ new WeakMap();
var __classPrivateFieldSet$5 = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$5 = function(receiver, state, kind, f) {
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowserExtensionTransport_options;
class BrowserExtensionTransportError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, BrowserExtensionTransportError.prototype);
  }
}
class BrowserExtensionTransport {
  constructor(options) {
    _BrowserExtensionTransport_options.set(this, void 0);
    __classPrivateFieldSet$5(this, _BrowserExtensionTransport_options, Object.assign({ window: globalThis.window }, options));
  }
  static async discover({ discoveryDuration = 100, window: window2 = globalThis.window } = {}) {
    const providerDetails = [];
    window2.addEventListener("icrc94:announceProvider", (event) => {
      if (providerDetails.find((providerDetail) => providerDetail.uuid === event.detail.uuid)) {
        return;
      }
      providerDetails.push(event.detail);
    });
    window2.dispatchEvent(new CustomEvent("icrc94:requestProvider"));
    await new Promise((resolve) => setTimeout(resolve, discoveryDuration));
    return providerDetails;
  }
  static async findTransport(options) {
    const providerDetails = await BrowserExtensionTransport.discover(options);
    const providerDetail = providerDetails.find(({ uuid }) => uuid === options.uuid);
    if (!providerDetail) {
      throw new BrowserExtensionTransportError("Browser extension couldn't be found, make sure it's installed and enabled for this page.");
    }
    return new BrowserExtensionTransport(Object.assign(Object.assign({}, options), { providerDetail }));
  }
  async establishChannel() {
    return new BrowserExtensionChannel(__classPrivateFieldGet$5(this, _BrowserExtensionTransport_options, "f"));
  }
}
_BrowserExtensionTransport_options = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request2) {
  return new Promise((resolve, reject) => {
    request2.oncomplete = request2.onsuccess = () => resolve(request2.result);
    request2.onabort = request2.onerror = () => reject(request2.error);
  });
}
function createStore(dbName, storeName) {
  let dbp;
  const getDB = () => {
    if (dbp)
      return dbp;
    const request2 = indexedDB.open(dbName);
    request2.onupgradeneeded = () => request2.result.createObjectStore(storeName);
    dbp = promisifyRequest(request2);
    dbp.then((db) => {
      db.onclose = () => dbp = void 0;
    }, () => {
    });
    return dbp;
  };
  return (txMode, callback) => getDB().then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value2, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value2, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
class IdbStorage2 {
  get store() {
    if (!this._store) {
      this._store = createStore("signer-db", "signer-store");
    }
    return this._store;
  }
  async get(key) {
    return get(key, this.store);
  }
  async set(key, value2) {
    return set(key, value2, this.store);
  }
  async remove(key) {
    return del(key, this.store);
  }
}
const getIdentity = async (key, storage2) => {
  const value2 = await storage2.get(`identity-${key}`);
  if (!value2) {
    return;
  }
  return typeof value2 === "string" ? Ed25519KeyIdentity.fromJSON(value2) : ECDSAKeyIdentity.fromKeyPair(value2);
};
const setIdentity = async (key, identity, storage2) => {
  const value2 = identity instanceof Ed25519KeyIdentity ? JSON.stringify(identity.toJSON()) : identity.getKeyPair();
  return storage2.set(`identity-${key}`, value2);
};
const removeIdentity = async (key, storage2) => {
  return storage2.remove(`identity-${key}`);
};
const getDelegationChain = async (key, storage2) => {
  const json = await storage2.get(`delegation-${key}`);
  if (!json || typeof json !== "string") {
    return;
  }
  return DelegationChain.fromJSON(json);
};
const setDelegationChain = async (key, delegationChain, storage2) => {
  return storage2.set(`delegation-${key}`, JSON.stringify(delegationChain.toJSON()));
};
const removeDelegationChain = async (key, storage2) => {
  return storage2.remove(`delegation-${key}`);
};
var partial = {};
var hasRequiredPartial;
function requirePartial() {
  if (hasRequiredPartial) return partial;
  hasRequiredPartial = 1;
  var __classPrivateFieldSet2 = partial && partial.__classPrivateFieldSet || function(receiver, state, value2, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
  };
  var __classPrivateFieldGet2 = partial && partial.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _PartialIdentity_inner2;
  Object.defineProperty(partial, "__esModule", { value: true });
  partial.PartialIdentity = void 0;
  const principal_1 = esm;
  class PartialIdentity2 {
    constructor(inner) {
      _PartialIdentity_inner2.set(this, void 0);
      __classPrivateFieldSet2(this, _PartialIdentity_inner2, inner, "f");
    }
    /**
     * The raw public key of this identity.
     */
    get rawKey() {
      return __classPrivateFieldGet2(this, _PartialIdentity_inner2, "f").rawKey;
    }
    /**
     * The DER-encoded public key of this identity.
     */
    get derKey() {
      return __classPrivateFieldGet2(this, _PartialIdentity_inner2, "f").derKey;
    }
    /**
     * The DER-encoded public key of this identity.
     */
    toDer() {
      return __classPrivateFieldGet2(this, _PartialIdentity_inner2, "f").toDer();
    }
    /**
     * The inner {@link PublicKey} used by this identity.
     */
    getPublicKey() {
      return __classPrivateFieldGet2(this, _PartialIdentity_inner2, "f");
    }
    /**
     * The {@link Principal} of this identity.
     */
    getPrincipal() {
      if (!__classPrivateFieldGet2(this, _PartialIdentity_inner2, "f").rawKey) {
        throw new Error("Cannot get principal from a public key without a raw key.");
      }
      return principal_1.Principal.fromUint8Array(new Uint8Array(__classPrivateFieldGet2(this, _PartialIdentity_inner2, "f").rawKey));
    }
    /**
     * Required for the Identity interface, but cannot implemented for just a public key.
     */
    transformRequest() {
      return Promise.reject("Not implemented. You are attempting to use a partial identity to sign calls, but this identity only has access to the public key.To sign calls, use a DelegationIdentity instead.");
    }
  }
  partial.PartialIdentity = PartialIdentity2;
  _PartialIdentity_inner2 = /* @__PURE__ */ new WeakMap();
  return partial;
}
requirePartial();
var __classPrivateFieldGet$4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$4 = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return f ? f.value = value2 : state.set(receiver, value2), value2;
};
var _StoicConnection_instances, _a$2, _StoicConnection_isInternalConstructing, _StoicConnection_options, _StoicConnection_delegationChain, _StoicConnection_accounts, _StoicConnection_disconnectListeners, _StoicConnection_disconnectMonitorInterval, _StoicConnection_monitorDisconnect;
const ECDSA_KEY_LABEL = "ECDSA";
const IDENTITY_STORAGE_KEY = "stoic-base-identity";
const DELEGATION_STORAGE_KEY = "stoic-delegation-chain";
const ACCOUNTS_STORAGE_KEY = "stoic-account-count";
const STOIC_ORIGIN = "https://www.stoicwallet.com";
const STOIC_WINDOW = "stoic";
class StoicConnection {
  constructor(options, delegationChain, accounts) {
    _StoicConnection_instances.add(this);
    _StoicConnection_options.set(this, void 0);
    _StoicConnection_delegationChain.set(this, void 0);
    _StoicConnection_accounts.set(this, void 0);
    _StoicConnection_disconnectListeners.set(this, /* @__PURE__ */ new Set());
    _StoicConnection_disconnectMonitorInterval.set(this, void 0);
    const throwError = !__classPrivateFieldGet$4(_a$2, _a$2, "f", _StoicConnection_isInternalConstructing);
    __classPrivateFieldSet$4(_a$2, _a$2, false, "f", _StoicConnection_isInternalConstructing);
    if (throwError) {
      throw new StoicTransportError("StoicTransport is not constructable");
    }
    __classPrivateFieldSet$4(this, _StoicConnection_options, options);
    __classPrivateFieldSet$4(this, _StoicConnection_delegationChain, delegationChain);
    __classPrivateFieldSet$4(this, _StoicConnection_accounts, accounts);
    if (this.connected) {
      __classPrivateFieldGet$4(this, _StoicConnection_instances, "m", _StoicConnection_monitorDisconnect).call(this);
    }
  }
  get connected() {
    if (!__classPrivateFieldGet$4(this, _StoicConnection_delegationChain, "f")) {
      return false;
    }
    return isDelegationValid(__classPrivateFieldGet$4(this, _StoicConnection_delegationChain, "f"));
  }
  get identity() {
    return __classPrivateFieldGet$4(this, _StoicConnection_options, "f").identity;
  }
  get delegationChain() {
    return __classPrivateFieldGet$4(this, _StoicConnection_delegationChain, "f");
  }
  get accounts() {
    return __classPrivateFieldGet$4(this, _StoicConnection_accounts, "f");
  }
  static async create(options) {
    var _b2, _c, _d, _e, _f, _g;
    const maxTimeToLive = (_b2 = options === null || options === void 0 ? void 0 : options.maxTimeToLive) !== null && _b2 !== void 0 ? _b2 : BigInt(8) * BigInt(36e11);
    const keyType = (_c = options === null || options === void 0 ? void 0 : options.keyType) !== null && _c !== void 0 ? _c : ECDSA_KEY_LABEL;
    const storage2 = (_d = options === null || options === void 0 ? void 0 : options.storage) !== null && _d !== void 0 ? _d : new IdbStorage2();
    const crypto2 = (_e = options === null || options === void 0 ? void 0 : options.crypto) !== null && _e !== void 0 ? _e : globalThis.crypto;
    const disconnectMonitoringInterval = (_f = options === null || options === void 0 ? void 0 : options.disconnectMonitoringInterval) !== null && _f !== void 0 ? _f : 3e3;
    let identity = (_g = options === null || options === void 0 ? void 0 : options.identity) !== null && _g !== void 0 ? _g : await getIdentity(IDENTITY_STORAGE_KEY, storage2);
    if (!identity) {
      const createdIdentity = await (keyType === "Ed25519" ? Ed25519KeyIdentity.generate(crypto2.getRandomValues(new Uint8Array(32))) : ECDSAKeyIdentity.generate());
      await setIdentity(IDENTITY_STORAGE_KEY, createdIdentity, storage2);
      identity = createdIdentity;
    }
    const delegationChain = await getDelegationChain(DELEGATION_STORAGE_KEY, storage2);
    const accounts = await storage2.get(ACCOUNTS_STORAGE_KEY);
    __classPrivateFieldSet$4(_a$2, _a$2, true, "f", _StoicConnection_isInternalConstructing);
    return new _a$2({
      maxTimeToLive,
      keyType,
      identity,
      storage: storage2,
      crypto: crypto2,
      disconnectMonitoringInterval
    }, delegationChain, accounts ? Number(accounts) : void 0);
  }
  async connect() {
    return new Promise(async (resolve, reject) => {
      __classPrivateFieldSet$4(this, _StoicConnection_delegationChain, void 0);
      const keypair = {
        current: await __classPrivateFieldGet$4(this, _StoicConnection_options, "f").crypto.subtle.generateKey({
          name: "ECDSA",
          namedCurve: "P-384"
        }, false, ["sign", "verify"])
      };
      const apikey = toHex(await __classPrivateFieldGet$4(this, _StoicConnection_options, "f").crypto.subtle.exportKey("spki", keypair.current.publicKey));
      const tunnel = document.createElement("iframe");
      tunnel.width = "0";
      tunnel.height = "0";
      tunnel.style.borderWidth = "0";
      const delegation = new Delegation(__classPrivateFieldGet$4(this, _StoicConnection_options, "f").identity.getPublicKey().toDer(), BigInt(Date.now()) * BigInt(1e6) + __classPrivateFieldGet$4(this, _StoicConnection_options, "f").maxTimeToLive);
      let publicKey;
      const complete = async () => {
        window.removeEventListener("message", listener);
        document.body.removeChild(tunnel);
        await setDelegationChain(DELEGATION_STORAGE_KEY, __classPrivateFieldGet$4(this, _StoicConnection_delegationChain, "f"), __classPrivateFieldGet$4(this, _StoicConnection_options, "f").storage);
        await __classPrivateFieldGet$4(this, _StoicConnection_options, "f").storage.set(ACCOUNTS_STORAGE_KEY, `${__classPrivateFieldGet$4(this, _StoicConnection_accounts, "f")}`);
        __classPrivateFieldGet$4(this, _StoicConnection_instances, "m", _StoicConnection_monitorDisconnect).call(this);
        resolve();
      };
      const listener = (event) => {
        var _b2;
        if (!stoicWindow || event.origin !== STOIC_ORIGIN) {
          return;
        }
        if (event.source === tunnel.contentWindow && event.data.target === "STOIC-EXT") {
          if (!event.data.success) {
            window.removeEventListener("message", listener);
            document.body.removeChild(tunnel);
            reject(new StoicTransportError(event.data.data));
            return;
          }
          switch (event.data.action) {
            case "accounts":
              __classPrivateFieldSet$4(this, _StoicConnection_accounts, JSON.parse(event.data.data).length);
              if (__classPrivateFieldGet$4(this, _StoicConnection_delegationChain, "f")) {
                complete();
              }
              break;
            case "sign":
              const data = JSON.parse(event.data.data);
              const signature = fromHex(data.signed);
              const previousDelegationChain = data.chain && DelegationChain.fromJSON(data.chain);
              __classPrivateFieldSet$4(this, _StoicConnection_delegationChain, DelegationChain.fromDelegations([
                ...(_b2 = previousDelegationChain === null || previousDelegationChain === void 0 ? void 0 : previousDelegationChain.delegations) !== null && _b2 !== void 0 ? _b2 : [],
                { delegation, signature }
              ], publicKey));
              if (__classPrivateFieldGet$4(this, _StoicConnection_accounts, "f")) {
                complete();
              }
              break;
          }
          return;
        }
        if (event.source !== stoicWindow) {
          return;
        }
        switch (event.data.action) {
          case "initiateStoicConnect":
            stoicWindow.postMessage({ action: "requestAuthorization", apikey }, STOIC_ORIGIN);
            break;
          case "rejectAuthorization":
            stoicWindow.close();
            window.removeEventListener("message", listener);
            reject(new StoicTransportError("Connection is rejected"));
            break;
          case "confirmAuthorization":
            publicKey = new Uint8Array(Object.values(event.data.key)).buffer;
            const principal = Principal$1.selfAuthenticating(new Uint8Array(publicKey)).toText();
            stoicWindow.close();
            document.body.appendChild(tunnel);
            tunnel.onload = async () => {
              if (!tunnel.contentWindow) {
                reject(new StoicTransportError("Tunnel could not be established"));
                return;
              }
              tunnel.contentWindow.postMessage({
                target: "STOIC-IFRAME",
                action: "accounts",
                payload: "accounts",
                principal,
                apikey,
                sig: toHex(await window.crypto.subtle.sign({
                  name: "ECDSA",
                  hash: { name: "SHA-384" }
                }, keypair.current.privateKey, new TextEncoder().encode("accounts")))
              }, STOIC_ORIGIN);
              const challenge = toHex(new Uint8Array([
                ...new TextEncoder().encode("ic-request-auth-delegation"),
                ...new Uint8Array(requestIdOf(Object.assign({}, delegation)))
              ]).buffer);
              tunnel.contentWindow.postMessage({
                target: "STOIC-IFRAME",
                action: "sign",
                payload: challenge,
                principal,
                apikey,
                sig: toHex(await window.crypto.subtle.sign({
                  name: "ECDSA",
                  hash: { name: "SHA-384" }
                }, keypair.current.privateKey, new TextEncoder().encode(challenge)))
              }, STOIC_ORIGIN);
              delete keypair.current;
            };
            tunnel.src = new URL("?stoicTunnel", STOIC_ORIGIN).href;
            break;
        }
      };
      window.addEventListener("message", listener);
      const stoicWindow = window.open(new URL("?authorizeApp", STOIC_ORIGIN), STOIC_WINDOW);
    });
  }
  async disconnect() {
    clearInterval(__classPrivateFieldGet$4(this, _StoicConnection_disconnectMonitorInterval, "f"));
    await removeDelegationChain(DELEGATION_STORAGE_KEY, __classPrivateFieldGet$4(this, _StoicConnection_options, "f").storage);
    await __classPrivateFieldGet$4(this, _StoicConnection_options, "f").storage.remove(ACCOUNTS_STORAGE_KEY);
    __classPrivateFieldSet$4(this, _StoicConnection_delegationChain, void 0);
    __classPrivateFieldSet$4(this, _StoicConnection_accounts, void 0);
    __classPrivateFieldGet$4(this, _StoicConnection_disconnectListeners, "f").forEach((listener) => listener());
  }
  addEventListener(event, listener) {
    switch (event) {
      case "disconnect":
        __classPrivateFieldGet$4(this, _StoicConnection_disconnectListeners, "f").add(listener);
        return () => {
          __classPrivateFieldGet$4(this, _StoicConnection_disconnectListeners, "f").delete(listener);
        };
    }
  }
}
_a$2 = StoicConnection, _StoicConnection_options = /* @__PURE__ */ new WeakMap(), _StoicConnection_delegationChain = /* @__PURE__ */ new WeakMap(), _StoicConnection_accounts = /* @__PURE__ */ new WeakMap(), _StoicConnection_disconnectListeners = /* @__PURE__ */ new WeakMap(), _StoicConnection_disconnectMonitorInterval = /* @__PURE__ */ new WeakMap(), _StoicConnection_instances = /* @__PURE__ */ new WeakSet(), _StoicConnection_monitorDisconnect = function _StoicConnection_monitorDisconnect2() {
  __classPrivateFieldSet$4(this, _StoicConnection_disconnectMonitorInterval, setInterval(() => {
    if (!this.connected) {
      __classPrivateFieldGet$4(this, _StoicConnection_disconnectListeners, "f").forEach((listener) => listener());
      clearInterval(__classPrivateFieldGet$4(this, _StoicConnection_disconnectMonitorInterval, "f"));
    }
  }, __classPrivateFieldGet$4(this, _StoicConnection_options, "f").disconnectMonitoringInterval));
};
_StoicConnection_isInternalConstructing = { value: false };
var __classPrivateFieldGet$3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$3 = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var _a$1, _StoicTransport_isInternalConstructing, _StoicTransport_connection, _StoicTransport_agent;
class StoicTransportError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, StoicTransportError.prototype);
  }
}
class StoicTransport {
  constructor(connection, agent) {
    _StoicTransport_connection.set(this, void 0);
    _StoicTransport_agent.set(this, void 0);
    const throwError = !__classPrivateFieldGet$3(_a$1, _a$1, "f", _StoicTransport_isInternalConstructing);
    __classPrivateFieldSet$3(_a$1, _a$1, false, "f", _StoicTransport_isInternalConstructing);
    if (throwError) {
      throw new StoicTransportError("StoicTransport is not constructable");
    }
    __classPrivateFieldSet$3(this, _StoicTransport_connection, connection, "f");
    __classPrivateFieldSet$3(this, _StoicTransport_agent, agent, "f");
  }
  get connection() {
    return __classPrivateFieldGet$3(this, _StoicTransport_connection, "f");
  }
  static async create(options) {
    const connection = await StoicConnection.create(options);
    __classPrivateFieldSet$3(_a$1, _a$1, true, "f", _StoicTransport_isInternalConstructing);
    return new _a$1(connection, options === null || options === void 0 ? void 0 : options.agent);
  }
  async establishChannel() {
    if (!__classPrivateFieldGet$3(this, _StoicTransport_connection, "f").connected) {
      throw new StoicTransportError("StoicTransport is not connected");
    }
    return new StoicChannel(__classPrivateFieldGet$3(this, _StoicTransport_connection, "f"), __classPrivateFieldGet$3(this, _StoicTransport_agent, "f"));
  }
}
_a$1 = StoicTransport, _StoicTransport_connection = /* @__PURE__ */ new WeakMap(), _StoicTransport_agent = /* @__PURE__ */ new WeakMap();
_StoicTransport_isInternalConstructing = { value: false };
const supportedStandards = [
  {
    name: "ICRC-25",
    url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-25/ICRC-25.md"
  },
  {
    name: "ICRC-27",
    url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-27/ICRC-27.md"
  },
  {
    name: "ICRC-34",
    url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-34/ICRC-34.md"
  },
  {
    name: "ICRC-49",
    url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-49/ICRC-49.md"
  }
];
const scopes = [
  {
    scope: {
      method: "icrc27_accounts"
    },
    state: "granted"
  },
  {
    scope: {
      method: "icrc34_delegation"
    },
    state: "granted"
  },
  {
    scope: {
      method: "icrc49_call_canister"
    },
    state: "granted"
  }
];
var __classPrivateFieldSet$2 = function(receiver, state, value2, kind, f) {
  if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value2), value2;
};
var __classPrivateFieldGet$2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StoicChannel_instances, _StoicChannel_connection, _StoicChannel_agent, _StoicChannel_closeListeners, _StoicChannel_responseListeners, _StoicChannel_closed, _StoicChannel_createResponse;
class StoicChannel {
  constructor(connection, agent) {
    _StoicChannel_instances.add(this);
    _StoicChannel_connection.set(this, void 0);
    _StoicChannel_agent.set(this, void 0);
    _StoicChannel_closeListeners.set(this, /* @__PURE__ */ new Set());
    _StoicChannel_responseListeners.set(this, /* @__PURE__ */ new Set());
    _StoicChannel_closed.set(this, false);
    __classPrivateFieldSet$2(this, _StoicChannel_connection, connection);
    __classPrivateFieldSet$2(this, _StoicChannel_agent, agent);
    __classPrivateFieldGet$2(this, _StoicChannel_connection, "f").addEventListener("disconnect", () => __classPrivateFieldSet$2(this, _StoicChannel_closed, true));
  }
  get closed() {
    return __classPrivateFieldGet$2(this, _StoicChannel_closed, "f") || !__classPrivateFieldGet$2(this, _StoicChannel_connection, "f").connected;
  }
  addEventListener(...[event, listener]) {
    switch (event) {
      case "close":
        __classPrivateFieldGet$2(this, _StoicChannel_closeListeners, "f").add(listener);
        return () => {
          __classPrivateFieldGet$2(this, _StoicChannel_closeListeners, "f").delete(listener);
        };
      case "response":
        __classPrivateFieldGet$2(this, _StoicChannel_responseListeners, "f").add(listener);
        return () => {
          __classPrivateFieldGet$2(this, _StoicChannel_responseListeners, "f").delete(listener);
        };
    }
  }
  async send(request2) {
    if (this.closed) {
      throw new StoicTransportError("Communication channel is closed");
    }
    const id = request2.id;
    if (id === void 0) {
      return;
    }
    const response = await __classPrivateFieldGet$2(this, _StoicChannel_instances, "m", _StoicChannel_createResponse).call(this, Object.assign({ id }, request2));
    __classPrivateFieldGet$2(this, _StoicChannel_responseListeners, "f").forEach((listener) => listener(response));
  }
  async close() {
    __classPrivateFieldSet$2(this, _StoicChannel_closed, true);
    __classPrivateFieldGet$2(this, _StoicChannel_closeListeners, "f").forEach((listener) => listener());
  }
}
_StoicChannel_connection = /* @__PURE__ */ new WeakMap(), _StoicChannel_agent = /* @__PURE__ */ new WeakMap(), _StoicChannel_closeListeners = /* @__PURE__ */ new WeakMap(), _StoicChannel_responseListeners = /* @__PURE__ */ new WeakMap(), _StoicChannel_closed = /* @__PURE__ */ new WeakMap(), _StoicChannel_instances = /* @__PURE__ */ new WeakSet(), _StoicChannel_createResponse = async function _StoicChannel_createResponse2(request2) {
  var _a2, _b2, _c, _d;
  const id = request2.id;
  if (!isJsonRpcRequest(request2)) {
    return {
      id,
      jsonrpc: "2.0",
      error: { code: INVALID_REQUEST_ERROR, message: "Invalid request" }
    };
  }
  switch (request2.method) {
    case "icrc25_supported_standards":
      return {
        id,
        jsonrpc: "2.0",
        result: { supportedStandards }
      };
    case "icrc25_permissions":
    case "icrc25_request_permissions":
      return {
        id,
        jsonrpc: "2.0",
        result: { scopes }
      };
    case "icrc27_accounts":
      const owner = Principal$1.selfAuthenticating(new Uint8Array(__classPrivateFieldGet$2(this, _StoicChannel_connection, "f").delegationChain.publicKey)).toText();
      return {
        id,
        jsonrpc: "2.0",
        result: {
          accounts: Array.from({
            length: (_a2 = __classPrivateFieldGet$2(this, _StoicChannel_connection, "f").accounts) !== null && _a2 !== void 0 ? _a2 : 0
          }).map((_2, index2) => {
            const buffer2 = new ArrayBuffer(32);
            new DataView(buffer2).setBigUint64(24, BigInt(index2), false);
            return {
              owner,
              subaccount: toBase64(buffer2)
            };
          })
        }
      };
    case "icrc34_delegation":
      const delegationRequest = request2;
      const identity = __classPrivateFieldGet$2(this, _StoicChannel_connection, "f").identity;
      const delegationChain = __classPrivateFieldGet$2(this, _StoicChannel_connection, "f").delegationChain;
      const expiration = new Date(Date.now() + Number(delegationRequest.params.maxTimeToLive ? BigInt(delegationRequest.params.maxTimeToLive) / BigInt(1e6) : BigInt(8) * BigInt(36e5)));
      const signedDelegationChain = await DelegationChain.create(identity, { toDer: () => fromBase64(delegationRequest.params.publicKey) }, expiration, {
        previous: delegationChain,
        targets: (_b2 = delegationRequest.params.targets) === null || _b2 === void 0 ? void 0 : _b2.map((target) => Principal$1.fromText(target))
      });
      return {
        id,
        jsonrpc: "2.0",
        result: {
          publicKey: toBase64(signedDelegationChain.publicKey),
          signerDelegation: signedDelegationChain.delegations.map(({ delegation, signature }) => ({
            delegation: Object.assign({ pubkey: toBase64(delegation.pubkey), expiration: delegation.expiration.toString() }, delegation.targets ? {
              targets: delegation.targets.map((target) => target.toText())
            } : {}),
            signature: toBase64(signature)
          }))
        }
      };
    case "icrc49_call_canister":
      const callCanisterRequest = request2;
      const { pollForResponse: pollForResponse2, defaultStrategy: defaultStrategy2 } = polling;
      const canisterId = Principal$1.fromText(callCanisterRequest.params.canisterId);
      const delegationIdentity = DelegationIdentity.fromDelegation(__classPrivateFieldGet$2(this, _StoicChannel_connection, "f").identity, __classPrivateFieldGet$2(this, _StoicChannel_connection, "f").delegationChain);
      if (((_c = callCanisterRequest.params) === null || _c === void 0 ? void 0 : _c.sender) !== delegationIdentity.getPrincipal().toString()) {
        throw new StoicTransportError("Sender does not match Stoic identity");
      }
      const agent = await HttpAgent.from((_d = __classPrivateFieldGet$2(this, _StoicChannel_agent, "f")) !== null && _d !== void 0 ? _d : await HttpAgent.create());
      agent.replaceIdentity(delegationIdentity);
      let contentMap;
      agent.addTransform("update", async (agentRequest) => {
        contentMap = encode(agentRequest.body);
        return agentRequest;
      });
      const submitResponse = await agent.call(canisterId, {
        effectiveCanisterId: canisterId,
        methodName: callCanisterRequest.params.method,
        arg: fromBase64(callCanisterRequest.params.arg)
      });
      await pollForResponse2(agent, canisterId, submitResponse.requestId, defaultStrategy2());
      const { certificate } = await agent.readState(canisterId, {
        paths: [
          [
            new TextEncoder().encode("request_status"),
            submitResponse.requestId
          ]
        ]
      });
      return {
        id,
        jsonrpc: "2.0",
        result: {
          contentMap: toBase64(contentMap),
          certificate: toBase64(certificate)
        }
      };
    default:
      return {
        id,
        jsonrpc: "2.0",
        error: { code: NOT_SUPPORTED_ERROR, message: "Not supported" }
      };
  }
};
var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
function clone(configObject) {
  var div, convertBase, parseNumeric, P2 = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null }, ONE = new BigNumber(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
  function BigNumber(v2, b2) {
    var alphabet2, c, caseChanged, e3, i, isNum, len, str, x2 = this;
    if (!(x2 instanceof BigNumber)) return new BigNumber(v2, b2);
    if (b2 == null) {
      if (v2 && v2._isBigNumber === true) {
        x2.s = v2.s;
        if (!v2.c || v2.e > MAX_EXP) {
          x2.c = x2.e = null;
        } else if (v2.e < MIN_EXP) {
          x2.c = [x2.e = 0];
        } else {
          x2.e = v2.e;
          x2.c = v2.c.slice();
        }
        return;
      }
      if ((isNum = typeof v2 == "number") && v2 * 0 == 0) {
        x2.s = 1 / v2 < 0 ? (v2 = -v2, -1) : 1;
        if (v2 === ~~v2) {
          for (e3 = 0, i = v2; i >= 10; i /= 10, e3++) ;
          if (e3 > MAX_EXP) {
            x2.c = x2.e = null;
          } else {
            x2.e = e3;
            x2.c = [v2];
          }
          return;
        }
        str = String(v2);
      } else {
        if (!isNumeric.test(str = String(v2))) return parseNumeric(x2, str, isNum);
        x2.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }
      if ((e3 = str.indexOf(".")) > -1) str = str.replace(".", "");
      if ((i = str.search(/e/i)) > 0) {
        if (e3 < 0) e3 = i;
        e3 += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e3 < 0) {
        e3 = str.length;
      }
    } else {
      intCheck(b2, 2, ALPHABET.length, "Base");
      if (b2 == 10 && alphabetHasNormalDecimalDigits) {
        x2 = new BigNumber(v2);
        return round(x2, DECIMAL_PLACES + x2.e + 1, ROUNDING_MODE);
      }
      str = String(v2);
      if (isNum = typeof v2 == "number") {
        if (v2 * 0 != 0) return parseNumeric(x2, str, isNum, b2);
        x2.s = 1 / v2 < 0 ? (str = str.slice(1), -1) : 1;
        if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
          throw Error(tooManyDigits + v2);
        }
      } else {
        x2.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }
      alphabet2 = ALPHABET.slice(0, b2);
      e3 = i = 0;
      for (len = str.length; i < len; i++) {
        if (alphabet2.indexOf(c = str.charAt(i)) < 0) {
          if (c == ".") {
            if (i > e3) {
              e3 = len;
              continue;
            }
          } else if (!caseChanged) {
            if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e3 = 0;
              continue;
            }
          }
          return parseNumeric(x2, String(v2), isNum, b2);
        }
      }
      isNum = false;
      str = convertBase(str, b2, 10, x2.s);
      if ((e3 = str.indexOf(".")) > -1) str = str.replace(".", "");
      else e3 = str.length;
    }
    for (i = 0; str.charCodeAt(i) === 48; i++) ;
    for (len = str.length; str.charCodeAt(--len) === 48; ) ;
    if (str = str.slice(i, ++len)) {
      len -= i;
      if (isNum && BigNumber.DEBUG && len > 15 && (v2 > MAX_SAFE_INTEGER || v2 !== mathfloor(v2))) {
        throw Error(tooManyDigits + x2.s * v2);
      }
      if ((e3 = e3 - i - 1) > MAX_EXP) {
        x2.c = x2.e = null;
      } else if (e3 < MIN_EXP) {
        x2.c = [x2.e = 0];
      } else {
        x2.e = e3;
        x2.c = [];
        i = (e3 + 1) % LOG_BASE;
        if (e3 < 0) i += LOG_BASE;
        if (i < len) {
          if (i) x2.c.push(+str.slice(0, i));
          for (len -= LOG_BASE; i < len; ) {
            x2.c.push(+str.slice(i, i += LOG_BASE));
          }
          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }
        for (; i--; str += "0") ;
        x2.c.push(+str);
      }
    } else {
      x2.c = [x2.e = 0];
    }
  }
  BigNumber.clone = clone;
  BigNumber.ROUND_UP = 0;
  BigNumber.ROUND_DOWN = 1;
  BigNumber.ROUND_CEIL = 2;
  BigNumber.ROUND_FLOOR = 3;
  BigNumber.ROUND_HALF_UP = 4;
  BigNumber.ROUND_HALF_DOWN = 5;
  BigNumber.ROUND_HALF_EVEN = 6;
  BigNumber.ROUND_HALF_CEIL = 7;
  BigNumber.ROUND_HALF_FLOOR = 8;
  BigNumber.EUCLID = 9;
  BigNumber.config = BigNumber.set = function(obj) {
    var p, v2;
    if (obj != null) {
      if (typeof obj == "object") {
        if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
          v2 = obj[p];
          intCheck(v2, 0, MAX, p);
          DECIMAL_PLACES = v2;
        }
        if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
          v2 = obj[p];
          intCheck(v2, 0, 8, p);
          ROUNDING_MODE = v2;
        }
        if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
          v2 = obj[p];
          if (v2 && v2.pop) {
            intCheck(v2[0], -MAX, 0, p);
            intCheck(v2[1], 0, MAX, p);
            TO_EXP_NEG = v2[0];
            TO_EXP_POS = v2[1];
          } else {
            intCheck(v2, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v2 < 0 ? -v2 : v2);
          }
        }
        if (obj.hasOwnProperty(p = "RANGE")) {
          v2 = obj[p];
          if (v2 && v2.pop) {
            intCheck(v2[0], -MAX, -1, p);
            intCheck(v2[1], 1, MAX, p);
            MIN_EXP = v2[0];
            MAX_EXP = v2[1];
          } else {
            intCheck(v2, -MAX, MAX, p);
            if (v2) {
              MIN_EXP = -(MAX_EXP = v2 < 0 ? -v2 : v2);
            } else {
              throw Error(bignumberError + p + " cannot be zero: " + v2);
            }
          }
        }
        if (obj.hasOwnProperty(p = "CRYPTO")) {
          v2 = obj[p];
          if (v2 === !!v2) {
            if (v2) {
              if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v2;
              } else {
                CRYPTO = !v2;
                throw Error(bignumberError + "crypto unavailable");
              }
            } else {
              CRYPTO = v2;
            }
          } else {
            throw Error(bignumberError + p + " not true or false: " + v2);
          }
        }
        if (obj.hasOwnProperty(p = "MODULO_MODE")) {
          v2 = obj[p];
          intCheck(v2, 0, 9, p);
          MODULO_MODE = v2;
        }
        if (obj.hasOwnProperty(p = "POW_PRECISION")) {
          v2 = obj[p];
          intCheck(v2, 0, MAX, p);
          POW_PRECISION = v2;
        }
        if (obj.hasOwnProperty(p = "FORMAT")) {
          v2 = obj[p];
          if (typeof v2 == "object") FORMAT = v2;
          else throw Error(bignumberError + p + " not an object: " + v2);
        }
        if (obj.hasOwnProperty(p = "ALPHABET")) {
          v2 = obj[p];
          if (typeof v2 == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v2)) {
            alphabetHasNormalDecimalDigits = v2.slice(0, 10) == "0123456789";
            ALPHABET = v2;
          } else {
            throw Error(bignumberError + p + " invalid: " + v2);
          }
        }
      } else {
        throw Error(bignumberError + "Object expected: " + obj);
      }
    }
    return {
      DECIMAL_PLACES,
      ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO,
      MODULO_MODE,
      POW_PRECISION,
      FORMAT,
      ALPHABET
    };
  };
  BigNumber.isBigNumber = function(v2) {
    if (!v2 || v2._isBigNumber !== true) return false;
    if (!BigNumber.DEBUG) return true;
    var i, n, c = v2.c, e3 = v2.e, s = v2.s;
    out: if ({}.toString.call(c) == "[object Array]") {
      if ((s === 1 || s === -1) && e3 >= -MAX && e3 <= MAX && e3 === mathfloor(e3)) {
        if (c[0] === 0) {
          if (e3 === 0 && c.length === 1) return true;
          break out;
        }
        i = (e3 + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;
        if (String(c[0]).length == i) {
          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }
          if (n !== 0) return true;
        }
      }
    } else if (c === null && e3 === null && (s === null || s === 1 || s === -1)) {
      return true;
    }
    throw Error(bignumberError + "Invalid BigNumber: " + v2);
  };
  BigNumber.maximum = BigNumber.max = function() {
    return maxOrMin(arguments, -1);
  };
  BigNumber.minimum = BigNumber.min = function() {
    return maxOrMin(arguments, 1);
  };
  BigNumber.random = (function() {
    var pow2_53 = 9007199254740992;
    var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
      return mathfloor(Math.random() * pow2_53);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(dp) {
      var a, b2, e3, k2, v2, i = 0, c = [], rand = new BigNumber(ONE);
      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);
      k2 = mathceil(dp / LOG_BASE);
      if (CRYPTO) {
        if (crypto.getRandomValues) {
          a = crypto.getRandomValues(new Uint32Array(k2 *= 2));
          for (; i < k2; ) {
            v2 = a[i] * 131072 + (a[i + 1] >>> 11);
            if (v2 >= 9e15) {
              b2 = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b2[0];
              a[i + 1] = b2[1];
            } else {
              c.push(v2 % 1e14);
              i += 2;
            }
          }
          i = k2 / 2;
        } else if (crypto.randomBytes) {
          a = crypto.randomBytes(k2 *= 7);
          for (; i < k2; ) {
            v2 = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
            if (v2 >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {
              c.push(v2 % 1e14);
              i += 7;
            }
          }
          i = k2 / 7;
        } else {
          CRYPTO = false;
          throw Error(bignumberError + "crypto unavailable");
        }
      }
      if (!CRYPTO) {
        for (; i < k2; ) {
          v2 = random53bitInt();
          if (v2 < 9e15) c[i++] = v2 % 1e14;
        }
      }
      k2 = c[--i];
      dp %= LOG_BASE;
      if (k2 && dp) {
        v2 = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k2 / v2) * v2;
      }
      for (; c[i] === 0; c.pop(), i--) ;
      if (i < 0) {
        c = [e3 = 0];
      } else {
        for (e3 = -1; c[0] === 0; c.splice(0, 1), e3 -= LOG_BASE) ;
        for (i = 1, v2 = c[0]; v2 >= 10; v2 /= 10, i++) ;
        if (i < LOG_BASE) e3 -= LOG_BASE - i;
      }
      rand.e = e3;
      rand.c = c;
      return rand;
    };
  })();
  BigNumber.sum = function() {
    var i = 1, args = arguments, sum = new BigNumber(args[0]);
    for (; i < args.length; ) sum = sum.plus(args[i++]);
    return sum;
  };
  convertBase = /* @__PURE__ */ (function() {
    var decimal = "0123456789";
    function toBaseOut(str, baseIn, baseOut, alphabet2) {
      var j2, arr = [0], arrL, i = 0, len = str.length;
      for (; i < len; ) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
        arr[0] += alphabet2.indexOf(str.charAt(i++));
        for (j2 = 0; j2 < arr.length; j2++) {
          if (arr[j2] > baseOut - 1) {
            if (arr[j2 + 1] == null) arr[j2 + 1] = 0;
            arr[j2 + 1] += arr[j2] / baseOut | 0;
            arr[j2] %= baseOut;
          }
        }
      }
      return arr.reverse();
    }
    return function(str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet2, d2, e3, k2, r, x2, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
      if (i >= 0) {
        k2 = POW_PRECISION;
        POW_PRECISION = 0;
        str = str.replace(".", "");
        y = new BigNumber(baseIn);
        x2 = y.pow(str.length - i);
        POW_PRECISION = k2;
        y.c = toBaseOut(
          toFixedPoint(coeffToString(x2.c), x2.e, "0"),
          10,
          baseOut,
          decimal
        );
        y.e = y.c.length;
      }
      xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet2 = ALPHABET, decimal) : (alphabet2 = decimal, ALPHABET));
      e3 = k2 = xc.length;
      for (; xc[--k2] == 0; xc.pop()) ;
      if (!xc[0]) return alphabet2.charAt(0);
      if (i < 0) {
        --e3;
      } else {
        x2.c = xc;
        x2.e = e3;
        x2.s = sign;
        x2 = div(x2, y, dp, rm, baseOut);
        xc = x2.c;
        r = x2.r;
        e3 = x2.e;
      }
      d2 = e3 + dp + 1;
      i = xc[d2];
      k2 = baseOut / 2;
      r = r || d2 < 0 || xc[d2 + 1] != null;
      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : i > k2 || i == k2 && (rm == 4 || r || rm == 6 && xc[d2 - 1] & 1 || rm == (x2.s < 0 ? 8 : 7));
      if (d2 < 1 || !xc[0]) {
        str = r ? toFixedPoint(alphabet2.charAt(1), -dp, alphabet2.charAt(0)) : alphabet2.charAt(0);
      } else {
        xc.length = d2;
        if (r) {
          for (--baseOut; ++xc[--d2] > baseOut; ) {
            xc[d2] = 0;
            if (!d2) {
              ++e3;
              xc = [1].concat(xc);
            }
          }
        }
        for (k2 = xc.length; !xc[--k2]; ) ;
        for (i = 0, str = ""; i <= k2; str += alphabet2.charAt(xc[i++])) ;
        str = toFixedPoint(str, e3, alphabet2.charAt(0));
      }
      return str;
    };
  })();
  div = /* @__PURE__ */ (function() {
    function multiply(x2, k2, base) {
      var m, temp, xlo, xhi, carry = 0, i = x2.length, klo = k2 % SQRT_BASE, khi = k2 / SQRT_BASE | 0;
      for (x2 = x2.slice(); i--; ) {
        xlo = x2[i] % SQRT_BASE;
        xhi = x2[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
        carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x2[i] = temp % base;
      }
      if (carry) x2 = [carry].concat(x2);
      return x2;
    }
    function compare2(a, b2, aL, bL) {
      var i, cmp;
      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {
        for (i = cmp = 0; i < aL; i++) {
          if (a[i] != b2[i]) {
            cmp = a[i] > b2[i] ? 1 : -1;
            break;
          }
        }
      }
      return cmp;
    }
    function subtract(a, b2, aL, base) {
      var i = 0;
      for (; aL--; ) {
        a[aL] -= i;
        i = a[aL] < b2[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b2[aL];
      }
      for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
    }
    return function(x2, y, dp, rm, base) {
      var cmp, e3, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x2.s == y.s ? 1 : -1, xc = x2.c, yc = y.c;
      if (!xc || !xc[0] || !yc || !yc[0]) {
        return new BigNumber(
          // Return NaN if either NaN, or both Infinity or 0.
          !x2.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
          )
        );
      }
      q = new BigNumber(s);
      qc = q.c = [];
      e3 = x2.e - y.e;
      s = dp + e3 + 1;
      if (!base) {
        base = BASE;
        e3 = bitFloor(x2.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }
      for (i = 0; yc[i] == (xc[i] || 0); i++) ;
      if (yc[i] > (xc[i] || 0)) e3--;
      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;
        n = mathfloor(base / (yc[0] + 1));
        if (n > 1) {
          yc = multiply(yc, n, base);
          xc = multiply(xc, n, base);
          yL = yc.length;
          xL = xc.length;
        }
        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; rem[remL++] = 0) ;
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base / 2) yc0++;
        do {
          n = 0;
          cmp = compare2(yc, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
            n = mathfloor(rem0 / yc0);
            if (n > 1) {
              if (n >= base) n = base - 1;
              prod = multiply(yc, n, base);
              prodL = prod.length;
              remL = rem.length;
              while (compare2(prod, rem, prodL, remL) == 1) {
                n--;
                subtract(prod, yL < prodL ? yz : yc, prodL, base);
                prodL = prod.length;
                cmp = 1;
              }
            } else {
              if (n == 0) {
                cmp = n = 1;
              }
              prod = yc.slice();
              prodL = prod.length;
            }
            if (prodL < remL) prod = [0].concat(prod);
            subtract(rem, prod, remL, base);
            remL = rem.length;
            if (cmp == -1) {
              while (compare2(yc, rem, yL, remL) < 1) {
                n++;
                subtract(rem, yL < remL ? yz : yc, remL, base);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          }
          qc[i++] = n;
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);
        more = rem[0] != null;
        if (!qc[0]) qc.splice(0, 1);
      }
      if (base == BASE) {
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
        round(q, dp + (q.e = i + e3 * LOG_BASE - 1) + 1, rm, more);
      } else {
        q.e = e3;
        q.r = +more;
      }
      return q;
    };
  })();
  function format(n, i, rm, id) {
    var c0, e3, ne, len, str;
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    if (!n.c) return n.toString();
    c0 = n.c[0];
    ne = n.e;
    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
    } else {
      n = round(new BigNumber(n), i, rm);
      e3 = n.e;
      str = coeffToString(n.c);
      len = str.length;
      if (id == 1 || id == 2 && (i <= e3 || e3 <= TO_EXP_NEG)) {
        for (; len < i; str += "0", len++) ;
        str = toExponential(str, e3);
      } else {
        i -= ne + (id === 2 && e3 > ne);
        str = toFixedPoint(str, e3, "0");
        if (e3 + 1 > len) {
          if (--i > 0) for (str += "."; i--; str += "0") ;
        } else {
          i += e3 - len;
          if (i > 0) {
            if (e3 + 1 == len) str += ".";
            for (; i--; str += "0") ;
          }
        }
      }
    }
    return n.s < 0 && c0 ? "-" + str : str;
  }
  function maxOrMin(args, n) {
    var k2, y, i = 1, x2 = new BigNumber(args[0]);
    for (; i < args.length; i++) {
      y = new BigNumber(args[i]);
      if (!y.s || (k2 = compare(x2, y)) === n || k2 === 0 && x2.s === n) {
        x2 = y;
      }
    }
    return x2;
  }
  function normalise(n, c, e3) {
    var i = 1, j2 = c.length;
    for (; !c[--j2]; c.pop()) ;
    for (j2 = c[0]; j2 >= 10; j2 /= 10, i++) ;
    if ((e3 = i + e3 * LOG_BASE - 1) > MAX_EXP) {
      n.c = n.e = null;
    } else if (e3 < MIN_EXP) {
      n.c = [n.e = 0];
    } else {
      n.e = e3;
      n.c = c;
    }
    return n;
  }
  parseNumeric = /* @__PURE__ */ (function() {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(x2, str, isNum, b2) {
      var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
      if (isInfinityOrNaN.test(s)) {
        x2.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {
          s = s.replace(basePrefix, function(m, p1, p2) {
            base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
            return !b2 || b2 == base ? p1 : m;
          });
          if (b2) {
            base = b2;
            s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
          }
          if (str != s) return new BigNumber(s, base);
        }
        if (BigNumber.DEBUG) {
          throw Error(bignumberError + "Not a" + (b2 ? " base " + b2 : "") + " number: " + str);
        }
        x2.s = null;
      }
      x2.c = x2.e = null;
    };
  })();
  function round(x2, sd, rm, r) {
    var d2, i, j2, k2, n, ni, rd, xc = x2.c, pows10 = POWS_TEN;
    if (xc) {
      out: {
        for (d2 = 1, k2 = xc[0]; k2 >= 10; k2 /= 10, d2++) ;
        i = sd - d2;
        if (i < 0) {
          i += LOG_BASE;
          j2 = sd;
          n = xc[ni = 0];
          rd = mathfloor(n / pows10[d2 - j2 - 1] % 10);
        } else {
          ni = mathceil((i + 1) / LOG_BASE);
          if (ni >= xc.length) {
            if (r) {
              for (; xc.length <= ni; xc.push(0)) ;
              n = rd = 0;
              d2 = 1;
              i %= LOG_BASE;
              j2 = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k2 = xc[ni];
            for (d2 = 1; k2 >= 10; k2 /= 10, d2++) ;
            i %= LOG_BASE;
            j2 = i - LOG_BASE + d2;
            rd = j2 < 0 ? 0 : mathfloor(n / pows10[d2 - j2 - 1] % 10);
          }
        }
        r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        xc[ni + 1] != null || (j2 < 0 ? n : n % pows10[d2 - j2 - 1]);
        r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (i > 0 ? j2 > 0 ? n / pows10[d2 - j2] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x2.s < 0 ? 8 : 7));
        if (sd < 1 || !xc[0]) {
          xc.length = 0;
          if (r) {
            sd -= x2.e + 1;
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x2.e = -sd || 0;
          } else {
            xc[0] = x2.e = 0;
          }
          return x2;
        }
        if (i == 0) {
          xc.length = ni;
          k2 = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k2 = pows10[LOG_BASE - i];
          xc[ni] = j2 > 0 ? mathfloor(n / pows10[d2 - j2] % pows10[j2]) * k2 : 0;
        }
        if (r) {
          for (; ; ) {
            if (ni == 0) {
              for (i = 1, j2 = xc[0]; j2 >= 10; j2 /= 10, i++) ;
              j2 = xc[0] += k2;
              for (k2 = 1; j2 >= 10; j2 /= 10, k2++) ;
              if (i != k2) {
                x2.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }
              break;
            } else {
              xc[ni] += k2;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k2 = 1;
            }
          }
        }
        for (i = xc.length; xc[--i] === 0; xc.pop()) ;
      }
      if (x2.e > MAX_EXP) {
        x2.c = x2.e = null;
      } else if (x2.e < MIN_EXP) {
        x2.c = [x2.e = 0];
      }
    }
    return x2;
  }
  function valueOf(n) {
    var str, e3 = n.e;
    if (e3 === null) return n.toString();
    str = coeffToString(n.c);
    str = e3 <= TO_EXP_NEG || e3 >= TO_EXP_POS ? toExponential(str, e3) : toFixedPoint(str, e3, "0");
    return n.s < 0 ? "-" + str : str;
  }
  P2.absoluteValue = P2.abs = function() {
    var x2 = new BigNumber(this);
    if (x2.s < 0) x2.s = 1;
    return x2;
  };
  P2.comparedTo = function(y, b2) {
    return compare(this, new BigNumber(y, b2));
  };
  P2.decimalPlaces = P2.dp = function(dp, rm) {
    var c, n, v2, x2 = this;
    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber(x2), dp + x2.e + 1, rm);
    }
    if (!(c = x2.c)) return null;
    n = ((v2 = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
    if (v2 = c[v2]) for (; v2 % 10 == 0; v2 /= 10, n--) ;
    if (n < 0) n = 0;
    return n;
  };
  P2.dividedBy = P2.div = function(y, b2) {
    return div(this, new BigNumber(y, b2), DECIMAL_PLACES, ROUNDING_MODE);
  };
  P2.dividedToIntegerBy = P2.idiv = function(y, b2) {
    return div(this, new BigNumber(y, b2), 0, 1);
  };
  P2.exponentiatedBy = P2.pow = function(n, m) {
    var half, isModExp, i, k2, more, nIsBig, nIsNeg, nIsOdd, y, x2 = this;
    n = new BigNumber(n);
    if (n.c && !n.isInteger()) {
      throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
    }
    if (m != null) m = new BigNumber(m);
    nIsBig = n.e > 14;
    if (!x2.c || !x2.c[0] || x2.c[0] == 1 && !x2.e && x2.c.length == 1 || !n.c || !n.c[0]) {
      y = new BigNumber(Math.pow(+valueOf(x2), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }
    nIsNeg = n.s < 0;
    if (m) {
      if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);
      isModExp = !nIsNeg && x2.isInteger() && m.isInteger();
      if (isModExp) x2 = x2.mod(m);
    } else if (n.e > 9 && (x2.e > 0 || x2.e < -1 || (x2.e == 0 ? x2.c[0] > 1 || nIsBig && x2.c[1] >= 24e7 : x2.c[0] < 8e13 || nIsBig && x2.c[0] <= 9999975e7))) {
      k2 = x2.s < 0 && isOdd(n) ? -0 : 0;
      if (x2.e > -1) k2 = 1 / k2;
      return new BigNumber(nIsNeg ? 1 / k2 : k2);
    } else if (POW_PRECISION) {
      k2 = mathceil(POW_PRECISION / LOG_BASE + 2);
    }
    if (nIsBig) {
      half = new BigNumber(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }
    y = new BigNumber(ONE);
    for (; ; ) {
      if (nIsOdd) {
        y = y.times(x2);
        if (!y.c) break;
        if (k2) {
          if (y.c.length > k2) y.c.length = k2;
        } else if (isModExp) {
          y = y.mod(m);
        }
      }
      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);
        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }
      x2 = x2.times(x2);
      if (k2) {
        if (x2.c && x2.c.length > k2) x2.c.length = k2;
      } else if (isModExp) {
        x2 = x2.mod(m);
      }
    }
    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);
    return m ? y.mod(m) : k2 ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };
  P2.integerValue = function(rm) {
    var n = new BigNumber(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };
  P2.isEqualTo = P2.eq = function(y, b2) {
    return compare(this, new BigNumber(y, b2)) === 0;
  };
  P2.isFinite = function() {
    return !!this.c;
  };
  P2.isGreaterThan = P2.gt = function(y, b2) {
    return compare(this, new BigNumber(y, b2)) > 0;
  };
  P2.isGreaterThanOrEqualTo = P2.gte = function(y, b2) {
    return (b2 = compare(this, new BigNumber(y, b2))) === 1 || b2 === 0;
  };
  P2.isInteger = function() {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };
  P2.isLessThan = P2.lt = function(y, b2) {
    return compare(this, new BigNumber(y, b2)) < 0;
  };
  P2.isLessThanOrEqualTo = P2.lte = function(y, b2) {
    return (b2 = compare(this, new BigNumber(y, b2))) === -1 || b2 === 0;
  };
  P2.isNaN = function() {
    return !this.s;
  };
  P2.isNegative = function() {
    return this.s < 0;
  };
  P2.isPositive = function() {
    return this.s > 0;
  };
  P2.isZero = function() {
    return !!this.c && this.c[0] == 0;
  };
  P2.minus = function(y, b2) {
    var i, j2, t, xLTy, x2 = this, a = x2.s;
    y = new BigNumber(y, b2);
    b2 = y.s;
    if (!a || !b2) return new BigNumber(NaN);
    if (a != b2) {
      y.s = -b2;
      return x2.plus(y);
    }
    var xe = x2.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x2.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return xc ? (y.s = -b2, y) : new BigNumber(yc ? x2 : NaN);
      if (!xc[0] || !yc[0]) {
        return yc[0] ? (y.s = -b2, y) : new BigNumber(xc[0] ? x2 : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          ROUNDING_MODE == 3 ? -0 : 0
        ));
      }
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }
      t.reverse();
      for (b2 = a; b2--; t.push(0)) ;
      t.reverse();
    } else {
      j2 = (xLTy = (a = xc.length) < (b2 = yc.length)) ? a : b2;
      for (a = b2 = 0; b2 < j2; b2++) {
        if (xc[b2] != yc[b2]) {
          xLTy = xc[b2] < yc[b2];
          break;
        }
      }
    }
    if (xLTy) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }
    b2 = (j2 = yc.length) - (i = xc.length);
    if (b2 > 0) for (; b2--; xc[i++] = 0) ;
    b2 = BASE - 1;
    for (; j2 > a; ) {
      if (xc[--j2] < yc[j2]) {
        for (i = j2; i && !xc[--i]; xc[i] = b2) ;
        --xc[i];
        xc[j2] += BASE;
      }
      xc[j2] -= yc[j2];
    }
    for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
    if (!xc[0]) {
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }
    return normalise(y, xc, ye);
  };
  P2.modulo = P2.mod = function(y, b2) {
    var q, s, x2 = this;
    y = new BigNumber(y, b2);
    if (!x2.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber(NaN);
    } else if (!y.c || x2.c && !x2.c[0]) {
      return new BigNumber(x2);
    }
    if (MODULO_MODE == 9) {
      s = y.s;
      y.s = 1;
      q = div(x2, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x2, y, 0, MODULO_MODE);
    }
    y = x2.minus(q.times(y));
    if (!y.c[0] && MODULO_MODE == 1) y.s = x2.s;
    return y;
  };
  P2.multipliedBy = P2.times = function(y, b2) {
    var c, e3, i, j2, k2, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x2 = this, xc = x2.c, yc = (y = new BigNumber(y, b2)).c;
    if (!xc || !yc || !xc[0] || !yc[0]) {
      if (!x2.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x2.s;
        if (!xc || !yc) {
          y.c = y.e = null;
        } else {
          y.c = [0];
          y.e = 0;
        }
      }
      return y;
    }
    e3 = bitFloor(x2.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x2.s;
    xcL = xc.length;
    ycL = yc.length;
    if (xcL < ycL) {
      zc = xc;
      xc = yc;
      yc = zc;
      i = xcL;
      xcL = ycL;
      ycL = i;
    }
    for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
    base = BASE;
    sqrtBase = SQRT_BASE;
    for (i = ycL; --i >= 0; ) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;
      for (k2 = xcL, j2 = i + k2; j2 > i; ) {
        xlo = xc[--k2] % sqrtBase;
        xhi = xc[k2] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j2] + c;
        c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j2--] = xlo % base;
      }
      zc[j2] = c;
    }
    if (c) {
      ++e3;
    } else {
      zc.splice(0, 1);
    }
    return normalise(y, zc, e3);
  };
  P2.negated = function() {
    var x2 = new BigNumber(this);
    x2.s = -x2.s || null;
    return x2;
  };
  P2.plus = function(y, b2) {
    var t, x2 = this, a = x2.s;
    y = new BigNumber(y, b2);
    b2 = y.s;
    if (!a || !b2) return new BigNumber(NaN);
    if (a != b2) {
      y.s = -b2;
      return x2.minus(y);
    }
    var xe = x2.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x2.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return new BigNumber(a / 0);
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x2 : a * 0);
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }
      t.reverse();
      for (; a--; t.push(0)) ;
      t.reverse();
    }
    a = xc.length;
    b2 = yc.length;
    if (a - b2 < 0) {
      t = yc;
      yc = xc;
      xc = t;
      b2 = a;
    }
    for (a = 0; b2; ) {
      a = (xc[--b2] = xc[b2] + yc[b2] + a) / BASE | 0;
      xc[b2] = BASE === xc[b2] ? 0 : xc[b2] % BASE;
    }
    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }
    return normalise(y, xc, ye);
  };
  P2.precision = P2.sd = function(sd, rm) {
    var c, n, v2, x2 = this;
    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber(x2), sd, rm);
    }
    if (!(c = x2.c)) return null;
    v2 = c.length - 1;
    n = v2 * LOG_BASE + 1;
    if (v2 = c[v2]) {
      for (; v2 % 10 == 0; v2 /= 10, n--) ;
      for (v2 = c[0]; v2 >= 10; v2 /= 10, n++) ;
    }
    if (sd && x2.e + 1 > n) n = x2.e + 1;
    return n;
  };
  P2.shiftedBy = function(k2) {
    intCheck(k2, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times("1e" + k2);
  };
  P2.squareRoot = P2.sqrt = function() {
    var m, n, r, rep, t, x2 = this, c = x2.c, s = x2.s, e3 = x2.e, dp = DECIMAL_PLACES + 4, half = new BigNumber("0.5");
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x2 : 1 / 0);
    }
    s = Math.sqrt(+valueOf(x2));
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e3) % 2 == 0) n += "0";
      s = Math.sqrt(+n);
      e3 = bitFloor((e3 + 1) / 2) - (e3 < 0 || e3 % 2);
      if (s == 1 / 0) {
        n = "5e" + e3;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf("e") + 1) + e3;
      }
      r = new BigNumber(n);
    } else {
      r = new BigNumber(s + "");
    }
    if (r.c[0]) {
      e3 = r.e;
      s = e3 + dp;
      if (s < 3) s = 0;
      for (; ; ) {
        t = r;
        r = half.times(t.plus(div(x2, t, dp, 1)));
        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
          if (r.e < e3) --s;
          n = n.slice(s - 3, s + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);
              if (t.times(t).eq(x2)) {
                r = t;
                break;
              }
            }
            dp += 4;
            s += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x2);
            }
            break;
          }
        }
      }
    }
    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };
  P2.toExponential = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };
  P2.toFixed = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };
  P2.toFormat = function(dp, rm, format2) {
    var str, x2 = this;
    if (format2 == null) {
      if (dp != null && rm && typeof rm == "object") {
        format2 = rm;
        rm = null;
      } else if (dp && typeof dp == "object") {
        format2 = dp;
        dp = rm = null;
      } else {
        format2 = FORMAT;
      }
    } else if (typeof format2 != "object") {
      throw Error(bignumberError + "Argument not an object: " + format2);
    }
    str = x2.toFixed(dp, rm);
    if (x2.c) {
      var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x2.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
      if (g2) {
        i = g1;
        g1 = g2;
        g2 = i;
        len -= i;
      }
      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = "-" + intPart;
      }
      str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
        new RegExp("\\d{" + g2 + "}\\B", "g"),
        "$&" + (format2.fractionGroupSeparator || "")
      ) : fractionPart) : intPart;
    }
    return (format2.prefix || "") + str + (format2.suffix || "");
  };
  P2.toFraction = function(md) {
    var d2, d0, d1, d22, e3, exp, n, n0, n1, q, r, s, x2 = this, xc = x2.c;
    if (md != null) {
      n = new BigNumber(md);
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
      }
    }
    if (!xc) return new BigNumber(x2);
    d2 = new BigNumber(ONE);
    n1 = d0 = new BigNumber(ONE);
    d1 = n0 = new BigNumber(ONE);
    s = coeffToString(xc);
    e3 = d2.e = s.length - x2.e - 1;
    d2.c[0] = POWS_TEN[(exp = e3 % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d2) > 0 ? e3 > 0 ? d2 : n1 : n;
    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber(s);
    n0.c[0] = 0;
    for (; ; ) {
      q = div(n, d2, 0, 1);
      d22 = d0.plus(q.times(d1));
      if (d22.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d22;
      n1 = n0.plus(q.times(d22 = n1));
      n0 = d22;
      d2 = n.minus(q.times(d22 = d2));
      n = d22;
    }
    d22 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d22.times(n1));
    d0 = d0.plus(d22.times(d1));
    n0.s = n1.s = x2.s;
    e3 = e3 * 2;
    r = div(n1, d1, e3, ROUNDING_MODE).minus(x2).abs().comparedTo(
      div(n0, d0, e3, ROUNDING_MODE).minus(x2).abs()
    ) < 1 ? [n1, d1] : [n0, d0];
    MAX_EXP = exp;
    return r;
  };
  P2.toNumber = function() {
    return +valueOf(this);
  };
  P2.toPrecision = function(sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };
  P2.toString = function(b2) {
    var str, n = this, s = n.s, e3 = n.e;
    if (e3 === null) {
      if (s) {
        str = "Infinity";
        if (s < 0) str = "-" + str;
      } else {
        str = "NaN";
      }
    } else {
      if (b2 == null) {
        str = e3 <= TO_EXP_NEG || e3 >= TO_EXP_POS ? toExponential(coeffToString(n.c), e3) : toFixedPoint(coeffToString(n.c), e3, "0");
      } else if (b2 === 10 && alphabetHasNormalDecimalDigits) {
        n = round(new BigNumber(n), DECIMAL_PLACES + e3 + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, "0");
      } else {
        intCheck(b2, 2, ALPHABET.length, "Base");
        str = convertBase(toFixedPoint(coeffToString(n.c), e3, "0"), 10, b2, s, true);
      }
      if (s < 0 && n.c[0]) str = "-" + str;
    }
    return str;
  };
  P2.valueOf = P2.toJSON = function() {
    return valueOf(this);
  };
  P2._isBigNumber = true;
  P2[Symbol.toStringTag] = "BigNumber";
  P2[Symbol.for("nodejs.util.inspect.custom")] = P2.valueOf;
  if (configObject != null) BigNumber.set(configObject);
  return BigNumber;
}
function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}
function coeffToString(a) {
  var s, z2, i = 1, j2 = a.length, r = a[0] + "";
  for (; i < j2; ) {
    s = a[i++] + "";
    z2 = LOG_BASE - s.length;
    for (; z2--; s = "0" + s) ;
    r += s;
  }
  for (j2 = r.length; r.charCodeAt(--j2) === 48; ) ;
  return r.slice(0, j2 + 1 || 1);
}
function compare(x2, y) {
  var a, b2, xc = x2.c, yc = y.c, i = x2.s, j2 = y.s, k2 = x2.e, l = y.e;
  if (!i || !j2) return null;
  a = xc && !xc[0];
  b2 = yc && !yc[0];
  if (a || b2) return a ? b2 ? 0 : -j2 : i;
  if (i != j2) return i;
  a = i < 0;
  b2 = k2 == l;
  if (!xc || !yc) return b2 ? 0 : !xc ^ a ? 1 : -1;
  if (!b2) return k2 > l ^ a ? 1 : -1;
  j2 = (k2 = xc.length) < (l = yc.length) ? k2 : l;
  for (i = 0; i < j2; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
  return k2 == l ? 0 : k2 > l ^ a ? 1 : -1;
}
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
  }
}
function isOdd(n) {
  var k2 = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k2 && n.c[k2] % 2 != 0;
}
function toExponential(str, e3) {
  return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e3 < 0 ? "e" : "e+") + e3;
}
function toFixedPoint(str, e3, z2) {
  var len, zs;
  if (e3 < 0) {
    for (zs = z2 + "."; ++e3; zs += z2) ;
    str = zs + str;
  } else {
    len = str.length;
    if (++e3 > len) {
      for (zs = z2, e3 -= len; --e3; zs += z2) ;
      str += zs;
    } else if (e3 < len) {
      str = str.slice(0, e3) + "." + str.slice(e3);
    }
  }
  return str;
}
clone();
const decodeCallRequest = (contentMap) => {
  const decoded = decode(contentMap);
  const expiry = new Expiry(0);
  expiry._value = BigInt(decoded.ingress_expiry.toString(10));
  return Object.assign(Object.assign({}, decoded), { canister_id: Principal$1.from(decoded.canister_id), ingress_expiry: expiry });
};
var __classPrivateFieldGet$1 = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$1 = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var _Queue_ongoing;
class Queue {
  constructor() {
    _Queue_ongoing.set(this, Promise.resolve());
  }
  async schedule(job) {
    return new Promise((resolve, reject) => {
      __classPrivateFieldSet$1(this, _Queue_ongoing, __classPrivateFieldGet$1(this, _Queue_ongoing, "f").finally(async () => {
        try {
          resolve(await job());
        } catch (error) {
          reject(error);
        }
      }), "f");
    });
  }
}
_Queue_ongoing = /* @__PURE__ */ new WeakMap();
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = function(receiver, state, value2, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
};
var _SignerAgent_instances, _a, _SignerAgent_isInternalConstructing, _SignerAgent_options, _SignerAgent_certificates, _SignerAgent_queue, _SignerAgent_executeTimeout, _SignerAgent_scheduled, _SignerAgent_autoBatch, _SignerAgent_validation, _SignerAgent_executeQueue, _SignerAgent_executeBatch;
const ROOT_KEY = new Uint8Array(IC_ROOT_KEY.match(/[\da-f]{2}/gi).map((h2) => parseInt(h2, 16))).buffer;
const MAX_AGE_IN_MINUTES = 5;
const INVALID_RESPONSE_MESSAGE = "Received invalid response from signer";
class SignerAgentError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, SignerAgentError.prototype);
  }
}
class SignerAgent {
  constructor(options) {
    _SignerAgent_instances.add(this);
    _SignerAgent_options.set(this, void 0);
    _SignerAgent_certificates.set(this, /* @__PURE__ */ new Map());
    _SignerAgent_queue.set(this, new Queue());
    _SignerAgent_executeTimeout.set(this, void 0);
    _SignerAgent_scheduled.set(this, [[]]);
    _SignerAgent_autoBatch.set(this, true);
    _SignerAgent_validation.set(this, void 0);
    const throwError = !__classPrivateFieldGet(_a, _a, "f", _SignerAgent_isInternalConstructing);
    __classPrivateFieldSet(_a, _a, false, "f", _SignerAgent_isInternalConstructing);
    if (throwError) {
      throw new SignerAgentError("SignerAgent is not constructable");
    }
    __classPrivateFieldSet(this, _SignerAgent_options, options, "f");
  }
  get rootKey() {
    var _b2;
    return (_b2 = __classPrivateFieldGet(this, _SignerAgent_options, "f").agent.rootKey) !== null && _b2 !== void 0 ? _b2 : ROOT_KEY;
  }
  get signer() {
    return __classPrivateFieldGet(this, _SignerAgent_options, "f").signer;
  }
  static async create(options) {
    var _b2, _c, _d;
    __classPrivateFieldSet(_a, _a, true, "f", _SignerAgent_isInternalConstructing);
    return new _a(Object.assign(Object.assign({}, options), { agent: (_b2 = options.agent) !== null && _b2 !== void 0 ? _b2 : await HttpAgent.create(), scheduleDelay: (_c = options.scheduleDelay) !== null && _c !== void 0 ? _c : 20, validation: (_d = options.validation) !== null && _d !== void 0 ? _d : null }));
  }
  static createSync(options) {
    var _b2, _c, _d;
    __classPrivateFieldSet(_a, _a, true, "f", _SignerAgent_isInternalConstructing);
    return new _a(Object.assign(Object.assign({}, options), { agent: (_b2 = options.agent) !== null && _b2 !== void 0 ? _b2 : HttpAgent.createSync(), scheduleDelay: (_c = options.scheduleDelay) !== null && _c !== void 0 ? _c : 20, validation: (_d = options.validation) !== null && _d !== void 0 ? _d : null }));
  }
  async execute() {
    const scheduled = [...__classPrivateFieldGet(this, _SignerAgent_scheduled, "f")];
    const validation = __classPrivateFieldGet(this, _SignerAgent_validation, "f");
    this.clear();
    const pending = scheduled.flat().length;
    if (pending === 0) {
      __classPrivateFieldSet(this, _SignerAgent_validation, void 0, "f");
      return;
    }
    const needsBatch = pending > 1;
    if (!needsBatch) {
      await __classPrivateFieldGet(this, _SignerAgent_instances, "m", _SignerAgent_executeQueue).call(this, scheduled);
      return;
    }
    const supportedStandards2 = await __classPrivateFieldGet(this, _SignerAgent_queue, "f").schedule(() => this.signer.supportedStandards());
    const supportsBatch = supportedStandards2.some((supportedStandard) => supportedStandard.name === "ICRC-112");
    if (supportsBatch) {
      await __classPrivateFieldGet(this, _SignerAgent_instances, "m", _SignerAgent_executeBatch).call(this, scheduled, validation);
    } else {
      await __classPrivateFieldGet(this, _SignerAgent_instances, "m", _SignerAgent_executeQueue).call(this, scheduled);
    }
  }
  async call(canisterId, options) {
    canisterId = Principal$1.from(canisterId);
    await __classPrivateFieldGet(this, _SignerAgent_options, "f").signer.openChannel();
    const response = await new Promise((resolve, reject) => {
      clearTimeout(__classPrivateFieldGet(this, _SignerAgent_executeTimeout, "f"));
      __classPrivateFieldGet(this, _SignerAgent_scheduled, "f").slice(-1)[0].push({
        options: {
          canisterId,
          method: options.methodName,
          arg: options.arg
        },
        resolve,
        reject
      });
      if (__classPrivateFieldGet(this, _SignerAgent_autoBatch, "f")) {
        __classPrivateFieldSet(this, _SignerAgent_executeTimeout, setTimeout(() => this.execute(), __classPrivateFieldGet(this, _SignerAgent_options, "f").scheduleDelay), "f");
      }
    });
    const requestBody = decodeCallRequest(response.contentMap);
    const contentMapMatchesRequest = SubmitRequestType.Call === requestBody.request_type && canisterId.compareTo(requestBody.canister_id) === "eq" && options.methodName === requestBody.method_name && compare$1(options.arg, requestBody.arg) === 0 && __classPrivateFieldGet(this, _SignerAgent_options, "f").account.compareTo(Principal$1.from(requestBody.sender)) === "eq";
    if (!contentMapMatchesRequest) {
      throw new SignerAgentError(INVALID_RESPONSE_MESSAGE);
    }
    const requestId = requestIdOf(requestBody);
    const certificate = await Certificate.create({
      certificate: response.certificate,
      rootKey: this.rootKey,
      canisterId,
      maxAgeInMinutes: MAX_AGE_IN_MINUTES
    }).catch(() => {
      throw new SignerAgentError(INVALID_RESPONSE_MESSAGE);
    });
    const certificateIsResponseToContentMap = certificate.lookup(["request_status", requestId, "status"]).status === LookupStatus.Found;
    if (!certificateIsResponseToContentMap) {
      throw new SignerAgentError(INVALID_RESPONSE_MESSAGE);
    }
    const requestKey = toBase64(requestId);
    if (__classPrivateFieldGet(this, _SignerAgent_certificates, "f").has(requestKey)) {
      throw new SignerAgentError(INVALID_RESPONSE_MESSAGE);
    }
    __classPrivateFieldGet(this, _SignerAgent_certificates, "f").set(requestKey, response.certificate);
    const now = Date.now();
    const lookupTime = lookupResultToBuffer(certificate.lookup(["time"]));
    if (!lookupTime) {
      throw new SignerAgentError(INVALID_RESPONSE_MESSAGE);
    }
    const certificateTime = Number(lebDecode(new PipeArrayBuffer(lookupTime))) / 1e6;
    const expiry = certificateTime - now + MAX_AGE_IN_MINUTES * 60 * 1e3;
    setTimeout(() => __classPrivateFieldGet(this, _SignerAgent_certificates, "f").delete(requestKey), expiry);
    return {
      requestId,
      response: {
        ok: true,
        status: 202,
        statusText: "Call has been sent over ICRC-25 JSON-RPC",
        body: null,
        headers: []
      }
    };
  }
  async fetchRootKey() {
    return __classPrivateFieldGet(this, _SignerAgent_options, "f").agent.fetchRootKey();
  }
  async getPrincipal() {
    return __classPrivateFieldGet(this, _SignerAgent_options, "f").account;
  }
  async query(canisterId, options) {
    canisterId = Principal$1.from(canisterId);
    const submitResponse = await this.call(canisterId, options);
    const readStateResponse = await this.readState(canisterId, {
      paths: [
        [new TextEncoder().encode("request_status"), submitResponse.requestId]
      ]
    });
    const certificate = await Certificate.create({
      certificate: readStateResponse.certificate,
      rootKey: this.rootKey,
      canisterId
    });
    const status = certificate.lookup([
      "request_status",
      submitResponse.requestId,
      "status"
    ]);
    const reply = certificate.lookup([
      "request_status",
      submitResponse.requestId,
      "reply"
    ]);
    if (status.status !== LookupStatus.Found || new TextDecoder().decode(status.value) !== "replied" || reply.status !== LookupStatus.Found) {
      throw new SignerAgentError("Certificate is missing reply");
    }
    return {
      requestId: submitResponse.requestId,
      status: "replied",
      reply: {
        arg: reply.value
      },
      httpDetails: {
        ok: true,
        status: 202,
        statusText: "Certificate with reply has been received over ICRC-25 JSON-RPC",
        headers: []
      }
    };
  }
  async createReadStateRequest(_options) {
    return {
      body: {
        content: {}
      }
    };
  }
  async readState(_canisterId, options, _identity, _request) {
    if (options.paths.length !== 1 || options.paths[0].length !== 2 || new TextDecoder().decode(options.paths[0][0]) !== "request_status") {
      throw new SignerAgentError("Given paths are not supported");
    }
    const requestId = options.paths[0][1];
    const key = toBase64(requestId);
    const certificate = __classPrivateFieldGet(this, _SignerAgent_certificates, "f").get(key);
    if (!certificate) {
      throw new SignerAgentError("Certificate could not be found");
    }
    return { certificate };
  }
  async status() {
    return __classPrivateFieldGet(this, _SignerAgent_options, "f").agent.status();
  }
  replaceAccount(account) {
    __classPrivateFieldGet(this, _SignerAgent_options, "f").account = account;
  }
  replaceValidation(validation) {
    __classPrivateFieldSet(this, _SignerAgent_validation, validation, "f");
  }
  /**
   * Enable manual triggering of canister calls execution
   */
  batch() {
    __classPrivateFieldSet(this, _SignerAgent_autoBatch, false, "f");
    if (__classPrivateFieldGet(this, _SignerAgent_scheduled, "f").slice(-1)[0].length > 0) {
      __classPrivateFieldGet(this, _SignerAgent_scheduled, "f").push([]);
    }
  }
  /**
   * Clear scheduled canister calls and switch back to automatic canister calls execution
   */
  clear() {
    __classPrivateFieldSet(this, _SignerAgent_scheduled, [[]], "f");
    __classPrivateFieldSet(this, _SignerAgent_autoBatch, true, "f");
  }
}
_a = SignerAgent, _SignerAgent_options = /* @__PURE__ */ new WeakMap(), _SignerAgent_certificates = /* @__PURE__ */ new WeakMap(), _SignerAgent_queue = /* @__PURE__ */ new WeakMap(), _SignerAgent_executeTimeout = /* @__PURE__ */ new WeakMap(), _SignerAgent_scheduled = /* @__PURE__ */ new WeakMap(), _SignerAgent_autoBatch = /* @__PURE__ */ new WeakMap(), _SignerAgent_validation = /* @__PURE__ */ new WeakMap(), _SignerAgent_instances = /* @__PURE__ */ new WeakSet(), _SignerAgent_executeQueue = async function _SignerAgent_executeQueue2(scheduled) {
  await Promise.all(scheduled.flat().map(({ options, resolve, reject }) => __classPrivateFieldGet(this, _SignerAgent_queue, "f").schedule(async () => {
    try {
      const response = await this.signer.callCanister(Object.assign({ sender: __classPrivateFieldGet(this, _SignerAgent_options, "f").account }, options));
      resolve(response);
    } catch (error) {
      reject(error);
    }
  })));
}, _SignerAgent_executeBatch = async function _SignerAgent_executeBatch2(scheduled, validation) {
  await __classPrivateFieldGet(this, _SignerAgent_queue, "f").schedule(async () => {
    try {
      const responses = await this.signer.batchCallCanister({
        sender: __classPrivateFieldGet(this, _SignerAgent_options, "f").account,
        requests: scheduled.map((entries) => entries.map(({ options }) => options)),
        validation: validation !== null && validation !== void 0 ? validation : void 0
      });
      scheduled.forEach((entries, sequenceIndex) => entries.forEach(({ resolve, reject }, requestIndex) => {
        const response = responses[sequenceIndex][requestIndex];
        if ("result" in response) {
          resolve(response.result);
          return;
        }
        if ("error" in response) {
          reject(new SignerAgentError(`${response.error.code}: ${response.error.message}
${JSON.stringify(response.error.data)}`));
          return;
        }
        reject(new SignerAgentError(INVALID_RESPONSE_MESSAGE));
      }));
    } catch (error) {
      scheduled.flat().forEach(({ reject }) => reject(error));
    }
  });
};
_SignerAgent_isInternalConstructing = { value: false };
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
          account: Principal$1.anonymous(),
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
    const storedPrincipal = storage.getItem(this.principalStorageKey);
    if (storedPrincipal && storedPrincipal !== "null") {
      try {
        const principal = Principal$1.fromText(storedPrincipal);
        if (this.signerAgent) {
          this.signerAgent.replaceAccount(principal);
        }
        return principal;
      } catch (e3) {
        storage.removeItem(this.principalStorageKey);
        return null;
      }
    }
    return null;
  }
  async connectWithAccounts() {
    this.connectionAbortController = new AbortController();
    const focusPromise = new Promise((_2, reject) => {
      this.windowFocusHandler = () => {
        windowEvents.removeEventListener("focus", this.windowFocusHandler);
        this.windowFocusHandler = null;
        reject(new Error("Connection cancelled - popup window was closed"));
      };
      windowEvents.addEventListener("focus", this.windowFocusHandler);
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
      storage.setItem(this.principalStorageKey, principal.toText());
      if (this.signerAgent) {
        this.signerAgent.replaceAccount(principal);
      }
      return principal;
    } finally {
      if (this.windowFocusHandler) {
        windowEvents.removeEventListener("focus", this.windowFocusHandler);
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
      windowEvents.removeEventListener("focus", this.windowFocusHandler);
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
    storage.removeItem(this.principalStorageKey);
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
      windowEvents.removeEventListener("focus", this.windowFocusHandler);
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
      storage.removeItem(this.principalStorageKey);
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
        account: Principal$1.anonymous(),
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
    storage.removeItem(this.principalStorageKey);
  }
}
const oisyLogo = "data:image/webp;base64,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";
const nfidLogo = "data:image/webp;base64,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";
const dfinityLogo = "data:image/webp;base64,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";
const plugLogo = "data:image/webp;base64,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";
const stoicLogo = "data:image/jpeg;base64,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";
class BaseDelegationAdapter extends BaseAdapter {
  constructor(args) {
    super(args);
    this.sessionKey = null;
    this.identity = null;
    this.storage = new IdbStorage2();
    this.initializeStorageRestore();
  }
  initializeStorageRestore() {
    this.restoreFromStorage().catch((error) => {
      this.logger.debug(`Failed to restore from storage on init:`, error);
    });
  }
  async restoreFromStorage() {
    try {
      const storedSessionKey = await getIdentity(this.adapter.id, this.storage);
      const delegationChain = await getDelegationChain(this.adapter.id, this.storage);
      if (!storedSessionKey || !delegationChain) {
        this.logger.debug(`[${this.adapter.id}] No session key or delegation chain found in storage.`);
        await this.clearStoredSession();
        return;
      }
      const expiration = delegationChain.delegations[0].delegation.expiration;
      if (expiration < BigInt(Date.now() * 1e6)) {
        this.logger.debug(`[${this.adapter.id}] Stored delegation chain has expired.`);
        await this.clearStoredSession();
        return;
      }
      this.sessionKey = storedSessionKey;
      this.identity = DelegationIdentity.fromDelegation(
        this.sessionKey,
        delegationChain
      );
      await this.onStorageRestored(storedSessionKey, delegationChain);
      this.setState(Adapter.Status.CONNECTED);
    } catch (error) {
      this.logger.error(`[${this.adapter.id}] Error restoring from storage:`, error);
      await this.clearStoredSession();
    }
  }
  async clearStoredSession() {
    this.identity = null;
    this.sessionKey = null;
    await removeIdentity(this.adapter.id, this.storage);
    await removeDelegationChain(this.adapter.id, this.storage);
    await this.onClearStoredSession();
  }
  async storeSession(sessionKey, delegationChain) {
    await setIdentity(this.adapter.id, sessionKey, this.storage);
    await setDelegationChain(this.adapter.id, delegationChain, this.storage);
  }
  // Ensure delegation sessions are cleared on disconnect unless a subclass overrides and skips super
  async disconnectInternal() {
    await super.disconnectInternal();
    await this.clearStoredSession();
  }
  /**
   * Dispose of delegation-specific resources
   * Cleans up storage and identity
   */
  async onDispose() {
    await this.clearStoredSession();
    this.identity = null;
    this.sessionKey = null;
    if (this.storage && "close" in this.storage && typeof this.storage.close === "function") {
      try {
        await this.storage.close();
      } catch (error) {
      }
    }
  }
}
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
  const storage2 = { ...DEFAULTS.storage, ...input.storage };
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
        localStorageKey: storage2.key,
        // Provider IDs
        siwsProviderCanisterId: providers.siws,
        siweProviderCanisterId: providers.siwe,
        frontendCanisterId: providers.frontend,
        // Adapter-specific overrides (excluding 'enabled' and 'config')
        ...Object.fromEntries(
          Object.entries(override || {}).filter(([k2]) => k2 !== "enabled" && k2 !== "config")
        ),
        // Merge user's config overrides last to allow per-adapter customization
        ...override?.config || {}
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
    localStorageKey: storage2.key,
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
      const { timeout: timeout22, targets: targets2 } = optionsOrTimeout;
      this.config.delegation = { timeout: timeout22, targets: targets2 };
      return this;
    }
    const timeout2 = optionsOrTimeout;
    const targets = maybeTargets;
    this.config.delegation = { timeout: timeout2, targets };
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
    const value2 = this.cache.get(key);
    if (value2 !== void 0) {
      this.accessOrder.set(key, ++this.accessCounter);
    }
    return value2;
  }
  /**
   * Set a value in the cache
   * Evicts least recently used item if size limit is reached
   */
  set(key, value2) {
    if (this.cache.has(key)) {
      this.cache.set(key, value2);
      this.accessOrder.set(key, ++this.accessCounter);
      return;
    }
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }
    this.cache.set(key, value2);
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
  setValue(key, value2, ttlMs) {
    const expiry = Date.now() + (ttlMs || this.defaultTTL);
    super.set(key, { value: value2, expiry });
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
    const index2 = Math.ceil(percentile / 100 * durations.length) - 1;
    return durations[Math.max(0, Math.min(index2, durations.length - 1))];
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
let _globalPerformanceMonitor = null;
const globalPerformanceMonitor = new Proxy({}, {
  get(target, prop, receiver) {
    if (!_globalPerformanceMonitor) {
      _globalPerformanceMonitor = new PerformanceMonitor(
        isBrowser && window.location?.hostname === "localhost"
      );
    }
    return Reflect.get(_globalPerformanceMonitor, prop, _globalPerformanceMonitor);
  }
});
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
        config.delegationTargets.forEach((target, index2) => {
          if (typeof target !== "string") {
            errors.push({ field: `delegationTargets[${index2}]`, message: "Delegation target must be a string" });
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
      storage: getStorage(),
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
class BaseMultiChainAdapter extends BaseAdapter {
  constructor() {
    super(...arguments);
    this.currentNetwork = null;
    this.networkAdapters = /* @__PURE__ */ new Map();
  }
  /**
   * Check if the wallet supports a specific network
   */
  supportsNetwork(network) {
    return this.config.supportedNetworks.includes(network);
  }
  /**
   * Get the currently active network
   */
  getCurrentNetwork() {
    return this.currentNetwork;
  }
  async connect() {
    this.setState(Adapter.Status.CONNECTING);
    try {
      this.currentNetwork = await this.detectNetwork();
      this.logger.debug(`Detected network: ${this.currentNetwork.network}`, {
        network: this.currentNetwork,
        wallet: this.adapter.walletName
      });
      if (!this.supportsNetwork(this.currentNetwork.network)) {
        throw new Error(
          `${this.adapter.walletName} is on ${this.currentNetwork.network} which is not supported. Supported networks: ${this.config.supportedNetworks.join(", ")}`
        );
      }
      const networkAdapter = await this.getNetworkAdapter(this.currentNetwork);
      this.networkAdapters.set(this.currentNetwork.network, networkAdapter);
      const account = await networkAdapter.connect();
      this.setState(Adapter.Status.CONNECTED);
      return account;
    } catch (error) {
      this.handleError("Multi-chain connection failed", error);
      this.setState(Adapter.Status.ERROR);
      throw error;
    }
  }
  async disconnect() {
    this.setState(Adapter.Status.DISCONNECTING);
    try {
      for (const [network, adapter] of this.networkAdapters.entries()) {
        try {
          await adapter.disconnect();
        } catch (error) {
          this.logger.warn(`Failed to disconnect ${network} adapter`, {
            error,
            network,
            wallet: this.adapter.walletName
          });
        }
      }
      this.networkAdapters.clear();
      this.currentNetwork = null;
    } catch (error) {
      this.handleError("Multi-chain disconnect failed", error);
    } finally {
      this.setState(Adapter.Status.DISCONNECTED);
    }
  }
  async isConnected() {
    if (!this.currentNetwork) {
      return false;
    }
    const adapter = this.networkAdapters.get(this.currentNetwork.network);
    if (!adapter) {
      return false;
    }
    return adapter.isConnected();
  }
  async getAddresses() {
    if (!this.currentNetwork) {
      throw new Error("Not connected to any network");
    }
    const adapter = this.networkAdapters.get(this.currentNetwork.network);
    if (!adapter) {
      throw new Error("Network adapter not initialized");
    }
    const addresses = await adapter.getAddresses();
    return {
      ...addresses,
      currentNetwork: this.currentNetwork.network,
      chainId: this.currentNetwork.chainId
    };
  }
  async getPrincipal() {
    const activeAdapter = this.getActiveAdapter();
    return activeAdapter.getPrincipal();
  }
  async getAccountId() {
    const activeAdapter = this.getActiveAdapter();
    return activeAdapter.getAccountId();
  }
  /**
   * Get the currently active network adapter
   * @throws {Error} If not connected or adapter not found
   */
  getActiveAdapter() {
    if (!this.currentNetwork) {
      throw new Error("Not connected to any network");
    }
    const adapter = this.networkAdapters.get(this.currentNetwork.network);
    if (!adapter) {
      throw new Error(`No adapter found for network: ${this.currentNetwork.network}`);
    }
    return adapter;
  }
  createActorInternal(canisterId, idl, options) {
    const activeAdapter = this.getActiveAdapter();
    return activeAdapter.createActor(canisterId, idl, options);
  }
  /**
   * Switch to a different network (if supported by the wallet)
   * Optional method that wallets can implement if they support programmatic network switching
   */
  async switchNetwork(targetNetwork) {
    throw new Error(`Network switching not implemented for ${this.adapter.walletName}`);
  }
  async onDispose() {
    for (const adapter of this.networkAdapters.values()) {
      if ("dispose" in adapter && typeof adapter.dispose === "function") {
        await adapter.dispose();
      }
    }
    this.networkAdapters.clear();
  }
}
class BaseSiwxAdapter extends BaseDelegationAdapter {
  /** Resolve provider canister ID from multiple possible keys for backwards compatibility */
  resolveProviderCanisterId() {
    const cfg = this.config;
    const canisterId = cfg.providerCanisterId || cfg.siwsProviderCanisterId || cfg.siweProviderCanisterId;
    if (!canisterId) {
      throw new Error("Provider canister ID not configured.");
    }
    return String(canisterId);
  }
  /** Create a provider actor using the standard agent settings from base config */
  async createProviderActor(idlFactory, identity) {
    const agent = await this.buildHttpAgent({ identity });
    return this.createActorWithAgent(agent, this.resolveProviderCanisterId(), idlFactory);
  }
  /**
   * Build a DelegationIdentity from a signed delegation returned by a provider
   */
  createDelegationIdentity(signedDelegation, sessionIdentity, userCanisterPublicKeyDer) {
    const delegation = new Delegation(
      signedDelegation.delegation.pubkey.slice().buffer,
      signedDelegation.delegation.expiration,
      signedDelegation.delegation.targets?.length > 0 ? signedDelegation.delegation.targets[0] : void 0
    );
    const delegations = [
      {
        delegation,
        signature: signedDelegation.signature.slice().buffer
      }
    ];
    const delegationChain = DelegationChain.fromDelegations(
      delegations,
      new Uint8Array(userCanisterPublicKeyDer).buffer
    );
    return DelegationIdentity.fromDelegation(sessionIdentity, delegationChain);
  }
  // ----- Simple address storage helpers -----
  async storeExternalAddress(key, value2) {
    try {
      await this.storage.set(key, value2);
    } catch {
    }
  }
  async readExternalAddress(key) {
    try {
      const val = await this.storage.get(key);
      return typeof val === "string" ? val : null;
    } catch {
      return null;
    }
  }
  // Provide default no-op implementations so subclasses override only when needed
  async onStorageRestored(_sessionKey, _delegationChain) {
  }
  async onClearStoredSession() {
  }
}
const _PNP = class _PNP {
  /**
   * Register a new adapter globally. Call before PNP instantiation to make available to all instances.
   * @param id - Adapter id (unique key)
   * @param config - Adapter configuration object
   * @example
   * ```typescript
   * PNP.registerAdapter('customWallet', {
   *   label: 'Custom Wallet',
   *   enabled: true,
   *   adapterClass: CustomWalletAdapter
   * });
   * ```
   */
  static registerAdapter(id, config) {
    _PNP.adapterRegistry[id] = config;
  }
  /**
   * Unregister an adapter by id.
   * @param id - Adapter id to remove
   */
  static unregisterAdapter(id) {
    delete _PNP.adapterRegistry[id];
  }
  /**
   * Get all registered adapters.
   * @returns Object containing all registered adapters
   */
  static getRegisteredAdapters() {
    return { ..._PNP.adapterRegistry };
  }
  /**
   * Creates a new PNP instance.
   * @param config - Configuration object for PNP
   */
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
  /**
   * Opens authentication channel for Safari compatibility.
   * Must be called before connect() in Safari to prevent popup blocking.
   * @returns Promise that resolves when channel is opened
   * @example
   * ```typescript
   * // Safari requires channel opening before user action completes
   * button.onclick = async () => {
   *   await pnp.openChannel(); // Initialize AuthClient early
   *   await pnp.connect('ii'); // Popup opens without blocking
   * };
   * ```
   */
  async openChannel() {
    await this.connectionManager.openChannel();
  }
  /**
   * Get the current configuration object.
   * @returns {GlobalPnpConfig} Current configuration
   */
  get config() {
    return this.configManager.getConfig();
  }
  /**
   * Get the currently active adapter.
   * @returns {AdapterConfig | null} Active adapter or null if not connected
   */
  get adapter() {
    return this.connectionManager.adapter;
  }
  /**
   * Get the current wallet provider instance.
   * @returns {any} Provider instance or null
   */
  get provider() {
    return this.connectionManager.provider;
  }
  /**
   * Get the connected wallet account details.
   * @returns {WalletAccount | null} Account details or null if not connected
   */
  get account() {
    return this.connectionManager.account;
  }
  /**
   * Get the current connection status.
   * @returns {any} Connection status
   */
  get status() {
    return this.connectionManager.status;
  }
  /**
   * Connect to a wallet adapter.
   * @param walletId - Optional wallet adapter ID to connect to
   * @returns Connected account or null
   * @throws If connection fails
   * @example
   * ```typescript
   * // Connect to Internet Identity
   * const account = await pnp.connect('ii');
   * console.log('Connected:', account.principal);
   * ```
   */
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
  /**
   * Disconnect from the current wallet.
   * @returns Promise that resolves when disconnected
   * @throws If disconnection fails
   */
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
  /**
   * Get an actor for interacting with a canister.
   * @template T - Actor interface type
   * @param {GetActorOptions} options - Actor creation options
   * @returns {ActorSubclass<T>} Actor instance
   * @example
   * ```typescript
   * const actor = pnp.getActor<MyCanisterInterface>({
   *   canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
   *   idl: MyCanisterIDL
   * });
   * ```
   */
  getActor(options) {
    return this.actorManager.getActor(options);
  }
  /**
   * Get an ICRC actor for token operations.
   * @template T - Actor interface type
   * @param {string} canisterId - Canister ID of the ICRC token
   * @param {Object} [options] - Optional configuration
   * @param {boolean} [options.anon=false] - Use anonymous actor
   * @param {boolean} [options.requiresSigning=false] - Require signing capability
   * @returns {ActorSubclass<T>} ICRC actor instance
   * @example
   * ```typescript
   * const tokenActor = pnp.getIcrcActor('ryjl3-tyaaa-aaaaa-aaaba-cai');
   * const balance = await tokenActor.icrc1_balance_of({ owner: principal, subaccount: [] });
   * ```
   */
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
  /**
   * Check if user is authenticated with a wallet.
   * @returns {boolean} True if authenticated, false otherwise
   */
  isAuthenticated() {
    return this.connectionManager.isAuthenticated();
  }
  /**
   * Get list of enabled wallet adapters.
   * @returns {AdapterConfig[]} Array of enabled adapter configurations
   * @example
   * ```typescript
   * const wallets = pnp.getEnabledWallets();
   * wallets.forEach(wallet => {
   *   console.log(`${wallet.label}: ${wallet.id}`);
   * });
   * ```
   */
  getEnabledWallets() {
    return Object.entries(this.config.adapters).filter(([_2, wallet]) => wallet?.enabled !== false).map(([id, wallet]) => ({
      ...wallet,
      id: wallet.id || id
      // Ensure id is always present
    }));
  }
  /**
   * Get performance metrics and cache statistics.
   * @returns {Object} Performance statistics including cache stats, metrics, and timings
   * @returns {Object} returns.cache - Actor cache statistics
   * @returns {Object} returns.performance - Performance metrics
   * @returns {Object} returns.timings - Timing report
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
  Adapter,
  BaseAdapter,
  BaseDelegationAdapter,
  BaseMultiChainAdapter,
  BaseSignerAdapter,
  BaseSiwxAdapter,
  ConfigBuilder,
  PNP,
  PnpState,
  createAdapterExtension,
  createPNP,
  createPNPConfig,
  deriveAccountId,
  formatSiwsMessage
};
