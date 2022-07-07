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

`git clone https://github.com/SetuHQ/setu-docs-starter.git`

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

**Only for API reference pages—**

-   If the API reference is coming from YAML files, we need to add a new field inside the frontmatter

```
---
sidebar_title: Overview
page_title: Test product 1 overview
order: 0
visible_in_sidebar: true
api_reference : "<API reference in JSON format>"
---
```

-   If the API reference is via Postman collection, you can add an entry in `redirect.json` to redirect to the Postman collection URL

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

-   Create a **product category** with name `Test category` and path `test-category`
-   Create two **products**
    -   Name `Test product 1`, path `test-product-1`
    -   Name `Test product 2`, path `test-product-2`
-   Create an **Overview page** for each product with some content in it

---

### Create a product category

Create a new folder with name, 'test-category' in `categories` folder.

---

### Create a product

Create two new folders with names `test-product-1` and `test-prodcut-2` inside `test-category` folder.

---

### Add an entry in endpoints.json

For the product category and the new products just created above, add a new object in the `endpoints.json` like this,

```
{
      "name": "Test category",
      "path": "test-category",
      "order": 4,
      "visible_in_sidebar": true,
      "children":
      [
        {
          "name": "Test product 1",
          "path": "test-product-1",
          "order": 0,
          "visible_in_sidebar": true
        },
        {
          "name": "Test product 2",
          "path": "test-product-2",
          "order": 1,
          "visible_in_sidebar": true
        }
      ]
  }
```

### Add some content

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

Create a similar `mdx` file inside `test-product-2` and we are done!

<br />
<br />

# Using React components in MDX files

List of all components and their usage can be found by visiting http://localhost:3000/docs-components

<br />
<br />

# Folder Structure

All MDX files are in a folder `content` in the root of the project.

    .
    ├── pages
    ├── public
    ├── content
    ├── components
    ├── .
    ├── .
    └── README.md

`NOTE : All folders/files should be named after path name they point to.`

Inside `content` folder,

-   `endpoints.json` which contains the structure of docs home-page sidebar.
-   `redirects.json` which contains key-value pairs of routes/path with their redirects URLs
-   `categories` folder which contains individual folders for products in that category. Categories include Payments, Data, Investments, Dev Tools currently.

        .
        ├── ...
        ├── content
        │ ├── categories
        │ | ├── payments # Contains MDX files for Payments products
        | | ├── data # Contains MDX files for Data products
        | | ├── investments # Contains MDX files for Investments products
        | | └── dev-tools # Contains MDX files for Dev Tools products
        | ├── redirects.json # key-value pairs of path redirects
        │ └── endpoints.json # Structure of home-page sidebar
        └── ...

`endpoints.json` structure

```
{
  "home": [
    {
      "name": "<CATEGORY_NAME>",
      "path": "<CATEGORY_PATH>",
      "order": 0, // interger - defines order in which it is shown in the sidebar
      "visible_in_sidebar": true, // values can be true/false
      "children": [
        {
          "name": <PRODUCT_NAME>,
          "path": "<PRODUCT_PATH>",
          "order": 0, // interger - defines order in which it is shown in the sidebar
          "visible_in_sidebar": true // values can be true/false
        },
        ...
      ]
    },
    ...
    ]
}
```

`redirects.json` structure

```
{
   "<URL>" : "<REDIRECT_URL>", // Redirect URL to REDIRECT_URL,
   ...
}
```

`categories` folder

Each folder in `categories` will have sub-folders representing products in that category named after their paths.

    .
    ├── ...
    ├── payments
    │   ├── bbps
    │   ├── bav
    │   ├── upi-deeplink
    │   └── ...
    ├── data
    │   ├── pan
    │   ├── okyc
    │   ├── account-aggregator
    │   └── ...
    ├── investments
    │   └── deposits
    ├── dev-tools
    │   └── bridge
    └── ...

Each product folder will have MDX files for it's pages. The names of pages should be same as their paths. If a page has sub-pages (sub-navs), we need to create a folder along with it's MDX file.

    .
    ├── ...
    ├── dev-tools
    │   ├── bridge
    │       ├── overview.mdx                 # Overview page with route dev-tools/bridge/overview
    │       ├── reports.mdx                  # Reports page with route dev-tools/bridge/reports
    │       ├── org-settings.mdx             # Org- settings page with route dev-tools/bridge/org-settings
    │       └── org-settings                 # org-settings folder to create sub-pages
    │           ├── api-keys.mdx             # API keys page with route dev-tools/bridge/org-settings/api-keys
    │           ├── people.mdx               # People page with route dev-tools/bridge/org-settings/people
    │           └── api-keys                 # api-keys folder to create sub-pages
    │               ├── oauth.mdx            # OAuth page with route dev-tools/bridge/org-settings/api-keys/oauth
    │               └── jwt.mdx              # JWT page with route dev-tools/bridge/org-settings/api-keys/jwt
    └── ...

## License

MIT license.
