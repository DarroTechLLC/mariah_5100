import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { normalizeDatabaseUrl } from '../lib/database-url';

const connectionString = normalizeDatabaseUrl(process.env.DATABASE_URL!);
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type SeedItem = {
  id: string;
  title: string;
  subtitle: string;
  group: string;
  duration: number;
  category: string;
  coverColor: string;
  viewCount: number;
  createdAt: Date;
};

const now = Date.now();
const day = 86_400_000;

const ITEMS: SeedItem[] = [
  // docs
  {
    category: 'docs',
    coverColor: 'from-blue-500 to-indigo-600',
    createdAt: new Date(now - 2 * day),
    duration: 234,
    group: 'Getting Started',
    id: 't1',
    subtitle: 'Core Guides',
    title: 'Async Patterns',
    viewCount: 1842,
  },
  {
    category: 'docs',
    coverColor: 'from-sky-400 to-blue-500',
    createdAt: new Date(now - 2 * day),
    duration: 198,
    group: 'Getting Started',
    id: 't2',
    subtitle: 'Core Guides',
    title: 'WebSocket Basics',
    viewCount: 923,
  },
  {
    category: 'docs',
    coverColor: 'from-blue-400 to-cyan-500',
    createdAt: new Date(now - 5 * day),
    duration: 267,
    group: 'Streaming',
    id: 't3',
    subtitle: 'Platform Docs',
    title: 'Server-Sent Events',
    viewCount: 2105,
  },
  {
    category: 'docs',
    coverColor: 'from-indigo-400 to-blue-500',
    createdAt: new Date(now - 5 * day),
    duration: 312,
    group: 'Streaming',
    id: 't4',
    subtitle: 'Platform Docs',
    title: 'Hydration Notes',
    viewCount: 1567,
  },
  {
    category: 'docs',
    coverColor: 'from-sky-500 to-indigo-600',
    createdAt: new Date(now - 1 * day),
    duration: 245,
    group: 'Dev Mode',
    id: 't5',
    subtitle: 'Internal Docs',
    title: 'Hot Module Reload',
    viewCount: 3201,
  },
  // templates
  {
    category: 'templates',
    coverColor: 'from-blue-300 to-sky-500',
    createdAt: new Date(now - 3 * day),
    duration: 213,
    group: 'Soft Deploy',
    id: 't6',
    subtitle: 'Starter Kits',
    title: 'Localhost Morning',
    viewCount: 876,
  },
  {
    category: 'templates',
    coverColor: 'from-cyan-400 to-sky-500',
    createdAt: new Date(now - 3 * day),
    duration: 189,
    group: 'Soft Deploy',
    id: 't7',
    subtitle: 'Starter Kits',
    title: 'README Starter',
    viewCount: 654,
  },
  {
    category: 'templates',
    coverColor: 'from-indigo-500 to-blue-600',
    createdAt: new Date(now - 7 * day),
    duration: 227,
    group: 'Pull Request',
    id: 't8',
    subtitle: 'Workflow Templates',
    title: 'Open Source Checklist',
    viewCount: 1432,
  },
  {
    category: 'templates',
    coverColor: 'from-sky-300 to-blue-400',
    createdAt: new Date(now - 7 * day),
    duration: 256,
    group: 'Pull Request',
    id: 't9',
    subtitle: 'Workflow Templates',
    title: 'Sunday Deploy Plan',
    viewCount: 987,
  },
  {
    category: 'templates',
    coverColor: 'from-blue-600 to-indigo-700',
    createdAt: new Date(now - 10 * day),
    duration: 201,
    group: 'Dependencies',
    id: 't10',
    subtitle: 'Scaffold Packs',
    title: 'Package Manifest',
    viewCount: 1123,
  },
  // tools
  {
    category: 'tools',
    coverColor: 'from-slate-500 to-blue-700',
    createdAt: new Date(now - 1 * day),
    duration: 194,
    group: 'Production Ready',
    id: 't11',
    subtitle: 'CLI Toolkit',
    title: 'Ship Checklist',
    viewCount: 4521,
  },
  {
    category: 'tools',
    coverColor: 'from-indigo-600 to-blue-800',
    createdAt: new Date(now - 1 * day),
    duration: 218,
    group: 'Production Ready',
    id: 't12',
    subtitle: 'CLI Toolkit',
    title: 'Stack Trace Helper',
    viewCount: 3876,
  },
  {
    category: 'tools',
    coverColor: 'from-blue-500 to-sky-600',
    createdAt: new Date(now - 4 * day),
    duration: 242,
    group: 'Debug Mode',
    id: 't13',
    subtitle: 'Dev Utilities',
    title: '3 AM Push Guard',
    viewCount: 2987,
  },
  {
    category: 'tools',
    coverColor: 'from-cyan-500 to-blue-600',
    createdAt: new Date(now - 4 * day),
    duration: 176,
    group: 'Debug Mode',
    id: 't14',
    subtitle: 'Dev Utilities',
    title: 'Merge Conflict Diff',
    viewCount: 2145,
  },
  {
    category: 'tools',
    coverColor: 'from-sky-500 to-blue-600',
    createdAt: new Date(now - 6 * day),
    duration: 208,
    group: 'No Regrets',
    id: 't15',
    subtitle: 'Release Tools',
    title: 'Safe Force Push',
    viewCount: 1654,
  },
  // guides
  {
    category: 'guides',
    coverColor: 'from-blue-400 to-indigo-500',
    createdAt: new Date(now - 0.5 * day),
    duration: 195,
    group: 'Responsive',
    id: 't16',
    subtitle: 'Design Guides',
    title: 'Pixel Perfect Layout',
    viewCount: 5432,
  },
  {
    category: 'guides',
    coverColor: 'from-indigo-400 to-sky-500',
    createdAt: new Date(now - 0.5 * day),
    duration: 221,
    group: 'Responsive',
    id: 't17',
    subtitle: 'Design Guides',
    title: 'Tailwind Patterns',
    viewCount: 4321,
  },
  {
    category: 'guides',
    coverColor: 'from-sky-400 to-cyan-500',
    createdAt: new Date(now - 2 * day),
    duration: 237,
    group: 'Render Cycle',
    id: 't18',
    subtitle: 'React Guides',
    title: 'Component Chemistry',
    viewCount: 3654,
  },
  {
    category: 'guides',
    coverColor: 'from-blue-300 to-indigo-400',
    createdAt: new Date(now - 2 * day),
    duration: 189,
    group: 'Render Cycle',
    id: 't19',
    subtitle: 'React Guides',
    title: 'Type Safe Forms',
    viewCount: 2876,
  },
  {
    category: 'guides',
    coverColor: 'from-indigo-500 to-blue-700',
    createdAt: new Date(now - 8 * day),
    duration: 214,
    group: 'Core Web Vitals',
    id: 't20',
    subtitle: 'Perf Guides',
    title: 'First Contentful Paint',
    viewCount: 1987,
  },
  // docs extras (was lo-fi)
  {
    category: 'docs',
    coverColor: 'from-blue-500 to-slate-600',
    createdAt: new Date(now - 3 * day),
    duration: 278,
    group: 'Sunday Deploys',
    id: 't21',
    subtitle: 'Ops Docs',
    title: 'Slow Build Notes',
    viewCount: 2543,
  },
  {
    category: 'docs',
    coverColor: 'from-sky-600 to-blue-700',
    createdAt: new Date(now - 3 * day),
    duration: 302,
    group: 'Sunday Deploys',
    id: 't22',
    subtitle: 'Ops Docs',
    title: 'Console Calm',
    viewCount: 1876,
  },
  {
    category: 'docs',
    coverColor: 'from-cyan-400 to-blue-500',
    createdAt: new Date(now - 12 * day),
    duration: 264,
    group: 'Dev Diary',
    id: 't23',
    subtitle: 'Team Docs',
    title: 'Soft Reset',
    viewCount: 1234,
  },
  {
    category: 'docs',
    coverColor: 'from-blue-400 to-sky-500',
    createdAt: new Date(now - 12 * day),
    duration: 231,
    group: 'Dev Diary',
    id: 't24',
    subtitle: 'Team Docs',
    title: 'Idle Thread',
    viewCount: 1567,
  },
  {
    category: 'docs',
    coverColor: 'from-indigo-300 to-blue-400',
    createdAt: new Date(now - 15 * day),
    duration: 198,
    group: 'Downtime',
    id: 't25',
    subtitle: 'Incident Docs',
    title: 'Sleep Mode Checklist',
    viewCount: 987,
  },
  // templates extras (was synthwave)
  {
    category: 'templates',
    coverColor: 'from-blue-600 to-indigo-800',
    createdAt: new Date(now - 6 * day),
    duration: 345,
    group: 'After Dark',
    id: 't26',
    subtitle: 'UI Templates',
    title: 'Neon Terminal',
    viewCount: 876,
  },
  {
    category: 'templates',
    coverColor: 'from-sky-500 to-indigo-600',
    createdAt: new Date(now - 6 * day),
    duration: 298,
    group: 'After Dark',
    id: 't27',
    subtitle: 'UI Templates',
    title: 'Retro Compiler',
    viewCount: 654,
  },
  {
    category: 'templates',
    coverColor: 'from-blue-500 to-cyan-600',
    createdAt: new Date(now - 9 * day),
    duration: 276,
    group: 'Digital Sunset',
    id: 't28',
    subtitle: 'Landing Templates',
    title: 'Cyber Monday',
    viewCount: 543,
  },
  {
    category: 'templates',
    coverColor: 'from-indigo-400 to-blue-600',
    createdAt: new Date(now - 9 * day),
    duration: 312,
    group: 'Digital Sunset',
    id: 't29',
    subtitle: 'Landing Templates',
    title: 'Chrome Dreams',
    viewCount: 432,
  },
  {
    category: 'templates',
    coverColor: 'from-cyan-500 to-indigo-600',
    createdAt: new Date(now - 14 * day),
    duration: 287,
    group: 'Production Mode',
    id: 't30',
    subtitle: 'Deploy Templates',
    title: 'Midnight Deploy',
    viewCount: 765,
  },
  // Extra docs
  {
    category: 'docs',
    coverColor: 'from-cyan-500 to-blue-600',
    createdAt: new Date(now - 16 * day),
    duration: 224,
    group: 'Event Loop',
    id: 't31',
    subtitle: 'Core Guides',
    title: 'Race Condition',
    viewCount: 612,
  },
  {
    category: 'docs',
    coverColor: 'from-blue-500 to-indigo-600',
    createdAt: new Date(now - 17 * day),
    duration: 256,
    group: 'Concurrency',
    id: 't32',
    subtitle: 'Platform Docs',
    title: 'Deadlock',
    viewCount: 489,
  },
  {
    category: 'docs',
    coverColor: 'from-sky-500 to-cyan-600',
    createdAt: new Date(now - 18 * day),
    duration: 301,
    group: 'Streams',
    id: 't33',
    subtitle: 'Platform Docs',
    title: 'Backpressure',
    viewCount: 412,
  },
  // Extra templates
  {
    category: 'templates',
    coverColor: 'from-sky-400 to-blue-500',
    createdAt: new Date(now - 19 * day),
    duration: 198,
    group: 'Pull Request',
    id: 't34',
    subtitle: 'Workflow Templates',
    title: 'Commit Message',
    viewCount: 587,
  },
  {
    category: 'templates',
    coverColor: 'from-blue-400 to-indigo-500',
    createdAt: new Date(now - 21 * day),
    duration: 267,
    group: 'Lost Commits',
    id: 't36',
    subtitle: 'Recovery Templates',
    title: 'Force Push Plan',
    viewCount: 432,
  },
  // Extra tools
  {
    category: 'tools',
    coverColor: 'from-indigo-500 to-blue-600',
    createdAt: new Date(now - 22 * day),
    duration: 187,
    group: 'Memoize',
    id: 't37',
    subtitle: 'CLI Toolkit',
    title: 'Cache Hit',
    viewCount: 891,
  },
  {
    category: 'tools',
    coverColor: 'from-blue-600 to-indigo-700',
    createdAt: new Date(now - 24 * day),
    duration: 245,
    group: 'Segfault',
    id: 't39',
    subtitle: 'Release Tools',
    title: 'Null Pointer Guard',
    viewCount: 654,
  },
  // Extra guides
  {
    category: 'guides',
    coverColor: 'from-sky-400 to-cyan-500',
    createdAt: new Date(now - 25 * day),
    duration: 189,
    group: 'Velocity',
    id: 't40',
    subtitle: 'Team Guides',
    title: 'Vibe Coding',
    viewCount: 1203,
  },
  {
    category: 'guides',
    coverColor: 'from-blue-300 to-sky-400',
    createdAt: new Date(now - 27 * day),
    duration: 195,
    group: 'LGTM',
    id: 't42',
    subtitle: 'Review Guides',
    title: 'PR Approved',
    viewCount: 843,
  },
  // Extra docs (ops)
  {
    category: 'docs',
    coverColor: 'from-cyan-400 to-sky-500',
    createdAt: new Date(now - 28 * day),
    duration: 278,
    group: 'Dev Server',
    id: 't43',
    subtitle: 'Local Docs',
    title: 'Localhost Notes',
    viewCount: 562,
  },
  {
    category: 'docs',
    coverColor: 'from-blue-500 to-sky-600',
    createdAt: new Date(now - 29 * day),
    duration: 312,
    group: 'Postmortem',
    id: 't44',
    subtitle: 'Incident Docs',
    title: 'Stack Trace Review',
    viewCount: 478,
  },
  // Extra templates
  {
    category: 'templates',
    coverColor: 'from-indigo-500 to-blue-700',
    createdAt: new Date(now - 31 * day),
    duration: 298,
    group: 'Retro Mode',
    id: 't46',
    subtitle: 'UI Templates',
    title: 'CRT Glow',
    viewCount: 689,
  },
  {
    category: 'templates',
    coverColor: 'from-blue-600 to-indigo-800',
    createdAt: new Date(now - 32 * day),
    duration: 245,
    group: '56k',
    id: 't47',
    subtitle: 'Nostalgia Templates',
    title: 'Modem Handshake',
    viewCount: 534,
  },
  {
    category: 'templates',
    coverColor: 'from-slate-500 to-blue-700',
    createdAt: new Date(now - 33 * day),
    duration: 271,
    group: 'POST',
    id: 't48',
    subtitle: 'Boot Templates',
    title: 'BIOS Boot',
    viewCount: 467,
  },
];

type SeedCollection = {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  itemIds: string[];
};

const COLLECTIONS: SeedCollection[] = [
  {
    coverColor: 'from-violet-500 to-purple-600',
    description: 'Items for the midnight commit.',
    id: 'pl1',
    itemIds: ['t21', 't22', 't24', 't25', 't9'],
    name: 'Late Night Coding',
  },
  {
    coverColor: 'from-purple-400 to-violet-500',
    description: 'Start the day right.',
    id: 'pl2',
    itemIds: ['t6', 't7', 't16', 't17', 't23', 't20'],
    name: 'Morning Focus',
  },
  {
    coverColor: 'from-fuchsia-500 to-purple-600',
    description: 'High-signal picks.',
    id: 'pl3',
    itemIds: ['t5', 't3', 't26', 't27', 't28', 't30', 't11', 't15'],
    name: 'High Energy',
  },
];

async function main() {
  console.log('Seeding Instant Nav catalog...');

  await prisma.userItemView.deleteMany();
  await prisma.userFavorite.deleteMany();
  await prisma.collectionItem.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();

  for (const item of ITEMS) {
    await prisma.item.create({ data: item });
  }
  console.log(`  ${ITEMS.length} items created`);

  for (const collection of COLLECTIONS) {
    await prisma.collection.create({
      data: {
        coverColor: collection.coverColor,
        createdAt: new Date(),
        description: collection.description,
        id: collection.id,
        name: collection.name,
      },
    });
    for (let i = 0; i < collection.itemIds.length; i++) {
      await prisma.collectionItem.create({
        data: {
          collectionId: collection.id,
          itemId: collection.itemIds[i],
          position: i,
        },
      });
    }
  }
  console.log(`  ${COLLECTIONS.length} collections created`);

  await prisma.user.create({ data: { id: 'e2e', name: 'E2E Tester' } });
  console.log('  e2e test user created');

  console.log('Seed complete.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
