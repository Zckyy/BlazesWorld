/**
 * All editable site copy lives here — tweak facts, favourites and memories
 * without touching any component code.
 */

export const tagline = 'The one and only Orange Monkey.'

export const heroIntro =
  'Welcome to the official home of Blaze — a quiet, cuddly British Shorthair with strong opinions and softer paws. A gallery of chaos, cuddles, and cat magic.'

export interface Fact {
  icon: string
  title: string
  text: string
}

export const facts: Fact[] = [
  {
    icon: '🔥',
    title: 'The name',
    text: 'Named after the blaze rods and blaze powder of Minecraft — a small orange creature radiating power. The resemblance was undeniable.',
  },
  {
    icon: '🎂',
    title: 'Age & origin',
    text: 'Born 3 September 2018, which makes him a distinguished gentleman of seven. He came from a friend’s litter — or rather, he walked over and decided we were his.',
  },
  {
    icon: '🧬',
    title: 'Breed',
    text: 'British Shorthair, orange tabby edition. Round of face, plush of coat, fully aware that he is the most handsome cat in the room.',
  },
  {
    icon: '🥷',
    title: 'Superpower',
    text: 'Can scratch your face in the middle of the night without waking you up. You only find out at breakfast. A true ninja.',
  },
  {
    icon: '🤫',
    title: 'Vocabulary',
    text: 'The strong, silent type. Barely says a word — he communicates entirely through stares, head-bumps, and strategic positioning.',
  },
  {
    icon: '😴',
    title: 'Nap rating',
    text: 'Professional napper. Zoomies are for kittens — Blaze prefers a full calendar of premium-quality sleep, ideally on top of someone.',
  },
]

export interface FavouriteCategory {
  icon: string
  title: string
  blurb: string
  items: string[]
}

export const favourites: FavouriteCategory[] = [
  {
    icon: '🪶',
    title: 'Toys',
    blurb: 'A connoisseur of the classics.',
    items: ['The feather — undefeated, all-time favourite', 'Anything that moves like a feather', 'Your hand, if the feather is unavailable'],
  },
  {
    icon: '🛏️',
    title: 'Sleeping spots',
    blurb: 'Location, location, location.',
    items: ['Right next to his humans (velcro mode)', 'The penthouse of the cat tower', 'Under the bed, for mysterious business'],
  },
  {
    icon: '🍗',
    title: 'Food & treats',
    blurb: 'A simple but firm menu.',
    items: ['Chicken — the one true love', 'Fish, when the mood strikes', 'Whatever you were about to eat'],
  },
  {
    icon: '🙃',
    title: 'Funny habits',
    blurb: 'Certified Orange Monkey behaviour.',
    items: ['Physically incapable of staying still while being petted — must wiggle and roll', 'Sweet and cuddly, until he is suddenly the manager', 'Maintains a lifelong blood feud with the vacuum cleaner'],
  },
]

export interface Memory {
  date: string
  title: string
  text: string
  icon: string
}

export const memories: Memory[] = [
  {
    date: 'September 2018',
    title: 'A blaze is born',
    text: 'Born on 3 September 2018 in a friend’s litter — a tiny orange spark with a big future.',
    icon: '🐣',
  },
  {
    date: '19 January 2019',
    title: 'Gotcha day (his choice)',
    text: 'We went to see the litter, and one small kitten walked straight over and claimed us. We didn’t choose Blaze — Blaze chose us. There was no appeal process. He came home with us that day.',
    icon: '🏡',
  },
  {
    date: 'The incident',
    title: 'The great outdoors disaster',
    text: 'Fell out of a window, got stuck in a tree, and meowed his rare and precious words until rescue arrived. Verdict: the outdoors is terrible. Indoor cat for life, by his own decree.',
    icon: '🌳',
  },
  {
    date: 'Ongoing',
    title: 'The vacuum war',
    text: 'The vacuum cleaner remains his sworn nemesis. Every battle so far has ended in a tactical retreat under the bed, yet he remains undefeated in spirit.',
    icon: '⚔️',
  },
  {
    date: '2026',
    title: 'The website era',
    text: 'Blaze got his own website. He responded with a slow blink and a nap — which, from him, is a rave review.',
    icon: '✨',
  },
]
