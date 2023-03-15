import { Classification } from "../schemas.generated.js";
import { deserializeClassification } from "../schemas.generated.js";
import { serializeClassification } from "../schemas.generated.js";
import { ClientError } from "../schemas.generated.js";
import { deserializeClientError } from "../schemas.generated.js";
import { serializeClientError } from "../schemas.generated.js";
import { DeveloperTokenAuth } from "../developerTokenAuth.js";
import { CcgAuth } from "../ccgAuth.js";
import { fetch } from "../fetch.js";
import { FetchOptions } from "../fetch.js";
import { FetchResponse } from "../fetch.js";
import { deserializeJson } from "../json.js";
import { Json } from "../json.js";
export type FolderClassificationsManagerAuthField = DeveloperTokenAuth | CcgAuth;
export interface PostFoldersIdMetadataEnterpriseSecurityClassification6VmVochwUWoRequestBodyArg {
    readonly boxSecurityClassificationKey?: string;
}
export class FolderClassificationsManager {
    readonly auth!: FolderClassificationsManagerAuthField;
    constructor(fields: Omit<FolderClassificationsManager, "getFoldersIdMetadataEnterpriseSecurityClassification6VmVochwUWo" | "postFoldersIdMetadataEnterpriseSecurityClassification6VmVochwUWo" | "deleteFoldersIdMetadataEnterpriseSecurityClassification6VmVochwUWo">) {
        Object.assign(this, fields);
    }
    async getFoldersIdMetadataEnterpriseSecurityClassification6VmVochwUWo(folderId: string): Promise<any> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/folders/", folderId, "/metadata/enterprise/securityClassification-6VMVochwUWo") as string, { method: "GET", auth: this.auth } satisfies FetchOptions) as FetchResponse;
        return await deserializeClassification(await deserializeJson(response.text));
    }
    async postFoldersIdMetadataEnterpriseSecurityClassification6VmVochwUWo(folderId: string, requestBody: PostFoldersIdMetadataEnterpriseSecurityClassification6VmVochwUWoRequestBodyArg): Promise<any> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/folders/", folderId, "/metadata/enterprise/securityClassification-6VMVochwUWo") as string, { method: "POST", body: JSON.stringify(requestBody), auth: this.auth } satisfies FetchOptions) as FetchResponse;
        return await deserializeClassification(await deserializeJson(response.text));
    }
    async deleteFoldersIdMetadataEnterpriseSecurityClassification6VmVochwUWo(folderId: string): Promise<any> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/folders/", folderId, "/metadata/enterprise/securityClassification-6VMVochwUWo") as string, { method: "DELETE", auth: this.auth } satisfies FetchOptions) as FetchResponse;
        return response.content;
    }
}
