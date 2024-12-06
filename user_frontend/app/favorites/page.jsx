import {
    Heading,
    Darkbackground,
} from '@/features/dashboard/';

import {
    Card
} from '@/features/favorites/';


export default function Page() {
    return (
        <Darkbackground>
            <Heading title="Dine Favoritter" className='pb-12' />
            <Card />
        </Darkbackground>
    );
}