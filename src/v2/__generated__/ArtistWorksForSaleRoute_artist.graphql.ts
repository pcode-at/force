/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksForSaleRoute_artist = {
    readonly id: string;
    readonly " $refType": "ArtistWorksForSaleRoute_artist";
};
export type ArtistWorksForSaleRoute_artist$data = ArtistWorksForSaleRoute_artist;
export type ArtistWorksForSaleRoute_artist$key = {
    readonly " $data"?: ArtistWorksForSaleRoute_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistWorksForSaleRoute_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistWorksForSaleRoute_artist",
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
(node as any).hash = 'ea1d91bb1ed49d653b0d0e015d201ca9';
export default node;
