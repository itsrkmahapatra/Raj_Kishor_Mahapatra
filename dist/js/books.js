/**
 * books.js — The Library Engine.
 * Handles all book data, rendering, filtering, searching, and modal logic.
 * Loaded only on books.html — because separation of concerns isn't just a suggestion.
 */

'use strict';

// ── Book Catalogue Data ────────────────────────────────────────────────────────
const BOOKS = [
    { title: "The Land of Bhadrakali", date: "Jun 5, 2026", image: "https://images-na.ssl-images-amazon.com/images/P/B0GZVZ5P8R.01.LZZZZZZZ.jpg", genre: "Odisha Heritage & Culture", synopsis: "A Comprehensive Historical Odyssey of Odisha's Sacred District. Explores the rich mythology, architectural heritage, sacred rituals, and cultural legacy woven around the divine legend of Bhadrakali in Odisha.", link: "https://www.amazon.com/dp/B0GZVZ5P8R" },
    { title: "The Gateway of Western Odisha", date: "Jun 5, 2026", image: "https://images-na.ssl-images-amazon.com/images/P/B0GZ46PM21.01.LZZZZZZZ.jpg", genre: "Odisha Heritage & Culture", synopsis: "A Comprehensive History of Odisha's Rice Bowl and the Cultural Legacy of Dhanu Yatra. Chronicles the historical, cultural, and geographical significance of Western Odisha and its famous theatrical heritage.", link: "https://www.amazon.com/dp/B0GZ46PM21" },
    { title: "The Soul of Balangir", date: "Jun 5, 2026", image: "https://images-na.ssl-images-amazon.com/images/P/B0GX2WNW5X.01.LZZZZZZZ.jpg", genre: "Odisha Heritage & Culture", synopsis: "A Comprehensive Journey Through the History and Cultural Heritage of Western Odisha. Explores the soul, traditions, temples, and remarkable heritage of Balangir district through vivid narrative and historical research.", link: "https://www.amazon.com/dp/B0GX2WNW5X" },
    { title: "The Maritime Gate: A History of Balasore", date: "Jun 5, 2026", image: "https://images-na.ssl-images-amazon.com/images/P/B0GY5NXQKY.01.LZZZZZZZ.jpg", genre: "Odisha Heritage & Culture", synopsis: "A comprehensive history of Balasore — Odisha's historic coastal gateway. Traces maritime trade routes, colonial encounters, and the rich cultural tapestry of this sea-facing district.", link: "https://www.amazon.com/dp/B0GY5NXQKY" },
    { title: "The Soul of the Black Diamond", date: "Jun 5, 2026", image: "https://images-na.ssl-images-amazon.com/images/P/B0GX2YCL3B.01.LZZZZZZZ.jpg", genre: "Odisha Heritage & Culture", synopsis: "An evocative exploration of the coal belt region of Odisha — the 'Black Diamond' — tracing its social, historical, and cultural identity through industrialization, tribal heritage, and natural abundance.", link: "https://www.amazon.com/dp/B0GX2YCL3B" },
    { title: "The Paper Continent: Asian Literature", date: "Apr 14, 2026", image: "https://images-na.ssl-images-amazon.com/images/P/B0GX33R6TW.01.LZZZZZZZ.jpg", genre: "Literature & Fiction", synopsis: "A Journey Through the Diverse Literary Landscapes of Asia. Explores the richness, complexity, and cultural depth of Asian literature — from ancient epics and classical poetry to contemporary voices across East, South, and Southeast Asia.", link: "https://www.amazon.com/dp/B0GX33R6TW" },
    { title: "The 2-Hour Workday", date: "Jun 19, 2026", image: "https://images-na.ssl-images-amazon.com/images/P/B0H63FRBDJ.01.LZZZZZZZ.jpg", genre: "Productivity & Self-Help", synopsis: "A Practical Guide to Deep Work, AI Automation, and Ruthless Prioritization. Learn to compress a full day's output into two focused hours using smart systems, AI tools, and discipline-driven habits.", link: "https://www.amazon.com/dp/B0H63FRBDJ" },

    { title: "The 30-Day Confidence Code", date: "Jan 7, 2026", image: "../images/46.jpg", genre: "Productivity & Self-Help", synopsis: "A step-by-step, science-light path to lasting confidence in 30 days. Through daily exercises and reflective journal prompts, this book offers a structured framework for exploring self-perception and building awareness of personal strengths.", link: "https://www.amazon.com/dp/B0GDXPV4TZ" },
    { title: "The Sustainable-ish Garden", date: "Aug 19, 2025", image: "../images/42.jpg", genre: "Environment & Sustainability", synopsis: "A beginner's guide to growing food and reducing waste without the pressure of perfection. Tailored for urban dwellers and anyone with limited space to cultivate fresh, healthy food.", link: "https://www.amazon.in/dp/B0FJ7L5K8K" },
    { title: "The Prompt Engineer's Handbook", date: "Aug 17, 2025", image: "../images/41.jpg", genre: "AI & Machine Learning", synopsis: "Mastering AI communication for daily work and beyond. A comprehensive 100-chapter curriculum covering foundational prompts, real-world workflows, RAG, autonomous ReAct agents, and security against prompt injection.", link: "https://www.amazon.in/dp/B0FMT3CP9Y" },
    { title: "The Soul of India", date: "Jul 18, 2025", image: "../images/43.jpg", genre: "Odisha Heritage & Culture", synopsis: "A complete documentary on Odisha. An in-depth, district-wise exploration unlocking the rich tapestry, traditions, and historical significance of all 30 districts of Odisha.", link: "https://www.amazon.in/dp/B0FJ641HFG" },
    { title: "Mastering RRB NTPC", date: "Jul 11, 2025", image: "../images/44.jpg", genre: "Career & Exam Prep", synopsis: "A complete guide for aspirants aiming to join the Indian Railways. Equips you with timeless strategies to decode exam patterns, master Maths, Reasoning, and GK with minimal effort.", link: "https://www.amazon.in/dp/B0FHDDGJ8F" },
    { title: "Starlit Seeds: A Solarpunk Romance", date: "Jun 24, 2025", image: "../images/37.jpg", genre: "Literature & Fiction", synopsis: "In a sun-scorched desert oasis named Verdis, brilliant engineer Lila Chen and botanist Ezra Morales navigate clashing visions and blooming romance amidst domed greenhouses and glowing starlit flowers.", link: "https://www.amazon.in/dp/B0FFGTFH62" },
    { title: "Unlocking Transparency: Guide to RTI Act", date: "Mar 10, 2025", image: "../images/38.jpg", genre: "Law & Governance", synopsis: "A beginner's guide to the Right to Information (RTI) Act. Empowers citizens, students, and journalists to seek clarity from public authorities and navigate bureaucracy with confidence.", link: "https://www.amazon.in/dp/B0F1449NC4" },
    { title: "Whispers of the Divine: Maa Balakumari", date: "Feb 16, 2025", image: "../images/39.jpg", genre: "Odisha Heritage & Culture", synopsis: "Unveiling the mysteries of Maa Balakumari Temple in Chikiti, Odisha. Explores rich mythology, architectural marvels, sacred rituals, and testimonies of devotion and timeless grace.", link: "https://www.amazon.in/dp/B0DXFRSRTZ" },
    { title: "Crafted Elegance: Handicrafts of Odisha", date: "Jan 17, 2025", image: "../images/18.jpg", genre: "Odisha Heritage & Culture", synopsis: "A journey into the exquisite handicrafts of Odisha and the skilled artisans behind them. Encompasses traditional textiles, pottery, metalwork, intricate woodwork, and filigree jewelry.", link: "https://www.amazon.in/dp/B0CSQCKV53" },
    { title: "HMPV Virus: Understanding Metapneumovirus", date: "Jan 5, 2025", image: "../images/40.jpg", genre: "Public Health & Medicine", synopsis: "A comprehensive guide to the Human Metapneumovirus (HMPV). Delves into virology, transmission, diagnostic molecular techniques, economic burden, and pandemic preparedness.", link: "https://www.amazon.in/dp/B0DSCFNC69" },
    { title: "Mastering Run Command", date: "Jan 2, 2025", image: "../images/33.jpg", genre: "Computing & Software", synopsis: "A complete guide to efficient computing. Unlock hidden tools, automate routine tasks, access advanced Registry/Group Policy tools, and streamline your Windows OS productivity.", link: "https://www.amazon.in/dp/B0DD4ZYKGV" },
    { title: "Indian New Year Quotes", date: "Dec 30, 2024", image: "../images/34.jpg", genre: "History & Indian Culture", synopsis: "Inspiration for every occasion. Celebrates the spirit of Indian New Year festivals across diverse regional cultures and traditions with profound, uplifting quotes.", link: "https://www.amazon.in/dp/B0DRWF8S2D" },
    { title: "Pentesting Lab on Android Without Root", date: "Dec 5, 2024", image: "../images/14.jpg", genre: "Cybersecurity & Hacking", synopsis: "Setting up your complete penetration testing lab directly on an Android device without requiring root access. Hands-on mobile security and ethical hacking workflows.", link: "https://www.amazon.in/dp/B0CPMYGGPN" },
    { title: "The Last Byte: A Techno-Thriller", date: "Sep 3, 2024", image: "../images/35.jpg", genre: "Literature & Fiction", synopsis: "When reclusive software engineer Alex Carter receives an encrypted message on an air-gapped computer, he is thrust back into a global cyber conspiracy where a single keystroke can bring nations to their knees.", link: "https://www.amazon.in/dp/B0DG43H34D" },
    { title: "Excel in Action: Unleashing VBA", date: "Sep 2, 2024", image: "../images/36.jpg", genre: "Computing & Software", synopsis: "Unleashing the power of Visual Basic for Applications (VBA) in Microsoft Excel. Comprehensive guide to automating complex workflows and transforming financial/business data analysis.", link: "https://www.amazon.in/dp/B0DFXJXG6Z" },
    { title: "Digital Empires: Rise of Data Colonies", date: "Aug 24, 2024", image: "../images/30.jpg", genre: "Digital Media & Society", synopsis: "An eye-opening analysis of data colonization. Explores how tech giants wield unprecedented power through massive internet data harvesting and the ethical dilemmas of modern digital control.", link: "https://www.amazon.in/dp/B0DF6CG7NB" },
    { title: "Whispers of the Wind: Tale of Unseen Love", date: "Aug 24, 2024", image: "../images/29.jpg", genre: "Literature & Fiction", synopsis: "An evocative novel that speaks directly to the heart across New York, Tuscany, and Tokyo. A deeply moving tale of unseen love, human connection, and cherished memories.", link: "https://www.amazon.in/dp/B0DF67SZ66" },
    { title: "MPOX (Monkeypox) Virus Guide", date: "Aug 17, 2024", image: "../images/32.jpg", genre: "Public Health & Medicine", synopsis: "Why is it spreading so quickly? Comprehensive reference on transmission pathways, clinical symptoms, TPOXX (Tecovirimat) antiviral treatment, and WHO public health response.", link: "https://www.amazon.in/dp/B0D72SCN8Q" },
    { title: "Incredible India: A Traveller's Guide", date: "Aug 17, 2024", image: "../images/31.jpg", genre: "History & Indian Culture", synopsis: "Your ultimate companion to India's diverse landscapes. From Himalayan treks and heritage landmarks like the Taj Mahal to serene southern backwaters and desert safaris.", link: "https://www.amazon.in/dp/B0DDJPNCHM" },
    { title: "भारत में गर्भपात: एक समग्र दृष्टिकोण", date: "Aug 14, 2024", image: "../images/28.jpg", genre: "Public Health & Medicine", synopsis: "A comprehensive 50-chapter Hindi guide examining legal, social, ethical, and medical care dimensions of abortion in India along with government regulations.", link: "https://www.amazon.in/dp/B0DD8YF4H8" },
    { title: "सावधान! क्या आप चीनी का नशा करतें हैं?", date: "Aug 10, 2024", image: "../images/26.jpg", genre: "Public Health & Medicine", synopsis: "A thought-provoking Hindi book detailing the serious health impacts of sugar addiction and practical, accessible steps for overcoming sugar dependency for lifelong wellness.", link: "https://www.amazon.in/dp/B0DCTS9WCH" },
    { title: "Intimacy Unveiled: Depths of Connection", date: "Jul 31, 2024", image: "../images/25.jpg", genre: "Productivity & Self-Help", synopsis: "Exploring the depths of human connection across 50+ chapters. Practical advice, real-world examples, and emotional dimensions for cultivating healthier, more fulfilling relationships.", link: "https://www.amazon.in/dp/B0DBXK9T8M" },
    { title: "Dangerous Whiteners and Glue", date: "Jul 22, 2024", image: "../images/24.jpg", genre: "Public Health & Medicine", synopsis: "The hidden epidemic of household substance misuse. Raises awareness and educates communities on the severe health risks and societal impacts of inhalant abuse.", link: "https://www.amazon.in/dp/B0D9KVGBPF" },
    { title: "Echoes of Eternity", date: "Jul 21, 2024", image: "../images/23.jpg", genre: "Literature & Fiction", synopsis: "A 100-chapter tome bridging history, philosophy, and digital age realities. Explores timeless human themes of love, ambition, and existential meaning with actionable wisdom.", link: "https://www.amazon.in/dp/B0D9VXHMRT" },
    { title: "Mindful Machina: AI & Human Brain", date: "Jul 19, 2024", image: "../images/19.jpg", genre: "AI & Machine Learning", synopsis: "Navigating the interplay between artificial intelligence and conscious thought. Unravels the complex dynamics and profound possibilities when human consciousness and machines converge.", link: "https://www.amazon.in/dp/B0CSWDNQWC" },
    { title: "Digital Sovereignty: Online Safety", date: "Jul 18, 2024", image: "../images/22.jpg", genre: "Cybersecurity & Hacking", synopsis: "Navigating foreign influence on India's internet infrastructure. 100+ chapters covering cybersecurity best practices, data protection, and defending national and individual digital sovereignty.", link: "https://www.amazon.in/dp/B0D4JYFPV6" },
    { title: "Garena Free Fire: Beginner's Guide", date: "Jul 2, 2024", image: "../images/21.jpg", genre: "Gaming & Esports", synopsis: "The ultimate tactical and account protection guide for mobile esports. Master game mechanics, competitive strategies, and safeguarding personal gaming data.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Ethical Hacking and the Dark Web", date: "May 23, 2024", image: "../images/20.jpg", genre: "Cybersecurity & Hacking", synopsis: "A comprehensive guide to penetration testing, network vulnerabilities, and navigating the enigmatic Dark Web using anonymity tools while adhering to legal/ethical standards.", link: "https://www.amazon.in/dp/B0D54FBH3L" },
    { title: "Echoes of Freedom: Republic Day in India", date: "Jan 16, 2024", image: "../images/17.jpg", genre: "History & Indian Culture", synopsis: "The story of Republic Day in democratic India. Chronicles the constitutional history, civic values, and enduring patriotic spirit that unites the nation.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "YouTube Royalty: India's Top Creators", date: "Jan 16, 2024", image: "../images/15.jpg", genre: "Digital Media & Society", synopsis: "Unveiling the strategies, monetization frameworks, and creative growth secrets behind India's most successful and influential YouTube content creators.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Digital Dawn: Digital Media's Rise in India", date: "Jan 16, 2024", image: "../images/16.jpg", genre: "Digital Media & Society", synopsis: "The unfolding story of digital media's explosive rise, mobile internet adoption, and societal transformation across urban and rural India.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Rising Flames of Freedom", date: "Aug 16, 2023", image: "../images/13.jpg", genre: "History & Indian Culture", synopsis: "Chronicles of India's heroic journey to independence. Honors the sacrifices, revolutionary movements, and unyielding determination of freedom fighters.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Shackled Sovereignty", date: "Aug 7, 2023", image: "../images/12.jpg", genre: "Law & Governance", synopsis: "A critical analysis of political monopolies, institutional control, and civic rights in India, advocating for grassroots transparency, accountability, and democratic renewal.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "PIPASA: India's Water Crisis", date: "Jul 30, 2023", image: "../images/11.jpg", genre: "Environment & Sustainability", synopsis: "An investigative documentary study on the severe water crisis in Barmer, Rajasthan. Examines environmental challenges and sustainable resource conservation.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "AI in the Environment: Tomorrow's World", date: "Jul 30, 2023", image: "../images/10.jpg", genre: "AI & Machine Learning", synopsis: "Transforming tomorrow's world through AI-driven data analytics, predictive climate modeling, and ecological conservation for a sustainable global future.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Computer Basics: Comprehensive Guide", date: "Jul 29, 2023", image: "../images/9.jpg", genre: "Computing & Software", synopsis: "A user-friendly, accessible guide demystifying modern computer systems, hardware architecture, and foundational digital literacy for readers of all backgrounds.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Resilience: KBK Odisha's Transformation", date: "Jul 28, 2023", image: "../images/8.jpg", genre: "Odisha Heritage & Culture", synopsis: "An inspiring 100-chapter chronicle of the Kalahandi-Bolangir-Koraput (KBK) region's remarkable journey through agricultural revival, education, and tribal heritage.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Cyber Security: Safeguarding Digital Realm", date: "Jul 27, 2023", image: "../images/7.jpg", genre: "Cybersecurity & Hacking", synopsis: "Essential zero-trust strategies, quantum-resistant cryptography, IoT defense, and incident response frameworks for safeguarding modern enterprise and personal networks.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Ethical Hacking: Guide to Cybersecurity", date: "Jul 20, 2023", image: "../images/5.jpg", genre: "Cybersecurity & Hacking", synopsis: "Unraveling the secrets of ethical hacking, defensive security, vulnerability assessments, and cyber resilience to defend against sophisticated cyber threats.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Tara Tarini Temple: Sacred Journey", date: "Jul 19, 2023", image: "../images/2.jpg", genre: "Odisha Heritage & Culture", synopsis: "A mesmerizing spiritual pilgrimage to the ancient Tara Tarini Temple in Odisha. Explores divine feminine energies, architectural wonders, and timeless enlightenment.", link: "https://www.amazon.in/dp/B0CCC8SBDY" },
    { title: "Whispers of Love: Romantic Stories", date: "Jul 19, 2023", image: "../images/3.jpg", genre: "Literature & Fiction", synopsis: "A collection of captivating romantic tales exploring serendipity, passion, vulnerability, and the unbreakable bonds of love across life's journey.", link: "https://www.amazon.com/dp/B0CD13JTRX" },
    { title: "Ganjam: Unveiling the Soul of a Land", date: "Jul 18, 2023", image: "../images/6.jpg", genre: "Odisha Heritage & Culture", synopsis: "An enchanting journey through the history, ancient temples, pristine beaches, and vibrant cultural heritage of Ganjam district in Odisha.", link: "https://www.amazon.in/dp/B0CCC5YJRW" },
    { title: "Gandhi: The Life and Legacy", date: "Jul 3, 2023", image: "../images/1.jpg", genre: "History & Indian Culture", synopsis: "Soul Force: A definitive, meticulously researched portrait of Mahatma Gandhi's life from Porbandar to his immortal legacy of nonviolence and social justice.", link: "https://www.amazon.in/dp/B0CB4BT3HD" },
    { title: "भारत में मंकीपॉक्स: विस्तृत अध्ययन", date: "Aug 22, 2023", image: "../images/27.jpg", genre: "Public Health & Medicine", synopsis: "A comprehensive Hindi reference on the history, symptoms, transmission, and public health management of Monkeypox virus.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
    { title: "Hack AI", date: "Jul 20, 2023", image: "../images/45.jpg", genre: "AI & Machine Learning", synopsis: "Ethical complexities, machine intelligence frontiers, and cybersecurity challenges in the era of artificial general intelligence.", link: "https://www.amazon.com/dp/B0CD32SJKY" },
    { title: "Digital Arrest", date: "Jun 1, 2026", image: "../images/47.jpg", genre: "Cybersecurity & Hacking", synopsis: "A critical exposé and comprehensive defense manual against modern cyber fraud and fake digital arrest scams targeting citizens.", link: "https://www.amazon.in/dp/B0H5KKQQ1B" },
    { title: "Mastering Computer Shortcut Keys", date: "Jul 19, 2023", image: "../images/4.jpg", genre: "Computing & Software", synopsis: "A comprehensive daily workflow guide for boosting productivity across Windows, macOS, Linux, and multi-OS environments.", link: "https://www.amazon.in/stores/author/B0FMT3CP9Y" },
];

// Sort books chronologically: top new, bottom old
BOOKS.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

// ── State ──────────────────────────────────────────────────────────────────────
let activeFilter = 'All';

// ── DOM References ─────────────────────────────────────────────────────────────
const bookGrid = document.getElementById('book-grid');
const filtersDiv = document.getElementById('filters');
const categorySelect = document.getElementById('category-select');
const searchInput = document.getElementById('search-input');
const noResults = document.getElementById('no-results');

// ── Helpers ────────────────────────────────────────────────────────────────────
function getGenres() {
    return ['All', ...Array.from(new Set(BOOKS.map(b => b.genre))).sort()];
}

// ── Render: Filter Pills & Category Dropdown ───────────────────────────────
function renderFilters() {
    const genres = getGenres();

    if (categorySelect) {
        categorySelect.innerHTML = genres.map(genre => `
            <option value="${genre}" ${genre === activeFilter ? 'selected' : ''}>
                ${genre === 'All' ? 'All Categories (54+ Books)' : genre}
            </option>
        `).join('');

        categorySelect.onchange = (e) => {
            activeFilter = e.target.value;
            renderFilters();
            renderBooks();
        };
    }

    if (filtersDiv) {
        filtersDiv.innerHTML = '';
        genres.forEach(genre => {
            const btn = document.createElement('button');
            btn.textContent = genre;
            btn.className = 'filter-btn whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-200 ' +
                (genre === activeFilter
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'border-white/10 text-gray-500 hover:border-[#00D2FF] hover:text-[#00D2FF]');
            btn.addEventListener('click', () => {
                activeFilter = genre;
                renderFilters();
                renderBooks();
            });
            filtersDiv.appendChild(btn);
        });
    }
}

// ── Render: Book Grid ────────────────────────────────────────────────────────
function renderBooks() {
    if (!bookGrid) return;
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const filtered = BOOKS.filter(b => {
        const matchesFilter = activeFilter === 'All' || b.genre === activeFilter;
        const matchesSearch = !query ||
            b.title.toLowerCase().includes(query) ||
            b.genre.toLowerCase().includes(query) ||
            b.synopsis.toLowerCase().includes(query);
        return matchesFilter && matchesSearch;
    }).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    bookGrid.innerHTML = '';

    if (filtered.length === 0) {
        noResults && noResults.classList.remove('hidden');
        return;
    }
    noResults && noResults.classList.add('hidden');

    filtered.forEach(book => {
        const card = document.createElement('div');
        card.className = 'glass-card group cursor-pointer overflow-hidden p-3 flex flex-col justify-between';
        card.innerHTML = `
            <div>
                <div class="aspect-[2/3] overflow-hidden rounded-lg mb-3 bg-black/50">
                    <img src="${book.image}" alt="${book.title}" loading="lazy" decoding="async"
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                         onerror="this.style.background='#111827'">
                </div>
                <div class="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                    <span class="inline-block px-2 py-0.5 text-[10px] font-semibold text-[#D4AF37] bg-[#D4AF37]/10 rounded">${book.genre}</span>
                    ${book.date ? `<span class="text-[10px] font-medium text-gray-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5"><i class="far fa-calendar-alt mr-1 text-[#D4AF37]/70"></i>${book.date}</span>` : ''}
                </div>
                <p class="text-white text-xs font-bold leading-snug line-clamp-2">${book.title}</p>
            </div>
            <div class="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                <span class="text-[11px] font-semibold text-gray-400 group-hover:text-white transition">View Details</span>
                <i class="fas fa-arrow-right text-[10px] text-[#D4AF37] group-hover:translate-x-1 transition-transform"></i>
            </div>
        `;
        card.addEventListener('click', () => openBookModal(book));
        bookGrid.appendChild(card);
    });
}

// ── Render: Book Detail Modal ────────────────────────────────────────────────
function openBookModal(book) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;
    content.innerHTML = `
        <div class="w-full md:w-52 flex-shrink-0">
            <img src="${book.image}" alt="${book.title}" loading="lazy" decoding="async" class="w-full rounded-xl border border-white/10 object-cover shadow-xl">
        </div>
        <div class="flex-1 flex flex-col justify-between py-1">
            <div>
                <div class="flex items-center gap-2 mb-3 flex-wrap">
                    <span class="badge-pill">${book.genre}</span>
                    ${book.date ? `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300"><i class="far fa-calendar-alt mr-1.5 text-[#D4AF37]"></i>Published: ${book.date}</span>` : ''}
                </div>
                <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">${book.title}</h2>
                <p class="text-gray-300 text-sm md:text-base leading-relaxed mb-6">${book.synopsis}</p>
            </div>
            <div class="flex items-center gap-4 pt-4 border-t border-white/10">
                <a href="${book.link}" target="_blank" rel="noopener noreferrer" class="btn-primary !py-2.5 !px-6">
                   Get Publication <i class="fas fa-external-link-alt text-xs"></i>
                </a>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

// ── Modal Event Listeners ─────────────────────────────────────────────────────
const bookModal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => bookModal.classList.add('hidden'));
}
if (bookModal) {
    bookModal.addEventListener('click', e => {
        if (e.target === bookModal) bookModal.classList.add('hidden');
    });
}

// ── Search Listener ───────────────────────────────────────────────────────────
if (searchInput) {
    searchInput.addEventListener('input', renderBooks);
}

// ── Initialise ────────────────────────────────────────────────────────────────
if (bookGrid) {
    renderFilters();
    renderBooks();
}
