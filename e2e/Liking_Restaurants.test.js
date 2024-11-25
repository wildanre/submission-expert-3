Feature('Searching Restaurants');

Before(({ I }) => {
    I.amOnPage('http://127.0.0.1:9000/');
});

Scenario('Mencari restoran"melting pot" dan klik "Lihat" yang akan ke halaman detail', ({ I }) => {

    I.seeElement('#searchInput');
    I.fillField('#searchInput', 'melting pot');
    I.wait(1);
    I.waitForElement('#search_view-details-btn', 5);
    I.click('.search_view-details-btn');
    I.wait(1);
    I.seeInCurrentUrl('/restaurant/');
    I.seeInCurrentUrl('rqdv5juczeskfw1e867');
});

Scenario('Menambahkan "Melting Pot" ke restoran favorit', ({ I }) => {
    I.amOnPage('http://127.0.0.1:9000/#/restaurant/rqdv5juczeskfw1e867');
    I.wait(2); // Tunggu beberapa detik untuk memastikan halaman dimuat
    I.seeElement('#likeButton'); // Pastikan tombol "Like" atau tombol favorit ada
    // Klik tombol "Like" untuk menambahkan restoran ke favorit
    I.click('#likeButton');
    I.wait(1);
    // Pergi ke halaman favorit
    I.amOnPage('http://127.0.0.1:9000/#/favorites');
    I.wait(2);
    // Pastikan "Melting Pot" muncul di daftar favorit
    I.seeElement('a[href="#/restaurant/rqdv5juczeskfw1e867"]');
    I.see('Melting Pot');
});

Scenario('Menghapus "Melting Pot" dari restoran favorit', ({ I }) => {
    // Pergi ke halaman favorit
    I.amOnPage('http://127.0.0.1:9000/#/favorites');
    I.wait(3); // Tunggu agar halaman favorit dimuat

    // Pastikan restoran "Melting Pot" ada di daftar favorit
    I.seeElement('a[href="#/restaurant/rqdv5juczeskfw1e867"]');
    I.see('Melting Pot');

    // Pergi ke halaman detail restoran "Melting Pot"
    I.amOnPage('http://127.0.0.1:9000/#/restaurant/rqdv5juczeskfw1e867');
    I.wait(2);

    //klik untuk menambahkan ke favorit terlebih dahulu
    I.seeElement('#likeButton'); 
    I.click('#likeButton');
    I.wait(2);
    
    I.seeElement('#likeButton'); 
    I.click('#likeButton'); // Klik tombol untuk menghapus dari favorit

    // Kembali ke halaman favorit
    I.amOnPage('http://127.0.0.1:9000/#/favorites');
    I.wait(3); // Tunggu agar halaman favorit dimuat

    // Pastikan restoran "Melting Pot" tidak lagi ada di daftar favorit
    I.dontSeeElement('a[href="#/restaurant/rqdv5juczeskfw1e867"]');
    I.dontSee('Melting Pot');


});

Scenario('Menambahkan ulasan untuk restoran "Melting Pot"', ({ I }) => {
    // Pergi ke halaman detail restoran "Melting Pot"
    I.amOnPage('http://127.0.0.1:9000/#/restaurant/rqdv5juczeskfw1e867');
    I.wait(5);

    // Pastikan tombol untuk memberikan review ada
    I.seeElement('#addReviewBtn');
    I.click('#addReviewBtn'); // Klik tombol "Berikan Review"

    // Isi nama reviewer
    I.seeElement('#reviewerName'); // Pastikan input nama ada
    I.fillField('#reviewerName', 'dimas'); // Isi nama reviewer

    // Isi review
    I.seeElement('#reviewContent'); // Pastikan textarea untuk review ada
    I.fillField('#reviewContent', 'makanannya enak dan harganya terjangkau'); // Isi konten review

    // Klik tombol submit untuk mengirimkan review
    I.click('button[type="submit"]'); // Klik tombol submit
    I.wait(2);

    // Tunggu proses pengiriman ulasan selesai
    I.wait(2);

    // Klik tombol "Tampilkan Review"
    I.seeElement('#showReviewsBtn');
    I.click('#showReviewsBtn'); // Klik untuk menampilkan ulasan

    // Verifikasi bahwa ulasan berhasil ditambahkan
    I.waitForElement('#reviewsContainer', 5);
    I.seeElement('#reviewsContainer');
    I.wait(5);
});
