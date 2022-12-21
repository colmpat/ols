// shows all images from /api/images
import Image from 'next/image'
import { trpc } from '../../utils/trpc'
import { useEffect } from 'react';

// react component to display images in a grid layout
// takes images as a prop of type Image[]
const Images: React.FC = () => {
    // fetch images from trpc
    const images = trpc.images.getImages.useQuery().data
    
    // useEffect to print images to console
    useEffect(() => {
        console.log(images)
    }, [images])

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="flex flex-col items-center justify-center flex-1 h-full p-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white bg-gray-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome to your image gallery</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">This is where you can edit your images.</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 mt-8">
                        {images?.map((image, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-full h-64 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
                                <Image src={image.url} width={300} height={300} alt={'image.alt'} key={i} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
};

export default Images;