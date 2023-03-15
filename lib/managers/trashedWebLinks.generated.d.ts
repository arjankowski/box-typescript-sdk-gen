import { DeveloperTokenAuth } from "../developerTokenAuth.js";
import { CcgAuth } from "../ccgAuth.js";
export type TrashedWebLinksManagerAuthField = DeveloperTokenAuth | CcgAuth;
export interface GetWebLinksIdTrashOptionsArg {
    readonly fields?: string;
}
export declare class TrashedWebLinksManager {
    readonly auth: TrashedWebLinksManagerAuthField;
    constructor(fields: Omit<TrashedWebLinksManager, "getWebLinksIdTrash" | "deleteWebLinksIdTrash">);
    getWebLinksIdTrash(webLinkId: string, options?: GetWebLinksIdTrashOptionsArg): Promise<any>;
    deleteWebLinksIdTrash(webLinkId: string): Promise<any>;
}
