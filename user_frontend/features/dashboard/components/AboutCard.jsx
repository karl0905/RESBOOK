import Image from 'next/image';

export function AboutCard({ logoSrc, description, backgroundImageSrc }) {
    return (
        <article className="pb-20 px-4">
            <div className="w-full h-40 md:h-[80vh] bg-card-gray text-white rounded-lg shadow-md relative overflow-hidden">
                <Image
                    src={backgroundImageSrc}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                />

                <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

                <div className="relative z-20 h-full flex flex-col items-center justify-center p-4 md:p-6">

                    <div className="flex justify-center items-center w-64 h-64 md:w-[32rem] md:h-[32rem] lg:w-[48rem] lg:h-[48rem] mb-4">
                        <Image
                            src={logoSrc}
                            alt="Logo"
                            layout="responsive"
                            width={2048}
                            height={2048}
                            objectFit="contain"
                        />
                    </div>

                    <p className="text-white text-center text-xs md:text-sm lg:text-base max-w-4xl -mt-20 px-4">{description}</p>
                </div>
            </div>
        </article>
    );
};