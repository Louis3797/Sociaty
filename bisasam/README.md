# For what is this Folder ?

The Bisasam Folder is for the Next.js Frontend

## Getting Started

First, run the development server:

```bash
cd ../bisasam
yarn build
yarn dev
```

## Folder Structure

### In public/

### Assets:

Directory for Images, SVG and etc...

### In src/

### Components:

The components directory contains all your elements, modules, templates, and layouts.

    Elements:
        This directory contains all the basic building blocks for your app. For example a button or a headline component.

    Modules:
        Create all your components here which are more than a basic building block. This could be a header or a footer component. Most likely those modules are built out of multiple elements.

    Templates:
        In the templates directory, you should place all your page templates which are then called from your Next.js specific pages.

    Layouts:
        Layouts are used to wrap your Templates and provide them with the components which will be displayed by default in a specific layout. For example, you would include the Footer and the Header in a default layout.

### Pages:

All the routes of your Next.js application will be placed in this directory. For each route, you will have a separate file, which is named as the route. So for example the file about.tsx in the pages directory would create the following route: https://dislike.com/about. You will get more information about the routing in the official documentation from Next.js.
https://nextjs.org/docs/routing/introduction

### Styles:

The styling directory. Add the CSS stylings here.

### Public:

Next.js uses this directory to statically serve files like the robots.txt or the favicon.ico. You will get more information on how to include these files in the official docs.

### Tests:

Directory for all Tests in Bisasam Folder
