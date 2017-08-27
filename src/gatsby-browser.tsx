import "reflect-metadata";
import * as _ from "lodash";
//
import * as React from "react";
import { Store } from "redux";
import { reduxSymbols, Bundle } from "protoculture";
import { Provider as ReduxProvider } from "react-redux";
import { Options } from "./Options";


let bundle: Bundle;
let bundleConstructor: {
    new(...args: any[]): Bundle;
};

// https://www.gatsbyjs.org/docs/browser-apis/#onClientEntry
export async function onClientEntry(gatsbyArgs: any, options: Options) {

    if (options.bundle) {

        const bundleInfo = options.bundle;

        if (_.isString(bundleInfo)) {

            const bundleModule = require(bundleInfo);

            bundleConstructor = _.find<any>(bundleModule, (moduleExport) =>
                moduleExport);
        }
        else if (_.isArray(bundleInfo)) {

            const bundleModuleName = bundleInfo[0];
            const bundleClassExport = bundleInfo[1];

            bundleConstructor = require(bundleModuleName)[bundleClassExport];
        }
    }
    else {

        bundleConstructor = require("gatsby-src/ProtocultureBundle").ProtocultureBundle;
    }

    bundle = new bundleConstructor();

    try {

        await bundle.run();
    }
    catch (fatalError) {

        // tslint:disable-next-line:no-console
        console.error(fatalError);
    }
}

export function wrapRootComponent(rootWrapper: any) {

    const GatsbyRoot = rootWrapper.Root;
    const store = bundle.container.get<Store<any>>(reduxSymbols.Store);

    const wrappedGatsbyRoot = () => <ReduxProvider store={store}>
        <GatsbyRoot />
    </ReduxProvider>;

    return wrappedGatsbyRoot;
}
