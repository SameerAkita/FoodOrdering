import { Redirect } from "expo-router";

export default function authIndex() {
    return (
        <Redirect href={'/sign-in'} />
    )
}