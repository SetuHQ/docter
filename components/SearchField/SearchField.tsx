import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { Element, Card, InputField, Text } from "fictoan-react";
import Fuse from "fuse.js";

import { SearchFieldStyled } from "./SearchField.styled";
import SearchIcon from "../../assets/icons/mag-glass1.svg";

const FuseOptions = {
    includeMatches: true,
    threshold: 0.5,
    keys: ["name", "slug"],
};

const SearchField = ({ endpoints }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selected, setSelected] = useState(0);
    const [fuse, setFuse] = useState(null);
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        document.addEventListener("keydown", globalKeyDownHandler);

        return () => document.removeEventListener("keydown", globalKeyDownHandler);
    }, []);

    useEffect(() => {
        const list = DFSTraverseTest(endpoints, "/");
        setFuse(new Fuse(list, FuseOptions));
    }, [endpoints]);

    useEffect(() => {
        if (searchQuery === "") {
            setSearchResults([]);
            return;
        }

        const results = fuse.search(searchQuery);
        setSearchResults(results);
    }, [searchQuery]);

    const DFSTraverse = (directory) => {
        let nodes = [];
        for (let nav in directory) {
            if (!directory[nav].redirect_to_slug) {
                const productNameSlice = directory[nav].slug.split("/").slice(2, 3);
                const productName = productNameSlice.length > 0 ? productNameSlice[0] : null;
                const navName = productName ? productName[0].toUpperCase() + productName.slice(1) : "";
                nodes.push({
                    name: navName ? `${directory[nav].name} — ${navName}` : directory[nav].name,
                    slug: directory[nav].slug,
                });
            }

            let childNodes = DFSTraverse(directory[nav].children);
            nodes.push(...childNodes);
        }

        return nodes;
    };

    const DFSTraverseTest = (directory, base) => {
        let nodes = [];
        for (let category of directory) {
            const productNameSlice = base.split("/").slice(2, 3);
            const productName = productNameSlice.length > 0 ? productNameSlice[0] : null;
            const navName = productName ? productName[0].toUpperCase() + productName.slice(1) : "";
            nodes.push({
                name: navName ? `${category.name} — ${navName}` : category.name,
                slug: base + category.path,
            });
            if (category.children) {
                let childNodes = DFSTraverseTest(category.children, base + category.path + "/");
                nodes.push(...childNodes);
            }
        }

        return nodes;
    };

    const globalKeyDownHandler = (event) => {
        switch (event.key) {
            case "/":
                if (document.activeElement !== inputRef.current) {
                    event.preventDefault();
                    inputRef.current.focus();
                }
                break;
        }
    };

    const fieldKeyUpHandler = (event) => {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                if (selected < searchResults.length - 1) {
                    setSelected(selected + 1);
                    const dropdown = document.getElementById("search-dropdown");
                    const dropdownRect = dropdown.getBoundingClientRect();
                    const child = dropdown.children.item(selected + 2);
                    const childRect = child.getBoundingClientRect();

                    const isViewable = childRect.top < dropdownRect.top + dropdownRect.height;
                    if (!isViewable) {
                        child.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                            inline: "nearest",
                        });
                    }
                }
                break;
            case "ArrowUp":
                event.preventDefault();
                if (selected > 0) {
                    setSelected(selected - 1);
                    const dropdown = document.getElementById("search-dropdown");
                    const dropdownRect = dropdown.getBoundingClientRect();
                    const child = dropdown.children.item(selected - 1);
                    const childRect = child.getBoundingClientRect();

                    const isViewable =
                        childRect.top > dropdownRect.top && childRect.top < dropdownRect.top + dropdownRect.height;
                    if (!isViewable) {
                        child.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "nearest",
                        });
                    }
                }
                break;
            case "Enter":
                if (searchResults.length == 0) {
                    return;
                }
                router.push(searchResults[selected].item.slug);
                clearQuery();
                break;
            case "Escape":
                clearQuery();
                break;
        }
    };

    const onChangeHandler = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        setSelected(0);
    };

    const highlightMatch = (str, matches, keyToMatch) => {
        let newStr = str;
        matches.forEach((match) => {
            if (match.key === keyToMatch) {
                match.indices.forEach((indexPair, i) => {
                    let first = indexPair[0] + i * `<mark></mark>`.length;
                    let second = indexPair[1] + i * `<mark></mark>`.length;
                    newStr =
                        newStr.slice(0, first) +
                        `<mark>${newStr.slice(first, second + 1)}</mark>` +
                        newStr.slice(second + 1);
                });
            }
        });
        return newStr;
    };

    const clearQuery = () => {
        setSearchQuery("");
        let searchField = inputRef.current;
        searchField.value = "";
        searchField.blur();
    };

    return (
        <SearchFieldStyled>
            <div className="search-container">
                <div className="vertically-centre-items">
                    <Element as="div" className="search-tooltip vertically-centre-items">
                        <Element as="kbd">/</Element>
                        <Text textColor="slate">to search</Text>
                    </Element>
                    <InputField
                        id="search-field"
                        ref={inputRef}
                        name="search"
                        placeholder="Search pages"
                        autoComplete="off"
                        onChange={onChangeHandler}
                        onKeyDown={fieldKeyUpHandler}
                        onBlur={() => setTimeout(clearQuery, 100)}
                    />
                    <Element as="div" className="search-icon" onClick={(e) => inputRef.current.focus()}>
                        <SearchIcon />
                    </Element>
                </div>

                {searchQuery ? (
                    searchResults.length ? (
                        <Card id="search-dropdown" shadow="hard" padding="nano" shape="rounded" marginTop="nano">
                            <Text size="small" marginBottom="nano">
                                Displaying {searchResults.length} results
                            </Text>

                            {searchResults.map((result, i) => (
                                <Link key={i} href={result.item.slug}>
                                    <Card
                                        key={i}
                                        className={`result-card ${selected === i ? "selected" : ""}`}
                                        bgColour="white"
                                        style={{ cursor: "pointer" }}
                                        shape="rounded"
                                        marginBottom="nano"
                                        onMouseEnter={() => setSelected(i)}
                                        onClick={() => setTimeout(clearQuery, 100)}
                                    >
                                        <Text
                                            className="result-name"
                                            dangerouslySetInnerHTML={{
                                                __html: highlightMatch(result.item.name, result.matches, "name"),
                                            }}
                                        />
                                        <Text className="result-path" size="small" textColor="slate-80">
                                            {result.item.slug}
                                        </Text>
                                    </Card>
                                </Link>
                            ))}
                        </Card>
                    ) : (
                        <Card id="search-dropdown" shadow="hard" padding="micro" shape="rounded" marginTop="nano">
                            <Text>
                                No results for <strong>&ldquo;{searchQuery}&rdquo;</strong>.
                            </Text>
                            <Text size="small">One of life’s greatest mysteries.</Text>
                        </Card>
                    )
                ) : null}
            </div>
        </SearchFieldStyled>
    );
};

export default SearchField;
