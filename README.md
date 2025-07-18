# anmol.am - Personal Portfolio Website

A modern, professional portfolio and personal website built with Next.js 14, TypeScript, and Tailwind CSS. Features a clean design, dark mode support, and optimized performance.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Dark/Light Mode**: System-aware theme switching
- **Performance Optimized**: 95+ Lighthouse score across all metrics
- **SEO Ready**: Complete meta tags, sitemap, and robots.txt
- **Contact Form**: Functional contact form ready for email integration
- **Blog Support**: MDX-ready blog with syntax highlighting
- **Analytics**: Vercel Analytics integration
- **Type Safe**: Full TypeScript support throughout

## 📁 Project Structure

```
anmol.am/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions and config
├── public/                # Static assets
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── vercel.json           # Vercel configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anmolmanchanda/anmol.am.git
cd anmol.am
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📧 Email Configuration

To enable the contact form, configure an email service in your `.env.local`:

### Using Resend (Recommended)
```env
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@anmol.am
EMAIL_TO=hi@anmol.am
```

### Using SendGrid
```env
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@anmol.am
EMAIL_TO=hi@anmol.am
```

## 🎨 Customization

### Personal Information

Edit `lib/config.ts` to update your personal information:

```typescript
export const siteConfig = {
  name: "Your Name",
  url: "https://yourdomain.com",
  email: "your@email.com",
  // ... other config
}
```

### Content

- **Projects**: Edit the projects array in `app/projects/page.tsx`
- **Skills**: Update skills in `components/SkillsShowcase.tsx`
- **Experience**: Modify experience data in `app/about/page.tsx`
- **Blog Posts**: Add new posts in `app/blog/[slug]/page.tsx`

### Styling

- **Colors**: Update CSS variables in `app/globals.css`
- **Fonts**: Modify font imports in `app/layout.tsx`
- **Components**: All components use Tailwind CSS classes

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Custom Domain

1. Add your domain in Vercel project settings
2. Update DNS records as instructed
3. Update `siteConfig.url` in `lib/config.ts`

## 📝 Adding Content

### Adding a New Project

1. Add project data to the `projects` array in `app/projects/page.tsx`
2. Add project images to `public/images/projects/`
3. Create a detailed project page if needed

### Writing Blog Posts

1. Add a new blog post object in `app/blog/page.tsx`
2. Add the full content in `app/blog/[slug]/page.tsx`
3. Use Markdown syntax for formatting

### Updating Resume

Place your `resume.pdf` file in the `public/` directory.

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide](https://lucide.dev)
- Deployed on [Vercel](https://vercel.com)

---

Built with ❤️ by Anmol Manchanda
