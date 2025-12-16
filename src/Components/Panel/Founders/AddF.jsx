import React, { useState } from 'react';
import axios from 'axios';
import { slowTimeout } from '../../../animationConfig';

const AddF = ({ setCurrentindex, setError, error }) => {
    const url = import.meta.env.VITE_SERVER;
    const [title, setTitle] = useState('');
    const [role, setRole] = useState('');
    const [descrp, setDescrp] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [disabled, setDisabled] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        axios.post(`${url}/addfounder`, { title, role, image, descrp })
            .then(response => {
                setError('Founder Added');
                setTimeout(() => setError(''), slowTimeout(3000));
                setCurrentindex('founder');
            })
            .catch(error => {
                console.error(error);
                setTimeout(() => setError(''), slowTimeout(3000));
            })
            .finally(() => {
                setDisabled(false);
            });
    };

    return (
        <div className="px-4 py-10 font-Poppins w-full mx-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Input fields */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold">Add Founder</h2>

                    <div>
                        <label className="block mb-2 text-lg">Title (Name with span if needed)</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='e.g. Mustafa <span class="text-white">Shoukat</span>'
                            className="w-full border-[1px]   border-gray-400 p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-lg">Role</label>
                        <input
                            type="text"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder='Co-founder'
                            className="w-full border-[1px]   border-gray-400 p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-lg">Description</label>
                        <textarea
                            required
                            value={descrp}
                            onChange={(e) => setDescrp(e.target.value)}
                            placeholder='Short bio'
                            className="w-full border-[1px]   border-gray-400 p-2 rounded h-32"
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4 max-w-md w-full">
                    <div>
                        <img
                            src={image || 'https://placehold.co/400'}
                            alt="Founder Preview"
                            className="mx-auto object-cover object-center rounded-full size-[250px]"
                        />
                    </div>

                    <label className="block text-sm">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="w-full border-[1px]   border-gray-400 p-2 rounded"
                    />

                    <input
                        type="submit"
                        disabled={disabled || uploading}
                        value={uploading ? 'Uploading...' : 'Submit'}
                        className="w-full text-white bg-blue-600 p-2 rounded text-lg cursor-pointer disabled:opacity-50"
                    />

                    {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default AddF;
