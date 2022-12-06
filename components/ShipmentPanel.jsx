import { useState, useEffect, useRef } from "react";
import styles from "/styles/ShipmentPanel.module.css";
import SearchBar from "./SearchBar";
import Generator from "/utils/generators.js";
import { Button } from "/components/Button";
import { GoogleMap, DistanceMatrixService } from "react-google-maps";

//Shipment class
export class Shipment {
    constructor(shipment_id, price, status, priority, date, locationFrom, locationTo, content) {
        this.shipment_id = shipment_id;
        this.price = price;
        this.status = status;
        this.priority = priority;
        this.date = date;
        this.content = content;
        this.locationFrom = locationFrom;
        this.locationTo = locationTo;
    }

    static priceFormatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });

    get priceString() {
        return Shipment.priceFormatter.format(this.price);
    }

    get key() {
        return `${this.uniqueID}_${this.shipment_id}`;
    }

    get contentString() {
        return this.content.join(", ");
    }

    toString() {
        return `${this.shipment_id}. ${this.content}. ${this.priceString}. ${this.status}`;
    }

    //status can be "Processing", "In Transit", "Delivered", or "Cancelled"
    //use int to represent status
    get statusString() {
        switch (this.status) {
            case 0:
                return "Processing";
            case 1:
                return "In Transit";
            case 2:
                return "Delivered";
            case 3:
                return "Cancelled";
            default:
                return "Unknown";
        }
    }
    get priorityString() {
        switch (this.priority) {
            case 0:
                return "None";
            case 1:
                return "Rush";
            default:
                return "None";
        }
    }
    setStatus(status) {
        this.status = status;
    }
    setPriority(priority) {
        this.priority = priority;
    }
}

export const ShipmentList = ({ item }) => {
    const [status, setStatus] = useState(item.status);
    const [priority, setPriority] = useState(item.priority);
    const [statusString, setStatusString] = useState(item.statusString);
    const [priorityString, setPriorityString] = useState(item.priorityString);
    const [content, setContent] = useState(item.content);
    const [price, setPrice] = useState(item.price);
    const [priceString, setPriceString] = useState(item.priceString);
    const [date, setDate] = useState(item.date);
    const [shipment_id, setShipment_id] = useState(item.shipment_id);

    //update status to cancelled
    const handleCancel = () => {
        setStatus(3);
        setStatusString("Cancelled");
    };

    //update priority to rush
    const handleRush = () => {
        setPriority(1);
        setPriorityString("Rush");
    };

    // get status
    const getStatus = () => {
        return status;
    };

    // get priority
    const getPriority = () => {
        return priority;
    };

    // initial status and priority not appearing in the shipment list
    useEffect(() => {
        setStatus(item.status);
        setPriority(item.priority);
        setStatusString(item.statusString);
        setPriorityString(item.priorityString);
        setContent(item.content);
        setPrice(item.price);
        setPriceString(item.priceString);
        setDate(item.date);
        setShipment_id(item.shipment_id);
    }, [item]);

    const getDistance = (locationFrom, locationTo) => {
        // use google distance matrix api to get distance

        const [distance, setDistance] = useState(0);
        const [duration, setDuration] = useState(0);
        const [distanceString, setDistanceString] = useState("");
        const [durationString, setDurationString] = useState("");

        const distanceMatrixService = useRef();

        const onLoad = (distanceMatrixService) => {
            distanceMatrixService.current = distanceMatrixService;
        }

        const onUnmount = () => {
            distanceMatrixService.current = null;
        }

        const onDistanceMatrixLoad = (response) => {

            const results = response.rows[0].elements;
            const distance = results[0].distance.text;
            const duration = results[0].duration.text;

            setDistance(distance);
            setDuration(duration);
            setDistanceString(distance);
            setDurationString(duration);
        }

        const onError = (response) => {
            console.log(response);
        }

        return (
            <div>
                
                <GoogleMap
                    // mapContainerStyle={containerStyle}
                    // center={center}
                    // zoom={10}
                >
                    <DistanceMatrixService
                        options={{
                            origins: [locationFrom],
                            destinations: [locationTo],
                            travelMode: "DRIVING",
                        }}
                        callback={onDistanceMatrixLoad}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    />
                </GoogleMap>
                <div>
                    <span>
                        <b>Distance:</b> {distanceString}
                    </span>
                    <span>
                        <b>Duration:</b> {durationString}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <li>
            <div className={styles.shipment}>
                <span>
                    <b>Shipment ID:</b> {shipment_id}
                </span>
                <span>
                    <b>Price:</b> ${price}
                </span>
                <span>
                    <b>Status:</b> {getStatus()}
                </span>
                <span>
                    <b>Priority:</b> {getPriority()}
                </span>
                <span>
                    <b>Date:</b> {date}
                </span>
                <span> 
                    <b>Location From:</b> {item.locationFrom}
                </span>
                <span>
                    <b>Location To:</b> {item.locationTo}
                </span>
                {/* display distance from getdistance */}
                <span>
                    <b>Distance:</b> {getDistance(item.locationFrom, item.locationTo)}
                </span>
                <span>
                    <b>Content:</b>
                </span>
                <div className={styles.content}>
                    {content.map((item) => (
                        <div key={"" + item.item_id + shipment_id}>
                            {item.name} x {item.quantity}
                        </div>
                    ))}
                </div>
                <div className={styles.Buttons}>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleRush}>Rush</Button>
                </div>
            </div>
        </li>
    );
};

const ShipmentPanel = ({ testShipments }) => {
    const [filteredShipments, setFilteredShipments] = useState([]);
    const [sortType, setSortType] = useState("shipment_id");
    const [sortDirection, setSortDirection] = useState("ascending");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // filter shipments by searchQuery
    useEffect(() => {
        const results = testShipments.filter((shipment) =>
            shipment.shipment_id.toString().toLowerCase().includes(searchQuery)
        );
        setSearchResults(results);
    }, [searchQuery]);

    // sort shipments by sortType and sortDirection
    useEffect(() => {
        const sortedShipments = [...searchResults].sort((a, b) => {
            if (sortDirection === "ascending") {
                if (a[sortType] < b[sortType]) {
                    return -1;
                }
                if (a[sortType] > b[sortType]) {
                    return 1;
                }
                return 0;
            } else {
                if (a[sortType] > b[sortType]) {
                    return -1;
                }
                if (a[sortType] < b[sortType]) {
                    return 1;
                }
                return 0;
            }
        });
        setFilteredShipments(sortedShipments);
    }, [searchResults, sortType, sortDirection]);

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
            <div className={styles.sortButtons}>
                <Button onClick={() => setSortType("shipment_id")}>
                    Sort by ID
                </Button>
                <Button onClick={() => setSortType("date")}>
                    Sort by Date
                </Button>
                <Button onClick={() => setSortType("status")}>
                    Sort by Status
                </Button>
                <Button onClick={() => setSortType("price")}>
                    Sort by Price
                </Button>
                <Button onClick={() => setSortType("priority")}>
                    Sort by Priority
                </Button>
            </div>
            <div className={styles.sortDirection}>
                <Button
                    onClick={() => setSortDirection("ascending")}
                    color={"#656565"}
                >
                    Ascending
                </Button>
                <Button
                    onClick={() => setSortDirection("descending")}
                    color={"#656565"}
                >
                    Descending
                </Button>
            </div>
            <div className={styles.shipmentList}>
                <ul>
                    {filteredShipments.map((item) => (
                        <ShipmentList item={item} key={item.shipment_id} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShipmentPanel;