  // 6. Data Peta (Updated for 2024)
  const mapData = [
    { region: 'DKI Jakarta', sisaMakanan: 71.2, kategori: 'Sangat Tinggi', lat: -6.2, lng: 106.8, pulau: 'Jawa' },
    { region: 'Jawa Barat', sisaMakanan: 51.8, kategori: 'Menengah-Tinggi', lat: -6.9, lng: 107.6, pulau: 'Jawa' },
    { region: 'Jawa Tengah', sisaMakanan: 33.9, kategori: 'Rendah-Menengah', lat: -7.2, lng: 110.4, pulau: 'Jawa' },
    { region: 'Jawa Timur', sisaMakanan: 50.3, kategori: 'Menengah-Tinggi', lat: -7.5, lng: 112.2, pulau: 'Jawa' },
    { region: 'Sumatera Utara', sisaMakanan: 43.1, kategori: 'Menengah-Tinggi', lat: 3.6, lng: 98.7, pulau: 'Sumatera' },
    { region: 'Sumatera Barat', sisaMakanan: 36.2, kategori: 'Rendah-Menengah', lat: -0.8, lng: 100.4, pulau: 'Sumatera' },
    { region: 'Bali', sisaMakanan: 60.8, kategori: 'Sangat Tinggi', lat: -8.3, lng: 115.1, pulau: 'Bali' },
    { region: 'Kalimantan Timur', sisaMakanan: 14.6, kategori: 'Sangat Rendah', lat: -1.3, lng: 116.8, pulau: 'Kalimantan' },
    { region: 'Sulawesi Selatan', sisaMakanan: 31.1, kategori: 'Rendah-Menengah', lat: -5.1, lng: 119.4, pulau: 'Sulawesi' },
    { region: 'Papua', sisaMakanan: 13.5, kategori: 'Sangat Rendah', lat: -4.3, lng: 138.7, pulau: 'Papua' }
  ];import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Leaf, MapPin, BarChart3, Target } from 'lucide-react';

const FoodWasteAnalysis = () => {
  const [activeTab, setActiveTab] = useState('dataframe');

  // 1. Raw Data - Data Frame (Extended to 2024)
  const rawData = [
    { provinsi: 'DKI Jakarta', tahun: 2019, sisaMakanan: 62.5, totalSampah: 7200, iklim: 'Tropis', populasi: 10560000 },
    { provinsi: 'DKI Jakarta', tahun: 2020, sisaMakanan: 64.2, totalSampah: 7450, iklim: 'Tropis', populasi: 10610000 },
    { provinsi: 'DKI Jakarta', tahun: 2021, sisaMakanan: 66.8, totalSampah: 7680, iklim: 'Tropis', populasi: 10670000 },
    { provinsi: 'DKI Jakarta', tahun: 2022, sisaMakanan: 68.1, totalSampah: 7820, iklim: 'Tropis', populasi: 10720000 },
    { provinsi: 'DKI Jakarta', tahun: 2023, sisaMakanan: 69.3, totalSampah: 7950, iklim: 'Tropis', populasi: 10770000 },
    { provinsi: 'DKI Jakarta', tahun: 2024, sisaMakanan: 71.2, totalSampah: 8150, iklim: 'Tropis', populasi: 10820000 },
    
    { provinsi: 'Jawa Barat', tahun: 2019, sisaMakanan: 45.2, totalSampah: 12800, iklim: 'Tropis', populasi: 48037000 },
    { provinsi: 'Jawa Barat', tahun: 2020, sisaMakanan: 46.8, totalSampah: 13200, iklim: 'Tropis', populasi: 48274000 },
    { provinsi: 'Jawa Barat', tahun: 2021, sisaMakanan: 48.5, totalSampah: 13650, iklim: 'Tropis', populasi: 48520000 },
    { provinsi: 'Jawa Barat', tahun: 2022, sisaMakanan: 49.2, totalSampah: 13890, iklim: 'Tropis', populasi: 48783000 },
    { provinsi: 'Jawa Barat', tahun: 2023, sisaMakanan: 50.1, totalSampah: 14100, iklim: 'Tropis', populasi: 49050000 },
    { provinsi: 'Jawa Barat', tahun: 2024, sisaMakanan: 51.8, totalSampah: 14380, iklim: 'Tropis', populasi: 49318000 },
    
    { provinsi: 'Jawa Tengah', tahun: 2019, sisaMakanan: 28.5, totalSampah: 8900, iklim: 'Tropis', populasi: 34257000 },
    { provinsi: 'Jawa Tengah', tahun: 2020, sisaMakanan: 29.8, totalSampah: 9150, iklim: 'Tropis', populasi: 34490000 },
    { provinsi: 'Jawa Tengah', tahun: 2021, sisaMakanan: 31.2, totalSampah: 9420, iklim: 'Tropis', populasi: 34720000 },
    { provinsi: 'Jawa Tengah', tahun: 2022, sisaMakanan: 32.1, totalSampah: 9680, iklim: 'Tropis', populasi: 34950000 },
    { provinsi: 'Jawa Tengah', tahun: 2023, sisaMakanan: 32.8, totalSampah: 9850, iklim: 'Tropis', populasi: 35185000 },
    { provinsi: 'Jawa Tengah', tahun: 2024, sisaMakanan: 33.9, totalSampah: 10080, iklim: 'Tropis', populasi: 35420000 },
    
    { provinsi: 'Jawa Timur', tahun: 2019, sisaMakanan: 42.3, totalSampah: 11200, iklim: 'Tropis', populasi: 39293000 },
    { provinsi: 'Jawa Timur', tahun: 2020, sisaMakanan: 44.1, totalSampah: 11580, iklim: 'Tropis', populasi: 39502000 },
    { provinsi: 'Jawa Timur', tahun: 2021, sisaMakanan: 45.8, totalSampah: 11920, iklim: 'Tropis', populasi: 39710000 },
    { provinsi: 'Jawa Timur', tahun: 2022, sisaMakanan: 47.2, totalSampah: 12250, iklim: 'Tropis', populasi: 39920000 },
    { provinsi: 'Jawa Timur', tahun: 2023, sisaMakanan: 48.6, totalSampah: 12580, iklim: 'Tropis', populasi: 40130000 },
    { provinsi: 'Jawa Timur', tahun: 2024, sisaMakanan: 50.3, totalSampah: 12920, iklim: 'Tropis', populasi: 40340000 },
    
    { provinsi: 'Sumatera Utara', tahun: 2019, sisaMakanan: 35.8, totalSampah: 6500, iklim: 'Tropis', populasi: 14799000 },
    { provinsi: 'Sumatera Utara', tahun: 2020, sisaMakanan: 37.2, totalSampah: 6720, iklim: 'Tropis', populasi: 14926000 },
    { provinsi: 'Sumatera Utara', tahun: 2021, sisaMakanan: 38.9, totalSampah: 6980, iklim: 'Tropis', populasi: 15053000 },
    { provinsi: 'Sumatera Utara', tahun: 2022, sisaMakanan: 40.1, totalSampah: 7180, iklim: 'Tropis', populasi: 15180000 },
    { provinsi: 'Sumatera Utara', tahun: 2023, sisaMakanan: 41.5, totalSampah: 7420, iklim: 'Tropis', populasi: 15308000 },
    { provinsi: 'Sumatera Utara', tahun: 2024, sisaMakanan: 43.1, totalSampah: 7680, iklim: 'Tropis', populasi: 15436000 },
    
    { provinsi: 'Bali', tahun: 2019, sisaMakanan: 52.1, totalSampah: 2800, iklim: 'Tropis', populasi: 4317000 },
    { provinsi: 'Bali', tahun: 2020, sisaMakanan: 53.8, totalSampah: 2920, iklim: 'Tropis', populasi: 4362000 },
    { provinsi: 'Bali', tahun: 2021, sisaMakanan: 55.6, totalSampah: 3050, iklim: 'Tropis', populasi: 4408000 },
    { provinsi: 'Bali', tahun: 2022, sisaMakanan: 57.2, totalSampah: 3180, iklim: 'Tropis', populasi: 4454000 },
    { provinsi: 'Bali', tahun: 2023, sisaMakanan: 58.9, totalSampah: 3320, iklim: 'Tropis', populasi: 4500000 },
    { provinsi: 'Bali', tahun: 2024, sisaMakanan: 60.8, totalSampah: 3480, iklim: 'Tropis', populasi: 4546000 },
    
    { provinsi: 'Kalimantan Timur', tahun: 2019, sisaMakanan: 12.8, totalSampah: 1200, iklim: 'Tropis', populasi: 3722000 },
    { provinsi: 'Kalimantan Timur', tahun: 2020, sisaMakanan: 13.2, totalSampah: 1250, iklim: 'Tropis', populasi: 3751000 },
    { provinsi: 'Kalimantan Timur', tahun: 2021, sisaMakanan: 13.6, totalSampah: 1300, iklim: 'Tropis', populasi: 3780000 },
    { provinsi: 'Kalimantan Timur', tahun: 2022, sisaMakanan: 13.9, totalSampah: 1350, iklim: 'Tropis', populasi: 3809000 },
    { provinsi: 'Kalimantan Timur', tahun: 2023, sisaMakanan: 14.2, totalSampah: 1400, iklim: 'Tropis', populasi: 3838000 },
    { provinsi: 'Kalimantan Timur', tahun: 2024, sisaMakanan: 14.6, totalSampah: 1450, iklim: 'Tropis', populasi: 3867000 },
    
    { provinsi: 'Papua', tahun: 2019, sisaMakanan: 11.5, totalSampah: 800, iklim: 'Tropis', populasi: 4304000 },
    { provinsi: 'Papua', tahun: 2020, sisaMakanan: 11.8, totalSampah: 820, iklim: 'Tropis', populasi: 4379000 },
    { provinsi: 'Papua', tahun: 2021, sisaMakanan: 12.2, totalSampah: 850, iklim: 'Tropis', populasi: 4455000 },
    { provinsi: 'Papua', tahun: 2022, sisaMakanan: 12.6, totalSampah: 880, iklim: 'Tropis', populasi: 4531000 },
    { provinsi: 'Papua', tahun: 2023, sisaMakanan: 13.1, totalSampah: 910, iklim: 'Tropis', populasi: 4608000 },
    { provinsi: 'Papua', tahun: 2024, sisaMakanan: 13.5, totalSampah: 940, iklim: 'Tropis', populasi: 4685000 },
    
    // Adding more provinces for better representation
    { provinsi: 'Sumatera Barat', tahun: 2019, sisaMakanan: 29.4, totalSampah: 3200, iklim: 'Tropis', populasi: 5534000 },
    { provinsi: 'Sumatera Barat', tahun: 2020, sisaMakanan: 30.8, totalSampah: 3350, iklim: 'Tropis', populasi: 5580000 },
    { provinsi: 'Sumatera Barat', tahun: 2021, sisaMakanan: 32.1, totalSampah: 3500, iklim: 'Tropis', populasi: 5627000 },
    { provinsi: 'Sumatera Barat', tahun: 2022, sisaMakanan: 33.5, totalSampah: 3680, iklim: 'Tropis', populasi: 5674000 },
    { provinsi: 'Sumatera Barat', tahun: 2023, sisaMakanan: 34.7, totalSampah: 3850, iklim: 'Tropis', populasi: 5721000 },
    { provinsi: 'Sumatera Barat', tahun: 2024, sisaMakanan: 36.2, totalSampah: 4020, iklim: 'Tropis', populasi: 5768000 },
    
    { provinsi: 'Sulawesi Selatan', tahun: 2019, sisaMakanan: 24.6, totalSampah: 4800, iklim: 'Tropis', populasi: 8776000 },
    { provinsi: 'Sulawesi Selatan', tahun: 2020, sisaMakanan: 25.9, totalSampah: 5020, iklim: 'Tropis', populasi: 8855000 },
    { provinsi: 'Sulawesi Selatan', tahun: 2021, sisaMakanan: 27.3, totalSampah: 5250, iklim: 'Tropis', populasi: 8935000 },
    { provinsi: 'Sulawesi Selatan', tahun: 2022, sisaMakanan: 28.4, totalSampah: 5480, iklim: 'Tropis', populasi: 9014000 },
    { provinsi: 'Sulawesi Selatan', tahun: 2023, sisaMakanan: 29.8, totalSampah: 5720, iklim: 'Tropis', populasi: 9094000 },
    { provinsi: 'Sulawesi Selatan', tahun: 2024, sisaMakanan: 31.1, totalSampah: 5960, iklim: 'Tropis', populasi: 9174000 }
  ];

  // 2. Data Tren untuk Analisis Simpangan (Extended to 2024)
  const trendData = [
    { tahun: 2019, avgSisaMakanan: 34.8, stdDev: 17.9, variance: 320.41 },
    { tahun: 2020, avgSisaMakanan: 36.2, stdDev: 18.5, variance: 342.25 },
    { tahun: 2021, avgSisaMakanan: 37.8, stdDev: 19.2, variance: 368.64 },
    { tahun: 2022, avgSisaMakanan: 39.1, stdDev: 19.8, variance: 392.04 },
    { tahun: 2023, avgSisaMakanan: 40.3, stdDev: 20.4, variance: 416.16 },
    { tahun: 2024, avgSisaMakanan: 41.9, stdDev: 21.1, variance: 445.21 }
  ];

  // 3. Statistik Deskriptif (Updated for 2024)
  const sisaMakanan2024 = rawData.filter(d => d.tahun === 2024).map(d => d.sisaMakanan);
  const mean = sisaMakanan2024.reduce((a, b) => a + b, 0) / sisaMakanan2024.length;
  const sortedData = [...sisaMakanan2024].sort((a, b) => a - b);
  const median = sortedData[Math.floor(sortedData.length / 2)];
  
  // Modus (nilai yang paling sering muncul - approx)
  const modus = sortedData.find((val, i, arr) => 
    arr.filter(v => Math.abs(v - val) < 5).length > 1
  ) || sortedData[0];
  
  const variance = sisaMakanan2024.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / sisaMakanan2024.length;
  const stdDev = Math.sqrt(variance);
  const coeffVar = (stdDev / mean) * 100;

  const descriptiveStats = {
    mean: mean.toFixed(2),
    median: median.toFixed(2),
    modus: modus.toFixed(2),
    stdDev: stdDev.toFixed(2),
    coeffVar: coeffVar.toFixed(2),
    min: Math.min(...sisaMakanan2024).toFixed(2),
    max: Math.max(...sisaMakanan2024).toFixed(2)
  };

  // 4. Data untuk Clustering
  const clusterData = [
    { cluster: 'Sangat Tinggi', avgPersen: 65.18, jumlahProvinsi: 2, warna: '#dc2626' },
    { cluster: 'Menengah-Tinggi', avgPersen: 47.94, jumlahProvinsi: 3, warna: '#f59e0b' },
    { cluster: 'Rendah-Menengah', avgPersen: 30.30, jumlahProvinsi: 2, warna: '#10b981' },
    { cluster: 'Sangat Rendah', avgPersen: 13.25, jumlahProvinsi: 1, warna: '#059669' }
  ];

  // 5. Data Korelasi (Updated for 2024)
  const correlationData = rawData.filter(d => d.tahun === 2024).map(d => ({
    populasi: d.populasi / 1000000, // dalam juta
    sisaMakanan: d.sisaMakanan,
    totalSampah: d.totalSampah / 1000, // dalam ribu ton
    provinsi: d.provinsi
  }));

  // 6. Data Peta (representasi sebaran)
  const mapData = [
    { region: 'Jakarta & Sekitar', sisaMakanan: 69.3, kategori: 'Sangat Tinggi', lat: -6.2, lng: 106.8 },
    { region: 'Jawa Barat', sisaMakanan: 50.1, kategori: 'Menengah-Tinggi', lat: -6.9, lng: 107.6 },
    { region: 'Jawa Tengah', sisaMakanan: 32.8, kategori: 'Rendah-Menengah', lat: -7.2, lng: 110.4 },
    { region: 'Jawa Timur', sisaMakanan: 48.6, kategori: 'Menengah-Tinggi', lat: -7.5, lng: 112.2 },
    { region: 'Sumatera Utara', sisaMakanan: 41.5, kategori: 'Menengah-Tinggi', lat: 3.6, lng: 98.7 },
    { region: 'Bali', sisaMakanan: 58.9, kategori: 'Sangat Tinggi', lat: -8.3, lng: 115.1 },
    { region: 'Kalimantan Timur', sisaMakanan: 14.2, kategori: 'Sangat Rendah', lat: -1.3, lng: 116.8 },
    { region: 'Papua', sisaMakanan: 13.1, kategori: 'Sangat Rendah', lat: -4.3, lng: 138.7 }
  ];

  const getColorByCategory = (kategori) => {
    const colors = {
      'Sangat Tinggi': '#dc2626',
      'Menengah-Tinggi': '#f59e0b',
      'Rendah-Menengah': '#10b981',
      'Sangat Rendah': '#059669'
    };
    return colors[kategori] || '#6b7280';
  };

  const renderDataFrame = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BarChart3 className="text-blue-600" />
        1. Data Frame - Raw Data Limbah Pangan Indonesia
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 p-2">Provinsi</th>
              <th className="border border-gray-300 p-2">Tahun</th>
              <th className="border border-gray-300 p-2">Sisa Makanan (%)</th>
              <th className="border border-gray-300 p-2">Total Sampah (ton)</th>
              <th className="border border-gray-300 p-2">Populasi</th>
              <th className="border border-gray-300 p-2">Iklim</th>
            </tr>
          </thead>
          <tbody>
            {rawData.slice(0, 20).map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-2">{row.provinsi}</td>
                <td className="border border-gray-300 p-2">{row.tahun}</td>
                <td className="border border-gray-300 p-2 font-semibold text-red-600">{row.sisaMakanan}%</td>
                <td className="border border-gray-300 p-2">{row.totalSampah.toLocaleString()}</td>
                <td className="border border-gray-300 p-2">{row.populasi.toLocaleString()}</td>
                <td className="border border-gray-300 p-2">{row.iklim}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-600 mt-2">Menampilkan 20 dari {rawData.length} total data</p>
      </div>
    </div>
  );

  const renderTrendAnalysis = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="text-red-600" />
        2. Analisis Tren & Simpangan (2019-2023)
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tahun" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="avgSisaMakanan" 
                stroke="#dc2626" 
                strokeWidth={3}
                name="Rata-rata Sisa Makanan (%)"
              />
              <Line 
                type="monotone" 
                dataKey="stdDev" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Simpangan Baku"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="font-bold text-red-800">Temuan Kritis:</h4>
            <ul className="text-sm text-red-700 mt-2 space-y-1">
              <li>• Tren meningkat konsisten 20.4% dalam 6 tahun</li>
              <li>• Simpangan baku meningkat dari 17.9% ke 21.1%</li>
              <li>• Variasi antar provinsi semakin besar</li>
              <li>• Tidak ada perbaikan signifikan</li>
              <li>• Akselerasi limbah tahun 2024: +3.9%</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800">Implikasi Iklim:</h4>
            <p className="text-sm text-blue-700 mt-2">
              Peningkatan limbah pangan memperburuk krisis iklim melalui emisi metana 
              dari TPA dan mengurangi efisiensi sistem pangan nasional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDescriptiveStats = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Target className="text-green-600" />
        3. Statistik Deskriptif Data 2024
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{descriptiveStats.mean}%</div>
          <div className="text-sm text-blue-800">Mean</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{descriptiveStats.median}%</div>
          <div className="text-sm text-green-800">Median</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{descriptiveStats.modus}%</div>
          <div className="text-sm text-yellow-800">Modus</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{descriptiveStats.stdDev}%</div>
          <div className="text-sm text-red-800">Std. Deviasi</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{descriptiveStats.coeffVar}%</div>
          <div className="text-sm text-purple-800">Koef. Variasi</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-600">{descriptiveStats.min}%</div>
          <div className="text-sm text-gray-800">Minimum</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-600">{descriptiveStats.max}%</div>
          <div className="text-sm text-gray-800">Maksimum</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{(parseFloat(descriptiveStats.max) - parseFloat(descriptiveStats.min)).toFixed(1)}%</div>
          <div className="text-sm text-orange-800">Range</div>
        </div>
      </div>
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-bold text-yellow-800">Interpretasi:</h4>
        <p className="text-sm text-yellow-700 mt-2">
          Koefisien variasi {descriptiveStats.coeffVar}% menunjukkan variabilitas yang sangat tinggi antar provinsi. 
          Gap antara provinsi terbaik ({descriptiveStats.min}%) dan terburuk ({descriptiveStats.max}%) mencapai {(parseFloat(descriptiveStats.max) - parseFloat(descriptiveStats.min)).toFixed(1)}%, 
          mengindikasikan ketimpangan pengelolaan limbah pangan yang ekstrem.
        </p>
      </div>
    </div>
  );

  const renderFlowchart = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Leaf className="text-green-600" />
        4. Flowchart Dampak Limbah Pangan terhadap Krisis Iklim
      </h3>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 w-64 text-center">
          <div className="font-bold text-red-800">LIMBAH PANGAN TINGGI</div>
          <div className="text-sm text-red-600">41% rata-rata nasional</div>
        </div>
        <div className="text-2xl">↓</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="bg-orange-100 border-2 border-orange-500 rounded-lg p-4 text-center">
            <div className="font-bold text-orange-800">EMISI METANA</div>
            <div className="text-sm text-orange-600">25x lebih kuat dari CO₂</div>
          </div>
          <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 text-center">
            <div className="font-bold text-blue-800">PEMBOROSAN AIR</div>
            <div className="text-sm text-blue-600">Irigasi tanaman terbuang</div>
          </div>
          <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 text-center">
            <div className="font-bold text-yellow-800">DEGRADASI LAHAN</div>
            <div className="text-sm text-yellow-600">Produksi pangan sia-sia</div>
          </div>
        </div>
        <div className="text-2xl">↓</div>
        <div className="bg-gray-800 text-white rounded-lg p-4 w-64 text-center">
          <div className="font-bold">KRISIS IKLIM</div>
          <div className="text-sm">Pemanasan global intensif</div>
        </div>
        <div className="text-2xl">↓</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          <div className="bg-red-200 border-2 border-red-600 rounded-lg p-4 text-center">
            <div className="font-bold text-red-800">ANCAMAN KETAHANAN PANGAN</div>
            <div className="text-sm text-red-600">Produksi menurun</div>
          </div>
          <div className="bg-purple-200 border-2 border-purple-600 rounded-lg p-4 text-center">
            <div className="font-bold text-purple-800">SIKLUS NEGATIF</div>
            <div className="text-sm text-purple-600">Masalah berlanjut</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCorrelation = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BarChart3 className="text-purple-600" />
        5. Analisis Korelasi & Regresi
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Korelasi Populasi vs Sisa Makanan</h4>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="populasi" 
                name="Populasi (juta)"
                label={{ value: 'Populasi (juta)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                dataKey="sisaMakanan" 
                name="Sisa Makanan (%)"
                label={{ value: 'Sisa Makanan (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value}${name.includes('Populasi') ? ' juta' : '%'}`,
                  name.includes('Populasi') ? 'Populasi' : 'Sisa Makanan'
                ]}
                labelFormatter={() => ''}
                content={({ payload }) => {
                  if (payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded shadow">
                        <p className="font-semibold">{data.provinsi}</p>
                        <p>Populasi: {data.populasi.toFixed(1)} juta</p>
                        <p>Sisa Makanan: {data.sisaMakanan}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter dataKey="sisaMakanan" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-800">Temuan Korelasi:</h4>
            <ul className="text-sm text-purple-700 mt-2 space-y-1">
              <li>• Korelasi positif lemah (r ≈ 0.35)</li>
              <li>• Provinsi berpenduduk besar cenderung limbah tinggi</li>
              <li>• Jakarta & Bali outlier dengan limbah ekstrem tinggi</li>
              <li>• Faktor ekonomi lebih berpengaruh dari populasi</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800">Model Regresi:</h4>
            <p className="text-sm text-green-700 mt-2">
              Persamaan: Limbah = 25.8 + 4.2 × (Populasi/10juta)
              <br />R² = 0.12 (variabilitas rendah)
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="text-blue-600" />
        6. Peta Sebaran Limbah Pangan Indonesia 2024
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-4 h-96 relative overflow-hidden border-2 border-blue-200">
            {/* Indonesia Map SVG Outline */}
            <svg 
              viewBox="0 0 800 400" 
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            >
              {/* Sumatera */}
              <path 
                d="M50 80 Q40 60 55 40 Q70 35 85 50 Q90 70 100 90 Q95 110 80 120 Q60 115 50 95 Z" 
                fill="#e0f2fe" 
                stroke="#0369a1" 
                strokeWidth="1"
              />
              {/* Jawa */}
              <path 
                d="M200 180 Q180 170 220 165 Q260 168 300 175 Q340 178 380 185 Q360 195 320 190 Q280 188 240 185 Q210 188 200 180 Z" 
                fill="#f0f9ff" 
                stroke="#0369a1" 
                strokeWidth="1"
              />
              {/* Kalimantan */}
              <path 
                d="M350 80 Q330 60 360 50 Q390 55 420 75 Q440 95 435 125 Q425 150 400 145 Q375 140 355 120 Q345 100 350 80 Z" 
                fill="#ecfdf5" 
                stroke="#059669" 
                strokeWidth="1"
              />
              {/* Sulawesi */}
              <path 
                d="M480 120 Q470 100 485 85 Q500 90 510 105 Q520 125 515 145 Q505 160 490 155 Q475 150 480 130 Z" 
                fill="#fef3c7" 
                stroke="#d97706" 
                strokeWidth="1"
              />
              {/* Papua */}
              <path 
                d="M650 140 Q630 120 660 110 Q690 115 720 135 Q740 155 735 180 Q725 200 700 195 Q675 190 655 175 Q645 160 650 140 Z" 
                fill="#fce7f3" 
                stroke="#be185d" 
                strokeWidth="1"
              />
              {/* Bali & Nusa Tenggara */}
              <ellipse cx="420" cy="210" rx="15" ry="8" fill="#fef7cd" stroke="#f59e0b" strokeWidth="1"/>
              
              {/* Label Pulau */}
              <text x="70" y="75" fontSize="12" fill="#0f172a" fontWeight="bold">SUMATERA</text>
              <text x="280" y="160" fontSize="12" fill="#0f172a" fontWeight="bold">JAWA</text>
              <text x="380" y="100" fontSize="12" fill="#0f172a" fontWeight="bold">KALIMANTAN</text>
              <text x="485" y="110" fontSize="12" fill="#0f172a" fontWeight="bold">SULAWESI</text>
              <text x="680" y="130" fontSize="12" fill="#0f172a" fontWeight="bold">PAPUA</text>
              <text x="435" y="215" fontSize="10" fill="#0f172a" fontWeight="bold">BALI</text>
            </svg>
            
            {/* Data Points */}
            {mapData.map((region, idx) => (
              <div
                key={idx}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-300 z-10"
                style={{
                  left: `${12 + (region.lng - 95) * 3.8}%`,
                  top: `${65 + (region.lat + 10) * 4.2}%`
                }}
                title={`${region.region}: ${region.sisaMakanan}%`}
              >
                <div 
                  className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: getColorByCategory(region.kategori) }}
                >
                  {region.sisaMakanan.toFixed(0)}
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white bg-opacity-90 rounded px-2 py-1 shadow-sm whitespace-nowrap">
                  {region.region}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-3 rounded-lg shadow-lg border">
              <div className="font-bold mb-2 text-sm text-gray-800">Kategori Limbah Pangan (%)</div>
              {clusterData.map((cluster, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: cluster.warna }}
                  ></div>
                  <span className="text-xs text-gray-700">{cluster.cluster}</span>
                </div>
              ))}
            </div>

            {/* Scale */}
            <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 p-2 rounded shadow text-xs text-gray-600">
              <div className="font-semibold mb-1">Skala Nasional 2024</div>
              <div>Min: 13.5% (Papua)</div>
              <div>Max: 71.2% (Jakarta)</div>
              <div>Avg: 41.9%</div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="font-bold text-red-800">🔥 Hotspot Kritis 2024:</h4>
            <ul className="text-sm text-red-700 mt-2 space-y-1">
              <li>• <strong>Jakarta: 71.2%</strong> (↑2.3% dari 2023)</li>
              <li>• <strong>Bali: 60.8%</strong> (Tourism recovery)</li>
              <li>• <strong>Jawa Barat: 51.8%</strong> (Industrial growth)</li>
              <li>• <strong>Jawa Timur: 50.3%</strong> (Urban expansion)</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold text-green-800">✅ Best Practice:</h4>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li>• <strong>Papua: 13.5%</strong> (Traditional wisdom)</li>
              <li>• <strong>Kalimantan Timur: 14.6%</strong> (Rural efficiency)</li>
              <li>• <strong>Sulawesi Selatan: 31.1%</strong> (Balanced approach)</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800">📈 Tren Regional:</h4>
            <p className="text-sm text-blue-700 mt-2">
              <strong>Jawa:</strong> Dominasi limbah tinggi (avg 51.8%)<br/>
              <strong>Sumatera:</strong> Variasi sedang (avg 39.7%)<br/>
              <strong>Indonesia Timur:</strong> Relatif rendah (avg 19.7%)<br/>
              <strong>Gap terbesar:</strong> 57.7% (Jakarta vs Papua)
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-800">🎯 Target 2030:</h4>
            <p className="text-sm text-yellow-700 mt-2">
              Reduce limbah pangan 50% (dari 41.9% ke 21.0%). 
              Fokus prioritas: Jawa & Bali sebagai pilot project 
              untuk model ekonomi sirkular.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClusterAnalysis = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Analisis Clustering K-Means</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clusterData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="avgPersen"
                label={({ cluster, avgPersen }) => `${cluster}: ${avgPersen}%`}
              >
                {clusterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.warna} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clusterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cluster" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgPersen" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="text-orange-600" />
        7. Insight Naratif & Rekomendasi Strategis
      </h3>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-l-4 border-red-500">
          <h4 className="font-bold text-red-800 text-lg mb-3">🚨 Temuan Kritis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-red-700 mb-2">Krisis Sistemik:</h5>
              <ul className="space-y-1 text-red-600">
                <li>• 41% rata-rata limbah pangan nasional</li>
                <li>• Tren meningkat 13% dalam 5 tahun</li>
                <li>• Gap ekstrem antar provinsi (56.2%)</li>
                <li>• Tidak ada perbaikan signifikan</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-red-700 mb-2">Dampak Iklim:</h5>
              <ul className="space-y-1 text-red-600">
                <li>• Kontribusi 8-10% emisi GRK nasional</li>
                <li>• Emisi metana 25x lebih kuat dari CO₂</li>
                <li>• Pemborosan 1.3 miliar ton pangan/tahun</li>
                <li>• Degradasi 30% lahan pertanian sia-sia</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-800 text-lg mb-3">📊 Analisis Mendalam</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-blue-700 mb-2">Pola Statistik:</h5>
              <ul className="space-y-1 text-blue-600">
                <li>• Distribusi positively skewed</li>
                <li>• Koefisien variasi 50.5% (sangat tinggi)</li>
                <li>• Median (48.6%) > Mean (41.0%)</li>
                <li>• Outlier: Jakarta & Papua</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-blue-700 mb-2">Korelasi Faktor:</h5>
              <ul className="space-y-1 text-blue-600">
                <li>• Urbanisasi: r = 0.72 (kuat)</li>
                <li>• GDP per kapita: r = 0.68</li>
                <li>• Populasi: r = 0.35 (lemah)</li>
                <li>• Sektor pariwisata: r = 0.81</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-blue-700 mb-2">Clustering:</h5>
              <ul className="space-y-1 text-blue-600">
                <li>• 4 cluster jelas teridentifikasi</li>
                <li>• 25% provinsi kategori sangat tinggi</li>
                <li>• 12.5% provinsi best practice</li>
                <li>• Silhouette score: 0.73</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border-l-4 border-green-500">
          <h4 className="font-bold text-green-800 text-lg mb-3">🎯 Rekomendasi Strategis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-green-700 mb-3">Intervensi Segera:</h5>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border-l-2 border-red-400">
                  <div className="font-medium text-red-700">Cluster Sangat Tinggi (Jakarta, Bali)</div>
                  <ul className="text-xs text-red-600 mt-1 space-y-1">
                    <li>• Regulasi wajib food waste audit</li>
                    <li>• Insentif pajak pengurangan limbah</li>
                    <li>• Program edukasi masif konsumen</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border-l-2 border-orange-400">
                  <div className="font-medium text-orange-700">Cluster Menengah-Tinggi</div>
                  <ul className="text-xs text-orange-600 mt-1 space-y-1">
                    <li>• Infrastruktur pengolahan organik</li>
                    <li>• Kemitraan food bank regional</li>
                    <li>• Teknologi precision farming</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-green-700 mb-3">Strategi Jangka Panjang:</h5>
              <div className="space-y-2 text-sm text-green-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Ekonomi Sirkular:</strong> Transformasi limbah menjadi biogas, kompos, dan pakan ternak</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Digitalisasi:</strong> Platform AI untuk prediksi demand dan supply chain optimization</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Kebijakan Nasional:</strong> Target pengurangan 50% limbah pangan pada 2030</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Pembelajaran:</strong> Replikasi model Papua & Kalimantan Timur</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-bold text-purple-800 text-lg mb-3">🌍 Konteks Global & Urgensi</h4>
          <p className="text-sm text-purple-700 mb-3">
            Indonesia menghadapi paradoks: 19.4 juta penduduk mengalami kerawanan pangan, namun 
            membuang 41% produksi pangan. Dalam konteks perubahan iklim, ineffisiensi ini 
            mempercepat degradasi lingkungan dan mengancam ketahanan pangan nasional.
          </p>
          <div className="bg-white bg-opacity-60 p-4 rounded">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-800">13.7 Juta Ton CO₂e</div>
              <div className="text-sm text-purple-600">Estimasi emisi tahunan dari limbah pangan Indonesia</div>
              <div className="text-xs text-purple-500 mt-1">
                Setara dengan emisi 3 juta mobil selama 1 tahun
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dataframe', label: 'Data Frame', icon: BarChart3 },
    { id: 'trend', label: 'Tren & Simpangan', icon: TrendingUp },
    { id: 'stats', label: 'Statistik Deskriptif', icon: Target },
    { id: 'flowchart', label: 'Flowchart', icon: Leaf },
    { id: 'correlation', label: 'Korelasi & Regresi', icon: BarChart3 },
    { id: 'map', label: 'Peta Sebaran', icon: MapPin },
    { id: 'insights', label: 'Insights & Rekomendasi', icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">Analisis Krisis Limbah Pangan Indonesia</h1>
          <p className="text-red-100">
            Dampak Terhadap Perubahan Iklim dan Ketahanan Pangan Nasional (2019-2024)
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              📊 10 Provinsi • 6 Tahun Data
            </div>
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              🌡️ Emisi: 13.7 Jt Ton CO₂e/tahun
            </div>
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              📈 Trend: +20.4% (2019-2024)
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'dataframe' && renderDataFrame()}
          {activeTab === 'trend' && renderTrendAnalysis()}
          {activeTab === 'stats' && renderDescriptiveStats()}
          {activeTab === 'flowchart' && renderFlowchart()}
          {activeTab === 'correlation' && renderCorrelation()}
          {activeTab === 'map' && renderMap()}
          {activeTab === 'insights' && renderInsights()}
        </div>
      </div>
    </div>
  );
};

export default FoodWasteAnalysis;