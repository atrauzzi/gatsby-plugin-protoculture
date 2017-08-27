# ![protoculture](protoculture.png)

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://badge.fury.io/js/gatsby-plugin-protoculture.svg)](https://badge.fury.io/js/gatsby-plugin-protoculture)
[![Build Status](https://travis-ci.org/atrauzzi/gatsby-plugin-protoculture.svg?branch=master)](https://travis-ci.org/atrauzzi/gatsby-plugin-protoculture) 
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## About

This plugin adds support for the conventions found in the [Protoculture](https://github.com/atrauzzi/protoculture) JS library to any Gatsby project.

## Usage


### Configure a Local Package
Set up `gatsby-src` as a [local package](https://docs.npmjs.com/files/package.json#local-paths), pointing to your project directory so webpack can help this plugin find your application directory and its sources.

It'll look something like this in your `package.json`:
```
{
    ...
    "dependencies": {
        "gatsby-src": "file:./src",
    },
    ...
}
```

This is also helpful if you are using TypeScript for your project as it's not possible at the moment to reference TypeScript code from `gatsby-config.js` or make it a `.ts` file.

### Create a Bundle
After setting up the local package, in your project, create and configure a subclass of `Bundle` which serves as the root entrypoint for protoculture.

All functionality of [protoculture-react](https://github.com/atrauzzi/protoculture-react) is now available to you, including [react-redux](https://github.com/reactjs/react-redux), [redux-thunk](https://github.com/gaearon/redux-thunk), as well as the ability to set up your redux store via dependency injection.

Please remember that unlike normal protoculture applications, Gatsby remains the proper entrypoint for browser code.  This means that other polyfills and modules may have been loaded prior to your `Bundle` subclass.

It's also worth noting that I'll be looking at enabling gaining access to dependency injection for your react components in the near future.  You can track that progress in [protoculture-react](https://github.com/atrauzzi/protoculture-react) itself.


## Meta

[Original github issue](https://github.com/atrauzzi/protoculture/issues/22).

This plugin became a possibility after [the addition of async support for Gatsby plugins](https://github.com/gatsbyjs/gatsby/pull/1735).
