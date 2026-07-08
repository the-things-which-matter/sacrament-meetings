import { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: [
      "Youth activity this Friday",
      "Ward service project next Saturday",
    ],
    openingHymn: {
      number: 5,
      title: "High on the Mountain Top",
    },
    openingPrayer: "Brother Michael Johnson",
    wardBusiness: [
      {
        description: "Sustaining of new Primary teachers",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Sister Mary Williams",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Brother Peter Davis",
        topic: "Service and Charity",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 152,
      title: "God Be With You Till We Meet Again",
    },
    closingPrayer: "Brother Thomas Lee",
  },

  {
    id: 2,
    date: "2026-05-10",
    meetingType: "testimony",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    openingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    openingPrayer: "Sister Anna Clark",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 193,
      title: "I Stand All Amazed",
    },
    speakers: [],
    closingHymn: {
      number: 228,
      title: "You Can Make the Pathway Bright",
    },
    closingPrayer: "Brother Mark Wilson",
  },

  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    openingHymn: {
      number: 30,
      title: "Come, Come Ye Saints",
    },
    openingPrayer: "Brother James Clark",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 190,
      title: "In Memory of the Crucified",
    },
    speakers: [
      {
        name: "Sister Rachel Green",
        topic: "The Gospel of Jesus Christ",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 154,
      title: "Father in Heaven",
    },
    closingPrayer: "Sister Linda Brown",
  },

  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "Stake President",
    conducting: "Stake Counselor",
    openingHymn: {
      number: 100,
      title: "Nearer My God to Thee",
    },
    openingPrayer: "Brother Alan White",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 184,
      title: "Upon the Cross of Calvary",
    },
    speakers: [
      {
        name: "Stake President",
        topic: "Following Christ",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 270,
      title: "I'll Go Where You Want Me to Go",
    },
    closingPrayer: "Sister Jane Brown",
  },

  {
    id: 5,
    date: "2026-05-31",
    meetingType: "general",
    presiding: "General Authority",
    conducting: "Stake Leader",
    openingHymn: {
      number: 119,
      title: "Come We That Love the Lord",
    },
    openingPrayer: "Brother Daniel Smith",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 195,
      title: "There Is a Green Hill Far Away",
    },
    speakers: [
      {
        name: "Guest Speaker",
        topic: "Building Faith",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 223,
      title: "Have I Done Any Good?",
    },
    closingPrayer: "Brother Paul Young",
  },
];

export function getMeetings(): SacramentMeeting[] {
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}