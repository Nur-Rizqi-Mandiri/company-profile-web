/**
 * Website Configuration
 * Centralize all static content here for easy updates.
 */

const CONFIG = {
    company: {
        name: "PT. Nur Rizqi Mandiri",
        description: "Mitra terpercaya Anda untuk layanan katering premium. Menghadirkan cita rasa nusantara dan internasional dengan kualitas terbaik.",
        short_description: "Katering Premium & Manajemen Layanan Makanan"
    },
    contact: {
        address: "Jl. Katering No. 123, Jakarta",
        phone: "+62 812 3456 7890",
        phone_display: "(021) 123-4567", // For footer/contact page display if different
        email: "info@nurrizqimandiri.com",
        whatsapp: "999999999", // Number only for link
        email_target: "info@nurrizqimandiri.com" // For form submission
    },
    hours: {
        text: "Sen - Jum: 09:00 - 18:00",
        saturday: "Sab: 10:00 - 16:00"
    },
    certifications: [
        { id: "halal", title: "Halal MUI", number: "No. 123456789", issuer: "MUI Indonesia", icon: "🕌", badge: "Kualitas" },
        { id: "hygiene", title: "Laik Hygiene", number: "Dinkes DKI Jakarta", issuer: "Kemenkes RI", icon: "🛡️", badge: "Keamanan" },
        { id: "apji", title: "Anggota APJI", number: "Asosiasi Jasa Boga", issuer: "APJI Pusat", icon: "🤝", badge: "Profesional" }
    ],
    trusted_by: [
        { name: "Indofood", url: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Indofood_logo-id.svg" },
        { name: "TPK Koja", url: "https://www.tpkkoja.co.id/wp-content/uploads/2023/02/TPK-KOJA.png" },
        { name: "Metro TV", url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Metro_%28MetroTV%29_2023_logo.png" },
        { name: "Astronacci", url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Logo_Astronacci_Intenational.png" },
    ],
    hero_slides: [
        { image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=40&fm=webp", alt: "Hidangan Katering Segar" },
        { image: "assets/img/hero/hero_carousel_1_premium_buffet.png", alt: "Premium Buffet" },
        { image: "assets/img/hero/hero_carousel_2_chef_plating.png", alt: "Chef Plating" },
        { image: "assets/img/hero/hero_carousel_3_corporate_lunch_box.png", alt: "Corporate Lunch Box" }
    ],
    menu_items: [
        { title: "Organic Green Bowls", desc: "Sayuran segar langsung dari kebun dengan saus vinaigrette.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60" },
        { title: "Prime Rib Platter", desc: "Daging iga panggang lambat dengan rempah pilihan.", image: "https://images.unsplash.com/photo-1558030006-45ef64fabfa0?auto=format&fit=crop&w=800&q=60" },
        { title: "Artisan Desserts", desc: "Mousse dan kue-kue buatan tangan yang lezat.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=60" },
        { title: "Nasi Bali Premium", desc: "Nasi campur Bali lengkap dengan sate lilit dan sambal matah.", image: "https://images.unsplash.com/photo-1541518763669-279f00ed42e5?auto=format&fit=crop&w=800&q=60" },
        { title: "Salmon Steak en Croûte", desc: "Salmon segar yang dipanggang dalam kulit pastry renyah.", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=60" },
        { title: "Beef Wellington", desc: "Fillet mignon dengan duxelles jamur dalam pastry emas.", image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=60" },
        { title: "Tumpeng Nusantara", desc: "Sajian tumpeng tradisional dengan lauk pauk khas Indonesia.", image: "https://images.unsplash.com/photo-1581447124352-4752c1fe4154?auto=format&fit=crop&w=800&q=60" },
        { title: "Dim Sum Platter", desc: "Variasi dim sum artisan yang dikukus hangat.", image: "https://images.unsplash.com/photo-1496116216417-63f4306c586e?auto=format&fit=crop&w=800&q=60" },
        { title: "Premium Fruit Tart", desc: "Pencuci mulut buah-buahan segar dengan krim vanilla lembut.", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=60" }
    ],
    packages: {
        wedding: [
            { name: "Silver Package", features: ["1 Appetizer", "1 Soup", "4 Main Course", "1 Dessert", "Air Mineral"] },
            { name: "Gold Package", badge: "Best Value", features: ["2 Appetizer", "1 Soup", "5 Main Course", "2 Dessert", "Food Tasting (4 Org)"] },
            { name: "Platinum Package", features: ["2 Appetizer", "2 Soup", "6 Main Course", "3 Dessert & Stall", "Premium Decoration"] }
        ],
        corporate: [
            { name: "Coffee Break", features: ["2 Snack Choices", "Aromatic Coffee", "Tea Selection", "Minimal 50 Pax", "Durasi 2 Jam"] },
            { name: "Lunch Box Premium", badge: "Popular", features: ["Nasi Putih/Daun Jeruk", "1 Protein Utama", "1 Sayuran", "1 Lauk Pendamping", "Buah Potong & Air"] },
            { name: "Executive Buffet", features: ["Full Buffet Setup", "Appetizer to Dessert", "VIP Service", "Table Setup", "Free Flow Drink"] }
        ],
        social: [
            { name: "Kids Birthday", features: ["Kids Friendly Menu", "Mini Burgers/Pasta", "Chocolate Fountain", "Fruit Satay", "Cute Presentation"] },
            { name: "Family Reunion", badge: "Favorite", features: ["Menu Prasmanan Nusantara", "Tumpeng Mini", "Es Buah Segar", "Live Cooking (Opsional)", "Lesehan Setup Available"] },
            { name: "Private Dinner", features: ["Plated Service (Fine Dining)", "5 Courses Menu", "Personal Chef", "Table Decor", "Minimal 10 Pax"] }
        ]
    },
    gallery_items: [
        { title: "Organic Green Bowls", desc: "Sayuran segar dari kebun dengan vinaigrette khas kami.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=40&fm=webp" },
        { title: "Tata Letak Prasmanan Elegan", desc: "Setup yang indah untuk acara pernikahan outdoor.", image: "https://i.imgur.com/q0Va3Vz.png" },
        { title: "Artisan Desserts", desc: "Mouse dan kue kering buatan tangan yang memanjakan lidah.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=40&fm=webp" },
        { title: "Suasana Acara", desc: "Kami menciptakan pengalaman bersantap yang tak terlupakan.", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=40&fm=webp" }
    ],
    moments_images: [
        { url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80", class: "big" },
        { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", class: "tall" },
        { url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80", class: "" },
        { url: "https://images.unsplash.com/photo-1470256699805-a29e1b58598a?auto=format&fit=crop&w=1200&q=80", class: "wide" },
        { url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", class: "" },
        { url: "https://res.cloudinary.com/spothopper/image/fetch/f_auto,q_auto:best,c_fit,h_1200/http://static.spotapps.co/spots/47/29dea0176041c5a0ae640a71dbe24f/:original", class: "tall" },
        // New Images
        { url: "https://images.storemantap.com/823/_assets/images/uploads/tinymce/image/hungry-asian-woman-licks-red-painted-lips-looks-tasty-hamburger-picks-delicious-snack-break-diet.jpg", class: "big" }, // Wedding table
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsfR6QS0Jda7nwIK4qy1bSXSRVzJmQxmt0LA&s", class: "wide" }, // Celebration
        { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg", class: "" }, // Food detail
        { url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80", class: "tall" }, // Meat carving
        { url: "https://foodunpacked.com/wp-content/uploads/2022/01/AdobeStock_216474104-scaled.jpeg", class: "" }  // Fine dining plate
    ],

    features: [
        { id: "fresh", icon: "🌿", title: "Bahan Segar", desc: "Bahan premium dari supplier lokal terpercaya." },
        { id: "chef", icon: "👨‍🍳", title: "Koki Profesional", desc: "Tim dapur berpengalaman event kecil hingga besar." },
        { id: "time", icon: "⏱️", title: "Layanan Tepat Waktu", desc: "Setup rapi dan tepat waktu tanpa kompromi kualitas." },
        { id: "custom", icon: "✨", title: "Menu Kustom", desc: "Menu fleksibel sesuai tema dan kebutuhan klien." }
    ],
    services: [
        {
            icon: "💍",
            title: "Pernikahan",
            desc: "Dari makan malam piring yang elegan hingga prasmanan rustic, kami membuat hari besar Anda terasa nikmat.",
            longDesc: "Layanan katering pernikahan kami dirancang untuk menciptakan kenangan yang tak terlupakan. Kami menawarkan berbagai pilihan menu mulai dari hidangan tradisional nusantara yang otentik hingga menu internasional yang modern. Tim kami akan membantu Anda merencanakan setiap detail, mulai dari penyusunan menu hingga dekorasi prasmanan yang selaras dengan tema pernikahan Anda.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
        },
        {
            icon: "🤝",
            title: "Korporat",
            desc: "Buat klien Anda terkesan dengan kotak makan siang yang canggih, rehat kopi, dan makan malam eksekutif.",
            longDesc: "Kami memahami pentingnya profesionalisme dalam acara korporat. Baik itu rapat dewan direksi, seminar, atau peluncuran produk, kami menyediakan layanan makanan yang efisien dan berkualitas tinggi. Kotak makan siang premium kami dikemas secara elegan, sementara layanan coffee break kami menawarkan berbagai pilihan kudapan segar dan kopi aromatik untuk menjaga energi tim Anda tetap tinggi.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
        },
        {
            icon: "🎉",
            title: "Acara Pribadi",
            desc: "Ulang tahun, hari jadi, atau reuni keluarga. Kami menangani makanannya agar Anda bisa fokus menjamu tamu.",
            longDesc: "Rayakan momen spesial Anda bersama orang-orang terkasih tanpa rasa khawatir. Layanan katering acara pribadi kami mencakup berbagai jenis perayaan seperti ulang tahun, pertunangan, arisan, hingga reuni keluarga. Kami menawarkan kemudahan dengan beragam paket fleksibel yang dapat disesuaikan dengan anggaran dan preferensi rasa keluarga Anda.",
            image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=800&q=80"
        }
    ],
    history: [
        {
            year: "2010",
            title: "Awal Mula",
            desc: "Berdiri sebagai unit katering rumahan yang berdedikasi menghadirkan cita rasa masakan rumah yang otentik kepada tetangga dan kolega."
        },
        {
            year: "2014",
            title: "Ekspansi & Sertifikasi",
            desc: "Mulai melayani acara pernikahan skala besar dan berhasil memperoleh sertifikasi Halal pertama dari MUI."
        },
        {
            year: "2018",
            title: "Inovasi Dapur Modern",
            desc: "Membangun fasilitas dapur industri yang memenuhi standar kesehatan internasional untuk mendukung katering korporat."
        },
        {
            year: "2023",
            title: "Mitra Terpercaya",
            desc: "Dipercaya menjadi partner katering resmi di berbagai acara kenegaraan dan perusahaan multinasional terkemuka."
        }
    ],
    stats: [
        { id: "years", number: "14+", label: "Tahun Pengalaman" },
        { id: "events", number: "1.200+", label: "Event Terselenggara" },
        { id: "guests", number: "150K+", label: "Tamu Terlayani" },
        { id: "satisfaction", number: "98%", label: "Kepuasan Klien" }
    ],
    process: [
        { icon: "fas fa-comments", number: "1", title: "Konsultasi", desc: "Diskusi gratis mengenai kebutuhan, tanggal, dan anggaran acara Anda." },
        { icon: "fas fa-utensils", number: "2", title: "Food Testing", desc: "Cicipi menu pilihan Anda untuk memastikan rasa sesuai selera." },
        { icon: "fas fa-file-invoice-dollar", number: "3", title: "Penawaran", desc: "Kami kirimkan detail paket dan harga transparan tanpa biaya tersembunyi." },
        { icon: "fas fa-handshake", number: "4", title: "Deal", desc: "Konfirmasi pesanan dan biarkan kami yang mengurus sisanya." }
    ],
    testimonials: [
        { text: "\"Makanannya luar biasa dan tim sangat profesional. Semua tamu puas.\"", author: "Rina, Klien Pernikahan", image: "" },
        { text: "\"Pelayanan cepat, rasa konsisten, dan presentasi elegan.\"", author: "Andi, Acara Korporat", image: "" },
        { text: "\"Catering terbaik yang pernah kami gunakan untuk acara keluarga.\"", author: "Sari, Pesta Pribadi", image: "" }
    ],
    videos: [
        { id: 'dQw4w9WgXcQ', title: 'Video Katering 1', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' },
        { id: 'LxR_7cbb100', title: 'Video Katering 2', thumbnail: 'https://img.youtube.com/vi/LxR_7cbb100/maxresdefault.jpg' },
        { id: '9d8wWcJLnFI', title: 'Video Katering 3', thumbnail: 'https://img.youtube.com/vi/9d8wWcJLnFI/maxresdefault.jpg' }
    ],
    faq: [
        { q: "Apakah bisa melakukan food testing sebelum memesan?", a: "Tentu saja! Kami menyediakan sesi food testing gratis untuk pemesanan pernikahan di atas 500 pax. Untuk acara lain, silakan hubungi tim kami untuk jadwal food testing reguler." },
        { q: "Berapa minimal pemesanan catering?", a: "Untuk prasmanan (buffet), minimal pemesanan adalah 50 porsi. Untuk nasi box/snack box, minimal 30 box. Kami juga melayani private dining untuk jumlah yang lebih kecil." },
        { q: "Apakah area layanan mencakup seluruh Jabodetabek?", a: "Ya, kami melayani seluruh area Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Untuk lokasi di luar Jabodetabek, akan dikenakan biaya tambahan transportasi." },
        { q: "Apakah menyediakan menu untuk diet khusus?", a: "Kami sangat fleksibel. Kami bisa menyediakan menu vegetarian, vegan, bebas gluten, atau menu diet khusus lainnya sesuai permintaan Anda." }
    ]
};
