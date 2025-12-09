import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditF = ({ setCurrentindex, setError, fid }) => {
    const url = import.meta.env.VITE_SERVER;
    const [title, setTitle] = useState('');
    const [role, setRole] = useState('');
    const [descrp, setDescrp] = useState('');
    const [image, setImage] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [uploading, setUploading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState({});

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
            setError('Image uploaded successfully');
            setTimeout(() => setError(''), 3000);
        } catch (err) {
            setError('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const getdata = async (id) => {
        try {
            const res = await axios.post(`${url}/getfounder`, { id });
            const founder = res.data;

            setData(founder);
            setTitle(founder.title || '');
            setRole(founder.role || '');
            setDescrp(founder.descrp || '');
            setImage(founder.image || '');
            setLinkedin(founder.linkedin || '');   // ← load
            setGithub(founder.github || '');       // ← load
        } catch (error) {
            setError('Failed to load founder data');
        }
    };

    useEffect(() => {
        if (fid) getdata(fid);
    }, [fid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        try {
            const response = await axios.post(`${url}/upfounder`, {
                id: data._id,
                title,
                role,
                descrp,
                image,
                linkedin,   // ← send to backend
                github      // ← send to backend
            });

            if (response.status === 200) {
                setError('Founder updated successfully!');
                setTimeout(() => setCurrentindex('founder'), 1000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        } finally {
            setDisabled(false);
        }
    };

    return (
        <div className="px-4 py-10 font-Poppins w-full mx-auto max-w-6xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Text Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-3xl font-bold text-white">Edit Founder</h2>

                    <div>
                        <label className="block mb-2 text-lg text-gray-300">Name (HTML allowed)</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Mustafa <span class="text-white">Shoukat</span>'
                            className="w-full bg-white/10 border border-gray-600 text-white p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-lg text-gray-300">Role</label>
                        <input
                            type="text"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Co-founder & AI Engineer"
                            className="w-full bg-white/10 border border-gray-600 text-white p-3 rounded-lg"
                        />
                    </div>

                    {/* LinkedIn & GitHub Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-lg text-gray-300">LinkedIn URL</label>
                            <input
                                type="url"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                                className="w-full bg-white/10 border border-gray-600 text-white p-3 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-lg text-gray-300">GitHub URL (optional)</label>
                            <input
                                type="url"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                placeholder="https://github.com/username"
                                className="w-full bg-white/10 border border-gray-600 text-white p-3 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-lg text-gray-300">Description</label>
                        <textarea
                            required
                            rows={5}
                            value={descrp}
                            onChange={(e) => setDescrp(e.target.value)}
                            placeholder="Short bio..."
                            className="w-full bg-white/10 border border-gray-600 text-white p-3 rounded-lg resize-none"
                        />
                    </div>
                </div>

                {/* Right: Image + Submit */}
                <div className="space-y-6">
                    <div className="text-center">
                        <img
                            src={image || 'https://placehold.co/400x400?text=Founder'}
                            alt="Preview"
                            className="mx-auto rounded-full size-64 object-cover border-4 border-green/50 shadow-2xl"
                        />
                    </div>

                    <div>
                        <label className="block text-lg text-gray-300 mb-2">Upload New Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:bg-green file:text-black file:font-semibold hover:file:bg-green/80 cursor-pointer"
                        />
                        {uploading && <p className="text-yellow-400 mt-2">Uploading image...</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={disabled || uploading}
                        className="w-full bg-green hover:bg-green/90 text-black font-bold text-xl py-4 rounded-xl disabled:opacity-50 transition"
                    >
                        {disabled ? 'Saving...' : 'Update Founder'}
                    </button>

                    {error && (
                        <p className={`text-center text-lg ${error.includes('success') ? 'text-green' : 'text-red-500'}`}>
                            {error}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditF;