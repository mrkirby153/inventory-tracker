
import { getUsers } from '@app/utils/users';
import { User } from '@prisma/client';

export default async function Users() {
    let users = (await getUsers()).map((user: User) => {
        return <li key={user.id.toString()}> <pre>{JSON.stringify(user)} </pre></li >;
    });
    return <ul>{users}</ul>
}