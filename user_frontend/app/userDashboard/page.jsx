import {
    Logo,
    Heading,
    Card,
    BigCard,
    Darkbackground,
    AboutCard,
} from '@/features/dashboard/'

export default function Page() {
    return (
        <Darkbackground>
            <Heading title="Restaurants" />
            <Card />
            <Heading title="Favoritter" />
            <BigCard />
            <AboutCard
                logoSrc="/resbook-logo-white.png"
                description="Reserver dit bord nemt & hurtigt."
                backgroundImageSrc="/res-image.jpg"
            />
        </Darkbackground>
    )
}