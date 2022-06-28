var path = require("path");
var fs = require("fs");
const dirTree = require("directory-tree");
const matter = require("gray-matter");

class Structure {
    getRedirects() {
        return JSON.parse(fs.readFileSync(path.resolve("content", "redirects.json")));
    }

    getHomeEndpoints() {
        return JSON.parse(fs.readFileSync(path.resolve("content", "endpoints.json")));
    }

    endpointHelper(data) {
        let children = [];
        for (let category of data.children) {
            let name = category.name.split(".")[0];
            if (category.type === "directory") {
                let markdownwithMeta;
                try {
                    markdownwithMeta = fs.readFileSync(path.resolve(category.path + ".mdx"), "utf-8");
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
                    children: this.endpointHelper(category),
                });
            } else {
                if (!children.some((el) => el.path === name)) {
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

    getFrontMatter() {
        let home_endpoints = this.getHomeEndpoints();
        for (let endpoint of home_endpoints["home"]) {
            for (let child of endpoint.children) {
                let res = dirTree(path.resolve("./content/categories/", endpoint.path + "/" + child.path), {
                    attributes: ["type"],
                });
                child["children"] = this.endpointHelper(res);
            }
        }

        return home_endpoints;
    }
}

module.exports = new Structure();
