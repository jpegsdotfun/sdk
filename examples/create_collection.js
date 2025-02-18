"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var create_collection_1 = require("../dist/create_collection");
var client_1 = require("../dist/client");
var web3_js_1 = require("@solana/web3.js");
function exampleCreateCollection() {
    return __awaiter(this, void 0, void 0, function () {
        var privateKey, client, collectionData, _a, collectionResult, txResult, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    privateKey = "SwxyRZsc6CAZ7J6YUSmigha223aZA7hbLFjNyJWwJPiTvDjbX8ZCG6vDHWybzJEL4epqNinvAzVgZdLY4yTfHc5";
                    if (!privateKey)
                        throw new Error("PRIVATE_KEY is not set");
                    console.debug("Private key is set.");
                    client = new client_1.Client(web3_js_1.Keypair.fromSecretKey(Uint8Array.from(base58Decode(privateKey))));
                    console.debug("Client created with public key:", client.getPublicKey());
                    return [4 /*yield*/, client.init()];
                case 1:
                    _b.sent();
                    console.debug("Client initialized.");
                    collectionData = {
                        name: "My Awesome Collection",
                        symbol: "MAC",
                        description: "This is a description of my awesome collection.",
                        imageUrl: "https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?w=537&ssl=1",
                        tokens: [
                            {
                                imageUrl: "https://img.freepik.com/photos-premium/gros-plan-image-oeil_908985-45878.jpg?w=740",
                                attributes: [
                                    { trait_type: "Eyes", value: "Orange in sea" },
                                    { trait_type: "Size", value: "Middle" },
                                ],
                                amount: 200,
                            },
                            {
                                imageUrl: "https://img.freepik.com/photos-premium/portrait-oeil-dans-cadre-univers-dans-style-paysages-collage-photo_921860-82233.jpg?w=740",
                                attributes: [
                                    { trait_type: "Eyes", value: "Yellow in sea" },
                                    { trait_type: "Size", value: "Middle" },
                                ],
                                amount: 300,
                            },
                            {
                                imageUrl: "https://img.freepik.com/photos-premium/gros-plan-oeil_777078-28287.jpg?w=740",
                                attributes: [
                                    { trait_type: "Eyes", value: "Orange in sky" },
                                    { trait_type: "Size", value: "Small" },
                                ],
                                amount: 500,
                            },
                        ],
                        totalSupply: 1000,
                        royaltiesBps: 100,
                    };
                    console.debug("Collection data prepared:", collectionData);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, create_collection_1.createCollection)(client, collectionData)];
                case 3:
                    _a = _b.sent(), collectionResult = _a.collectionResult, txResult = _a.txResult;
                    console.log("Collection created successfully:", collectionResult);
                    console.log("Transaction created successfully:", txResult);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.error("Error creating collection:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exampleCreateCollection();
////////////////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////////////////
function base58Decode(string) {
    var BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    var base = BigInt(58);
    var num = BigInt(0);
    for (var i = 0; i < string.length; i++) {
        num = num * base + BigInt(BASE58_ALPHABET.indexOf(string[i]));
    }
    var bytes = [];
    while (num > BigInt(0)) {
        bytes.unshift(Number(num & BigInt(255)));
        num = num >> BigInt(8);
    }
    // Add leading zeros
    for (var i = 0; i < string.length && string[i] === "1"; i++) {
        bytes.unshift(0);
    }
    return new Uint8Array(bytes);
}
