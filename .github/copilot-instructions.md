# 📘 GitHub Copilot Instructions

This document serves as a guide for GitHub Copilot to understand the project structure, technical stack, and best practices to follow when generating code suggestions for this repository.

## 🏗️ Project Overview

This is a **Frontend** repository built with the following technical stack:

- **Framework**: React + Next.js (using App Router)
- **State Management**: Jotai
- **UI Library**: Chakra UI
- **Language**: TypeScript
- **Package Manager**: npm with Volta for version management
- **Linting/Formatting**: Biome

## 🔧 Technical Stack Details

### Next.js (App Router)

This project uses Next.js 15+ with the modern App Router architecture. Key characteristics:

- File-based routing in the `src/app` directory
- React Server Components support
- Pages defined as default exports in `page.tsx` files
- Layout components in `layout.tsx` files
- Dynamic routes using square brackets (e.g., `[username]`)


### Chakra UI

Chakra UI is the primary UI component library. Best practices include:

#### Layout Components

Use Chakra's layout components for consistent spacing and alignment:

- `Box`, `Flex`, `Grid`, `Stack` for layout structure
- `Container` for centered, width-constrained content
- `SimpleGrid` for responsive grid layouts


#### Responsive Design

Use Chakra's responsive prop values to adapt to different screen sizes:

### Jotai State Management

The project uses Jotai for state management with the following patterns:

#### Derived Atoms and Async Data

The project often uses derived atoms and loadable atoms for async data:


## 🧩 Component Design Patterns

### Atomic Design

The project follows Atomic Design principles:

1. **Atoms**: Smallest building blocks (buttons, inputs)
2. **Molecules**: Groups of atoms (form groups, message items)
3. **Organisms**: Complex UI sections (chat windows, forms)
4. **Templates**: Page layouts without specific content

### Type Safety

Always use TypeScript interfaces and types for components:

## 🔄 State Management Guidelines

### When to use Jotai

- For global state that needs to be accessed across multiple components
- For derived state that depends on other pieces of state
- For asynchronous state with loading/error handling

### When to use React state

- For local component state that doesn't need to be shared
- For form input handling within a single component

## 📝 Code Style Guidelines

- Use functional components with hooks
- Prefer named exports for better code splitting
- Use TypeScript generics for reusable components and functions
- Follow consistent naming conventions:
  - PascalCase for components
  - camelCase for functions and variables
  - UPPER_CASE for constants

## 🧪 Testing Approach

The project uses component testing with:

- Unit tests for utility functions and hooks
- Component tests for UI components
- Integration tests for user flows

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://chakra-ui.com/docs/getting-started)
- [Jotai Documentation](https://jotai.org/docs/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)