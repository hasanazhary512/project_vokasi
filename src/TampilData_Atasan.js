import React, { useState } from 'react';
import './TampilData.css'; // CSS tetap menggunakan file yang sama
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

function TampilData_Atasan({ onLogout }) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [editData, setEditData] = useState({});
    const [dataPeserta, setDataPeserta] = useState([
        {
            nomor: '001',
            nama: 'Hasan',
            alamat: 'Solo',
            jenisKelamin: 'Laki-laki',
            kategori: 'Anak',
            vokasional: 'Teknologi Informasi',
            tanggalMasuk: '2024-01-01',
            tanggalSelesai: '2024-12-30'
        },
        {
            nomor: '002',
            nama: 'Rina',
            alamat: 'solo',
            jenisKelamin: 'Perempuan',
            kategori: 'Anak',
            vokasional: 'Teknologi Informasi',
            tanggalMasuk: '2024-02-01',
            tanggalSelesai: '2024-11-30'
        },
        {
            nomor: '003',
            nama: 'Nisa',
            alamat: 'solo',
            jenisKelamin: 'Perempuan',
            kategori: 'Lansia',
            vokasional: 'Kerajinan Tangan',
            tanggalMasuk: '2024-02-01',
            tanggalSelesai: '2024-11-30'
        },
    ]);

    const handleEdit = (index) => {
        setEditData({ ...dataPeserta[index] });
        setShowEditForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveEdit = () => {
        const updatedData = [...dataPeserta];
        const index = dataPeserta.findIndex((item) => item.nomor === editData.nomor);
        if (index !== -1) {
            updatedData[index] = editData;
            setDataPeserta(updatedData);
        }
        setShowEditForm(false);
        alert('Data berhasil diperbarui');
    };

    const handleDelete = (index) => {
        const newData = dataPeserta.filter((_, i) => i !== index);
        setDataPeserta(newData);
        alert('Data berhasil dihapus');
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(wb, [
            ['Nomor Register', 'Nama Lengkap', 'Alamat', 'Jenis Kelamin', 'Kategori', 'Vokasional', 'Tanggal Masuk', 'Tanggal Selesai'],
            ...dataPeserta.map((row) => [
                row.nomor,
                row.nama,
                row.alamat,
                row.jenisKelamin,
                row.kategori,
                row.vokasional,
                row.tanggalMasuk,
                row.tanggalSelesai,
            ]),
        ]);
        XLSX.writeFile(wb, 'Data_Peserta_Vokasi.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Data Peserta Vokasi', 20, 10);
        doc.autoTable({
            head: [['Nomor', 'Nama', 'Alamat', 'Jenis Kelamin', 'Kategori', 'Vokasional', 'Tanggal Masuk', 'Tanggal Selesai']],
            body: dataPeserta.map((row) => Object.values(row)),
        });
        doc.save('Data_Peserta_Vokasi.pdf');
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h1>Tampil Data</h1>
                <ul>
                    <li>
                        <Link to="/dashboard-atasan">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/tampil-data-atasan" className="bold">
                            Tampil Data
                        </Link>
                    </li>
                    <li>
                        <Link to="/tampil-modul-atasan">Tampil Modul</Link>
                    </li>
                </ul>
            </div>
            <div className="main-content">
                <div className="navbar">
                    <span>Atasan</span>
                    <div className="dropdown-menu">
                        <button onClick={onLogout}>Logout</button>
                    </div>
                </div>
                <div className="content">
                    <h2>Data Peserta Vokasi</h2>
                    <div className="export-container">
                        <button className="export-button" onClick={exportToExcel}>
                            Excel
                        </button>
                        <button className="export-button" onClick={exportToPDF}>
                            PDF
                        </button>
                    </div>
                    <table id="dataTable">
                        <thead>
                            <tr>
                                <th>Nomor Register</th>
                                <th>Nama Lengkap</th>
                                <th>Alamat</th>
                                <th>Jenis Kelamin</th>
                                <th>Kategori</th>
                                <th>Vokasional</th>
                                <th>Tanggal Masuk</th>
                                <th>Tanggal Selesai</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPeserta.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nomor}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.jenisKelamin}</td>
                                    <td>{item.kategori}</td>
                                    <td>{item.vokasional}</td>
                                    <td>{item.tanggalMasuk}</td>
                                    <td>{item.tanggalSelesai}</td>
                                    <td className="action-buttons">
                                        <button className="edit-button" onClick={() => handleEdit(index)}>
                                            Edit
                                        </button>
                                        <button className="delete-button" onClick={() => handleDelete(index)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showEditForm && (
                        <div className="overlay">
                            <div className="edit-form">
                                <h3>Edit Data Peserta</h3>
                                <div className="form-group">
                                    <label htmlFor="nomor">Nomor Register</label>
                                    <input type="text" id="nomor" name="nomor" value={editData.nomor} onChange={handleInputChange} disabled />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nama">Nama Lengkap</label>
                                    <input type="text" id="nama" name="nama" value={editData.nama} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="alamat">Alamat</label>
                                    <input type="text" id="alamat" name="alamat" value={editData.alamat} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jenisKelamin">Jenis Kelamin</label>
                                    <input type="text" id="jenisKelamin" name="jenisKelamin" value={editData.jenisKelamin} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="kategori">Kategori</label>
                                    <input type="text" id="kategori" name="kategori" value={editData.kategori} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="vokasional">Vokasional</label>
                                    <input type="text" id="vokasional" name="vokasional" value={editData.vokasional} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tanggalMasuk">Tanggal Masuk</label>
                                    <input type="date" id="tanggalMasuk" name="tanggalMasuk" value={editData.tanggalMasuk} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tanggalSelesai">Tanggal Selesai</label>
                                    <input type="date" id="tanggalSelesai" name="tanggalSelesai" value={editData.tanggalSelesai} onChange={handleInputChange} />
                                </div>
                                <div className="form-actions">
                                    <button className="save-button" onClick={handleSaveEdit}>
                                        Simpan
                                    </button>
                                    <button className="cancel-button" onClick={() => setShowEditForm(false)}>
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TampilData_Atasan;
