// In-memory dummy data for the Landing Page API. (change as needed)

const landingData = {
  navigation: {
    logo: {
      alt: "Hackathon 2025 Logo",
      // Dummy logo URL
      url: "https://sumnsumn?",
    },
    menu: [
      { name: "Home", anchor: "#home" },
      { name: "Champion Prizes", anchor: "#prizes" },
      { name: "Mentor & Jury", anchor: "#mentors-jury" }, //kalau ga mau pakai, hapus aja
      { name: "About", anchor: "#about" },
      { name: "FAQ", anchor: "#faq" },
      { name: "Timeline", anchor: "#timeline" },
    ],
    // Redirect to login page
    loginUrl: "https://hackathon.finpro.com/login", //again, just a placeholder, change as needed
  },

  hero: {
    eventName: "Hackathon 2025",
    eventTheme: "Innovate for a Sustainable Future", // change as needed
    recapMedia: {
      type: "video",
      url: "https://placeholderlmao",
    },
  },

  about: {
    description: "Hackaton technoscape 2025.", //change as needed
    guidebook: {
      title: "Hackathon 2025 Guidebook",
      pdfUrl: "https://placeholderPDF", //change as needed, maybe acrually make  a pdf? see later
    },
  },

  championPrizes: {
    prizes: [
      {
        position: "Juara 1",
        rewardMoney: "Rp 10.000.000",
        benefits: ["Merchandise", "Sertifikat"],
      },
      {
        position: "Juara 2",
        rewardMoney: "Rp 6.000.000",
        benefits: ["Merchandise", "Sertifikat"],
      },
      {
        position: "Juara 3",
        rewardMoney: "Rp 3.000.000",
        benefits: ["Merchandise", "Sertifikat"],
      },
    ],
  },

  faq: {
    //search faq and answer examples later
    faqList: [
      {
        question: "question 1?",
        answer: "answer 1.",
      },
      {
        question: "question 2?",
        answer: "answer 2.",
      },
      {
        question: "question 3?",
        answer: "answer 3.",
      },
    ],
  },

  timeline: {
    openRegistration: "2025-04-30",
    closeRegistration: "2025-05-22",
    technicalMeeting: {
      date: "2025-05-27",
      meetingLink: "https://placeholderlink", //uhhh change later
    },
    competitionDay: "2025-06-01",
  },

  sponsors: {
    platinum: [
      {
        name: "[placeholder1]",
        logoUrl: "https://placeholderpic",
      }, //ask what logo is used?? --> change later
      {
        name: "[placeholder2]",
        logoUrl: "https://placeholderpic",
      },
    ],
    gold: [
      {
        name: "[placeholder3]",
        logoUrl: "https://placeholderpic",
      },
      {
        name: "[placeholder4]",
        logoUrl: "https://placeholderpic",
      },
    ],
    silver: [
      {
        name: "[placeholder5]",
        logoUrl: "https://placeholderpic",
      },
      {
        name: "[placeholder6]",
        logoUrl: "https://placeholderpic",
      },
    ],
    mediaPartner: [
      {
        name: "[placeholder7]",
        logoUrl: "https://placeholderpic",
      },
      {
        name: "[placeholder8]",
        logoUrl: "https://placeholderpic",
      },
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
    text: "Powered and Organized by [PLACEHOLDER]",
    links: {
      privacyPolicy: "https://uhhhprivacything", //we dont need to make these pages, do we?
      termsOfService: "https://tos",
    },
  },
};

module.exports = landingData;
