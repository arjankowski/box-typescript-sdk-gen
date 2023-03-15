import { FolderLocks } from "../schemas.generated.js";
import { deserializeFolderLocks } from "../schemas.generated.js";
import { serializeFolderLocks } from "../schemas.generated.js";
import { ClientError } from "../schemas.generated.js";
import { deserializeClientError } from "../schemas.generated.js";
import { serializeClientError } from "../schemas.generated.js";
import { FolderLock } from "../schemas.generated.js";
import { deserializeFolderLock } from "../schemas.generated.js";
import { serializeFolderLock } from "../schemas.generated.js";
import { DeveloperTokenAuth } from "../developerTokenAuth.js";
import { CcgAuth } from "../ccgAuth.js";
import { fetch } from "../fetch.js";
import { FetchOptions } from "../fetch.js";
import { FetchResponse } from "../fetch.js";
import { deserializeJson } from "../json.js";
import { Json } from "../json.js";
export type FolderLocksManagerAuthField = DeveloperTokenAuth | CcgAuth;
export interface PostFolderLocksRequestBodyArgLockedOperationsField {
    readonly move: boolean;
    readonly delete: boolean;
}
export interface PostFolderLocksRequestBodyArgFolderField {
    readonly type: string;
    readonly id: string;
}
export interface PostFolderLocksRequestBodyArg {
    readonly lockedOperations?: PostFolderLocksRequestBodyArgLockedOperationsField;
    readonly folder: PostFolderLocksRequestBodyArgFolderField;
}
export class FolderLocksManager {
    readonly auth!: FolderLocksManagerAuthField;
    constructor(fields: Omit<FolderLocksManager, "getFolderLocks" | "postFolderLocks" | "deleteFolderLocksId">) {
        Object.assign(this, fields);
    }
    async getFolderLocks(folderId: string): Promise<any> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/folder_locks") as string, { method: "GET", params: { ["folder_id"]: folderId }, auth: this.auth } satisfies FetchOptions) as FetchResponse;
        return await deserializeFolderLocks(await deserializeJson(response.text));
    }
    async postFolderLocks(requestBody: PostFolderLocksRequestBodyArg): Promise<any> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/folder_locks") as string, { method: "POST", body: JSON.stringify(requestBody), auth: this.auth } satisfies FetchOptions) as FetchResponse;
        return await deserializeFolderLock(await deserializeJson(response.text));
    }
    async deleteFolderLocksId(folderLockId: string): Promise<any> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/folder_locks/", folderLockId) as string, { method: "DELETE", auth: this.auth } satisfies FetchOptions) as FetchResponse;
        return response.content;
    }
}
