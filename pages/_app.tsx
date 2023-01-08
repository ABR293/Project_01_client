import React, { Component, FC } from "react";
import App, { AppProps } from "next/app";
import { END } from "redux-saga";
import { SagaStore, wrapper } from "../store";
import withReduxSaga from "next-redux-saga";

class MyApp extends App {
  static async getInitialProp({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(withReduxSaga(MyApp));

// export default wrapper.withRedux(MyApp);

// class WrappedApp extends App<AppInitialProps> {
//   public static getInitialProps = wrapper.getInitialAppProps(store => async context => {
//     // 1. Wait for all page actions to dispatch
//     const pageProps = {
//       // https://nextjs.org/docs/advanced-features/custom-app#caveats
//       ...(await App.getInitialProps(context)).pageProps,
//     };

//     // 2. Stop the saga if on server
//     if (context.ctx.req) {
//       store.dispatch(END);
//       await (store as SagaStore).sagaTask.toPromise();
//     }

//     // 3. Return props
//     return {pageProps};
//   });

//   public render() {
//     const {Component, pageProps} = this.props;
//     return <Component {...pageProps} />;
//   }
// }

// export default wrapper.withRedux(WrappedApp);

// /// /// /// /// /// ///

// import withReduxSaga from 'next-redux-saga'
// import {wrapper} from '../store'

// class ExampleApp extends App {
//   static async getInitialProps({<Component:React.Component, context}) {

//       let pageProps = {}
//       if (Component.getInitialProps) {
//         pageProps = await Component.getInitialProps(context)
//       }

//       return {pageProps}
//     }

//   render() {
//     const {Component, pageProps} = this.props
//     return (
//       <Component {...pageProps} />
//     )
//   }
// }

/// /// /// /// /// /// /// /// /// /// ///

// class MyApp extends React.Component<AppProps> {
//   render() {
//     const {Component, pageProps} = this.props;
//     return <Component {...pageProps} />;
//   }
// }

/// // / // // / / / / / / / / /// / // / / / / /
