import { getUser } from "@app/utils/users"

type Props = {
    params: {
        id: string
    }
}


export default async function Page({
    params: { id }
}: Props) {
    let user = await getUser(parseInt(id))
    return (
        <>
            <h1>Users</h1>
            <p>Showing user: {id}</p>
            <pre>{JSON.stringify(user)}</pre>
        </>
    )
}