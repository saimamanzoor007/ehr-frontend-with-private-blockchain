import _ from '@lodash';
import clsx from 'clsx';

export const userStatuses = [
    {
        id: 1,
        name: 'active',
        color: 'bg-green text-white',
    },
    {
        id: 2,
        name: 'suspended',
        color: 'bg-orange text-black',
    }
];

function UserStatus(props) {
    return (
        <div
            className={clsx(
                'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
                _.find(userStatuses, { name: props.name }).color
            )}
        >
            {props.name?.toUpperCase()}
        </div>
    );
}

export default UserStatus;
