import { NavigationItem } from '../types';

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Womens',
    href: '/womens',
    children: [
      { label: 'Newest', href: '/womens/newest' },
      { label: 'Todays Trends', href: '/womens/trends' },
      { label: 'Clothing', href: '/womens/clothing' },
      { label: 'Lingerie', href: '/womens/lingerie' },
      { label: 'Shoes', href: '/womens/shoes' },
      { label: 'Accessories', href: '/womens/accessories' },
      { label: 'Sale', href: '/womens/sale' }
    ]
  },
  {
    label: 'Mens',
    href: '/mens',
    children: [
      { label: 'New', href: '/mens/new' },
      { label: 'Todays Trends', href: '/mens/trends' },
      { label: 'Clothing', href: '/mens/clothing' },
      { label: 'Shoes', href: '/mens/shoes' },
      { label: 'Accessories', href: '/mens/accessories' },
      { label: 'Sale', href: '/mens/sale' }
    ]
  },
  {
    label: 'Electronics',
    href: '/electronics',
    children: [
      { 
        label: 'Mobile', 
        href: '/electronics/mobile',
        children: [
          { label: 'Phones', href: '/electronics/mobile/phones' },
          { label: 'Phone Cases', href: '/electronics/mobile/cases' },
          { label: 'Screen Protectors', href: '/electronics/mobile/protectors' },
          { label: 'SD Cards', href: '/electronics/mobile/sd-cards' },
          { label: 'Repair Kits', href: '/electronics/mobile/repair' },
          { label: 'Misc', href: '/electronics/mobile/misc' }
        ]
      },
      { 
        label: 'Computers', 
        href: '/electronics/computers',
        children: [
          { label: 'Laptops, Tablets, & Desktop', href: '/electronics/computers/devices' },
          { label: 'Monitors', href: '/electronics/computers/monitors' },
          { label: 'Networking', href: '/electronics/computers/networking' },
          { label: 'Drives & Storage', href: '/electronics/computers/storage' },
          { label: 'Components', href: '/electronics/computers/components' },
          { label: 'Accessories', href: '/electronics/computers/accessories' }
        ]
      },
      { label: 'Tv-Video', href: '/electronics/tv-video' },
      { label: 'Audio', href: '/electronics/audio' },
      { label: 'Cameras', href: '/electronics/cameras' },
      { label: 'Wearable', href: '/electronics/wearable' },
      { label: 'Video-Games', href: '/electronics/games' },
      { label: 'Software', href: '/electronics/software' },
      { label: 'Cords', href: '/electronics/cords' }
    ]
  }
];

export const authenticatedNavigation: NavigationItem[] = [
  { label: 'Get RWN', href: '/get-rwn' },
  { label: 'Sell Now', href: '/sell' }
];