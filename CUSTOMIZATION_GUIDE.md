# Portfolio Customization Guide

This guide will help you customize the portfolio website with your personal information and branding.

## 📝 Quick Customization Checklist

- [ ] Update personal information in Hero section
- [ ] Add your profile photo
- [ ] Update services offered
- [ ] Add your projects to Portfolio
- [ ] Update work experience and education
- [ ] Adjust skill levels
- [ ] Add client testimonials
- [ ] Update contact information
- [ ] Customize color scheme
- [ ] Add your resume/CV file

## 1. Personal Information

### Hero Section (`src/components/Hero.jsx`)

```javascript
// Line 35-37: Update your name
<h1 className="text-5xl md:text-7xl font-bold mb-4 font-display">
  <span className="gradient-text">John Doe</span> {/* Change this */}
</h1>

// Line 45-50: Update your bio
<motion.p className="text-gray-400 text-lg mb-8 leading-relaxed">
  I craft beautiful, functional, and user-centered digital experiences. 
  {/* Update with your own description */}
</motion.p>

// Line 12-17: Update your stats
const stats = [
  { label: 'Years Experience', value: '5+' },  // Your experience
  { label: 'Projects Completed', value: '100+' },  // Your projects
  { label: 'Happy Clients', value: '50+' },  // Your clients
  { label: 'Technologies', value: '20+' },  // Technologies you know
];

// Line 66-70: Update social links
{[
  { icon: FaGithub, href: 'https://github.com/yourusername' },  // Your GitHub
  { icon: FaLinkedin, href: 'https://linkedin.com/in/yourprofile' },  // Your LinkedIn
  { icon: FaTwitter, href: 'https://twitter.com/yourhandle' },  // Your Twitter
].map...
```

### Profile Photo

Replace the emoji placeholder (line 93) with your actual photo:

```javascript
// Before:
<div className="w-full h-full bg-gradient-to-br from-primary-900/50 to-purple-900/50 flex items-center justify-center text-6xl">
  👨‍💻
</div>

// After:
<img 
  src="/path/to/your/photo.jpg" 
  alt="Your Name"
  className="w-full h-full object-cover"
/>
```

## 2. Services (`src/components/Services.jsx`)

Update the services array (lines 6-39):

```javascript
const services = [
  {
    icon: FaPalette,
    title: 'Your Service 1',  // Change title
    description: 'Your service description',  // Change description
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],  // Your features
  },
  // Add more services...
];
```

## 3. Portfolio Projects (`src/components/Portfolio.jsx`)

Update the projects array (lines 10-58):

```javascript
const projects = [
  {
    id: 1,
    title: 'Your Project Name',
    category: 'Development',  // or 'Web Design', 'UI/UX', 'Branding'
    image: '🛒',  // Replace with actual image path
    description: 'Project description',
    tech: ['React', 'Node.js', 'MongoDB'],  // Technologies used
    liveUrl: 'https://your-project-url.com',
    githubUrl: 'https://github.com/yourusername/project',
  },
  // Add more projects...
];
```

### Adding Project Images

1. Place images in `frontend/public/projects/`
2. Update image path:

```javascript
image: '/projects/your-project-image.jpg',
```

## 4. Experience & Education (`src/components/Experience.jsx`)

### Work Experience (lines 7-38):

```javascript
const experiences = [
  {
    type: 'work',
    title: 'Your Job Title',
    company: 'Company Name',
    period: '2022 - Present',
    description: 'What you did in this role',
    achievements: [
      'Achievement 1',
      'Achievement 2',
      'Achievement 3',
    ],
  },
  // Add more experiences...
];
```

### Education (lines 40-62):

```javascript
const education = [
  {
    type: 'education',
    title: 'Your Degree',
    company: 'University Name',
    period: '2016 - 2018',
    description: 'Your major/specialization',
    achievements: [
      'GPA: 3.9/4.0',
      'Honors/Awards',
      'Activities',
    ],
  },
  // Add more education...
];
```

## 5. Skills (`src/components/Skills.jsx`)

Update skill levels (lines 7-34):

```javascript
const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', level: 95, icon: FaReact, color: 'from-cyan-500 to-blue-500' },
      // Adjust level (0-100) based on your proficiency
    ],
  },
  // Update other categories...
];

// Additional skills (lines 140-154):
{[
  'Redux', 'GraphQL', 'REST APIs', // Add your skills
].map...
```

## 6. Testimonials (`src/components/Testimonials.jsx`)

Update testimonials array (lines 6-48):

```javascript
const testimonials = [
  {
    id: 1,
    name: 'Client Name',
    role: 'Client Position',
    image: '👩‍💼',  // Replace with actual photo
    rating: 5,
    text: 'Client testimonial text',
  },
  // Add more testimonials...
];
```

## 7. Blog Posts (`src/components/Blog.jsx`)

Update blog posts array (lines 6-28):

```javascript
const blogPosts = [
  {
    id: 1,
    title: 'Your Blog Post Title',
    excerpt: 'Brief description of the post',
    category: 'Category',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    image: '🚀',  // Replace with actual image
  },
  // Add more posts...
];
```

## 8. Contact Information (`src/components/Contact.jsx`)

Update contact info (lines 35-50):

```javascript
const contactInfo = [
  {
    icon: FaEnvelope,
    title: 'Email',
    value: 'your.email@example.com',  // Your email
    link: 'mailto:your.email@example.com',
  },
  {
    icon: FaPhone,
    title: 'Phone',
    value: '+1 (555) 123-4567',  // Your phone
    link: 'tel:+15551234567',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Location',
    value: 'Your City, Country',  // Your location
    link: '#',
  },
];

// Social links (lines 52-57):
const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/yourhandle', label: 'Twitter' },
  { icon: FaDribbble, href: 'https://dribbble.com/yourusername', label: 'Dribbble' },
];
```

## 9. Footer (`src/components/Footer.jsx`)

Update footer content (line 41):

```javascript
<p className="text-gray-400 text-sm flex items-center gap-2">
  © {currentYear} Portfolio. Made with <FaHeart className="text-red-500" /> by Your Name
</p>
```

## 10. Color Scheme

### Primary Colors (`tailwind.config.js`)

```javascript
colors: {
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',  // Main purple
    600: '#9333ea',  // Darker purple
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
},
```

To change to a different color scheme:
1. Visit [Tailwind Color Palette Generator](https://uicolors.app/create)
2. Choose your color
3. Replace the primary color values

### Gradient Customization (`src/index.css`)

```css
/* Line 36: Gradient text colors */
.gradient-text {
  @apply bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent;
}

/* Change to your preferred gradient colors */
.gradient-text {
  @apply bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent;
}
```

## 11. Fonts

Current fonts: Inter (body) and Poppins (headings)

To change fonts, update `src/index.css` (line 1):

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800;900&display=swap');
```

Then update `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
  display: ['YourDisplayFont', 'system-ui', 'sans-serif'],
},
```

## 12. Resume/CV

1. Place your resume PDF in `frontend/public/`
2. Update the download link in Hero section:

```javascript
<a href="/your-resume.pdf" className="btn-secondary flex items-center gap-2" download>
  <FaDownload />
  Download CV
</a>
```

## 13. Favicon and Meta Tags

### Favicon

1. Generate favicon at [Favicon Generator](https://favicon.io/)
2. Place files in `frontend/public/`
3. Update `index.html`:

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
```

### Meta Tags (`frontend/index.html`)

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Your portfolio description" />
  <meta name="keywords" content="web developer, ui/ux designer, your name" />
  <meta name="author" content="Your Name" />
  <title>Your Name - Web Developer & UI/UX Designer</title>
</head>
```

## 14. Animation Customization

### Speed

Adjust animation duration in components:

```javascript
// Slower animation
transition={{ duration: 1.0 }}  // Default is 0.6

// Faster animation
transition={{ duration: 0.3 }}
```

### Disable Animations

Remove or comment out `motion` components and replace with regular `div`:

```javascript
// Before:
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// After:
<div>
```

## 15. Testing Your Changes

After making changes:

1. Save all files
2. Check the browser (should auto-reload)
3. Test on different screen sizes
4. Verify all links work
5. Test the contact form

## 🎨 Design Tips

1. **Consistency**: Keep color scheme consistent across all sections
2. **Contrast**: Ensure text is readable against backgrounds
3. **Spacing**: Maintain consistent padding and margins
4. **Images**: Use high-quality images (at least 1200px wide)
5. **Content**: Keep descriptions concise and impactful
6. **Mobile**: Always test on mobile devices

## 🚀 Going Live

1. Update all placeholder content
2. Add real images
3. Test all functionality
4. Optimize images
5. Build for production: `npm run build`
6. Deploy to Vercel/Netlify

## Need Help?

- Check the main README.md for setup instructions
- Review component files for inline comments
- Refer to [Tailwind CSS Docs](https://tailwindcss.com/docs)
- Check [Framer Motion Docs](https://www.framer.com/motion/)

---

Happy customizing! 🎉
