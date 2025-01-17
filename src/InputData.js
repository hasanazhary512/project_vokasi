import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Mengimpor Link dari react-router-dom
import './InputData.css';

function InputData({ onLogout }) {  // Tambahkan onLogout sebagai props
    const [formData, setFormData] = useState({
        nomorRegister: '',
        namaLengkap: '',
        alamat: '',
        jenisKelamin: '',
        kategori: '',
        vokasional: '',
        tanggalMasuk: '',
        tanggalSelesai: '',
        fotoPeserta: null,
    });
    const [previewSrc, setPreviewSrc] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, fotoPeserta: file });
            const reader = new FileReader();
            reader.onload = (e) => setPreviewSrc(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Input: ", formData);
        setFormData({
            nomorRegister: '',
            namaLengkap: '',
            alamat: '',
            jenisKelamin: '',
            kategori: '',
            vokasional: '',
            tanggalMasuk: '',
            tanggalSelesai: '',
            fotoPeserta: null,
        });
        setPreviewSrc(null);
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h1>Input Data</h1>
                <ul>
                    <li><Link to="/dashboard" className="link">Dashboard</Link></li>
                    <li><Link to="/input-data" className="link bold">Input Data</Link></li>
                    <li><Link to="/tampil-data" className="link">Tampil Data</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="navbar">
                    <span>Admin</span>
                    <div className="dropdown-menu">
                        {/* Ganti Link Logout untuk memanggil onLogout */}
                        <button onClick={onLogout} className="link">Logout</button>
                    </div>
                </div>
                <div className="content">
                    <h2>Form Input Data</h2>
                    <form onSubmit={handleSubmit} className="dataInputForm">
                        <label htmlFor="nomorRegister">Nomor Register:</label>
                        <input type="text" id="nomorRegister" value={formData.nomorRegister} onChange={handleChange} required />

                        <label htmlFor="namaLengkap">Nama Lengkap:</label>
                        <input type="text" id="namaLengkap" value={formData.namaLengkap} onChange={handleChange} required />

                        <label htmlFor="alamat">Alamat:</label>
                        <input type="text" id="alamat" value={formData.alamat} onChange={handleChange} required />

                        <label htmlFor="jenisKelamin">Jenis Kelamin:</label>
                        <select id="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} required>
                            <option value="">Pilih</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>

                        <label htmlFor="kategori">Kategori:</label>
                        <select id="kategori" value={formData.kategori} onChange={handleChange} required>
                            <option value="">Pilih</option>
                            <option value="Disabilitas">Disabilitas</option>
                            <option value="Anak">Anak</option>
                            <option value="Lansia">Lansia</option>
                            <option value="Rentan">Rentan</option>
                        </select>

                        <label htmlFor="vokasional">Vokasional:</label>
                        <input type="text" id="vokasional" value={formData.vokasional} onChange={handleChange} required placeholder="Isikan Vokasional" />

                        <label htmlFor="tanggalMasuk">Tanggal Masuk:</label>
                        <input type="date" id="tanggalMasuk" value={formData.tanggalMasuk} onChange={handleChange} required />

                        <label htmlFor="tanggalSelesai">Tanggal Selesai:</label>
                        <input type="date" id="tanggalSelesai" value={formData.tanggalSelesai} onChange={handleChange} required />

                        <label htmlFor="fotoPeserta">Foto Peserta:</label>
                        <input type="file" id="fotoPeserta" accept="image/*" onChange={handleFileChange} required />
                        {previewSrc && <img src={previewSrc} alt="Preview Foto Peserta" id="photoPreview" />}
                        
                        <button type="submit">Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InputData;
