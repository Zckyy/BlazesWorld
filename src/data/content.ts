/**
 * All editable site copy lives here — tweak facts, favourites and memories
 * without touching any component code.
 */

export const tagline = 'Tiny paws. Big personality.'

export const heroIntro =
  'Welcome to the official home of Blaze — a gallery of chaos, cuddles, and cat magic.'

export interface Fact {
  icon: string
  title: string
  text: string
}

export const facts: Fact[] = [
  {
    icon: '🔥',
    title: 'The name',
    text: 'Named Blaze for the streak of orange lightning he becomes at 3am. Placeholder — add the real story here.',
  },
  {
    icon: '🎂',
    title: 'Age & origin',
    text: 'A distinguished gentleman of [X] years, adopted from [place] on a day that changed everything.',
  },
  {
    icon: '🧬',
    title: 'Breed-ish',
    text: '100% certified house panther / loaf hybrid. DNA results pending (he ate the swab).',
  },
  {
    icon: '⚡',
    title: 'Superpower',
    text: 'Can hear a treat bag open from three rooms away, through two closed doors, while asleep.',
  },
  {
    icon: '🗣️',
    title: 'Vocabulary',
    text: 'Fluent in mrrp, brrow, and the silent meow reserved for maximum emotional damage.',
  },
  {
    icon: '😴',
    title: 'Nap rating',
    text: 'Professional napper. 16 hours a day, 5-star reviews, fully booked until further notice.',
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
    icon: '🧶',
    title: 'Toys',
    blurb: 'Officially owns 14 toys. Plays with a bottle cap.',
    items: ['The crinkle ball (the loud one)', 'A shoelace named String', 'Whatever you are holding'],
  },
  {
    icon: '🛏️',
    title: 'Sleeping spots',
    blurb: 'Anywhere inconvenient is perfect.',
    items: ['The exact centre of the bed', 'Your laptop keyboard, mid-sentence', 'A sunbeam, tracked hourly'],
  },
  {
    icon: '🍗',
    title: 'Food & treats',
    blurb: 'A refined palate, allegedly.',
    items: ['Chicken — the love language', 'The expensive treats only', 'Your dinner, given the chance'],
  },
  {
    icon: '🙃',
    title: 'Funny habits',
    blurb: 'Documented quirks of a tiny weirdo.',
    items: ['Sprints at nothing, wins anyway', 'Sits in any box, any size', 'Stares at the wall ominously'],
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
    date: 'The beginning',
    title: 'Gotcha day',
    text: 'A tiny ball of fluff arrived and immediately claimed the entire house. Placeholder — add the real date and story.',
    icon: '🏡',
  },
  {
    date: 'Week two',
    title: 'First zoomies',
    text: 'At precisely 3:07am, Blaze discovered top speed. The hallway has never recovered.',
    icon: '💨',
  },
  {
    date: 'A few months in',
    title: 'The great curtain incident',
    text: 'We do not talk about the curtain incident. (The curtain lost.)',
    icon: '🧗',
  },
  {
    date: 'Last winter',
    title: 'Blanket fort champion',
    text: 'Blaze spent an entire snow day under the blankets, emerging only for snack negotiations.',
    icon: '❄️',
  },
  {
    date: 'Recently',
    title: 'The website era',
    text: 'Blaze got his own website. He remains unimpressed, but the internet is better for it.',
    icon: '✨',
  },
]
