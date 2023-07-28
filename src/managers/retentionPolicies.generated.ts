import { serializeRetentionPolicies } from "../schemas.generated.js";
import { deserializeRetentionPolicies } from "../schemas.generated.js";
import { serializeClientError } from "../schemas.generated.js";
import { deserializeClientError } from "../schemas.generated.js";
import { serializeRetentionPolicy } from "../schemas.generated.js";
import { deserializeRetentionPolicy } from "../schemas.generated.js";
import { serializeUserMini } from "../schemas.generated.js";
import { deserializeUserMini } from "../schemas.generated.js";
import { RetentionPolicies } from "../schemas.generated.js";
import { ClientError } from "../schemas.generated.js";
import { RetentionPolicy } from "../schemas.generated.js";
import { UserMini } from "../schemas.generated.js";
import { Authentication } from "../auth.js";
import { NetworkSession } from "../network.js";
import { prepareParams } from "../utils.js";
import { toString } from "../utils.js";
import { fetch } from "../fetch.js";
import { FetchOptions } from "../fetch.js";
import { FetchResponse } from "../fetch.js";
import { deserializeJson } from "../json.js";
import { Json } from "../json.js";
import { serializeJson } from "../json.js";
import { isJson } from "../json.js";
export type GetRetentionPoliciesQueryParamsArgPolicyTypeField = "finite" | "indefinite";
export interface GetRetentionPoliciesQueryParamsArg {
    readonly policyName?: string;
    readonly policyType?: GetRetentionPoliciesQueryParamsArgPolicyTypeField;
    readonly createdByUserId?: string;
    readonly fields?: string;
    readonly limit?: number;
    readonly marker?: string;
}
export type CreateRetentionPolicyRequestBodyArgPolicyTypeField = "finite" | "indefinite";
export type CreateRetentionPolicyRequestBodyArgDispositionActionField = "permanently_delete" | "remove_retention";
export type CreateRetentionPolicyRequestBodyArgRetentionTypeField = "modifiable" | "non-modifiable";
export interface CreateRetentionPolicyRequestBodyArg {
    readonly policyName: string;
    readonly description?: string;
    readonly policyType: CreateRetentionPolicyRequestBodyArgPolicyTypeField;
    readonly dispositionAction: CreateRetentionPolicyRequestBodyArgDispositionActionField;
    readonly retentionLength?: string;
    readonly retentionType?: CreateRetentionPolicyRequestBodyArgRetentionTypeField;
    readonly canOwnerExtendRetention?: boolean;
    readonly areOwnersNotified?: boolean;
    readonly customNotificationRecipients?: readonly UserMini[];
}
export interface GetRetentionPolicyByIdQueryParamsArg {
    readonly fields?: string;
}
export type UpdateRetentionPolicyByIdRequestBodyArgDispositionActionField = "permanently_delete" | "remove_retention";
export interface UpdateRetentionPolicyByIdRequestBodyArg {
    readonly policyName?: string;
    readonly description?: string;
    readonly dispositionAction?: UpdateRetentionPolicyByIdRequestBodyArgDispositionActionField;
    readonly retentionType?: string;
    readonly retentionLength?: string;
    readonly status?: string;
    readonly canOwnerExtendRetention?: boolean;
    readonly areOwnersNotified?: boolean;
    readonly customNotificationRecipients?: readonly UserMini[];
}
export class RetentionPoliciesManager {
    readonly auth?: Authentication;
    readonly networkSession?: NetworkSession;
    constructor(fields: Omit<RetentionPoliciesManager, "getRetentionPolicies" | "createRetentionPolicy" | "getRetentionPolicyById" | "updateRetentionPolicyById" | "deleteRetentionPolicyById">) {
        Object.assign(this, fields);
    }
    async getRetentionPolicies(queryParams: GetRetentionPoliciesQueryParamsArg = {} satisfies GetRetentionPoliciesQueryParamsArg): Promise<RetentionPolicies> {
        const queryParamsMap: {
            readonly [key: string]: string;
        } = prepareParams({ ["policy_name"]: toString(queryParams.policyName), ["policy_type"]: toString(queryParams.policyType), ["created_by_user_id"]: toString(queryParams.createdByUserId), ["fields"]: toString(queryParams.fields), ["limit"]: toString(queryParams.limit), ["marker"]: toString(queryParams.marker) });
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/retention_policies") as string, { method: "GET", params: queryParamsMap, auth: this.auth, networkSession: this.networkSession } satisfies FetchOptions) as FetchResponse;
        return deserializeRetentionPolicies(deserializeJson(response.text));
    }
    async createRetentionPolicy(requestBody: CreateRetentionPolicyRequestBodyArg): Promise<RetentionPolicy> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/retention_policies") as string, { method: "POST", body: serializeJson(serializeCreateRetentionPolicyRequestBodyArg(requestBody)), contentType: "application/json", auth: this.auth, networkSession: this.networkSession } satisfies FetchOptions) as FetchResponse;
        return deserializeRetentionPolicy(deserializeJson(response.text));
    }
    async getRetentionPolicyById(retentionPolicyId: string, queryParams: GetRetentionPolicyByIdQueryParamsArg = {} satisfies GetRetentionPolicyByIdQueryParamsArg): Promise<RetentionPolicy> {
        const queryParamsMap: {
            readonly [key: string]: string;
        } = prepareParams({ ["fields"]: toString(queryParams.fields) });
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/retention_policies/", retentionPolicyId) as string, { method: "GET", params: queryParamsMap, auth: this.auth, networkSession: this.networkSession } satisfies FetchOptions) as FetchResponse;
        return deserializeRetentionPolicy(deserializeJson(response.text));
    }
    async updateRetentionPolicyById(retentionPolicyId: string, requestBody: UpdateRetentionPolicyByIdRequestBodyArg): Promise<RetentionPolicy> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/retention_policies/", retentionPolicyId) as string, { method: "PUT", body: serializeJson(serializeUpdateRetentionPolicyByIdRequestBodyArg(requestBody)), contentType: "application/json", auth: this.auth, networkSession: this.networkSession } satisfies FetchOptions) as FetchResponse;
        return deserializeRetentionPolicy(deserializeJson(response.text));
    }
    async deleteRetentionPolicyById(retentionPolicyId: string): Promise<any> {
        const response: FetchResponse = await fetch("".concat("https://api.box.com/2.0/retention_policies/", retentionPolicyId) as string, { method: "DELETE", auth: this.auth, networkSession: this.networkSession } satisfies FetchOptions) as FetchResponse;
        return response.content;
    }
}
export function serializeGetRetentionPoliciesQueryParamsArgPolicyTypeField(val: GetRetentionPoliciesQueryParamsArgPolicyTypeField): Json {
    return val;
}
export function deserializeGetRetentionPoliciesQueryParamsArgPolicyTypeField(val: any): GetRetentionPoliciesQueryParamsArgPolicyTypeField {
    if (!isJson(val, "string")) {
        throw "Expecting a string for \"GetRetentionPoliciesQueryParamsArgPolicyTypeField\"";
    }
    if (val == "finite") {
        return "finite";
    }
    if (val == "indefinite") {
        return "indefinite";
    }
    throw "".concat("Invalid value: ", val) as string;
}
export function serializeGetRetentionPoliciesQueryParamsArg(val: GetRetentionPoliciesQueryParamsArg): Json {
    return { ["policy_name"]: val.policyName, ["policy_type"]: val.policyType == void 0 ? void 0 : serializeGetRetentionPoliciesQueryParamsArgPolicyTypeField(val.policyType), ["created_by_user_id"]: val.createdByUserId, ["fields"]: val.fields, ["limit"]: val.limit, ["marker"]: val.marker };
}
export function deserializeGetRetentionPoliciesQueryParamsArg(val: any): GetRetentionPoliciesQueryParamsArg {
    const policyName: undefined | string = isJson(val.policy_name, "string") ? val.policy_name : void 0;
    const policyType: undefined | GetRetentionPoliciesQueryParamsArgPolicyTypeField = val.policy_type == void 0 ? void 0 : deserializeGetRetentionPoliciesQueryParamsArgPolicyTypeField(val.policy_type);
    const createdByUserId: undefined | string = isJson(val.created_by_user_id, "string") ? val.created_by_user_id : void 0;
    const fields: undefined | string = isJson(val.fields, "string") ? val.fields : void 0;
    const limit: undefined | number = isJson(val.limit, "number") ? val.limit : void 0;
    const marker: undefined | string = isJson(val.marker, "string") ? val.marker : void 0;
    return { policyName: policyName, policyType: policyType, createdByUserId: createdByUserId, fields: fields, limit: limit, marker: marker } satisfies GetRetentionPoliciesQueryParamsArg;
}
export function serializeCreateRetentionPolicyRequestBodyArgPolicyTypeField(val: CreateRetentionPolicyRequestBodyArgPolicyTypeField): Json {
    return val;
}
export function deserializeCreateRetentionPolicyRequestBodyArgPolicyTypeField(val: any): CreateRetentionPolicyRequestBodyArgPolicyTypeField {
    if (!isJson(val, "string")) {
        throw "Expecting a string for \"CreateRetentionPolicyRequestBodyArgPolicyTypeField\"";
    }
    if (val == "finite") {
        return "finite";
    }
    if (val == "indefinite") {
        return "indefinite";
    }
    throw "".concat("Invalid value: ", val) as string;
}
export function serializeCreateRetentionPolicyRequestBodyArgDispositionActionField(val: CreateRetentionPolicyRequestBodyArgDispositionActionField): Json {
    return val;
}
export function deserializeCreateRetentionPolicyRequestBodyArgDispositionActionField(val: any): CreateRetentionPolicyRequestBodyArgDispositionActionField {
    if (!isJson(val, "string")) {
        throw "Expecting a string for \"CreateRetentionPolicyRequestBodyArgDispositionActionField\"";
    }
    if (val == "permanently_delete") {
        return "permanently_delete";
    }
    if (val == "remove_retention") {
        return "remove_retention";
    }
    throw "".concat("Invalid value: ", val) as string;
}
export function serializeCreateRetentionPolicyRequestBodyArgRetentionTypeField(val: CreateRetentionPolicyRequestBodyArgRetentionTypeField): Json {
    return val;
}
export function deserializeCreateRetentionPolicyRequestBodyArgRetentionTypeField(val: any): CreateRetentionPolicyRequestBodyArgRetentionTypeField {
    if (!isJson(val, "string")) {
        throw "Expecting a string for \"CreateRetentionPolicyRequestBodyArgRetentionTypeField\"";
    }
    if (val == "modifiable") {
        return "modifiable";
    }
    if (val == "non-modifiable") {
        return "non-modifiable";
    }
    throw "".concat("Invalid value: ", val) as string;
}
export function serializeCreateRetentionPolicyRequestBodyArg(val: CreateRetentionPolicyRequestBodyArg): Json {
    return { ["policy_name"]: val.policyName, ["description"]: val.description, ["policy_type"]: serializeCreateRetentionPolicyRequestBodyArgPolicyTypeField(val.policyType), ["disposition_action"]: serializeCreateRetentionPolicyRequestBodyArgDispositionActionField(val.dispositionAction), ["retention_length"]: val.retentionLength, ["retention_type"]: val.retentionType == void 0 ? void 0 : serializeCreateRetentionPolicyRequestBodyArgRetentionTypeField(val.retentionType), ["can_owner_extend_retention"]: val.canOwnerExtendRetention, ["are_owners_notified"]: val.areOwnersNotified, ["custom_notification_recipients"]: val.customNotificationRecipients == void 0 ? void 0 : val.customNotificationRecipients.map(function (item: UserMini): any {
            return serializeUserMini(item);
        }) as readonly any[] };
}
export function deserializeCreateRetentionPolicyRequestBodyArg(val: any): CreateRetentionPolicyRequestBodyArg {
    const policyName: string = val.policy_name;
    const description: undefined | string = isJson(val.description, "string") ? val.description : void 0;
    const policyType: CreateRetentionPolicyRequestBodyArgPolicyTypeField = deserializeCreateRetentionPolicyRequestBodyArgPolicyTypeField(val.policy_type);
    const dispositionAction: CreateRetentionPolicyRequestBodyArgDispositionActionField = deserializeCreateRetentionPolicyRequestBodyArgDispositionActionField(val.disposition_action);
    const retentionLength: undefined | string = isJson(val.retention_length, "string") ? val.retention_length : void 0;
    const retentionType: undefined | CreateRetentionPolicyRequestBodyArgRetentionTypeField = val.retention_type == void 0 ? void 0 : deserializeCreateRetentionPolicyRequestBodyArgRetentionTypeField(val.retention_type);
    const canOwnerExtendRetention: undefined | boolean = isJson(val.can_owner_extend_retention, "boolean") ? val.can_owner_extend_retention : void 0;
    const areOwnersNotified: undefined | boolean = isJson(val.are_owners_notified, "boolean") ? val.are_owners_notified : void 0;
    const customNotificationRecipients: undefined | readonly UserMini[] = isJson(val.custom_notification_recipients, "array") ? val.custom_notification_recipients.map(function (itm: Json): any {
        return deserializeUserMini(itm);
    }) as readonly any[] : void 0;
    return { policyName: policyName, description: description, policyType: policyType, dispositionAction: dispositionAction, retentionLength: retentionLength, retentionType: retentionType, canOwnerExtendRetention: canOwnerExtendRetention, areOwnersNotified: areOwnersNotified, customNotificationRecipients: customNotificationRecipients } satisfies CreateRetentionPolicyRequestBodyArg;
}
export function serializeGetRetentionPolicyByIdQueryParamsArg(val: GetRetentionPolicyByIdQueryParamsArg): Json {
    return { ["fields"]: val.fields };
}
export function deserializeGetRetentionPolicyByIdQueryParamsArg(val: any): GetRetentionPolicyByIdQueryParamsArg {
    const fields: undefined | string = isJson(val.fields, "string") ? val.fields : void 0;
    return { fields: fields } satisfies GetRetentionPolicyByIdQueryParamsArg;
}
export function serializeUpdateRetentionPolicyByIdRequestBodyArgDispositionActionField(val: UpdateRetentionPolicyByIdRequestBodyArgDispositionActionField): Json {
    return val;
}
export function deserializeUpdateRetentionPolicyByIdRequestBodyArgDispositionActionField(val: any): UpdateRetentionPolicyByIdRequestBodyArgDispositionActionField {
    if (!isJson(val, "string")) {
        throw "Expecting a string for \"UpdateRetentionPolicyByIdRequestBodyArgDispositionActionField\"";
    }
    if (val == "permanently_delete") {
        return "permanently_delete";
    }
    if (val == "remove_retention") {
        return "remove_retention";
    }
    throw "".concat("Invalid value: ", val) as string;
}
export function serializeUpdateRetentionPolicyByIdRequestBodyArg(val: UpdateRetentionPolicyByIdRequestBodyArg): Json {
    return { ["policy_name"]: val.policyName, ["description"]: val.description, ["disposition_action"]: val.dispositionAction == void 0 ? void 0 : serializeUpdateRetentionPolicyByIdRequestBodyArgDispositionActionField(val.dispositionAction), ["retention_type"]: val.retentionType, ["retention_length"]: val.retentionLength, ["status"]: val.status, ["can_owner_extend_retention"]: val.canOwnerExtendRetention, ["are_owners_notified"]: val.areOwnersNotified, ["custom_notification_recipients"]: val.customNotificationRecipients == void 0 ? void 0 : val.customNotificationRecipients.map(function (item: UserMini): any {
            return serializeUserMini(item);
        }) as readonly any[] };
}
export function deserializeUpdateRetentionPolicyByIdRequestBodyArg(val: any): UpdateRetentionPolicyByIdRequestBodyArg {
    const policyName: undefined | string = isJson(val.policy_name, "string") ? val.policy_name : void 0;
    const description: undefined | string = isJson(val.description, "string") ? val.description : void 0;
    const dispositionAction: undefined | UpdateRetentionPolicyByIdRequestBodyArgDispositionActionField = val.disposition_action == void 0 ? void 0 : deserializeUpdateRetentionPolicyByIdRequestBodyArgDispositionActionField(val.disposition_action);
    const retentionType: undefined | string = isJson(val.retention_type, "string") ? val.retention_type : void 0;
    const retentionLength: undefined | string = isJson(val.retention_length, "string") ? val.retention_length : void 0;
    const status: undefined | string = isJson(val.status, "string") ? val.status : void 0;
    const canOwnerExtendRetention: undefined | boolean = isJson(val.can_owner_extend_retention, "boolean") ? val.can_owner_extend_retention : void 0;
    const areOwnersNotified: undefined | boolean = isJson(val.are_owners_notified, "boolean") ? val.are_owners_notified : void 0;
    const customNotificationRecipients: undefined | readonly UserMini[] = isJson(val.custom_notification_recipients, "array") ? val.custom_notification_recipients.map(function (itm: Json): any {
        return deserializeUserMini(itm);
    }) as readonly any[] : void 0;
    return { policyName: policyName, description: description, dispositionAction: dispositionAction, retentionType: retentionType, retentionLength: retentionLength, status: status, canOwnerExtendRetention: canOwnerExtendRetention, areOwnersNotified: areOwnersNotified, customNotificationRecipients: customNotificationRecipients } satisfies UpdateRetentionPolicyByIdRequestBodyArg;
}
