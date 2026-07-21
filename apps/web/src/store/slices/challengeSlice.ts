import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface ChallengeItem {
  id: string
  creatorId?: string
  title: string
  description: string
  category: "Sports" | "Physical" | "Performance"
  potAmount: string
  stakeAmount?: number
  timeLeft: string
  duration?: string
  verification?: string
  maxPlayers?: string
  isLive?: boolean
  participantsCount: string
  iconType: "trophy" | "dumbbell" | "gamepad" | "sparkles"
  iconBg: string
  iconColor: string
  avatars: string[]
  createdAt?: string
  status?: string
}

interface ChallengeState {
  challenges: ChallengeItem[]
  loaded: boolean
}

const initialState: ChallengeState = {
  challenges: [
    {
      id: "1",
      title: "Lakers vs Celtics Tonight",
      description: "Who will score more than 30 points in the final quarter?",
      category: "Sports",
      potAmount: "$2,450",
      timeLeft: "ENDS 02:45:18",
      isLive: true,
      participantsCount: "+12",
      iconType: "trophy",
      iconBg: "bg-indigo-500/15",
      iconColor: "text-indigo-400",
      avatars: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      ],
    },
    {
      id: "2",
      title: "Sub-40 5 Mile Run",
      description: "Can anyone complete 5 miles in under 40 minutes this weekend?",
      category: "Physical",
      potAmount: "$1,800",
      timeLeft: "LAST 24 HRS",
      isLive: false,
      participantsCount: "+8",
      iconType: "dumbbell",
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-400",
      avatars: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
      ],
    },
    {
      id: "3",
      title: "Valorant Ace Tournament",
      description: "Achieve a full team wipe (5K Ace) in a single competitive round.",
      category: "Performance",
      potAmount: "$3,200",
      timeLeft: "ENDS 05:10:00",
      isLive: true,
      participantsCount: "+24",
      iconType: "gamepad",
      iconBg: "bg-pink-500/15",
      iconColor: "text-pink-400",
      avatars: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      ],
    },
    {
      id: "4",
      title: "Miami F1 Pole Position",
      description: "Predict the driver who secures pole position in qualifying.",
      category: "Sports",
      potAmount: "$950",
      timeLeft: "ENDS 12:00:00",
      isLive: false,
      participantsCount: "+5",
      iconType: "trophy",
      iconBg: "bg-amber-500/15",
      iconColor: "text-amber-400",
      avatars: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
      ],
    },
  ],
  loaded: true,
}

export const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    addChallenge: (state, action: PayloadAction<ChallengeItem>) => {
      state.challenges.unshift(action.payload)
    },
    setChallenges: (state, action: PayloadAction<ChallengeItem[]>) => {
      state.challenges = action.payload
      state.loaded = true
    },
    removeChallenge: (state, action: PayloadAction<string>) => {
      state.challenges = state.challenges.filter(c => c.id !== action.payload)
    },
  },
})

export const { addChallenge, setChallenges, removeChallenge } = challengeSlice.actions
export default challengeSlice.reducer
