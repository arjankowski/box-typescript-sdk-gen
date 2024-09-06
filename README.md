<p align="center">
  <img src="https://github.com/box/sdks/blob/master/images/box-dev-logo.png" alt= “box-dev-logo” width="30%" height="50%">
</p>

# Box TypeScript SDK GENERATED

[![Project Status](http://opensource.box.com/badges/active.svg)](http://opensource.box.com/badges)
![build](https://github.com/box/box-typescript-sdk-gen/actions/workflows/build_and_test.yml/badge.svg)
[![npm version](https://badge.fury.io/js/box-typescript-sdk-gen.svg)](https://badge.fury.io/js/box-typescript-sdk-gen)
[![image](https://img.shields.io/npm/dm/box-typescript-sdk-gen.svg)](https://badge.fury.io/js/box-typescript-sdk-gen)
![Platform](https://img.shields.io/badge/node-18--20-blue)
[![Coverage](https://coveralls.io/repos/github/box/box-typescript-sdk-gen/badge.svg?branch=main)](https://coveralls.io/github/box/box-typescript-sdk-gen?branch=main)

We are excited to introduce the stable release of the latest generation of Box TypeScript SDK, designed to elevate the developer experience and streamline your integration with the Box Content Cloud.

With this SDK, you’ll have access to:

1. Full API Support: The new generation of Box SDKs empowers developers with complete coverage of the Box API ecosystem. You can now access all the latest features and functionalities offered by Box, allowing you to build even more sophisticated and feature-rich applications.
2. Rapid API Updates: Say goodbye to waiting for new Box APIs to be incorporated into the SDK. With our new auto-generation development approach, we can now add new Box APIs to the SDK at a much faster pace (in a matter of days). This means you can leverage the most up-to-date features in your applications without delay.
3. Embedded Documentation: We understand that easy access to information is crucial for developers. With our new approach, we have included comprehensive documentation for all objects and parameters directly in the source code of the SDK. This means you no longer need to look up this information on the developer portal, saving you time and streamlining your development process.
4. Enhanced Convenience Methods: Our commitment to enhancing your development experience continues with the introduction of convenience methods. These methods cover various aspects such as chunk uploads, classification, and much more.
5. Seamless Start: The new SDKs integrate essential functionalities like authentication, automatic retries with exponential backoff, exception handling, request cancellation, and type checking, enabling you to focus solely on your application's business logic.

Embrace the new generation of Box SDKs and unlock the full potential of the Box Content Cloud.

# Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installing](#installing)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Upgrades](#upgrades)
- [Integration Tests](#integration-tests)
  - [Running integration tests locally](#running-integration-tests-locally)
    - [Create Custom Application](#create-custom-application)
    - [Export configuration](#export-configuration)
- [Questions, Bugs, and Feature Requests?](#questions-bugs-and-feature-requests)
- [Copyright and License](#copyright-and-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installing

```console
npm install box-typescript-sdk-gen
```

If you use yarn, please do this instead:

```console
yarn add box-typescript-sdk-gen
```

This is autogenerated Box SDK version.

# Getting Started

To get started with the SDK, get a Developer Token from the Configuration page of your app in the [Box Developer
Console](https://app.box.com/developers/console). You can use this token to make test calls for your own Box account.

The SDK provides an `DeveloperTokenAuth` class, which allows you to authenticate using your Developer Token.
Use instance of `DeveloperTokenAuth` to initialize `Client` object.
Using `Client` object you can access managers, which allow you to perform some operations on your Box account.

The example below demonstrates how to authenticate with Developer Token and print names of all items inside a root folder.

```js
const { BoxClient, BoxDeveloperTokenAuth } = require('box-typescript-sdk-gen');

async function main(token) {
  let auth = new BoxDeveloperTokenAuth({ token });
  let client = new BoxClient({ auth });
  let entries = (await client.folders.getFolderItems('0')).entries;
  entries.forEach((entry) => console.log(entry));
}

main('INSERT YOUR DEVELOPER TOKEN HERE');
```

In order to use in browser make sure you include the `lib/bundle.js` file and then you can access the classes like so:

```js
const { BoxClient, BoxDeveloperTokenAuth } = window['box-typescript-sdk-gen'];
```

See example.html for an example website using this SDK.

To run the example locally:

1. Start the local server by running `npx serve -p 3000` in the project directory.
2. Make sure `http://localhost:3000` is allowlisted in CORS Domains of your application.
3. Head over to `http://localhost:3000/example.html`.
4. Provide a fresh Developer Token to the dialog window that shows up upon running the example.
5. Make sure that you get an alert message that includes your user name.

# Documentation

Browse the [docs](docs/README.md) or see [API Reference](https://developer.box.com/reference/) for more information.

# Upgrades

Upgrading from our legacy SDKs to the new generation SDKs is a straightforward process. See our [migration guide](migration-guide.md) and [changelog](CHANGELOG.md) for more information.

# Integration Tests

## Running integration tests locally

### Create Custom Application

To run integration tests locally you will need a `Custom App` created in the [Box Developer
Console](https://app.box.com/developers/console) with `Server Authentication (with JWT)` selected as authentication method.
Once created you can edit properties of the application:

- In section `App Access Level` select `App + Enterprise Access`. You can enable all `Application Scopes`.
- In section `Advanced Features` enable `Make API calls using the as-user header` and `Generate user access tokens`.

Now select `Authorization` and submit application to be reviewed by account admin.

### Export configuration

1. Select `Configuration` tab and in the bottom in the section `App Settings`
   download your app configuration settings as JSON.
2. Encode configuration file to Base64, e.g. using command: `base64 -i path_to_json_file`
3. Set environment variable: `JWT_CONFIG_BASE_64` with base64 encoded jwt configuration file
4. Set environment variable: `BOX_FILE_REQUEST_ID` with ID of file request already created in the user account, `BOX_EXTERNAL_USER_EMAIL` with email of free external user which not belongs to any enterprise.
5. Set environment variable: `WORKFLOW_FOLDER_ID` with the ID of the Relay workflow that deletes the file that triggered the workflow. The workflow should have a manual start to be able to start it from the API.
6. Set environment variable: `APP_ITEM_ASSOCIATION_FILE_ID` to the ID of the file with associated app item and `APP_ITEM_ASSOCIATION_FOLDER_ID` to the ID of the folder with associated app item.

# Questions, Bugs, and Feature Requests?

Need to contact us directly? [Browse the issues
tickets](https://github.com/box/box-typescript-sdk-gen/issues)! Or, if that
doesn't work, [file a new
one](https://github.com/box/box-typescript-sdk-gen/issues/new) and we will get
back to you. If you have general questions about the Box API, you can
post to the [Box Developer Forum](https://forum.box.com/).

# Copyright and License

Copyright 2023 Box, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
