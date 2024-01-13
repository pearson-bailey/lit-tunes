<h1 align="center"> Getting Started</h1>

<p align="center">
Lit Tunes is a Typescript project utilizing Supabase for DB and Auth, paired with Vercel's Frontend Cloud for hosting the Next.js app resource.
</p>

<p align="center">
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#packages"><strong>Packages</strong></a> ·
  <a href="#local-environment"><strong>Local Environment</strong></a> ·
  <a href="#dependencies"><strong>Dependencies</strong></a> ·
  <a href="#setup"><strong>Set-up</strong></a> ·
  <a href="#teardown"><strong>Teardown</strong></a> ·
  <a href="#linting"><strong>Linting</strong></a> ·
  <a href="#testing"><strong>Testing</strong></a> ·
  <a href="#unit-testing"><strong>Unit Testing</strong></a> ·
  <a href="#automated-end-to-end-e2e-testing"><strong>Automated End-to-End (E2E) Testing</strong></a>
</p>
<br/>

## TECH STACK

- <a href="https://nextjs.org/docs/getting-started/installation"><strong>Next.js</strong></a>
- <a href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"><strong>Supabase</strong></a>
- <a href="https://vercel.com/docs/getting-started-with-vercel"><strong>Vercel</strong></a>
  <br/>
  <br/>

## PACKAGES

- <a href="https://github.com/tailwindlabs/headlessui?tab=readme-ov-file"><strong>Headless UI</strong></a>
  <i>"Completely unstyled, fully accessible UI components, designed to integrate with Tailwind CSS."</i>
  <br/>
- <a href="https://github.com/tailwindlabs/heroicons"><strong>HeroIcons</strong></a>
  <i>"Free, MIT-licensed, high-quality SVG icons, by the makers of Tailwind CSS."</i>
  <br/>
- <a href="https://www.framer.com/motion/introduction/"><strong>Framer-Motion</strong></a>
  <i>"Simple, yet powerful, motion library for React."</i>
  <br/>
- <a href="https://react-hook-form.com/get-started"><strong>React-Hook-Form</strong></a>
  <i>"Performant, flexible and extensible forms for React with easy-to-use validation."</i>
  <br/>
- <a href="https://tailwindcss.com/docs/installation"><strong>TailwindCSS</strong></a>
  <i>"Utility-first CSS framework...that can be composed directly in your markup."</i>
  <br/>
- <a href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html"><strong>Typescript</strong></a>
  <i>"JavaScript with syntax for types; a strongly typed programming language that builds on JavaScript."</i>
  <br/>
- <a href="https://zod.dev/?id=introduction"><strong>zod</strong></a>
  <i>"TypeScript-first schema declaration and validation library."</i>
  <br/>
  <br/>

## LOCAL ENVIRONMENT

### Dependencies

- Node v20.10.0
- Npx v10.2.3
- Docker v.24.0.7
- VS Code IDE
  <br/>

### Setup

1. Clone Repo
2. Duplicate `.env.example` and rename to `.env.local`
3. Run command `npx supabase init`
4. Run command `npx supabase start`
5. From output on step 4, provide the anon_key and api url for `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_SUPABASE_URL` located in `.env.local`.
6. Run command `npm run dev`
   <br/>

### Teardown

- stop local Supabase DB to prevent machine usage with `npx supabase stop`
- stop JS server with `Ctrl-C` > `Y` on Node terminal
  <br/>
  <br/>

## LINTING

- Code analysis configured using the <a href="https://nextjs.org/docs/pages/building-your-application/configuring/eslint"><strong>ESLint</strong></a> linting utility
- Run linting analysis with `npm run lint`
  <br/>
  <br/>

## TESTING

### Unit Testing

- Unit tests built using the <a href="https://nextjs.org/docs/app/building-your-application/testing/vitest"><strong>Vitest</strong></a> testing framework
- Set up Vitest by running `npm install -D vitest`
- Run test files with `npm run test`
  <br/>

### Automated End-to-End (E2E) Testing

- Automated E2E tests built using the <a href="https://nextjs.org/docs/app/building-your-application/testing/playwright"><strong>Playwright</strong></a> testing framework
- Setup playwright by running `npm run playwright:install`
- Run automated tests with `npm run playwright`
