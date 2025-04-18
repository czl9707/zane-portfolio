import "server-only";

// interface UserToken {
//     user: {
//         email: string,
//         id: string,
//     },
//     token: string,
//     exp: number,
// };


// const LOGIN_ENDPOINT = `${process.env.ADMIN_URL}/api/users/login`;

// async function FetchUserToken(): Promise<UserToken> {
//     const user = await fetch(LOGIN_ENDPOINT, {
//         method: 'POST',
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email: process.env.ADMIN_EMAIL,
//             password: process.env.ADMIN_PASSWORD,
//         })
//     })
//         .then(async req => await req.json())

//     console.log("successfully login and fetched userToken");
//     return user;
// }

// let tokenCache: UserToken | undefined = undefined;

// export async function get(): Promise<string> {
//     if ((tokenCache?.exp ?? 0) < (Date.now() / 1000)) {
//         tokenCache = await FetchUserToken();
//     }

//     return tokenCache!;
// }

export async function get() {
    return process.env.ADMIN_APIKEY as string;
}