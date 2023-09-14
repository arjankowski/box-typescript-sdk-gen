import { serializeFiles } from '../schemas.generated.js';
import { deserializeFiles } from '../schemas.generated.js';
import { serializeUploadFileRequestBodyArgAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyArgAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyArgAttributesFieldParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyArgAttributesFieldParentField } from '../managers/uploads.generated.js';
import { serializeMetadatas } from '../schemas.generated.js';
import { deserializeMetadatas } from '../schemas.generated.js';
import { serializeMetadata } from '../schemas.generated.js';
import { deserializeMetadata } from '../schemas.generated.js';
import { serializeMetadataFull } from '../schemas.generated.js';
import { deserializeMetadataFull } from '../schemas.generated.js';
import { serializeUpdateFileMetadataByIdRequestBodyArg } from '../managers/fileMetadata.generated.js';
import { deserializeUpdateFileMetadataByIdRequestBodyArg } from '../managers/fileMetadata.generated.js';
import { serializeUpdateFileMetadataByIdRequestBodyArgOpField } from '../managers/fileMetadata.generated.js';
import { deserializeUpdateFileMetadataByIdRequestBodyArgOpField } from '../managers/fileMetadata.generated.js';
import { Files } from '../schemas.generated.js';
import { UploadFileRequestBodyArg } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyArgAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyArgAttributesFieldParentField } from '../managers/uploads.generated.js';
import { Metadatas } from '../schemas.generated.js';
import { Metadata } from '../schemas.generated.js';
import { MetadataFull } from '../schemas.generated.js';
import { UpdateFileMetadataByIdRequestBodyArg } from '../managers/fileMetadata.generated.js';
import { UpdateFileMetadataByIdRequestBodyArgOpField } from '../managers/fileMetadata.generated.js';
import { decodeBase64 } from '../utils.js';
import { generateByteStream } from '../utils.js';
import { getEnvVar } from '../utils.js';
import { getUuid } from '../utils.js';
import { Client } from '../client.generated.js';
import { JwtAuth } from '../jwtAuth.js';
import { JwtConfig } from '../jwtAuth.js';
test('fileMetadata', async function fileMetadata(): Promise<any> {
  const client: any = new Client({
    auth: new JwtAuth({
      config: JwtConfig.fromConfigJsonString(
        decodeBase64(getEnvVar('JWT_CONFIG_BASE_64'))
      ),
    }),
  });
  const uploadedFiles: any = await client.uploads.uploadFile({
    attributes: {
      name: getUuid(),
      parent: {
        id: '0',
      } satisfies UploadFileRequestBodyArgAttributesFieldParentField,
    } satisfies UploadFileRequestBodyArgAttributesField,
    file: generateByteStream(256),
  } satisfies UploadFileRequestBodyArg);
  const fileId: any = uploadedFiles.entries[0].id;
  const fileMetadata: any = await client.fileMetadata.getFileMetadata(fileId);
  if (!(fileMetadata.entries.length == 0)) {
    throw 'Assertion failed';
  }
  const scope: any = 'global';
  const template: any = 'properties';
  const data: any = { abc: 'xyz' };
  const createdMetadata: any = await client.fileMetadata.createFileMetadataById(
    fileId,
    scope,
    template,
    data
  );
  if (!(createdMetadata.template == template)) {
    throw 'Assertion failed';
  }
  if (!(createdMetadata.scope == scope)) {
    throw 'Assertion failed';
  }
  if (!(createdMetadata.version == 0)) {
    throw 'Assertion failed';
  }
  const receivedMetadata: any = await client.fileMetadata.getFileMetadataById(
    fileId,
    scope,
    template
  );
  if (!(receivedMetadata.extraData.abc == data.abc)) {
    throw 'Assertion failed';
  }
  const newValue: any = 'bar';
  const updatedMetadata: any = await client.fileMetadata.updateFileMetadataById(
    fileId,
    scope,
    template,
    [
      {
        op: 'replace' as UpdateFileMetadataByIdRequestBodyArgOpField,
        path: '/abc',
        value: newValue,
      } satisfies UpdateFileMetadataByIdRequestBodyArg,
    ]
  );
  const receivedUpdatedMetadata: any =
    await client.fileMetadata.getFileMetadataById(fileId, scope, template);
  if (!(receivedUpdatedMetadata.extraData.abc == newValue)) {
    throw 'Assertion failed';
  }
  await client.fileMetadata.deleteFileMetadataById(fileId, scope, template);
  expect(async () => {
    await client.fileMetadata.getFileMetadataById(fileId, scope, template);
  }).rejects.toThrow();
  await client.files.deleteFileById(fileId);
});
export {};
