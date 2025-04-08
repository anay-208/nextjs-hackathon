// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as React from 'react';

/**
 * This code extends the CSSProperties interface in React to allow for custom CSS properties (CSS variables).
 */
declare module 'react' {
  interface CSSProperties {
    [index: `--${ string }`]: string;
  }
}