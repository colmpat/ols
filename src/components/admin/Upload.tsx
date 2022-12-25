import { useState } from "react";
import { trpc } from "../../utils/trpc"

// image upload page for image uploads that follows the same tailwindcss styling as the main Admin page
// uses the trpc mutation to upload the image to the database
// takes a file input and a category input
const Upload: React.FC = () => {
    const { mutate: uploadImage } = trpc.images.uploadImage.useMutation();
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState<string | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    }

    function handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const category = e.target.value;
        if (category) {
            setCategory(category);
        }
    }

    async function handleUpload() {
        if (!file || !category) {
            return;
        }

        const data = new Uint8Array(await file.arrayBuffer());
        uploadImage({ file: data, category });
    }

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="flex flex-col items-center justify-center flex-1 h-full p-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white bg-gray-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome to your image upload page</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">This is where you can upload images.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        {/* file input */}
                        <div className="flex flex-col items-center justify-center flex-1 mt-4 mb-4" >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="file">File</label>
                            <input type="file" name="file" id="file" onChange={handleFileChange} className="mt-1" accept="image/*" />
                        </div>
                        {/* category input */}
                        <div className="flex flex-col items-center justify-center flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="category">Category</label>
                            <input type="text" name="category" id="category" onChange={handleCategoryChange} className="mt-1" />
                        </div>
                        {/* upload button */}
                        <div className="flex flex-col items-center justify-center flex-1">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                                onClick={handleUpload}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};
export default Upload;