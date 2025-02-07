import "server-only";

interface UserToken {
    user: {
        email: string,
        id: string,
    },
    token: string,
    exp: number,
};

let tokenCache: UserToken | undefined = undefined;

const LOGIN_ENDPOINT = `${process.env.ADMIN_URL}/api/users/login`;

async function FetchUserToken(): Promise<UserToken> {
    const user = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
        })
    })
        .then(async req => await req.json())

    console.log("successfully login and fetched userToken");
    return user;
}


export async function get(): Promise<UserToken> {
    if ((tokenCache?.exp ?? 0) < (Date.now() / 1000)) {
        tokenCache = await FetchUserToken();
    }

    return tokenCache!;
}