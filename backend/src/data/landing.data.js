const landingData = {
  navigation: {
    logo: {
      alt: "Hackathon 2025 Logo",
      url: "https://sumnsumn?",
    },
    menu: [
      { name: "Home", anchor: "#home" },
      { name: "Champion Prizes", anchor: "#prizes" },
      { name: "About", anchor: "#about" },
      { name: "FAQ", anchor: "#faq" },
      { name: "Timeline", anchor: "#timeline" },
    ],
  },

  hero: {
    eventName: "Hackathon '25",
    eventTheme: "Innovating for a Sustainable Future",
    recapMedia: {
      type: "video",
      url: "https://placeholderlmao",
    },
  },

  about: {
    description:
      "Hackathon merupakan sebuah kegiatan kolaboratif yang mempertemukan individu atau tim dalam waktu terbatas untuk merancang dan mengembangkan solusi inovatif berbasis teknologi terhadap suatu permasalahan tertentu. Melalui hackathon, peserta tidak hanya dituntut memiliki kemampuan teknis, tetapi juga kemampuan berpikir kritis, bekerja sama lintas bidang, serta menyampaikan ide secara terstruktur dalam bentuk prototipe atau konsep solusi.",
    guidebook: {
      title: "Hackathon 2025 Guidebook",
      pdfUrl: "https://bit.ly/plcholderpdfff",
    },
  },

  championPrizes: {
    prizes: [
      {
        position: "2nd",
        rank: "2nd",
        placeLabel: "Place",
        rewardMoney: "Rp 15.000.000",
        benefits: ["Merchandise", "Certificate"],
      },
      {
        position: "1st",
        rank: "1st",
        placeLabel: "Place",
        rewardMoney: "Rp 20.000.000",
        benefits: ["Merchandise", "Certificate"],
      },
      {
        position: "3rd",
        rank: "3rd",
        placeLabel: "Place",
        rewardMoney: "Rp 10.000.000",
        benefits: ["Merchandise", "Certificate"],
      },
    ],
  },

  faq: {
    faqList: [
      {
        question: "Apa itu Hackathon?",
        answer:
          "Hackathon adalah ajang kompetisi intensif dan kolaboratif, biasanya berlangsung 24-48 jam, di mana tim (terdiri dari developer, desainer, dan inovator) berlomba menciptakan prototipe produk atau solusi teknologi fungsional berdasarkan tema tertentu",
      },
      {
        question: "Siapa yang dapat berpartisipasi dalam Hackathon?",
        answer:
          "Peserta dapat berupa mahasiswa aktif dari universitas manapun di Indonesia, baik dari program sarjana maupun pascasarjana.",
      },
      {
        question: "Bagaimana pembentukan tim dilakukan?",
        answer:
          "Tim dapat dibentuk secara mandiri oleh peserta. Setiap tim harus terdiri dari 2-4 orang peserta.",
      },
      {
        question: "Apakah ada biaya pendaftaran untuk mengikuti Hackathon?",
        answer: "Ada biaya pendaftaran untuk mengikuti Hackathon.",
      },
    ],
  },

  timeline: {
    events: [
      {
        date: "March 1",
        year: "2025",
        title: "Open Registration",
        description:
          "Registration officially opens. Participants can form teams and secure their spot in the hackathon.",
      },
      {
        date: "March 20",
        year: "2025",
        title: "Close Registration",
        description:
          "Last day to register. All participants and teams must be confirmed before this date.",
      },
      {
        date: "March 23",
        year: "2025",
        title: "Technical Meeting",
        description:
          "An official briefing covering rules, judging criteria, technical guidelines, and Q&A.",
        meetingLink: "To be announced",
      },
      {
        date: "April 4",
        year: "2025",
        title: "Competition Day",
        description:
          "The main event. Participants build, test, and present their solutions to the judges.",
      },
    ],
  },

  sponsors: {
    list: [
      { name: "Microsoft", logo: "microsoft.png" },
      { name: "Tiket.com", logo: "tiketcom.png" },
      { name: "Intel", logo: "intel.png" },
      { name: "Gojek", logo: "gojek.png" },
      { name: "Tokopedia", logo: "tokopedia.png" },
      { name: "Shopee", logo: "shopee.png" },
      { name: "Logitech", logo: "logitech.png" },
      { name: "Fave Solution", logo: "favesolution.png" },
      { name: "Kompas", logo: "kompas.webp" },
      { name: "Dicoding", logo: "dicoding.png" },
      { name: "Astro", logo: "astro.png" },
      { name: "Axioo", logo: "axioo.png" },
      { name: "Dell", logo: "dell.png" },
      { name: "SanDisk", logo: "sandisk.png" },
    ],
  },

  contact: {
    contactEmail: "technoscape@bncc.net",
    fields: ["name", "email", "subject", "message"],
  },

  socialMedia: {
    instagram:
      "https://www.instagram.com/technoscapebncc?igsh=czN1czl5cmRkbXRv",
    email: "technoscape@bncc.net",
    twitter: "https://x.com/BNCC_Binus",
    facebook: "https://www.facebook.com/share/17bvUGNo7Q/",
    linkedin: "https://www.linkedin.com/company/bnccbinus/",
  },

  footer: {
    text: "Powered and Organized by Bina Nusantara Computer Club",
    links: {
      privacyPolicy: "/privacy",
      termsOfService: "/terms",
    },
  },
};

module.exports = landingData;
