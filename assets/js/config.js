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
    certifications: {
        halal: "No. 123456789",
        hygiene: "Dinkes DKI Jakarta",
        apji: "Asosiasi Jasa Boga"
    },
    trusted_by: [
        { name: "Indofood", url: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Indofood_logo-id.svg" },
        { name: "TPK Koja", url: "https://www.tpkkoja.co.id/wp-content/uploads/2023/02/TPK-KOJA.png" },
        { name: "Metro TV", url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Metro_%28MetroTV%29_2023_logo.png" },
        { name: "Bank BCA", url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" },
        { name: "Astronacci", url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Logo_Astronacci_Intenational.png" },
        { name: "Angkasa Pura II", url: "https://seeklogo.com/images/A/angkasa-pura-2-logo-C168333333-seeklogo.com.png" },
        { name: "Nanzaby Family Futsal", url: "https://via.placeholder.com/150x50?text=Nanzaby+Family+Futsal" }
    ],
    hero_slides: [
        { image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=40&fm=webp", alt: "Hidangan Katering Segar" },
        { image: "assets/img/hero/hero_carousel_1_premium_buffet.png", alt: "Premium Buffet" },
        { image: "assets/img/hero/hero_carousel_2_chef_plating.png", alt: "Chef Plating" },
        { image: "assets/img/hero/hero_carousel_3_corporate_lunch_box.png", alt: "Corporate Lunch Box" }
    ],
    menu_items: [
        { title: "Organic Green Bowls", desc: "Sayuran segar langsung dari kebun dengan saus vinaigrette.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=50&fm=webp" },
        { title: "Prime Rib Platter", desc: "Daging iga panggang lambat dengan rempah pilihan.", image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=50&fm=webp" },
        { title: "Artisan Desserts", desc: "Mousse dan kue-kue buatan tangan yang lezat.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=50&fm=webp" }
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
        { title: "Tata Letak Prasmanan Elegan", desc: "Setup yang indah untuk acara pernikahan outdoor.", image: "https://images.unsplash.com/photo-1470256699805-a29e1b58598a?auto=format&fit=crop&w=800&q=40&fm=webp" },
        { title: "Artisan Desserts", desc: "Mouse dan kue kering buatan tangan yang memanjakan lidah.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=40&fm=webp" },
        { title: "Suasana Acara", desc: "Kami menciptakan pengalaman bersantap yang tak terlupakan.", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=40&fm=webp" }
    ],
    moments_images: [
        { url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80", class: "big" },
        { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", class: "tall" },
        { url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80", class: "" },
        { url: "https://images.unsplash.com/photo-1470256699805-a29e1b58598a?auto=format&fit=crop&w=1200&q=80", class: "wide" },
        { url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", class: "" },
        { url: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80", class: "" }
    ]
};
