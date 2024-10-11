import manifest, { Manifest } from "./manifest.gen.ts";
import { createHttpClient } from "apps/utils/http.ts";
import type { API } from "./utils/client.ts";
import { Secret } from "apps/website/loaders/secret.ts";
import { encode } from "https://deno.land/std@0.201.0/encoding/base64.ts";
import { type App as App, type AppContext as AC } from "@deco/deco";
export interface Props {
    storeKey: string;
    username: Secret;
    password: Secret;
}
export interface State extends Props {
    api: ReturnType<typeof createHttpClient<API>>;
}
/**
 * @title Yourviews
 */
export default function App(state: State): App<Manifest, State> {
    const { username, password } = state;
    const headers = new Headers();
    const encodedCredentials = encode(new TextEncoder().encode(username.get() + ":" + password.get()));
    headers.set("Authorization", "Basic " + encodedCredentials);
    const api = createHttpClient<API>({
        base: `https://service.yourviews.com.br`,
        headers,
    });
    return { manifest, state: { ...state, api } };
}
export type AppContext = AC<ReturnType<typeof App>>;
