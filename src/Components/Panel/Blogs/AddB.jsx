import React, { useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { slowTimeout } from '../../../animationConfig';
import JoditEditor from 'jodit-react';

const AddB = ({ setCurrentindex, setError, error }) => {
    const url = import.meta.env.VITE_SERVER;
    const [disabled, setDisabled] = useState(false);
    const [uploading, setUploading] = useState(false);
    const editor = useRef(null);

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [author,setAuthor] = useState('')
    const [image, setImage] = useState('');

    const editorConfig = useMemo(() => ({
        minHeight: 500,
        readonly: false,
    }), []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        setUploading(true);
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dxrfayus8/image/upload', formData);
            setImage(res.data.secure_url);
            setError('Image uploaded');
            setTimeout(() => setError(''), slowTimeout(3000));
        } catch (err) {
            console.error('Image Upload Error', err);
            setError('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handelsubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        axios.post(`${url}/addblog`, { title, discription,author, image, content })
            .then(response => {
                setError('Blog Added');
                setTimeout(() => setError(''), slowTimeout(3000));
                setCurrentindex('blog');
            })
            .catch(error => {
                console.error(error);
                setError('Server Error');
                setTimeout(() => setError(''), slowTimeout(3000));
            })
            .finally(() => {
                setDisabled(false);
            });
    };

    return (
        <div className="px-4 py-10 font-Poppins w-full mx-auto">
            <form onSubmit={handelsubmit} className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <label className="text-xl">Add Blog</label>
                    <div className="text-black min-h-screen">
                        <JoditEditor
                            ref={editor}
                            config={editorConfig}
                            value={content}
                            onBlur={newContent => setContent(newContent)}
                            onChange={newContent => setContent(newContent)}
                        />
                    </div>
                </div>
                <div className="flex flex-col-reverse max-w-[400px] w-full justify-around">
                    <label className="text-lg text-red-500">{error}</label>
                    <input
                        type="submit"
                        disabled={disabled || uploading}
                        value={uploading ? 'Uploading...' : 'Submit'}
                        className="w-full text-white rounded-md h-[50px] bg-blue-600 text-lg"
                    />
                    <div className="flex flex-col gap-4">
                        <label className="text-lg">Description:</label>
                        <textarea
                            onChange={(e) => setDiscription(e.target.value)}
                            required
                            placeholder="Description"
                            className="w-full h-[80px] text-sm border-[1px] border-gray-500 p-2"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label className="text-lg">Author:</label>
                        <input
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            type="text"
                            placeholder="Author Name"
                            className="w-full h-[40px] text-sm border-[1px] border-gray-500 p-2"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label className="text-lg">Title:</label>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            type="text"
                            placeholder="Title"
                            className="w-full h-[40px] text-sm border-[1px] border-gray-500 p-2"
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <img
                                src={image ? image : 'https://placehold.co/400'}
                                className="w-full h-[200px] object-cover rounded-md"
                                alt="Preview"
                            />
                        </div>
                        <label className="text-sm">Upload Image</label>
                        <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full h-[40px] text-sm border-[1px] border-gray-500 p-2"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddB;
