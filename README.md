# Docter

Open-source template of Setu Docs

# Table of Contents

-   [Set up Guide](#set-up-guide)
-   [Content editing guide](#content-editing-guide)
    -   [Example content](#example-content)
-   [Contribution guide](#contribution-guide)
-   [Adding a new product category and a new product](#adding-a-new-product-category-and-a-new-product)
-   [Using React components in MDX files](#using-react-components-in-mdx-files)
-   [Folder Structure](#folder-structure)

<br />
<br />

# Set up guide

### Requirements

-   VS Code
-   Git
-   Node v14 only

If you know these, you can go ahead and set up. Otherwise, ask someone from Developer relations or the Design team for help.

---

## Steps to set up

#### Step 1: Clone this repository

Open your terminal and navigate to a folder where you want to clone this repository, such as `Documents`. Run this command.

`git clone https://github.com/SetuHQ/docter.git`

#### Step 2: Run docs locally

Recommend using `yarn` over `npm`

-   Install dependencies with `yarn install`
-   Run the app with `yarn dev`

You should be able to see docs local version at `http://localhost:3000`

#### Step 3: Install VS code extension (optional)

For easy syntax higlighting, install this VS Code extension https://marketplace.visualstudio.com/items?itemName=silvenon.mdx

<br />
<br />

# Content editing guide

> **All the files to edit content are inside `content` folder. You are not required to touch any other folder.**

## Example content

#### Example MDX file

```
---
sidebar_title: Sample Page
page_title: Sample page — Setu Docs
order: 0
visible_in_sidebar: true
---

## This is heading 2
And this is a paragraph text
- And a bullet point, **in bold**
```

**As seen above, every MDX file has two main sections — frontmatter and the actual content**

#### Frontmatter

Frontmatter is information about the page, helping the CMS to know what to do with page.

```
---
sidebar_title: Overview
page_title: Test product 1 Overview
order: 0
visible_in_sidebar: true
---
```

`sidebar_title` describes the name to be displayed in the sidebar
`page_title` describes the title of the page
`order` describes order in which this MDX file should be displayed
`visible_in_sidebar` describes whether this item should be displayed in the sidebar or not

Please note, all the above paramaters are required in front-matter

**Only for API reference pages—**

-   If the API reference is in JSON format, we need to add a new field inside the frontmatter

```
---
sidebar_title: Overview
page_title: Test product 1 overview
order: 0
visible_in_sidebar: true
api_reference : "<API reference in JSON format>"
---
```

> Please note, `api_reference` is an optional field and can be used only to display API references. We use Redoc component to render the API specifications

-   If the API reference is via Postman collection, you can add an entry in `redirects.json` to redirect to the Postman collection URL

#### Actual content

This is the content that is actually shown on the page when processed by the CMS. For help on Markdown syntax, refer this [Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

```
## This is heading 2
And this is a paragraph text
- And a bullet point, **in bold**
```

<br />
<br />

# Adding a new product category and a new product

Let's start with an example. We will—

-   Create a **single page** with name `Introduction` and path `introduction`
-   Create a **category** with name `Test category` and path `test-category`
-   Create two **products**
    -   Name `Test product 1`, path `test-product-1`
    -   Name `Test product 2`, path `test-product-2`
-   Create an **Overview page** for each product with some content in it

---

### Create a single page

Create a MDX file with name, 'introduction.mdx' in `content` folder.

Add frontmatter and content into the Introduction page

---

### Create a category

Create a new folder with name, 'test-category' in `content` folder.

Create an `index.mdx` file inside `test-category` with details of the category in front-matter.

> **Very Important**
>
> You should always have an `index.mdx` file inside all the folders that you create in `content`

---

### Create a product

Create two new folders with names `test-product-1` and `test-prodcut-2` inside `test-category` folder.

---

### Add some content

Create an `index.mdx` file inside `test-product-1` with details of the product in front-matter.

Create a file `overview.mdx` inside `test-product-1` and add some sample content like this—

```
---
sidebar_title: Sample Page
page_title: Sample page
order: 0
visible_in_sidebar: true
---

## This is heading 2
And this is a paragraph text
- And a bullet point, **in bold**
```

Create similar `mdx` files inside `test-product-2` and we are done!

<br />

You can find the exact content in the repo described in the example.

<br>

# Using React components in MDX files

List of all components and their usage can be found by visiting http://localhost:3000/docs-components

<br />
<br />

## License

MIT license.
