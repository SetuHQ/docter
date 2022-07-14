var path = require("path");
var fs = require("fs");
const dirTree = require("directory-tree");
const matter = require("gray-matter");

class Structure {
    getRedirects() {
        return JSON.parse(fs.readFileSync(path.resolve("content", "redirects.json")));
    }

    endpointHelper(data) {
        let children = [];
        for (let category of data) {
            let name = category.name.split(".")[0];
            if (category.type === "directory") {
                let sidebar_item = this.buildParentElement(category, "directory");
                sidebar_item["children"] = this.endpointHelper(category["children"]);
                children.push(sidebar_item);
            } else {
                if (category.name !== "index.mdx") {
                    let markdownwithMeta;
                    try {
                        markdownwithMeta = fs.readFileSync(path.resolve(category.path), "utf-8");
                    } catch (e) {
                        markdownwithMeta = "";
                    }
                    const { data: frontMatter, content } = matter(markdownwithMeta);
                    children.push({
                        name: frontMatter.sidebar_title,
                        visible_in_sidebar: frontMatter.visible_in_sidebar,
                        page_title: frontMatter.page_title,
                        path: name,
                        order: frontMatter.order,
                    });
                }
            }
        }
        return children;
    }

    buildParentElement(child, type) {
        let name = child["name"].split(".")[0];
        let markdownwithMeta;
        let pathName = type === "file" ? path.resolve(child["path"]) : path.resolve(child["path"] + "/index.mdx");
        try {
            markdownwithMeta = fs.readFileSync(pathName, "utf-8");
        } catch (e) {
            if (type !== "file" && e.code === "ENOENT") {
                let folderName = e.path.split("/");
                let index = folderName.findIndex((f) => f === "content");
                folderName = folderName.slice(index);
                delete folderName.pop();
                folderName = folderName.join("/");
                console.error(
                    "\x1b[31m%s\x1b[0m",
                    `\nNo index.mdx file present in folder ${folderName} \n\nPlease create one and add frontmatter`
                );
            }
            markdownwithMeta = "";
        }
        const { data: frontMatter, content } = matter(markdownwithMeta);
        let sidebar_item = {
            name: frontMatter.sidebar_title,
            visible_in_sidebar: frontMatter.visible_in_sidebar,
            page_title: frontMatter.page_title,
            path: name,
            order: frontMatter.order,
        };

        return sidebar_item;
    }

    getFrontMatter() {
        let res = dirTree(path.resolve("./content/"), {
            attributes: ["type"],
        });
        let sidebar_endpoints = { sidebar: [] };
        for (let child of res["children"]) {
            if (child["type"] === "file" && child["name"].includes(".mdx")) {
                sidebar_endpoints["sidebar"].push(this.buildParentElement(child, "file"));
            }
            if (child["type"] === "directory") {
                let sidebar_item = this.buildParentElement(child, "directory");
                sidebar_item["children"] = this.endpointHelper(child["children"]);
                sidebar_endpoints["sidebar"].push(sidebar_item);
            }
        }
        return sidebar_endpoints;
    }
}

module.exports = new Structure();
