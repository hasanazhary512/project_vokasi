import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InputModul_Instruktur.css';

function InputData({ onLogout }) {
    const [formData, setFormData] = useState({
        namaProgram: '',
        judulUnitKode: '',
        elemenKompetensi: '',
        kriteriaUnjukKerja: '',
        teoriPraktek: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Input: ", formData);
        setFormData({
            namaProgram: '',
            judulUnitKode: '',
            elemenKompetensi: '',
            kriteriaUnjukKerja: '',
            teoriPraktek: '', 
        });
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h1>Input Modul</h1>
                <ul>
                    <li><Link to="/dashboard" className="link">Dashboard</Link></li>
                    <li><Link to="/input-data" className="link bold">Input Modul</Link></li>
                    <li><Link to="/tampil-data" className="link">Tampil Modul</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="navbar">
                    <span>Instruktur</span>
                    <div className="dropdown-menu">
                        <button onClick={onLogout} className="link">Logout</button>
                    </div>
                </div>
                <div className="content">
                    <h2>Form Input Modul</h2>
                    <form onSubmit={handleSubmit} className="dataInputForm">
                        <label htmlFor="namaProgram">Nama Program:</label>
                        <input type="text" id="namaProgram" value={formData.namaProgram} onChange={handleChange} required />

                        <label htmlFor="judulUnitKode">Judul Unit dan Kode:</label>
                        <input type="text" id="judulUnitKode" value={formData.judulUnitKode} onChange={handleChange} required />

                        <label htmlFor="elemenKompetensi">Elemen Kompetensi:</label>
                        <input type="text" id="elemenKompetensi" value={formData.elemenKompetensi} onChange={handleChange} required />

                        <label htmlFor="kriteriaUnjukKerja">Kriteria Unjuk Kerja:</label>
                        <input type="text" id="kriteriaUnjukKerja" value={formData.kriteriaUnjukKerja} onChange={handleChange} required />

                        <label htmlFor="teoriPraktek">Teori dan Praktek:</label>
                        <textarea
                            id="teoriPraktek"
                            value={formData.teoriPraktek}
                            onChange={handleChange}
                            required
                            rows="10"
                            cols="50"
                        ></textarea>
                        
                        <button type="submit">Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InputData;
