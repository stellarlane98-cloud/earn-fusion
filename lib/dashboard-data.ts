import {
  Home,
  Gamepad2,
  Video,
  ClipboardList,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Bell,
  Settings,
  HelpCircle,
  Dice5,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  label: string
  icon: LucideIcon
  href: string
  badge?: number
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, href: '/' },
  { label: 'Games', icon: Gamepad2, href: '/games' },
  { label: 'Video Tasks', icon: Video, href: '/videos' },
  { label: 'Assignments', icon: ClipboardList, href: '/assignments' },
  { label: 'Wallet', icon: Wallet, href: '/wallet' },
  { label: 'Deposit', icon: ArrowDownToLine, href: '/deposit' },
  { label: 'Withdraw', icon: ArrowUpFromLine, href: '/withdraw' },
  { label: 'Transactions', icon: ArrowLeftRight, href: '/transactions' },
  { label: 'Notifications', icon: Bell, href: '/notifications' },
  { label: 'Settings', icon: Settings, href: '/settings' },
  { label: 'Help Center', icon: HelpCircle, href: '/help' },
]

export const footerLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

export type ExploreCard = {
  title: string
  description: string
  image: string
  icon: LucideIcon
  href: string
  /** tailwind classes for the card gradient / glow theme */
  theme: {
    glow: string
    iconBg: string
    ring: string
    arrow: string
  }
}

export const exploreCards: ExploreCard[] = [
  {
    title: 'Dice Sum Match',
    description: 'Match the target sum & earn rewards',
    image: '/assets/controller-3d.png',
    icon: Dice5,
    href: '/match-trial',
    theme: {
      glow: 'from-[#6d3bf5]/25',
      iconBg: 'bg-[#6d3bf5]',
      ring: 'hover:border-[#7c4dff]/60',
      arrow: 'bg-[#6d3bf5]',
    },
  },
  {
    title: 'Video Tasks',
    description: 'Watch videos & earn rewards',
    image: '/assets/clapper-3d.png',
    icon: Video,
    href: '/videos',
    theme: {
      glow: 'from-[#2b7fff]/25',
      iconBg: 'bg-[#2b7fff]',
      ring: 'hover:border-[#2b7fff]/60',
      arrow: 'bg-[#2b7fff]',
    },
  },
  {
    title: 'Assignments',
    description: 'Complete tasks & earn rewards',
    image: '/assets/clipboard-3d.png',
    icon: ClipboardList,
    href: '/assignments',
    theme: {
      glow: 'from-[#22c55e]/25',
      iconBg: 'bg-[#16a34a]',
      ring: 'hover:border-[#22c55e]/60',
      arrow: 'bg-[#16a34a]',
    },
  },
  {
    title: 'Deposit',
    description: 'Add funds via JazzCash & more',
    image: '/assets/wallet-3d.png',
    icon: Wallet,
    href: '/deposit',
    theme: {
      glow: 'from-[#f59e0b]/25',
      iconBg: 'bg-[#f59e0b]',
      ring: 'hover:border-[#f59e0b]/60',
      arrow: 'bg-[#f59e0b]',
    },
  },
]

export const chartData = [
  { day: 'Mon', value: 3200 },
  { day: 'Tue', value: 5600 },
  { day: 'Wed', value: 6900 },
  { day: 'Thu', value: 7800 },
  { day: 'Fri', value: 7200 },
  { day: 'Sat', value: 9400 },
  { day: 'Sun', value: 12450 },
]
