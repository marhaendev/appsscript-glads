# Google Apps Script API Documentation - GLADS

## Deskripsi
Dokumentasi ini menjelaskan API yang digunakan untuk mengakses dan mengelola data di Google Spreadsheet menggunakan Google Apps Script.
GLADS ialah singkatan dari 
Get Login Append Delete Set 
## Daftar Isi
- [Instalasi Kode AppScript](#instalasi-kode-appscript)
- [Semua Endpoint](#semua-endpoint)
- [Contoh Tabel Spreadsheet](#contoh-tabel-spreadsheet)
- [Endpoint Berdasarkan Contoh dan Responsenya](#endpoint-berdasarkan-contoh-dan-responsenya)
- [Contact](#contact)

## Instalasi Kode AppScript
Untuk menggunakan API ini, Anda perlu mengatur dan mempublikasikan skrip Apps Script di Google Spreadsheet Anda.
### Menambahkan AppsScript
- Buka Google Sheets.
- Klik pada **Extensions > Apps Script**.
- Salin dan tempelkan script **api.js** ke editor script.
- Simpan script tersebut.
- Publikasikan script sebagai web app melalui **Deploy > New deployment** dan ikuti langkah-langkah untuk mendapatkan URL web app.

### Contoh url yang benar
- SCRIPT_ID: **abcdefghijklmn**
  
    ```
    https://script.google.com/macros/s/abcdefghijklmn/exec?action=get&sheet=Sheet1
    ```

## Semua Endpoint

### Endpoint untuk Aksi `get`
1. **Mendapatkan data dari seluruh lembar kerja**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1
   ```
   
2. **Mendapatkan data dari baris pertama**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1&row=1
   ```

3. **Mendapatkan data dari kolom kedua**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1&col=2
   ```

4. **Mendapatkan data dari baris terakhir yang memiliki nilai**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1&row=x
   ```

5. **Mendapatkan data dari kolom terakhir yang memiliki nilai**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1&col=x
   ```

### Endpoint untuk Aksi `set`
1. **Menyetel nilai pada baris pertama**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=set&sheet=Sheet1&row=1&values=10,20,30
   ```

2. **Menyetel nilai pada kolom ketiga**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=set&sheet=Sheet1&col=3&values=A,B,C
   ```

3. **Menyetel nilai pada baris terakhir yang memiliki nilai**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=set&sheet=Sheet1&row=x&values=70,80,90
   ```

4. **Menyetel nilai pada kolom terakhir yang memiliki nilai**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=set&sheet=Sheet1&col=x&values=G,H,I
   ```

### Endpoint untuk Aksi `append`
1. **Menambahkan nilai setelah baris kedua**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=append&sheet=Sheet1&row=2&values=40,50,60
   ```

2. **Menambahkan nilai setelah kolom keempat**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=append&sheet=Sheet1&col=4&values=D,E,F
   ```

3. **Menambahkan nilai setelah baris terakhir yang memiliki nilai**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=append&sheet=Sheet1&row=x&values=100,110,120
   ```

4. **Menambahkan nilai setelah kolom terakhir yang memiliki nilai**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=append&sheet=Sheet1&col=x&values=J,K,L
   ```

### Endpoint untuk Aksi `delete`
1. **Menghapus baris ketiga**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=delete&sheet=Sheet1&row=3
   ```

2. **Menghapus kolom kelima**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=delete&sheet=Sheet1&col=5
   ```

3. **Menghapus baris terakhir yang memiliki nilai**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=delete&sheet=Sheet1&row=x
   ```

4. **Menghapus kolom terakhir yang memiliki nilai**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=delete&sheet=Sheet1&col=x
   ```

5. **Menghapus beberapa baris sekaligus**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=delete&sheet=Sheet1&row=2,4,6
   ```

6. **Menghapus beberapa kolom sekaligus**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=delete&sheet=Sheet1&col=3,5,7
   ```

### Endpoint untuk Aksi `login`
1. **Login pengguna dengan username**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=login&sheet=Sheet1&user=johndoe&email=&pass=123456&cols=1,2,3
   ```

2. **Login pengguna dengan email**
   ```
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=login&sheet=Sheet1&user=&email=johndoe@example.com&pass=123456&cols=1,2,3
   ```

## Contoh Tabel Spreadsheet
Berikut adalah contoh tabel yang digunakan untuk menguji endpoint yang tersedia di dokumentasi ini.

| Action   | Deskripsi                               | URL                                                 |
|----------|-----------------------------------------|-----------------------------------------------------|
| **get**  | Mendapatkan data dari seluruh lembar kerja | `GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1` |
| **get**  | Mendapatkan data dari baris pertama     | `GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1&row=1` |
| **get**  | Mendapatkan data dari kolom kedua       | `GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1&col=2` |
| ...      | ...                                     | ...                                                 |

## Endpoint Berdasarkan Contoh dan Responsenya
Berikut adalah beberapa contoh penggunaan endpoint dengan data dari spreadsheet yang telah ditentukan.

### Contoh Penggunaan Endpoint dengan Data Spreadsheet

1. **Mendapatkan data dari seluruh lembar kerja**
   ```plaintext
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=get&sheet=Sheet1
   ```
   **Output:**
   ```json
   {
     "response": 200,
     "status": "success",
     "data": [
       ["User ID", "Username", "Email", "Password", "Role"],
       ["1", "johndoe", "johndoe@example.com", "pass123", "Admin"],
       ["2", "janedoe", "janedoe@example.com", "pass456", "User"],
       ...
     ]
   }
   ```

2. **Login pengguna dengan username**
   ```plaintext
   GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?action=login&sheet=Sheet1&user=johndoe&pass=123456&cols=1,2,3
   ```
   **Output:**
   ```json
   {
     "response": 200,
     "status": "success",
     "message": "Login berhasil",
     "data": ["1", "johndoe", "johndoe@example.com"]
   }
   ```

## Contact
Untuk informasi lebih lanjut atau pertanyaan, jangan ragu untuk menghubungi [marhaendev.com](mailto:marhaendev.com).
