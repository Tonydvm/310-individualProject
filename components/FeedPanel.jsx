import { useState, useEffect, useRef } from "react";

const FeedPanel = ({}) => {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://www.who.int/rss-feeds/news-english.xml")
            .then((response) => response.text())
            .then((data) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "application/xml");
                const items = doc.querySelectorAll("item");

                const feed = Array.from(items).map((item) => {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    const description = item.querySelector("description").textContent;
                    const pubDate = item.querySelector("pubDate").textContent;

                    return {
                        title,
                        link,
                        description,
                        pubDate
                    };
                });

                setFeed(feed);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="feed-panel">
            {feed.map((item) => {
                return (
                    <div className="feed-item" key={item.link}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>{item.pubDate}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default FeedPanel;