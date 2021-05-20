/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2App_artist = {
    readonly id: string;
    readonly " $refType": "Artist2App_artist";
};
export type Artist2App_artist$data = Artist2App_artist;
export type Artist2App_artist$key = {
    readonly " $data"?: Artist2App_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2App_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2App_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '7b88650e1330aa1df230081098e072c1';
export default node;
