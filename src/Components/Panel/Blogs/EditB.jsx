import axios from 'axios'
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { slowTimeout } from '../../../animationConfig';
import JoditEditor from 'jodit-react';

const EditB = ({ title, setCurrentindex, setError, error }) => {
    const url = import.meta.env.VITE_SERVER;
    const editor = useRef(null);
    const [content, setContent] = useState('Loading...');
    const [post, setPost] = useState({ title: 'Loading...', discription: 'Loading...', author: '', image: 'Loading...', content: 'Loading...' });
    const [ctitle, setCtitle] = useState(post.title);
    const [discription, setDiscription] = useState(post.discription);
    const [image, setImage] = useState(post.image);
    const [author, setAuthor] = useState(post.author)
    const [uploading, setUploading] = useState(false);

    const editorConfig = useMemo(() => {
        return {
            minHeight: 700,
            readonly: false,
        };
    }, []);

    const getdata = (title) => {
        axios.post(`${url}/Tblog`, { title })
            .then((res) => {
                const post = res.data.post;
                setPost(post);
                setContent(post.content);
                setCtitle(post.title);
                setImage(post.image);
                setAuthor(post.author)
                setDiscription(post.discription);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getdata(title);
    }, [title]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); // <-- Replace this
        setUploading(true);

        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dxrfayus8/image/upload', formData); // <-- Replace this
            setImage(res.data.secure_url);
            setError('Image uploaded successfully');
            setTimeout(() => setError(''), slowTimeout(3000));
        } catch (err) {
            console.error("Cloudinary Upload Error", err);
            setError('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handelsubmit = (e) => {
        e.preventDefault();
        axios.put(`${url}/upblog`, { title, ctitle, discription, author, image, content })
            .then(() => {
                setError('Changes Saved');
                setCurrentindex("blog");
                setTimeout(() => setError(''), slowTimeout(3000));
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="px-4 py-10 font-Poppins w-full mx-auto">
            <form onSubmit={handelsubmit} className='grid grid-cols-3 gap-4'>
                <div className='col-span-2'>
                    <label className='text-xl'>Edit Blog</label>
                    <div className='text-black min-h-screen'>
                        <JoditEditor
                            ref={editor}
                            config={editorConfig}
                            value={content}
                            onBlur={newContent => setContent(newContent)}
                            onChange={newContent => setContent(newContent)}
                        />
                    </div>
                </div>

                <div className='flex flex-col-reverse max-w-[400px] w-full justify-end gap-14'>
                    <label className='text-xl text-red-500'>{error}</label>
                    <input type="submit" value='Save Changes' className='w-full text-white rounded-md h-[50px] bg-blue-600 text-lg' />

                    <div className='flex flex-col gap-4'>
                        <label className='text-xl'>Description</label>
                        <textarea value={discription} onChange={(e) => setDiscription(e.target.value)} required placeholder='Description' className='w-full h-[80px] text-lg border-[1px] border-gray-500 p-2'></textarea>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label className="text-lg">Author:</label>
                        <input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            type="text"
                            placeholder="Author Name"
                            className="w-full h-[40px] text-sm border-[1px] border-gray-500 p-2"
                        />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <label className='text-xl'>Title</label>
                        <input value={ctitle} onChange={(e) => setCtitle(e.target.value)} required type="text" placeholder='Title' className='w-full h-[40px] text-lg border-[1px] border-gray-500 p-2' />
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <img src={image ? image : 'https://placehold.co/400'} className='w-full h-[200px] object-cover rounded-md' alt="" />
                        </div>

                        <label className='text-sm'>Upload Image</label>
                        <input type="file" accept='image/*' onChange={handleImageUpload} className='w-full h-[40px] text-sm border-[1px] border-gray-500 p-2' />
                        {uploading && <p className="text-sm text-blue-600">Uploading image...</p>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditB;
